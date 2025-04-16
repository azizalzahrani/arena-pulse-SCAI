import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Sample data for seeding the database
const sampleGates = [
  {
    name: "North Gate",
    arabic_name: "البوابة الشمالية",
    status: "open",
    type: "main",
    auto_mode: true,
    capacity: 200,
    current_flow: 120,
    security_level: "normal",
  },
  {
    name: "South Gate",
    arabic_name: "البوابة الجنوبية",
    status: "closed",
    type: "vip",
    auto_mode: false,
    capacity: 200,
    current_flow: 0,
    security_level: "high",
  },
  {
    name: "East Gate",
    arabic_name: "البوابة الشرقية",
    status: "open",
    type: "staff",
    auto_mode: true,
    capacity: 200,
    current_flow: 90,
    security_level: "normal",
  },
  {
    name: "West Gate",
    arabic_name: "البوابة الغربية",
    status: "maintenance",
    type: "emergency",
    auto_mode: false,
    capacity: 200,
    current_flow: 0,
    security_level: "normal",
  },
  {
    name: "VIP Entrance",
    arabic_name: "مدخل كبار الشخصيات",
    status: "open",
    type: "vip",
    auto_mode: true,
    capacity: 50,
    current_flow: 15,
    security_level: "high",
  },
]

const sampleCameras = [
  {
    name: "North Gate Camera",
    location: "North Gate",
    status: "online",
    detection_count: 120,
    sentiment_score: 0.75,
    anomaly_count: 2,
    image_url: "/camera-feeds/gate-a.jpg",
  },
  {
    name: "Food Court Camera",
    location: "Food Court",
    status: "online",
    detection_count: 85,
    sentiment_score: 0.82,
    anomaly_count: 0,
    image_url: "/camera-feeds/food-court.jpg",
  },
  {
    name: "Parking North Camera",
    location: "North Parking Lot",
    status: "online",
    detection_count: 45,
    sentiment_score: 0.65,
    anomaly_count: 1,
    image_url: "/camera-feeds/parking-north.jpg",
  },
  {
    name: "VIP Section Camera",
    location: "VIP Section",
    status: "offline",
    detection_count: 0,
    sentiment_score: 0,
    anomaly_count: 0,
    image_url: "/camera-feeds/vip-section.jpg",
  },
  {
    name: "Emergency Exit Camera",
    location: "Emergency Exit",
    status: "online",
    detection_count: 5,
    sentiment_score: 0.3,
    anomaly_count: 3,
    image_url: "/camera-feeds/emergency-exit.jpg",
  },
]

const sampleEvents = [
  {
    title: "Football Match: Al-Hilal vs Al-Nassr",
    description: "Saudi Pro League match between Al-Hilal and Al-Nassr",
    start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    end_time: new Date(Date.now() + 86400000 + 7200000).toISOString(), // Tomorrow + 2 hours
    location: "Main Stadium",
    event_type: "sports",
    capacity: 60000,
  },
  {
    title: "Concert: Mohammed Abdu",
    description: "Live concert featuring Mohammed Abdu",
    start_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    end_time: new Date(Date.now() + 172800000 + 10800000).toISOString(), // Day after tomorrow + 3 hours
    location: "Main Stadium",
    event_type: "concert",
    capacity: 55000,
  },
  {
    title: "Community Event: Family Day",
    description: "Family-friendly activities and entertainment",
    start_time: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    end_time: new Date(Date.now() + 259200000 + 21600000).toISOString(), // 3 days from now + 6 hours
    location: "Stadium Grounds",
    event_type: "community",
    capacity: 30000,
  },
]

export async function POST() {
  try {
    // Step 1: Create tables using SQL
    await createTables()

    // Step 2: Seed tables with sample data
    await seedTables()

    return NextResponse.json({ success: true, message: "Database setup completed successfully" })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json(
      { error: `Error setting up database: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}

async function createTables() {
  console.log("Creating tables...")

  try {
    // Enable the supabase_functions extension
    const enableFunctionsExtension = `
      CREATE EXTENSION IF NOT EXISTS supabase_functions;
    `
    const { error: enableFunctionsError } = await supabase.rpc("exec_sql", {
      sql_query: enableFunctionsExtension,
    })

    if (enableFunctionsError) {
      console.error("Error enabling supabase_functions extension:", enableFunctionsError)
      throw new Error(`Failed to enable supabase_functions extension: ${enableFunctionsError.message}`)
    }

    // Create arena_pulse_gates table
    const createGatesTable = `
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
    `

    // Execute SQL directly using Supabase's SQL execution
    const { error: gatesError } = await supabase.rpc("exec_sql", { sql_query: createGatesTable })

    if (gatesError) {
      console.error("Error creating gates table:", gatesError)
      throw new Error(`Failed to create gates table: ${gatesError.message}`)
    }

    // Create arena_pulse_cameras table
    const createCamerasTable = `
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
    `

    const { error: camerasError } = await supabase.rpc("exec_sql", { sql_query: createCamerasTable })

    if (camerasError) {
      console.error("Error creating cameras table:", camerasError)
      throw new Error(`Failed to create cameras table: ${camerasError.message}`)
    }

    // Create arena_pulse_events table
    const createEventsTable = `
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
    `

    const { error: eventsError } = await supabase.rpc("exec_sql", { sql_query: createEventsTable })

    if (eventsError) {
      console.error("Error creating events table:", eventsError)
      throw new Error(`Failed to create events table: ${eventsError.message}`)
    }

    console.log("Tables created successfully")
  } catch (error) {
    console.error("Error in createTables:", error)
    throw error
  }
}

async function seedTables() {
  console.log("Seeding tables...")

  try {
    // Seed arena_pulse_gates table
    const { error: gatesError } = await supabase.from("arena_pulse_gates").insert(sampleGates)

    if (gatesError) {
      console.error("Error seeding gates table:", gatesError)
      throw new Error(`Failed to seed gates table: ${gatesError.message}`)
    }

    // Seed arena_pulse_cameras table
    const { error: camerasError } = await supabase.from("arena_pulse_cameras").insert(sampleCameras)

    if (camerasError) {
      console.error("Error seeding cameras table:", camerasError)
      throw new Error(`Failed to seed cameras table: ${camerasError.message}`)
    }

    // Seed arena_pulse_events table
    const { error: eventsError } = await supabase.from("arena_pulse_events").insert(sampleEvents)

    if (eventsError) {
      console.error("Error seeding events table:", eventsError)
      throw new Error(`Failed to seed events table: ${eventsError.message}`)
    }

    console.log("Tables seeded successfully")
  } catch (error) {
    console.error("Error in seedTables:", error)
    throw error
  }
}
