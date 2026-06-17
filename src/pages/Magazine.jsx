import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import articles from '../data/articles';

const categories = ['الكل', 'ميك أب', 'شعر', 'بشرة', 'عرايس', 'عناية', 'أظافر', 'صحة', 'موضة', 'عطور'];

const Magazine = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [filtered, setFiltered] = useState(articles);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    let result = articles;
    if (activeCategory !== 'الكل') {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Cairo', sans-serif; }

        .magazine-page {
          direction: rtl;
          background: #faf8f5;
          min-height: 100vh;
          padding-bottom: 60px;
        }

        /* ===== HEADER ===== */
        .magazine-header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 60px 20px 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .magazine-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .magazine-header-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .magazine-logo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          color: #d4af37;
          margin: 0 0 8px;
          letter-spacing: 2px;
          text-shadow: 0 2px 20px rgba(212, 175, 55, 0.3);
        }
        .magazine-tagline {
          font-size: clamp(0.85rem, 2.5vw, 1.1rem);
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          margin: 0 0 24px;
          letter-spacing: 1px;
        }
        .magazine-divider {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 24px;
        }

        /* ===== SEARCH ===== */
        .search-container {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 14px 48px 14px 20px;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 50px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 0.95rem;
          font-family: 'Cairo', sans-serif;
          outline: none;
          transition: all 0.3s ease;
          direction: rtl;
        }
        .search-input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        .search-input:focus {
          border-color: #d4af37;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }
        .search-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.4);
          font-size: 1.1rem;
        }

        /* ===== CATEGORY TABS ===== */
        .tabs-wrapper {
          background: #fff;
          border-bottom: 1px solid #e8e4de;
          position: sticky;
          top: 76px;
          z-index: 100;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .tabs-container {
          display: flex;
          justify-content: center;
          gap: 6px;
          padding: 16px 20px;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tab-btn {
          padding: 8px 20px;
          border: 1px solid #e8e4de;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Cairo', sans-serif;
          transition: all 0.25s ease;
          background: #fff;
          color: #6b6b6b;
        }
        .tab-btn:hover {
          border-color: #d4af37;
          color: #d4af37;
          transform: translateY(-1px);
        }
        .tab-btn.active {
          background: #1a1a2e;
          color: #d4af37;
          border-color: #1a1a2e;
          box-shadow: 0 4px 12px rgba(26, 26, 46, 0.2);
        }

        /* ===== ARTICLES GRID ===== */
        .articles-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
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
          margin: 0 0 32px;
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
        }
        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .card-image-wrapper {
          position: relative;
          height: 220px;
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
          letter-spacing: 0.5px;
        }
        .card-emoji {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-size: 2rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
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
          font-size: 1.15rem;
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
        .card-footer {
          padding: 0 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .read-more {
          color: #d4af37;
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s ease;
        }
        .read-more:hover {
          gap: 10px;
        }

        /* ===== FEATURED ARTICLE (first one bigger) ===== */
        .featured-card {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 320px;
        }
        .featured-card .card-image-wrapper {
          height: 100%;
          min-height: 320px;
        }
        .featured-card .card-body {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .featured-card .card-title {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          -webkit-line-clamp: 3;
        }
        .featured-card .card-desc {
          font-size: 0.95rem;
          -webkit-line-clamp: 4;
        }
        .featured-label {
          display: inline-block;
          background: linear-gradient(135deg, #d4af37, #c9a030);
          color: #1a1a2e;
          padding: 4px 14px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 16px;
          width: fit-content;
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #a0a0a0;
        }
        .empty-state .emoji { font-size: 3rem; margin-bottom: 16px; }
        .empty-state p { font-size: 1.1rem; }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .featured-card {
            grid-template-columns: 1fr;
          }
          .featured-card .card-image-wrapper {
            min-height: 220px;
            height: 220px;
          }
          .featured-card .card-body {
            padding: 24px;
          }
          .tabs-container {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding: 12px 16px;
            -webkit-overflow-scrolling: touch;
          }
          .tab-btn {
            flex-shrink: 0;
          }
        }
      `}</style>

      <div className="magazine-page">
        {/* ===== HEADER ===== */}
        <header className="magazine-header">
          <div className="magazine-header-content">
            <h1 className="magazine-logo">غرام سلطان</h1>
            <div className="magazine-divider" />
            <p className="magazine-tagline">دليلك الشامل لعالم الجمال والأناقة</p>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="ابحثي في المجلة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* ===== CATEGORY TABS ===== */}
        <div className="tabs-wrapper">
          <div className="tabs-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ===== ARTICLES ===== */}
        <div className="articles-section" ref={gridRef}>
          {activeCategory === 'الكل' && !searchQuery && (
            <>
              <div className="section-label">أحدث المقالات</div>
              <h2 className="section-title">اكتشفي عالم الجمال</h2>
            </>
          )}
          {activeCategory !== 'الكل' && (
            <>
              <div className="section-label">قسم</div>
              <h2 className="section-title">{activeCategory}</h2>
            </>
          )}
          {searchQuery && (
            <>
              <div className="section-label">نتائج البحث</div>
              <h2 className="section-title">"{searchQuery}"</h2>
            </>
          )}

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="emoji">📭</div>
              <p>لا توجد مقالات في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filtered.map((article, idx) => {
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
                  'from-pink-400': '#f472b6', 'via-rose-500': '#f43f5e', 'to-red-600': '#dc2626',
                  'from-green-300': '#86efac', 'via-lime-400': '#a3e635', 'to-emerald-500': '#10b981',
                  'from-rose-300': '#fda4af', 'via-pink-400': '#f472b6', 'to-fuchsia-500': '#d946ef',
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
                  'from-pink-300': '#f9a8d4', 'via-fuchsia-400': '#e879f9', 'to-purple-500': '#a855f7',
                  'from-red-400': '#f87171', 'via-rose-500': '#f43f5e',
                  'from-indigo-400': '#818cf8', 'via-blue-500': '#3b82f6', 'to-violet-600': '#7c3aed',
                };
                const parts = article.gradient.split(' ');
                const c1 = gradientMap[parts[0]] || '#d4af37';
                const c2 = gradientMap[parts[1]] || '#c9a030';
                const c3 = parts[2] ? (gradientMap[parts[2]] || c2) : c2;
                const fallbackGradient = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;

                const isFeatured = idx === 0 && activeCategory === 'الكل' && !searchQuery;

                return (
                  <div
                    key={article.id}
                    className={`article-card ${isFeatured ? 'featured-card' : ''}`}
                    style={{ animationDelay: `${idx * 0.06}s` }}
                    onClick={() => navigate(`/magazine/${article.id}`)}
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
                      {isFeatured && <span className="featured-label">⭐ مقال مميز</span>}
                      <div className="card-date">{article.date}</div>
                      <h3 className="card-title">{article.title}</h3>
                      <p className="card-desc">{article.description}</p>
                    </div>
                    <div className="card-footer">
                      <span className="read-more">
                        اقرأي المزيد
                        <span>←</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Magazine;
