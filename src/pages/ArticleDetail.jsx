import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import articles from '../data/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  const article = articles.find((a) => a.id === Number(id));

  useEffect(() => {
    // Trigger fade-in after mount
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [id]);

  if (!article) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center px-4"
      >
        <div className="text-7xl mb-6">😔</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">المقال غير موجود</h1>
        <p className="text-gray-500 mb-8 text-lg">
          المقال اللي بتدوري عليه مش موجود أو اتحذف.
        </p>
        <Link
          to="/magazine"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
        >
          ← رجوع للمجلة
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div
      dir="rtl"
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-pink-50 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Gradient header */}
      <div
        className={`relative bg-gradient-to-r ${article.gradient} px-6 pt-16 pb-24 text-white overflow-hidden`}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            رجوع للمجلة
          </Link>

          <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold mb-4">
            {article.emoji} {article.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            {article.title}
          </h1>

          <p className="text-white/80 text-sm">{article.date}</p>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8">
          {/* Article image */}
          {article.image && (
            <div className="mb-8 -mx-6 md:-mx-10 -mt-6 md:-mt-10 overflow-hidden rounded-t-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full max-h-96 object-cover rounded-xl"
              />
            </div>
          )}
          {paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-gray-700 leading-relaxed text-lg mb-6 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Back button */}
        <div className="text-center pb-8">
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-pink-200 px-6 py-3 text-pink-600 font-semibold hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            مقالات أخرى
          </Link>
        </div>
      </div>

      {/* Floating booking button */}
      <a
        href="https://gharam.art"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 text-white font-bold shadow-xl hover:shadow-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 animate-bounce"
      >
        💖 للحجز
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}