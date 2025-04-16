import { NextResponse } from "next/server"
import { createActionClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createActionClient()

    // Seed gates
    const gates = [
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
        status: "open",
        type: "main",
        auto_mode: true,
        capacity: 200,
        current_flow: 160,
        security_level: "normal",
      },
      {
        name: "East Gate",
        arabic_name: "البوابة الشرقية",
        status: "open",
        type: "main",
        auto_mode: true,
        capacity: 200,
        current_flow: 90,
        security_level: "normal",
      },
      {
        name: "West Gate",
        arabic_name: "البوابة الغربية",
        status: "open",
        type: "main",
        auto_mode: true,
        capacity: 200,
        current_flow: 150,
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
        security_level: "elevated",
      },
    ]

    // Insert gates
    const { error: gatesError } = await supabase.from("arena_pulse.gates").insert(gates)
    if (gatesError) {
      console.error("Error seeding gates:", gatesError)
      return NextResponse.json({ error: "Failed to seed gates" }, { status: 500 })
    }

    // Seed cameras
    const cameras = [
      {
        name: "VIP Section",
        arabic_name: "قسم كبار الشخصيات",
        location: "West Stand, Level 2",
        status: "active",
        detection_count: 14,
        sentiment_score: 0.85,
        anomaly_count: 0,
        image_url: "/camera-feeds/vip-section.jpg",
      },
      {
        name: "Gate A",
        arabic_name: "البوابة أ",
        location: "North Entrance",
        status: "active",
        detection_count: 12,
        sentiment_score: 0.72,
        anomaly_count: 0,
        image_url: "/camera-feeds/gate-a.jpg",
      },
      {
        name: "Concourse",
        arabic_name: "الردهة",
        location: "Main Level",
        status: "active",
        detection_count: 23,
        sentiment_score: 0.68,
        anomaly_count: 1,
        image_url: "/camera-feeds/concourse.jpg",
      },
      {
        name: "Family Section",
        arabic_name: "قسم العائلات",
        location: "East Stand",
        status: "active",
        detection_count: 31,
        sentiment_score: 0.91,
        anomaly_count: 0,
        image_url: "/camera-feeds/family-section.jpg",
      },
      {
        name: "Prayer Area",
        arabic_name: "منطقة الصلاة",
        location: "South Concourse",
        status: "active",
        detection_count: 8,
        sentiment_score: 0.95,
        anomaly_count: 0,
        image_url: "/camera-feeds/prayer-area.jpg",
      },
    ]

    // Insert cameras
    const { error: camerasError } = await supabase.from("arena_pulse.cameras").insert(cameras)
    if (camerasError) {
      console.error("Error seeding cameras:", camerasError)
      return NextResponse.json({ error: "Failed to seed cameras" }, { status: 500 })
    }

    // Seed predictions
    const predictions = [
      {
        id: "pred-001",
        query: "Predict crowd flow for next weekend's match",
        result: {
          id: "pred-001",
          summary: "Expect 85% capacity with peak flow at gates A and C between 6-7pm",
          details:
            "Based on historical data and current ticket sales, we predict 85% stadium capacity. Gates A and C will experience the highest traffic between 6-7pm, with potential bottlenecks. Consider opening additional entry points during this period.",
          recommendations: [
            "Open additional entry points at Gates A and C between 6-7pm",
            "Increase staff at these locations by 30%",
            "Implement express entry for season ticket holders",
          ],
          impact: "high",
          confidence: 0.87,
          timestamp: new Date().toISOString(),
        },
        model: "gpt-4o",
        prediction_type: "crowd_flow",
        confidence_score: 0.87,
        created_at: new Date().toISOString(),
      },
      {
        id: "pred-002",
        query: "Analyze parking capacity for upcoming event",
        result: {
          id: "pred-002",
          summary: "North parking lot will reach capacity 45 minutes before event start",
          details:
            "Based on current trends and event type, the North parking lot will reach full capacity approximately 45 minutes before the event starts. South and East lots will have 30% and 45% availability respectively.",
          recommendations: [
            "Direct early arrivals to South and East lots",
            "Implement dynamic signage to show real-time availability",
            "Consider shuttle service from overflow parking",
          ],
          impact: "medium",
          confidence: 0.82,
          timestamp: new Date().toISOString(),
        },
        model: "gpt-4o",
        prediction_type: "parking",
        confidence_score: 0.82,
        created_at: new Date().toISOString(),
      },
    ]

    // Insert predictions
    const { error: predictionsError } = await supabase.from("arena_pulse.ai_predictions").insert(predictions)
    if (predictionsError) {
      console.error("Error seeding predictions:", predictionsError)
      return NextResponse.json({ error: "Failed to seed predictions" }, { status: 500 })
    }

    return NextResponse.json({ message: "Database seeded successfully!" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
