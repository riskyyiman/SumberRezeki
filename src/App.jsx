// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import ReportPage from './pages/ReportPage';
import { PosProvider } from './context/PosContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <PosProvider>
      <Router>
        <div className="min-h-screen bg-light-gray dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          {/* Padding top untuk desktop navbar, padding bottom untuk mobile bottom nav */}
          <main className="pt-[60px] sm:pt-[70px] pb-16 sm:pb-0">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </PosProvider>
  );
}

export default App;
