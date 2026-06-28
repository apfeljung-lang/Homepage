import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Tv, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  Clock, 
  ThumbsUp, 
  Share2, 
  ChevronRight, 
  Play, 
  FileText,
  BadgeAlert,
  ArrowLeft,
  Calendar,
  Zap,
  TrendingUp,
  Tag,
  X,
  BookMarked,
  Layers,
  Sparkle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Article {
  id: number;
  category: 'trading' | 'macro' | 'wealth';
  categoryLabel: string;
  title: string;
  desc: string;
  longContent: string[];
  readTime: string;
  likes: number;
  isPremium: boolean;
  author: string;
  authorTitle: string;
  authorImg: string;
  date: string;
  tags: string[];
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'trading',
    categoryLabel: '실전 트레이딩',
    title: '하락장에서도 버티는 투자 멘탈 관리법과 분할 매수 법칙',
    desc: '시장 변동성에서 살아남는 심리학적 감정 통제 전략과 수학적 분할 분산 투자 비율 계산법을 알려드립니다.',
    longContent: [
      '모든 위대한 투자자들은 시장의 하락을 위기가 아닌 기회로 보았습니다. 하지만 개인 투자자가 빨갛게 물든 모니터를 보며 평정심을 유지하는 것은 결코 쉽지 않습니다. 감정에 휩쓸리지 않기 위해 우리는 명확한 "시스템적 설계"를 도입해야 합니다.',
      '첫째, 감정 통제의 열쇠는 "현금 비중"입니다. 자산의 100%가 주식에 묶여 있다면 하락장은 재앙이지만, 20%의 현금 예비비가 있다면 하락장은 저렴하게 쇼핑할 수 있는 세일 시즌이 됩니다.',
      '둘째, 분할 매수의 수학적 마법인 "피라미딩 기법"을 활용해 보세요. 가격이 하락할 때마다 기계적으로 매수 수량을 늘려 평균 매입 단가를 기하급수적으로 낮추는 전술입니다. 감정을 배제하고 사전 설정된 등락 폭(예: -5% 하락 시마다 1.5배 매수)에 따라 실행하는 것이 핵심입니다.'
    ],
    readTime: '8분 분량',
    likes: 1240,
    isPremium: false,
    author: '김승우',
    authorTitle: '투혼 프라이빗 클럽 수석 애널리스트',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.25',
    tags: ['#멘탈케어', '#분할매수', '#위기대응', '#AI_인프라']
  },
  {
    id: 2,
    category: 'macro',
    categoryLabel: '거시 경제/분석',
    title: '미국 연준(Fed) 금리 정책 인하 사이클 도래, 우리 자산의 미래는?',
    desc: '글로벌 통화 정책 변동 시기에 미국 국채, 고배당 기술주, 달러 자산이 각각 보이는 움직임 메커니즘 정밀 해부.',
    longContent: [
      '글로벌 거시 경제의 가장 거대한 나침반인 미국 연방준비제도(Fed)가 드디어 긴축 정책의 터널을 지나 본격적인 금리 인하 사이클에 진입하고 있습니다. 금리가 하락하는 시기에는 자산군 마다 완전히 다른 화학 반응이 일어납니다.',
      '금리 인하의 직접적인 수혜는 채권 자산입니다. 기존에 발행된 고금리 채권의 가치가 상승하기 때문에, 지금 시점에서 미국 장기 국채 및 우량 회사채 포트폴리오 비중을 선제적으로 늘리는 전략은 고수들의 공통 공식입니다.',
      '또한 배당 매력이 높은 고배당 성장 기술주와 리츠(REITs) 자산의 매력도가 급상승합니다. 금리 인하로 자금 조달 비용이 낮아진 혁신 기업들의 레버리지 효과를 극대화할 수 있는 타이밍이 바로 지금입니다.'
    ],
    readTime: '15분 분량',
    likes: 2150,
    isPremium: false,
    author: '에드워드 한',
    authorTitle: '글로벌 매크로 리서치 센터장',
    authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.24',
    tags: ['#연준금리', '#글로벌매크로', '#채권투자', '#금리인하_수혜']
  },
  {
    id: 3,
    category: 'wealth',
    categoryLabel: '자산 관리/은퇴',
    title: '사회초년생을 위한 1억 만들기 복리 포트폴리오 설계안',
    desc: '매달 스타벅스 커피 한 잔 값을 아껴 지속 가능한 미래를 구축하는 현실적인 적립식 자산 배분의 기본 설계 프로세스.',
    longContent: [
      '"복리는 인류의 여덟 번째 불가사의다." 알베르트 아인슈타인의 말처럼 복리는 시간이 누적될수록 엄청난 가속도를 가집니다. 특히 인생의 자산 형성 극초기에 있는 사회초년생에게는 시간이 최고의 무기입니다.',
      '가장 먼저 해야 할 일은 단기 예적금 위주의 저축에서 벗어나 글로벌 우량 인덱스 ETF와 현금을 8:2 비율로 매칭하는 일명 "투혼 사회초년생 표준 포트폴리오"를 구성하는 것입니다.',
      '시장이 조정을 받을 때도 기계적인 자동 적립식 매수를 유지하면 "코스트 에버리징(Cost Averaging)" 효과에 의해 장기적으로 주식 매입 단가가 우량한 수준에서 평탄화되며, 5년 후 놀라운 복리 열매로 돌아오게 될 것입니다.'
    ],
    readTime: '9분 분량',
    likes: 3420,
    isPremium: false,
    author: '이지현',
    authorTitle: '웰스매니지먼트 컨설팅 리드',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.23',
    tags: ['#목돈만들기', '#적립식투자', '#복리의마법']
  },
  {
    id: 4,
    category: 'trading',
    categoryLabel: '실전 트레이딩',
    title: '거래량 지표(OBV)와 거래 대금을 연계한 수급 포착 기술',
    desc: '차트 속에서 대세 상승 직전 세력의 흔적을 정밀 포착하는 OBV(On Balance Volume) 수치 해석과 실제 매매 대입 시나리오.',
    longContent: [
      '주가는 왜곡할 수 있어도 거래량은 결코 속일 수 없습니다. OBV는 주가가 상승한 날의 거래량은 더하고 하락한 날의 거래량은 빼서 누적한 지표로, 스마트 머니의 누적 매집 강도를 가장 투명하게 보여줍니다.',
      '주의 깊게 보아야 할 패턴은 "주가 횡보 중 OBV의 점진적 우상향"입니다. 이는 대중이 눈치채지 못한 사이에 스마트 머니가 물량을 야금야금 확보하고 있다는 완벽한 선행 신호입니다.',
      '이 신호가 잡힌 후, 당일 평균 거래대금의 300%를 초과하는 돌파 거래량이 발생할 때가 가장 확률 높은 매수 맥점입니다. 손절 기준선을 전일 저가로 명확히 잡고 진입해 보세요.'
    ],
    readTime: '12분 분량',
    likes: 948,
    isPremium: true,
    author: '강태환',
    authorTitle: '프론트 트레이딩 데스크 마스터',
    authorImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.22',
    tags: ['#차트분석', '#OBV지표', '#수급트레이딩']
  },
  {
    id: 5,
    category: 'macro',
    categoryLabel: '거시 경제/분석',
    title: '글로벌 반도체 밸류체인 동맹 개편과 차세대 패권의 행방',
    desc: '강대국 간 지정학적 변화와 오프쇼어링 흐름 속에서 다가오는 10년 기술 혁신을 주도할 글로벌 기술 주도주 압축 전망.',
    longContent: [
      '반도체는 이제 단순한 전자 부품이 아닌 21세기 글로벌 전략 무기입니다. 아시아, 미국, 유럽을 잇는 복잡한 공급망이 안보와 자국 우선주의 정책으로 인해 급격히 재편되고 있습니다.',
      '이 거대한 지각 변동 속에서 우리가 놓치지 말아야 할 파괴적 기회는 바로 "소부장(소재·부품·장비)"과 "HBM 패키징 테크놀로지" 선도 세력들입니다.',
      '미세 공정 한계에 다다른 반도체 업계에서 적층 패키징과 맞춤형 칩 다자인 경쟁력이 새로운 프리미엄을 만들고 있으며, 이 고유한 기술 독점력을 보유한 핵심 특허 수혜 기업들을 엄선하여 집중 분석합니다.'
    ],
    readTime: '10분 분량',
    likes: 1870,
    isPremium: true,
    author: '에드워드 한',
    authorTitle: '글로벌 매크로 리서치 센터장',
    authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.20',
    tags: ['#반도체동맹', '#공급망재편', '#미래성장주', '#반도체_반등', '#HBM_신소재']
  },
  {
    id: 6,
    category: 'wealth',
    categoryLabel: '자산 관리/은퇴',
    title: '비과세 만능 통장 ISA, 똑똑하게 200% 활용하는 완벽 절세 전술',
    desc: '손익 통산과 비과세 한도 혜택을 극대화하여 배당소득세와 금융소득종합과세를 원천 방어하는 전략 가이드라인.',
    longContent: [
      '절세는 가장 확실하고 유일한 100% 무위험 수익률 확보 수단입니다. 그 중심에 대한민국 투자자라면 반드시 개설해야 할 비과세 만능 주머니, ISA(개인종합자산관리계좌)가 있습니다.',
      'ISA의 가장 큰 마법은 "손익 통산"입니다. 일반 계좌라면 수익에 15.4%의 세금을 내고 손실은 보전받지 못하지만, ISA 내에서는 여러 종목의 이익과 손실을 통산하여 순이익에 대해서만 과세합니다.',
      '특히 고배당 ETF나 리츠 등을 자산 분배하여 운용할 때 세금 이연 및 저율 분리과세 혜택이 극대화되므로, 매년 납입 한도를 채우며 최소 3년의 유지 기간을 기획하는 것이 스마트 머니의 기본 소양입니다.'
    ],
    readTime: '11분 분량',
    likes: 1990,
    isPremium: true,
    author: '이지현',
    authorTitle: '웰스매니지먼트 컨설팅 리드',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: '2026.06.19',
    tags: ['#ISA계좌', '#절세혜택', '#배당소득', '#금리인하_수혜']
  }
];

