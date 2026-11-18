import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { RIDES_DATA } from '../data/ridesData';
import { 
  ShieldCheck, Lock, Eye, EyeOff, Search, Filter, 
  RefreshCw, CheckCircle, Clock, XCircle, Trash2, 
  MessageCircle, Phone, Printer, Plus, Edit2, Check, 
  AlertCircle, LogOut, ArrowRight, DollarSign, Calendar, Users
} from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('swan_admin_token') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rides, setRides] = useState(RIDES_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'rides'

  // Modals
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [editingRide, setEditingRide] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // Walk-in form state
  const [walkInRideId, setWalkInRideId] = useState(RIDES_DATA[0].id);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInGuests, setWalkInGuests] = useState(2);
  const [walkInDate, setWalkInDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isSavingWalkIn, setIsSavingWalkIn] = useState(false);

  // Check token on mount
  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  // Load Dashboard Data
  const loadDashboardData = async () => {
    setIsLoading(true);
    setActionSuccess('');
    try {
      const [statsRes, bookingsRes, ridesRes] = await Promise.all([
        api.adminGetStats(token),
        api.adminGetBookings(token),
        api.getRides()
      ]);

      if (statsRes && statsRes.stats) setStats(statsRes.stats);
      if (bookingsRes && bookingsRes.data) setBookings(bookingsRes.data);
      if (ridesRes && ridesRes.length > 0) setRides(ridesRes);
    } catch (err) {
      console.error('[Admin] Error loading dashboard:', err.message);
      if (err.message.includes('Unauthorized') || err.message.includes('expired')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await api.adminLogin(password.trim());
      if (res.token) {
        sessionStorage.setItem('swan_admin_token', res.token);
        setToken(res.token);
      }
    } catch (err) {
      setLoginError(err.message || 'Incorrect admin password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('swan_admin_token');
    setToken('');
    setPassword('');
    setStats(null);
    setBookings([]);
  };

  // Status update
  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await api.adminUpdateStatus(token, bookingId, newStatus);
      setBookings(prev => prev.map(b => (b.id === bookingId || b.bookingReference === bookingId ? { ...b, status: newStatus } : b)));
      setActionSuccess(`Booking ${bookingId} updated to ${newStatus}`);
      setTimeout(() => setActionSuccess(''), 3000);
      // Reload stats
      const statsRes = await api.adminGetStats(token);
      if (statsRes && statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (bookingId, ref) => {
    if (!window.confirm(`Are you sure you want to delete booking ${ref || bookingId}?`)) return;
    try {
      await api.adminDeleteBooking(token, bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId && b.bookingReference !== bookingId));
      setActionSuccess(`Booking deleted successfully.`);
      setTimeout(() => setActionSuccess(''), 3000);
      const statsRes = await api.adminGetStats(token);
      if (statsRes && statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      alert(`Error deleting booking: ${err.message}`);
    }
  };

  // Submit Walk-in Booking
  const handleCreateWalkIn = async (e) => {
    e.preventDefault();
    if (!walkInName || !walkInPhone) return;

    setIsSavingWalkIn(true);
    try {
      await api.adminCreateWalkIn(token, {
        rideId: walkInRideId,
        customerName: walkInName.trim(),
        customerPhone: walkInPhone.trim(),
        guestCount: walkInGuests,
        date: walkInDate,
        notes: 'Walk-in registration at Shivaji Chowk Beach Counter'
      });

      setShowWalkInModal(false);
      setWalkInName('');
      setWalkInPhone('');
      setWalkInGuests(2);
      setActionSuccess('Walk-in booking created successfully!');
      setTimeout(() => setActionSuccess(''), 3000);
      loadDashboardData();
    } catch (err) {
      alert(`Failed to save walk-in: ${err.message}`);
    } finally {
      setIsSavingWalkIn(false);
    }
  };

  // Save Ride Price Edit
  const handleSaveRidePrice = async (e) => {
    e.preventDefault();
    if (!editingRide || !editPrice) return;
    try {
      await api.adminUpdateRide(token, editingRide.id, { price: Number(editPrice) });
      setRides(prev => prev.map(r => r.id === editingRide.id ? { ...r, price: Number(editPrice) } : r));
      setEditingRide(null);
      setActionSuccess(`Updated price for ${editingRide.name} to ₹${editPrice}`);
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      alert(`Failed to update price: ${err.message}`);
    }
  };

  // WhatsApp Customer Link
  const getWhatsAppCustomerUrl = (b) => {
    const phone = b.customerPhone ? b.customerPhone.replace(/[^0-9]/g, '') : '';
    const cleanPhone = phone.length === 10 ? `91${phone}` : phone;
    const ref = b.bookingReference || b.reference;
    const msg = `Hi ${b.customerName}! Your booking with Swan Water Sports at Diveagar Beach is confirmed!\n\n📋 Booking Reference: *${ref}*\n🏄 Ride: *${b.rideName}*\n📅 Date: *${b.bookingDate || b.date}*\n⏰ Beach Hours: *08:30 AM – 06:30 PM (Sunset)*\n👥 Guests: *${b.guestCount || b.guests} Persons*\n💰 Total: *₹${(b.pricing && b.pricing.totalAmount) || b.totalPrice}* (Pay on Beach)\n\n📍 Shivaji Chowk Beach, Opp. Satyawan Savitry Phakhadi, Diveagar.\nCall/WhatsApp Rameez Fakji: 9764596134. See you on the beach! 🌊`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = !searchTerm || (
      (b.customerName && b.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.customerPhone && b.customerPhone.includes(searchTerm)) ||
      (b.bookingReference && b.bookingReference.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.reference && b.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.rideName && b.rideName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchesStatus = statusFilter === 'All' || b.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || (b.bookingDate || b.date) === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center bg-gradient-to-br from-cyan-900 via-slate-900 to-slate-950">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-cyan-200/50 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-3xl mx-auto shadow-md shadow-cyan-600/30">
              🦢
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Swan Water Sports • Shivaji Chowk Beach, Diveagar
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Admin Password</span>
                <span className="text-[10px] text-cyan-600 font-normal">rameez@swansports</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm shadow-md shadow-cyan-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock size={16} />
              <span>{isLoggingIn ? 'Verifying...' : 'Access Admin Dashboard →'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400">
              Only authorized access for Rameez Fakji &amp; Swan Water Sports Staff.
            </span>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGGED-IN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-xl">
              🦢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-lg sm:text-xl text-white">
                  Swan Water Sports Admin
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-600 text-white">
                  Rameez Fakji Portal
                </span>
              </div>
              <p className="text-xs text-cyan-200">
                Shivaji Chowk Beach, Diveagar • Counter Open: 08:30 AM – 06:30 PM (Sunset)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowWalkInModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus size={15} />
              <span>+ Walk-In Booking</span>
            </button>

            <button
              onClick={loadDashboardData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-rose-200 font-bold text-xs flex items-center gap-1.5 border border-rose-700/50 transition-all"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Flash Success Message */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle size={18} className="text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Total Bookings
              </span>
              <div className="font-heading font-black text-3xl text-slate-900">
                {stats ? stats.totalBookings : bookings.length}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">All registered visitors</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl">
              📋
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Today's Bookings
              </span>
              <div className="font-heading font-black text-3xl text-emerald-600">
                {stats ? stats.todayBookings : 0}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Scheduled for today</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              🏖️
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Total Revenue
              </span>
              <div className="font-heading font-black text-3xl text-cyan-800">
                ₹{stats ? stats.totalRevenue.toLocaleString() : 0}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Confirmed &amp; Completed</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
              💰
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Active Fleet
              </span>
              <div className="font-heading font-black text-3xl text-slate-900">
                9
              </div>
              <span className="text-xs text-cyan-600 font-bold mt-1 block">All rides operational</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              🏄
            </div>
          </div>

        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>📋 Bookings List</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${activeTab === 'bookings' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {filteredBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rides')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'rides'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>🏄 9 Rides &amp; Rates</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${activeTab === 'rides' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
              9
            </span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cyan-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, ref..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-cyan-600 text-xs font-semibold outline-none"
                />
              </div>

              {/* Status and Date Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Filter size={14} />
                  <span>Status:</span>
                </div>
                {['All', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === st
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  title="Filter by date"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold outline-none text-slate-700"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="text-xs text-rose-600 font-bold hover:underline"
                  >
                    Clear Date
                  </button>
                )}
              </div>

            </div>

            {/* Bookings Table / List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
                <div className="text-4xl">🌊</div>
                <h3 className="font-heading font-black text-lg text-slate-900">No Bookings Found</h3>
                <p className="text-xs text-slate-500">
                  Try clearing your search filters, or click "+ Walk-In Booking" to add a customer.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-cyan-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4">Ref Code</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Activity / Ride</th>
                        <th className="py-3.5 px-4">Date of Visit</th>
                        <th className="py-3.5 px-4">Guests</th>
                        <th className="py-3.5 px-4">Total</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredBookings.map((b) => {
                        const ref = b.bookingReference || b.reference;
                        const total = (b.pricing && b.pricing.totalAmount) || b.totalPrice || 0;
                        const date = b.bookingDate || b.date;

                        return (
                          <tr key={b.id || ref} className="hover:bg-cyan-50/40 transition-colors">
                            <td className="py-3.5 px-4 font-black font-heading text-cyan-800">
                              {ref}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{b.customerName}</div>
                              <a href={`tel:${b.customerPhone}`} className="text-slate-500 hover:text-cyan-700 flex items-center gap-1 mt-0.5">
                                <Phone size={11} />
                                <span>{b.customerPhone}</span>
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-800">
                              {b.rideName}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">
                              {date}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-800">
                              {b.guestCount || b.guests}
                            </td>
                            <td className="py-3.5 px-4 font-black text-cyan-800 text-sm">
                              ₹{total}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateStatus(b.id || ref, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold outline-none cursor-pointer border ${
                                  b.status === 'Confirmed'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : b.status === 'Completed'
                                    ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={getWhatsAppCustomerUrl(b)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat on WhatsApp"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                >
                                  <MessageCircle size={15} />
                                </a>
                                <button
                                  onClick={() => setViewingBooking(b)}
                                  title="View Ticket Pass"
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                >
                                  <Printer size={15} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBooking(b.id, ref)}
                                  title="Delete"
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: 9 RIDES & RATES */}
        {activeTab === 'rides' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-xl text-slate-900">
                  Active Diveagar Water Sports Fleet (9 Rides)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust rates or review specifications for the 9 rides on your beach banner.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rides.map((ride, idx) => (
                <div key={ride.id} className="bg-white rounded-2xl border border-cyan-100 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="relative h-44 bg-slate-100">
                    <img src={ride.image} alt={ride.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900/80 text-white">
                      #{idx + 1}
                    </span>
                    <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-xl bg-white font-heading font-black text-cyan-800 text-sm shadow">
                      ₹{ride.price} <span className="text-[10px] text-slate-500 font-semibold">{ride.priceUnit || '/ person'}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-heading font-black text-base text-slate-900">
                      {ride.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ride.description}
                    </p>

                    <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                      <div>⏱️ <strong>Duration:</strong> {ride.duration}</div>
                      <div>👥 <strong>Capacity:</strong> {ride.capacity}</div>
                      <div>🦺 <strong>Safety:</strong> Certified Life Jacket &amp; Life Guard</div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingRide(ride);
                        setEditPrice(String(ride.price));
                      }}
                      className="w-full py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit2 size={13} />
                      <span>Edit Price (₹{ride.price})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* WALK-IN BOOKING MODAL */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-cyan-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-black text-xl text-slate-900">
                  + New Walk-In Booking
                </h3>
                <p className="text-xs text-slate-500">Record customer at Shivaji Chowk Beach Counter</p>
              </div>
              <button onClick={() => setShowWalkInModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Ride *</label>
                <select
                  value={walkInRideId}
                  onChange={(e) => setWalkInRideId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold outline-none"
                >
                  {rides.map(r => (
                    <option key={r.id} value={r.id}>{r.name} - ₹{r.price} {r.priceUnit || '/ person'}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guest Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Samir Patil"
                    value={walkInName}
                    onChange={(e) => setWalkInName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9823012345"
                    value={walkInPhone}
                    onChange={(e) => setWalkInPhone(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={walkInGuests}
                    onChange={(e) => setWalkInGuests(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={walkInDate}
                    onChange={(e) => setWalkInDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingWalkIn}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all"
                >
                  {isSavingWalkIn ? 'Saving...' : 'Save Walk-In Booking →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRICE MODAL */}
      {editingRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 border border-cyan-100 shadow-2xl space-y-4">
            <h3 className="font-heading font-black text-lg text-slate-900">
              Edit Price: {editingRide.name}
            </h3>
            <form onSubmit={handleSaveRidePrice} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rate in Rupees (₹)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-sm outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRide(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-600 text-white font-bold"
                >
                  Save Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW TICKET PASS MODAL */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-cyan-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Booking Pass</span>
                <h3 className="font-heading font-black text-xl text-cyan-800">
                  {viewingBooking.bookingReference || viewingBooking.reference}
                </h3>
              </div>
              <button onClick={() => setViewingBooking(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-cyan-200 p-5 bg-cyan-50/50 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block">Customer</span>
                  <strong className="text-slate-900 font-bold text-sm">{viewingBooking.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <strong className="text-slate-900 font-bold text-sm">{viewingBooking.customerPhone}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Activity</span>
                  <strong className="text-slate-900 font-bold">{viewingBooking.rideName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Date of Visit</span>
                  <strong className="text-slate-900 font-bold">{viewingBooking.bookingDate || viewingBooking.date}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Guests</span>
                  <strong className="text-slate-900 font-bold">{viewingBooking.guestCount || viewingBooking.guests} Persons</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Amount</span>
                  <strong className="text-cyan-800 font-black text-sm">
                    ₹{(viewingBooking.pricing && viewingBooking.pricing.totalAmount) || viewingBooking.totalPrice}
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={getWhatsAppCustomerUrl(viewingBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} />
                <span>Message Customer on WhatsApp</span>
              </a>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 flex items-center gap-1"
              >
                <Printer size={15} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

