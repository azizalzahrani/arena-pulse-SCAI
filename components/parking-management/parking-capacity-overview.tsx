"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ParkingCapacityOverview() {
  // This would typically come from an API or real-time data source
  const parkingData = {
    total: 2500,
    occupied: 1876,
    available: 624,
    northTotal: 1200,
    northOccupied: 1050,
    southTotal: 800,
    southOccupied: 526,
    vipTotal: 500,
    vipOccupied: 300,
  }

  const occupancyPercentage = Math.round((parkingData.occupied / parkingData.total) * 100)
  const northPercentage = Math.round((parkingData.northOccupied / parkingData.northTotal) * 100)
  const southPercentage = Math.round((parkingData.southOccupied / parkingData.southTotal) * 100)
  const vipPercentage = Math.round((parkingData.vipOccupied / parkingData.vipTotal) * 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Parking Capacity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Overall Occupancy</h3>
            <span className="text-sm font-medium">{occupancyPercentage}%</span>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total Spots: {parkingData.total}</span>
            <span className="font-semibold text-green-600">{parkingData.available} spots available</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">North Parking</h3>
              <span className="text-sm font-medium">{northPercentage}%</span>
            </div>
            <Progress value={northPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Capacity: {parkingData.northTotal}</span>
              <span>Available: {parkingData.northTotal - parkingData.northOccupied}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">South Parking</h3>
              <span className="text-sm font-medium">{southPercentage}%</span>
            </div>
            <Progress value={southPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Capacity: {parkingData.southTotal}</span>
              <span>Available: {parkingData.southTotal - parkingData.southOccupied}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">VIP Parking</h3>
              <span className="text-sm font-medium">{vipPercentage}%</span>
            </div>
            <Progress value={vipPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Capacity: {parkingData.vipTotal}</span>
              <span>Available: {parkingData.vipTotal - parkingData.vipOccupied}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
