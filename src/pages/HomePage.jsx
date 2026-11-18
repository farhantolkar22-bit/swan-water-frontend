import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RIDES_DATA } from '../data/ridesData';
import RideCard from '../components/RideCard';
import RideModal from '../components/RideModal';
import { Shield, MapPin, Award, CheckCircle, Phone, ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  const [selectedRide, setSelectedRide] = useState(null);
  const featuredRides = RIDES_DATA.filter(r => r.featured).slice(0, 3);

  const reviews = [
    {
      id: 1,
      name: "Aniket Shinde",
      city: "Pune",
      activity: "Family boat ride",
      avatar: "AS",
      rating: 5,
      comment: "Visited with family on Sunday. The family boat ride was very smooth and lifeguards helped the kids wear life jackets properly. Honest and safe experience."
    },
    {
      id: 2,
      name: "Pooja & Sameer",
      city: "Mumbai",
      activity: "Jetskee ride",
      avatar: "PS",
      rating: 5,
      comment: "Jetskee ride was really fun and thrilling. Rameez bhai and the boat drivers were polite and helpful. Good rates compared to other beaches."
    },
    {
      id: 3,
      name: "Milind Kulkarni",
      city: "Thane",
      activity: "Banana & Sofa ride",
      avatar: "MK",
      rating: 5,
      comment: "We took the banana and sofa ride with our group of friends. Everything was well-managed and safety was given priority. Will come again."
    }
  ];

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero.jpg"
            alt="Diveagar Beach Water Sports"
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-cyan-300">
            <span className="pulse-dot" />
            <span>🏖️ Diveagar Beach, Raigad • Operated by Rameez Z. Fakji</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Experience Ultimate Ocean Thrills <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-amber-300">
              At Diveagar's Premier Water Sports
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            Carve the waves on high-speed jetski, enjoy safe family boat &amp; bumper sofa rides, banana fall, and beach 4×4 quad bikes. Certified life jackets &amp; stationed lifeguards for 100% peace of mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/booking"
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-base transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5"
            >
              Book Now →
            </Link>
            <Link
              to="/rides"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-base backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              Explore All 9 Rides
            </Link>
            <a
              href="tel:+919764596134"
              className="px-6 py-4 rounded-xl bg-amber-500/90 hover:bg-amber-500 text-white font-bold text-base transition-all hover:-translate-y-0.5 shadow-md shadow-amber-500/20"
            >
              📞 Call: 9764596134
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 text-left">
              <Shield size={24} className="text-cyan-400 shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Good Service</strong>
                <span className="text-xs text-slate-300">With Life Jacket &amp; Life Guard</span>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 text-left">
              <MapPin size={24} className="text-cyan-400 shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Prime Beach Spot</strong>
                <span className="text-xs text-slate-300">Shivaji Chowk Beach</span>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 text-left">
              <Award size={24} className="text-amber-400 shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Rameez Z. Fakji</strong>
                <span className="text-xs text-slate-300">Direct Owner Supervision</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hero Base Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-white/10 py-5">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-heading font-black text-2xl text-cyan-400">9</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Water &amp; Sand Rides</p>
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-emerald-400">100%</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Life Jacket Provided</p>
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-amber-400">7 Days</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Open Mon to Sun</p>
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-cyan-300">Direct</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Rameez Fakji Beach Counter</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rides Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 mb-2 block">
            Popular Rides
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 mb-3">
            Top Water Adventures
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose from our 9 exciting beach &amp; water rides with certified life jackets and lifeguards for every rider.
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onOpenModal={(r) => setSelectedRide(r)}
            />
          ))}
        </div>

        {/* Explore All 9 Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-sm">
              All 9 Rides
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl">
              Family Boat, Jetskee, Bumper Sofa, Banana &amp; Quad Bike
            </h3>
            <p className="text-cyan-100 text-sm max-w-xl">
              See photos and prices for all 9 rides and book instantly online or pay on beach.
            </p>
          </div>
          <Link
            to="/rides"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-cyan-900 hover:bg-cyan-50 font-bold text-sm transition-all shadow-md hover:scale-105"
          >
            <span>See All 9 Rides &amp; Book</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Guest Feedback Section (Small, Normal Authentic Reviews) */}
      <section className="py-16 bg-white border-y border-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 mb-2 block">
              Visitor Feedback
            </span>
            <h2 className="font-heading font-black text-3xl text-slate-900 mb-2">
              What Our Guests Say
            </h2>
            <p className="text-slate-600 text-sm">
              Honest feedback from tourists and families visiting Diveagar Beach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-cyan-ultralight/60 border border-cyan-100 shadow-sm flex flex-col justify-between hover:border-cyan-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3 text-sm">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" stroke="none" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-cyan-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white font-extrabold flex items-center justify-center text-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <p className="text-xs text-cyan-700 font-medium">{rev.city} • {rev.activity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Owner Assurance Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 block">
              Direct From Owner
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              "We have good service with life jacket &amp; life guard also"
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At <strong>Swan Water Sports</strong>, owner <strong>Rameez Z. Fakji</strong> ensures that safety comes first for every family, group, and couple. Life jackets and life guards are provided for every single water ride.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-cyan-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  Life jackets provided for kids and adults
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-cyan-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  Experienced lifeguards stationed on beach and escort boats
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-cyan-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  Direct beach station at Shivaji Chowk Beach, Diveagar
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="tel:+919764596134"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md"
              >
                <Phone size={16} />
                <span>Call: 9764596134</span>
              </a>
              <a
                href="tel:+917620644613"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-cyan-600 text-slate-800 font-bold text-sm"
              >
                <Phone size={16} />
                <span>Alt: 7620644613</span>
              </a>
            </div>
          </div>

          {/* Right Location Box */}
          <div className="lg:col-span-5 bg-cyan-ultralight p-8 rounded-3xl border border-cyan-100 shadow-card space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-2xl shadow-sm">
                📍
              </div>
              <div>
                <h4 className="font-heading font-black text-lg text-slate-900">Shivaji Chowk Beach, Diveagar</h4>
                <p className="text-xs uppercase font-extrabold text-cyan-700 tracking-wider">SWAN WATER SPORTS</p>
              </div>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed pl-3 border-l-4 border-cyan-600">
              <strong>Shivaji Chowk Beach</strong>, Near Shivaji Chowk,<br />
              Opp. Satyawan Savitry Phakhadi,<br />
              Diveagar, Tal : Shriwardhan,<br />
              Dist : Raigad, Pin - 402 404
            </div>

            <div className="space-y-2 pt-4 border-t border-cyan-200/60 text-sm text-slate-700">
              <div><strong>Owner:</strong> Rameez Z. Fakji</div>
              <div>
                <strong>Phones:</strong>{' '}
                <a href="tel:9764596134" className="text-cyan-700 font-bold hover:underline">9764596134</a> /{' '}
                <a href="tel:7620644613" className="text-cyan-700 font-bold hover:underline">7620644613</a>
              </div>
              <div>
                <strong>Email:</strong>{' '}
                <a href="mailto:rameezfakji@gmail.com" className="text-cyan-700 font-bold hover:underline">rameezfakji@gmail.com</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ride Details Modal */}
      {selectedRide && (
        <RideModal
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
        />
      )}

    </div>
  );
}
