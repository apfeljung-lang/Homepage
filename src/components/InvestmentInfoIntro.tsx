import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  BarChart3, 
  Newspaper, 
  BrainCircuit, 
  GraduationCap, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  Globe,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface InvestmentInfoIntroProps {
  onBack: () => void;
}

const INVESTMENT_SECTIONS = [
  {
    title: '시황·뉴스·공시',
    description: '실시간으로 업데이트되는 국내외 증시 상황과 주요 경제 뉴스를 가장 빠르게 전달합니다.',
    icon: Newspaper,
    color: 'bg-indigo-50 text-indigo-600',
    items: ['실시간 국내 증시', '해외 증시 요약', '주요 경제 뉴스', '기업 공시 정보']
  },
  {
    title: 'AI 종목 추천',
    description: '빅데이터와 고도화된 알고리즘을 통해 고객님의 투자 성향에 딱 맞는 유망 종목을 제안합니다.',
    icon: BrainCircuit,
    color: 'bg-purple-50 text-purple-600',
    items: ['AI 테마 탐색', '오늘의 급등주 예측', '수급 분석 리포트', '종목별 투자의견']
  },
  {
    title: '경제지표 & 리서치',
    description: '글로벌 거시 경제 지표와 전문 애널리스트들의 깊이 있는 시장 분석 리포트를 확인하세요.',
    icon: BarChart3,
    color: 'bg-rose-50 text-rose-600',
    items: ['글로벌 경제지표', '산업·테마 리서치', '기업 분석 상세', '데일리 리포트']
  },
  {
    title: '투자 가이드',
    description: '초보자부터 전문가까지, 단계별 금융 지식과 효율적인 투자 전략을 교육 콘텐츠와 함께 제공합니다.',
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['금융 기초 지식', '월간 투혼', '용어 사전', '절세 가이드']
  }
];

export default function InvestmentInfoIntro({ onBack }: InvestmentInfoIntroProps) {
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
        <h1 className="text-4xl font-bold mb-4 font-display">투자정보</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          격이 다른 데이터와 인사이트로 성공적인 투자 여정을 지원합니다. <br />
          복잡한 시장 흐름 속에서 신뢰할 수 있는 지표를 만나보세요.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {INVESTMENT_SECTIONS.map((section, index) => (
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
              <div className="space-y-3 mb-8">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group/item">
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/item:text-brand-blue transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-brand-blue/5 text-brand-blue font-bold rounded-2xl hover:bg-brand-blue transition-all hover:text-white flex items-center justify-center gap-2">
              상세 정보 보기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Hero-like Summary Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-brand-blue/5 rounded-[40px] p-10 md:p-14 border border-brand-blue/10 relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-brand-blue font-bold mb-4">
              <TrendingUp className="w-5 h-5" />
              <span>실시간 인사이트</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-display leading-tight text-slate-900">
              글로벌 시장의 핵심 지표를 <br />
              단 하나의 대시보드에서 확인하세요.
            </h2>
            <div className="flex flex-wrap gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">해외 주요국 시황</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">급변하는 테마 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm">맞춤형 지표 위젯</span>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end">
            <button className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-brand-blue/20">
              대시보드 설정하기
            </button>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
      </motion.div>
    </div>
  );
}
