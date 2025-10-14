# Analytics & Feedback System Setup Guide

## Overview
Resumeant now includes a comprehensive analytics and feedback system that tracks:
- ✅ **Site Visitation**: Page views, unique visitors, session duration
- ✅ **User Engagement**: Feature usage, AI improvements, resume exports
- ✅ **Churn Analysis**: Inactivity tracking, session patterns
- ✅ **Feedback Surveys**: User ratings, comments, and email collection

## Quick Start

### 1. Sign Up for PostHog (Free Tier)
1. Go to [https://posthog.com](https://posthog.com)
2. Create a free account (1M events/month free)
3. Create a new project
4. Copy your **Project API Key** from Settings

### 2. Configure Environment Variables
1. Create a `.env.local` file in your project root:
```bash
cp .env.local.example .env.local
```

2. Add your PostHog credentials:
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Restart Your Development Server
```bash
npm run dev
```

## Features Implemented

### 📊 Analytics Tracking
The system automatically tracks:

**Page Views**
- Home page visits
- Builder page visits
- Navigation between pages

**User Actions**
- `resume_created` - When a user creates a resume
- `resume_exported` - When PDF is downloaded
- `ai_improvement_used` - When AI text improvement is used
- `work_experience_added` - When work experience is added
- `session_started` - When a user starts a session
- `user_inactive` - After 5 minutes of inactivity (churn indicator)

### 💬 Feedback Survey
A floating feedback button appears on all pages:
- **5-star rating system**
- **Optional text feedback**
- **Optional email collection**
- **Beautiful gradient design matching your brand**

### 📈 Analytics Dashboard (PostHog)

Once configured, you can view:

**Insights Tab**
- Total page views
- Unique visitors
- Session duration
- Bounce rate

**Events Tab**
- All tracked events with properties
- User actions timeline
- Feature usage statistics

**Session Recordings** (optional)
- Watch user sessions to understand behavior
- Identify UX issues

**Funnels**
- Track user journey from landing to resume export
- Identify drop-off points

**Retention**
- See how many users return
- Calculate churn rate

**Surveys**
- View all feedback submissions
- Filter by rating
- Export for analysis

## Creating Custom Dashboards

### Example: Churn Rate Dashboard
1. Go to PostHog → Insights → New Insight
2. Create trend showing:
   - `session_started` events
   - `user_inactive` events (filtered by > 10 minutes)
3. Calculate: Churn Rate = (Inactive Users / Total Sessions) × 100

### Example: Feature Adoption
1. Track which features are most used:
   - `ai_improvement_used` count
   - `work_experience_added` count
   - `resume_exported` count
2. Create bar chart comparing feature usage

## Custom Tracking

Add custom tracking anywhere in your app:

```typescript
import { analytics } from '@/lib/analytics';

// Track custom events
analytics.track('custom_event_name', {
  property1: 'value1',
  property2: 'value2'
});

// Track user identity (for returning users)
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'free'
});
```

## Alternative: Google Analytics 4

If you prefer Google Analytics instead of PostHog:

1. Install GA4:
```bash
npm install @next/third-parties
```

2. Update `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

3. Add tracking code using gtag:
```typescript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};
```

## Privacy Considerations

✅ **Currently Configured:**
- All data stored locally (resumes)
- Analytics are anonymous by default
- No personal data sent without consent
- Optional email in feedback only

To make it even more privacy-friendly:
1. Add a cookie consent banner
2. Disable session recording in PostHog settings
3. Use PostHog's EU cloud option
4. Add privacy policy link

## Troubleshooting

**Analytics not showing up?**
1. Check `.env.local` is properly configured
2. Verify PostHog key is correct
3. Check browser console for errors
4. Ensure dev server was restarted after adding env vars

**Feedback button not visible?**
1. Check z-index conflicts
2. Verify button is added in layout.tsx
3. Check browser console for component errors

## Cost Considerations

**PostHog Free Tier:**
- 1M events/month
- Unlimited projects
- Session recordings (5,000/month)
- Feature flags
- **Estimated:** Free for ~10,000 monthly active users

**Paid plans start at $0.00031/event** after free tier.

For your use case (AI resume builder), you'll likely stay in free tier unless you get massive traffic.

## Support

- PostHog Docs: https://posthog.com/docs
- Community Slack: https://posthog.com/slack
- GitHub Issues: https://github.com/PostHog/posthog

## Next Steps

1. ✅ Sign up for PostHog
2. ✅ Add API key to .env.local
3. ✅ Restart dev server
4. ✅ Test feedback button
5. ✅ View analytics in PostHog dashboard
6. ✅ Create custom insights for churn analysis
7. ✅ Set up email alerts for high churn rates

Enjoy tracking your users and improving Resumeant! 🚀
