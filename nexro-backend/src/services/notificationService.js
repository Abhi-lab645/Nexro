import { admin, firebaseInitialized } from '../config/firebase.js';

export class NotificationService {
  /**
   * Send single device push notification
   */
  static async sendPushNotification({ token, title, body, data = {} }) {
    if (!token) {
      console.log(`📱 [Push Notification] ${title}: ${body} (No push token registered)`);
      return { success: true, simulated: true };
    }

    if (firebaseInitialized) {
      try {
        const message = {
          notification: { title, body },
          data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
          token
        };
        const response = await admin.messaging().send(message);
        console.log(`🔥 [FCM Success] Delivered to ${token.slice(0, 12)}... MsgId: ${response}`);
        return { success: true, messageId: response };
      } catch (err) {
        console.error('❌ [FCM Error]:', err.message);
        return { success: false, error: err.message };
      }
    } else {
      console.log(`🔔 [FCM Simulation] To: ${token.slice(0, 16)}... | Title: "${title}" | Body: "${body}"`);
      return { success: true, simulated: true };
    }
  }

  /**
   * Send emergency SOS broadcast to multiple nearby workers
   */
  static async sendEmergencyBroadcast({ tokens = [], title, body, data = {} }) {
    console.log(`🚨 [Emergency FCM Broadcast] Dispatching to ${tokens.length} nearby on-duty workers`);
    if (firebaseInitialized && tokens.length > 0) {
      try {
        const message = {
          notification: { title, body },
          data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
          tokens
        };
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`🔥 [FCM Multicast] Success: ${response.successCount}, Fail: ${response.failureCount}`);
        return response;
      } catch (err) {
        console.error('❌ [FCM Multicast Error]:', err.message);
      }
    } else {
      console.log(`🚨 [FCM Simulation] Emergency Broadcast: "${title}" -> ${body}`);
      return { success: true, simulated: true, count: tokens.length };
    }
  }

  /**
   * Helper: Alert worker of newly assigned job
   */
  static async notifyWorkerAssignment(worker, booking) {
    return this.sendPushNotification({
      token: worker.fcm_token || null,
      title: booking.is_emergency ? '🚨 URGENT: Emergency Cooperative Call' : '📋 New Cooperative Booking Assigned',
      body: `${booking.service_title || 'Service'} in ${booking.customer_address || 'Indiranagar'}. Total payout: ₹${booking.worker_payout}`,
      data: {
        bookingId: booking.id,
        type: 'JOB_ASSIGNMENT',
        isEmergency: String(booking.is_emergency)
      }
    });
  }

  /**
   * Helper: Alert customer worker has arrived with OTP
   */
  static async notifyCustomerArrival(consumer, booking, otp) {
    return this.sendPushNotification({
      token: consumer.fcm_token || null,
      title: '👷 Your Cooperative Professional Has Arrived',
      body: `Share Start OTP: ${otp} with your verified technician to begin service.`,
      data: {
        bookingId: booking.id,
        type: 'WORKER_ARRIVED',
        otp: String(otp)
      }
    });
  }

  /**
   * Helper: Alert worker when escrow releases and passbook is credited
   */
  static async notifyEscrowRelease(worker, amount, split) {
    return this.sendPushNotification({
      token: worker.fcm_token || null,
      title: '💰 Passbook Credited (85% Statutory Direct Payout)',
      body: `₹${amount} deposited directly into your cooperative passbook. 0% aggregator cut.`,
      data: {
        type: 'PASSBOOK_CREDIT',
        amount: String(amount)
      }
    });
  }
}
