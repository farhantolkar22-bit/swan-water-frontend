import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, Clock, Users, Shield, Award } from 'lucide-react';

export default function RideModal({ ride, onClose, onSelectRide }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!ride) return null;

  const handleBookClick = () => {
    if (onSelectRide) {
      onSelectRide(ride);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cyan-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Media */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100 shrink-0">
          <img
            src={ride.image}
            alt={ride.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500 text-white mb-2">
                {ride.tag || ride.category}
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {ride.name}
              </h2>
            </div>
            <div className="text-right shrink-0 bg-white/95 px-4 py-2 rounded-2xl shadow-lg">
              <div className="text-2xl font-black font-heading text-cyan-700">₹{ride.price}</div>
              <div className="text-[11px] font-bold text-slate-500">{ride.priceUnit || '/ person'}</div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-slate-600 text-base leading-relaxed">
            {ride.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100">
            <div>
              <span className="text-[11px] uppercase font-bold text-cyan-700 block mb-0.5">Duration</span>
              <div className="font-bold text-slate-900 text-sm">{ride.duration}</div>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-cyan-700 block mb-0.5">Min Age</span>
              <div className="font-bold text-slate-900 text-sm">{ride.minAge}+ Years</div>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-cyan-700 block mb-0.5">Thrill Level</span>
              <div className="font-bold text-cyan-700 text-sm">{ride.thrillLevel}</div>
            </div>
          </div>

          {/* Highlights */}
          {ride.highlights && ride.highlights.length > 0 && (
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Award size={18} className="text-cyan-600" />
                <span>Adventure Highlights</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ride.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <Check size={16} className="text-cyan-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guarantee Box */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-3">
            <Shield size={20} className="shrink-0 text-amber-600" />
            <span>
              <strong>Rameez Fakji Guarantee:</strong> "We have good service with life jacket &amp; life guard also" on Diveagar Beach.
            </span>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            {onSelectRide ? (
              <button
                onClick={handleBookClick}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md shadow-cyan-600/30 transition-all"
              >
                Book This Ride Now →
              </button>
            ) : (
              <Link
                to={`/booking?ride=${ride.id}`}
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md shadow-cyan-600/30 transition-all"
              >
                Book This Ride Now →
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
