// lib/mock-data.ts

export interface User {
  id: string;
  name: string;
  profile_image_url: string;
  strava_id: number;
  opted_in_leaderboard: boolean;
  opted_in_globe: boolean;
  is_active: boolean;
}

export interface Activity {
  id: string;
  user_id: string;
  user_name: string;
  type: 'Run' | 'Walk' | 'Ride' | 'TrailRun' | 'Hike';
  name: string;
  distance: number; // meters
  moving_time: number; // seconds
  start_date: string;
  polyline: string; // encoded GPS route
}

// lib/mock-data.ts

// Expand routes to cover more of Hampshire
const winchesterRoutes = [
  // Winchester City
  { name: 'City Centre Loop', coords: [[51.0632, -1.3080], [51.0650, -1.3100], [51.0670, -1.3050], [51.0640, -1.3020]] },
  { name: 'River Itchen Trail', coords: [[51.0550, -1.3100], [51.0580, -1.3150], [51.0620, -1.3200], [51.0650, -1.3180]] },
  { name: 'St Catherine\'s Hill', coords: [[51.0480, -1.3050], [51.0500, -1.3080], [51.0520, -1.3100], [51.0510, -1.3070]] },
  { name: 'Water Meadows', coords: [[51.0600, -1.3200], [51.0620, -1.3250], [51.0640, -1.3220], [51.0615, -1.3190]] },
  { name: 'Winnall Moors', coords: [[51.0700, -1.2980], [51.0720, -1.3020], [51.0740, -1.3000], [51.0710, -1.2960]] },
  
  // Surrounding Areas
  { name: 'Twyford Down', coords: [[51.0350, -1.3100], [51.0380, -1.3150], [51.0400, -1.3180], [51.0370, -1.3120]] },
  { name: 'South Downs Way', coords: [[51.0200, -1.3300], [51.0250, -1.3400], [51.0300, -1.3500], [51.0280, -1.3350]] },
  { name: 'Itchen Valley', coords: [[51.0800, -1.2800], [51.0850, -1.2750], [51.0900, -1.2700], [51.0870, -1.2770]] },
  { name: 'Kings Worthy', coords: [[51.0850, -1.3200], [51.0900, -1.3250], [51.0950, -1.3300], [51.0920, -1.3240]] },
  { name: 'Chilcomb', coords: [[51.0500, -1.2700], [51.0530, -1.2650], [51.0560, -1.2600], [51.0540, -1.2670]] },
  
  // Further Out
  { name: 'Alresford Trail', coords: [[51.0900, -1.1600], [51.0950, -1.1500], [51.1000, -1.1400], [51.0970, -1.1550]] },
  { name: 'Chandlers Ford', coords: [[50.9900, -1.3800], [50.9950, -1.3750], [51.0000, -1.3700], [50.9970, -1.3770]] },
  { name: 'Bishops Waltham', coords: [[50.9500, -1.2100], [50.9550, -1.2050], [50.9600, -1.2000], [50.9570, -1.2070]] },
  { name: 'Romsey Road', coords: [[51.0400, -1.3600], [51.0450, -1.3700], [51.0500, -1.3800], [51.0470, -1.3650]] },
  { name: 'Easton Loop', coords: [[51.1100, -1.3400], [51.1150, -1.3350], [51.1200, -1.3300], [51.1170, -1.3370]] },
  { name: 'Otterbourne Trail', coords: [[51.0100, -1.3400], [51.0150, -1.3350], [51.0200, -1.3300], [51.0170, -1.3370]] },
  { name: 'Hursley Park', coords: [[51.0250, -1.4000], [51.0300, -1.4100], [51.0350, -1.4200], [51.0320, -1.4050]] },
  { name: 'Sparsholt Loop', coords: [[51.0800, -1.3800], [51.0850, -1.3900], [51.0900, -1.4000], [51.0870, -1.3850]] },
  { name: 'Compton Down', coords: [[51.0350, -1.3600], [51.0400, -1.3700], [51.0450, -1.3800], [51.0420, -1.3650]] },
  { name: 'Shawford Valley', coords: [[51.0200, -1.3200], [51.0250, -1.3150], [51.0300, -1.3100], [51.0270, -1.3170]] },
];

