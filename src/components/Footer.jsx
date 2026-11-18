import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-white text-lg">
                🦢
              </div>
              <span className="font-heading font-black text-xl text-white tracking-wide">
                SWAN WATER SPORTS
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Diveagar Beach's premier water adventure center. Certified safety with life jackets and lifeguards for family boat, jetskee, sofa ride, banana fall, and beach ATV quad rides.
            </p>
            <div className="flex items-start gap-2.5 text-xs text-cyan-300/80 leading-relaxed">
              <MapPin size={16} className="shrink-0 text-cyan-400 mt-0.5" />
              <span>Shivaji Chowk Beach, Opp. Satyawan Savitry Phakhadi, Diveagar, Raigad – 402404</span>
            </div>
          </div>

          {/* Quick Rides */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
              Featured Rides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">Family boat ride</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">Sofa ride</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">Banana ride</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">Jetskee ride</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">ATV bike ride</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">Couple jetskee ride</Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-cyan-400 transition-colors">All 9 Rides &amp; Booking</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-cyan-400 transition-colors">Instant Slot Booking</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About Rameez & Safety</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Beach Location & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Owner Desk */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
              Owner &amp; Booking Desk
            </h4>
            <p className="text-sm text-slate-300 mb-2">
              Owner: <strong className="text-white">Rameez Z. Fakji</strong>
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <a href="tel:9764596134" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                <Phone size={14} /> +91 9764596134
              </a>
              <a href="tel:7620644613" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                <Phone size={14} /> +91 7620644613
              </a>
              <a href="mailto:rameezfakji@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs">
                <Mail size={14} /> rameezfakji@gmail.com
              </a>
            </div>
            <Link
              to="/booking"
              className="inline-block w-full py-2.5 text-center font-bold text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all shadow-md shadow-cyan-600/30"
            >
              Book Online Now →
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Swan Water Sports Diveagar • Rameez Z. Fakji. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="italic text-cyan-400/80">"We have good service with life jacket &amp; life guard also"</span>
            <Link to="/admin" className="text-slate-600 hover:text-slate-400 text-[11px] font-semibold transition-colors">
              🔒 Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

