/**
 * Nexro Consumer App - Central Backend API Client
 * Connects iOS simulator or physical device to Central Backend (Port 5001)
 */

import { Platform } from 'react-native';

// In iOS Simulator, localhost is Mac's localhost. On Android emulator it's 10.0.2.2.
const API_BASE = Platform.select({
  ios: 'http://localhost:5001/api',
  android: 'http://10.0.2.2:5001/api',
  default: 'http://localhost:5001/api'
});

export const consumerApi = {
  // Create Booking
  createBooking: async (bookingData) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await res.json();
    } catch (err) {
      console.warn('[Consumer API] Create booking error:', err.message);
      return { success: false, error: err.message };
    }
  },

  // Rapid Emergency SOS
  dispatchEmergency: async (emergencyData) => {
    try {
      const res = await fetch(`${API_BASE}/emergency/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emergencyData)
      });
      return await res.json();
    } catch (err) {
      console.warn('[Consumer API] Emergency dispatch error:', err.message);
      return { success: false, error: err.message };
    }
  },

  // Live Tracking
  getBookingStatus: async (bookingId) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`);
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  }
};
