import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Memory = lazy(() => import('./pages/MemoryGame'));
const ColorMatch = lazy(() => import('./pages/ColorMatch'));
const Wedding = lazy(() => import('./pages/WeddingCountdown'));
const Magazine = lazy(() => import('./pages/Magazine'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Login = lazy(() => import('./pages/Login'));

// Loading fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
      <p className="text-pink-600 font-semibold text-lg">جاري التحميل...</p>
    </div>
  </div>
);

function App() {
  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <Navbar />
        <main className="flex-1 pt-20">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/memory" element={<Memory />} />
              <Route path="/color-match" element={<ColorMatch />} />
              <Route path="/wedding" element={<Wedding />} />
              <Route path="/magazine" element={<Magazine />} />
              <Route path="/magazine/:id" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
  );
}

export default App;
