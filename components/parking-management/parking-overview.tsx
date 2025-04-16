"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ParkingOverview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [parkingData, setParkingData] = useState({
    total: 5000,
    occupied: 2655,
    available: 2345,
    reserved: 500,
    vip: {
      total: 500,
      occupied: 350,
      available: 150,
    },
    general: {
      total: 4000,
      occupied: 2105,
      available: 1895,
    },
    handicapped: {
      total: 500,
      occupied: 200,
      available: 300,
    },
    trend: "increasing",
    trendValue: 8,
    peakTime: "18:30",
    estimatedFullTime: "19:15",
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateParkingData()
    }, 45000) // Update every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const updateParkingData = () => {
    // Generate random changes to simulate real-time updates
    const changeAmount = Math.floor(Math.random() * 100) - 20 // -20 to +80
    const newOccupied = Math.max(0, Math.min(parkingData.total, parkingData.occupied + changeAmount))
    const newAvailable = parkingData.total - newOccupied

    // Update VIP, general, and handicapped spaces
    const vipChange = Math.floor(Math.random() * 20) - 5 // -5 to +15
    const handicappedChange = Math.floor(Math.random() * 10) - 3 // -3 to +7
    const generalChange = changeAmount - vipChange - handicappedChange

    const newVipOccupied = Math.max(0, Math.min(parkingData.vip.total, parkingData.vip.occupied + vipChange))
    const newHandicappedOccupied = Math.max(
      0,
      Math.min(parkingData.handicapped.total, parkingData.handicapped.occupied + handicappedChange),
    )
    const newGeneralOccupied = Math.max(
      0,
      Math.min(parkingData.general.total, parkingData.general.occupied + generalChange),
    )

    // Update trend
    const trend = changeAmount > 0 ? "increasing" : "decreasing"
    const trendValue = (Math.abs(changeAmount) / parkingData.total) * 100

    // Update peak time and estimated full time
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    const peakHour = Math.min(23, Math.max(currentHour, currentHour + Math.floor(Math.random() * 3)))
    const peakMinute = Math.floor(Math.random() * 60)
    const fullHour = Math.min(23, peakHour + Math.floor(Math.random() * 2) + 1)
    const fullMinute = Math.floor(Math.random() * 60)

    setParkingData({
      total: parkingData.total,
      occupied: newOccupied,
      available: newAvailable,
      reserved: parkingData.reserved,
      vip: {
        total: parkingData.vip.total,
        occupied: newVipOccupied,
        available: parkingData.vip.total - newVipOccupied,
      },
      general: {
        total: parkingData.general.total,
        occupied: newGeneralOccupied,
        available: parkingData.general.total - newGeneralOccupied,
      },
      handicapped: {
        total: parkingData.handicapped.total,
        occupied: newHandicappedOccupied,
        available: parkingData.handicapped.total - newHandicappedOccupied,
      },
      trend: trend,
      trendValue: Number.parseFloat(trendValue.toFixed(1)),
      peakTime: `${peakHour.toString().padStart(2, "0")}:${peakMinute.toString().padStart(2, "0")}`,
      estimatedFullTime: `${fullHour.toString().padStart(2, "0")}:${fullMinute.toString().padStart(2, "0")}`,
    })

    setLastUpdated(new Date())
  }

  const handleRefresh = () => {
    setIsUpdating(true)
    setTimeout(() => {
      updateParkingData()
      setIsUpdating(false)
    }, 1000)
  }

  const occupancyPercentage = Math.round((parkingData.occupied / parkingData.total) * 100)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Parking Overview</CardTitle>
          <CardDescription>Current parking status across all areas</CardDescription>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="types">Types</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isUpdating} className="h-8 w-8">
              <RefreshCw className={`h-4 w-4 ${isUpdating ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total Capacity</p>
            <p className="text-2xl font-bold">2,500</p>
          </div>
          <div>
            <p className="text-sm font-medium">Currently Occupied</p>
            <p className="text-2xl font-bold">1,842</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Occupancy Rate</span>
            <span className="font-medium">73.7%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "73.7%" }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium">Available Spots</p>
            <p className="text-xl font-bold">658</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium">Turnover Rate</p>
            <p className="text-xl font-bold">42/hour</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium">Status by Area</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-red-100">
              North: 92% Full
            </Badge>
            <Badge variant="outline" className="bg-yellow-100">
              East: 68% Full
            </Badge>
            <Badge variant="outline" className="bg-green-100">
              South: 45% Full
            </Badge>
            <Badge variant="outline" className="bg-yellow-100">
              VIP: 75% Full
            </Badge>
            <Badge variant="outline" className="bg-green-100">
              Staff: 45% Full
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
