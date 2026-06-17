import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/articles';

function Home() {
  const featuredArticles = articles.slice(0, 6);

  const gradientMap = {
    'from-pink-400': '#f472b6', 'via-rose-500': '#f43f5e', 'to-fuchsia-600': '#d946ef',
    'from-emerald-300': '#6ee7b7', 'via-teal-400': '#2dd4bf', 'to-cyan-500': '#06b6d4',
    'from-red-400': '#f87171', 'to-pink-600': '#db2777',
    'from-violet-300': '#c4b5fd', 'via-purple-400': '#c084fc', 'to-fuchsia-500': '#d946ef',
    'from-indigo-400': '#818cf8', 'via-purple-500': '#a855f7', 'to-violet-600': '#7c3aed',
    'from-amber-400': '#fbbf24', 'via-orange-500': '#f97316', 'to-red-600': '#dc2626',
    'from-rose-300': '#fda4af', 'via-pink-400': '#f472b6',
    'from-gray-800': '#1f2937', 'via-gray-700': '#374151', 'to-gray-900': '#111827',
    'from-purple-300': '#d8b4fe', 'via-violet-400': '#a78bfa', 'to-indigo-500': '#6366f1',
    'from-yellow-200': '#fef08a', 'via-amber-300': '#fcd34d', 'to-orange-400': '#fb923c',
    'from-cyan-300': '#67e8f9', 'via-blue-400': '#60a5fa',
    'from-pink-300': '#f9a8d4', 'via-fuchsia-400': '#e879f9', 'to-purple-500': '#a855f7',
    'from-green-400': '#4ade80', 'via-emerald-500': '#10b981', 'to-teal-600': '#0d9488',
    'from-gray-500': '#6b7280', 'via-gray-700': '#374151',
    'from-green-300': '#86efac', 'via-lime-400': '#a3e635', 'to-emerald-500': '#10b981',
    'from-yellow-300': '#fde047', 'via-amber-400': '#fbbf24', 'to-orange-500': '#f97316',
    'from-teal-300': '#5eead4', 'via-cyan-400': '#22d3ee', 'to-blue-500': '#3b82f6',
    'from-orange-200': '#fed7aa', 'via-amber-300': '#fcd34d', 'to-yellow-400': '#facc15',
    'from-red-300': '#fca5a5', 'via-rose-400': '#fb7185', 'to-pink-500': '#ec4899',
    'from-purple-400': '#c084fc', 'via-fuchsia-500': '#d946ef', 'to-pink-600': '#db2777',
    'from-indigo-300': '#a5b4fc', 'via-blue-400': '#60a5fa', 'to-cyan-500': '#06b6d4',
    'from-orange-300': '#fdba74', 'via-amber-400': '#fbbf24', 'to-yellow-500': '#eab308',
    'from-violet-300': '#c4b5fd', 'via-purple-400': '#c084fc', 'to-indigo-500': '#6366f1',
    'from-slate-700': '#334155', 'via-gray-800': '#1f2937', 'to-black': '#000000',
    'from-teal-300': '#5eead4', 'via-cyan-400': '#22d3ee',
    'from-amber-200': '#fde68a', 'via-yellow-300': '#fde047',
    'from-red-400': '#f87171', 'via-rose-500': '#f43f5e',
    'from-indigo-400': '#818cf8', 'via-blue-500': '#3b82f6', 'to-violet-600': '#7c3aed',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Cairo', sans-serif; }

        .home-page {
          direction: rtl;
          background: #faf8f5;
          min-height: 100vh;
        }

        /* ===== HERO ===== */
        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 100px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
        }
        .hero-emoji {
          font-size: 3.5rem;
          margin-bottom: 20px;
          display: block;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 7vw, 4rem);
          font-weight: 900;
          color: #d4af37;
          margin: 0 0 12px;
          letter-spacing: 2px;
          text-shadow: 0 2px 30px rgba(212, 175, 55, 0.3);
        }
        .hero-divider {
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 20px;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          margin: 0 0 12px;
          line-height: 1.6;
        }
        .hero-desc {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          color: rgba(255,255,255,0.45);
          margin: 0 0 36px;
          line-height: 1.8;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #d4af37, #c9a030);
          color: #1a1a2e;
          font-size: 1.1rem;
          font-weight: 800;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
        }
        .hero-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4);
        }

        /* ===== FEATURED SECTION ===== */
        .featured-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        /* ===== ARTICLE CARD ===== */
        .article-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.35s ease;
          cursor: pointer;
          border: 1px solid #f0ece5;
          animation: fadeInUp 0.5s ease;
          text-decoration: none;
          display: block;
        }
        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .card-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .card-image-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .article-card:hover .card-image-bg {
          transform: scale(1.05);
        }
        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%);
        }
        .card-category-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(212, 175, 55, 0.9);
          color: #1a1a2e;
          padding: 5px 14px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .card-emoji {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-size: 1.8rem;
        }
        .card-body {
          padding: 24px;
        }
        .card-date {
          font-size: 0.78rem;
          color: #a0a0a0;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-desc {
          font-size: 0.88rem;
          color: #7a7a7a;
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ===== CATEGORIES SECTION ===== */
        .categories-section {
          background: #fff;
          border-top: 1px solid #e8e4de;
          border-bottom: 1px solid #e8e4de;
          padding: 60px 20px;
        }
        .categories-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
        }
        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 24px 16px;
          border-radius: 16px;
          background: #faf8f5;
          border: 1px solid #e8e4de;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .category-item:hover {
          background: #1a1a2e;
          border-color: #1a1a2e;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(26,26,46,0.2);
        }
        .category-item:hover .category-name {
          color: #d4af37;
        }
        .category-icon {
          font-size: 2rem;
        }
        .category-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1a1a2e;
          transition: color 0.3s ease;
        }

        /* ===== FOOTER BRANDING ===== */
        .home-footer {
          text-align: center;
          padding: 40px 20px;
          color: #a0a0a0;
          font-size: 0.85rem;
        }
        .home-footer a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div className="home-page">
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-emoji">✨</span>
            <h1 className="hero-title">غرام سلطان</h1>
            <div className="hero-divider" />
            <p className="hero-subtitle">دليلك الشامل لعالم الجمال والأناقة</p>
            <p className="hero-desc">
              أحدث نصائح التجميل، الميك أب، العناية بالشعر والبشرة،<br />
              وأخبار الموضة — كل ما تحتاجين معرفته في مكان واحد
            </p>
            <Link to="/magazine" className="hero-cta">
              تصفحي المجلة
              <span>←</span>
            </Link>
          </div>
        </section>

        {/* ===== FEATURED ARTICLES ===== */}
        <section className="featured-section">
          <div className="section-header">
            <div className="section-label">أحدث المقالات</div>
            <h2 className="section-title">اكتشفي عالم الجمال</h2>
          </div>
          <div className="articles-grid">
            {featuredArticles.map((article, idx) => {
              const parts = article.gradient.split(' ');
              const c1 = gradientMap[parts[0]] || '#d4af37';
              const c2 = gradientMap[parts[1]] || '#c9a030';
              const c3 = parts[2] ? (gradientMap[parts[2]] || c2) : c2;
              const fallbackGradient = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;

              return (
                <Link
                  key={article.id}
                  to={`/magazine/${article.id}`}
                  className="article-card"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="card-image-wrapper" style={{ background: fallbackGradient }}>
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="card-image-bg"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div className="card-image-overlay" />
                    <span className="card-category-badge">{article.category}</span>
                    <span className="card-emoji">{article.emoji}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-date">{article.date}</div>
                    <h3 className="card-title">{article.title}</h3>
                    <p className="card-desc">{article.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="categories-section">
          <div className="section-header">
            <div className="section-label">أقسام المجلة</div>
            <h2 className="section-title">تصفحي حسب اهتمامك</h2>
          </div>
          <div className="categories-grid">
            {[
              { name: 'ميك أب', emoji: '💄' },
              { name: 'شعر', emoji: '💇‍♀️' },
              { name: 'بشرة', emoji: '✨' },
              { name: 'عرايس', emoji: '👰' },
              { name: 'عناية', emoji: '💆‍♀️' },
              { name: 'أظافر', emoji: '💅' },
              { name: 'صحة', emoji: '🥗' },
              { name: 'موضة', emoji: '👗' },
              { name: 'عطور', emoji: '🌸' },
            ].map((cat) => (
              <a key={cat.name} href={`/magazine?cat=${encodeURIComponent(cat.name)}`} className="category-item">
                <span className="category-icon">{cat.emoji}</span>
                <span className="category-name">{cat.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <div className="home-footer">
          <p>جميع الحقوق محفوظة © 2026 <Link to="/magazine">مجلة غرام سلطان</Link></p>
        </div>
      </div>
    </>
  );
}

export default Home;
