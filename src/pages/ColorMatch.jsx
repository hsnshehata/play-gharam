import React, { useState } from 'react';

// Skin tones data
const skinTones = [
  { id: 'white', label: 'بيضاء', color: '#FFE0BD' },
  { id: 'wheatish', label: 'حنطية', color: '#DEB887' },
  { id: 'dark', label: 'سمراء', color: '#8B5E3C' },
  { id: 'fair', label: 'قمحية', color: '#F5DEB3' },
];

const hairColors = [
  { id: 'black', label: 'أسود', emoji: '🖤' },
  { id: 'brown', label: 'بني', emoji: '🤎' },
  { id: 'blonde', label: 'أشقر', emoji: '💛' },
  { id: 'red', label: 'أحمر', emoji: '❤️' },
];

const eyeColors = [
  { id: 'brown', label: 'بني', emoji: '🟤' },
  { id: 'hazel', label: 'عسلي', emoji: '🟢' },
  { id: 'green', label: 'أخضر', emoji: '💚' },
  { id: 'blue', label: 'أزرق', emoji: '🔵' },
];

// Recommendation logic based on selections
function getRecommendation(skinTone, hairColor, eyeColor) {
  const recs = {
    'white': {
      black: { rouge: 'Rouge وردي فاتح', eyeshadow: 'ظلال عيون ترابي/ذهبي', lipstick: 'أحمر شفاه نيود وردي' },
      brown: { rouge: 'Rouge خوخي', eyeshadow: 'ظلال عيون بني فاتح', lipstick: 'أحمر شفاه خوخي' },
      blonde: { rouge: 'Rouge وردي', eyeshadow: 'ظلال عيون زهري/فضي', lipstick: 'أحمر شفاه نيود' },
      red: { rouge: 'Rouge توتي', eyeshadow: 'ظلال عيون برونزي', lipstick: 'أحمر شفاه توتي' },
    },
    'wheatish': {
      black: { rouge: 'Rouge زهري غامق', eyeshadow: 'ظلال عيون نحاسي/ذهبي', lipstick: 'أحمر شفاه وردي غامق' },
      brown: { rouge: 'Rouge بيج', eyeshadow: 'ظلال عيون ذهبي', lipstick: 'أحمر شفاه كراميل' },
      blonde: { rouge: 'Rouge مشمشي', eyeshadow: 'ظلال عيون وردي فاتح/ذهبي', lipstick: 'أحمر شفاه نيود' },
      red: { rouge: 'Rouge برتقالي محروق', eyeshadow: 'ظلال عيون برونزي', lipstick: 'أحمر شفاه نحاسي' },
    },
    'dark': {
      black: { rouge: 'Rouge توتي غامق', eyeshadow: 'ظلال عيون أرجواني/ذهبي', lipstick: 'أحمر شفاه توتي غامق' },
      brown: { rouge: 'Rouge زهري غامق', eyeshadow: 'ظلال عيون بني غامق/ذهبي', lipstick: 'أحمر شفاه برقوقي' },
      blonde: { rouge: 'Rouge قرمزي', eyeshadow: 'ظلال عيون نحاسي/ذهبي', lipstick: 'أحمر شفاه عنابي' },
      red: { rouge: 'Rouge أحمر داكن', eyeshadow: 'ظلال عيون زمردي/ذهبي', lipstick: 'أحمر شفاه داكن' },
    },
    'fair': {
      black: { rouge: 'Rouge وردي فاتح', eyeshadow: 'ظلال عيون عسلي/ذهبي', lipstick: 'أحمر شفاه وردي' },
      brown: { rouge: 'Rouge خوخي فاتح', eyeshadow: 'ظلال عيون ذهبي فاتح', lipstick: 'أحمر شفاه وردي فاتح' },
      blonde: { rouge: 'Rouge نيود', eyeshadow: 'ظلال عيون لافندر/فضي', lipstick: 'أحمر شفاه وردي فاتح' },
      red: { rouge: 'Rouge مرجاني', eyeshadow: 'ظلال عيون بني فاتح/ذهبي', lipstick: 'أحمر شفاه مرجاني' },
    },
  };

  return recs[skinTone]?.[hairColor]?.[eyeColor]
    ? recs[skinTone][hairColor][eyeColor]
    : recs[skinTone]?.[hairColor]
      ? recs[skinTone][hairColor]
      : {
          rouge: 'Rouge نيود',
          eyeshadow: 'ظلال عيون ذهبي',
          lipstick: 'أحمر شفاه نيود',
        };
}

