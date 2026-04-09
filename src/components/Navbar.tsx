import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const MENU_ITEMS = [
  {
    name: '온라인지점',
    sub: ['계좌개설', '이체/대체', '신용/대출', 'MY 자산 현황']
  },
  {
    name: '금융상품',
    sub: ['펀드', '채권', 'ISA', '퇴직연금(IRP)', '발행어음']
  },
  {
    name: '해외시장',
    sub: ['미국/주간거래', '소수점 투자', '글로벌 리서치', '환전 서비스']
  },
  {
    name: '투자정보',
    sub: ['실시간 시황', 'AI 종목 추천', '고수들의 선택', '공모주 일정']
  },
  {
    name: '고객센터',
    sub: ['자주 묻는 질문', '공지사항', '1:1 상담', '보안센터']
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6',
        isScrolled ? 'glass py-5 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <img 
            src="https://i.namu.wiki/i/llT23hGvU7I1uFm9_Ns4OafehayqioeBydNaSyql0-390KKLTbnzARjVwXLa7hpJMy6EaNq_5rPvJxd4CqrtCg.svg" 
            alt="LS Securities" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
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
