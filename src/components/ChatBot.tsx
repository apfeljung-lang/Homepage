import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PRESET_QUESTIONS = [
  "투혼 WTS는 어떻게 이용하나요?",
  "진행중인 대박 우대금리 이벤트가 궁금해요!",
  "초보자를 위한 HTS와 MTS 가이드를 알려주세요.",
  "투혼투게더 서비스는 무엇인가요?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "안녕하세요! 투혼투자증권의 똑똑한 AI 금융 비서 **'투혼이'**입니다. 📈✨\n\n투혼의 거래 시스템(WTS, HTS, MTS) 가이드, 현재 진행 중인 우대금리 및 혜택 이벤트, 그리고 주식 투자 분석에 대해 무엇이든 물어보세요!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Send conversational history to the backend
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "서버와 연결할 수 없습니다.");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "답변을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "안녕하세요! 투혼투자증권의 똑똑한 AI 금융 비서 **'투혼이'**입니다. 📈✨\n\n투혼의 거래 시스템(WTS, HTS, MTS) 가이드, 현재 진행 중인 우대금리 및 혜택 이벤트, 그리고 주식 투자 분석에 대해 무엇이든 물어보세요!",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          id="chatbot-toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rotate-90' 
              : 'bg-brand-blue text-white hover:scale-110 active:scale-95'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-mint"></span>
              </span>
              {/* Tooltip on hover */}
              <div className="absolute right-20 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
                투혼이와 대화하기 ✨
              </div>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-28 right-8 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-blue to-indigo-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Bot className="w-6 h-6 text-brand-mint" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1">
                    AI 투자 비서 투혼이
                    <Sparkles className="w-3.5 h-3.5 text-brand-mint fill-brand-mint animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-brand-mint/90 font-mono mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse"></span>
                    ONLINE • REALTIME
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title="대화 초기화"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-slate-700">
                      <Bot className="w-4 h-4 text-indigo-600 dark:text-brand-mint" />
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-brand-blue text-white rounded-tr-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/60 rounded-tl-none'
                      }`}
                    >
                      {/* Simple custom markdown renderer helper for bold words */}
                      {msg.content.split('\n').map((line, idx) => {
                        // Bold parsing: **text**
                        const parts = line.split('**');
                        return (
                          <div key={idx} className="min-h-[1.2rem]">
                            {parts.map((part, pIdx) => {
                              if (pIdx % 2 === 1) {
                                return <strong key={pIdx} className="font-extrabold text-brand-blue dark:text-brand-mint">{part}</strong>;
                              }
                              return part;
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 self-end font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-slate-700">
                    <Bot className="w-4 h-4 text-indigo-600 dark:text-brand-mint" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-brand-blue dark:bg-brand-mint rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-brand-blue dark:bg-brand-mint rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-brand-blue dark:bg-brand-mint rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              {/* Error Info */}
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">응답 생성 오류</p>
                    <p className="mt-0.5">{error}</p>
                    <button
                      onClick={() => handleSend(messages[messages.length - 1].content)}
                      className="mt-2 text-[10px] font-bold underline cursor-pointer hover:text-rose-800 dark:hover:text-rose-300"
                    >
                      다시 시도하기
                    </button>
                  </div>
                </div>
              )}

              {/* Empty state bottom spacer to ensure presets don't cover messages */}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets and Suggested Questions */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> 자주 묻는 질문
                </p>
                <div className="flex flex-col gap-1.5">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="w-full text-left text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg border border-slate-200/60 dark:border-slate-700/50 transition-all font-medium active:scale-[0.99]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="투혼이에게 질문을 입력하세요..."
                disabled={isLoading}
                className="flex-1 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-blue dark:focus:border-brand-mint transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-brand-blue text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-35 disabled:hover:bg-brand-blue"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
