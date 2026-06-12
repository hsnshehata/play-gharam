import React, { useState, useEffect, useRef } from 'react';

/* ==============================================================
   MOCK DATA – 8 realistic beauty articles in Arabic
   ============================================================== */
const mockArticles = [
  {
    id: 1,
    category: 'ميك أب',
    title: 'أحدث صيحات ميك أب الزفاف في 2026',
    description: 'اكتشفي أحدث صيحات المكياج للعروس في عام 2026، من الألوان الترابية الناعمة إلى اللمسات الجلامورية الجريئة.',
    date: '١٢ يونيو ٢٠٢٦',
    emoji: '💄',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    id: 2,
    category: 'بشرة',
    title: 'خطوات العناية بالبشرة قبل الزفاف',
    description: 'روتين شامل للعناية بالبشرة قبل الزفاف يشمل التقشير والترطيب والتغذية للحصول على بشرة نضرة ومشرقة.',
    date: '١٠ يونيو ٢٠٢٦',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
  {
    id: 3,
    category: 'ميك أب',
    title: 'ألوان الروج الرائجة هذا الموسم',
    description: 'تعرفي على ألوان أحمر الشفاه الأكثر رواجاً هذا الموسم، من درجات النبيذ الغامقة إلى النيود الطبيعية.',
    date: '٨ يونيو ٢٠٢٦',
    emoji: '💋',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
  },
  {
    id: 4,
    category: 'شعر',
    title: 'فرد الشعر بالبروتين: كل ما تحتاجين معرفته',
    description: 'دليل شامل عن فرد الشعر بالبروتين، فوائده، أضراره، وطريقة العناية بالشعر بعد العلاج.',
    date: '٥ يونيو ٢٠٢٦',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  },
  {
    id: 5,
    category: 'شعر',
    title: 'نصائح للعناية بالشعر المصبوغ',
    description: 'أهم النصائح للحفاظ على لون الشعر المصبوغ أطول فترة ممكنة وتجنب الجفاف والتقصف.',
    date: '٣ يونيو ٢٠٢٦',
    emoji: '🎀',
    gradient: 'linear-gradient(135deg, #fccb90, #d57eeb)',
  },
  {
    id: 6,
    category: 'عرايس',
    title: 'أحدث تسريحات الزفاف',
    description: 'تشكيلة مميزة من أحدث تسريحات الزفاف التي تناسب كل أنماط العرائس، من الكلاسيك إلى العصري.',
    date: '١ يونيو ٢٠٢٦',
    emoji: '👑',
    gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
  {
    id: 7,
    category: 'بشرة',
    title: 'العناية بالبشرة في فصل الصيف',
    description: 'نصائح ذهبية للعناية ببشرتك في الصيف، من واقي الشمس المناسب إلى الترطيب الخفيف.',
    date: '٢٨ مايو ٢٠٢٦',
    emoji: '☀️',
    gradient: 'linear-gradient(135deg, #fddb92, #d1fdff)',
  },
  {
    id: 8,
    category: 'بشرة',
    title: 'ماسكات طبيعية لنضارة البشرة',
    description: 'أفضل الماسكات الطبيعية بمكونات من مطبخك لتعزيز نضارة بشرتك وإشراقتها.',
    date: '٢٥ مايو ٢٠٢٦',
    emoji: '🧴',
    gradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
  },
];

const categories = ['الكل', 'ميك أب', 'شعر', 'بشرة', 'عرايس'];

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
  cardImage: (gradient, emoji) => ({
    height: '180px',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    position: 'relative',
    overflow: 'hidden',
  }),
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
const MagazineCard = ({ article, style }) => (
  <div style={{ ...styles.card, ...style }}>
    <div style={styles.cardImage(article.gradient, article.emoji)}>
      <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
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
      <a
        href="#"
        style={styles.readMore}
        onClick={(e) => {
          e.preventDefault();
          alert(`📖 ${article.title} - قريباً المحتوى الكامل`);
        }}
      >
        اقرأي المزيد ←
      </a>
    </div>
  </div>
);

/* ==============================================================
   Magazine Page
   ============================================================== */
const Magazine = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(mockArticles);
  const gridRef = useRef(null);

  // Filter animation on category change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (activeCategory === 'الكل') {
        setFiltered(mockArticles);
      } else {
        setFiltered(mockArticles.filter((a) => a.category === activeCategory));
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
                <MagazineCard article={article} />
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
