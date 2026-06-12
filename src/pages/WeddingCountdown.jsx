import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gharam_wedding_date';

const WeddingCountdown = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [weddingDate, setWeddingDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  // Load saved date on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setWeddingDate(saved);
      setIsRunning(true);
    }
  }, []);

  // Countdown timer logic
  const updateCountdown = useCallback(() => {
    if (!weddingDate) return;
    const now = new Date();
    const target = new Date(weddingDate);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({ days, hours, minutes, seconds });
  }, [weddingDate]);

  useEffect(() => {
    if (!isRunning || !weddingDate) return;
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isRunning, weddingDate, updateCountdown]);

  const handleStart = () => {
    if (!selectedDate) return;
    setWeddingDate(selectedDate);
    setIsRunning(true);
    localStorage.setItem(STORAGE_KEY, selectedDate);
  };

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setWeddingDate(null);
    setIsRunning(false);
    setSelectedDate('');
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Calculate percentage prep
  const daysTotal = weddingDate
    ? Math.max(1, Math.round((new Date(weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const prepPercent = weddingDate ? Math.min(100, Math.max(0, Math.round((1 - timeLeft.days / (timeLeft.days + 365)) * 100))) : 0;

  // Tips based on how close the date is
  const getTips = () => {
    if (!weddingDate || !timeLeft.days) return [];
    const daysRemaining = timeLeft.days;

    const tips = [];
    if (daysRemaining > 90) {
      tips.push('لسه قدامك وقت كافي، ابدئي في البحث عن فستان الأحلام 👰');
      tips.push('فكري في اختيار الألوان اللي تناسبك وتناسب الفرح 💐');
      tips.push('ابدئي في وضع ميزانية وخططي لحفلك خطوة بخطوة 📋');
    } else if (daysRemaining >= 30) {
      tips.push('جهزي جدول العناية بالبشرة والشعر 💆‍♀️');
      tips.push('روتينك اليومي مهم جداً، اهتمي بترطيب بشرتك وتمارين الوجه ✨');
      tips.push('ابحثي عن إكسسوارات تتزيني بها يوم الزفاف 👑');
    } else {
      tips.push('أخر استعداداتك مع ميك أب غرام سلطان 💄');
      tips.push('التحضيرات الأخيرة: تجربة تسريحة الشعر والميك أب 👗');
      tips.push('استرخي وخذي نفس عميق، كل حاجة حتبقى تمام 💕');
    }

    return tips.map((tip) => `${tip} للحجز في غرام سلطان: https://gharam.art`);
  };

  const tips = getTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-yellow-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-pink-600 to-amber-500 mb-2">
            💍 عدّاد الزفاف
          </h1>
          <p className="text-pink-500 text-lg">عدي الأيام لفرح أحلامك</p>
        </div>

        {!isRunning || !weddingDate ? (
          /* Date Picker Card */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-200 transition-all duration-500">
            <div className="text-center mb-6">
              <span className="text-5xl">📅</span>
              <h2 className="text-2xl font-bold text-gray-700 mt-3">اختاري يوم الفرح</h2>
              <p className="text-gray-400 text-sm mt-1">دلوقتي تقدرى تختارى التاريخ وتبدأى العد</p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="block">
                <span className="block text-gray-600 font-medium mb-2 text-center text-lg">تاريخ الفرح</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 border-2 border-pink-200 rounded-2xl text-center text-lg font-medium text-gray-700 bg-pink-50/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
                />
              </label>
              <button
                onClick={handleStart}
                disabled={!selectedDate}
                className={`w-full py-4 rounded-2xl text-xl font-bold transition-all duration-300 ${
                  selectedDate
                    ? 'bg-gradient-to-l from-pink-600 to-rose-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                🎉 ابداي العد
              </button>
            </div>
          </div>
        ) : (
          /* Countdown Dashboard */
          <div className="space-y-6">
            {/* Main Countdown Cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: timeLeft.days, label: 'الأيام', icon: '📆' },
                { value: timeLeft.hours, label: 'الساعات', icon: '⏰' },
                { value: timeLeft.minutes, label: 'الدقائق', icon: '⏱️' },
                { value: timeLeft.seconds, label: 'الثواني', icon: '⏲️' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-4 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-pink-600 to-amber-500 font-mono">
                    {formatNumber(item.value)}
                  </div>
                  <p className="text-gray-500 text-sm mt-2 font-medium">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-pink-600 font-bold text-lg">مستعدة بنسبة {Math.min(100, Math.max(0, Math.round((365 - timeLeft.days) / 365 * 100)))}%</span>
                <span className="text-gray-400 text-sm">{timeLeft.days} يوم متبقي</span>
              </div>
              <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-pink-600 via-rose-400 to-amber-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, Math.round((365 - timeLeft.days) / 365 * 100)))}%` }}
                ></div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 rounded-2xl shadow-lg border border-pink-200 p-6">
              <h3 className="text-lg font-bold text-pink-700 mb-4 text-center">💡 نصائح للاستعداد</h3>
              <div className="space-y-3">
                {tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 rounded-xl p-4 shadow-sm border border-pink-100 text-gray-700 text-sm leading-relaxed"
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href="https://gharam.art"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gradient-to-l from-pink-600 to-rose-500 text-white py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                ✨ غرام سلطان ✨
              </a>
              <button
                onClick={handleDelete}
                className="px-6 bg-white text-pink-600 border-2 border-pink-300 py-3 rounded-2xl font-medium hover:bg-pink-50 transition-all duration-300 shadow-md"
              >
                🗑️ حذف التاريخ
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WeddingCountdown;