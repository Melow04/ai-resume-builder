# 📊 Where to See Survey Results

## 🎯 Survey Data Location: PostHog Dashboard

Your feedback surveys are automatically tracked and stored in **PostHog**. Here's exactly how to view them:

---

## 🚀 Quick Access

### **1. Go to PostHog**
Open: **https://app.posthog.com**

### **2. Login**
Use your PostHog account credentials

### **3. Select Your Project**
Choose "Resumeant" (or whatever you named it)

---

## 📊 How to View Survey Results

### **Method 1: Events Tab (Best for Individual Responses)**

1. Click **"Activity"** or **"Events"** in the left sidebar
2. In the search/filter box, type: `feedback_submitted`
3. You'll see a list of all feedback submissions

**Example view:**
```
┌─────────────────────────────────────────────────────────┐
│ Event: feedback_submitted                                │
├─────────────────────────────────────────────────────────┤
│ ⏰ 2 minutes ago                                         │
│ 📍 Properties:                                           │
│    • rating: 5                                           │
│    • feedback: "Great app! Love the AI feature"         │
│    • email: "user@example.com"                          │
│    • trigger: "manual"                                   │
│    • timestamp: "2025-10-14T10:30:00Z"                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Event: feedback_submitted                                │
├─────────────────────────────────────────────────────────┤
│ ⏰ 1 hour ago                                            │
│ 📍 Properties:                                           │
│    • rating: 4                                           │
│    • feedback: "Very helpful, but needs more templates" │
│    • email: null                                         │
│    • trigger: "time-based"                              │
│    • timestamp: "2025-10-14T09:15:00Z"                  │
└─────────────────────────────────────────────────────────┘
```

**To see details:**
- Click on any event
- View all properties (rating, feedback text, email, etc.)
- See user information
- Export to CSV

---

### **Method 2: Insights (Best for Analytics)**

Create a custom insight to analyze feedback:

#### **Step 1: Create New Insight**
1. Click **"Insights"** in left sidebar
2. Click **"+ New insight"**

#### **Step 2: Configure Insight**

**For Average Rating:**
```
Event: feedback_submitted
Aggregation: Average
Property: rating
```

**For Rating Distribution:**
```
Event: feedback_submitted
Breakdown: rating
Chart type: Bar chart
```

**For Feedback Over Time:**
```
Event: feedback_submitted
Chart type: Line chart
Time interval: Daily/Weekly
```

---

### **Method 3: Data Management (Best for Export)**

1. Click **"Data Management"** → **"Events"**
2. Search for `feedback_submitted`
3. Click **"Export"** to download CSV

**CSV will include:**
- Timestamp
- Rating (1-5)
- Feedback text
- User email (if provided)
- Trigger type
- User ID
- Session information

---

## 📈 Recommended Dashboards to Create

### **Dashboard 1: Feedback Overview**

Create these insights:
1. **Total Feedback Count** (Number)
2. **Average Rating** (Number, trend)
3. **Rating Distribution** (Bar chart)
4. **Feedback Over Time** (Line chart)
5. **Recent Feedback** (Table)

### **Dashboard 2: User Satisfaction**

1. **5-Star Reviews** (Count, filter: rating = 5)
2. **Low Ratings** (Count, filter: rating ≤ 2)
3. **Response Rate** (Feedback vs Total Sessions)
4. **Feedback by Trigger Type** (Pie chart)

---

## 🎯 Step-by-Step: View Your First Survey

### **Step 1: Submit a Test Survey**
1. Go to your app: http://localhost:3001
2. Click the feedback button
3. Give a rating and feedback
4. Submit

### **Step 2: Go to PostHog**
1. Open https://app.posthog.com
2. Wait 1-2 minutes for data to sync

### **Step 3: Find Your Survey**
1. Click **"Activity"** tab
2. Look for `feedback_submitted` event
3. Click to see details

### **Step 4: View Properties**
You'll see:
```json
{
  "rating": 5,
  "feedback": "Your test feedback",
  "email": "test@example.com",
  "trigger": "manual",
  "timestamp": "2025-10-14T..."
}
```

---

## 💾 All Survey Data Captured

When a user submits feedback, PostHog stores:

