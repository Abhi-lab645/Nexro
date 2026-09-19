import express from 'express';
import { query } from '../config/db.js';
import { StatutoryFinanceService } from '../services/statutoryFinanceService.js';
import { NotificationService } from '../services/notificationService.js';
import { socketService } from './../services/socketService.js';

const router = express.Router();

/**
 * GET /api/bookings
 * Filter by status, society_id, worker_id, is_emergency
 */
router.get('/', async (req, res) => {
  const { status, society_id, worker_id, is_emergency } = req.query;

  try {
    let sql = `
      SELECT b.*, 
             s.title as service_title, s.category as service_category,
             uw.full_name as worker_name, w.trade as worker_trade, w.membership_no,
             uc.full_name as consumer_name, uc.phone as consumer_phone,
             soc.name as society_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN workers w ON b.worker_id = w.id
      LEFT JOIN users uw ON w.user_id = uw.id
      LEFT JOIN users uc ON b.consumer_id = uc.id
      LEFT JOIN societies soc ON b.society_id = soc.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      params.push(status);
      sql += ` AND b.status = $${params.length}`;
    }
    if (society_id) {
      params.push(society_id);
      sql += ` AND b.society_id = $${params.length}`;
    }
    if (worker_id) {
      params.push(worker_id);
      sql += ` AND b.worker_id = $${params.length}`;
    }
    if (is_emergency !== undefined) {
      params.push(is_emergency === 'true');
      sql += ` AND b.is_emergency = $${params.length}`;
    }

    sql += ' ORDER BY b.created_at DESC';

    const result = await query(sql, params);
    res.json({ bookings: result.rows });
  } catch (err) {
    console.error('Fetch bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/**
 * GET /api/bookings/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT b.*, 
              s.title as service_title, s.category as service_category,
              uw.full_name as worker_name, w.trade as worker_trade, w.membership_no, w.rating as worker_rating,
              uc.full_name as consumer_name, uc.phone as consumer_phone,
              soc.name as society_name,
              e.status as escrow_status, e.gateway_txn_id
       FROM bookings b
       LEFT JOIN services s ON b.service_id = s.id
       LEFT JOIN workers w ON b.worker_id = w.id
       LEFT JOIN users uw ON w.user_id = uw.id
       LEFT JOIN users uc ON b.consumer_id = uc.id
       LEFT JOIN societies soc ON b.society_id = soc.id
       LEFT JOIN escrow_transactions e ON b.id = e.booking_id
       WHERE b.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load booking' });
  }
});

/**
 * POST /api/bookings
 * Create new consumer booking with escrow hold
 */
router.post('/', async (req, res) => {
  const {
    consumerId,
    serviceId,
    societyId,
    workerId,
    customerProblem,
    customerLat,
    customerLng,
    customerAddress,
    totalAmount,
    isEmergency
  } = req.body;

  try {
    const bookingId = `NX-${Math.floor(10000 + Math.random() * 90000)}`;
    const startOtp = String(Math.floor(1000 + Math.random() * 9000));
    const split = StatutoryFinanceService.calculateSplit(totalAmount || 299.00);

    const bookingRes = await query(
      `INSERT INTO bookings
       (id, consumer_id, worker_id, society_id, service_id, status, is_emergency, customer_problem, customer_lat, customer_lng, customer_address, total_amount, worker_payout, welfare_amount, society_ops_amount, start_otp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        bookingId,
        consumerId || 'usr_consumer_arjun',
        workerId || null,
        societyId || 'soc_kcls_42',
        serviceId || 'srv_elec_diag',
        workerId ? 'assigned' : 'requested',
        isEmergency || false,
        customerProblem || 'Standard service requested via Nexro app.',
        customerLat || 12.9784,
        customerLng || 77.6408,
        customerAddress || 'Indiranagar, Bangalore',
        split.total,
        split.workerCut,
        split.welfareCut,
        split.societyOps,
        startOtp
      ]
    );
    const newBooking = bookingRes.rows[0];

    // Create Escrow Record (status: held)
    const escrowId = `esc_${Date.now()}`;
    await query(
      `INSERT INTO escrow_transactions (id, booking_id, consumer_id, amount, status, gateway_txn_id)
       VALUES ($1, $2, $3, $4, 'held', $5)`,
      [escrowId, bookingId, consumerId || 'usr_consumer_arjun', split.total, `pay_${bookingId}_rzp_mock`]
    );

    // Notify via WebSocket
    socketService.broadcastBookingUpdate(newBooking);

    res.status(201).json({
      success: true,
      booking: newBooking,
      startOtp,
      escrowSecured: true,
      split
    });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

/**
 * POST /api/bookings/:id/assign
 */
router.post('/:id/assign', async (req, res) => {
  const { workerId } = req.body;
  const bookingId = req.params.id;

  try {
    const result = await query(
      `UPDATE bookings
       SET worker_id = $1, status = 'assigned'
       WHERE id = $2
       RETURNING *`,
      [workerId, bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Set worker to on_job
    await query("UPDATE workers SET status = 'on_job' WHERE id = $1", [workerId]);

    const updated = result.rows[0];
    socketService.broadcastBookingUpdate(updated);

    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ error: 'Assignment failed' });
  }
});

/**
 * POST /api/bookings/:id/verify-otp
 * Worker verifies customer start OTP
 */
router.post('/:id/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const bookingId = req.params.id;

  try {
    const bookingRes = await query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
    if (bookingRes.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingRes.rows[0];
    if (booking.start_otp !== String(otp)) {
      return res.status(400).json({ error: 'Invalid start OTP. Please verify with customer.' });
    }

    const updatedRes = await query(
      "UPDATE bookings SET status = 'in_progress' WHERE id = $1 RETURNING *",
      [bookingId]
    );
    const updated = updatedRes.rows[0];

    socketService.broadcastBookingUpdate(updated);

    res.json({
      success: true,
      message: 'OTP verified. Service now in progress.',
      booking: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

/**
 * POST /api/bookings/:id/complete
 * Worker diagnostic + photo proof -> Releases Escrow -> 85/5/10 Statutory Payout
 */
router.post('/:id/complete', async (req, res) => {
  const { workerDiagnosis, photoProofUrl } = req.body;
  const bookingId = req.params.id;

  try {
    const settlement = await StatutoryFinanceService.settleJobPayout(
      bookingId,
      workerDiagnosis,
      photoProofUrl
    );

    res.json({
      success: true,
      message: 'Job completed. Escrow released and statutory 85/5/10 split credited.',
      ...settlement
    });
  } catch (err) {
    console.error('Job completion error:', err);
    res.status(500).json({ error: err.message || 'Job completion failed' });
  }
});

export default router;
