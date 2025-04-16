import { createClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { sampleGates } from "@/lib/db/gates"
import { sampleCameras } from "@/lib/db/cameras"

export async function GET() {
  try {
    const supabase = createClient()

    // Create gates table if it doesn't exist
    const { error: gatesTableError } = await supabase.rpc("create_table_if_not_exists", {
      table_name: "gates",
      table_definition: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        arabic_name TEXT,
        status TEXT NOT NULL,
        type TEXT NOT NULL,
        auto_mode BOOLEAN DEFAULT false,
        capacity INTEGER NOT NULL,
        current_flow INTEGER DEFAULT 0,
        security_level TEXT DEFAULT 'normal',
        last_activity TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `,
    })

    if (gatesTableError) {
      console.error("Error creating gates table:", gatesTableError)

      // Try direct SQL approach as fallback
      const { error: createGatesError } = await supabase.from("gates").select("*", { count: "exact", head: true })

      if (createGatesError) {
        // Table doesn't exist, try to create it
        const { error: createTableError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS gates (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            arabic_name TEXT,
            status TEXT NOT NULL,
            type TEXT NOT NULL,
            auto_mode BOOLEAN DEFAULT false,
            capacity INTEGER NOT NULL,
            current_flow INTEGER DEFAULT 0,
            security_level TEXT DEFAULT 'normal',
            last_activity TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `)

        if (createTableError) {
          console.error("Error creating gates table with direct SQL:", createTableError)
        }
      }
    }

    // Create cameras table if it doesn't exist
    const { error: camerasTableError } = await supabase.rpc("create_table_if_not_exists", {
      table_name: "cameras",
      table_definition: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        arabic_name TEXT,
        location TEXT NOT NULL,
        status TEXT NOT NULL,
        detection_count INTEGER DEFAULT 0,
        sentiment_score FLOAT DEFAULT 0,
        anomaly_count INTEGER DEFAULT 0,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `,
    })

    if (camerasTableError) {
      console.error("Error creating cameras table:", camerasTableError)

      // Try direct SQL approach as fallback
      const { error: createCamerasError } = await supabase.from("cameras").select("*", { count: "exact", head: true })

      if (createCamerasError) {
        // Table doesn't exist, try to create it
        const { error: createTableError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS cameras (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            arabic_name TEXT,
            location TEXT NOT NULL,
            status TEXT NOT NULL,
            detection_count INTEGER DEFAULT 0,
            sentiment_score FLOAT DEFAULT 0,
            anomaly_count INTEGER DEFAULT 0,
            image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `)

        if (createTableError) {
          console.error("Error creating cameras table with direct SQL:", createTableError)
        }
      }
    }

    // Seed gates data if table is empty
    const { count: gatesCount, error: gatesCountError } = await supabase
      .from("gates")
      .select("*", { count: "exact", head: true })

    if (!gatesCountError && (gatesCount === 0 || gatesCount === null)) {
      // Table exists but is empty, seed it
      const { error: seedGatesError } = await supabase.from("gates").insert(sampleGates.map(({ id, ...gate }) => gate)) // Remove id to let DB generate it

      if (seedGatesError) {
        console.error("Error seeding gates data:", seedGatesError)
      }
    }

    // Seed cameras data if table is empty
    const { count: camerasCount, error: camerasCountError } = await supabase
      .from("cameras")
      .select("*", { count: "exact", head: true })

    if (!camerasCountError && (camerasCount === 0 || camerasCount === null)) {
      // Table exists but is empty, seed it
      const { error: seedCamerasError } = await supabase
        .from("cameras")
        .insert(sampleCameras.map(({ id, created_at, updated_at, ...camera }) => camera)) // Remove id and timestamps

      if (seedCamerasError) {
        console.error("Error seeding cameras data:", seedCamerasError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed. Tables created and seeded if needed.",
    })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error setting up database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
