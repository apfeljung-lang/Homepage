import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Zap, Smartphone, Monitor, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { cn } from '@/src/lib/utils';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
  value: 4000 + Math.random() * 500 + Math.sin(i / 2) * 200
}));

const CAROUSEL_SLIDES = [
  {
    id: 'wts',
    badge: 'WTS',
    icon: Globe,
    title: '투혼 WTS (Web Trading System)',
    desc: 'PC, 태블릿, 스마트폰 브라우저에서 별도 프로그램이나 앱 설치 없이 접속하여 언제 어디서나 안전하고 편리하게 거래할 수 있는 차세대 트레이딩 시스템입니다.',
    img: '/src/assets/images/wts_intro_1782276920204.jpg',
    colorClass: 'text-brand-blue bg-brand-blue/10'
  },
  {
    id: 'hts',
    badge: 'HTS',
    icon: Monitor,
    title: '투혼 HTS (Home Trading System)',
    desc: '풍부하고 강력한 차트 분석 툴과 실시간 호가, 쾌속 주문 기능까지 탑재하여 초보부터 프로 투자자까지 모두 만족시키는 데스크톱 전용 통합 매매 프로그램입니다.',
    img: '/src/assets/images/hts_intro_1782276932203.jpg',
    colorClass: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400'
  },
  {
    id: 'mts',
    badge: 'MTS',
    icon: Smartphone,
    title: '투혼 MTS (Mobile Trading System)',
    desc: '다양한 거래 특화 모드와 실시간 수급 현황, 스마트 종목 검색 및 맞춤 자산 관리를 제공하여 최상의 투자를 완성하는 차세대 모바일 앱입니다.',
    img: '/src/assets/images/mts_intro_1782276947427.jpg',
    colorClass: 'text-brand-mint bg-brand-mint/10'
  }
];

function TradingSystemCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const activeSlide = CAROUSEL_SLIDES[current];
  const IconComponent = activeSlide.icon;

  return (
    <div 
      className="glass p-6 md:p-8 rounded-[40px] shadow-2xl relative z-10 overflow-hidden border border-white/40 dark:border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Indicator & Badge Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(idx)}
              className={cn(
                "px-3 py-1 text-xs font-black rounded-full transition-all duration-300",
                idx === current 
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-105" 
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              )}
            >
              {slide.badge}
            </button>
          ))}
        </div>
        
        {/* Next/Prev Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button 
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Image Display Area with AnimatePresence */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-900 group shadow-md border border-black/5 dark:border-white/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.id}
            src={activeSlide.img}
            alt={activeSlide.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
      </div>

      {/* Slide Text Content */}
      <div className="min-h-[140px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={cn("p-1.5 rounded-lg flex items-center justify-center", activeSlide.colorClass)}>
                <IconComponent className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {activeSlide.title}
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              {activeSlide.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Dot Indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === current ? "w-6 bg-brand-blue" : "w-1.5 bg-slate-200 dark:bg-slate-700"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface HeroProps {
  onNavigate?: (page: 'report') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <TradingSystemCarousel />
        </motion.div>
      </div>
    </section>
  );
}
