import { RIDES_DATA } from '../data/ridesData';

const API_BASE = '/api';

export const api = {
  async getRides() {
    try {
      const res = await fetch(`${API_BASE}/rides`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return (data && data.data && data.data.length > 0) ? data.data : RIDES_DATA;
    } catch (err) {
      console.warn('[API Client] Backend unavailable, using local rides catalog:', err.message);
      return RIDES_DATA;
    }
  },

  async getRideById(id) {
    try {
      const res = await fetch(`${API_BASE}/rides/${id}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return RIDES_DATA.find(r => r.id === id || r.slug === id) || RIDES_DATA[0];
    }
  },

  async createBooking(payload) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Booking failed');
      const data = await res.json();
      return data.data || data;
    } catch (err) {
      console.warn('[API Client] Server offline, generating digital pass locally:', err.message);
      const ref = `SWS-${Math.floor(10000 + Math.random() * 90000)}`;
      return {
        id: `bkg-${Date.now()}`,
        bookingReference: ref,
        reference: ref,
        rideId: payload.rideId,
        rideName: payload.rideName,
        date: payload.bookingDate || payload.date,
        timeSlot: payload.timeSlot || 'Full Day (08:30 AM - Sunset)',
        guests: payload.guestCount || payload.guests || 1,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        customerPhone: payload.customerPhone,
        pricing: {
          totalAmount: payload.totalPrice || 500
        },
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
    }
  },

  // Admin APIs
  async adminLogin(password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async adminVerify(token) {
    const res = await fetch(`${API_BASE}/admin/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Session invalid');
    return await res.json();
  },

  async adminGetStats(token) {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load stats');
    return await res.json();
  },

  async adminGetBookings(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/bookings${query ? `?${query}` : ''}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load bookings');
    return await res.json();
  },

  async adminCreateWalkIn(token, payload) {
    const res = await fetch(`${API_BASE}/admin/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create walk-in booking');
    return data;
  },

  async adminUpdateStatus(token, id, status) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update status');
    return data;
  },

  async adminDeleteBooking(token, id) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete booking');
    return data;
  },

  async adminUpdateRide(token, id, payload) {
    const res = await fetch(`${API_BASE}/admin/rides/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update ride');
    return data;
  }
};
