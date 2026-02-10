// lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getWeeklyStats() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data: activities } = await supabase
    .from('activities')
    .select('distance, user_id')
    .gte('start_date', weekAgo.toISOString());

  const totalDistance = activities?.reduce((sum, a) => sum + Number(a.distance), 0) || 0;
  const activeRunners = new Set(activities?.map(a => a.user_id)).size;

  return {
    distance: Math.round(totalDistance / 1000), // km
    activities: activities?.length || 0,
    activeRunners,
  };
}

export async function getMonthlyStats() {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const { data: activities } = await supabase
    .from('activities')
    .select('distance, user_id')
    .gte('start_date', monthAgo.toISOString());

  const totalDistance = activities?.reduce((sum, a) => sum + Number(a.distance), 0) || 0;
  const activeRunners = new Set(activities?.map(a => a.user_id)).size;

  return {
    distance: Math.round(totalDistance / 1000), // km
    activities: activities?.length || 0,
    activeRunners,
  };
}

export async function getLeaderboard(period: 'week' | 'month' = 'month') {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - (period === 'week' ? 7 : 30));

  const { data: activities } = await supabase
    .from('activities')
    .select('distance, user_id, users!inner(id, name, profile_image_url, opted_in_leaderboard, is_active)')
    .gte('start_date', cutoffDate.toISOString());

  // Group by user
  const userStats = new Map<string, { user: any; distance: number; activityCount: number }>();

  activities?.forEach((activity: any) => {
    const user = activity.users;
    if (!user.opted_in_leaderboard || !user.is_active) return;

    const existing = userStats.get(user.id) || {
      user,
      distance: 0,
      activityCount: 0,
    };

    existing.distance += Number(activity.distance);
    existing.activityCount += 1;
    userStats.set(user.id, existing);
  });

  return Array.from(userStats.values())
    .sort((a, b) => b.distance - a.distance);
}

export async function getRecentActivitiesForGlobe() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  console.log('🔍 Fetching activities since:', weekAgo.toISOString());

  const { data: activities, error } = await supabase
    .from('activities')
    .select('*, users!inner(id, name, profile_image_url, opted_in_globe, is_active)')
    .gte('start_date', weekAgo.toISOString())
    .not('polyline', 'is', null)
    .order('start_date', { ascending: false });

  console.log('📊 Query returned:', activities?.length || 0, 'activities');
  console.log('❌ Query error:', error);
  
  if (activities && activities.length > 0) {
    console.log('📝 Sample activity:', activities[0]);
  }

  // Get last activity per user
  const lastActivityPerUser = new Map();

  activities?.forEach((activity: any) => {
    const user = activity.users;
    console.log('👤 Processing activity for user:', user?.name, 'opted_in_globe:', user?.opted_in_globe);

    if (!user.opted_in_globe || !user.is_active) return;
    if (!lastActivityPerUser.has(user.id)) {
      lastActivityPerUser.set(user.id, {
        id: activity.id,
        user_id: user.id,
        user_name: user.name,
        type: activity.type,
        name: activity.name,
        distance: activity.distance,
        moving_time: activity.moving_time,
        start_date: activity.start_date,
        polyline: activity.polyline,
        profile_image_url: user.profile_image_url,
      });
    }
  });

  console.log('✅ Returning', lastActivityPerUser.size, 'activities for globe');

  return Array.from(lastActivityPerUser.values());
}