const ColorMatch = () => {
  const [step, setStep] = useState(1);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [selectedHair, setSelectedHair] = useState(null);
  const [selectedEye, setSelectedEye] = useState(null);

  const handleSkinSelect = (id) => {
    setSelectedSkin(id);
    setTimeout(() => setStep(2), 400);
  };

  const handleHairSelect = (id) => {
    setSelectedHair(id);
    setTimeout(() => setStep(3), 400);
  };

  const handleEyeSelect = (id) => {
    setSelectedEye(id);
    setTimeout(() => setStep(4), 400);
  };

  const reset = () => {
    setStep(1);
    setSelectedSkin(null);
    setSelectedHair(null);
    setSelectedEye(null);
  };

  const recommendation = selectedSkin && selectedHair && selectedEye
    ? getRecommendation(selectedSkin, selectedHair, selectedEye)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-yellow-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700 mb-2">🎨 لعبة تنسيق الألوان</h1>
          <p className="text-pink-500">اختاري الألوان المناسبة ليكي</p>
        </div>

        {/* Step 1: Skin Tone */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200 transition-all duration-500 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">اختاري لون بشرتك</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {skinTones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => handleSkinSelect(tone.id)}
                  className={`w-20 h-20 rounded-full shadow-lg border-4 transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
                    selectedSkin === tone.id ? 'border-pink-500 scale-110' : 'border-white hover:border-pink-300'
                  }`}
                  style={{ backgroundColor: tone.color }}
                  title={tone.label}
                >
                  <span className="block text-[10px] mt-20 text-gray-600 font-medium">{tone.label}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm mt-6">اختاري لون البشرة اللي قريبة منك</p>
          </div>
        )}

        {/* Step 2: Hair Color */}
        {step === 2 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200 transition-all duration-500 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">اختاري لون شعرك</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {hairColors.map((hair) => (
                <button
                  key={hair.id}
                  onClick={() => handleHairSelect(hair.id)}
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl shadow-md border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedHair === hair.id ? 'border-pink-500 bg-pink-50 scale-105' : 'border-gray-100 bg-white hover:border-pink-300'
                  }`}
                >
                  <span className="text-3xl">{hair.emoji}</span>
                  <span className="text-gray-700 font-medium">{hair.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Eye Color */}
        {step === 3 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200 transition-all duration-500 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">اختاري لون عيونك</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {eyeColors.map((eye) => (
                <button
                  key={eye.id}
                  onClick={() => handleEyeSelect(eye.id)}
                  className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl shadow-md border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedEye === eye.id ? 'border-pink-500 bg-pink-50 scale-105' : 'border-gray-100 bg-white hover:border-pink-300'
                  }`}
                >
                  <span className="text-3xl">{eye.emoji}</span>
                  <span className="text-gray-700 font-medium">{eye.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Recommendation */}
        {step === 4 && recommendation && (
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-50 rounded-3xl shadow-xl p-8 border border-pink-300">
              <div className="text-center mb-6">
                <span className="text-4xl">💄</span>
                <h2 className="text-2xl font-bold text-pink-700 mt-2">اقتراحات الميك أب</h2>
                <p className="text-pink-500 text-sm">حسب اختياراتك الجميلة</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100 flex items-center gap-4">
                  <span className="text-3xl">🌸</span>
                  <div>
                    <p className="text-xs text-pink-400 mb-1">اختيارك للـ</p>
                    <p className="text-gray-800 font-bold text-lg">{recommendation.rouge}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100 flex items-center gap-4">
                  <span className="text-3xl">👁️</span>
                  <div>
                    <p className="text-xs text-pink-400 mb-1">اختيارك لـ</p>
                    <p className="text-gray-800 font-bold text-lg">{recommendation.eyeshadow}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-100 flex items-center gap-4">
                  <span className="text-3xl">💋</span>
                  <div>
                    <p className="text-xs text-pink-400 mb-1">اختيارك لـ</p>
                    <p className="text-gray-800 font-bold text-lg">{recommendation.lipstick}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://gharam.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-l from-pink-600 to-rose-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  ✨ احجزي موعدك في غرام سلطان ✨
                </a>
                <button
                  onClick={reset}
                  className="block w-full text-center bg-white text-pink-600 border-2 border-pink-300 py-2 rounded-2xl font-medium hover:bg-pink-50 transition-all duration-300"
                >
                  🔄 ابدأي من تاني
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ColorMatch;