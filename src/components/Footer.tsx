import React from 'react';
import { Facebook, Instagram, Youtube, Rss } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-2">
            <div className="mb-4">
              <Logo inverted />
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
            투명한 정보와 혁신적인 기술을 통해 
            고객의 자산 가치를 극대화하는 신뢰할 수 있는 파트너입니다.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Rss].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <h4 className="font-bold mb-4 text-slate-200">CS CENTER</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-sm">고객만족센터</span>
                  <span className="text-white font-bold text-2xl">1588-2428</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-xs">해외전용 국제전화</span>
                  <span className="text-white font-bold text-xs">+82-2-3276-9800</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-xs">주문전용</span>
                  <span className="text-white font-bold">1544-2428</span>
                </div>
                <div className="pt-1">
                   <a href="#" className="inline-block text-[10px] px-3 py-1.5 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors">챗봇/채팅상담</a>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-xs">해외주식</span>
                  <span className="text-white font-bold">02-3779-8888</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-xs">해외선물옵션</span>
                  <span className="text-white font-bold">02-3779-8330</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-slate-400 text-xs">LME온라인 전용</span>
                  <span className="text-white font-bold">02-3779-8380</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Financial Partner. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            <a href="#" className="hover:text-white">회사소개</a>
            <a href="#" className="hover:text-white">채용</a>
            <a href="#" className="hover:text-white">영업점</a>
            <a href="#" className="hover:text-white">투자권유대행인</a>
            <a href="#" className="hover:text-white">상품공시실</a>
            <a href="#" className="hover:text-white">서민금융1332</a>
            <a href="#" className="hover:text-white font-bold text-slate-300">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
