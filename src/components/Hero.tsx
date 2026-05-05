import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { cn } from '@/src/lib/utils';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
  value: 4000 + Math.random() * 500 + Math.sin(i / 2) * 200
}));

export default function Hero() {
  return (
    <section className="relative pt-38 pb-6 overflow-hidden min-h-[58vh]">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={MOCK_DATA}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0066FF" 
              strokeWidth={4} 
              dot={false}
              isAnimationActive={true}
              animationDuration={3000}
            />
            <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
          </LineChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-light/0 via-bg-light/50 to-bg-light" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            NEW STANDARD OF WEALTH
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-[1.4] mb-8">
            수익 관리의 <span className="text-brand-blue">새로운 기준,</span> <br />
            당신의 투자가 밝아집니다.
          </h1>
          
          <p className="text-lg text-slate-600 mb-14 max-w-lg leading-relaxed">
            함께 투명하고 신뢰할 수 있는 금융 여정을 시작하세요. <br />
            AI 기반의 정밀한 분석과 직관적인 인터페이스로 당신의 자산을 더 밝게 빛나게 합니다.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-blue/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue/20">
              계좌개설 바로가기
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all">
              서비스 둘러보기
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass p-8 rounded-[40px] shadow-2xl relative z-10 overflow-hidden">
            {/* AI Insight Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  INVESTMENT INSIGHT
                </div>
                <h3 className="text-2xl font-bold mb-2">오늘의 시장 핵심</h3>
                <p className="text-slate-500 text-sm">Gemini AI가 실시간으로 분석한 투자 전략</p>
              </div>
              <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-brand-blue" />
              </div>
            </div>

            {/* Insight Content */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 mb-6 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-brand-mint/20 text-brand-mint text-[10px] font-bold rounded-md">HOT TOPIC</span>
                  <span className="text-xs text-white/60">반도체 & AI 인프라</span>
                </div>
                <p className="text-lg font-bold leading-snug mb-4">
                  "AI 인프라 확장에 따른 <br />
                  <span className="text-brand-mint">하드웨어 섹터</span>의 강세가 예상됩니다."
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <TrendingUp className="w-4 h-4 text-brand-mint" />
                  반도체 장비주 주목 · 목표 수익률 +15%
                </div>
              </div>
              {/* Decorative background for AI card */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl group-hover:bg-brand-blue/30 transition-colors" />
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-3 gap-3">
              {['#반도체_반등', '#금리인하_수혜', '#AI_인프라'].map((tag) => (
                <div key={tag} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <span className="text-[11px] font-bold text-slate-500">{tag}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <button className="w-full mt-6 py-4 rounded-2xl bg-brand-blue/5 text-brand-blue font-bold text-sm hover:bg-brand-blue/10 transition-colors flex items-center justify-center gap-2">
              상세 리포트 읽기
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-mint/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
