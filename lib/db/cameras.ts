import { createClient } from "@/lib/supabase"
import { getTableName } from "./table-utils"

export type Camera = {
  id: string
  name: string
  arabic_name?: string
  location: string
  status: "active" | "inactive" | "maintenance"
  detection_count: number
  sentiment_score: number
  anomaly_count: number
  image_url?: string
  created_at: string
  updated_at: string
}

// Sample data to use when the database is not available
export const sampleCameras = [
  {
    id: "1",
    name: "Gate A Camera",
    arabic_name: "كاميرا البوابة أ",
    location: "North Entrance",
    status: "active",
    detection_count: 145,
    sentiment_score: 0.78,
    anomaly_count: 0,
    image_url: "/camera-feeds/gate-a.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Food Court Camera",
    arabic_name: "كاميرا ساحة الطعام",
    location: "Main Concourse",
    status: "active",
    detection_count: 287,
    sentiment_score: 0.92,
    anomaly_count: 0,
    image_url: "/camera-feeds/food-court.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "North Parking Camera",
    arabic_name: "كاميرا موقف السيارات الشمالي",
    location: "North Parking Lot",
    status: "active",
    detection_count: 56,
    sentiment_score: 0.65,
    anomaly_count: 2,
    image_url: "/camera-feeds/parking-north.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Emergency Exit Camera",
    arabic_name: "كاميرا مخرج الطوارئ",
    location: "East Wing",
    status: "inactive",
    detection_count: 0,
    sentiment_score: 0,
    anomaly_count: 0,
    image_url: "/camera-feeds/emergency-exit.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "VIP Section Camera",
    arabic_name: "كاميرا قسم كبار الشخصيات",
    location: "VIP Lounge",
    status: "active",
    detection_count: 32,
    sentiment_score: 0.88,
    anomaly_count: 0,
    image_url: "/camera-feeds/vip-section.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Cache the table name to avoid repeated lookups
let camerasTableName: string | null = null

export async function getCameras(): Promise<Camera[]> {
  try {
    const supabase = createClient()

    // Get the correct table name (cached after first lookup)
    if (!camerasTableName) {
      camerasTableName = await getTableName("cameras")
    }

    const { data, error } = await supabase.from(camerasTableName).select("*").order("name")

    if (error) {
      console.error("Error fetching cameras:", error)
      return sampleCameras
    }

    return data || sampleCameras
  } catch (error) {
    console.error("Error fetching cameras:", error)
    return sampleCameras
  }
}

export async function getCameraById(id: string): Promise<Camera | null> {
  try {
    const supabase = createClient()

    // Get the correct table name (cached after first lookup)
    if (!camerasTableName) {
      camerasTableName = await getTableName("cameras")
    }

    const { data, error } = await supabase.from(camerasTableName).select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching camera:", error)
      return sampleCameras.find((camera) => camera.id === id) || null
    }

    return data
  } catch (error) {
    console.error("Error fetching camera:", error)
    return sampleCameras.find((camera) => camera.id === id) || null
  }
}
