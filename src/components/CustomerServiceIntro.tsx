import React from 'react';
import { motion } from 'motion/react';
import { 
  Headphones, 
  Settings, 
  ShieldAlert, 
  HelpCircle, 
  Bell, 
  ChevronRight, 
  ArrowUpRight,
  MapPin,
  CalendarDays,
  FileSearch,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CustomerServiceIntroProps {
  onBack: () => void;
}

const SERVICE_SECTIONS = [
  {
    title: '고객지원센터',
    description: '궁금하신 사항을 신속하게 해결해 드립니다. 전화, 온라인 문의 등 다양한 채널이 열려 있습니다.',
    icon: Headphones,
    color: 'bg-indigo-50 text-indigo-600',
    items: ['자주 묻는 질문(FAQ)', '1:1 상담 문의', '전화 상담 안내', '원격 지원 서비스']
  },
  {
    title: '공지/이벤트',
    description: 'LS증권의 새로운 소식과 진행중인 다양한 혜택을 놓치지 말고 확인하세요.',
    icon: Bell,
    color: 'bg-amber-50 text-amber-600',
    items: ['주요 공지사항', '진행중인 이벤트', '당첨자 발표', '증권사 뉴스']
  },
  {
    title: '업무/보안 설정',
    description: '안전한 금융 거래를 위해 보안 매체를 관리하고 주요 업무를 온라인으로 간편하게 처리하세요.',
    icon: ShieldAlert,
    color: 'bg-rose-50 text-rose-600',
    items: ['보안카드/OTP 등록', '인증 센터', '사고 신고', '개인정보 보호 설정']
  },
  {
    title: '가이드/약관',
    description: '서비스 이용을 위한 상세 가이드와 투명한 약관 정보를 제공합니다.',
    icon: FileSearch,
    color: 'bg-slate-50 text-slate-600',
    items: ['초보자 가이드', '약관 및 유의사항', '수수료 안내', '서식/자료실']
  }
];

export default function CustomerServiceIntro({ onBack }: CustomerServiceIntroProps) {
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
        <h1 className="text-4xl font-bold mb-4 font-display">고객서비스</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          고객님의 목소리에 귀 기울이며, <br />
          더 안전하고 편리한 금융 서비스 경험을 위해 최선을 다하겠습니다.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {SERVICE_SECTIONS.map((section, index) => (
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
              서비스 이용하기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Info Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">고객센터(대표번호)</h4>
            <div className="text-xl font-bold text-brand-blue mb-1">1588-0000</div>
            <p className="text-xs text-slate-400 leading-tight">평일 08:00 ~ 18:00 <br /> (주말 및 공휴일 휴무)</p>
          </div>
        </div>
        
        <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">지점 안내</h4>
            <p className="text-sm text-slate-500 mb-3">가까운 영업점 위치와 정보를 <br /> 확인하실 수 있습니다.</p>
            <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
              지점 찾기 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600 shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">업무 캘린더</h4>
            <p className="text-sm text-slate-500 mb-3">이달의 주요 증시 일정 및 <br /> 공모주 청약일을 확인하세요.</p>
            <button className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
              일정 보기 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
