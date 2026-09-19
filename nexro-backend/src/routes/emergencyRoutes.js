import express from 'express';
import { query } from '../config/db.js';
import { socketService } from '../services/socketService.js';
import { NotificationService } from '../services/notificationService.js';
import { StatutoryFinanceService } from '../services/statutoryFinanceService.js';

const router = express.Router();

/**
 * Haversine distance helper in kilometers
 */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * POST /api/emergency/dispatch
 * Rapid SOS Cooperative Dispatch (< 15 min SLA)
 */
router.post('/dispatch', async (req, res) => {
  const {
    consumerId,
    serviceId,
    customerProblem,
    customerLat,
    customerLng,
    customerAddress,
    totalAmount,
    societyId
  } = req.body;

  try {
    const bookingId = `EMG-${Math.floor(1000 + Math.random() * 9000)}`;
    const startOtp = String(Math.floor(1000 + Math.random() * 9000));
    const split = StatutoryFinanceService.calculateSplit(totalAmount || 349.00);

    // 1. Find nearby on-duty / available workers (within 5km)
    const lat = customerLat || 12.9784;
    const lng = customerLng || 77.6408;

    const workersRes = await query(
      `SELECT w.*, u.full_name, u.phone
       FROM workers w
       JOIN users u ON w.user_id = u.id
       WHERE w.status IN ('available', 'on_job')`
    );

    const nearbyWorkers = workersRes.rows
      .map(w => ({
        ...w,
        distanceKm: parseFloat(getDistanceKm(lat, lng, parseFloat(w.current_lat), parseFloat(w.current_lng)).toFixed(1))
      }))
      .filter(w => w.distanceKm <= 5.0)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    // 2. Insert Emergency Booking
    const bookingRes = await query(
      `INSERT INTO bookings
       (id, consumer_id, society_id, service_id, status, is_emergency, customer_problem, customer_lat, customer_lng, customer_address, total_amount, worker_payout, welfare_amount, society_ops_amount, start_otp)
       VALUES ($1, $2, $3, $4, 'requested', true, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        bookingId,
        consumerId || 'usr_consumer_arjun',
        societyId || 'soc_kcls_42',
        serviceId || 'srv_elec_diag',
        customerProblem || 'URGENT: Electrical spark and breaker smoke observed.',
        lat,
        lng,
        customerAddress || 'Indiranagar 12th Main, Bangalore',
        split.total,
        split.workerCut,
        split.welfareCut,
        split.societyOps,
        startOtp
      ]
    );
    const emergencyBooking = bookingRes.rows[0];

    // 3. Create Escrow
    await query(
      `INSERT INTO escrow_transactions (id, booking_id, consumer_id, amount, status, gateway_txn_id)
       VALUES ($1, $2, $3, $4, 'held', $5)`,
      [`esc_${Date.now()}`, bookingId, consumerId || 'usr_consumer_arjun', split.total, `pay_${bookingId}_rzp_mock`]
    );

    // 4. Broadcast Real-Time Emergency SOS over WebSockets & FCM
    const nearbyWorkerIds = nearbyWorkers.map(w => w.id);
    socketService.broadcastEmergencyAlert(emergencyBooking, nearbyWorkerIds);
    NotificationService.sendEmergencyBroadcast({
      title: '🚨 PRIORITY EMERGENCY SOS (< 15 min SLA)',
      body: `Urgent call at ${customerAddress}. Tap to review and accept!`,
      data: { bookingId, type: 'EMERGENCY_DISPATCH' }
    });

    res.status(201).json({
      success: true,
      booking: emergencyBooking,
      startOtp,
      nearbyWorkersFound: nearbyWorkers.length,
      topCandidate: nearbyWorkers[0] || null
    });

  } catch (err) {
    console.error('Emergency dispatch error:', err);
    res.status(500).json({ error: 'Emergency dispatch failed' });
  }
});

/**
 * GET /api/emergency/unassigned
 */
router.get('/unassigned', async (req, res) => {
  try {
    const result = await query(
      `SELECT b.*, s.title as service_title, uc.full_name as customer_name, uc.phone as customer_phone
       FROM bookings b
       LEFT JOIN services s ON b.service_id = s.id
       LEFT JOIN users uc ON b.consumer_id = uc.id
       WHERE b.is_emergency = true AND b.status = 'requested'
       ORDER BY b.created_at ASC`
    );
    res.json({ unassignedEmergencies: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch unassigned emergencies' });
  }
});

export default router;
