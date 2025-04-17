"use client"

import { X, Clock, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ParkingArea {
  id: string
  name: string
  capacity: number
  occupied: number
  status: string
}

interface ParkingSpotDetailsProps {
  area: ParkingArea
  onClose: () => void
}

export function ParkingSpotDetails({ area, onClose }: ParkingSpotDetailsProps) {
  const occupancyPercentage = Math.round((area.occupied / area.capacity) * 100)

  // Simulated hourly data
  const hourlyData = [
    { hour: "09:00", occupancy: Math.round(area.capacity * 0.3) },
    { hour: "10:00", occupancy: Math.round(area.capacity * 0.45) },
    { hour: "11:00", occupancy: Math.round(area.capacity * 0.6) },
    { hour: "12:00", occupancy: Math.round(area.capacity * 0.75) },
    { hour: "13:00", occupancy: Math.round(area.capacity * 0.85) },
    { hour: "14:00", occupancy: Math.round(area.capacity * 0.9) },
    { hour: "15:00", occupancy: area.occupied },
    { hour: "16:00", occupancy: Math.round(area.capacity * 0.95) },
    { hour: "17:00", occupancy: Math.round(area.capacity * 0.9) },
    { hour: "18:00", occupancy: Math.round(area.capacity * 0.8) },
  ]

  // Simulated turnover rate
  const turnoverRate = Math.round(Math.random() * 20 + 10)

  // Simulated peak time
  const peakTime = "16:30 - 17:30"

  // Simulated available spots
  const availableSpots = area.capacity - area.occupied

  return (
    <Card className="absolute right-4 top-4 w-[350px] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{area.name} Details</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Occupancy</span>
            <span className="font-medium">
              {area.occupied}/{area.capacity}
            </span>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span>Available: {availableSpots} spots</span>
            <span
              className={
                occupancyPercentage > 80
                  ? "text-red-500"
                  : occupancyPercentage > 50
                    ? "text-yellow-500"
                    : "text-green-500"
              }
            >
              {occupancyPercentage}% Full
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 rounded-md border p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Peak Time</span>
            </div>
            <div className="font-medium">{peakTime}</div>
          </div>

          <div className="flex flex-col gap-1 rounded-md border p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
              <span>Turnover Rate</span>
            </div>
            <div className="font-medium">{turnoverRate} cars/hour</div>
          </div>
        </div>

        <div className="rounded-md border p-3">
          <div className="mb-2 text-xs font-medium">Hourly Occupancy</div>
          <div className="flex h-[60px] items-end gap-1">
            {hourlyData.map((data, index) => {
              const height = (data.occupancy / area.capacity) * 100
              return (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className={`w-full rounded-sm ${
                      height > 80 ? "bg-red-500" : height > 50 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{data.hour.split(":")[0]}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-md border bg-muted/50 p-3">
          <div className="mb-1 text-xs font-medium">AI Recommendation</div>
          <p className="text-xs text-muted-foreground">
            {area.status === "high"
              ? "Redirect incoming traffic to West Parking area which is currently at low capacity."
              : area.status === "medium"
                ? "Monitor closely as this area is expected to reach high capacity in the next hour."
                : "This area has good availability. Consider promoting this area for late arrivals."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
