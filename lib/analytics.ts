import posthog from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

    if (apiKey) {
      posthog.init(apiKey, {
        api_host: apiHost,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loaded: (posthog: any) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
        capture_pageview: false, // We'll handle this manually
        capture_pageleave: true, // Track when users leave
        session_recording: {
          recordCrossOriginIframes: false,
        },
      });
    }
  }
};

export const analytics = {
  // Track page views
  pageView: (path?: string) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', {
        $current_url: path || window.location.href,
      });
    }
  },

  // Track custom events
  track: (eventName: string, properties?: Record<string, string | number | boolean | null>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties);
    }
  },

  // Identify users (optional - for returning users)
  identify: (userId: string, traits?: Record<string, string | number | boolean | null>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, traits);
    }
  },

  // Track resume actions
  resumeCreated: () => {
    analytics.track('resume_created');
  },

  resumeExported: (format: string) => {
    analytics.track('resume_exported', { format });
  },

  aiImprovementUsed: (field: string) => {
    analytics.track('ai_improvement_used', { field });
  },

  // Track feedback survey submission
  feedbackSubmitted: (rating: number, feedback: string, email?: string) => {
    analytics.track('feedback_submitted', {
      rating,
      feedback,
      email: email || null,
      timestamp: new Date().toISOString(),
    });
  },

  // Track user engagement
  featureUsed: (featureName: string) => {
    analytics.track('feature_used', { feature: featureName });
  },

  // Session tracking
  sessionStarted: () => {
    analytics.track('session_started');
  },

  // Churn indicators
  userInactive: (minutesInactive: number) => {
    analytics.track('user_inactive', { minutes: minutesInactive });
  },
};

export default posthog;
