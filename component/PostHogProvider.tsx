'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, analytics } from '@/lib/analytics';

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog
    initPostHog();

    // Track session start
    analytics.sessionStarted();

    // Track inactivity for churn analysis
    let inactivityTimer: NodeJS.Timeout;
    let inactivityMinutes = 0;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityMinutes = 0;
      inactivityTimer = setTimeout(() => {
        inactivityMinutes += 5;
        analytics.userInactive(inactivityMinutes);
      }, 5 * 60 * 1000); // 5 minutes
    };

    // Listen for user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, []);

  useEffect(() => {
    // Track page views when route changes
    if (pathname) {
      analytics.pageView();
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
