-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create gates table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  arabic_name TEXT,
  status TEXT NOT NULL,
  type TEXT NOT NULL,
  auto_mode BOOLEAN DEFAULT false,
  capacity INTEGER NOT NULL,
  current_flow INTEGER NOT NULL DEFAULT 0,
  security_level TEXT NOT NULL DEFAULT 'normal',
  last_activity TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cameras table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_cameras (
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

-- Create events table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_events (
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

-- Insert sample gates data if table is empty
INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'North Gate', 'البوابة الشمالية', 'open', 'main', true, 200, 120, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'South Gate', 'البوابة الجنوبية', 'closed', 'vip', false, 200, 0, 'high'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'East Gate', 'البوابة الشرقية', 'open', 'staff', true, 200, 90, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'West Gate', 'البوابة الغربية', 'maintenance', 'emergency', false, 200, 0, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'VIP Entrance', 'مدخل كبار الشخصيات', 'open', 'vip', true, 50, 15, 'high'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);
