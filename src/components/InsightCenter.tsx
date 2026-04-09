import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BarChart3, Globe2, Newspaper, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const INSIGHTS = [
  {
    category: '시장 요약',
    title: '금리 인하 기대감에 반등하는 기술주, 향후 전망은?',
    icon: BarChart3,
    image: 'https://picsum.photos/seed/illustration-finance-growth/800/450',
    size: 'large'
  },
  {
    category: '글로벌 리서치',
    title: '미국 대선과 증시의 상관관계 분석',
    icon: Globe2,
    image: 'https://picsum.photos/seed/illustration-usa-politics/400/400',
    size: 'small'
  },
  {
    category: '오늘의 뉴스',
    title: '반도체 업황 개선 신호, 삼성전자 실적 발표 관전 포인트',
    icon: Newspaper,
    image: 'https://picsum.photos/seed/illustration-semiconductor-chip/400/400',
    size: 'small'
  }
];

export default function InsightCenter() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: AI Research Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-6">
                <Sparkles className="w-3 h-3" />
                AI RESEARCH POWERED BY GEMINI
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                실시간 뉴스 <br />
                <span className="text-brand-blue">AI 요약 리포트</span>
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                수천 개의 뉴스를 실시간으로 분석하여 투자에 꼭 필요한 핵심 정보만 요약해 드립니다.
              </p>

              <div className="space-y-4">
                {[
                  '엔비디아 실적 발표 후 AI 관련주 동향 요약',
                  '국내 증시 밸류업 프로그램 수혜주 리스트',
                  '환율 변동에 따른 수출주 영향 분석'
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all"
                  >
                    <span className="text-sm font-medium truncate pr-4">{text}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors" />
                  </motion.div>
                ))}
              </div>

              <button className="mt-8 w-full py-4 rounded-2xl border-2 border-slate-100 font-bold hover:border-brand-blue hover:text-brand-blue transition-all">
                AI 리서치 더보기
              </button>
            </div>
          </div>

          {/* Right: Insight Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {INSIGHTS.map((insight, idx) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative rounded-[40px] overflow-hidden group cursor-pointer",
                  insight.size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
                )}
              >
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold mb-3">
                    <insight.icon className="w-4 h-4" />
                    {insight.category}
                  </div>
                  <h3 className={cn(
                    "text-white font-bold leading-tight group-hover:text-brand-mint transition-colors",
                    insight.size === 'large' ? 'text-3xl' : 'text-xl'
                  )}>
                    {insight.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
