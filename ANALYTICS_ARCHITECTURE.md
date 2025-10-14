# Analytics & Feedback System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      RESUMEANT APPLICATION                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ User Actions
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EVENT TRACKING LAYER                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ lib/analytics.ts                                          │  │
│  │ - pageView()                                              │  │
│  │ - track()                                                 │  │
│  │ - identify()                                              │  │
│  │ - resumeCreated()                                         │  │
│  │ - resumeExported()                                        │  │
│  │ - aiImprovementUsed()                                     │  │
│  │ - feedbackSubmitted()                                     │  │
│  │ - userInactive()                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Events Captured
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POSTHOG PROVIDER                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ component/PostHogProvider.tsx                             │  │
│  │ - Initializes PostHog on app load                         │  │
│  │ - Tracks page navigation                                  │  │
│  │ - Monitors user activity/inactivity                       │  │
│  │ - Sends session started events                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│   FEEDBACK COLLECTION     │   │    ANALYTICS DATA             │
│                           │   │                               │
│ ┌───────────────────────┐ │   │ ┌───────────────────────────┐ │
│ │ FeedbackButton.tsx    │ │   │ │ PostHog Cloud             │ │
│ │ - Floating button     │ │   │ │ - Event storage           │ │
│ │ - Triggers survey     │ │   │ │ - Real-time processing    │ │
│ └───────────────────────┘ │   │ │ - Data warehousing        │ │
│                           │   │ └───────────────────────────┘ │
│ ┌───────────────────────┐ │   │                               │
│ │ FeedbackSurvey.tsx    │ │   │ Data Processing:              │
│ │ - 5-star rating       │ │   │ • Unique users                │
│ │ - Text feedback       │ │   │ • Page views                  │
│ │ - Email (optional)    │ │   │ • Session duration            │
│ │ - Success animation   │ │   │ • Event counts                │
│ └───────────────────────┘ │   │ • Funnels                     │
│                           │   │ • Retention                   │
│ ┌───────────────────────┐ │   │ • Churn rate                  │
│ │ api/feedback/route.ts │ │   │                               │
│ │ - Optional backend    │ │   └───────────────────────────────┘
│ │ - Email notifications │ │
│ │ - DB storage          │ │
│ └───────────────────────┘ │
└───────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ANALYTICS DASHBOARD                           │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostHog     │  │   Custom     │  │   Exports    │          │
│  │  Dashboard   │  │  Dashboard   │  │   & Reports  │          │
│  │              │  │              │  │              │          │
│  │ • Insights   │  │ • Overview   │  │ • CSV Export │          │
│  │ • Funnels    │  │ • Stats      │  │ • Email      │          │
│  │ • Retention  │  │ • Actions    │  │ • API Access │          │
│  │ • Sessions   │  │ • Feedback   │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════

TRACKED EVENTS & DATA FLOW:

User Action                →  Event Name              →  Properties
────────────────────────────────────────────────────────────────────
Visits page                →  $pageview               →  path, referrer
Starts session             →  session_started         →  timestamp
Adds work experience       →  work_experience_added   →  count
Uses AI improvement        →  ai_improvement_used     →  field, type
Exports PDF                →  resume_exported         →  format
Inactive 5+ min            →  user_inactive           →  minutes
Submits feedback           →  feedback_submitted      →  rating, text, email
Creates resume             →  resume_created          →  timestamp

═══════════════════════════════════════════════════════════════════

CHURN ANALYSIS WORKFLOW:

1. User lands on site
   └─> session_started tracked

2. User interacts with features
   └─> Various events tracked (clicks, edits, exports)

3. User becomes inactive
   └─> After 5 min: user_inactive (5)
   └─> After 10 min: user_inactive (10)
   └─> After 15 min: user_inactive (15)

4. User leaves page
   └─> $pageleave tracked

5. PostHog calculates:
   └─> Session duration
   └─> Engagement score
   └─> Likelihood to churn
   └─> Return probability

6. Dashboard shows:
   └─> Churn Rate = (Users with user_inactive > 10min / Total Users) × 100
   └─> Retention cohorts (Day 1, 7, 30)
   └─> At-risk users

═══════════════════════════════════════════════════════════════════

FEEDBACK SURVEY FLOW:

1. User clicks feedback button (bottom-right)
   └─> FeedbackSurvey modal opens

2. User selects rating (1-5 stars)
   └─> Event: feedback_rating_selected
   └─> Moves to feedback step

3. User enters optional text & email
   └─> Text: "Great app, would love feature X"
   └─> Email: "user@example.com"

4. User submits
   └─> Event: feedback_submitted
   └─> Data sent to PostHog
   └─> Optional: Sent to /api/feedback
   └─> Optional: Email notification to admin

5. Success message shown
   └─> Modal closes after 2 seconds

6. Admin views in PostHog:
   └─> Filters events by feedback_submitted
   └─> Sees all ratings and comments
   └─> Can export to CSV
   └─> Can set up alerts for low ratings

═══════════════════════════════════════════════════════════════════

DATA PRIVACY & SECURITY:

✅ What IS tracked:
   • Anonymous behavioral events
   • Page views and navigation
   • Feature usage
   • Session duration
   • Feedback (only if user submits)
   • Email (only if user provides)

❌ What is NOT tracked:
   • Resume content
   • Personal information in forms
   • Passwords or sensitive data
   • Keystroke logging
   • Personal identification (unless user provides)

🔒 Security measures:
   • Data encrypted in transit (HTTPS)
   • PostHog servers secure & compliant
   • GDPR-friendly (EU option available)
   • Can disable session recording
   • User can opt-out

═══════════════════════════════════════════════════════════════════
