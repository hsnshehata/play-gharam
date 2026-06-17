import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: '#1a1a2e',
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <Link to="/magazine" className="inline-flex items-center justify-center mb-6 group">
            <img
              src="/logo-big.png"
              alt="غرام سلطان"
              className="h-16 object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.2))' }}
            />
          </Link>

          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            دليلك الشامل لعالم الجمال والأناقة
          </p>

          {/* Divider */}
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
              margin: '0 auto 20px',
            }}
          />

          {/* Links */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <Link
              to="/magazine"
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              onMouseEnter={(e) => e.target.style.color = '#d4af37'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              المجلة
            </Link>
            <Link
              to="/login"
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              onMouseEnter={(e) => e.target.style.color = '#d4af37'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              تسجيل الدخول
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            جميع الحقوق محفوظة © 2026 مجلة غرام سلطان
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
