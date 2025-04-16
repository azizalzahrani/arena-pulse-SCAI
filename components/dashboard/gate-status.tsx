"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createActionClient } from "@/lib/supabase"

// Define the Gate type
type Gate = {
  id: string
  name: string
  arabic_name?: string
  status: string
  capacity: number
  current_flow: number
}

// Sample data to use when the database is not available
const sampleGates = [
  {
    id: "1",
    name: "North Gate",
    arabic_name: "البوابة الشمالية",
    status: "open",
    capacity: 200,
    current_flow: 120,
  },
  {
    id: "2",
    name: "South Gate",
    arabic_name: "البوابة الجنوبية",
    status: "open",
    capacity: 200,
    current_flow: 160,
  },
  {
    id: "3",
    name: "East Gate",
    arabic_name: "البوابة الشرقية",
    status: "open",
    capacity: 200,
    current_flow: 90,
  },
  {
    id: "4",
    name: "West Gate",
    arabic_name: "البوابة الغربية",
    status: "open",
    capacity: 200,
    current_flow: 150,
  },
  {
    id: "5",
    name: "VIP Entrance",
    arabic_name: "مدخل كبار الشخصيات",
    status: "open",
    capacity: 50,
    current_flow: 15,
  },
]

export function GateStatus() {
  const [gates, setGates] = useState<Gate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGates() {
      try {
        const supabase = createActionClient()

        // Try different table names to find the one that works
        let data = null
        const error = null

        // First try with the schema prefix naming convention
        const result1 = await supabase.from("arena_pulse_gates").select("*")
        if (!result1.error) {
          data = result1.data
        } else {
          // If that fails, try with the original schema approach
          const result2 = await supabase.from("gates").select("*")
          if (!result2.error) {
            data = result2.data
          } else {
            // If both fail, use sample data
            console.log("Using sample data as fallback")
            data = sampleGates
          }
        }

        setGates(data || [])
      } catch (err) {
        console.error("Error fetching gates:", err)
        setError("Failed to load gate status. Using sample data instead.")
        setGates(sampleGates)
      } finally {
        setLoading(false)
      }
    }

    fetchGates()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gate Status</CardTitle>
          <p className="text-sm text-muted-foreground">Loading entry point capacity...</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-40 flex items-center justify-center">
            <p>Loading gate data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Display gate data (either from database or sample data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gate Status</CardTitle>
        <p className="text-sm text-muted-foreground">Current entry point capacity</p>
        {error && <p className="text-xs text-amber-500">{error}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {gates.map((gate) => {
          const percentageOccupied = Math.round((gate.current_flow / gate.capacity) * 100)

          return (
            <div key={gate.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{gate.name}</h3>
                  <p className="text-xs text-muted-foreground">{gate.arabic_name}</p>
                </div>
                <span className="text-sm font-medium">
                  {percentageOccupied}% ({gate.current_flow}/{gate.capacity})
                </span>
              </div>
              <Progress value={percentageOccupied} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
