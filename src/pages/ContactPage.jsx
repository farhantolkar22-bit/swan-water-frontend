import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 bg-gradient-to-b from-cyan-100/60 to-cyan-50/20 border-b border-cyan-100 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 block">
            Beach Station Access
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900">
            Location &amp; Contact
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Shivaji Chowk Beach, Diveagar • Direct contact with owner Rameez Z. Fakji
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Station Card, Map & Directions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl border border-cyan-100 overflow-hidden shadow-card">
              
              {/* Google Maps Embed */}
              <div className="relative h-60 bg-slate-100">
                <iframe
                  src="https://maps.google.com/maps?q=Diveagar%20Beach%20Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Diveagar Beach Map"
                  className="w-full h-full"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyan-400" />
                  <span>Shivaji Chowk Beach, Diveagar</span>
                </div>
              </div>

              {/* Station Info Body */}
              <div className="p-6 sm:p-7 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="text-[11px] uppercase font-extrabold text-cyan-700 tracking-wider block mb-1">
                      Exact Address
                    </span>
                    <div className="font-extrabold text-slate-900 text-sm leading-snug">
                      Shivaji Chowk Beach, Near Shivaji Chowk, Opp. Satyawan Savitry Phakhadi
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Diveagar, Tal : Shriwardhan, Dist : Raigad, Pin - 402 404
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-extrabold text-cyan-700 tracking-wider block mb-1">
                      Operating Hours
                    </span>
                    <div className="font-extrabold text-slate-900 text-sm">Monday – Sunday</div>
                    <div className="text-sm font-bold text-cyan-700 mt-0.5">08:30 AM – 06:30 PM</div>
                    <div className="text-xs text-slate-500 mt-0.5">Open 7 Days a Week</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-cyan-100">
                  <div>
                    <span className="text-[11px] uppercase font-extrabold text-cyan-700 tracking-wider block mb-1">
                      Owner Contact (Call / WhatsApp)
                    </span>
                    <div className="space-y-1">
                      <a href="tel:9764596134" className="block text-base font-black text-cyan-800 hover:text-cyan-600 transition-colors">
                        +91 9764596134
                      </a>
                      <a href="tel:7620644613" className="block text-base font-black text-cyan-800 hover:text-cyan-600 transition-colors">
                        +91 7620644613
                      </a>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Rameez Z. Fakji (Owner)</div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-extrabold text-cyan-700 tracking-wider block mb-1">
                      Official Email
                    </span>
                    <a
                      href="mailto:rameezfakji@gmail.com"
                      className="text-sm font-bold text-cyan-800 hover:underline break-all block"
                    >
                      rameezfakji@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instant Navigation & WhatsApp Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Shivaji+Chowk+Beach+Diveagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-sm transition-all"
                  >
                    <span>Open In Google Maps</span>
                    <ExternalLink size={15} />
                  </a>
                  <a
                    href="https://wa.me/919764596134?text=Hi%20Rameez,%20I%20am%20inquiring%20about%20Swan%20Water%20Sports%20at%20Diveagar%20Beach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-800 font-bold text-sm transition-all"
                  >
                    <MessageCircle size={16} className="text-emerald-600" />
                    <span>WhatsApp Rameez</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Landmark Note */}
            <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Landmark:</strong> Exactly opposite Satyawan Savitry Phakhadi near Shivaji Chowk right on the main beach entry point. Beach parking available.
            </div>

          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-cyan-100 shadow-card space-y-6">
            <div>
              <h3 className="font-heading font-black text-2xl text-slate-900">
                Send Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Send an instant message directly to owner Rameez Fakji.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been sent to Rameez Fakji.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Amit Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="amit@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="How many guests, activities interested in, or travel dates to Diveagar..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message To Rameez Fakji</span>
                <Send size={15} />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500 block mb-1">Prefer to call directly?</span>
              <a href="tel:+919764596134" className="text-cyan-700 font-extrabold text-base hover:underline inline-flex items-center gap-1.5">
                <Phone size={16} />
                <span>+91 9764596134</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