| Property | Description | Example |
|----------|-------------|---------|
| `rating` | 1-5 stars | `5` |
| `feedback` | Text comments | `"Great app!"` |
| `email` | User email (optional) | `"user@email.com"` |
| `trigger` | How survey was triggered | `"manual"` or `"time-based"` |
| `timestamp` | When submitted | `"2025-10-14T10:30:00Z"` |
| `$current_url` | Page URL | `"/builder"` |
| `$browser` | Browser used | `"Chrome"` |
| `$os` | Operating system | `"Windows"` |

---

## 📊 Create a Feedback Dashboard

### **Quick Setup:**

1. **Go to PostHog**
2. Click **"Dashboards"**
3. Click **"+ New dashboard"**
4. Name it: "User Feedback"
5. Add these insights:

#### **Insight 1: Average Rating**
```
Type: Number
Event: feedback_submitted
Aggregation: Average (rating)
```

#### **Insight 2: Total Responses**
```
Type: Number
Event: feedback_submitted
Aggregation: Count
```

#### **Insight 3: Rating Breakdown**
```
Type: Bar Chart
Event: feedback_submitted
Breakdown by: rating
```

#### **Insight 4: Recent Feedback Table**
```
Type: Table
Event: feedback_submitted
Columns: timestamp, rating, feedback, email
Sort: Latest first
Limit: 10
```

---

## 🔍 Filter Options

### **View Only High Ratings:**
```
Event: feedback_submitted
Filter: rating = 5
```

### **View Only Low Ratings:**
```
Event: feedback_submitted
Filter: rating <= 2
```

### **View Feedback with Comments:**
```
Event: feedback_submitted
Filter: feedback is set
```

### **View Feedback with Email:**
```
Event: feedback_submitted
Filter: email is set
```

---

## 📧 Set Up Email Alerts

Get notified when users leave feedback:

1. Go to **"Alerts"** in PostHog
2. Click **"+ New alert"**
3. Configure:
   ```
   Event: feedback_submitted
   Condition: rating <= 2
   Send to: your@email.com
   ```

This alerts you immediately when someone gives a low rating!

---

## 📥 Export Survey Data

### **Option 1: Export from Events**
1. Go to **"Events"**
2. Filter: `feedback_submitted`
3. Click **"Export"** button
4. Download CSV

### **Option 2: Export from Insights**
1. Create an insight with feedback data
2. Click **"..."** menu
3. Select **"Export"**
4. Choose format (CSV, PNG, etc.)

### **Option 3: API Access**
Use PostHog API to fetch data programmatically:
```javascript
// Example API call
fetch('https://app.posthog.com/api/projects/YOUR_PROJECT_ID/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
```

---

## 🎨 Example Dashboard

Here's what a complete feedback dashboard looks like:

```
┌────────────────────────────────────────────────────────┐
│  User Feedback Dashboard                               │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ 89      │  │ 4.2/5   │  │ 67%     │  │ 12      │ │
│  │ Total   │  │ Avg     │  │ Response│  │ This    │ │
│  │ Surveys │  │ Rating  │  │ Rate    │  │ Week    │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │
│                                                        │
│  Rating Distribution:                                  │
│  5★ ████████████████ 45%                              │
│  4★ ██████████ 30%                                    │
│  3★ ████ 15%                                          │
│  2★ ██ 7%                                             │
│  1★ █ 3%                                              │
│                                                        │
│  Recent Feedback:                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ 5★ "Great app!" - 2 min ago                   │  │
│  │ 4★ "Very helpful" - 1 hour ago                │  │
│  │ 5★ "Love it!" - 3 hours ago                   │  │
│  └────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Links

Once you have PostHog configured:

**View All Feedback:**
https://app.posthog.com → Activity → Filter: `feedback_submitted`

**Create Dashboard:**
https://app.posthog.com → Dashboards → New Dashboard

**Export Data:**
https://app.posthog.com → Data Management → Events → Export

---

## ⚠️ Need PostHog Setup?

If you haven't set up PostHog yet:

1. **Sign up:** https://posthog.com (free tier: 1M events/month)
2. **Get API key:** Project Settings → API Keys
3. **Add to `.env.local`:**
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
4. **Restart server:** `npm run dev`

Then submit a test survey and view it in PostHog!

---

## 📞 Summary

**WHERE TO SEE SURVEYS:**
✅ **PostHog Dashboard** → https://app.posthog.com
✅ **Events Tab** → Filter by `feedback_submitted`
✅ **Create Insights** → For analytics & trends
✅ **Export CSV** → For Excel/Google Sheets
✅ **API Access** → For custom integrations

**All your survey data is automatically sent to PostHog!** 📊✨