// Keywords from InvestmentInsight
const POPULAR_KEYWORDS = [
  '#반도체_반등', 
  '#금리인하_수혜', 
  '#AI_인프라', 
  '#HBM_신소재', 
  '#온디바이스'
];

interface MarketInsightHubProps {
  onNavigate?: (page: 'report' | 'home' | 'mypage' | 'investment' | 'trading' | 'products' | 'customer' | 'guide') => void;
}

export default function MarketInsightHub({ onNavigate }: MarketInsightHubProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trading' | 'macro' | 'wealth'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);

  // Filter logic based on Category and Selected Keyword/Tag
  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesTag = !selectedTag || art.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  const toggleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]
    );
  };

  const handleKeywordClick = (keyword: string) => {
    if (selectedTag === keyword) {
      setSelectedTag(null); // Toggle off
    } else {
      setSelectedTag(keyword);
    }
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6" id="toohon-market-insight-hub">
      {/* Integrated Header section with dual badges and custom layout */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>투혼 실시간 리서치</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>2026.06.25 기준 실시간 분석</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white font-display">
              투혼 <span className="text-brand-blue dark:text-blue-400">인사이트 허브</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] md:text-base mt-3 max-w-3xl leading-relaxed">
              실시간 핵심 마켓 테마와 업계 최고 전문가들의 정밀 리포트를 단 하나의 공간에서 가장 직관적이고 완벽하게 탐색해 보세요.
            </p>
          </div>
        </div>
      </div>

      {/* Main Unified Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column (col-span-4): 오늘의 시장 핵심 (Investment Insight Dashboard) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="glass bg-white dark:bg-slate-900/60 rounded-[32px] p-6 border border-slate-100 dark:border-slate-800/80 shadow-xl relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-mint/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header inside bento */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                    <Zap className="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">오늘의 시장 핵심</h2>
                </div>
                <span className="text-[10px] bg-brand-mint/10 dark:bg-brand-mint/20 text-brand-mint border border-brand-mint/20 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-ping" />
                  LIVE
                </span>
              </div>

              {/* HOT TOPIC Display */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-white/5 relative overflow-hidden group mb-5">
                <div className="relative z-10 flex flex-col justify-between min-h-[140px]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-brand-mint/20 text-brand-mint text-[9px] font-bold rounded uppercase tracking-wider">
                        HOT TOPIC
                      </span>
                      <span className="text-[11px] text-white/60 font-medium">반도체 & AI 인프라</span>
                    </div>
                    <h3 className="text-base font-extrabold leading-snug text-white">
                      "AI 인프라 확장에 따른 <br />
                      <span className="text-brand-mint font-black">하드웨어 섹터</span>의 강세가 예상됩니다."
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-4 border-t border-white/10 pt-3">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-mint" />
                    <span className="font-semibold">장비주 주목 · 목표 수익률 +15%</span>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-brand-blue/20 rounded-full blur-2xl group-hover:bg-brand-blue/30 transition-all duration-500" />
              </div>

              {/* Realtime Keywords Filter Tool */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    실시간 급상승 키워드
                  </span>
                  {selectedTag && (
                    <button 
                      onClick={() => setSelectedTag(null)}
                      className="text-[10px] text-brand-blue hover:underline font-bold flex items-center gap-0.5"
                    >
                      초기화 <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mb-4">
                  키워드를 선택하시면 관련 분석 전문가 칼럼 콘텐츠가 오른쪽에 실시간으로 즉시 매칭 및 정렬됩니다.
                </p>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_KEYWORDS.map((tag) => {
                    const isActive = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => handleKeywordClick(tag)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer",
                          isActive
                            ? "bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/15 scale-105"
                            : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Read AI Report CTA Button */}
              <button
                onClick={() => onNavigate?.('report')}
                className="w-full mt-6 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/10 active:scale-[0.98]"
              >
                <span>상세 AI 분석 리포트 전문 읽기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Service Quick Summary Card */}
          <div className="hidden lg:block bg-gradient-to-br from-indigo-900/5 to-brand-blue/5 border border-slate-100 dark:border-slate-800/40 rounded-3xl p-5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkle className="w-3.5 h-3.5 text-brand-blue" />
              스마트 매칭 인프라
            </h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
              시장 시그널과 지식 콘텐츠를 직관적으로 일체화하였습니다. 좌측의 급상승 키워드를 눌러 분석 전문가들의 전략을 즉각 확인하십시오.
            </p>
          </div>
        </div>

        {/* Right column (col-span-8): 투자를 넓히는 인사이트 콘텐츠 (Curation & Feed Grid) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls: Category Filter + Active Filter Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: '전체 콘텐츠' },
                { id: 'trading', label: '실전 트레이딩' },
                { id: 'macro', label: '거시 경제/분석' },
                { id: 'wealth', label: '자산 관리' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setSelectedTag(null); // Clear keyword tag on category switch to avoid confusing dead-ends
                  }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-md shadow-black/5"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Selected states indicator */}
            <div className="flex items-center gap-2 px-2">
              {selectedTag && (
                <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-lg text-[11px] font-bold border border-brand-blue/10">
                  <span>{selectedTag} 필터 적용</span>
                  <button onClick={() => setSelectedTag(null)}>
                    <X className="w-3 h-3 hover:text-red-500" />
                  </button>
                </span>
              )}
              <span className="text-xs text-slate-400 font-bold">
                검색결과: <span className="text-brand-blue">{filteredArticles.length}</span>건
              </span>
            </div>
          </div>

          {/* Feed Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-[32px] py-16 px-6 text-center flex flex-col items-center">
              <BadgeAlert className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base">매칭되는 콘텐츠가 없습니다</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
                선택한 키워드 <strong className="text-brand-blue">"{selectedTag}"</strong>에 부합하는 컬럼이 현재 카테고리 내에 준비되지 않았습니다. 다른 카테고리를 선택해 보거나 필터를 해제해 보세요.
              </p>
              <button 
                onClick={() => {
                  setSelectedTag(null);
                  setActiveCategory('all');
                }}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs py-2 px-5 rounded-xl transition-all"
              >
                전체 조건 초기화하기
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid sm:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredArticles.map((article, idx) => {
                  const isBookmarked = bookmarkedIds.includes(article.id);
                  const isLiked = likedIds.includes(article.id);
                  return (
                    <motion.div
                      layout
                      key={article.id}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      onClick={() => setSelectedArticle(article)}
                      className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 flex flex-col justify-between h-[360px] cursor-pointer hover:shadow-2xl hover:border-brand-blue/25 dark:hover:border-brand-blue/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Dynamic light gradient ring */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-2xl group-hover:from-brand-blue/10 transition-all duration-500 pointer-events-none" />

                      <div>
                        {/* Top layout: Category tags & bookmark action */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black tracking-wider text-brand-blue dark:text-blue-400 bg-brand-blue/5 dark:bg-brand-blue/15 px-3 py-1 rounded-lg">
                              {article.categoryLabel}
                            </span>
                            {article.isPremium && (
                              <span className="text-[9px] font-black text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900/40">
                                PREMIUM
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={(e) => toggleBookmark(e, article.id)}
                            className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-300 hover:text-rose-500 dark:text-slate-600 transition-colors"
                          >
                            <Bookmark className={cn("w-4 h-4 transition-all", isBookmarked && "fill-rose-500 text-rose-500 scale-110")} />
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-base font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                          {article.desc}
                        </p>
                      </div>

                      {/* Footer Info block */}
                      <div>
                        {/* Article-specific internal tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {article.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors",
                                selectedTag === tag 
                                  ? "bg-brand-blue/10 text-brand-blue" 
                                  : "text-slate-400 bg-slate-50 dark:bg-slate-950"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Metadata divider line */}
                        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800/60 pt-4">
                          <div className="flex items-center gap-2">
                            <img 
                              src={article.authorImg} 
                              alt={article.author} 
                              className="w-6 h-6 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-left">
                              <span className="block text-[11px] font-bold text-slate-800 dark:text-white leading-none">{article.author}</span>
                              <span className="block text-[9px] text-slate-400 leading-none mt-0.5">{article.authorTitle.split(' ')[0]}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => toggleLike(e, article.id)}
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-brand-blue transition-colors"
                            >
                              <ThumbsUp className={cn("w-3.5 h-3.5", isLiked && "text-brand-blue fill-brand-blue/20")} />
                              <span>{article.likes + (isLiked ? 1 : 0)}</span>
                            </button>
                            
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{article.readTime.replace(' 분량', '')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Interactive Reader sliding modal window overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Main view container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 z-10 my-8"
            >
              {/* Colorful gradient header layout block */}
              <div className="h-44 bg-gradient-to-r from-brand-blue to-indigo-600 relative flex items-end p-6">
                <div className="absolute inset-0 bg-black/20" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 left-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="relative z-10">
                  <span className="text-[10px] font-black bg-white/20 text-white border border-white/20 px-3 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block backdrop-blur-sm">
                    {selectedArticle.categoryLabel}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white leading-tight font-display">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Writer credentials & action block */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedArticle.authorImg} 
                    alt={selectedArticle.author} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-brand-blue/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-slate-800 dark:text-white">{selectedArticle.author}</span>
                      <span className="text-[11px] text-slate-400">{selectedArticle.authorTitle}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {selectedArticle.date} 작성됨
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(e, selectedArticle.id)}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Bookmark className={cn("w-4 h-4", bookmarkedIds.includes(selectedArticle.id) && "fill-rose-500 text-rose-500")} />
                  </button>
                  <button
                    onClick={(e) => toggleLike(e, selectedArticle.id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-blue transition-colors"
                  >
                    <ThumbsUp className={cn("w-3.5 h-3.5", likedIds.includes(selectedArticle.id) && "text-brand-blue fill-brand-blue/10")} />
                    <span>추천 {selectedArticle.likes + (likedIds.includes(selectedArticle.id) ? 1 : 0)}</span>
                  </button>
                </div>
              </div>

              {/* Editorial longform paragraphs content */}
              <div className="p-8 max-h-[360px] overflow-y-auto space-y-5 text-slate-600 dark:text-slate-300 text-[14px] leading-relaxed font-sans">
                {selectedArticle.longContent.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {selectedArticle.isPremium && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-start gap-3 mt-6">
                    <BadgeAlert className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs mb-1">투혼 프리미엄 회원 전용 분석</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        상세 타겟 종목 분석 리포트 및 실제 애널리스트 실시간 투자 알림은 <strong>투혼 프리미엄 계정</strong> 가입 또는 로그인 완료 후 즉시 전문 열람하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reader disclaimer and footer block */}
              <div className="bg-slate-50 dark:bg-slate-950/40 px-8 py-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">※ 본 콘텐츠는 전문가 개인의 인사이트이며, 투자의 절대적 손익을 보장하지 않습니다.</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs py-2 px-5 rounded-xl transition-all shadow-md shadow-brand-blue/10"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
