import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ShieldCheck, Check } from 'lucide-react';

export default function RideCard({ ride, onOpenModal, onSelectRide, isSelected }) {
  const getUnit = () => {
    if (ride.priceUnit) return ride.priceUnit;
    if (ride.id.includes('atv')) return '/ ride';
    if (ride.id.includes('couple')) return '/ couple';
    return '/ person';
  };

  const handleBookClick = (e) => {
    if (onSelectRide) {
      e.preventDefault();
      onSelectRide(ride);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col group overflow-hidden ${
      isSelected 
        ? 'ring-2 ring-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/10' 
        : 'border-cyan-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5'
    }`}>
      
      {/* Media Wrap */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={ride.image}
          alt={ride.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

        {/* Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-extrabold rounded-full bg-cyan-600/95 text-white shadow-md backdrop-blur-sm">
          {ride.tag || ride.category}
        </span>

        {isSelected && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-extrabold rounded-full bg-emerald-500 text-white shadow-md flex items-center gap-1">
            <Check size={13} className="stroke-[3]" /> Selected
          </span>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-md backdrop-blur-sm flex items-baseline gap-1">
          <span className="text-lg font-black font-heading text-cyan-700">₹{ride.price}</span>
          <span className="text-[11px] font-semibold text-slate-500">{getUnit()}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 mb-1 block">
            {ride.category}
          </span>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
            {ride.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {ride.description}
          </p>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-100">
              <Clock size={12} className="text-cyan-600" />
              {ride.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-100">
              <Users size={12} className="text-cyan-600" />
              {ride.capacity}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
              <ShieldCheck size={12} className="text-emerald-600" />
              Life Jacket
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
          {onOpenModal && (
            <button
              onClick={() => onOpenModal(ride)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-700 font-bold text-xs transition-colors text-center"
            >
              Details
            </button>
          )}
          {onSelectRide ? (
            <button
              onClick={handleBookClick}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all shadow-sm text-center ${
                isSelected
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20'
              }`}
            >
              {isSelected ? 'Selected ✓' : 'Book This Ride →'}
            </button>
          ) : (
            <Link
              to={`/booking?ride=${ride.id}`}
              className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-sm shadow-cyan-600/20 text-center"
            >
              Book Now →
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
