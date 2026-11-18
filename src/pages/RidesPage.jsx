import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RIDES_DATA, ADDONS_DATA } from '../data/ridesData';
import { api } from '../services/api';
import RideCard from '../components/RideCard';
import RideModal from '../components/RideModal';
import { 
  Check, ShieldCheck, Printer, Calendar, Users, 
  AlertCircle, Phone, Sparkles, MessageCircle, Mail 
} from 'lucide-react';

export default function RidesPage() {
  const [searchParams] = useSearchParams();
  const queryRide = searchParams.get('ride');
  const bookingFormRef = useRef(null);

  // Selected ride for booking
  const [selectedRide, setSelectedRide] = useState(() => {
    if (queryRide) {
      const alias = queryRide === 'ride-jetski' ? 'ride-jetskee' : queryRide;
      return RIDES_DATA.find(r => r.id === alias || r.slug === alias) || RIDES_DATA[0];
    }
    return RIDES_DATA[0];
  });

  // Modal ride details
  const [modalRide, setModalRide] = useState(null);

  // Booking form states (time slot removed per user request)
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(todayStr);
  const [dateOffset, setDateOffset] = useState(0);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Submission & status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle URL query updates
  useEffect(() => {
    if (queryRide) {
      const alias = queryRide === 'ride-jetski' ? 'ride-jetskee' : queryRide;
      const found = RIDES_DATA.find(r => r.id === alias || r.slug === alias);
      if (found) {
        setSelectedRide(found);
      }
    }
  }, [queryRide]);

  // Handler when user clicks "Book This Ride" on any card
  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Date Presets Handler
  const handleDatePreset = (offset) => {
    setDateOffset(offset);
    const d = new Date();
    d.setDate(d.getDate() + offset);
    setBookingDate(d.toISOString().split('T')[0]);
  };

  // Addon Toggle
  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // Calculations
  const multiplier = (selectedRide.id.includes('atv') || selectedRide.id.includes('couple'))
    ? Math.ceil(guestCount / 2)
    : guestCount;
  const activitySubtotal = selectedRide.price * multiplier;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalAmount = activitySubtotal + addonsTotal;

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = customerName.trim();
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp / Phone number.');
      return;
    }

    if (!bookingDate) {
      setErrorMessage('Please select a date for your visit.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (bookingDate < todayStr) {
      setErrorMessage('Booking date cannot be in the past. Please select today or a future date.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      rideId: selectedRide.id,
      rideName: selectedRide.name,
      bookingDate,
      date: bookingDate,
      guestCount,
      guests: guestCount,
      addons: selectedAddons.map(a => a.name),
      totalPrice: totalAmount,
      customerName: trimmedName,
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || `${cleanPhone}@guest.swanwatersports.com`,
      notes: ''
    };

    try {
      const res = await api.createBooking(payload);
      const bookingData = res.data || res;
      setConfirmedBooking(bookingData);
      window.scrollTo({ top: bookingFormRef.current ? bookingFormRef.current.offsetTop - 80 : 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to complete reservation. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp share message to Rameez Fakji (+91 9764596134)
  const getWhatsAppShareUrl = () => {
    if (!confirmedBooking) return '#';
    const ref = confirmedBooking.bookingReference || confirmedBooking.reference;
    const msg = `🌊 *SWAN WATER SPORTS — DIVEAGAR BEACH*\n📋 *New Booking Reservation*\n━━━━━━━━━━━━━━━━━━━━\n🏷️ Reference: *${ref}*\n🏄 Ride: *${confirmedBooking.rideName}*\n📅 Date: *${confirmedBooking.bookingDate || confirmedBooking.date}*\n⏰ Beach Hours: *08:30 AM – 06:30 PM (Sunset)*\n👥 Guests: *${confirmedBooking.guestCount || confirmedBooking.guests} Persons*\n👤 Customer: *${confirmedBooking.customerName}*\n📞 Phone: *${confirmedBooking.customerPhone}*\n💰 Total Amount: *₹${totalAmount}* (Pay on Beach)\n━━━━━━━━━━━━━━━━━━━━\n📍 Counter: Shivaji Chowk Beach, Diveagar`;
    return `https://wa.me/919764596134?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 bg-gradient-to-b from-cyan-100/60 to-cyan-50/20 border-b border-cyan-100 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 block">
            Swan Water Sports • Shivaji Chowk Beach, Diveagar
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900">
            Our 9 Water &amp; Beach Rides
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Browse all 9 activities below, pick your favorite ride, and book your date directly.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
            <ShieldCheck size={16} className="text-cyan-600" />
            <span>"We have good service with life jacket &amp; life guard also"</span>
          </div>
        </div>
      </section>

      {/* 9 Rides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div>
            <h2 className="font-heading font-black text-2xl text-slate-900">
              Select A Ride To Book
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Click <strong>"Book This Ride"</strong> on any card to configure date, guests, and details below.
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-cyan-100 text-cyan-800">
            9 Activities Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RIDES_DATA.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              isSelected={selectedRide.id === ride.id}
              onSelectRide={handleSelectRide}
              onOpenModal={(r) => setModalRide(r)}
            />
          ))}
        </div>
      </section>

      {/* Combined Booking Section */}
      <section ref={bookingFormRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-cyan-200 shadow-2xl p-6 sm:p-10 animate-fadeIn space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-sm">
                <Check size={32} className="stroke-[3]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block">
                Booking Confirmed
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                You're Ready For Diveagar Ocean Thrills!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Show this digital pass at the <strong>Swan Water Sports</strong> counter at Shivaji Chowk Beach.
              </p>
            </div>

            {/* Notification Badge */}
            <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center gap-2 text-xs font-bold text-cyan-900 text-center">
              <Mail size={16} className="text-cyan-600 shrink-0" />
              <span>Confirmation details sent via WhatsApp and Email notification dispatched.</span>
            </div>

            {/* Ticket Pass */}
            <div className="rounded-2xl border-2 border-dashed border-cyan-200 p-6 bg-cyan-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-200/60 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Reference</span>
                  <span className="font-heading font-black text-xl text-cyan-800">
                    {confirmedBooking.bookingReference || confirmedBooking.reference}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-700">
                    {confirmedBooking.status || 'Confirmed'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Activity</span>
                  <strong className="text-slate-900 font-bold">{confirmedBooking.rideName}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Date of Visit</span>
                  <strong className="text-slate-900 font-bold">
                    {confirmedBooking.bookingDate || confirmedBooking.date}
                  </strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Beach Operating Hours</span>
                  <strong className="text-slate-900 font-bold">08:30 AM – 06:30 PM (Sunset)</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Riders / Guests</span>
                  <strong className="text-slate-900 font-bold">{confirmedBooking.guestCount || confirmedBooking.guests} Persons</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-200/60 flex items-center justify-between text-sm">
                <span className="text-xs text-slate-500">Total to Pay on Beach (Cash / UPI):</span>
                <span className="font-black font-heading text-xl text-cyan-800">₹{totalAmount}</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Guest: <strong>{confirmedBooking.customerName}</strong> ({confirmedBooking.customerPhone})
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={20} />
                <span>Open WhatsApp &amp; Send Booking to Rameez (+91 9764596134)</span>
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer size={16} />
                  <span>Print Pass</span>
                </button>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
                >
                  Book Another Ride
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Combined Booking Form */
          <div className="bg-white rounded-3xl border border-cyan-100 shadow-xl overflow-hidden">
            
            {/* Section Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-200 block mb-1">
                  Instant Slot Reservation
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl">
                  Book Your {selectedRide.name}
                </h3>
                <p className="text-cyan-100 text-xs sm:text-sm mt-1">
                  No advance payment needed • Pay directly at Shivaji Chowk Beach Counter with Rameez Fakji.
                </p>
              </div>
              <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-right">
                <span className="text-[10px] uppercase font-bold text-cyan-200 block">Rate</span>
                <span className="text-xl font-heading font-black text-white">₹{selectedRide.price}</span>
                <span className="text-xs text-cyan-100 ml-1">{selectedRide.priceUnit || '/ person'}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
              
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                  <AlertCircle size={18} className="shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Select Ride Shortcut & Date */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Selected Ride Card Thumbnail */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-cyan-50/70 border border-cyan-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedRide.image}
                      alt={selectedRide.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-sm shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 block">
                        Selected Activity
                      </span>
                      <h4 className="font-heading font-black text-base text-slate-900 leading-tight">
                        {selectedRide.name}
                      </h4>
                      <div className="text-cyan-700 font-extrabold text-sm mt-0.5">
                        ₹{selectedRide.price} <span className="text-xs text-slate-500 font-normal">{selectedRide.priceUnit || '/ person'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-cyan-200/60">
                    <div>⏱️ <strong>Duration:</strong> {selectedRide.duration}</div>
                    <div>👥 <strong>Capacity:</strong> {selectedRide.capacity}</div>
                    <div>🦺 <strong>Safety:</strong> Life Jacket &amp; Lifeguard Included</div>
                    <div>🏖️ <strong>Timing:</strong> Open all day (08:30 AM – Sunset)</div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic pt-1">
                    Want a different ride? Click any card in the grid above to switch instantly.
                  </p>
                </div>

                {/* Right: Date Picker */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Calendar size={14} className="text-cyan-600" />
                      <span>1. Choose Date of Visit</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        { label: 'Today', offset: 0 },
                        { label: 'Tomorrow', offset: 1 },
                        { label: 'Day After', offset: 2 }
                      ].map((preset) => (
                        <button
                          key={preset.offset}
                          type="button"
                          onClick={() => handleDatePreset(preset.offset)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            dateOffset === preset.offset
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="date"
                      value={bookingDate}
                      min={todayStr}
                      onChange={(e) => {
                        setBookingDate(e.target.value);
                        setDateOffset(-1);
                      }}
                      className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Beach operating hours: <strong>08:30 AM – 06:30 PM (Sunset)</strong>. You can arrive anytime on your booked date.
                    </p>
                  </div>

                </div>

              </div>

              {/* Step 2: Number of Guests */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Users size={14} className="text-cyan-600" />
                  <span>2. Number of Persons / Riders</span>
                </label>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-11 h-11 flex items-center justify-center font-black text-lg text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-14 text-center font-heading font-black text-lg text-slate-900">
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                      className="w-11 h-11 flex items-center justify-center font-black text-lg text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Subtotal: <strong>{multiplier} × ₹{selectedRide.price} = ₹{activitySubtotal}</strong>
                  </span>
                </div>
              </div>

              {/* Step 3: Optional Add-ons */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-cyan-600" />
                  <span>3. Optional Beach Add-ons</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ADDONS_DATA.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-50 border-cyan-500 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-lg">{addon.icon}</span>
                          <span className="font-heading font-black text-sm text-cyan-800">+₹{addon.price}</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 leading-tight">{addon.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-normal">{addon.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Details & Submit */}
              <div className="pt-6 border-t border-slate-100 space-y-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-cyan-600" />
                  <span>4. Your Contact Information (For WhatsApp &amp; Email Pass)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Patil"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email (For Confirmation Pass)</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Bar & Confirm Button */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Total to Pay at Beach Counter:</div>
                  <div className="text-3xl font-heading font-black text-cyan-800">
                    ₹{totalAmount}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {selectedRide.name} • {guestCount} Guests • Date: {bookingDate}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-base shadow-lg shadow-cyan-600/30 transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking Now →'}
                </button>
              </div>

            </form>

          </div>
        )}

      </section>

      {/* Ride Details Modal */}
      {modalRide && (
        <RideModal
          ride={modalRide}
          onClose={() => setModalRide(null)}
          onSelectRide={handleSelectRide}
        />
      )}

    </div>
  );
}
