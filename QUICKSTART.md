# 🚀 Analytics Quick Start Checklist

## ✅ Step-by-Step Setup (5 minutes)

### Step 1: Sign Up for PostHog (2 minutes)
- [ ] Go to https://posthog.com
- [ ] Click "Get started - free"
- [ ] Create account with email
- [ ] Create a new project
- [ ] Name it "Resumeant"

### Step 2: Get Your API Key (1 minute)
- [ ] In PostHog dashboard, go to "Project Settings"
- [ ] Copy your "Project API Key" (starts with `phc_`)
- [ ] Keep this safe - you'll need it next

### Step 3: Configure Environment (1 minute)
- [ ] In your project root, create `.env.local`:
  ```bash
  NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
  NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
  ```
- [ ] Replace `phc_your_key_here` with your actual key
- [ ] Save the file

### Step 4: Restart Dev Server (30 seconds)
- [ ] Stop your current server (Ctrl+C)
- [ ] Run: `npm run dev`
- [ ] Wait for server to start

### Step 5: Test It Works (30 seconds)
- [ ] Open http://localhost:3000
- [ ] Click around the site
- [ ] Click the feedback button (bottom-right)
- [ ] Submit a test rating

### Step 6: Verify in PostHog (1 minute)
- [ ] Go back to PostHog dashboard
- [ ] Click "Activity" or "Events" in sidebar
- [ ] You should see events appearing:
  - `$pageview`
  - `session_started`
  - `feedback_submitted` (if you tested)

## 🎉 You're Done!

Your analytics are now live. Here's what happens automatically:

### Automatic Tracking:
- ✅ Page views
- ✅ User sessions
- ✅ Feature usage
- ✅ AI improvements used
- ✅ PDF exports
- ✅ Feedback submissions
- ✅ User inactivity (churn indicator)

### What You Can Do Now:

#### View Live Events
1. PostHog → "Activity" tab
2. See events in real-time as users interact

#### Create Your First Insight
1. PostHog → "Insights" → "New insight"
2. Select "Trends"
3. Choose event: `$pageview`
4. Click "Save"
5. Name it: "Daily Page Views"

#### Track Churn Rate
1. PostHog → "Insights" → "New insight"
2. Select "Trends"
3. Add events:
   - `session_started` (count unique users)
   - `user_inactive` (filter: minutes > 10)
4. View the ratio over time

#### View Feedback
1. PostHog → "Events"
2. Filter by: `feedback_submitted`
3. Click any event to see rating & comments
4. Export to CSV for analysis

#### Create User Funnel
1. PostHog → "Insights" → "New insight"
2. Select "Funnel"
3. Add steps:
   - Step 1: `$pageview` (path = /)
   - Step 2: `$pageview` (path = /builder)
   - Step 3: `work_experience_added`
   - Step 4: `resume_exported`
4. See conversion rates

## 📊 Sample Dashboard Setup

Create these insights for a complete overview:

1. **Total Page Views** (Trend chart)
   - Event: `$pageview`
   - Aggregation: Total count

2. **Unique Visitors** (Trend chart)
   - Event: `$pageview`
   - Aggregation: Unique users

3. **Feature Usage** (Bar chart)
   - Events: `ai_improvement_used`, `work_experience_added`
   - Compare counts

4. **Average Rating** (Number)
   - Event: `feedback_submitted`
   - Aggregation: Average of property "rating"

5. **Churn Indicator** (Trend chart)
   - Event: `user_inactive`
   - Filter: minutes > 10
   - As percentage of total sessions

6. **User Journey** (Funnel)
   - Landing → Builder → Export
   - Shows drop-off rates

7. **Session Duration** (Distribution)
   - Automatic metric in PostHog
   - Shows engagement levels

## 🔧 Troubleshooting

### Analytics not showing?
```bash
# Check environment variable
echo $NEXT_PUBLIC_POSTHOG_KEY

# Should output your key starting with phc_
# If empty, restart terminal and server
```

### Still not working?
1. Open browser console (F12)
2. Look for errors
3. Common issues:
   - Missing `NEXT_PUBLIC_` prefix
   - Server not restarted
   - Typo in API key
   - Adblocker blocking PostHog

### Feedback button not visible?
1. Check browser console for errors
2. Try different browser
3. Check z-index conflicts
4. Verify layout.tsx includes `<FeedbackButton />`

## 📱 Test on Mobile

Your feedback survey is mobile-responsive:

1. Open dev tools (F12)
2. Toggle device toolbar
3. Select "iPhone 12 Pro" or similar
4. Test feedback button
5. Should look great on all devices

## 🎯 Next Steps

Once you have data flowing:

### Week 1:
- [ ] Monitor daily page views
- [ ] Check feedback ratings
- [ ] Review feature usage

### Week 2:
- [ ] Set up email alerts for low ratings
- [ ] Create retention cohorts
- [ ] Analyze user journeys

### Month 1:
- [ ] Calculate churn rate trends
- [ ] Identify most/least used features
- [ ] Make data-driven improvements

### Month 3:
- [ ] Compare before/after metrics
- [ ] A/B test new features
- [ ] Export data for presentations

## 💡 Pro Tips

1. **Daily Check**: Spend 5 minutes reviewing PostHog daily
2. **Weekly Reports**: Set up automated email reports
3. **User Feedback**: Read every feedback comment
4. **Low Ratings**: Respond quickly to users with low ratings
5. **Churn Alerts**: Set up alert if churn > 30%
6. **Feature Flags**: Use PostHog feature flags for A/B testing

## 📚 Resources

- [Full Setup Guide](./ANALYTICS_SETUP.md) - Detailed documentation
- [System Architecture](./ANALYTICS_ARCHITECTURE.md) - How it works
- [Complete Summary](./ANALYTICS_SUMMARY.md) - What's included
- [PostHog Docs](https://posthog.com/docs) - Official documentation
- [PostHog University](https://posthog.com/tutorials) - Video tutorials

## ✅ Checklist Complete?

If you've checked all boxes above, you now have:

- ✅ Full analytics tracking
- ✅ User feedback system
- ✅ Churn rate monitoring
- ✅ Real-time insights
- ✅ Data-driven decision making

**Congratulations! 🎉**

You're now tracking your users and can make informed decisions to improve Resumeant!

---

Need help? Check the documentation or PostHog's support resources.
