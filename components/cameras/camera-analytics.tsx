"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Users, Clock, TrendingUp, AlertTriangle } from "lucide-react"

interface CameraAnalyticsProps {
  camera: {
    id: string
    name: string
    occupancy: number
  }
}

export function CameraAnalytics({ camera }: CameraAnalyticsProps) {
  const [timeData, setTimeData] = useState<number[]>([])
  const [occupancyData, setOccupancyData] = useState<number[]>([])

  // Generate time-series data
  useEffect(() => {
    const baseOccupancy = camera.occupancy
    const times = Array.from({ length: 24 }, (_, i) => i)

    // Generate realistic occupancy pattern with morning and evening peaks
    const occupancies = times.map((hour) => {
      // Morning peak around 8-9 AM
      const morningPeak = Math.max(0, 70 - Math.abs(hour - 8.5) * 15)

      // Evening peak around 5-7 PM
      const eveningPeak = Math.max(0, 80 - Math.abs(hour - 18) * 10)

      // Base occupancy with some randomness
      const baseWithNoise = baseOccupancy + (Math.random() * 10 - 5)

      // Combine all factors
      return Math.min(100, Math.max(5, baseWithNoise + morningPeak + eveningPeak))
    })

    setTimeData(times)
    setOccupancyData(occupancies)
  }, [camera.occupancy])

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white mb-4">Occupancy Analysis</h3>

          <div className="h-40 bg-gray-900 rounded-md p-2 flex items-end">
            {occupancyData.map((value, index) => (
              <div key={index} className="flex-1 mx-0.5 rounded-t-sm relative group" style={{ height: `${value}%` }}>
                <div
                  className={`w-full absolute bottom-0 rounded-t-sm ${
                    value > 80 ? "bg-red-500" : value > 60 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ height: "100%" }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {Math.round(value)}% at {index}:00
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 text-blue-400 mr-1" />
                <span className="text-gray-300">Current Occupancy</span>
              </div>
              <Badge
                className={
                  camera.occupancy > 80 ? "bg-red-500" : camera.occupancy > 60 ? "bg-yellow-500" : "bg-green-500"
                }
              >
                {camera.occupancy}%
              </Badge>
            </div>
            <Progress value={camera.occupancy} className="h-1.5 bg-gray-700">
              <div
                className={`h-full rounded-full ${
                  camera.occupancy > 80 ? "bg-red-500" : camera.occupancy > 60 ? "bg-yellow-500" : "bg-green-500"
                }`}
              />
            </Progress>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <TrendingUp className="h-3.5 w-3.5 text-purple-400 mr-1" />
                <span className="text-gray-300">Trend (Last Hour)</span>
              </div>
              <Badge className="bg-purple-500">+12%</Badge>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                <span className="text-gray-300">Average Duration</span>
              </div>
              <Badge className="bg-yellow-500">23 min</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white mb-4">AI Insights</h3>

          <Tabs defaultValue="predictions">
            <TabsList className="bg-gray-700 border-gray-600">
              <TabsTrigger value="predictions" className="data-[state=active]:bg-gray-600">
                Predictions
              </TabsTrigger>
              <TabsTrigger value="anomalies" className="data-[state=active]:bg-gray-600">
                Anomalies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="mt-4">
              <div className="space-y-3">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-blue-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Occupancy Forecast
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Predicted to reach {camera.occupancy + 15}% within 30 minutes based on current flow rates and
                    historical patterns.
                  </p>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-purple-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Peak Time Prediction
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Area will reach maximum capacity at approximately 18:45, with an estimated 92% occupancy.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="anomalies" className="mt-4">
              <div className="space-y-3">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-yellow-400 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Flow Disruption
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Unusual movement pattern detected at northeast corner. 73% confidence of temporary obstruction.
                  </p>
                </div>

                <div className="bg-gray-600 border border-gray-500 rounded-md p-3">
                  <h4 className="text-sm font-medium text-gray-300 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 opacity-50" />
                    No Critical Anomalies
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">No critical anomalies detected in the last 15 minutes.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