// 28 total users (8 original + 20 new)
export const mockUsers: User[] = [
  // Original 8
  {
    id: '1',
    name: 'Sarah Johnson',
    profile_image_url: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00ff87&color=0a0e1a',
    strava_id: 12345,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    profile_image_url: 'https://ui-avatars.com/api/?name=Mike+Chen&background=00d9ff&color=0a0e1a',
    strava_id: 12346,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '3',
    name: 'Emma Davis',
    profile_image_url: 'https://ui-avatars.com/api/?name=Emma+Davis&background=ff006e&color=fff',
    strava_id: 12347,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '4',
    name: 'James Wilson',
    profile_image_url: 'https://ui-avatars.com/api/?name=James+Wilson&background=ffd700&color=0a0e1a',
    strava_id: 12348,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '5',
    name: 'Lucy Martinez',
    profile_image_url: 'https://ui-avatars.com/api/?name=Lucy+Martinez&background=ff6b6b&color=fff',
    strava_id: 12349,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '6',
    name: 'Tom Bradley',
    profile_image_url: 'https://ui-avatars.com/api/?name=Tom+Bradley&background=4ecdc4&color=0a0e1a',
    strava_id: 12350,
    opted_in_leaderboard: true,
    opted_in_globe: false,
    is_active: true,
  },
  {
    id: '7',
    name: 'Rachel Green',
    profile_image_url: 'https://ui-avatars.com/api/?name=Rachel+Green&background=95e1d3&color=0a0e1a',
    strava_id: 12351,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '8',
    name: 'Alex Smith',
    profile_image_url: 'https://ui-avatars.com/api/?name=Alex+Smith&background=00ff87&color=0a0e1a',
    strava_id: 12352,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  
  // 20 New Users
  {
    id: '9',
    name: 'Oliver Taylor',
    profile_image_url: 'https://ui-avatars.com/api/?name=Oliver+Taylor&background=a8e6cf&color=0a0e1a',
    strava_id: 12353,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '10',
    name: 'Sophie Brown',
    profile_image_url: 'https://ui-avatars.com/api/?name=Sophie+Brown&background=ffd3b6&color=0a0e1a',
    strava_id: 12354,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '11',
    name: 'Jack Anderson',
    profile_image_url: 'https://ui-avatars.com/api/?name=Jack+Anderson&background=ffaaa5&color=fff',
    strava_id: 12355,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '12',
    name: 'Grace Thompson',
    profile_image_url: 'https://ui-avatars.com/api/?name=Grace+Thompson&background=ff8b94&color=fff',
    strava_id: 12356,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '13',
    name: 'Charlie White',
    profile_image_url: 'https://ui-avatars.com/api/?name=Charlie+White&background=c7ceea&color=0a0e1a',
    strava_id: 12357,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '14',
    name: 'Amelia Harris',
    profile_image_url: 'https://ui-avatars.com/api/?name=Amelia+Harris&background=b5ead7&color=0a0e1a',
    strava_id: 12358,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '15',
    name: 'George Clark',
    profile_image_url: 'https://ui-avatars.com/api/?name=George+Clark&background=e2f0cb&color=0a0e1a',
    strava_id: 12359,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '16',
    name: 'Isla Lewis',
    profile_image_url: 'https://ui-avatars.com/api/?name=Isla+Lewis&background=ffdac1&color=0a0e1a',
    strava_id: 12360,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '17',
    name: 'Harry Walker',
    profile_image_url: 'https://ui-avatars.com/api/?name=Harry+Walker&background=b9fbc0&color=0a0e1a',
    strava_id: 12361,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '18',
    name: 'Mia Robinson',
    profile_image_url: 'https://ui-avatars.com/api/?name=Mia+Robinson&background=98ddca&color=0a0e1a',
    strava_id: 12362,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '19',
    name: 'Noah Hall',
    profile_image_url: 'https://ui-avatars.com/api/?name=Noah+Hall&background=d4f1f4&color=0a0e1a',
    strava_id: 12363,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '20',
    name: 'Poppy Allen',
    profile_image_url: 'https://ui-avatars.com/api/?name=Poppy+Allen&background=f8b88b&color=0a0e1a',
    strava_id: 12364,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '21',
    name: 'Oscar Young',
    profile_image_url: 'https://ui-avatars.com/api/?name=Oscar+Young&background=faa2c1&color=fff',
    strava_id: 12365,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '22',
    name: 'Lily King',
    profile_image_url: 'https://ui-avatars.com/api/?name=Lily+King&background=f3c5ff&color=0a0e1a',
    strava_id: 12366,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '23',
    name: 'Leo Scott',
    profile_image_url: 'https://ui-avatars.com/api/?name=Leo+Scott&background=c9b6e4&color=fff',
    strava_id: 12367,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '24',
    name: 'Freya Wright',
    profile_image_url: 'https://ui-avatars.com/api/?name=Freya+Wright&background=a6dcef&color=0a0e1a',
    strava_id: 12368,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '25',
    name: 'Alfie Green',
    profile_image_url: 'https://ui-avatars.com/api/?name=Alfie+Green&background=ffeaa7&color=0a0e1a',
    strava_id: 12369,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '26',
    name: 'Ava Baker',
    profile_image_url: 'https://ui-avatars.com/api/?name=Ava+Baker&background=fab1a0&color=fff',
    strava_id: 12370,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '27',
    name: 'Theo Adams',
    profile_image_url: 'https://ui-avatars.com/api/?name=Theo+Adams&background=74b9ff&color=fff',
    strava_id: 12371,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
  {
    id: '28',
    name: 'Ruby Nelson',
    profile_image_url: 'https://ui-avatars.com/api/?name=Ruby+Nelson&background=a29bfe&color=fff',
    strava_id: 12372,
    opted_in_leaderboard: true,
    opted_in_globe: true,
    is_active: true,
  },
];

// Helper functions for stats
export const getWeeklyStats = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weeklyActivities = mockActivities.filter(
    (a) => new Date(a.start_date) >= weekAgo
  );

  const totalDistance = weeklyActivities.reduce((sum, a) => sum + a.distance, 0);
  return {
    distance: Math.round(totalDistance / 1000), // km
    activities: weeklyActivities.length,
    activeRunners: new Set(weeklyActivities.map(a => a.user_id)).size,
  };
};

export const getMonthlyStats = () => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const monthlyActivities = mockActivities.filter(
    (a) => new Date(a.start_date) >= monthAgo
  );

  const totalDistance = monthlyActivities.reduce((sum, a) => sum + a.distance, 0);
  return {
    distance: Math.round(totalDistance / 1000), // km
    activities: monthlyActivities.length,
    activeRunners: new Set(monthlyActivities.map(a => a.user_id)).size,
  };
};

