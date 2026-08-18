import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatDrawer = lazy(() => import('./ChatDrawer'));
const LazyDotLottie = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })));

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessageBadge, setHasNewMessageBadge] = useState(true);
  const [showPromoBubble, setShowPromoBubble] = useState(true);

  useEffect(() => {
    // Auto-dismiss the floating promo bubble after 12 seconds
    const timer = setTimeout(() => {
      setShowPromoBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setShowPromoBubble(false);
    setHasNewMessageBadge(false);
  };

  return (
    <>
      {/* Welcome Bubble Popup */}
      {!isOpen && showPromoBubble && (
        <div
          onClick={handleToggle}
          className="fixed bottom-28 right-8 z-[9998] flex items-center gap-3 max-w-[280px] bg-slate-950/90 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl cursor-pointer hover:bg-slate-900/90 hover:scale-[1.02] active:scale-98 transition-all duration-300 select-none animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <p className="text-xs font-bold text-white/95 tracking-wide leading-relaxed">
              Hi! I'm Priyanka, Macenza's AI assistant. Let's chat! 👋
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPromoBubble(false);
            }}
            className="p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors ml-1"
            aria-label="Dismiss welcome message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-[-6px] right-[26px] w-3 h-3 bg-slate-950 border-r border-b border-white/10 rotate-45"></div>
        </div>
      )}

      {/* Lightweight Chat Trigger Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-8 right-8 z-[9999] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${isOpen
          ? 'bg-slate-950 text-white shadow-2xl border border-white/10'
          : 'bg-primary/90 text-white shadow-[0_8px_32px_rgba(37,99,235,0.35)] hover:bg-primary border border-white/20'
          }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90 duration-300" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
            <Suspense fallback={<MessageSquare className="w-7 h-7" />}>
              <LazyDotLottie
                src="/chatbot.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
            {hasNewMessageBadge && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-ping"></span>
            )}
          </div>
        )}
      </button>

      {/* Lazy-loaded Chat Drawer Modal */}
      {isOpen && (
        <Suspense fallback={
          <div className="fixed bottom-28 right-8 z-[9999] w-[90%] sm:w-[400px] h-[550px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex items-center justify-center text-white/50 text-xs font-bold uppercase tracking-widest animate-pulse">
            Loading AI Assistant...
          </div>
        }>
          <ChatDrawer onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default ChatWidget;
