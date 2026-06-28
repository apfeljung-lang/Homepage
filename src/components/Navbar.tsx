import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { cn } from '@/src/lib/utils';

const MENU_ITEMS = [
  {
    name: '트레이딩',
    sub: ['매매시스템', '매매가이드', '계좌개설']
  },
  {
    name: '상품서비스',
    sub: ['상품', '서비스']
  },
  {
    name: '업무안내',
    sub: ['계좌개설', '뱅킹', '거래가이드', '청약']
  },
  {
    name: '투자정보',
    sub: ['리서치', '투혼투게더', '한경REPORT', '뉴스/공시', '해외증시', '해외투자정보', '증시캘린더', '이슈캘린더', '로보스토어']
  },
  {
    name: '고객센터',
    sub: ['고객지원', '금융소비자보호']
  },
  {
    name: 'MY페이지',
    sub: ['MY투자', '개인정보관리', '혜택/이벤트']
  }
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (page: 'home' | 'mypage' | 'investment' | 'report' | 'trading' | 'products' | 'customer' | 'guide') => void;
  currentPage: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

const NAV_MAP: Record<string, 'mypage' | 'investment' | 'trading' | 'products' | 'customer' | 'guide'> = {
  '트레이딩': 'trading',
  '상품서비스': 'products',
  '업무안내': 'guide',
  '투자정보': 'investment',
  '고객센터': 'customer',
  'MY페이지': 'mypage'
};

export default function Navbar({ 
  isDarkMode, 
  toggleDarkMode, 
  onNavigate, 
  currentPage,
  isLoggedIn,
  onLogout,
  onLoginClick
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-6 md:py-6',
        isScrolled ? 'glass py-3 md:py-5 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => {
                  const target = NAV_MAP[item.name];
                  if (target) onNavigate(target);
                }}
                className={cn(
                  "flex items-center gap-1 text-[18px] font-semibold transition-colors py-3",
                  currentPage === NAV_MAP[item.name]
                    ? "text-brand-blue" 
                    : "hover:text-brand-blue"
                )}
              >
                {item.name}
                <ChevronDown className={cn("w-4 h-4 transition-transform", activeMenu === item.name && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {activeMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-56 glass rounded-xl shadow-xl p-2 mt-2"
                  >
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const target = NAV_MAP[item.name];
                          if (target) {
                            onNavigate(target);
                            setActiveMenu(null);
                          }
                        }}
                        className="block px-4 py-2.5 text-[15px] font-medium hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rise rounded-full" />
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {isLoggedIn ? (
            <button 
              onClick={onLogout}
              className="hidden sm:flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
            >
              로그아웃
            </button>
          ) : (
            <button 
              onClick={onLoginClick}
              className="hidden sm:flex items-center gap-2 border border-brand-blue text-brand-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-blue/5 transition-all hover:scale-105 active:scale-95"
            >
              로그인
            </button>
          )}
          <button className="hidden sm:flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-blue/90 transition-all hover:scale-105 active:scale-95">
            <User className="w-4 h-4" />
            거래하기
          </button>
          <button 
            className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 mt-4 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {MENU_ITEMS.map((item) => (
                <div key={item.name} className="space-y-3">
                  <h3 
                    className={cn(
                      "font-bold cursor-pointer",
                      currentPage === NAV_MAP[item.name] ? "text-brand-blue" : "text-slate-900 dark:text-white"
                    )}
                    onClick={() => {
                      const target = NAV_MAP[item.name];
                      if (target) {
                        onNavigate(target);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sub.map((subItem) => (
                      <a 
                        key={subItem} 
                        href="#" 
                        className="text-sm text-slate-600 hover:text-brand-blue"
                        onClick={(e) => {
                          e.preventDefault();
                          const target = NAV_MAP[item.name];
                          if (target) {
                            onNavigate(target);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
