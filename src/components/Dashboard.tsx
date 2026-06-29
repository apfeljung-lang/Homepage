import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Wallet, 
  ArrowUpRight, 
  PieChart,
  Smartphone,
  Monitor,
  Globe,
  Code,
  Bell,
  Gift,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Import images statically so that Vite processes and resolves them correctly in production builds
import eventInterestRateImg from '../assets/images/event_interest_rate_1782279198274.jpg';
import eventPowermapMascotImg from '../assets/images/event_powermap_mascot_1782279215394.jpg';

interface DashboardProps {
  isLoggedIn: boolean;
}

const MARKET_INDICES = [
  { name: 'KOSPI', value: '2,652.15', change: '+1.24%', isUp: true },
  { name: 'KOSDAQ', value: '862.10', change: '-0.45%', isUp: false },
  { name: 'NASDAQ', value: '16,274.94', change: '+0.82%', isUp: true },
  { name: 'S&P 500', value: '5,175.27', change: '+0.56%', isUp: true },
];

const POPULAR_STOCKS = [
  { rank: 1, name: '삼성전자', price: '78,200', change: '+1.5%' },
  { rank: 2, name: 'SK하이닉스', price: '165,400', change: '+2.1%' },
  { rank: 3, name: '에코프로', price: '542,000', change: '-3.2%' },
  { rank: 4, name: '현대차', price: '242,500', change: '+0.8%' },
];

const NOTICES = [
  { id: 1, title: '시스템 정기 점검에 따른 서비스 일시 중단 안내 (6/28)', date: '2026.06.24', category: '점검' },
  { id: 2, title: '해외주식 실시간 시세 무료 제공 서비스 확대 시행', date: '2026.06.18', category: '서비스' },
  { id: 3, title: '개인정보처리방침 일부 변경 및 고지 안내', date: '2026.06.10', category: '안내' },
];

const EVENTS = [
  { 
    id: 1, 
    title: '신용융자 금리할인 우량종목 우대금리 5.5%', 
    period: '2026.04.01 ~ 2026.12.31', 
    badge: '우대금리',
    img: eventInterestRateImg
  },
  { 
    id: 2, 
    title: '파워맵프로 가입하고 실시간 수급 확인하기', 
    period: '2026.06.01 ~ 2026.07.31', 
    badge: '가입혜택',
    img: eventPowermapMascotImg
  },
];

