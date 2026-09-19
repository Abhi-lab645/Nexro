/**
 * Nexro Central Backend API Client
 * Connects Web Portal to Node.js Gateway (Port 5001) & FastAPI AI (Port 8000)
 */

const API_BASE = 'http://localhost:5001/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-demo-role': 'society_admin',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[Nexro API Client] ${endpoint} request notice:`, err.message);
    throw err;
  }
}

export const nexroApi = {
  // Health
  getHealth: () => request('/health'),

  // Bookings & Lifecycle
  getBookings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/bookings?${query}`);
  },
  getBooking: (id) => request(`/bookings/${id}`),
  createBooking: (data) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  assignWorker: (id, workerId) => request(`/bookings/${id}/assign`, { method: 'POST', body: JSON.stringify({ workerId }) }),
  verifyOtp: (id, otp) => request(`/bookings/${id}/verify-otp`, { method: 'POST', body: JSON.stringify({ otp }) }),
  completeBooking: (id, data) => request(`/bookings/${id}/complete`, { method: 'POST', body: JSON.stringify(data) }),

  // Emergency SOS
  dispatchEmergency: (data) => request('/emergency/dispatch', { method: 'POST', body: JSON.stringify(data) }),
  getUnassignedEmergencies: () => request('/emergency/unassigned'),

  // Societies
  getSocieties: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/societies?${query}`);
  },
  getSociety: (id) => request(`/societies/${id}`),
  getSocietyWorkers: (id) => request(`/societies/${id}/workers`),
  onboardWorker: (id, data) => request(`/societies/${id}/workers`, { method: 'POST', body: JSON.stringify(data) }),
  getSocietyFinance: (id) => request(`/societies/${id}/finance`),
  getSocietyWelfare: (id) => request(`/societies/${id}/welfare`),

  // Federation
  getFederationHealth: () => request('/federation/network-health'),
  getDemandForecast: () => request('/federation/demand/forecast'),
  approveRebalancePlan: (forecastId) => request('/federation/rebalance/approve', {
    method: 'POST',
    body: JSON.stringify({ forecastId })
  }),
  approveSocietyApplication: (appId) => request(`/federation/applications/${appId}/approve`, { method: 'POST' }),

  // AI Predictive Engine
  predictDemand: (data) => request('/ai/predict-demand', { method: 'POST', body: JSON.stringify(data) }),
  getRebalancePlan: (data) => request('/ai/rebalance-plan', { method: 'POST', body: JSON.stringify(data) })
};
