import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/magazine', label: 'المجلة' },
  { to: '/login', label: 'تسجيل الدخول' },
];

function Navbar() {
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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent backdrop-blur-sm'
      }`}
      style={{ borderBottom: scrolled ? '1px solid #e8e4de' : '1px solid transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="غرام سلطان"
              className="h-10 w-10 rounded-lg object-contain"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            <div className="flex flex-col">
              <span
                className="text-lg font-bold transition-all duration-300 group-hover:scale-105 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #d4af37, #c9a030)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                غرام سلطان
              </span>
              <span className="text-[10px] text-gray-400 tracking-wider leading-tight" style={{ fontFamily: "'Cairo', sans-serif" }}>
                مجلة الجمال والأناقة
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to === '/magazine' && location.pathname.startsWith('/magazine'));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#d4af37] bg-[#d4af37]/10'
                      : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2 bg-[#1a1a2e]' : 'bg-gray-600'
                }`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'bg-gray-600'
                }`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2 bg-[#1a1a2e]' : 'bg-gray-600'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl rounded-b-2xl mx-2 mb-2">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to === '/magazine' && location.pathname.startsWith('/magazine'));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#d4af37] bg-[#d4af37]/10'
                      : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
