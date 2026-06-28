import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Smartphone, CheckCircle2, Lock, Sparkles, ShieldCheck } from 'lucide-react';

interface QrLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function QrLoginModal({ isOpen, onClose, onLoginSuccess }: QrLoginModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes countdown
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'certificate' | 'id'>('qr');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || activeTab !== 'qr') return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, activeTab]);

  const handleRefresh = () => {
    setSecondsLeft(180);
  };

  const handleSimulateLogin = () => {
    setIsSimulating(true);
    // Simulate successful QR code scan after 1.2s
    setTimeout(() => {
      setIsSimulating(false);
      onLoginSuccess();
      onClose();
    }, 1200);
  };

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !password) return;
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onLoginSuccess();
      onClose();
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                투혼 안전 로그인
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Authentication Method Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-950/40">
            {[
              { id: 'qr', label: 'QR코드 로그인' },
              { id: 'certificate', label: '인증서' },
              { id: 'id', label: 'ID/비밀번호' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'qr' && (
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue px-3.5 py-1.5 rounded-full text-[12px] font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>투혼 스마트폰 앱 연동</span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-[280px]">
                  <strong>투혼 MTS 앱</strong>을 실행한 후 <br />
                  <span className="text-brand-blue font-bold">[전체메뉴 &gt; QR 로그인]</span>에서 아래의 QR 코드를 스캔해 주세요.
                </p>

                {/* QR Code Graphic Frame */}
                <div className="relative p-4 bg-white rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-inner mb-4 group overflow-hidden">
                  {isSimulating ? (
                    <div className="w-48 h-48 flex flex-col items-center justify-center bg-white/90 absolute inset-0 z-10 rounded-3xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 1.2 }}
                        className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full mb-3"
                      />
                      <span className="text-xs font-bold text-slate-600">스캔 승인 중...</span>
                    </div>
                  ) : secondsLeft === 0 ? (
                    <div className="w-48 h-48 flex flex-col items-center justify-center bg-slate-900/90 absolute inset-0 z-10 rounded-3xl text-white">
                      <p className="text-xs font-bold mb-3">QR코드가 만료되었습니다</p>
                      <button
                        onClick={handleRefresh}
                        className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      >
                        <RefreshCw className="w-3 h-3" /> 재발급
                      </button>
                    </div>
                  ) : null}

                  {/* Elegant High-Tech Custom QR Code design using SVG lines */}
                  <svg className="w-48 h-48 text-slate-900" viewBox="0 0 100 100">
                    {/* Background Grid Accent */}
                    <rect width="100" height="100" fill="transparent" />
                    
                    {/* Corner Position Detection Patterns */}
                    {/* Top-Left */}
                    <rect x="5" y="5" width="22" height="22" rx="3" fill="currentColor" />
                    <rect x="9" y="9" width="14" height="14" rx="1.5" fill="white" />
                    <rect x="12" y="12" width="8" height="8" rx="0.5" fill="currentColor" />

                    {/* Top-Right */}
                    <rect x="73" y="5" width="22" height="22" rx="3" fill="currentColor" />
                    <rect x="77" y="9" width="14" height="14" rx="1.5" fill="white" />
                    <rect x="80" y="12" width="8" height="8" rx="0.5" fill="currentColor" />

                    {/* Bottom-Left */}
                    <rect x="5" y="73" width="22" height="22" rx="3" fill="currentColor" />
                    <rect x="9" y="77" width="14" height="14" rx="1.5" fill="white" />
                    <rect x="12" y="80" width="8" height="8" rx="0.5" fill="currentColor" />

                    {/* Center Brand Logo Plate Overlay to look exactly like high-end financial app QR codes */}
                    <rect x="38" y="38" width="24" height="24" rx="6" fill="white" className="shadow-md" />
                    <path d="M44 48 L48 44 L52 48 L56 44 L56 56 L44 56 Z" fill="#0062E6" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />

                    {/* QR Code Random Generated Dots & Modules */}
                    <rect x="32" y="5" width="6" height="6" fill="currentColor" />
                    <rect x="42" y="5" width="10" height="6" fill="currentColor" />
                    <rect x="56" y="5" width="6" height="10" fill="currentColor" />
                    <rect x="66" y="9" width="4" height="4" fill="currentColor" />
                    
                    <rect x="32" y="15" width="6" height="12" fill="currentColor" />
                    <rect x="46" y="15" width="6" height="6" fill="currentColor" />
                    <rect x="56" y="19" width="12" height="6" fill="currentColor" />

                    <rect x="5" y="32" width="12" height="6" fill="currentColor" />
                    <rect x="21" y="32" width="6" height="6" fill="currentColor" />
                    <rect x="32" y="32" width="10" height="6" fill="currentColor" />
                    <rect x="66" y="32" width="6" height="6" fill="currentColor" />
                    <rect x="76" y="32" width="18" height="6" fill="currentColor" />

                    <rect x="5" y="42" width="6" height="12" fill="currentColor" />
                    <rect x="15" y="42" width="6" height="6" fill="currentColor" />
                    <rect x="25" y="42" width="8" height="6" fill="currentColor" />
                    <rect x="66" y="42" width="6" height="12" fill="currentColor" />
                    <rect x="80" y="42" width="14" height="6" fill="currentColor" />

                    <rect x="15" y="52" width="12" height="6" fill="currentColor" />
                    <rect x="32" y="52" width="6" height="12" fill="currentColor" />
                    <rect x="76" y="52" width="10" height="6" fill="currentColor" />
                    <rect x="90" y="52" width="4" height="12" fill="currentColor" />

                    <rect x="5" y="62" width="18" height="6" fill="currentColor" />
                    <rect x="27" y="62" width="6" height="6" fill="currentColor" />
                    <rect x="66" y="62" width="12" height="6" fill="currentColor" />
                    <rect x="82" y="62" width="6" height="6" fill="currentColor" />

                    <rect x="32" y="73" width="12" height="6" fill="currentColor" />
                    <rect x="48" y="73" width="6" height="12" fill="currentColor" />
                    <rect x="58" y="73" width="10" height="6" fill="currentColor" />
                    
                    <rect x="32" y="83" width="6" height="12" fill="currentColor" />
                    <rect x="42" y="89" width="12" height="6" fill="currentColor" />
                    <rect x="58" y="83" width="6" height="6" fill="currentColor" />
                    <rect x="68" y="79" width="12" height="16" fill="currentColor" opacity="0.9" />
                    <rect x="84" y="83" width="10" height="6" fill="currentColor" />
                  </svg>

                  {/* Simulated neon active scan line */}
                  {!isSimulating && secondsLeft > 0 && (
                    <motion.div
                      animate={{ y: [0, 192, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-1 bg-brand-blue/75 shadow-lg shadow-brand-blue/50 z-20 pointer-events-none"
                    />
                  )}
                </div>

                {/* Timer & Refresh */}
                <div className="flex items-center gap-3 mb-8">
                  <span className={`text-sm font-black font-mono ${secondsLeft < 30 ? 'text-fall animate-pulse' : 'text-slate-600 dark:text-slate-300'}`}>
                    남은 시간 {formatTime(secondsLeft)}
                  </span>
                  <button
                    onClick={handleRefresh}
                    disabled={secondsLeft === 0 || isSimulating}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-40 transition-colors"
                    title="유효시간 재연장"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Instant Simulator Button */}
                <div className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                    <span>원클릭 데모 시뮬레이터</span>
                  </div>
                  <button
                    onClick={handleSimulateLogin}
                    disabled={secondsLeft === 0 || isSimulating}
                    className="w-full bg-brand-blue hover:bg-brand-blue/95 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-brand-blue/10 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    QR코드 스캔 완료 시뮬레이션
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'certificate' && (
              <div className="py-6 flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">인증 프로그램 실행 필요</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs leading-relaxed">
                  금융인증서 또는 공동인증서 로그인을 위해 통합 인증 모듈이 필요합니다.
                </p>
                <button 
                  onClick={handleSimulateLogin}
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm py-3 px-6 rounded-xl transition-all"
                >
                  기본 데모 로그인 진행하기
                </button>
              </div>
            )}

            {activeTab === 'id' && (
              <form onSubmit={handleDirectLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">사용자 ID</label>
                  <input
                    type="text"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디를 입력해 주세요"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">비밀번호</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해 주세요"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="w-full bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-brand-blue/10 transition-all flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'ID 로그인'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer security badge */}
          <div className="bg-slate-50 dark:bg-slate-950/20 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">데이터 전송 구간 256비트 종단간 암호화 적용됨</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
