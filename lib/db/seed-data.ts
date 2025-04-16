import { supabase } from "./index"

export async function seedGates() {
  const gates = [
    {
      name: "Main Entrance",
      arabic_name: "المدخل الرئيسي",
      status: "open",
      type: "main",
      auto_mode: true,
      capacity: 5000,
      current_flow: 120,
      security_level: "normal",
    },
    {
      name: "VIP Gate",
      arabic_name: "بوابة كبار الشخصيات",
      status: "open",
      type: "vip",
      auto_mode: false,
      capacity: 1000,
      current_flow: 45,
      security_level: "elevated",
    },
    {
      name: "Family Gate",
      arabic_name: "بوابة العائلات",
      status: "open",
      type: "family",
      auto_mode: true,
      capacity: 3000,
      current_flow: 78,
      security_level: "normal",
    },
    {
      name: "Emergency Exit A",
      arabic_name: "مخرج الطوارئ أ",
      status: "closed",
      type: "emergency",
      auto_mode: false,
      capacity: 2000,
      current_flow: 0,
      security_level: "normal",
    },
    {
      name: "Service Entrance",
      arabic_name: "مدخل الخدمة",
      status: "partial",
      type: "service",
      auto_mode: false,
      capacity: 500,
      current_flow: 15,
      security_level: "normal",
    },
  ]

  const { error } = await supabase.from("arena_pulse.gates").upsert(
    gates.map((gate) => ({
      ...gate,
      last_activity: new Date().toISOString(),
    })),
  )

  if (error) {
    console.error("Error seeding gates:", error)
    throw error
  }

  console.log("Gates seeded successfully")
}

export async function seedParkingAreas() {
  const parkingAreas = [
    {
      name: "North Parking",
      arabic_name: "موقف سيارات شمالي",
      type: "general",
      capacity: 1000,
      occupied: 350,
      status: "normal",
      location: "North side of stadium",
    },
    {
      name: "VIP Parking",
      arabic_name: "موقف سيارات كبار الشخصيات",
      type: "vip",
      capacity: 200,
      occupied: 120,
      status: "busy",
      location: "East entrance",
    },
    {
      name: "Handicapped Parking",
      arabic_name: "موقف سيارات لذوي الاحتياجات الخاصة",
      type: "handicapped",
      capacity: 100,
      occupied: 30,
      status: "normal",
      location: "Near main entrance",
    },
    {
      name: "South Parking",
      arabic_name: "موقف سيارات جنوبي",
      type: "general",
      capacity: 800,
      occupied: 750,
      status: "busy",
      location: "South side of stadium",
    },
    {
      name: "West Parking",
      arabic_name: "موقف سيارات غربي",
      type: "general",
      capacity: 600,
      occupied: 580,
      status: "full",
      location: "West side of stadium",
    },
  ]

  const { error } = await supabase.from("arena_pulse.parking_areas").upsert(parkingAreas)

  if (error) {
    console.error("Error seeding parking areas:", error)
    throw error
  }

  console.log("Parking areas seeded successfully")
}

export async function seedCameras() {
  const cameras = [
    {
      name: "Main Entrance Camera",
      arabic_name: "كاميرا المدخل الرئيسي",
      location: "Main Entrance",
      status: "active",
      detection_count: 245,
      sentiment_score: 0.75,
      anomaly_count: 2,
      image_url: "/camera-feeds/gate-a.jpg",
    },
    {
      name: "VIP Section Camera",
      arabic_name: "كاميرا قسم كبار الشخصيات",
      location: "VIP Section",
      status: "active",
      detection_count: 87,
      sentiment_score: 0.92,
      anomaly_count: 0,
      image_url: "/camera-feeds/vip-section.jpg",
    },
    {
      name: "Food Court Camera",
      arabic_name: "كاميرا ساحة الطعام",
      location: "Food Court",
      status: "active",
      detection_count: 178,
      sentiment_score: 0.68,
      anomaly_count: 1,
      image_url: "/camera-feeds/food-court.jpg",
    },
    {
      name: "Parking North Camera",
      arabic_name: "كاميرا موقف السيارات الشمالي",
      location: "North Parking",
      status: "active",
      detection_count: 132,
      sentiment_score: 0.65,
      anomaly_count: 3,
      image_url: "/camera-feeds/parking-north.jpg",
    },
    {
      name: "Emergency Exit Camera",
      arabic_name: "كاميرا مخرج الطوارئ",
      location: "Emergency Exit",
      status: "maintenance",
      detection_count: 0,
      sentiment_score: 0,
      anomaly_count: 0,
      image_url: "/camera-feeds/emergency-exit.jpg",
    },
    {
      name: "Concourse Camera",
      arabic_name: "كاميرا الممر",
      location: "Main Concourse",
      status: "active",
      detection_count: 215,
      sentiment_score: 0.72,
      anomaly_count: 1,
      image_url: "/camera-feeds/concourse.jpg",
    },
    {
      name: "Family Section Camera",
      arabic_name: "كاميرا قسم العائلات",
      location: "Family Section",
      status: "active",
      detection_count: 156,
      sentiment_score: 0.85,
      anomaly_count: 0,
      image_url: "/camera-feeds/family-section.jpg",
    },
    {
      name: "Prayer Area Camera",
      arabic_name: "كاميرا منطقة الصلاة",
      location: "Prayer Area",
      status: "active",
      detection_count: 89,
      sentiment_score: 0.9,
      anomaly_count: 0,
      image_url: "/camera-feeds/prayer-area.jpg",
    },
  ]

  const { error } = await supabase.from("arena_pulse.cameras").upsert(cameras)

  if (error) {
    console.error("Error seeding cameras:", error)
    throw error
  }

  console.log("Cameras seeded successfully")
}

