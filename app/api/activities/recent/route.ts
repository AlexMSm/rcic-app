// app/api/activities/recent/route.ts
import { NextResponse } from 'next/server';
import { getRecentActivitiesForGlobe } from '@/lib/db';

export async function GET() {
  try {
    const activities = await getRecentActivitiesForGlobe();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}