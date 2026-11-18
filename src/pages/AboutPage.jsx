import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Phone, MapPin, Clock, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 bg-gradient-to-b from-cyan-100/60 to-cyan-50/20 border-b border-cyan-100 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 block">
            Swan Water Sports • Diveagar Beach
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900">
            About &amp; Safety
          </h1>
          <p className="text-cyan-800 text-base sm:text-lg font-bold">
            "We have good service with life jacket &amp; life guard also"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Safety Highlights From Template */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-cyan-100 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
              <ShieldCheck size={26} />
            </div>
            <h2 className="font-heading font-black text-xl text-slate-900">
              Life Jacket For Every Rider
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Safe, high-buoyancy life jackets are provided and mandatory for every person and child before entering the water. Whether swimming or non-swimmer, you can enjoy all rides with 100% peace of mind.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cyan-100 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
              <Users size={26} />
            </div>
            <h2 className="font-heading font-black text-xl text-slate-900">
              Life Guards On Duty
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Experienced life guards are stationed right on Shivaji Chowk Beach shore and accompany all boat and towable rides on the water to ensure complete safety and assistance.
            </p>
          </div>

        </div>

        {/* Owner & Official Station Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-cyan-100 shadow-card space-y-6">
          <div className="border-b border-cyan-100 pb-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 block mb-1">
              Operated By
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
              Rameez Z. Fakji
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Personal supervision and beach counter directly at Shivaji Chowk Beach, Diveagar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-cyan-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="block text-slate-900 font-bold">Exact Beach Address:</strong>
                  Shivaji Chowk Beach, Near Shivaji Chowk,<br />
                  Opp. Satyawan Savitry Phakhadi,<br />
                  Diveagar, Tal : Shriwardhan, Dist : Raigad, Pin - 402 404
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-cyan-600 shrink-0" size={18} />
                <div>
                  <strong className="text-slate-900 font-bold">Operating Hours:</strong> Monday – Sunday, 08:30 AM – 06:30 PM (Sunset)
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-cyan-600 shrink-0" size={18} />
                <div>
                  <strong className="text-slate-900 font-bold">Call / WhatsApp:</strong>{' '}
                  <a href="tel:+919764596134" className="text-cyan-700 font-bold hover:underline">+91 9764596134</a> /{' '}
                  <a href="tel:+917620644613" className="text-cyan-700 font-bold hover:underline">+91 7620644613</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-cyan-600 shrink-0" size={18} />
                <div>
                  <strong className="text-slate-900 font-bold">Official Email:</strong>{' '}
                  <a href="mailto:rameezfakji@gmail.com" className="text-cyan-700 font-bold hover:underline">rameezfakji@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/rides"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md transition-all"
            >
              See All 9 Rides &amp; Book →
            </Link>
            <a
              href="tel:+919764596134"
              className="px-6 py-3 rounded-xl border border-slate-300 hover:border-cyan-600 text-slate-800 font-bold text-sm transition-all"
            >
              📞 Call Rameez Fakji: 9764596134
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}
