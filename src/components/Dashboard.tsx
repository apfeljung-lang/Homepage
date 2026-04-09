import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Search, Wallet, ArrowUpRight, PieChart } from 'lucide-react';
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
    <section className="max-w-7xl mx-auto px-6 py-10 relative z-20">
      <div className="glass rounded-[32px] p-8 shadow-xl border-white/40">
        {isLoggedIn ? (
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-2">
                  김루시드님, 오늘 내 자산은 <span className="text-rise">1.2%</span> 피어오르고 있어요 🌸
                </h2>
                <p className="text-slate-500 mb-6">최근 7일간 수익률이 시장 평균보다 0.5% 높습니다.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xs text-slate-400 mb-1">총 자산</p>
                    <p className="text-xl font-bold">₩ 42,580,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-xs text-slate-400 mb-1">평가 손익</p>
                    <p className="text-xl font-bold text-rise">+ ₩ 5,120,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl hidden sm:block">
                    <p className="text-xs text-slate-400 mb-1">예수금</p>
                    <p className="text-xl font-bold">₩ 2,450,000</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-between hover:bg-slate-800 transition-colors group">
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
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 no-scrollbar gap-8">
              {MARKET_INDICES.map((index) => (
                <div key={index.name} className="flex-shrink-0">
                  <p className="text-[14px] text-slate-400 mb-1 font-bold">{index.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-bold">{index.value}</span>
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

            <div className="flex flex-col lg:flex-row items-center gap-6 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-3 bg-slate-100 px-6 py-2 rounded-full w-full lg:w-auto flex-shrink-0">
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
        )}
      </div>
    </section>
  );
}
