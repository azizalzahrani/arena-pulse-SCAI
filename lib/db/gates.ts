import { createClient } from "@/lib/supabase"
import { getTableName } from "./table-utils"

export type Gate = {
  id: string
  name: string
  arabic_name?: string
  status: string
  type: string
  auto_mode: boolean
  capacity: number
  current_flow: number
  security_level: string
  last_activity?: string
  created_at?: string
  updated_at?: string
}

// Sample data to use when the database is not available
export const sampleGates = [
  {
    id: "1",
    name: "North Gate",
    arabic_name: "البوابة الشمالية",
    status: "open",
    type: "entrance",
    auto_mode: true,
    capacity: 200,
    current_flow: 120,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
  {
    id: "2",
    name: "South Gate",
    arabic_name: "البوابة الجنوبية",
    status: "open",
    type: "entrance",
    auto_mode: true,
    capacity: 200,
    current_flow: 160,
    security_level: "elevated",
    last_activity: new Date().toISOString(),
  },
  {
    id: "3",
    name: "East Gate",
    arabic_name: "البوابة الشرقية",
    status: "open",
    type: "entrance",
    auto_mode: false,
    capacity: 200,
    current_flow: 90,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
  {
    id: "4",
    name: "West Gate",
    arabic_name: "البوابة الغربية",
    status: "open",
    type: "entrance",
    auto_mode: true,
    capacity: 200,
    current_flow: 150,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
  {
    id: "5",
    name: "VIP Entrance",
    arabic_name: "مدخل كبار الشخصيات",
    status: "open",
    type: "vip",
    auto_mode: false,
    capacity: 50,
    current_flow: 15,
    security_level: "high",
    last_activity: new Date().toISOString(),
  },
]

// Cache the table name to avoid repeated lookups
let gatesTableName: string | null = null

export async function getGates(): Promise<Gate[]> {
  try {
    const supabase = createClient()

    // Get the correct table name (cached after first lookup)
    if (!gatesTableName) {
      gatesTableName = await getTableName("gates")
    }

    const { data, error } = await supabase.from(gatesTableName).select("*")

    if (error) {
      console.error("Error fetching gates:", error)
      return sampleGates
    }

    return data || sampleGates
  } catch (error) {
    console.error("Exception fetching gates:", error)
    return sampleGates
  }
}

export async function getGateById(id: string): Promise<Gate | null> {
  try {
    const supabase = createClient()

    // Get the correct table name (cached after first lookup)
    if (!gatesTableName) {
      gatesTableName = await getTableName("gates")
    }

    const { data, error } = await supabase.from(gatesTableName).select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching gate:", error)
      return sampleGates.find((gate) => gate.id === id) || null
    }

    return data
  } catch (error) {
    console.error("Exception fetching gate:", error)
    return sampleGates.find((gate) => gate.id === id) || null
  }
}
