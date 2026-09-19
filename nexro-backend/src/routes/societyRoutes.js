import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

/**
 * GET /api/societies
 */
router.get('/', async (req, res) => {
  const { cluster, search } = req.query;
  try {
    let sql = 'SELECT * FROM societies WHERE 1=1';
    const params = [];

    if (cluster && cluster !== 'all') {
      params.push(`%${cluster}%`);
      sql += ` AND cluster ILIKE $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (name ILIKE $${params.length} OR registration_number ILIKE $${params.length})`;
    }

    sql += ' ORDER BY audit_grade ASC, name ASC';
    const result = await query(sql, params);
    res.json({ societies: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch societies' });
  }
});

/**
 * GET /api/societies/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM societies WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Society not found' });
    }
    res.json({ society: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch society details' });
  }
});

/**
 * GET /api/societies/:id/workers
 */
router.get('/:id/workers', async (req, res) => {
  try {
    const result = await query(
      `SELECT w.*, u.full_name, u.phone, u.email, u.avatar_url
       FROM workers w
       JOIN users u ON w.user_id = u.id
       WHERE w.society_id = $1
       ORDER BY w.status ASC, w.rating DESC`,
      [req.params.id]
    );
    res.json({ workers: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

/**
 * POST /api/societies/:id/workers
 * Onboard new certified member into cooperative society
 */
router.post('/:id/workers', async (req, res) => {
  const societyId = req.params.id;
  const {
    fullName,
    phone,
    email,
    trade,
    nsqfLevel,
    itiCertNo,
    experienceYears
  } = req.body;

  try {
    const userId = `usr_${Date.now()}`;
    const workerId = `wrk_${Date.now()}`;
    const membershipNo = `MEM-KCLS-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create User record
    await query(
      `INSERT INTO users (id, phone, email, full_name, role, language_pref)
       VALUES ($1, $2, $3, $4, 'worker', 'kn')`,
      [userId, phone || `+9198450${Math.floor(10000 + Math.random() * 90000)}`, email, fullName || 'Cooperative Member']
    );

    // Create Worker record
    const result = await query(
      `INSERT INTO workers
       (id, user_id, society_id, membership_no, trade, nsqf_level, iti_cert_no, experience_years, status, verification_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'available', 'Verified')
       RETURNING *`,
      [
        workerId,
        userId,
        societyId,
        membershipNo,
        trade || 'Electrical',
        nsqfLevel || 'NSQF Level 4',
        itiCertNo || `ITI-CERT-${Date.now()}`,
        experienceYears || 3
      ]
    );

    res.status(201).json({
      success: true,
      worker: { ...result.rows[0], full_name: fullName }
    });
  } catch (err) {
    console.error('Worker onboarding error:', err);
    res.status(500).json({ error: 'Failed to onboard member' });
  }
});

/**
 * GET /api/societies/:id/finance
 * Aggregate 85/5/10 statutory split ledger for society
 */
router.get('/:id/finance', async (req, res) => {
  const societyId = req.params.id;
  try {
    const totalsRes = await query(
      `SELECT 
         COUNT(*) as total_completed_jobs,
         COALESCE(SUM(total_amount), 0) as gross_volume,
         COALESCE(SUM(worker_payout), 0) as total_worker_payout,
         COALESCE(SUM(welfare_amount), 0) as total_welfare_fund,
         COALESCE(SUM(society_ops_amount), 0) as total_society_ops
       FROM bookings
       WHERE society_id = $1 AND status = 'completed'`,
      [societyId]
    );

    const row = totalsRes.rows[0];

    res.json({
      financeSummary: {
        totalCompletedJobs: parseInt(row.total_completed_jobs, 10),
        grossVolume: parseFloat(row.gross_volume),
        statutoryWorkerPayout85: parseFloat(row.total_worker_payout),
        statutoryWelfareFund5: parseFloat(row.total_welfare_fund),
        statutorySocietyOps10: parseFloat(row.total_society_ops),
        aggregatorCut: 0.00,
        statutorySplitRule: '85% Worker / 5% Welfare / 10% Society Ops / 0% Aggregator'
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load society financial ledger' });
  }
});

/**
 * GET /api/societies/:id/welfare
 */
router.get('/:id/welfare', async (req, res) => {
  const societyId = req.params.id;
  try {
    const entriesRes = await query(
      `SELECT wpe.*, u.full_name as worker_name, w.membership_no
       FROM welfare_passbook_entries wpe
       JOIN workers w ON wpe.worker_id = w.id
       JOIN users u ON w.user_id = u.id
       WHERE wpe.society_id = $1
       ORDER BY wpe.created_at DESC`,
      [societyId]
    );

    res.json({
      groupPolicyNo: 'KGCF-MED-849102',
      coverageLimitPerMember: '₹5,00,000',
      status: 'Active',
      entries: entriesRes.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch welfare records' });
  }
});

export default router;
