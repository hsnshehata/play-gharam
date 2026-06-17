import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import articles from '../data/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(() => {
    try { return parseInt(localStorage.getItem(`article_likes_${id}`) || '0'); } catch { return 0; }
  });
  const [dislikes, setDislikes] = useState(() => {
    try { return parseInt(localStorage.getItem(`article_dislikes_${id}`) || '0'); } catch { return 0; }
  });
  const [userVote, setUserVote] = useState(() => {
    try { return localStorage.getItem(`article_vote_${id}`) || null; } catch { return null; }
  });
  const [animating, setAnimating] = useState(null);

  const article = articles.find((a) => a.id === Number(id));

  // Get related articles (same category, excluding current)
  const relatedArticles = article
    ? articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [id]);

  if (!article) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: '#faf8f5', fontFamily: "'Cairo', sans-serif" }}
      >
        <div className="text-7xl mb-6">😔</div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a1a2e' }}>المقال غير موجود</h1>
        <p className="text-gray-500 mb-8 text-lg">المقال اللي بتدوري عليه مش موجود أو اتحذف.</p>
        <Link
          to="/magazine"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-white font-semibold text-lg transition-all duration-300 hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
        >
          ← رجوع للمجلة
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  // Smart paragraph parser - detects headings, lists, bold text
  const renderContent = () => {
    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();
      
      // Detect list items (lines starting with -, •, or numbers like 1- 2- or ١- ٢-)
      if (/^[-•]\s/.test(trimmed) || /^[١-٩\d]+[-.)]\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(l => l.trim());
        return (
          <ul key={idx} style={{ margin: '0 0 24px', padding: '0 24px', listStyle: 'disc' }}>
            {items.map((item, i) => (
              <li key={i} style={{ fontSize: '1.12rem', color: '#3a3a3a', lineHeight: 2, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^[-•]\s|^[١-٩\d]+[-.)]\s/, '')) }} />
            ))}
          </ul>
        );
      }
      
      // Detect sub-headings (lines with "أولاً", "ثانياً", "ثالثاً", or ending with ":", or short lines < 60 chars that look like titles)
      const isSubHeading = 
        /^(أولاً|ثانياً|ثالثاً|رابعاً|خامساً|سادساً|سابعاً|ثامناً|تاسعاً|عاشرة|النقطة|الخطوة|المرحلة|نصيحة|مهم|تجنبي|استخدمي|تذكري)/i.test(trimmed) ||
        (trimmed.endsWith('：') || trimmed.endsWith(':')) && trimmed.length < 80 ||
        /^【.+】$/.test(trimmed) ||
        /^\d+\.\s+.+:$/.test(trimmed);
      
      if (isSubHeading) {
        return (
          <h3 key={idx} style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#1a1a2e',
            margin: '32px 0 16px',
            lineHeight: 1.5,
            paddingBottom: 8,
            borderBottom: '2px solid #d4af37',
            display: 'inline-block',
          }} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      }
      
      // Regular paragraph
      return (
        <p key={idx} className="article-paragraph" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
      );
    });
  };

  // Format inline text: **bold**, "quotes", etc.
  const formatInline = (text) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#1a1a2e;font-weight:700;">$1</strong>')
      .replace(/"(.+?)"/g, '<span style="color:#d4af37;font-weight:600;">"$1"</span>')
      .replace(/\((.+?)\)/g, '<span style="color:#999;font-size:0.95em;">($1)</span>');
  };

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
  const parts = article.gradient.split(' ');
  const c1 = gradientMap[parts[0]] || '#d4af37';
  const c2 = gradientMap[parts[1]] || '#c9a030';
  const c3 = parts[2] ? (gradientMap[parts[2]] || c2) : c2;
  const headerGradient = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ background: '#faf8f5', fontFamily: "'Cairo', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Cairo', sans-serif; }

        .article-header {
          position: relative;
          padding: 80px 20px 60px;
          text-align: center;
          overflow: hidden;
        }
        .article-header-bg {
          position: absolute;
          inset: 0;
          ${article.image ? `
          background-image: url(${article.image});
          background-size: cover;
          background-position: center;
          ` : `background: ${headerGradient};`}
        }
        .article-header-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.85) 100%);
        }
        .article-header-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .article-category-badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.9);
          color: #1a1a2e;
          padding: 6px 18px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .article-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 5vw, 2.8rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.3;
        }
        .article-meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          color: rgba(255,255,255,0.6);
          font-size: 0.88rem;
        }
        .article-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .article-body {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .article-content-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          margin-top: -30px;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          border: 1px solid #f0ece5;
        }
        .article-paragraph {
          font-size: 1.12rem;
          color: #3a3a3a;
          line-height: 2;
          margin: 0 0 24px;
          text-align: justify;
        }
        .article-paragraph:last-child {
          margin-bottom: 0;
        }

        .share-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px 0;
          border-top: 1px solid #e8e4de;
          margin-top: 32px;
        }
        .share-label {
          font-size: 0.85rem;
          color: #999;
          font-weight: 600;
        }
        .share-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #e8e4de;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s ease;
        }
        .share-btn:hover {
          background: #1a1a2e;
          border-color: #1a1a2e;
          transform: translateY(-2px);
        }

        /* ===== LIKE / DISLIKE ===== */
        .reaction-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 24px 0;
          border-top: 1px solid #e8e4de;
          margin-top: 8px;
        }
        .reaction-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 12px;
          border: 2px solid #e8e4de;
          background: #fff;
          cursor: pointer;
          font-family: 'Cairo', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .reaction-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .reaction-btn.like-btn:hover,
        .reaction-btn.like-btn.active {
          border-color: #10b981;
          background: #ecfdf5;
          color: #10b981;
        }
        .reaction-btn.dislike-btn:hover,
        .reaction-btn.dislike-btn.active {
          border-color: #ef4444;
          background: #fef2f2;
          color: #ef4444;
        }
        .reaction-btn .count {
          font-size: 0.85rem;
          font-weight: 800;
          min-width: 20px;
          text-align: center;
        }
        .reaction-btn .emoji {
          font-size: 1.2rem;
          transition: transform 0.2s ease;
        }
        .reaction-btn:hover .emoji,
        .reaction-btn.active .emoji {
          transform: scale(1.2);
        }
        .reaction-btn.pop .emoji {
          animation: popEmoji 0.3s ease;
        }
        @keyframes popEmoji {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1.2); }
        }
        .reaction-label {
          font-size: 0.82rem;
          color: #999;
          font-weight: 600;
        }

        .related-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }
        .related-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }
        .related-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 32px;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .related-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #f0ece5;
          text-decoration: none;
        }
        .related-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.12);
        }
        .related-card-image {
          height: 160px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .related-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%);
        }
        .related-card-body {
          padding: 20px;
        }
        .related-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
          line-height: 1.5;
        }
        .related-card-desc {
          font-size: 0.82rem;
          color: #999;
          line-height: 1.6;
          margin: 0;
        }

        .back-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          color: rgba(255,255,255,0.7);
          font-size: 0.88rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-nav:hover {
          color: #d4af37;
        }

        @media (max-width: 768px) {
          .article-content-card {
            padding: 28px 20px;
          }
          .article-paragraph {
            font-size: 1.05rem;
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ===== ARTICLE HEADER ===== */}
      <header className="article-header">
        <div className="article-header-bg" />
        <div className="article-header-overlay" />
        <div className="article-header-content">
          <Link to="/magazine" className="back-nav">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            رجوع للمجلة
          </Link>
          <span className="article-category-badge">{article.emoji} {article.category}</span>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span>📅 {article.date}</span>
            <span>📖 {paragraphs.length} دقائق قراءة</span>
          </div>
        </div>
      </header>

      {/* ===== ARTICLE CONTENT ===== */}
      <div className="article-body">
        <div className="article-content-card">
          {renderContent()}

          {/* Like / Dislike Section */}
          <div className="reaction-section">
            <span className="reaction-label">هل أعجبك المقال؟</span>
            <button
              className={`reaction-btn like-btn ${userVote === 'like' ? 'active' : ''} ${animating === 'like' ? 'pop' : ''}`}
              onClick={() => {
                if (userVote === 'like') {
                  setLikes(l => l - 1);
                  setUserVote(null);
                  localStorage.setItem(`article_vote_${id}`, '');
                } else {
                  if (userVote === 'dislike') {
                    setDislikes(d => d - 1);
                    localStorage.setItem(`article_dislikes_${id}`, String(dislikes - 1));
                  }
                  setLikes(l => l + 1);
                  setUserVote('like');
                  localStorage.setItem(`article_vote_${id}`, 'like');
                  localStorage.setItem(`article_likes_${id}`, String(likes + 1));
                }
                setAnimating('like');
                setTimeout(() => setAnimating(null), 300);
              }}
            >
              <span className="emoji">👍</span>
              <span className="count">{likes}</span>
            </button>
            <button
              className={`reaction-btn dislike-btn ${userVote === 'dislike' ? 'active' : ''} ${animating === 'dislike' ? 'pop' : ''}`}
              onClick={() => {
                if (userVote === 'dislike') {
                  setDislikes(d => d - 1);
                  setUserVote(null);
                  localStorage.setItem(`article_vote_${id}`, '');
                } else {
                  if (userVote === 'like') {
                    setLikes(l => l - 1);
                    localStorage.setItem(`article_likes_${id}`, String(likes - 1));
                  }
                  setDislikes(d => d + 1);
                  setUserVote('dislike');
                  localStorage.setItem(`article_vote_${id}`, 'dislike');
                  localStorage.setItem(`article_dislikes_${id}`, String(dislikes + 1));
                }
                setAnimating('dislike');
                setTimeout(() => setAnimating(null), 300);
              }}
            >
              <span className="emoji">👎</span>
              <span className="count">{dislikes}</span>
            </button>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <span className="share-label">شاركِي المقال</span>
            <button className="share-btn" onClick={() => navigator.clipboard?.writeText(window.location.href)} title="نسخ الرابط">🔗</button>
            <a className="share-btn" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="مشاركة على X">𝕏</a>
            <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="مشاركة على فيسبوك">📘</a>
            <a className="share-btn" href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" title="مشاركة على واتساب">💬</a>
          </div>
        </div>
      </div>

      {/* ===== RELATED ARTICLES ===== */}
      {relatedArticles.length > 0 && (
        <div className="related-section">
          <div className="related-label">مقالات ذات صلة</div>
          <h2 className="related-title">مقالات قد تعجبك</h2>
          <div className="related-grid">
            {relatedArticles.map((rel) => {
              const rParts = rel.gradient.split(' ');
              const rc1 = gradientMap[rParts[0]] || '#d4af37';
              const rc2 = gradientMap[rParts[1]] || '#c9a030';
              const rc3 = rParts[2] ? (gradientMap[rParts[2]] || rc2) : rc2;
              const rGrad = `linear-gradient(135deg, ${rc1}, ${rc2}, ${rc3})`;
              const imageBg = rel.image ? `url(${rel.image})` : rGrad;

              return (
                <Link
                  key={rel.id}
                  to={`/magazine/${rel.id}`}
                  className="related-card"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                >
                  <div
                    className="related-card-image"
                    style={{
                      background: imageBg,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <div className="related-card-overlay" />
                  </div>
                  <div className="related-card-body">
                    <h3 className="related-card-title">{rel.title}</h3>
                    <p className="related-card-desc">{rel.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== BACK TO MAGAZINE ===== */}
      <div className="text-center pb-12">
        <Link
          to="/magazine"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-white font-semibold transition-all duration-300 hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
        >
          ← تصفحي المزيد من المقالات
        </Link>
      </div>
    </div>
  );
}
