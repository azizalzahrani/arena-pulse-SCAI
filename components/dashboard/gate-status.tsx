"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { LastUpdated } from "@/components/ui/last-updated"
import { AlertCircle, Loader2, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

// Sample data to use as fallback
const sampleGates = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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

type Gate = {
  id: string
  name: string
  arabic_name?: string
  status: string
  type?: string
  auto_mode?: boolean
  capacity: number
  current_flow: number
  security_level?: string
}

export function GateStatus() {
  const [gates, setGates] = useState<Gate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [usingSampleData, setUsingSampleData] = useState(false)
  const [setupInProgress, setSetupInProgress] = useState(false)
  const [tableExists, setTableExists] = useState(true)

  // Function to check if a table exists
  const checkTableExists = async (tableName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.from(tableName).select("*").limit(1)
      if (error) {
        console.warn(`Table ${tableName} does not exist:`, error.message)
        return false
      }
      return true
    } catch (error) {
      console.error(`Error checking table ${tableName}:`, error)
      return false
    }
  }

  useEffect(() => {
    async function fetchGates() {
      try {
        setLoading(true)
        setError(null)

        // Check if the table exists before attempting to fetch data
        const exists = await checkTableExists("arena_pulse_gates")
        setTableExists(exists)

        if (!exists) {
          console.warn("arena_pulse_gates table does not exist, using sample data")
          setGates(sampleGates)
          setUsingSampleData(true)
          setError("Database tables not set up. Please set up the database.")
          return // Exit early if the table doesn't exist
        }

        // Try to fetch from the arena_pulse_gates table in the public schema
        const { data, error } = await supabase.from("arena_pulse_gates").select("*")

        if (error) {
          console.error("Error fetching from arena_pulse_gates:", error)
          setError(`Database error: ${error.message}`)
          setGates(sampleGates)
          setUsingSampleData(true)
        } else {
          setGates(data || [])
          setUsingSampleData(data?.length === 0)
        }

        setLastUpdated(new Date())
      } catch (err) {
        console.error("Error fetching gates:", err)
        setError(`${err instanceof Error ? err.message : String(err)}`)
        // Use sample data as fallback
        setGates(sampleGates)
        setUsingSampleData(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGates()

    // Set up an interval to refresh the data every 30 seconds
    const intervalId = setInterval(fetchGates, 30000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-500"
      case "closed":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSetupDatabase = async () => {
    try {
      setSetupInProgress(true)
      const response = await fetch("/api/setup-db-direct", {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to set up database")
      }

      // Refresh the data
      window.location.reload()
    } catch (err) {
      console.error("Error setting up database:", err)
      setError(`Error setting up database: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setSetupInProgress(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Gate Status</CardTitle>
          <LastUpdated date={lastUpdated} />
        </div>
        <CardDescription>Current status of all stadium gates</CardDescription>
        {!tableExists && (
          <Alert variant="warning" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Database Tables Not Found</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>The required database tables don't exist. Sample data is being displayed.</p>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={handleSetupDatabase}
                  disabled={setupInProgress}
                  className="flex items-center gap-2"
                >
                  {setupInProgress ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <Database className="h-4 w-4" />
                      Create Database Tables
                    </>
                  )}
                </Button>
                <p className="text-sm mt-2">
                  <a href="/admin" className="text-blue-500 hover:underline inline-flex items-center">
                    Or visit the Admin Dashboard for more options
                  </a>
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        {error && tableExists && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        {loading && gates.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {gates.map((gate) => {
              const percentageOccupied = Math.round((gate.current_flow / gate.capacity) * 100)

              return (
                <div key={gate.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{gate.name}</h3>
                      <p className="text-xs text-muted-foreground">{gate.arabic_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${getStatusColor(gate.status)} text-white`}>
                        {gate.status.charAt(0).toUpperCase() + gate.status.slice(1)}
                      </Badge>
                      <span className="text-sm font-medium">
                        {percentageOccupied}% ({gate.current_flow}/{gate.capacity})
                      </span>
                    </div>
                  </div>
                  <Progress value={percentageOccupied} className="h-2" />
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
