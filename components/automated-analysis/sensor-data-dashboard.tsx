"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAnalysisContext } from "@/contexts/analysis-context"

// Simulated sensor types
const SENSOR_TYPES = [
  { id: "motion", name: "Motion Sensors", unit: "movements", value: 42 },
  { id: "pressure", name: "Pressure Pads", unit: "kg/m²", value: 156 },
  { id: "thermal", name: "Thermal Sensors", unit: "°C", value: 24 },
  { id: "wifi", name: "WiFi Tracking", unit: "devices", value: 87 },
]

export function SensorDataDashboard() {
  const [activeSensor, setActiveSensor] = useState(SENSOR_TYPES[0].id)
  const [sensorData, setSensorData] = useState(SENSOR_TYPES)
  const { updateAnalysisData } = useAnalysisContext()

  // Use a ref to track if we've already updated the analysis data
  const hasUpdatedRef = useRef(false)

  // Update sensor data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: Math.max(1, sensor.value + Math.floor(Math.random() * 11) - 5),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update analysis context with sensor data - only once on mount
  useEffect(() => {
    if (hasUpdatedRef.current) return

    const motionSensor = sensorData.find((s) => s.id === "motion")?.value || 0
    const pressureSensor = sensorData.find((s) => s.id === "pressure")?.value || 0

    // Only update if we have valid data
    if (motionSensor && pressureSensor) {
      updateAnalysisData({
        // Use sensor data to refine crowd metrics
        crowdDensity: 2.1 * (1 + (motionSensor / 100 - 0.5) * 0.1),
        flowRate: 45 + (motionSensor / 100 - 0.5) * 2,
        occupancy: 65 + (pressureSensor / 200 - 0.4) * 5,
      })

      hasUpdatedRef.current = true
    }
  }, [sensorData, updateAnalysisData])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Sensor Network</CardTitle>
          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500">
            Live Data
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Real-time data from the venue's sensor network, providing additional crowd metrics.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeSensor} onValueChange={setActiveSensor}>
          <TabsList className="mb-2">
            {sensorData.map((sensor) => (
              <TabsTrigger key={sensor.id} value={sensor.id}>
                {sensor.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {sensorData.map((sensor) => (
            <TabsContent key={sensor.id} value={sensor.id} className="mt-0">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {sensor.value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{sensor.unit}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Current reading</div>
                </div>
                <div className="text-xs text-muted-foreground">Updated every 5 seconds</div>
              </div>

              <div className="h-[200px] bg-muted/20 rounded-md relative overflow-hidden">
                {/* Simulated chart */}
                <div className="absolute inset-0 flex items-end">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[5%] bg-primary/60"
                      style={{
                        height: `${20 + Math.sin(i * 0.5) * 15 + Math.random() * 30}%`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

