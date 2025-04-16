"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { LastUpdated } from "@/components/ui/last-updated"
import { useRealtimePredictions } from "@/hooks/use-realtime-data"

export function ParkingStatus() {
  const { data: parkingPredictions, loading, error, lastUpdate } = useRealtimePredictions(1, "parking")

  const [recentlyUpdated, setRecentlyUpdated] = useState(false)

  // Visual indicator for recent updates
  useEffect(() => {
    if (lastUpdate) {
      setRecentlyUpdated(true)
      const timer = setTimeout(() => setRecentlyUpdated(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [lastUpdate])

  // Mock parking lot data (in a real app, this would come from the database)
  const parkingLots = [
    { name: "North Lot", capacity: 500, occupied: 425, status: "near-full" },
    { name: "South Lot", capacity: 600, occupied: 360, status: "available" },
    { name: "East Lot", capacity: 400, occupied: 180, status: "available" },
    { name: "West Lot", capacity: 450, occupied: 405, status: "near-full" },
    { name: "VIP Lot", capacity: 100, occupied: 65, status: "available" },
  ]

  const parkingPrediction = parkingPredictions[0]

  if (loading && !parkingPrediction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Parking Status</CardTitle>
          <CardDescription>Loading parking data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Parking Status</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className={recentlyUpdated ? "border-primary transition-colors duration-300" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Parking Status</CardTitle>
            <CardDescription>Current parking lot capacity</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {recentlyUpdated && (
              <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse">
                <RefreshCw className="h-3 w-3 mr-1" />
                Live Update
              </Badge>
            )}
            {parkingPrediction && <AIBadge />}
            <LastUpdated timestamp={lastUpdate} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {parkingLots.map((lot) => {
            const percentOccupied = Math.round((lot.occupied / lot.capacity) * 100)
            return (
              <div key={lot.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{lot.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {percentOccupied}% ({lot.occupied}/{lot.capacity})
                    </span>
                    <Badge
                      variant={percentOccupied > 90 ? "destructive" : percentOccupied > 75 ? "default" : "outline"}
                    >
                      {percentOccupied > 90 ? "Full" : percentOccupied > 75 ? "Filling Up" : "Available"}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={percentOccupied}
                  className={`h-2 ${
                    percentOccupied > 90 ? "bg-red-100" : percentOccupied > 75 ? "bg-yellow-100" : "bg-green-100"
                  }`}
                />
              </div>
            )
          })}
        </div>

        {parkingPrediction && (
          <div className={`mt-6 border-t pt-4 ${recentlyUpdated ? "animate-pulse" : ""}`}>
            <div className="flex items-center mb-2">
              <h3 className="font-medium">AI Parking Prediction</h3>
              <AIBadge className="ml-2" />
            </div>
            <p className="text-sm mb-3">{parkingPrediction.result.summary}</p>
            {parkingPrediction.result.recommendations && (
              <div>
                <h4 className="text-sm font-medium mb-1">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {parkingPrediction.result.recommendations.slice(0, 2).map((rec, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