export const getLeaderboard = (period: 'week' | 'month' = 'month') => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - (period === 'week' ? 7 : 30));

  const recentActivities = mockActivities.filter(
    (a) => new Date(a.start_date) >= cutoffDate
  );

  const userStats = mockUsers
    .filter(u => u.opted_in_leaderboard && u.is_active)
    .map((user) => {
      const userActivities = recentActivities.filter((a) => a.user_id === user.id);
      const totalDistance = userActivities.reduce((sum, a) => sum + a.distance, 0);

      return {
        user,
        distance: totalDistance,
        activityCount: userActivities.length,
      };
    })
    .sort((a, b) => b.distance - a.distance);

  return userStats;
};

export const getRecentActivitiesForGlobe = () => {
  // Get last activity per user from last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const recentActivities = mockActivities.filter(
    (a) => new Date(a.start_date) >= weekAgo
  );

  const lastActivityPerUser = new Map<string, Activity>();

  recentActivities.forEach((activity) => {
    const user = mockUsers.find(u => u.id === activity.user_id);
    if (user?.opted_in_globe && user.is_active) {
      const existing = lastActivityPerUser.get(activity.user_id);
      if (!existing || new Date(activity.start_date) > new Date(existing.start_date)) {
        lastActivityPerUser.set(activity.user_id, activity);
      }
    }
  });

  return Array.from(lastActivityPerUser.values());
};

// lib/mock-data.ts - replace generateActivities function

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Replace ENTIRE generateActivities function with this:
const generateActivities = (): Activity[] => {
  const activities: Activity[] = [];
  const types: Activity['type'][] = ['Run', 'Walk', 'Ride', 'TrailRun'];
  const baseDate = new Date('2026-02-03'); // Fixed date for consistency

  mockUsers.forEach((user, userIndex) => {
    // Use seeded random instead of Math.random()
    const activityCount = Math.floor(seededRandom(userIndex * 100) * 8) + 8;

    for (let i = 0; i < activityCount; i++) {
      const seed = userIndex * 1000 + i;
      
      const daysAgo = Math.floor(seededRandom(seed) * 30);
      const date = new Date(baseDate);
      date.setDate(date.getDate() - daysAgo);

      const typeIndex = Math.floor(seededRandom(seed + 1) * types.length);
      const type = types[typeIndex];
      
      const routeIndex = Math.floor(seededRandom(seed + 2) * winchesterRoutes.length);
      const route = winchesterRoutes[routeIndex];
      
      const distance = type === 'Ride' 
        ? Math.floor(seededRandom(seed + 3) * 50000) + 20000
        : Math.floor(seededRandom(seed + 4) * 15000) + 3000;

      activities.push({
        id: `activity-${user.id}-${i}`,
        user_id: user.id,
        user_name: user.name,
        type,
        name: route.name,
        distance,
        moving_time: Math.floor(distance / (type === 'Ride' ? 7 : 3.5)),
        start_date: date.toISOString(),
        polyline: JSON.stringify(route.coords),
      });
    }
  });

  return activities.sort((a, b) => 
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
};
export const mockActivities = generateActivities();