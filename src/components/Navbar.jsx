import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/', label: 'الألعاب' },
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActiveCheck = (link) => {
    if (link.label === 'الرئيسية') {
      return location.pathname === '/';
    }
    if (link.label === 'الألعاب') {
      return ['/', '/quiz', '/memory', '/color-match', '/wedding'].includes(location.pathname);
    }
    return location.pathname === link.to;
  };

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-pink-200/30'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              Play Gharam 🎮
            </span>
            <span className="text-xs text-gray-400 -mt-1 tracking-wide">
              بيوتي سنتر غرام سلطان
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isActiveCheck(link);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-pink-600 bg-pink-50 shadow-sm'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors"
            aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-pink-500 rounded-full transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
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
        <div className="bg-white/95 backdrop-blur-xl border-t border-pink-100 shadow-xl rounded-b-2xl mx-2 mb-2">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = isActiveCheck(link);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-pink-600 bg-pink-50 shadow-sm'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          {/* Mobile branding */}
          <div className="px-4 py-3 border-t border-pink-100">
            <p className="text-xs text-gray-400 text-center">
              بيوتي سنتر غرام سلطان
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;