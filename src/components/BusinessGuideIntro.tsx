import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Wallet, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BusinessGuideIntroProps {
  onBack: () => void;
}

const GUIDE_SECTIONS = [
  {
    title: '계좌개설',
    description: '쉽고 빠른 비대면 계좌개설 방법 및 영업점, 제휴은행 개설 안내를 확인하세요.',
    icon: Building2,
    color: 'bg-indigo-50 text-indigo-600',
    items: ['비대면 계좌개설', '제휴 은행 안내', '구비서류 확인']
  },
  {
    title: '뱅킹',
    description: '안전하고 신속한 이체, 대체 업무 및 외화 송금, 환전 서비스를 안내합니다.',
    icon: Wallet,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['이체/대체', '외화 송금/환전', '뱅킹수수료 안내', '자동이체 신청']
  },
  {
    title: '거래가이드',
    description: '성공적인 첫 걸음을 위한 상품별 거래 시간, 증거금, 세금 제도를 명쾌하게 가이드합니다.',
    icon: BookOpen,
    color: 'bg-amber-50 text-amber-600',
    items: ['주식 거래 시작하기', '증거금/신용 가이드', '수수료 및 거래세']
  },
  {
    title: '청약',
    description: '공모주, 실권주 청약 일정 및 자격 조건, 신청 방법에 대해 쉽고 친절하게 설명합니다.',
    icon: Calendar,
    color: 'bg-blue-50 text-blue-600',
    items: ['공모주 청약 가이드', '오늘의 청약 일정', '청약 자격 및 한도']
  }
];

export default function BusinessGuideIntro({ onBack }: BusinessGuideIntroProps) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <button 
          id="btn-guide-back"
          onClick={onBack}
          className="text-slate-400 hover:text-brand-blue mb-4 flex items-center gap-1 transition-colors group"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          홈으로 돌아가기
        </button>
        <h1 className="text-4xl font-bold mb-4 font-display">업무안내</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          고객님의 원활한 거래를 돕기 위한 행정적인 업무 처리 절차와 <br />
          신속한 뱅킹 가이드를 정확하고 친절하게 정리해 드립니다.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {GUIDE_SECTIONS.map((section, index) => (
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
                {section.items.map((item, idx) => (
                  <div 
                    key={item} 
                    id={`guide-item-${index}-${idx}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group/item"
                  >
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/item:text-brand-blue transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <button 
              id={`btn-guide-start-${index}`}
              className="w-full py-4 bg-brand-blue/5 text-brand-blue font-bold rounded-2xl hover:bg-brand-blue transition-all hover:text-white flex items-center justify-center gap-2"
            >
              업무 안내 시작하기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-brand-blue/5 rounded-[40px] p-10 md:p-14 border border-brand-blue/10 relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-brand-blue font-bold mb-4">
              <FileSpreadsheet className="w-5 h-5" />
              <span>신속한 행정 처리</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-display leading-tight text-slate-900">
              필요 서류 준비부터 제출까지, <br />
              비대면 자동화 시스템으로 시간을 절약하세요.
            </h2>
          </div>
          <div className="flex md:justify-end">
            <button 
              id="btn-guide-document-check"
              className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-brand-blue/20"
            >
              자주 묻는 업무 질문
            </button>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
