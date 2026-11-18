import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rides & Booking', path: '/rides', badge: '9' },
    { name: 'About & Safety', path: '/about' },
    { name: 'Location & Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-cyan-100 py-3' 
        : 'bg-white/80 backdrop-blur-sm border-b border-cyan-100/60 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🦢</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-wider text-slate-900 text-lg sm:text-xl leading-none">
                SWAN WATER SPORTS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-600 mt-1">
                Diveagar Beach • Raigad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'text-cyan-700 bg-cyan-50 font-bold' 
                      : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold bg-cyan-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct Call Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919764596134"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all shadow-sm shadow-cyan-600/20 hover:shadow-cyan-600/40"
            >
              <Phone size={14} className="stroke-[2.5]" />
              <span>Call: 9764596134</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-cyan-100 shadow-xl px-4 pt-3 pb-5 space-y-1 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive 
                    ? 'text-cyan-700 bg-cyan-50 font-bold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-extrabold bg-cyan-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:+919764596134"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow-sm"
            >
              <Phone size={16} />
              <span>Call Rameez: 9764596134</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

