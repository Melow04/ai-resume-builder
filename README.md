## Resumeant — AI Resume Builder (Mint Theme)

Resumeant helps you craft professional, tailored resumes with AI — private by default, stored locally in your browser. Built with Next.js and styled with a mint gradient theme (#3ECF8E → #1F6948).

## ✨ Features

- 🤖 **AI-Powered Text Improvement** - Enhance your resume content with Google Gemini
- 📊 **Analytics & Feedback System** - Track user engagement and collect feedback
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful Mint Gradient Theme** - Professional and modern design
- 🔒 **Privacy-First** - All resume data stored locally in your browser
- 📄 **PDF Export** - Download your resume as a professional PDF
- 💬 **User Feedback Surveys** - Integrated feedback collection system

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up analytics (optional but recommended):

Create a `.env.local` file and add your PostHog credentials:

```bash
cp .env.local.example .env.local
```

Then add your PostHog API key (see [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for details):

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Resumeant.

You can start editing the hero by modifying `app/page.tsx` and global styles in `app/globals.css`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
