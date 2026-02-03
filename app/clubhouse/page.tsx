// app/clubhouse/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { getWeeklyStats, getMonthlyStats, getLeaderboard } from '@/lib/mock-data';

const ActivityGlobe = dynamic(() => import('@/components/ActivityGlobe'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-[#0a0e1a] rounded-lg">
      <p className="text-gray-400">Loading globe...</p>
    </div>
  ),
});
export default function Clubhouse() {
  const weeklyStats = getWeeklyStats();
  const monthlyStats = getMonthlyStats();
  const leaderboard = getLeaderboard('month').slice(0, 10); // Top 10

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            The <span className="text-[#00ff87]">Clubhouse</span>
          </h1>
          <p className="text-gray-400 text-lg">Welcome back, runner 👋</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="This Week" 
            value={`${weeklyStats.distance} km`} 
            change={`${weeklyStats.activities} activities`}
          />
          <StatCard 
            title="This Month" 
            value={`${monthlyStats.distance} km`} 
            change={`${monthlyStats.activities} activities`}
          />
          <StatCard 
            title="Active Runners" 
            value={`${weeklyStats.activeRunners}`} 
            change="This week"
          />
        </div>

        {/* Leaderboard */}
        <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Monthly Leaderboard 🏆</h2>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.user.id}
                className="flex items-center gap-4 p-4 bg-[#0a0e1a] rounded-lg hover:bg-[#141824] transition"
              >
                <div className="text-2xl font-bold text-gray-500 w-8">
                  {index + 1}
                </div>
                <img 
                  src={entry.user.profile_image_url} 
                  alt={entry.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold">{entry.user.name}</p>
                  <p className="text-gray-400 text-sm">{entry.activityCount} activities</p>
                </div>
                <div className="text-right">
                  <p className="text-[#00ff87] font-bold text-xl">
                    {(entry.distance / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Globe Placeholder */}
        <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activities 🌍</h2>
          <ActivityGlobe />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-[#1a1f2e] p-6 rounded-lg border border-gray-800">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-[#00ff87] text-sm">↑ {change}</p>
    </div>
  );
}

// Replace the globe placeholder section with:
