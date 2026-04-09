/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickAccess from './components/QuickAccess';
import Dashboard from './components/Dashboard';
import ProductCuration from './components/ProductCuration';
import InsightCenter from './components/InsightCenter';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero />
        <QuickAccess />
        <Dashboard isLoggedIn={isLoggedIn} />
        
        <ProductCuration />
        
        <InsightCenter />

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
    </div>
  );
}

