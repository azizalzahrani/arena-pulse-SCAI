"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"

export function SmartRouting() {
  const [trafficStatus, setTrafficStatus] = useState({
    overall: "Moderate",
    north: "Light",
    east: "Moderate",
    south: "Heavy",
    west: "Moderate",
  })

  const [recommendations, setRecommendations] = useState([
    "Route VIP ticket holders to North Lot via Highway 7 to avoid congestion",
    "Temporarily increase South Lot capacity by opening overflow area B",
    "Deploy 2 additional staff to East entrance to improve traffic flow",
  ])

  const [peakTimes, setPeakTimes] = useState({
    arrival: "5:30 PM - 6:45 PM",
    departure: "10:15 PM - 11:30 PM",
  })

  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isUpdating, setIsUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState("current")

  // Simulate real-time traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateTrafficData()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Generate dynamic AI recommendations based on traffic status
  useEffect(() => {
    generateRecommendations()
  }, [trafficStatus])

  const updateTrafficData = () => {
    const statuses = ["Light", "Moderate", "Heavy", "Severe"]
    const overallStatuses = ["Light", "Moderate", "Heavy"]

    setTrafficStatus({
      overall: overallStatuses[Math.floor(Math.random() * 3)],
      north: statuses[Math.floor(Math.random() * 4)],
      east: statuses[Math.floor(Math.random() * 4)],
      south: statuses[Math.floor(Math.random() * 4)],
      west: statuses[Math.floor(Math.random() * 4)],
    })

    setLastUpdated(new Date())
  }

  const generateRecommendations = () => {
    // Base recommendations on current traffic status
    const newRecommendations = []

    // Check for severe or heavy traffic areas
    if (trafficStatus.north === "Severe" || trafficStatus.north === "Heavy") {
      newRecommendations.push("Redirect traffic from North entrance to West entrance")
    }

    if (trafficStatus.east === "Severe" || trafficStatus.east === "Heavy") {
      newRecommendations.push("Open auxiliary lanes at East entrance to improve flow")
    }

    if (trafficStatus.south === "Severe" || trafficStatus.south === "Heavy") {
      newRecommendations.push("Temporarily increase South Lot capacity by opening overflow area B")
    }

    if (trafficStatus.west === "Severe" || trafficStatus.west === "Heavy") {
      newRecommendations.push("Deploy 2 additional staff to West entrance to improve traffic flow")
    }

    // Add general recommendations
    if (trafficStatus.overall === "Heavy") {
      newRecommendations.push("Activate emergency traffic management plan")
      newRecommendations.push("Send SMS alerts to ticket holders about heavy traffic")
    } else if (trafficStatus.overall === "Moderate") {
      newRecommendations.push("Route VIP ticket holders to least congested entrance")
    }

    // Ensure we have at least 3 recommendations
    const defaultRecs = [
      "Optimize traffic light timing at main intersection",
      "Deploy digital signage to direct drivers to available lots",
      "Prepare overflow parking areas for potential capacity issues",
    ]

    while (newRecommendations.length < 3) {
      const randomRec = defaultRecs[Math.floor(Math.random() * defaultRecs.length)]
      if (!newRecommendations.includes(randomRec)) {
        newRecommendations.push(randomRec)
      }
    }

    // Take only the first 3 recommendations
    setRecommendations(newRecommendations.slice(0, 3))

    // Update peak times slightly
    const currentHour = new Date().getHours()
    const arrivalStart = Math.max(currentHour - 1, 9)
    const arrivalEnd = Math.min(arrivalStart + 2, 23)

    setPeakTimes({
      arrival: `${arrivalStart}:${Math.floor(Math.random() * 6)}0 - ${arrivalEnd}:${Math.floor(Math.random() * 6)}0`,
      departure: `${Math.min(arrivalEnd + 3, 23)}:${Math.floor(Math.random() * 6)}0 - ${Math.min(arrivalEnd + 5, 23)}:${Math.floor(Math.random() * 6)}0`,
    })
  }

  const handleRefresh = () => {
    setIsUpdating(true)
    setTimeout(() => {
      updateTrafficData()
      setIsUpdating(false)
    }, 1500)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Light":
        return "text-green-500"
      case "Moderate":
        return "text-yellow-500"
      case "Heavy":
        return "text-red-500"
      case "Severe":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  // Get status background color
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Light":
        return "bg-green-500/10"
      case "Moderate":
        return "bg-yellow-500/10"
      case "Heavy":
        return "bg-red-500/10"
      case "Severe":
        return "bg-red-600/10"
      default:
        return "bg-muted"
    }
  }

  // Calculate traffic score for visualization
  const getTrafficScore = (status) => {
    switch (status) {
      case "Light":
        return 25
      case "Moderate":
        return 50
      case "Heavy":
        return 75
      case "Severe":
        return 100
      default:
        return 0
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Smart Routing</CardTitle>
          <AIBadge />
        </div>
        <CardDescription>AI-powered traffic flow optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">North Entrance</span>
            <Badge variant="outline" className="bg-red-100">
              Heavy Traffic
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: "85%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">Recommend redirecting to East Entrance</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">East Entrance</span>
            <Badge variant="outline" className="bg-green-100">
              Light Traffic
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">Optimal route for new arrivals</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">South Entrance</span>
            <Badge variant="outline" className="bg-yellow-100">
              Moderate Traffic
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "60%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">Expected to clear in 15 minutes</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">West Entrance</span>
            <Badge variant="outline" className="bg-yellow-100">
              Moderate Traffic
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "55%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">Construction may cause delays</p>
        </div>
      </CardContent>
    </Card>
  )
}
