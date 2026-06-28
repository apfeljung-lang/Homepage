/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickAccess from './components/QuickAccess';
import Dashboard from './components/Dashboard';
import ToohonTogether from './components/ToohonTogether';
import MarketInsightHub from './components/MarketInsightHub';
import InsightCenter from './components/InsightCenter';
import Footer from './components/Footer';
import MyPageIntro from './components/MyPageIntro';
import InvestmentInfoIntro from './components/InvestmentInfoIntro';
import MarketReportDetail from './components/MarketReportDetail';
import TradingIntro from './components/TradingIntro';
import FinancialProductsIntro from './components/FinancialProductsIntro';
import CustomerServiceIntro from './components/CustomerServiceIntro';
import BusinessGuideIntro from './components/BusinessGuideIntro';
import QrLoginModal from './components/QrLoginModal';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut } from 'lucide-react';

type PageView = 'home' | 'mypage' | 'investment' | 'report' | 'trading' | 'products' | 'customer' | 'guide';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Top scroll on page change
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-bg-light text-slate-900'}`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        onNavigate={(page: PageView) => setCurrentPage(page)}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onNavigate={(page: PageView) => setCurrentPage(page)} />
              <QuickAccess />
              <Dashboard isLoggedIn={isLoggedIn} />
              <ToohonTogether />
              <MarketInsightHub onNavigate={(page: PageView) => setCurrentPage(page)} />
              <InsightCenter />
            </motion.div>
          )}
          {currentPage === 'mypage' && (
            <motion.div
              key="mypage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MyPageIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'investment' && (
            <motion.div
              key="investment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InvestmentInfoIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MarketReportDetail onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'trading' && (
            <motion.div
              key="trading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TradingIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FinancialProductsIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'customer' && (
            <motion.div
              key="customer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CustomerServiceIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {currentPage === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BusinessGuideIntro onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Login Toggle for Demo */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="flex items-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl font-bold hover:scale-105 transition-all active:scale-95"
          >
            {isLoggedIn ? (
              <>
                <LogOut className="w-4 h-4" />
                로그아웃 (데모)
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                로그인 (데모)
              </>
            )}
          </button>
        </div>
      </main>

      <Footer />

      {/* QR Code Login Modal */}
      <QrLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </div>
  );
}

