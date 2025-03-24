"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Users, ArrowRight, CheckCircle2 } from "lucide-react"

// Mock data for staffing recommendations
const staffingData = {
  "Al-Hilal vs Al-Nassr": {
    date: "Mar 15",
    venue: "King Fahd International Stadium",
    expectedAttendance: 58923,
    areas: [
      {
        name: "Gate 3 Entrance",
        currentStaff: 12,
        recommendedStaff: 18,
        priority: "high",
        reason: "Historical congestion point with 85% more traffic than other gates",
      },
      {
        name: "East Concourse",
        currentStaff: 8,
        recommendedStaff: 12,
        priority: "medium",
        reason: "Increased food vendor traffic expected based on similar events",
      },
      {
        name: "VIP Section",
        currentStaff: 10,
        recommendedStaff: 8,
        priority: "low",
        reason: "Historically overstaffed based on actual VIP attendance",
      },
      {
        name: "South Stand",
        currentStaff: 15,
        recommendedStaff: 20,
        priority: "high",
        reason: "Expected to reach 95% capacity with high-risk fan groups",
      },
      {
        name: "West Concourse",
        currentStaff: 10,
        recommendedStaff: 10,
        priority: "none",
        reason: "Current staffing levels are optimal",
      },
    ],
    totalCurrent: 55,
    totalRecommended: 68,
    potentialIssues: [
      "Gate 3 congestion during peak entry time (18:00-19:00)",
      "Insufficient security in South Stand",
      "Potential understaffing at concession areas",
    ],
  },
  "Al-Ahli vs Al-Ittihad": {
    date: "Mar 19",
    venue: "King Abdullah Sports City",
    expectedAttendance: 45678,
    areas: [
      {
        name: "Main Entrance",
        currentStaff: 10,
        recommendedStaff: 14,
        priority: "medium",
        reason: "Moderate increase needed based on expected attendance",
      },
      {
        name: "North Concourse",
        currentStaff: 8,
        recommendedStaff: 10,
        priority: "low",
        reason: "Slight increase recommended for improved service",
      },
      {
        name: "Premium Seating",
        currentStaff: 12,
        recommendedStaff: 8,
        priority: "medium",
        reason: "Current staffing exceeds requirements by 50%",
      },
    ],
    totalCurrent: 30,
    totalRecommended: 32,
    potentialIssues: ["Slight understaffing at main entrance", "Overstaffing in premium seating areas"],
  },
  "Saudi Arabia vs UAE": {
    date: "Mar 23",
    venue: "King Fahd International Stadium",
    expectedAttendance: 61234,
    areas: [
      {
        name: "Gate 1 Entrance",
        currentStaff: 12,
        recommendedStaff: 16,
        priority: "high",
        reason: "International match with increased security requirements",
      },
      {
        name: "Gate 4 Entrance",
        currentStaff: 12,
        recommendedStaff: 16,
        priority: "high",
        reason: "Expected high volume of visiting fans",
      },
      {
        name: "East Stand",
        currentStaff: 14,
        recommendedStaff: 18,
        priority: "medium",
        reason: "Section allocated to visiting fans requires additional security",
      },
    ],
    totalCurrent: 38,
    totalRecommended: 50,
    potentialIssues: [
      "Significant understaffing for international match security requirements",
      "Need for additional bi-lingual staff for visiting fans",
      "Increased medical staff recommended for high-profile match",
    ],
  },
}

export default function EventStaffingOptimizer() {
  const [selectedEvent, setSelectedEvent] = useState("Al-Hilal vs Al-Nassr")
  const [optimized, setOptimized] = useState<string[]>([])

  const eventData = staffingData[selectedEvent]

  // Function to handle optimization
  const handleOptimize = (areaName: string) => {
    if (!optimized.includes(areaName)) {
      setOptimized([...optimized, areaName])
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge>Medium Priority</Badge>
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>
      default:
        return <Badge variant="outline">Optimal</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Staffing Optimizer</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Select defaultValue={selectedEvent} onValueChange={setSelectedEvent}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(staffingData).map((event) => (
              <SelectItem key={event} value={event}>
                {event} ({staffingData[event].date})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg border p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium">{selectedEvent}</h3>
              <p className="text-xs text-muted-foreground">
                {eventData.venue} • Expected Attendance: {eventData.expectedAttendance.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Current: <span className="font-medium">{eventData.totalCurrent}</span> • Recommended:{" "}
                <span className="font-medium">{eventData.totalRecommended}</span>
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs">
              <span>Current Staffing</span>
              <span>Optimal Staffing</span>
            </div>
            <Progress
              value={(eventData.totalCurrent / eventData.totalRecommended) * 100}
              className="h-2"
              indicatorClassName={
                eventData.totalCurrent >= eventData.totalRecommended * 0.9
                  ? "bg-green-500"
                  : eventData.totalCurrent >= eventData.totalRecommended * 0.75
                    ? "bg-amber-500"
                    : "bg-red-500"
              }
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Staffing Recommendations by Area</h3>
          {eventData.areas.map((area) => (
            <div
              key={area.name}
              className={`rounded-lg border p-3 ${
                area.priority === "high" && !optimized.includes(area.name)
                  ? "border-destructive/50 bg-destructive/5"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{area.name}</h4>
                    {getPriorityBadge(area.priority)}
                    {optimized.includes(area.name) && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{area.reason}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{area.currentStaff}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">{area.recommendedStaff}</span>
                </div>
              </div>
              {!optimized.includes(area.name) && area.currentStaff !== area.recommendedStaff && (
                <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => handleOptimize(area.name)}>
                  {area.currentStaff < area.recommendedStaff
                    ? `Add ${area.recommendedStaff - area.currentStaff} Staff`
                    : `Reduce by ${area.currentStaff - area.recommendedStaff} Staff`}
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
          <h3 className="text-sm font-medium">Potential Issues</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {eventData.potentialIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

