-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create gates table
CREATE TABLE IF NOT EXISTS gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  arabic_name TEXT,
  status TEXT NOT NULL,
  type TEXT NOT NULL,
  auto_mode BOOLEAN DEFAULT false,
  capacity INTEGER NOT NULL,
  current_flow INTEGER NOT NULL,
  security_level TEXT NOT NULL,
  last_activity TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cameras table
CREATE TABLE IF NOT EXISTS cameras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  detection_count INTEGER DEFAULT 0,
  sentiment_score FLOAT DEFAULT 0,
  anomaly_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  event_type TEXT NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