export default function Dashboard({ isLoggedIn }: DashboardProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 relative z-20 flex flex-col gap-8">
      {/* 로그인 시 상단에 표시되는 회원 개인 투자 대시보드 */}
      {isLoggedIn && (
        <div className="glass rounded-[32px] p-8 shadow-xl border-white/40">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-2">
                  송아리님, 오늘 내 자산은 <span className="text-rise font-extrabold">1.2%</span> 피어오르고 있어요 🌸
                </h2>
                <p className="text-slate-500 mb-6">최근 7일간 수익률이 시장 평균보다 0.5% 높습니다.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-black/5 dark:border-white/5">
                    <p className="text-xs text-slate-400 mb-1">총 자산</p>
                    <p className="text-xl font-bold">₩ 42,580,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-black/5 dark:border-white/5">
                    <p className="text-xs text-slate-400 mb-1">평가 손익</p>
                    <p className="text-xl font-bold text-rise">+ ₩ 5,120,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl hidden sm:block border border-black/5 dark:border-white/5">
                    <p className="text-xs text-slate-400 mb-1">예수금</p>
                    <p className="text-xl font-bold">₩ 2,450,000</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-3xl flex flex-col justify-between hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors group">
                <Wallet className="w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-xs opacity-60">내 지갑</p>
                  <p className="font-bold">자산 관리</p>
                </div>
              </button>
              <button className="flex-1 bg-brand-blue text-white p-6 rounded-3xl flex flex-col justify-between hover:bg-brand-blue/90 transition-colors group">
                <PieChart className="w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-xs opacity-60">포트폴리오</p>
                  <p className="font-bold">분석 리포트</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 주식 및 금융 시장 지수 정보와 매매시스템 안내가 합쳐진 통합 세션 */}
      <div className="glass rounded-[32px] p-8 shadow-xl border-white/40 flex flex-col gap-10">
        
        {/* 주식 및 금융 시장 지수 정보 영역 */}
        <div>
          <div className="flex items-center justify-between mb-6 overflow-x-auto pb-4 no-scrollbar gap-8">
            {MARKET_INDICES.map((index) => (
              <div key={index.name} className="flex-shrink-0">
                <p className="text-[14px] text-slate-400 mb-1 font-bold">{index.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-extrabold">{index.value}</span>
                  <span className={cn(
                    "text-[14px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
                    index.isUp ? "bg-rise/10 text-rise" : "bg-fall/10 text-fall"
                  )}>
                    {index.isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {index.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 border-t border-slate-100 dark:border-slate-800/40 pt-6">
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-6 py-2 rounded-full w-full lg:w-auto flex-shrink-0">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-[16px] font-bold text-slate-400 whitespace-nowrap">인기 검색</span>
            </div>
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full">
              {POPULAR_STOCKS.map((stock) => (
                <div key={stock.name} className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-brand-blue font-bold italic text-[16px]">{stock.rank}</span>
                  <span className="text-[16px] font-medium">{stock.name}</span>
                  <span className="text-[14px] text-slate-400">{stock.price}</span>
                  <span className={cn(
                    "text-[14px] font-bold",
                    stock.change.startsWith('+') ? "text-rise" : "text-fall"
                  )}>
                    {stock.change}
                  </span>
                </div>
              ))}
            </div>
            <button className="flex-shrink-0 text-[16px] font-bold text-brand-blue flex items-center gap-1 hover:underline">
              더보기 <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 공지사항 및 진행중인 이벤트 영역 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 공지사항 */}
        <div className="glass rounded-[32px] p-8 shadow-xl border-white/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">공지사항</h3>
              </div>
              <button className="text-sm font-semibold text-slate-400 hover:text-brand-blue flex items-center gap-1 transition-colors">
                더보기 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/40">
              {NOTICES.map((notice) => (
                <div 
                  key={notice.id} 
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className={cn(
                      "px-2.5 py-0.5 text-[10px] font-bold rounded-md flex-shrink-0 uppercase tracking-wider",
                      notice.category === '점검' && "bg-fall/10 text-fall",
                      notice.category === '서비스' && "bg-brand-blue/10 text-brand-blue",
                      notice.category === '안내' && "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    )}>
                      {notice.category}
                    </span>
                    <span className="text-[15px] font-medium text-slate-700 dark:text-slate-200 group-hover:text-brand-blue transition-colors truncate">
                      {notice.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap sm:text-right">
                    {notice.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 진행중인 이벤트 */}
        <div className="glass rounded-[32px] p-8 shadow-xl border-white/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display font-black">진행중인 이벤트</h3>
              </div>
              <button className="text-sm font-semibold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors">
                더보기 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {EVENTS.map((event) => (
                <div 
                  key={event.id}
                  className="group relative rounded-2xl p-5 border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/40 hover:border-rose-200 dark:hover:border-rose-900/40 hover:shadow-lg transition-all duration-300 flex items-start justify-between gap-4 overflow-hidden cursor-pointer"
                >
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full min-h-[96px]">
                    <div>
                      <span className="inline-block px-2.5 py-1 bg-rose-500/10 text-rose-500 dark:text-rose-400 text-[10px] font-bold rounded-md mb-2">
                        {event.badge}
                      </span>
                      <h4 className="font-bold text-[14px] text-slate-900 dark:text-white leading-snug mb-1.5 group-hover:text-rose-500 transition-colors line-clamp-2">
                        {event.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 whitespace-nowrap mt-auto">
                      {event.period}
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-100 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-950">
                    <img 
                      src={event.img} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
