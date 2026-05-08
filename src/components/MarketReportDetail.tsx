import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  BarChart2,
  Cpu,
  Globe,
  MessageCircle,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MarketReportDetailProps {
  onBack: () => void;
}

export default function MarketReportDetail({ onBack }: MarketReportDetailProps) {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      {/* Header Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-blue font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          돌아가기
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Report Title & Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-lg uppercase tracking-wider">Market Analysis</span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>2026.05.07 업데이트</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-display">
          AI 인프라 확장에 따른 <br />
          하드웨어 섹터의 구조적 성장 전략
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
            ))}
          </div>
          <div className="text-sm">
            <div className="font-bold text-slate-900">LS증권 리서치 본부</div>
            <div className="text-slate-500 text-xs">Gemini AI x 전문 애널리스트 협업 리포트</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900 text-white p-8 md:p-10 rounded-[32px] mb-12 relative overflow-hidden shadow-2xl"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-mint" />
          핵심 포인트 (Key Takeaways)
        </h2>
        <div className="grid md:grid-cols-3 gap-8 relative z-10 text-sm md:text-base leading-relaxed">
          <div className="space-y-4 border-l-2 border-brand-mint/30 pl-6">
            <div className="font-bold text-brand-mint">01. 수요의 폭발</div>
            <p className="text-white/70">글로벌 테크 기업들의 AI 데이터센터 투자 예산이 전년 대비 45% 증가할 것으로 전망됩니다.</p>
          </div>
          <div className="space-y-4 border-l-2 border-brand-mint/30 pl-6">
            <div className="font-bold text-brand-mint">02. 공급망 재편</div>
            <p className="text-white/70">HBM(고대역폭 메모리) 시장의 독점적 지위를 가진 국내 반도체 기업들의 이익 개선세가 뚜렷합니다.</p>
          </div>
          <div className="space-y-4 border-l-2 border-brand-mint/30 pl-6">
            <div className="font-bold text-brand-mint">03. 리스크 요인</div>
            <p className="text-white/70">지정학적 리스크에 따른 원자재 수급 불안정이 단기적인 변동성을 확대할 수 있습니다.</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </motion.div>

      {/* Main Content Sections */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* Left: Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 space-y-12"
        >
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-brand-blue" />
              1. 반도체 섹터의 슈퍼 사이클 재진입
            </h3>
            <p className="text-slate-600 leading-loose mb-6">
              최근 생성형 AI의 확산은 단순히 소프트웨어 산업에만 국한되지 않고, 이를 뒷받침하는 컴퓨팅 인프라, 즉 하드웨어 산업에 전례 없는 기회를 제공하고 있습니다. 특히 고성능 연산이 필요한 AI 학습 및 추론 과정에서 그래픽 처리 장치(GPU)와 이를 보조하는 초고속 메모리 반도체의 중요성이 그 어느 때보다 부각되고 있습니다.
            </p>
            <p className="text-slate-600 leading-loose">
              과거의 모바일/클라우드 사이클과는 다르게, 이번 AI 사이클은 데이터 센터의 단위 면적당 전력 밀도와 데이터 처리 속도가 핵심 경쟁력이 되고 있습니다. 이는 기존 범용 반도체에서 특수 목적용 커스텀 칩(ASIC)으로의 하이엔드 시장 이동을 의미합니다.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-[24px]">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              글로벌 시장 동향
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-bold mb-1">미국 빅테크 기업들의 CAPEX 증대</div>
                  <p className="text-sm text-slate-500">MS, 구글, 아마존 등 주요 클라우드 사업자들의 AI 관련 설비 투자 규모가 역대 최고치를 경신 중입니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-bold mb-1">대만 파운드리 가동률 회복</div>
                  <p className="text-sm text-slate-500">TSMC의 3nm/5nm 공정 가동률이 100%에 육박하며 하반기 실적 가시성이 매우 높은 상태입니다.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              2. 추천 투자 전략 (Investment Strategy)
            </h3>
            <div className="space-y-4">
              <div className="p-6 border border-slate-100 rounded-2xl hover:border-brand-blue/20 transition-all cursor-pointer group/card bg-white shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-brand-blue">Top Pick A</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/card:text-brand-blue transition-all" />
                </div>
                <h4 className="text-lg font-bold mb-2">HBM 밸류체인 수혜주</h4>
                <p className="text-sm text-slate-500 leading-relaxed">증착 장비 및 TC 본더 시장에서 독점적 지위를 가진 종목들을 중심으로 포트폴리오의 30%를 구성할 것을 권고합니다.</p>
              </div>
              <div className="p-6 border border-slate-100 rounded-2xl hover:border-brand-blue/20 transition-all cursor-pointer group/card bg-white shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-brand-blue">Top Pick B</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/card:text-brand-blue transition-all" />
                </div>
                <h4 className="text-lg font-bold mb-2">전력 인프라 및 냉각 시스템</h4>
                <p className="text-sm text-slate-500 leading-relaxed">데이터센터 대형화에 따라 액침 냉각 등 새로운 방열 기술력을 보유한 중소형 강소기업들에 주목할 필요가 있습니다.</p>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Right: Sidebar / Related Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Related Visual Data */}
          <div className="border border-slate-100 rounded-[28px] overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-6 border-b border-slate-100 font-bold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-400" />
              기저 지표 분석
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                  <span>섹터 지수 상승률</span>
                  <span className="text-brand-blue">+24.5%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                  <span>외국인 순매수 강도</span>
                  <span className="text-emerald-500">매우 강함</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[90%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Expert Comment */}
          <div className="p-6 rounded-[28px] bg-indigo-50/50 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-bold text-indigo-900">전문가 조언</span>
            </div>
            <p className="text-sm text-indigo-800 leading-relaxed italic">
              "단기 급등에 따른 피로감이 존재하지만, 조정 시마다 비중을 확대하는 전략이 유효합니다. 하반기 실적 발표 결과가 다음 랠리의 촉매제가 될 것입니다."
            </p>
          </div>

          {/* Additional Resources */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 ml-1">관련 리소스</h4>
            <div className="space-y-3">
              <button className="w-full p-4 flex items-center gap-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors text-left group">
                <FileText className="w-5 h-5 text-slate-400" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">2026 하반기 증시 전망.pdf</div>
                  <div className="text-xs text-slate-400">12.5 MB · PDF</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full p-4 flex items-center gap-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors text-left group">
                <FileText className="w-5 h-5 text-slate-400" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">국내 반도체 8선 기업분석.pdf</div>
                  <div className="text-xs text-slate-400">8.2 MB · PDF</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
