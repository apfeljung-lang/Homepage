import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo inverted />
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
            LS증권은 투명한 정보와 혁신적인 기술을 통해 
            고객의 자산 가치를 극대화하는 신뢰할 수 있는 파트너입니다.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">서비스</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">온라인지점</a></li>
              <li><a href="#" className="hover:text-white transition-colors">금융상품</a></li>
              <li><a href="#" className="hover:text-white transition-colors">해외시장</a></li>
              <li><a href="#" className="hover:text-white transition-colors">투자정보</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">고객지원</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
              <li><a href="#" className="hover:text-white transition-colors">1:1 상담</a></li>
              <li><a href="#" className="hover:text-white transition-colors">보안센터</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 LS Securities Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white">신용정보관리보호</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
