'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import FeedbackSurvey from './FeedbackSurvey';

export default function FeedbackButton() {
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSurvey(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110 z-40"
        aria-label="Give feedback"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-[#1a1a1a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Give Feedback
        </span>
      </button>

      {showSurvey && (
        <FeedbackSurvey onClose={() => setShowSurvey(false)} trigger="manual" />
      )}
    </>
  );
}
