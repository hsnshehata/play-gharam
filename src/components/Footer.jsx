import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer dir="rtl" className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💄</span>
              <span className="text-xl font-bold">غرام سلطان</span>
            </div>
            <p className="text-pink-100 text-sm">
              بيوتي سنتر غرام سلطان — لأنك تستحقين التميز
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/40 rounded-full" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  الألعاب
                </Link>
              </li>
              <li>
                <Link
                  to="/magazine"
                  className="text-pink-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  المجلة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              اتصل بنا
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/40 rounded-full" />
            </h3>
            <ul className="space-y-3 text-pink-100 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>📍</span>
                <span>دسوق — شارع السوق الكبير</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>📞</span>
                <span dir="ltr">01092527126</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <p className="text-center text-pink-100 text-sm">
            جميع الحقوق محفوظة © 2026 غرام سلطان بيوتي سنتر
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
