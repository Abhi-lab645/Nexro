import { pool } from '../config/db.js';
import { NotificationService } from './notificationService.js';
import { socketService } from './socketService.js';

export class StatutoryFinanceService {
  /**
   * Calculate statutory financial breakdown
   * Validated Pilot Economics (SIH 2026): 92% Worker / 2% Welfare / 6% Platform & Co-op Operations
   */
  static calculateSplit(totalAmount) {
    const total = parseFloat(totalAmount);
    const workerRate = parseFloat(process.env.SPLIT_WORKER_PCT || '0.92');
    const welfareRate = parseFloat(process.env.SPLIT_WELFARE_PCT || '0.02');

    const workerCut = parseFloat((total * workerRate).toFixed(2));
    const welfareCut = parseFloat((total * welfareRate).toFixed(2));
    const societyOps = parseFloat((total - workerCut - welfareCut).toFixed(2)); // exactly 6% platform & co-op
    const aggregatorCommission = 0.00; // Zero aggregator cut

    return {
      total,
      workerCut,
      welfareCut,
      societyOps,
      aggregatorCommission
    };
  }

  /**
   * Execute atomic statutory settlement upon job completion
   */
  static async settleJobPayout(bookingId, workerDiagnosis, photoProofUrl) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Fetch booking with lock
      const bookingRes = await client.query(
        `SELECT * FROM bookings WHERE id = $1 FOR UPDATE`,
        [bookingId]
      );

      if (bookingRes.rows.length === 0) {
        throw new Error(`Booking ${bookingId} not found`);
      }

      let booking = bookingRes.rows[0];

      // Ensure worker is assigned if completing an emergency SOS
      if (!booking.worker_id) {
        const defaultWorkerRes = await client.query(
          "SELECT id FROM workers WHERE society_id = $1 LIMIT 1",
          [booking.society_id || 'soc_kcls_42']
        );
        const assignedWorkerId = defaultWorkerRes.rows[0]?.id || 'wrk_ramesh_01';
        await client.query("UPDATE bookings SET worker_id = $1 WHERE id = $2", [assignedWorkerId, bookingId]);
        booking.worker_id = assignedWorkerId;
      }

      if (booking.status === 'completed') {
        await client.query('ROLLBACK');
        return { success: true, message: 'Already settled', booking };
      }

      // 2. Compute 85/5/10 splits
      const split = this.calculateSplit(booking.total_amount);

      // 3. Update Booking Status
      const updateBookingSql = `
        UPDATE bookings
        SET status = 'completed',
            worker_diagnosis = $1,
            photo_proof_url = $2,
            worker_payout = $3,
            welfare_amount = $4,
            society_ops_amount = $5,
            completed_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
      `;
      const updatedBookingRes = await client.query(updateBookingSql, [
        workerDiagnosis || 'Service completed in accordance with cooperative NSQF guidelines.',
        photoProofUrl || null,
        split.workerCut,
        split.welfareCut,
        split.societyOps,
        bookingId
      ]);
      const settledBooking = updatedBookingRes.rows[0];

      // 4. Release Escrow Transaction
      await client.query(
        `UPDATE escrow_transactions
         SET status = 'released', released_at = CURRENT_TIMESTAMP
         WHERE booking_id = $1`,
        [bookingId]
      );

      // 5. Credit Worker Passbook Balance (85%)
      const workerUpdateRes = await client.query(
        `UPDATE workers
         SET passbook_balance = passbook_balance + $1,
             total_jobs = total_jobs + 1,
             status = 'available'
         WHERE id = $2
         RETURNING passbook_balance`,
        [split.workerCut, booking.worker_id]
      );
      const newBalance = workerUpdateRes.rows[0]?.passbook_balance || 0;

      // 6. Record in Statutory Welfare Passbook (5%)
      const wpeId = `wpe_${Date.now()}`;
      await client.query(
        `INSERT INTO welfare_passbook_entries
         (id, worker_id, society_id, booking_id, entry_type, amount, description, balance_after)
         VALUES ($1, $2, $3, $4, 'credit_job_5pct', $5, $6, $7)`,
        [
          wpeId,
          booking.worker_id,
          booking.society_id,
          bookingId,
          split.welfareCut,
          `5% Statutory Member Welfare Contribution (Job ${bookingId})`,
          newBalance
        ]
      );

      await client.query('COMMIT');
      console.log(`⚖️ [Statutory 85/5/10 Settled] Job: ${bookingId} | Worker: ₹${split.workerCut} (85%) | Welfare: ₹${split.welfareCut} (5%) | Ops: ₹${split.societyOps} (10%)`);

      // 7. Dispatch notifications & real-time events
      NotificationService.notifyEscrowRelease(booking, split.workerCut, split);
      socketService.broadcastBookingUpdate(settledBooking);

      return {
        success: true,
        split,
        settledBooking,
        workerNewBalance: newBalance
      };

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ [Statutory Settlement Error]:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}
