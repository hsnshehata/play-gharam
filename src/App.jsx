import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Magazine = lazy(() => import('./pages/Magazine'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Login = lazy(() => import('./pages/Login'));

const LoadingScreen = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#faf8f5' }}
  >
    <div className="text-center">
      <div
        className="w-12 h-12 mx-auto mb-4 border-3 rounded-full animate-spin"
        style={{
          borderColor: '#e8e4de',
          borderTopColor: '#d4af37',
        }}
      />
      <p className="text-sm font-medium" style={{ color: '#999', fontFamily: "'Cairo', sans-serif" }}>
        جاري التحميل...
      </p>
    </div>
  </div>
);

function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#faf8f5', fontFamily: "'Cairo', sans-serif" }}
    >
      <Navbar />
      <main className="flex-1 pt-[76px]">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
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
