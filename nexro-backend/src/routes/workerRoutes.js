import express from 'express';
import { query } from '../config/db.js';
import { socketService } from '../services/socketService.js';

const router = express.Router();

/**
 * GET /api/workers/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT w.*, u.full_name, u.phone, u.email, u.avatar_url, soc.name as society_name
       FROM workers w
       JOIN users u ON w.user_id = u.id
       LEFT JOIN societies soc ON w.society_id = soc.id
       WHERE w.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json({ worker: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
});

/**
 * PUT /api/workers/:id/status
 * Toggle duty status: available | on_job | offline
 */
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const workerId = req.params.id;

  if (!['available', 'on_job', 'offline'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be available, on_job, or offline' });
  }

  try {
    const result = await query(
      'UPDATE workers SET status = $1 WHERE id = $2 RETURNING *',
      [status, workerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json({ success: true, worker: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

/**
 * POST /api/workers/:id/location
 * GPS Location Ping -> updates DB and streams to WebSocket
 */
router.post('/:id/location', async (req, res) => {
  const { lat, lng, bookingId } = req.body;
  const workerId = req.params.id;

  try {
    await query(
      'UPDATE workers SET current_lat = $1, current_lng = $2 WHERE id = $3',
      [lat, lng, workerId]
    );

    // Stream to WebSocket
    socketService.broadcastWorkerLocation(workerId, lat, lng, bookingId);

    res.json({ success: true, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Location ping failed' });
  }
});

/**
 * GET /api/workers/:id/passbook
 * 85% Direct Worker Earnings Ledger & Welfare Passbook
 */
router.get('/:id/passbook', async (req, res) => {
  const workerId = req.params.id;
  try {
    const workerRes = await query(
      'SELECT id, membership_no, passbook_balance, total_jobs FROM workers WHERE id = $1',
      [workerId]
    );
    if (workerRes.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    const earningsRes = await query(
      `SELECT b.id as booking_id, b.total_amount, b.worker_payout, b.welfare_amount, b.completed_at,
              s.title as service_title
       FROM bookings b
       LEFT JOIN services s ON b.service_id = s.id
       WHERE b.worker_id = $1 AND b.status = 'completed'
       ORDER BY b.completed_at DESC`,
      [workerId]
    );

    const welfareRes = await query(
      `SELECT * FROM welfare_passbook_entries
       WHERE worker_id = $1
       ORDER BY created_at DESC`,
      [workerId]
    );

    res.json({
      worker: workerRes.rows[0],
      statutorySplit: '85% Worker Passbook / 5% Welfare Shield / 10% Society Logistics / 0% Aggregator',
      payoutTransactions: earningsRes.rows,
      welfareShieldPassbook: welfareRes.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passbook' });
  }
});

export default router;
