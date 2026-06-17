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
          <Link
            to="/magazine"
            className="inline-block mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #d4af37, #c9a030)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            غرام سلطان
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
