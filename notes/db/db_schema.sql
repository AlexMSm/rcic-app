CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  strava_id BIGINT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profile_image_url TEXT,
  email TEXT,
  is_admin BOOLEAN DEFAULT false,
  opted_in_leaderboard BOOLEAN DEFAULT true,
  opted_in_globe BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  strava_activity_id BIGINT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('Run', 'Walk', 'Ride', 'TrailRun', 'Hike')),
  name TEXT,
  distance NUMERIC CHECK (distance >= 0),
  moving_time INTEGER,
  start_date TIMESTAMP,
  polyline TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invite_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES users(id),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_user_date ON activities(user_id, start_date DESC);
CREATE INDEX idx_activities_recent ON activities(start_date DESC);