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

-- Insert sample cameras data if table is empty
INSERT INTO arena_pulse_cameras (name, location, status, detection_count, sentiment_score, anomaly_count, image_url)
SELECT 'North Gate Camera', 'North Gate', 'online', 120, 0.75, 2, '/camera-feeds/gate-a.jpg'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_cameras LIMIT 1);

INSERT INTO arena_pulse_cameras (name, location, status, detection_count, sentiment_score, anomaly_count, image_url)
SELECT 'Food Court Camera', 'Food Court', 'online', 85, 0.82, 0, '/camera-feeds/food-court.jpg'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_cameras LIMIT 1);

INSERT INTO arena_pulse_cameras (name, location, status, detection_count, sentiment_score, anomaly_count, image_url)
SELECT 'Parking North Camera', 'North Parking Lot', 'online', 45, 0.65, 1, '/camera-feeds/parking-north.jpg'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_cameras LIMIT 1);

INSERT INTO arena_pulse_cameras (name, location, status, detection_count, sentiment_score, anomaly_count, image_url)
SELECT 'VIP Section Camera', 'VIP Section', 'offline', 0, 0, 0, '/camera-feeds/vip-section.jpg'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_cameras LIMIT 1);

INSERT INTO arena_pulse_cameras (name, location, status, detection_count, sentiment_score, anomaly_count, image_url)
SELECT 'Emergency Exit Camera', 'Emergency Exit', 'online', 5, 0.3, 3, '/camera-feeds/emergency-exit.jpg'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_cameras LIMIT 1);

-- Insert sample events data if table is empty
INSERT INTO arena_pulse_events (title, description, start_time, end_time, location, event_type, capacity)
SELECT 
  'Football Match: Al-Hilal vs Al-Nassr', 
  'Saudi Pro League match between Al-Hilal and Al-Nassr', 
  NOW() + INTERVAL '1 day', 
  NOW() + INTERVAL '1 day 2 hours', 
  'Main Stadium', 
  'sports', 
  60000
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_events LIMIT 1);

INSERT INTO arena_pulse_events (title, description, start_time, end_time, location, event_type, capacity)
SELECT 
  'Concert: Mohammed Abdu', 
  'Live concert featuring Mohammed Abdu', 
  NOW() + INTERVAL '2 days', 
  NOW() + INTERVAL '2 days 3 hours', 
  'Main Stadium', 
  'concert', 
  55000
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_events LIMIT 1);

INSERT INTO arena_pulse_events (title, description, start_time, end_time, location, event_type, capacity)
SELECT 
  'Community Event: Family Day', 
  'Family-friendly activities and entertainment',
  NOW() + INTERVAL '3 days', 
  NOW() + INTERVAL '3 days 6 hours', 
  'Stadium Grounds', 
  'community', 
  30000
WHERE NOT EXISTS (SELECT 1 FROM events LIMIT 1);
