import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  AlertCircle, 
  TrendingUp, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  ChevronRight, 
  Compass, 
  Filter, 
  Building, 
  Layers, 
  MapPin, 
  FileText,
  BadgeAlert
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CalendarEvent {
  id: number;
  date: string; // MM.DD
  dayOfWeek: string;
  title: string;
  category: 'macro' | 'earnings' | 'holiday';
  categoryLabel: string;
  country: 'KR' | 'US' | 'EU';
  countryLabel: string;
  importance: 'high' | 'medium' | 'low';
  impactDescription: string;
  detailedInfo: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    date: '06.26',
    dayOfWeek: '금',
    title: '미국 5월 개인소비지출(PCE) 물가지수 발표',
    category: 'macro',
    categoryLabel: '경제 지표',
    country: 'US',
    countryLabel: '미국',
    importance: 'high',
    impactDescription: '금리 인하 기조의 핵심 척도 (예상치 부합 시 기술주 호재)',
    detailedInfo: '연준(Fed)이 가장 신뢰하는 물가 지표입니다. 근원 PCE 전년 대비 상승률 전망치는 2.6%로, 예상치보다 낮게 나올 경우 금리 조기 인하 기대감이 증폭되어 나스닥 지수의 강력한 촉매가 될 수 있습니다.'
  },
  {
    id: 2,
    date: '06.29',
    dayOfWeek: '월',
    title: '마이크론 테크놀로지 실적 발표',
    category: 'earnings',
    categoryLabel: '기업 실적',
    country: 'US',
    countryLabel: '미국',
    importance: 'high',
    impactDescription: '글로벌 반도체 업황 및 HBM 수요의 가늠자',
    detailedInfo: '메모리 반도체 3강 중 하나인 마이크론의 분기 실적 및 향후 가이드라인이 발표됩니다. 고대역폭 메모리(HBM) 관련 설비투자 계획과 가이드라인에 따라 삼성전자, SK하이닉스 등 국내 소부장 기업 주가 동향에 직접적인 영향을 미칩니다.'
  },
  {
    id: 3,
    date: '07.01',
    dayOfWeek: '수',
    title: '대한민국 6월 수출입동향 발표',
    category: 'macro',
    categoryLabel: '경제 지표',
    country: 'KR',
    countryLabel: '한국',
    importance: 'medium',
    impactDescription: '코스피 수출 대형주(반도체, 자동차) 실적 방향타',
    detailedInfo: '매월 1일 발표되는 한국의 수출 실적은 글로벌 경기 둔화 여부를 판단하는 가장 빠른 선행 지표입니다. 반도체 수출의 두 자릿수 회복세가 이어지는지 여부가 코스피 2,800선 안착의 열쇠입니다.'
  },
  {
    id: 4,
    date: '07.03',
    dayOfWeek: '금',
    title: '미국 독립기념일 전야 조기 폐장',
    category: 'holiday',
    categoryLabel: '휴장/일정',
    country: 'US',
    countryLabel: '미국',
    importance: 'low',
    impactDescription: '미국 주식 시장 현지 시간 오후 1시 조기 종료 (한국 시간 02:00)',
    detailedInfo: '미국 독립기념일 연휴 전날로, 뉴욕증시는 현지 시간 오후 1시에 조기 폐장합니다. 거래량이 평소보다 크게 감소하므로 변동성 매매 시 유의가 필요합니다.'
  },
  {
    id: 5,
    date: '07.04',
    dayOfWeek: '토',
    title: '미국 독립기념일 (Independence Day) 휴장',
    category: 'holiday',
    categoryLabel: '휴장/일정',
    country: 'US',
    countryLabel: '미국',
    importance: 'medium',
    impactDescription: '미국 금융 시장 전체 휴장',
    detailedInfo: '미국 법정 공휴일로 뉴욕 증권거래소(NYSE) 및 나스닥(NASDAQ)이 휴장합니다. 야간 선물 옵션 거래 및 야간 환전 서비스 이용에 제한이 있을 수 있습니다.'
  },
  {
    id: 6,
    date: '07.10',
    dayOfWeek: '금',
    title: '삼성전자 2분기 잠정 실적 발표 예정',
    category: 'earnings',
    categoryLabel: '기업 실적',
    country: 'KR',
    countryLabel: '한국',
    importance: 'high',
    impactDescription: '국내 IT 섹터 전체 분위기를 결정할 최대 빅이벤트',
    detailedInfo: '삼성전자의 2분기 매출 및 영업이익 잠정치가 발표됩니다. 메모리 단가 회복 속도와 파운드리 적자 축소 규모, 특히 엔비디아향 HBM 납품 승인 여부에 관한 힌트가 시장에 풀릴 예정입니다.'
  }
];

interface TradingHour {
  id: string;
  market: 'KR' | 'US';
  title: string;
  timeLocal: string;
  timeKST: string;
  desc: string;
  isActiveNow: boolean;
}

