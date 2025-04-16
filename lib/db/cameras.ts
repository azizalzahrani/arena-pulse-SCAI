import { createClientComponentClient } from "@/lib/supabase"

export type Camera = {
  id: string
  name: string
  arabic_name?: string
  location: string
  status: string
  detection_count: number
  sentiment_score: number
  anomaly_count: number
  image_url?: string
  created_at?: string
  updated_at?: string
}

// Sample data to use as fallback
export const sampleCameras: Camera[] = [
  {
    id: "1",
    name: "Gate A Camera",
    arabic_name: "كاميرا بوابة أ",
    location: "Main Entrance",
    status: "online",
    detection_count: 156,
    sentiment_score: 0.78,
    anomaly_count: 2,
    image_url: "/camera-feeds/gate-a.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Food Court Camera",
    arabic_name: "كاميرا ساحة الطعام",
    location: "Food Court",
    status: "online",
    detection_count: 89,
    sentiment_score: 0.92,
    anomaly_count: 0,
    image_url: "/camera-feeds/food-court.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "VIP Entrance Camera",
    arabic_name: "كاميرا مدخل كبار الشخصيات",
    location: "VIP Section",
    status: "online",
    detection_count: 42,
    sentiment_score: 0.85,
    anomaly_count: 1,
    image_url: "/camera-feeds/vip-entrance.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Emergency Exit Camera",
    arabic_name: "كاميرا مخرج الطوارئ",
    location: "East Wing",
    status: "offline",
    detection_count: 0,
    sentiment_score: 0,
    anomaly_count: 0,
    image_url: "/camera-feeds/emergency-exit.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Parking North Camera",
    arabic_name: "كاميرا موقف السيارات الشمالي",
    location: "North Parking Lot",
    status: "online",
    detection_count: 203,
    sentiment_score: 0.65,
    anomaly_count: 5,
    image_url: "/camera-feeds/parking-north.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Concourse Camera",
    arabic_name: "كاميرا الممر",
    location: "Main Concourse",
    status: "online",
    detection_count: 178,
    sentiment_score: 0.72,
    anomaly_count: 3,
    image_url: "/camera-feeds/concourse.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Family Section Camera",
    arabic_name: "كاميرا قسم العائلة",
    location: "Family Section",
    status: "online",
    detection_count: 112,
    sentiment_score: 0.88,
    anomaly_count: 1,
    image_url: "/camera-feeds/family-section.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Prayer Area Camera",
    arabic_name: "كاميرا منطقة الصلاة",
    location: "Prayer Facilities",
    status: "online",
    detection_count: 67,
    sentiment_score: 0.95,
    anomaly_count: 0,
    image_url: "/camera-feeds/prayer-area.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function fetchCameras(): Promise<Camera[]> {
  try {
    const supabase = createClientComponentClient()

    // Try to fetch from the cameras table
    const { data, error } = await supabase.from("cameras").select("*")

    if (error) {
      console.error("Error fetching cameras:", error)
      // Return sample data as fallback
      return sampleCameras
    }

    return data || []
  } catch (err) {
    console.error("Error fetching cameras:", err)
    // Return sample data as fallback
    return sampleCameras
  }
}

export async function createCamera(camera: Omit<Camera, "id" | "created_at" | "updated_at">): Promise<Camera | null> {
  try {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase.from("cameras").insert(camera).select().single()

    if (error) {
      console.error("Error creating camera:", error)
      return null
    }

    return data
  } catch (err) {
    console.error("Error creating camera:", err)
    return null
  }
}

export async function updateCamera(
  id: string,
  camera: Partial<Omit<Camera, "id" | "created_at" | "updated_at">>,
): Promise<Camera | null> {
  try {
    const supabase = createClientComponentClient()

    const { data, error } = await supabase
      .from("cameras")
      .update({ ...camera, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating camera:", error)
      return null
    }

    return data
  } catch (err) {
    console.error("Error updating camera:", err)
    return null
  }
}

export async function deleteCamera(id: string): Promise<boolean> {
  try {
    const supabase = createClientComponentClient()

    const { error } = await supabase.from("cameras").delete().eq("id", id)

    if (error) {
      console.error("Error deleting camera:", error)
      return false
    }

    return true
  } catch (err) {
    console.error("Error deleting camera:", err)
    return false
  }
}
