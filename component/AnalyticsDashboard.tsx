'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare } from 'lucide-react';

interface AnalyticsStats {
  totalEvents: number;
  uniqueUsers: number;
  avgRating: number;
  feedbackCount: number;
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalEvents: 0,
    uniqueUsers: 0,
    avgRating: 0,
    feedbackCount: 0,
  });

  useEffect(() => {
    // In a real implementation, fetch from your API or PostHog
    // This is a placeholder showing how you'd structure it
    const fetchStats = async () => {
      try {
        // Example API call:
        // const response = await fetch('/api/analytics/stats');
        // const data = await response.json();
        // setStats(data);

        // Placeholder data for demonstration
        setStats({
          totalEvents: 1234,
          uniqueUsers: 456,
          avgRating: 4.5,
          feedbackCount: 89,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: any;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 space-y-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            View your Resumeant analytics and user feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={BarChart3}
            label="Total Events"
            value={stats.totalEvents.toLocaleString()}
            color="from-[#3ECF8E] to-[#1F6948]"
          />
          <StatCard
            icon={Users}
            label="Unique Users"
            value={stats.uniqueUsers.toLocaleString()}
            color="from-blue-500 to-blue-700"
          />
          <StatCard
            icon={TrendingUp}
            label="Average Rating"
            value={`${stats.avgRating}/5`}
            color="from-yellow-500 to-orange-600"
          />
          <StatCard
            icon={MessageSquare}
            label="Feedback Received"
            value={stats.feedbackCount}
            color="from-purple-500 to-purple-700"
          />
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://app.posthog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#1F6948] text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
            >
              Open PostHog Dashboard
            </a>
            <button
              onClick={() => alert('Export feature coming soon!')}
              className="px-4 py-3 border border-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              Export Analytics Data
            </button>
            <button
              onClick={() => alert('Email reports coming soon!')}
              className="px-4 py-3 border border-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              Email Reports
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Documentation</h2>
          <div className="space-y-2">
            <a
              href="/ANALYTICS_SETUP.md"
              className="block text-[#3ECF8E] hover:underline"
            >
              📘 Setup Guide
            </a>
            <a
              href="/ANALYTICS_SUMMARY.md"
              className="block text-[#3ECF8E] hover:underline"
            >
              📊 Analytics Summary
            </a>
            <a
              href="https://posthog.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#3ECF8E] hover:underline"
            >
              📚 PostHog Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
