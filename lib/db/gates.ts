import { supabase } from "@/lib/supabase"
import { TableNames } from "./table-utils"

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

// Sample data to use as fallback
export const sampleGates: Gate[] = [
  {
    id: "1",
    name: "Gate A",
    arabic_name: "بوابة أ",
    status: "open",
    type: "main",
    auto_mode: true,
    capacity: 5000,
    current_flow: 120,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Gate B",
    arabic_name: "بوابة ب",
    status: "closed",
    type: "vip",
    auto_mode: false,
    capacity: 1000,
    current_flow: 0,
    security_level: "high",
    last_activity: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Gate C",
    arabic_name: "بوابة ج",
    status: "open",
    type: "staff",
    auto_mode: true,
    capacity: 500,
    current_flow: 45,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Gate D",
    arabic_name: "بوابة د",
    status: "maintenance",
    type: "emergency",
    auto_mode: false,
    capacity: 2000,
    current_flow: 0,
    security_level: "normal",
    last_activity: new Date().toISOString(),
  },
]

// Get the table name for gates
// const gatesTable = getTableName("gates")
// Use this instead:
const gatesTable = TableNames.GATES

export async function fetchGates(): Promise<Gate[]> {
  try {
    // Try to fetch from the prefixed table
    const { data, error } = await supabase.from(gatesTable).select("*")

    if (error) {
      console.error(`Error fetching from ${gatesTable}:`, error)

      // Try the unprefixed table as fallback
      const fallbackResult = await supabase.from("gates").select("*")

      if (fallbackResult.error) {
        console.error("Error fetching from gates:", fallbackResult.error)
        // Return sample data as fallback
        return sampleGates
      }

      return fallbackResult.data || []
    }

    return data || []
  } catch (err) {
    console.error("Error fetching gates:", err)
    // Return sample data as fallback
    return sampleGates
  }
}

export async function createGate(gate: Omit<Gate, "id" | "created_at" | "updated_at">): Promise<Gate | null> {
  try {
    const { data, error } = await supabase.from(gatesTable).insert(gate).select().single()

    if (error) {
      console.error(`Error creating gate in ${gatesTable}:`, error)
      return null
    }

    return data
  } catch (err) {
    console.error("Error creating gate:", err)
    return null
  }
}

export async function updateGate(
  id: string,
  gate: Partial<Omit<Gate, "id" | "created_at" | "updated_at">>,
): Promise<Gate | null> {
  try {
    const { data, error } = await supabase
      .from(gatesTable)
      .update({ ...gate, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating gate in ${gatesTable}:`, error)
      return null
    }

    return data
  } catch (err) {
    console.error("Error updating gate:", err)
    return null
  }
}

export async function deleteGate(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(gatesTable).delete().eq("id", id)

    if (error) {
      console.error(`Error deleting gate from ${gatesTable}:`, error)
      return false
    }

    return true
  } catch (err) {
    console.error("Error deleting gate:", err)
    return false
  }
}
