import React from 'react';
import { motion } from 'motion/react';
import { Globe, LineChart, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const TOGETHER_SECTIONS = [
  {
    title: '글로벌 마켓 해외이슈',
    desc: '세계 금융시장을 달구는 가장 생생한 글로벌 경제 트렌드와 해외 소식을 만나보세요.',
    icon: Globe,
    color: 'bg-brand-blue',
    tags: ['#글로벌이슈', '#미국증시', '#해외테마'],
    badge: 'LIVE'
  },
  {
    title: '전문가와 시장읽기',
    desc: '복잡한 거시경제를 넘어 미시적 시장의 핵심 흐름과 테마 거래 동향을 친절히 분석합니다.',
    icon: LineChart,
    color: 'bg-brand-mint',
    tags: ['#시황분석', '#테마순환', '#차트핵심'],
    badge: 'HOT'
  },
  {
    title: '집단지성 종목톡톡',
    desc: '개별 종목 토론방과 실시간 톡을 통해 자유롭고 즐겁게 소통하는 투자 놀이터입니다.',
    icon: MessageSquare,
    color: 'bg-purple-500',
    tags: ['#종목토론', '#실시간댓글', '#투자수다']
  }
];

export default function ToohonTogether() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 border-b border-slate-100 dark:border-slate-800/40">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-[12px] font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/10 dark:bg-brand-blue/20 px-3 py-1 rounded-full">Community & Insight</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 font-display">투혼투게더</h2>
          <p className="text-slate-500 dark:text-slate-400">해외이슈, 시장읽기, 종목톡톡으로 통하는 똑똑한 투자 커뮤니티입니다.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
          커뮤니티 바로가기 <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOGETHER_SECTIONS.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass p-8 rounded-[32px] flex flex-col h-full group cursor-pointer border-black/5 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", section.color)}>
                <section.icon className="w-6 h-6" />
              </div>
              {section.badge && (
                <span className="bg-rise text-white text-[10px] font-black px-2 py-1 rounded-lg">
                  {section.badge}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors">{section.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">{section.desc}</p>

            <div className="flex flex-wrap gap-2">
              {section.tags.map(tag => (
                <span key={tag} className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-900/60 dark:text-slate-500 px-2 py-1 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
