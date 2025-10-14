import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/component/Navigation';
import PostHogProvider from '@/component/PostHogProvider';
import FeedbackButton from '@/component/FeedbackButton';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Resumeant – AI Resume Builder',
  description: 'Resumeant helps you craft professional, tailored resumes with AI. 100% private and stored locally on your device.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <PostHogProvider>
          <Navigation />
          {children}
          <FeedbackButton />
        </PostHogProvider>
      </body>
    </html>
  );
}