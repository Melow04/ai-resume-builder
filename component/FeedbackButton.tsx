'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Star, X } from 'lucide-react';
import FeedbackSurvey from './FeedbackSurvey';

export default function FeedbackButton() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Show banner after 30 seconds, then auto-show every 2 minutes
  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('feedback_banner_shown');
    
    if (!hasSeenBanner) {
      const timer = setTimeout(() => {
        setShowBanner(true);
        localStorage.setItem('feedback_banner_shown', 'true');
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Stop pulsing after 15 seconds (but keep it pulsing longer)
  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sliding notification banner */}
      {showBanner && !showSurvey && (
        <div className="fixed max-w-[280px] sm:max-w-sm bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#3ECF8E] rounded-lg sm:rounded-xl shadow-2xl p-3 sm:p-4 z-[9999] animate-in slide-in-from-right duration-500" style={{ right: '1rem !important', bottom: '5rem !important', left: 'auto !important', position: 'fixed' }}>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#1F6948] flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1">Loving Resumeant?</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                Share your feedback! It only takes 30 seconds ✨
              </p>
              
              <button
                onClick={() => {
                  setShowBanner(false);
                  setShowSurvey(true);
                }}
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-xs sm:text-sm"
              >
                Give Feedback Now
              </button>
            </div>
          </div>

          <div className="absolute -inset-1 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] rounded-lg sm:rounded-xl opacity-20 blur -z-10"></div>
        </div>
      )}

      {/* MUCH LARGER and MORE PROMINENT feedback button - FORCED RIGHT SIDE */}
      <div style={{ position: 'fixed', right: '16px', bottom: '16px', left: 'auto', zIndex: 9999 }} className="sm:right-6 sm:bottom-6">
        <button
          onClick={() => setShowSurvey(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(62,207,142,0.6)] transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
          aria-label="Give feedback"
          style={{
            animation: isPulsing ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
            position: 'relative'
          }}
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white relative z-10" />
        
        {/* Enhanced tooltip with gradient */}
        <span className="hidden md:block absolute right-full mr-4 px-5 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white text-base font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl border-2 border-white/20">
          💬 Share Your Feedback!
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#1F6948]"></span>
        </span>

        {/* Multiple pulsing ring effects for maximum attention */}
        {isPulsing && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#3ECF8E] opacity-30 animate-ping"></span>
            <span className="absolute inset-0 rounded-full bg-[#3ECF8E] opacity-20 animate-ping" style={{ animationDelay: '0.5s' }}></span>
            <span className="absolute -inset-2 rounded-full border-4 border-[#3ECF8E] opacity-40 animate-pulse"></span>
          </>
        )}

          {/* Glowing background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] blur-lg opacity-50"></div>
        </button>
      </div>

      {/* Survey modal */}
      {showSurvey && (
        <FeedbackSurvey onClose={() => setShowSurvey(false)} trigger="manual" />
      )}
    </>
  );
}
