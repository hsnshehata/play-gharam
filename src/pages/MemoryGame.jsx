import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const PAIRS = [
  { id: 1, emoji: '💄', name: 'روج' },
  { id: 2, emoji: '👗', name: 'فستان' },
  { id: 3, emoji: '💍', name: 'خاتم' },
  { id: 4, emoji: '💅', name: 'منيكير' },
  { id: 5, emoji: '👰', name: 'عروسة' },
  { id: 6, emoji: '🌸', name: 'ورود' },
  { id: 7, emoji: '👑', name: 'تاج' },
  { id: 8, emoji: '💎', name: 'ألماسة' },
];

const TOTAL_PAIRS = PAIRS.length;
const TOTAL_CARDS = TOTAL_PAIRS * 2;

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCards() {
  const cards = [];
  PAIRS.forEach((pair) => {
    cards.push({ ...pair, cardId: `${pair.id}-a`, flipped: false, matched: false });
    cards.push({ ...pair, cardId: `${pair.id}-b`, flipped: false, matched: false });
  });
  return shuffle(cards);
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef(null);

  // Initialize game
  const initGame = useCallback(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTimer(0);
    setIsRunning(false);
    setGameWon(false);
    setIsChecking(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initGame]);

  // Timer logic
  useEffect(() => {
    if (isRunning && !gameWon) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, gameWon]);

  // Check for win
  useEffect(() => {
    if (matchedPairs === TOTAL_PAIRS) {
      setGameWon(true);
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [matchedPairs]);

  // Handle card flip
  const handleCardClick = useCallback(
    (cardId) => {
      if (isChecking || gameWon) return;

      const card = cards.find((c) => c.cardId === cardId);
      if (!card || card.flipped || card.matched) return;

      // Start timer on first flip
      if (!isRunning) {
        setIsRunning(true);
      }

      const newCards = cards.map((c) =>
        c.cardId === cardId ? { ...c, flipped: true } : c
      );
      setCards(newCards);
      setFlippedCards((prev) => [...prev, card]);

      // Check for match when two cards are flipped
      if (flippedCards.length === 0) {
        // First card flipped, just wait
        setMoves((prev) => prev + 1);
      } else if (flippedCards.length === 1) {
        // Second card flipped - check match
        const firstCard = flippedCards[0];
        const secondCard = card;
        setIsChecking(true);

        if (firstCard.id === secondCard.id) {
          // Match found!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.cardId === firstCard.cardId || c.cardId === secondCard.cardId
                  ? { ...c, matched: true, flipped: true }
                  : c
              )
            );
            setFlippedCards([]);
            setMatchedPairs((prev) => prev + 1);
            setIsChecking(false);
          }, 500);
        } else {
          // No match - flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.cardId === firstCard.cardId || c.cardId === secondCard.cardId
                  ? { ...c, flipped: false }
                  : c
              )
            );
            setFlippedCards([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    },
    [cards, flippedCards, isChecking, gameWon, isRunning]
  );

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Win screen
  if (gameWon) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="animate-fadeIn">
            <div className="glass overflow-hidden">
              {/* Win header */}
              <div className="bg-gradient-to-l from-pink-600 via-rose-500 to-pink-500 px-6 py-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                <div className="relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-6xl animate-bounce">🎉</span>
                      <span className="text-6xl animate-float">🏆</span>
                      <span className="text-6xl animate-bounce delay-150">🎊</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-4">أحسنتي! 🥳</h2>
                    <p className="text-pink-100 text-lg">ربحتِ اللعبة يا قمر!</p>
                  </div>
                </div>
              </div>

              {/* Win stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-100">
                    <span className="text-2xl block mb-1">🔄</span>
                    <p className="text-gray-500 text-xs mb-1">عدد المحاولات</p>
                    <p className="text-2xl font-bold text-pink-600">{moves}</p>
                  </div>
                  <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-100">
                    <span className="text-2xl block mb-1">⏱️</span>
                    <p className="text-gray-500 text-xs mb-1">الوقت</p>
                    <p className="text-2xl font-bold text-pink-600">{formatTime(timer)}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 text-center border border-amber-100">
                  <p className="text-lg text-gray-700 font-medium">
                    🧠 ذاكرتك قوية! كسبتي {TOTAL_PAIRS} أزواج في {moves} محاولة
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="https://gharam.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-2xl shadow-xl shadow-amber-300/30 hover:shadow-amber-300/50 animate-glow"
                >
                  <span>ما شاء الله! 🎉 غرام سلطان يستقبلكي</span>
                  <span>✨</span>
                </a>

                {/* Restart */}
                <button
                  onClick={initGame}
                  className="w-full text-gray-500 hover:text-pink-600 font-medium text-sm py-3 transition-colors"
                >
                  🔄 العبي تاني
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
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg shadow-pink-300/40 mb-3">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            لعبة الذاكرة التجميلية
          </h1>
          <p className="text-gray-500 text-sm mt-1">لاقي الزوج بين منتجات التجميل</p>
        </div>

        {/* Stats bar */}
        <div className="glass mb-4 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-pink-500 text-lg">🔄</span>
                <span className="text-sm font-semibold text-gray-600">{moves}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-pink-500 text-lg">✅</span>
                <span className="text-sm font-semibold text-gray-600">
                  {matchedPairs}/{TOTAL_PAIRS}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-500 text-lg">⏱️</span>
              <span className="text-sm font-bold text-pink-600 font-mono" dir="ltr">
                {formatTime(timer)}
              </span>
            </div>
            <button
              onClick={initGame}
              className="text-sm text-gray-400 hover:text-pink-600 transition-colors"
            >
              🔄 جديد
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => {
            const isFlipped = card.flipped || card.matched;
            return (
              <button
                key={card.cardId}
                onClick={() => handleCardClick(card.cardId)}
                disabled={isChecking || card.flipped || card.matched}
                className={`
                  aspect-square rounded-2xl transition-all duration-500 transform perspective-1000
                  ${isFlipped ? 'rotate-y-180' : ''}
                  ${card.matched ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-pink-50 shadow-lg shadow-green-200/50' : ''}
                  ${!isFlipped && !isChecking ? 'hover:scale-105 hover:shadow-xl' : ''}
                `}
              >
                <div className="relative w-full h-full">
                  {/* Card Back */}
                  <div
                    className={`
                      absolute inset-0 rounded-2xl flex items-center justify-center
                      bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500
                      shadow-md border border-pink-300/50
                      transition-all duration-500
                      ${isFlipped ? 'opacity-0 pointer-events-none rotate-y-180' : 'opacity-100'}
                    `}
                  >
                    <div className="text-center">
                      <span className="text-2xl">🌸</span>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                        <span className="text-[8px] text-pink-200 font-bold tracking-wide">?</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Front */}
                  <div
                    className={`
                      absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1
                      bg-white shadow-md border border-pink-100
                      transition-all duration-500
                      ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none rotate-y-180'}
                      ${card.matched ? 'bg-green-50 border-green-200' : ''}
                    `}
                  >
                    <span className="text-4xl sm:text-5xl">{card.emoji}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{card.name}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="text-center text-gray-400 text-xs mt-6">
          اختاري كارتین متماثلين عشان تكسبي 🎯
        </p>
      </div>

      {/* Custom animations & styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-bounce { animation: bounce 1s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .delay-150 { animation-delay: 150ms; }

        /* Card flip 3D transform */
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}

export default MemoryGame;