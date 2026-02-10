// app/api/cron/sync-strava/route.ts

console.log('🔥 ROUTE FILE LOADED');

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getStravaActivities, refreshStravaToken } from '@/lib/strava';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  // Simple auth check - replace with proper secret in production
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Starting Strava sync...');
  const results = {
    synced: 0,
    errors: 0,
    newActivities: 0,
  };

  try {
    // Get all active users with Strava accounts
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, strava_id, name, last_synced_at')
      .eq('is_active', true)
      .not('strava_id', 'is', null);

    if (usersError) throw usersError;

    console.log(`Found ${users?.length || 0} users to sync`);

    for (const user of users || []) {
      try {
        // Get user's Strava access token
        const { data: account } = await supabase
          .from('accounts')
          .select('access_token, refresh_token, expires_at')
          .eq('user_id', user.id)
          .eq('provider', 'strava')
          .single();

        if (!account) {
          console.log(`No Strava account found for user ${user.name}`);
          continue;
        }

        let accessToken = account.access_token;

        // Refresh token if expired
        if (account.expires_at && account.expires_at < Date.now() / 1000) {
          console.log(`Refreshing token for ${user.name}`);
          const newTokens = await refreshStravaToken(account.refresh_token);
          accessToken = newTokens.access_token;

          // Update stored tokens
          await supabase
            .from('accounts')
            .update({
              access_token: newTokens.access_token,
              refresh_token: newTokens.refresh_token,
              expires_at: newTokens.expires_at,
            })
            .eq('user_id', user.id)
            .eq('provider', 'strava');
        }

        // Fetch activities since last sync (or last 30 days if first sync)
        const after = user.last_synced_at 
          ? new Date(user.last_synced_at)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        // After fetching activities (around line 75)
        const activities = await getStravaActivities(accessToken, after);

        console.log(`Found ${activities.length} activities for ${user.name}`);
        console.log('Activity types:', activities.map(a => a.type)); // Add this
        console.log('Fetching activities after:', after); // Add this
        console.log('Raw activities:', JSON.stringify(activities.slice(0, 2), null, 2)); // Add this

        // Filter for relevant activity types
        const relevantTypes = ['Run', 'Walk', 'Ride', 'TrailRun', 'Hike'];
        const filteredActivities = activities.filter(a => 
          relevantTypes.includes(a.type)
        );

        console.log(`Filtered to ${filteredActivities.length} relevant activities`); // Add this

        console.log(`Found ${activities.length} activities for ${user.name}`);

        // Insert activities (skip duplicates)
        for (const activity of filteredActivities) {
          const { error: insertError } = await supabase
            .from('activities')
            .insert({
              strava_activity_id: activity.id,
              user_id: user.id,
              type: activity.type,
              name: activity.name,
              distance: activity.distance,
              moving_time: activity.moving_time,
              start_date: activity.start_date,
              polyline: activity.map?.summary_polyline || null,
            })
            .select();

          if (!insertError) {
            results.newActivities++;
          }
          // Ignore duplicate errors (constraint violation)
        }

        // Update last synced timestamp
        await supabase
          .from('users')
          .update({ last_synced_at: new Date().toISOString() })
          .eq('id', user.id);

        results.synced++;

        // Rate limiting: small delay between users
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error syncing user ${user.name}:`, error);
        results.errors++;
      }
    }

    console.log('Sync complete:', results);
    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json(
      { error: 'Sync failed', details: error },
      { status: 500 }
    );
  }
}