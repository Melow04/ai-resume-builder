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
        <div className="fixed max-w-sm bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#3ECF8E] rounded-xl shadow-2xl p-4 z-[9999] animate-in slide-in-from-right duration-500" style={{ right: '1.5rem !important', bottom: '6rem !important', left: 'auto !important', position: 'fixed' }}>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#1F6948] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Loving Resumeant?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Share your feedback! It only takes 30 seconds ✨
              </p>
              
              <button
                onClick={() => {
                  setShowBanner(false);
                  setShowSurvey(true);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                Give Feedback Now
              </button>
            </div>
          </div>

          <div className="absolute -inset-1 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] rounded-xl opacity-20 blur -z-10"></div>
        </div>
      )}

      {/* MUCH LARGER and MORE PROMINENT feedback button - FORCED RIGHT SIDE */}
      <div style={{ position: 'fixed', right: '24px', bottom: '24px', left: 'auto', zIndex: 9999 }}>
        <button
          onClick={() => setShowSurvey(true)}
          className="w-20 h-20 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(62,207,142,0.6)] transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Give feedback"
          style={{
            animation: isPulsing ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
            position: 'relative'
          }}
        >
          <MessageSquare className="w-9 h-9 text-white relative z-10" />
        
        {/* Enhanced tooltip with gradient */}
        <span className="absolute right-full mr-4 px-5 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white text-base font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl border-2 border-white/20">
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
