import React from 'react';
import { motion } from 'motion/react';
import { 
  PiggyBank, 
  Coins, 
  LineChart, 
  ShieldCheck, 
  Landmark, 
  ChevronRight, 
  ArrowUpRight,
  PieChart,
  Percent,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FinancialProductsIntroProps {
  onBack: () => void;
}

const PRODUCT_SECTIONS = [
  {
    title: '펀드/ETF',
    description: '전 세계 다양한 자산에 골고루 투자하는 전문가 엄선 펀드와 실시간 ETF를 만나보세요.',
    icon: PieChart,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['국내/해외 펀드', '테마 ETF', '연금 저축 펀드', '이달의 추천 펀드']
  },
  {
    title: '채권/RP',
    description: '안정적인 이자 수익을 추구하는 국공채, 우량 회사채 및 단기 자산운용 상품입니다.',
    icon: Landmark,
    color: 'bg-blue-50 text-blue-600',
    items: ['국내 채권 매매', '해외 채권(미국 등)', '수시 입출금 RP', '특판 채권 안내']
  },
  {
    title: '퇴직연금(IRP/DC)',
    description: '든든한 노후를 위한 스마트한 연금 관리, 세액 공제 혜택과 전문적인 포트폴리오를 제공합니다.',
    icon: PiggyBank,
    color: 'bg-purple-50 text-purple-600',
    items: ['IRP 개설/이전', '퇴직연금 DC 관리', '연금 수령 설계', '성과 분석 리포트']
  },
  {
    title: 'ISA/절세상품',
    description: '세금을 아끼는 똑똑한 투자, 절세 한도를 최대한 활용할 수 있는 맞춤 상품을 제안합니다.',
    icon: Percent,
    color: 'bg-amber-50 text-amber-600',
    items: ['중개형 ISA', '비과세 저축', '연말정산 가이드', '세무 전문가 상담']
  }
];

export default function FinancialProductsIntro({ onBack }: FinancialProductsIntroProps) {
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
        <h1 className="text-4xl font-bold mb-4 font-display">금융상품</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          고객님의 투자 성향과 생애 주기에 맞춘 최적의 자산 구성, <br />
          LS증권의 전문적인 데이터와 인사이트가 함께합니다.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {PRODUCT_SECTIONS.map((section, index) => (
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
              상품 정보 더보기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust & Solution Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-brand-blue/5 rounded-[40px] p-10 md:p-14 border border-brand-blue/10 relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-brand-blue font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span>검증된 자산관리 솔루션</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-display leading-tight text-slate-900">
              어려운 금융상품 선택, <br />
              LS증권의 '투론'이 길잡이가 되어 드립니다.
            </h2>
            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">월간 자산관리 리포트</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">수익률 시뮬레이션</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span className="text-sm">실시간 시장 변동성 대응</span>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end">
            <button className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-brand-blue/20">
              맞춤 상품 찾기
            </button>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
