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
  Code
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

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

        <hr className="border-slate-100 dark:border-slate-800/40" />

        {/* 매매시스템 안내 영역 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[12px] font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/10 dark:bg-brand-blue/20 px-3 py-1 rounded-full">Trading Platforms</span>
              <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white font-display">
                매매시스템 안내
              </h3>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[16px]">MTS</h4>
              </div>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong className="text-brand-blue font-semibold">투혼(MTS)</strong>은 다양한 모드를 제공해 개인화된 투자 서비스 환경을 제공하는 LS증권의 차세대 MTS입니다.
              </p>
            </div>

            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Monitor className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[16px]">HTS</h4>
              </div>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
                초보에서 전문가까지 쉽게 사용할 수 있는 매매프로그램으로 주식, 모든 상품을 하나의 시스템으로 거래할 수 있는 통합 HTS입니다.
              </p>
            </div>

            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[16px]">WTS</h4>
              </div>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
                PC(윈도우/맥), 태블릿(iPad, Galaxy tab), 스마트폰에서 별도 앱 설치 없이 사용이 가능합니다.
              </p>
            </div>

            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[16px]">OPEN API</h4>
              </div>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
                LS증권이 제공하는 OPEN API 서비스는 다양한 기능을 통해서 누구나 쉽게 원하는 앱과 프로그램을 개발할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
