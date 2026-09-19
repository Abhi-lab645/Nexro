/**
 * Nexro Worker App - Central Backend API Client
 * Connects iOS simulator or physical device to Central Backend (Port 5001)
 */

import { Platform } from 'react-native';

const API_BASE = Platform.select({
  ios: 'http://localhost:5001/api',
  android: 'http://10.0.2.2:5001/api',
  default: 'http://localhost:5001/api'
});

export const workerApi = {
  // Duty Status Toggle
  updateDutyStatus: async (workerId, status) => {
    try {
      const res = await fetch(`${API_BASE}/workers/${workerId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  },

  // GPS Location Ping
  sendLocationPing: async (workerId, lat, lng, bookingId) => {
    try {
      const res = await fetch(`${API_BASE}/workers/${workerId}/location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, bookingId })
      });
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  },

  // Customer Start OTP Verification
  verifyCustomerOtp: async (bookingId, otp) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  },

  // Complete Job -> Trigger 85/5/10 Statutory Payout
  completeJob: async (bookingId, workerDiagnosis, photoProofUrl) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerDiagnosis, photoProofUrl })
      });
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  },

  // Passbook & Welfare Shield
  getPassbook: async (workerId) => {
    try {
      const res = await fetch(`${API_BASE}/workers/${workerId}/passbook`);
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  }
};
