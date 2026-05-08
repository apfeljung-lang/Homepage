import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart2, 
  Globe2, 
  Zap, 
  ArrowRightLeft, 
  Layers, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  MousePointer2,
  Tv2,
  Smartphone,
  Search,
  Target,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TradingIntroProps {
  onBack: () => void;
}

const TRADING_SECTIONS = [
  {
    title: '주요 거래 상품',
    description: '국내외 주식부터 선물옵션까지, LS증권이 제공하는 핵심 매매 서비스를 한눈에 확인하세요.',
    icon: BarChart2,
    color: 'bg-blue-50 text-blue-600',
    items: ['국내주식', '해외주식', '국내선물옵션', '해외선물옵션']
  },
  {
    title: '스마트 분석/검색',
    description: '강력한 조건검색과 실시간 테마 분석으로 최적의 투자 기회를 포착하세요.',
    icon: Search,
    color: 'bg-indigo-50 text-indigo-600',
    items: ['조건검색', '테마/업종']
  },
  {
    title: '주식모아서비스',
    description: '원하는 종목을 원하는 주기로 꾸준히, 스마트하게 자산을 쌓아가는 적립식 투자 서비스입니다.',
    icon: Target,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['주식모아서비스']
  },
  {
    title: '투자 학습/체험',
    description: '실제 시장과 동일한 환경에서의 모의투자를 통해 실전 감각을 익히고 전략을 테스트하세요.',
    icon: GraduationCap,
    color: 'bg-purple-50 text-purple-600',
    items: ['모의투자']
  }
];

export default function TradingIntro({ onBack }: TradingIntroProps) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-brand-blue mb-4 flex items-center gap-1 transition-colors group"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          홈으로 돌아가기
        </button>
        <h1 className="text-4xl font-bold mb-4 font-display">트레이딩</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          전문적인 분석 도구와 직관적인 주문 시스템으로 <br />
          언제 어디서나 고객님의 투자 타이밍을 놓치지 않게 지원합니다.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {TRADING_SECTIONS.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-[32px] border-black/5 hover:border-brand-blue/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", section.color)}>
                <section.icon className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {section.description}
              </p>
              <div className="space-y-2 mb-8">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group/item">
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/item:text-brand-blue transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-brand-blue/5 text-brand-blue font-bold rounded-2xl hover:bg-brand-blue transition-all hover:text-white flex items-center justify-center gap-2">
              트레이딩 시작하기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Experience Multi-Platform Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-brand-mint font-bold mb-4">
              <Smartphone className="w-5 h-5" />
              <span>멀티 플랫폼 트레이딩</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-display leading-tight">
              PC, 모바일, 그리고 웹 <br />
              모든 환경에서 끊김 없는 투자를 경험하세요.
            </h2>
            <div className="flex flex-wrap gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm">MTS 투혼 (Mobile)</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv2 className="w-4 h-4" />
                <span className="text-sm">HTS 하이웨이 (PC)</span>
              </div>
              <div className="flex items-center gap-2">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-sm">웹 트레이딩 (WTS)</span>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end gap-3">
            <button className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
              다운로드
            </button>
          </div>
        </div>
        
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/30 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
