import React from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  History, 
  CreditCard, 
  UserCog, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  PieChart,
  ArrowRightLeft,
  BellRing
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MyPageIntroProps {
  onBack: () => void;
}

const SUB_MENUS = [
  {
    title: 'MY투자',
    description: '고객님의 투자 자산 현황, 포트폴리오 분석 및 맞춤형 종합 리포트를 관리하세요.',
    icon: Wallet,
    color: 'bg-blue-50 text-blue-600',
    items: ['종합 자산 현황', '포트폴리오 분석', '나의 투자 리포트']
  },
  {
    title: '개인정보관리',
    description: '안전한 거래를 위해 주소, 연락처 등의 기본 정보를 수정하고 계정 보안 수준을 설정합니다.',
    icon: UserCog,
    color: 'bg-purple-50 text-purple-600',
    items: ['기본 회원정보 수정', '비밀번호 및 보안카드', '마케팅 수집 동의']
  },
  {
    title: '혜택/이벤트',
    description: '고객님께 맞춰진 등급별 수수료 혜택 및 푸짐한 진행 중 이벤트를 빠짐없이 즐겨보세요.',
    icon: History,
    color: 'bg-emerald-50 text-emerald-600',
    items: ['나의 수수료 혜택', '진행 중인 이벤트', '당첨자 및 사은품']
  }
];

export default function MyPageIntro({ onBack }: MyPageIntroProps) {
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
        <h1 className="text-4xl font-bold mb-4 font-display">MY페이지</h1>
        <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
          고객님의 금융 자산을 더 투명하고 스마트하게 관리하세요. <br />
          필요한 정보와 서비스를 직관적으로 찾을 수 있도록 재구성했습니다.
        </p>
      </motion.div>

      {/* Grid of Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {SUB_MENUS.map((menu, index) => (
          <motion.div
            key={menu.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-[32px] border-black/5 hover:border-brand-blue/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", menu.color)}>
                <menu.icon className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{menu.title}</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {menu.description}
              </p>
              <div className="space-y-3 mb-8">
                {menu.items.map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group/item">
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/item:text-brand-blue transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-brand-blue/5 text-brand-blue font-bold rounded-2xl hover:bg-brand-blue transition-all hover:text-white flex items-center justify-center gap-2">
              서비스 바로가기 <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Summary Section / Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-brand-blue font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span>보안 및 안전성 강화</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-display leading-tight">
              회원님의 소중한 자산, <br />
              강력한 보안 기술로 보호하고 있습니다.
            </h2>
            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                <span className="text-sm">2단계 인증 활성화</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                <span className="text-sm">실시간 의심 거래 탐지</span>
              </div>
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4" />
                <span className="text-sm">보안 위협 알림 서비스</span>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
              보안 설정 관리
            </button>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  );
}
