import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import articles from '../data/articles';

const categories = ['الكل', 'ميك أب', 'شعر', 'بشرة', 'عرايس', 'عناية', 'أظافر', 'صحة', 'موضة', 'عطور'];

/* ==============================================================
   STYLES (inline + keyframes in a style tag)
   ============================================================== */
const styles = {
  container: {
    direction: 'rtl',
    fontFamily: "'Tajawal', 'Segoe UI', 'Cairo', sans-serif",
    background: 'linear-gradient(180deg, #fef9f4 0%, #fff5f5 100%)',
    minHeight: '100vh',
    paddingBottom: '100px',
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px 20px',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)',
    borderBottom: '4px solid #f472b6',
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 'clamp(1.8rem, 6vw, 3rem)',
    fontWeight: 800,
    color: '#4a044e',
    margin: 0,
    letterSpacing: '1px',
    textShadow: '0 2px 8px rgba(244, 114, 182, 0.3)',
  },
  headerSub: {
    fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
    color: '#831843',
    marginTop: '8px',
    fontWeight: 500,
    opacity: 0.9,
  },
  headerFlower: {
    position: 'absolute',
    fontSize: '2rem',
    opacity: 0.15,
    userSelect: 'none',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 20px',
    flexWrap: 'wrap',
    overflowX: 'auto',
    background: '#fff',
    borderBottom: '1px solid #f3e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(244, 114, 182, 0.08)',
  },
  tabButton: (active) => ({
    padding: '10px 24px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '0.95rem',
    fontWeight: active ? 700 : 500,
    cursor: 'pointer',
    background: active
      ? 'linear-gradient(135deg, #f472b6, #ec4899)'
      : '#fdf2f8',
    color: active ? '#fff' : '#831843',
    boxShadow: active
      ? '0 4px 14px rgba(244, 114, 182, 0.4)'
      : '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    padding: '30px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(244, 114, 182, 0.10), 0 2px 8px rgba(0,0,0,0.04)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    animation: 'fadeInUp 0.5s ease',
  },
  cardImage: (gradient, emoji, image) => ({
    height: '180px',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    position: 'relative',
    overflow: 'hidden',
  }),
  cardImageImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.55,
  },
  cardBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
    color: '#fff',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 700,
    boxShadow: '0 2px 8px rgba(244, 114, 182, 0.3)',
  },
  cardBody: {
    padding: '18px 20px 20px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1f1a1f',
    margin: '0 0 8px',
    lineHeight: 1.4,
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: '#6b5b6b',
    margin: '0 0 12px',
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px 18px',
    fontSize: '0.8rem',
  },
  date: {
    color: '#a78ba0',
  },
  readMore: {
    color: '#ec4899',
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
  },
  floatingBtn: {
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    zIndex: 999,
    padding: '14px 28px',
    border: 'none',
    borderRadius: '50px',
    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(244, 114, 182, 0.5)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    letterSpacing: '1px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 0',
    flexDirection: 'column',
    gap: '16px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #fce4ec',
    borderTop: '4px solid #ec4899',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loaderText: {
    color: '#831843',
    fontWeight: 600,
    fontSize: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#a78ba0',
    fontSize: '1.1rem',
  },
};

/* ==============================================================
   MagazineCard Component
   ============================================================== */
const MagazineCard = ({ article, style, navigate }) => {
  // Build gradient CSS from Tailwind classes
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
  const color1 = gradientMap[parts[0]] || '#f472b6';
  const color2 = gradientMap[parts[1]] || '#ec4899';
  const color3 = parts[2] ? (gradientMap[parts[2]] || color2) : color2;
  const cssGradient = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;

  return (
  <div
    style={{ ...styles.card, ...style, cursor: 'pointer' }}
    onClick={() => navigate(`/magazine/${article.id}`)}
    className="magazine-card"
  >
    <div style={styles.cardImage(cssGradient, article.emoji, article.image)}>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={styles.cardImageImg}
          loading="lazy"
        />
      )}
      <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))', zIndex: 1 }} className="card-image-emoji">
        {article.emoji}
      </span>
      <span style={styles.cardBadge}>{article.category}</span>
    </div>
    <div style={styles.cardBody}>
      <h3 style={styles.cardTitle}>{article.title}</h3>
      <p style={styles.cardDesc}>{article.description}</p>
    </div>
    <div style={styles.cardFooter}>
      <span style={styles.date}>{article.date}</span>
      <span style={styles.readMore}>
        اقرأي المزيد ←
      </span>
    </div>
  </div>
);

/* ==============================================================
   Magazine Page
   ============================================================== */
const Magazine = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(articles);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  // Filter animation on category change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (activeCategory === 'الكل') {
        setFiltered(articles);
      } else {
        setFiltered(articles.filter((a) => a.category === activeCategory));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <>
      {/* Inject @keyframes + base RTL style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700;800&family=Tajawal:wght@400;500;700;800&display=swap');

        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Tajawal', 'Cairo', sans-serif;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .magazine-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 16px 48px rgba(244, 114, 182, 0.18) !important;
        }

        .magazine-card:hover .card-image-emoji {
          animation: pulse 0.8s ease infinite;
        }

        .tab-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .floating-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 32px rgba(244, 114, 182, 0.6) !important;
        }

        .floating-btn:active {
          transform: scale(0.97);
        }

        @media (max-width: 640px) {
          .magazine-grid {
            grid-template-columns: 1fr !important;
            padding: 16px 12px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .magazine-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 1025px) {
          .magazine-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>

      <div style={styles.container}>
        {/* ===== HEADER ===== */}
        <header style={styles.header}>
          <span style={{ ...styles.headerFlower, top: '10px', left: '20px', transform: 'rotate(-20deg)' }}>
            🌸
          </span>
          <span style={{ ...styles.headerFlower, bottom: '10px', right: '30px', transform: 'rotate(15deg)' }}>
            💐
          </span>
          <span style={{ ...styles.headerFlower, top: '30%', right: '8%', fontSize: '1.5rem' }}>
            ✿
          </span>
          <h1 style={styles.headerTitle}>مجلة غرام الجمالية 📰</h1>
          <p style={styles.headerSub}>آخر صيحات التجميل والميك أب</p>
        </header>

        {/* ===== CATEGORY TABS ===== */}
        <div style={styles.tabsContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="tab-btn"
              style={styles.tabButton(activeCategory === cat)}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== GRID / LOADING / EMPTY ===== */}
        {loading ? (
          <div style={styles.loader}>
            <div style={styles.spinner} />
            <span style={styles.loaderText}>جاري تحميل المقالات...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <p>😔 لا توجد مقالات في هذا القسم حالياً</p>
            <p style={{ fontSize: '0.9rem', color: '#c4a4b8', marginTop: '8px' }}>
              جربي تصفح أقسام أخرى
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="magazine-grid"
            style={styles.grid}
          >
            {filtered.map((article, idx) => (
              <div
                key={article.id}
                className="magazine-card"
                style={{
                  animationDelay: `${idx * 0.08}s`,
                }}
              >
                <MagazineCard article={article} navigate={navigate} />
              </div>
            ))}
          </div>
        )}

        {/* ===== FLOATING BOOKING BUTTON ===== */}
        <a
          href="https://gharam.art"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button className="floating-btn" style={styles.floatingBtn}>
            💖 للحجز
          </button>
        </a>
      </div>
    </>
  );
};

export default Magazine;
