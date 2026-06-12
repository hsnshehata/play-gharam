import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  {
    icon: '🧠',
    title: 'اختبار الشخصية الجمالية',
    desc: 'اكتشفي ستايل الميك أب اللي يناسب شخصيتك',
    link: '/quiz',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: '🎯',
    title: 'لعبة الذاكرة التجميلية',
    desc: 'اختاري ذاكرتك مع منتجات التجميل',
    link: '/memory',
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    icon: '👗',
    title: 'تنسيق الألوان',
    desc: 'اكتشفي تناسق الألوان في إطلالتك',
    link: '/color-match',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '💍',
    title: 'عدّاد الزفاف',
    desc: 'خططي ليوم زفافك المثالي',
    link: '/wedding',
    gradient: 'from-rose-400 to-pink-500',
  },
];

const services = [
  'ميك أب احترافي لجميع المناسبات',
  'فرد بروتين وكيراتين للشعر',
  'عناية بالبشرة ومساج',
  'تصفيف شعر واكسسوارات',
  'حجاب وتصفيف ناعم',
  'باديكير ومنيكير',
];

function Home() {
  return (
    <div dir="rtl" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 pt-16 pb-20">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-lg mx-auto px-4 text-center">
          {/* Floating decoration */}
          <div className="animate-float inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-xl shadow-pink-300/40">
            <span className="text-4xl">💅</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent">
              Play Gharam 🎮
            </span>
          </h1>

          <p className="text-xl text-gray-500 font-medium mb-3">
            تسليك وتجميل في مكان واحد
          </p>

          <div className="inline-block glass px-6 py-3 rounded-full mt-2">
            <p className="text-pink-600 font-semibold text-lg">
              أهلاً بيكي في عالم غرام المرح! ✨
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="relative -mt-10 pb-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🎮 اختاري لعبتك</h2>
            <p className="text-gray-500 text-sm mt-1">استمتعي بألعابنا التجميلية الممتعة</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {games.map((game) => (
              <Link
                key={game.link}
                to={game.link}
                className="game-card group"
              >
                <div className={`bg-gradient-to-br ${game.gradient} p-0.5 rounded-2xl`}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 h-full transition-all duration-300 group-hover:bg-white/80 group-hover:shadow-lg">
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {game.icon}
                      </span>
                      <h3 className="font-bold text-sm text-gray-800 leading-tight">
                        {game.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-tight">
                        {game.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Section */}
      <section className="py-8 px-4">
        <div className="max-w-lg mx-auto">
          <Link
            to="/magazine"
            className="card block group hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-3xl">📖</span>
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  مجلة الجمال ✨
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  أحدث نصائح التجميل، أخبار الموضة، واتجاهات الميك أب
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  تصفحي المجلة ←
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Gharam Promo Section */}
      <section className="py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="glass overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-l from-pink-600 to-pink-500 px-6 py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-3xl">🏙️</span>
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                مدينة غرام سلطان بتقدملك
              </h2>
              <p className="text-pink-100 text-sm mt-1">
                بيوتي سنتر متكامل لجميع احتياجاتك التجميلية
              </p>
            </div>

            {/* Services List */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-pink-50/50 rounded-xl px-4 py-3 hover:bg-pink-100/50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium text-sm">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo tagline */}
              <div className="mt-5 text-center">
                <p className="text-pink-600 font-semibold text-sm">
                  💝 استعدي للإطلالة المثالية مع غرام سلطان
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-lg mx-auto text-center">
          <div className="glass px-6 py-8 rounded-3xl">
            <div className="text-5xl mb-4 animate-float">💎</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              لا تفوتي العروض الحصرية
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              زوري موقع غرام سلطان واحصلي على خصم ٢٠٪ على أول حجز
            </p>
            <a
              href="https://gharam.art"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-4 rounded-2xl shadow-xl shadow-amber-300/30 hover:shadow-amber-300/50 animate-glow"
            >
              <span>زوري غرام.art</span>
              <span>✨</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer branding inside page */}
      <div className="text-center py-6 px-4">
        <p className="text-gray-400 text-xs">
          جميع الحقوق محفوظة © بيوتي سنتر غرام سلطان
        </p>
      </div>
    </div>
  );
}

export default Home;