import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import quizData from '../data/quizQuestions';

const { questions, types } = quizData;

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate result
  const calculateResult = useCallback(() => {
    const counts = { classic: 0, modern: 0, bold: 0, natural: 0 };
    answers.forEach((value) => {
      if (counts[value] !== undefined) counts[value]++;
    });

    let maxCount = 0;
    let maxType = 'classic';
    for (const [type, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxType = type;
      }
    }

    return types[maxType];
  }, [answers]);

  // Handle answer selection
  const handleAnswer = useCallback(
    (value) => {
      if (isTransitioning) return;
      setSelectedOption(value);
      setIsTransitioning(true);

      // Delay to show selection animation
      setTimeout(() => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        setSelectedOption(null);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setIsTransitioning(false);
        } else {
          // Quiz complete
          const finalAnswers = newAnswers;
          const counts = { classic: 0, modern: 0, bold: 0, natural: 0 };
          finalAnswers.forEach((v) => {
            if (counts[v] !== undefined) counts[v]++;
          });

          let maxCount = 0;
          let maxType = 'classic';
          for (const [type, count] of Object.entries(counts)) {
            if (count > maxCount) {
              maxCount = count;
              maxType = type;
            }
          }

          setResult(types[maxType]);
          setShowResult(true);
          setIsTransitioning(false);
        }
      }, 400);
    },
    [answers, currentQuestion, isTransitioning, questions.length]
  );

  // Restart quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setSelectedOption(null);
    setIsTransitioning(false);
  }, []);

  // Current question data
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Result screen
  if (showResult && result) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Result Card */}
          <div className="animate-fadeIn">
            <div className="glass overflow-hidden">
              {/* Result header */}
              <div className="bg-gradient-to-l from-pink-600 via-rose-500 to-pink-500 px-6 py-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                <div className="relative z-10">
                  <div className="text-7xl mb-4 animate-bounce-slow">{result.image}</div>
                  <h2 className="text-3xl font-bold text-white mb-2">شخصيتك الجمالية</h2>
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                    <span className="text-xl font-bold text-white">{result.name}</span>
                  </div>
                </div>
              </div>

              {/* Result body */}
              <div className="p-6 space-y-5">
                <div className="text-center">
                  <p className="text-gray-600 text-lg leading-relaxed">{result.desc}</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💄</span>
                    <h3 className="font-bold text-pink-700 text-lg">التركيبة المناسبة ليكي:</h3>
                  </div>
                  <p className="text-gray-700 font-medium text-base mr-9">{result.makeup}</p>
                </div>

                {/* CTA Button */}
                <a
                  href="https://gharam.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-2xl shadow-xl shadow-amber-300/30 hover:shadow-amber-300/50 animate-glow"
                >
                  <span>احجزي موعدك في غرام سلطان</span>
                  <span>←</span>
                </a>

                {/* Restart */}
                <button
                  onClick={restartQuiz}
                  className="w-full text-gray-500 hover:text-pink-600 font-medium text-sm py-3 transition-colors"
                >
                  ✨ اختبريني تاني
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg shadow-pink-300/40 mb-3">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            اختبار الشخصية الجمالية
          </h1>
          <p className="text-gray-500 text-sm mt-1">اكتشفي ستايل الميك أب اللي يناسبك</p>
        </div>

        {/* Progress Bar */}
        <div className="glass mb-6 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-pink-600">
              سؤال {currentQuestion + 1} من {questions.length}
            </span>
            <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {question && (
          <div key={currentQuestion} className="animate-slideIn">
            <div className="glass overflow-hidden mb-6">
              <div className="bg-gradient-to-l from-pink-500 to-rose-500 px-6 py-5">
                <h2 className="text-xl font-bold text-white text-center">{question.question}</h2>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedOption === option.value;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    disabled={isTransitioning}
                    className={`
                      relative overflow-hidden rounded-2xl p-4 text-right font-medium text-base
                      transition-all duration-300 transform
                      ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white scale-[1.02] shadow-xl shadow-pink-300/40'
                          : 'bg-white/90 hover:bg-white hover:shadow-lg hover:scale-[1.01] text-gray-700 shadow-md border border-pink-100'
                      }
                      ${isTransitioning ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-pink-100 text-pink-600'
                          }
                        `}
                      >
                        {index + 1}
                      </div>
                      <span className="flex-1">{option.text}</span>
                      {isSelected && (
                        <span className="text-lg animate-float">💖</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint text */}
            <p className="text-center text-gray-400 text-xs mt-6">
              اختاري الإجابة اللي تناسبك أكتر
            </p>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideIn { animation: slideIn 0.5s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Quiz;