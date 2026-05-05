import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { cn } from '@/src/lib/utils';

const MENU_ITEMS = [
  {
    name: 'MY페이지',
    sub: ['나의 자산', '나의 활동', '뱅킹/대출 현황', '회원정보 관리']
  },
  {
    name: '투자정보',
    sub: ['시황·뉴스·공시', 'AI 종목 추천', '월간 투혼', '리서치센터', '경제지표']
  },
  {
    name: '트레이딩',
    sub: ['주식/선물옵션', '조건검색', '테마/업종', '주식모아 서비스', '모의투자']
  },
  {
    name: '금융상품',
    sub: ['ETF', '펀드', '연금/ISA', 'RIA계좌']
  },
  {
    name: '고객서비스',
    sub: ['공지사항', '증명서 발급', '상담·민원', '보안센터']
  }
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
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
        <div className="flex items-center cursor-pointer">
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
              <button className="flex items-center gap-1 text-[18px] font-semibold hover:text-brand-blue transition-colors py-3">
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
          <button className="hidden sm:flex items-center gap-2 border border-brand-blue text-brand-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-blue/5 transition-all hover:scale-105 active:scale-95">
            ID 등록
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-blue/90 transition-all hover:scale-105 active:scale-95">
            <User className="w-4 h-4" />
            로그인
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
                  <h3 className="font-bold text-brand-blue">{item.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sub.map((subItem) => (
                      <a key={subItem} href="#" className="text-sm text-slate-600 hover:text-brand-blue">
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