export default function InsightCenter() {
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'KR' | 'US'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'macro' | 'earnings' | 'holiday'>('ALL');
  const [activeTab, setActiveTab] = useState<'hours' | 'tips'>('hours');
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
  const [clickedEvent, setClickedEvent] = useState<CalendarEvent | null>(null);

  // Filtered Events
  const filteredEvents = CALENDAR_EVENTS.filter(event => {
    const countryMatch = selectedCountry === 'ALL' || event.country === selectedCountry;
    const categoryMatch = selectedCategory === 'ALL' || event.category === selectedCategory;
    return countryMatch && categoryMatch;
  });

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900" id="toohon-insight-center">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue text-xs font-bold mb-4">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>MARKET TIMETABLE & CALENDAR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              증시 <span className="text-brand-blue dark:text-blue-400">일정 및 안내 가이드</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mt-3 leading-relaxed">
              성공 투자의 첫걸음은 시장의 흐름을 미리 읽는 것입니다. 한눈에 파악하는 국내외 주요 증시 일정과 실시간 마켓 가이드라인을 확인해 보세요.
            </p>
          </div>
        </div>

        {/* Dynamic Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: 증시 캘린더 (col-span-7) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-blue rounded-full animate-pulse" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">주요 증시 캘린더</h3>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5">
                <div className="flex bg-slate-200/60 dark:bg-slate-950 p-1 rounded-xl">
                  {(['ALL', 'KR', 'US'] as const).map((country) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                        selectedCountry === country
                          ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                      )}
                    >
                      {country === 'ALL' ? '전체' : country === 'KR' ? '한국 🇰🇷' : '미국 🇺🇸'}
                    </button>
                  ))}
                </div>

                <div className="flex bg-slate-200/60 dark:bg-slate-950 p-1 rounded-xl">
                  {(['ALL', 'macro', 'earnings', 'holiday'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                        selectedCategory === cat
                          ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                      )}
                    >
                      {cat === 'ALL' ? '모든일정' : cat === 'macro' ? '경제' : cat === 'earnings' ? '실적' : '휴장'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Timeline Feed */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => {
                  const isHighImportance = event.importance === 'high';
                  const isMediumImportance = event.importance === 'medium';
                  return (
                    <motion.div
                      layout
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setClickedEvent(event)}
                      onMouseEnter={() => setHoveredEventId(event.id)}
                      onMouseLeave={() => setHoveredEventId(null)}
                      className={cn(
                        "group p-5 bg-white dark:bg-slate-900 border rounded-2xl flex items-start gap-4 cursor-pointer transition-all duration-300",
                        hoveredEventId === event.id 
                          ? "shadow-lg border-brand-blue/30 dark:border-brand-blue/40 translate-x-1" 
                          : "border-slate-100 dark:border-slate-800/60"
                      )}
                    >
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/80 px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center min-w-[62px]">
                        <span className="text-[13px] font-black text-brand-blue dark:text-blue-400 leading-none">{event.date}</span>
                        <span className="text-[10px] font-bold text-slate-400 mt-1">({event.dayOfWeek})</span>
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {event.countryLabel} {event.country === 'KR' ? '🇰🇷' : '🇺🇸'}
                          </span>
                          <span className={cn(
                            "text-[9px] font-black px-2 py-0.5 rounded",
                            event.category === 'macro' ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600" :
                            event.category === 'earnings' ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600" :
                            "bg-rose-50 dark:bg-rose-950/30 text-rose-600"
                          )}>
                            {event.categoryLabel}
                          </span>
                          <span className={cn(
                            "text-[9px] font-black px-2 py-0.5 rounded ml-auto",
                            isHighImportance ? "bg-red-50 dark:bg-red-950/40 text-red-500 border border-red-100 dark:border-red-900/30 animate-pulse" :
                            isMediumImportance ? "bg-orange-50 dark:bg-orange-950/30 text-orange-500" :
                            "bg-slate-50 dark:bg-slate-800 text-slate-400"
                          )}>
                            중요도 {isHighImportance ? '상' : isMediumImportance ? '중' : '하'}
                          </span>
                        </div>

                        <h4 className="text-[14px] font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-blue transition-colors truncate">
                          {event.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 leading-relaxed line-clamp-1">
                          {event.impactDescription}
                        </p>
                      </div>
                      
                      <div className="self-center">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-xs text-slate-400">선택 조건에 매칭되는 증시 일정이 없습니다.</p>
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 text-left">
              ※ 글로벌 사정 및 주총 연기 등에 의해 일부 날짜는 사전 예고 없이 변경될 수 있습니다.
            </p>
          </div>

          {/* Right Panel: 증시 안내 가이드 (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hour Guide or Rule Guide Selector tabs */}
            <div className="bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex">
              <button
                onClick={() => setActiveTab('hours')}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  activeTab === 'hours'
                    ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-md"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-700"
                )}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>글로벌 증시 시간표</span>
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                  activeTab === 'tips'
                    ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-md"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-700"
                )}
              >
                <Info className="w-3.5 h-3.5" />
                <span>주요 거래 규정 & 팁</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'hours' ? (
                <motion.div
                  key="hours"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* KR Market Hours Block */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base">🇰🇷</span>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-[14px]">한국 주식시장 거래시간 (KST)</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60">
                        <span className="text-xs font-bold text-slate-500">장전 시간외</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300">08:30 ~ 08:40</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60 bg-brand-blue/5 dark:bg-brand-blue/15 px-3 rounded-xl">
                        <span className="text-xs font-bold text-brand-blue dark:text-blue-400">정규 거래시간</span>
                        <span className="text-xs font-black text-brand-blue dark:text-blue-400">09:00 ~ 15:30</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60">
                        <span className="text-xs font-bold text-slate-500">장후 시간외</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300">15:40 ~ 16:00</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-bold text-slate-500">시간외 단일가</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300">16:00 ~ 18:00</span>
                      </div>
                    </div>
                  </div>

                  {/* US Market Hours Block */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇺🇸</span>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-[14px]">미국 주식시장 거래시간 (KST)</h4>
                      </div>
                      <span className="text-[10px] bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue border border-brand-blue/25 px-2 py-0.5 rounded-md font-bold">
                        서머타임 적용 기준
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60">
                        <span className="text-xs font-bold text-slate-500">프리 마켓 (장전)</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300">17:00 ~ 22:30</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60 bg-amber-500/5 dark:bg-amber-500/15 px-3 rounded-xl">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">정규 거래시간</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400">22:30 ~ 05:00</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-bold text-slate-500">애프터 마켓 (장후)</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300">05:00 ~ 09:00</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tips"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-left"
                >
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 space-y-4">
                    {/* Tip 1 */}
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <h5 className="text-xs font-black text-slate-950 dark:text-white">미국 서머타임 (Daylight Saving) 안내</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          매년 3월 둘째 일요일부터 11월 첫째 일요일까지 적용됩니다. 서머타임 기간에는 미국 정규 영업 시작 시간이 1시간씩 앞당겨집니다 (한국 시간 기준 23:30에서 22:30으로 단축).
                        </p>
                      </div>
                    </div>

                    {/* Tip 2 */}
                    <div className="flex items-start gap-3 border-t border-slate-50 dark:border-slate-800 pt-4">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <h5 className="text-xs font-black text-slate-950 dark:text-white">서킷 브레이커 & VI 발동 기준</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          과도한 지수 급변동 시 전체 장을 일시 정지시키는 서킷 브레이커는 국내 코스피/코스닥 지수가 8%, 15%, 20% 하락 시 작동합니다. 개별 종목의 갑작스러운 쏠림을 완화하는 VI(변동성완화장치)는 2~10% 급변 시 2분간 단일가 매매로 전환됩니다.
                        </p>
                      </div>
                    </div>

                    {/* Tip 3 */}
                    <div className="flex items-start gap-3 border-t border-slate-50 dark:border-slate-800 pt-4">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <h5 className="text-xs font-black text-slate-950 dark:text-white">배당 매수 기한 팁</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          배당을 받기 위해서는 해당 종목의 "배당락일" 직전 거래일까지 주식을 실소유하고 있어야 합니다. 한국 주식은 결제일 제도상 영업일 기준 2일 전(T-2)까지 매수를 완료해야 안정적인 권리 획득이 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Micro Quick Calculator CTA */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-[28px] border border-white/5 relative overflow-hidden text-left shadow-lg">
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-wider uppercase bg-brand-mint/25 text-brand-mint border border-brand-mint/30 px-2.5 py-1 rounded-lg mb-2.5 inline-block">
                  PREMIUM BENEFIT
                </span>
                <h4 className="text-sm font-black text-white leading-snug">
                  주총 투표 동향 & 공시 알림 서비스
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-1.5 max-w-sm">
                  관심 종목을 등록하시면 주요 주주총회 소집 공고, 실적 컨센서스, 유무상증자 및 배당 권리 낙입 일정을 SMS 및 알림톡으로 실시간 무상 자동 발송해 드립니다.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 pointer-events-none">
                <CalendarIcon className="w-40 h-40" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Detail Modal Popup for Calendar Events */}
      <AnimatePresence>
        {clickedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClickedEvent(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-md shadow-2xl p-6 border border-slate-100 dark:border-slate-800 z-10 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col items-center justify-center bg-brand-blue/5 dark:bg-brand-blue/15 px-3 py-2 rounded-xl text-center min-w-[55px]">
                  <span className="text-xs font-black text-brand-blue dark:text-blue-400 leading-none">{clickedEvent.date}</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1">({clickedEvent.dayOfWeek})</span>
                </div>
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 mr-1.5">
                    {clickedEvent.countryLabel} {clickedEvent.country === 'KR' ? '🇰🇷' : '🇺🇸'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">일정 안내</span>
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white leading-tight mt-1">
                    {clickedEvent.title}
                  </h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 mb-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">투자 시장 예상 영향</span>
                  <p className="text-xs font-bold text-brand-blue dark:text-blue-400 leading-relaxed mt-0.5">
                    {clickedEvent.impactDescription}
                  </p>
                </div>
                
                <div className="border-t border-slate-200/50 dark:border-slate-800/60 pt-3">
                  <span className="text-[10px] font-bold text-slate-400">상세 리서치 내용</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {clickedEvent.detailedInfo}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setClickedEvent(null)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all"
                >
                  확인 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