export async function seedPrayerFacilities() {
  const prayerFacilities = [
    {
      name: "Main Prayer Hall",
      arabic_name: "قاعة الصلاة الرئيسية",
      capacity: 500,
      current_occupancy: 120,
      location: "Ground Floor, East Wing",
      status: "available",
    },
    {
      name: "VIP Prayer Room",
      arabic_name: "غرفة صلاة كبار الشخصيات",
      capacity: 50,
      current_occupancy: 15,
      location: "VIP Section, Level 2",
      status: "available",
    },
    {
      name: "Family Prayer Area",
      arabic_name: "منطقة صلاة العائلات",
      capacity: 200,
      current_occupancy: 180,
      location: "Family Section, Level 1",
      status: "near_capacity",
    },
    {
      name: "North Wing Prayer Room",
      arabic_name: "غرفة صلاة الجناح الشمالي",
      capacity: 150,
      current_occupancy: 45,
      location: "North Wing, Level 1",
      status: "available",
    },
    {
      name: "Staff Prayer Room",
      arabic_name: "غرفة صلاة الموظفين",
      capacity: 30,
      current_occupancy: 5,
      location: "Staff Area, Ground Floor",
      status: "available",
    },
  ]

  const { error } = await supabase.from("arena_pulse.prayer_facilities").upsert(prayerFacilities)

  if (error) {
    console.error("Error seeding prayer facilities:", error)
    throw error
  }

  console.log("Prayer facilities seeded successfully")
}

export async function seedEvents() {
  const events = [
    {
      title: "Al-Hilal vs Al-Nassr",
      date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // 2 days from now
      time: "19:00:00",
      location: "Main Stadium",
      type: "match",
      status: "confirmed",
      expected_attendance: 45000,
      capacity: 50000,
      description: "Saudi Pro League match between Al-Hilal and Al-Nassr",
    },
    {
      title: "Riyadh Season Concert",
      date: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0], // 5 days from now
      time: "20:30:00",
      location: "Main Stadium",
      type: "concert",
      status: "confirmed",
      expected_attendance: 40000,
      capacity: 50000,
      description: "Major concert featuring international artists",
    },
    {
      title: "Saudi Cup Ceremony",
      date: new Date(Date.now() + 86400000 * 10).toISOString().split("T")[0], // 10 days from now
      time: "18:00:00",
      location: "VIP Hall",
      type: "ceremony",
      status: "scheduled",
      expected_attendance: 2000,
      capacity: 2500,
      description: "Award ceremony for the Saudi Cup horse racing event",
    },
    {
      title: "Al-Ahli vs Al-Ittihad",
      date: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0], // 7 days from now
      time: "19:30:00",
      location: "Main Stadium",
      type: "match",
      status: "scheduled",
      expected_attendance: 42000,
      capacity: 50000,
      description: "Saudi Pro League match between Al-Ahli and Al-Ittihad",
    },
    {
      title: "Youth Football Tournament",
      date: new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0], // 14 days from now
      time: "09:00:00",
      location: "Training Fields",
      type: "other",
      status: "scheduled",
      expected_attendance: 5000,
      capacity: 8000,
      description: "Annual youth football tournament featuring teams from across the region",
    },
  ]

  const { error } = await supabase.from("arena_pulse.events").upsert(events)

  if (error) {
    console.error("Error seeding events:", error)
    throw error
  }

  console.log("Events seeded successfully")
}

export async function seedStadiumMetrics() {
  const metrics = {
    metric_date: new Date().toISOString().split("T")[0],
    total_attendance: 32450,
    capacity_percentage: 65,
    entry_rate: 1200,
    active_alerts: 3,
    weather_temperature: 32.5,
    weather_condition: "Clear",
  }

  const { error } = await supabase.from("arena_pulse.stadium_metrics").upsert([metrics])

  if (error) {
    console.error("Error seeding stadium metrics:", error)
    throw error
  }

  console.log("Stadium metrics seeded successfully")
}

export async function seedDatabase() {
  try {
    await seedGates()
    await seedParkingAreas()
    await seedCameras()
    await seedPrayerFacilities()
    await seedEvents()
    await seedStadiumMetrics()
    return { success: true, message: "Database seeded successfully" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, message: "Error seeding database", error }
  }
}
