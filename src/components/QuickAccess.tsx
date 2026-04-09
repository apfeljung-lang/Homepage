import React from 'react';
import { 
  MonitorCheck, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  LineChart, 
  Scale, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const QUICK_MENUS = [
  { icon: MonitorCheck, label: '계좌개설' },
  { icon: Search, label: '잔고조회' },
  { icon: RefreshCw, label: '입출금' },
  { icon: ShieldCheck, label: '인증센터' },
  { icon: LineChart, label: 'WTS' },
  { icon: Scale, label: '금융소비자\n보호포털' },
];

const SIDE_MENUS = [
  '원격지원신청',
  '챗봇/채팅상담',
  '고객의 소리'
];

export default function QuickAccess() {
  return (
    <section className="w-full bg-slate-900 text-white py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
        
        {/* Left: Start Section */}
        <div className="p-8 md:w-1/4 flex flex-col justify-center items-center md:items-start text-center md:text-left border-r border-white/10">
          <h2 className="text-2xl font-bold font-display leading-tight mb-2">
            LS증권 <br />
            시작하기
          </h2>
          <button className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 transition-opacity">
            첫 방문이신가요? <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Main Icons */}
        <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 items-center">
          {QUICK_MENUS.map((menu, idx) => (
            <button 
              key={idx} 
              className="group flex flex-col items-center justify-center p-6 h-full border-r border-white/5 hover:bg-white/5 transition-colors"
            >
              <div className="mb-3 text-white/70 group-hover:text-brand-mint transition-colors group-hover:scale-110 transform duration-300">
                <menu.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium text-center whitespace-pre-line leading-tight text-white/80 group-hover:text-white">
                {menu.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Side Vertical Menu */}
        <div className="md:w-1/5 flex flex-col border-l border-white/10">
          {SIDE_MENUS.map((menu, idx) => (
            <button 
              key={idx} 
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium text-left hover:bg-white/5 transition-colors",
                idx !== SIDE_MENUS.length - 1 && "border-b border-white/5"
              )}
            >
              {menu}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
