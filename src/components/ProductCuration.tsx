import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Percent, Coins, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PRODUCTS = [
  {
    title: '지금 가장 핫한 채권',
    desc: '은행 예금보다 높은 수익률, 국공채로 안전하게 시작하세요.',
    icon: Shield,
    color: 'bg-brand-blue',
    tags: ['#절세', '#안정형', '#국공채'],
    badge: 'HOT'
  },
  {
    title: '세금 아끼는 ISA',
    desc: '비과세 혜택부터 손익통산까지, 스마트한 절세의 시작.',
    icon: Zap,
    color: 'bg-brand-mint',
    tags: ['#절세', '#필수템', '#비과세'],
    badge: 'BEST'
  },
  {
    title: '발행어음형 CMA',
    desc: '하루만 맡겨도 이자가 쌓이는 똑똑한 파킹통장.',
    icon: Percent,
    color: 'bg-indigo-500',
    tags: ['#파킹통장', '#수시입출금', '#고금리']
  }
];

export default function ProductCuration() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">당신을 위한 맞춤 상품</h2>
          <p className="text-slate-500">LS증권이 엄선한 오늘의 금융 상품입니다.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
          전체 상품 보기 <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product, idx) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass p-6 rounded-[32px] flex flex-col h-full group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", product.color)}>
                <product.icon className="w-6 h-6" />
              </div>
              {product.badge && (
                <span className="bg-rise text-white text-[10px] font-black px-2 py-1 rounded-lg">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{product.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">{product.desc}</p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
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
