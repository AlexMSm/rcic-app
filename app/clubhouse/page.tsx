// app/clubhouse/page.tsx
import { getWeeklyStats, getMonthlyStats, getLeaderboard } from '@/lib/db';
import ClubhouseClient from '@/components/ClubhouseClient';

export default async function Clubhouse() {
  const weeklyStats = await getWeeklyStats();
  const monthlyStats = await getMonthlyStats();
  const leaderboard = (await getLeaderboard('month')).slice(0, 10);

  return (
    <ClubhouseClient 
      weeklyStats={weeklyStats} 
      monthlyStats={monthlyStats} 
      leaderboard={leaderboard} 
    />
  );
}