import { createClient } from "@/lib/supabase"

export type ParkingArea = {
  id: string
  name: string
  arabic_name?: string
  type: 'general' | 'vip' | 'handicapped'
  capacity: number
  occupied: number
  status: 'empty' | 'normal' | 'busy' | 'full'
  location: string
  coordinates?: any
  created_at: string
  updated_at: string
}

export async function getParkingAreas(): Promise<ParkingArea[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('arena_pulse.parking_areas')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching parking areas:", error)
    return []
  }
}

export async function getParkingAreaById(id: string): Promise<ParkingArea | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('arena_pulse.parking_areas')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching parking area:", error)
    return null
  }
}
