'use client';

import { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface FeedbackSurveyProps {
  onClose: () => void;
  trigger?: 'manual' | 'exit-intent' | 'time-based';
}

export default function FeedbackSurvey({ onClose, trigger = 'manual' }: FeedbackSurveyProps) {
  const [step, setStep] = useState<'rating' | 'feedback' | 'success'>('rating');
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    setStep('feedback');
    analytics.track('feedback_rating_selected', { rating: selectedRating, trigger });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the feedback
      analytics.feedbackSubmitted(rating, feedback, email);

      // You can also send to your own API endpoint
      // await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rating, feedback, email, trigger }),
      // });

      setStep('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close feedback survey"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'rating' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#1F6948] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">How's your experience?</h2>
            </div>
            <p className="text-gray-400">
              We'd love to hear your feedback! How would you rate your experience with Resumeant?
            </p>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleRatingSelect(num)}
                  className="flex-1 aspect-square rounded-lg border-2 border-[#2a2a2a] hover:border-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-all duration-200 flex items-center justify-center text-2xl font-bold text-white hover:scale-105"
                  aria-label={`Rate ${num} out of 5`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Not Good</span>
              <span>Excellent</span>
            </div>
          </div>
        )}

        {step === 'feedback' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#1F6948] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Thanks for rating us {rating}/5!</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                  Tell us more (optional)
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What did you like or what could we improve?"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E] resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email (optional - if you'd like us to follow up)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('rating')}
                className="flex-1 px-4 py-3 border border-[#2a2a2a] rounded-lg text-white hover:bg-[#2a2a2a] transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Submit <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#1F6948] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Thank you!</h2>
            <p className="text-gray-400">Your feedback helps us improve Resumeant.</p>
          </div>
        )}
      </div>
    </div>
  );
}
