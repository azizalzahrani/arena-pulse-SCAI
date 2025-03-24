"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, Calendar, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react"

// Mock data for staff scheduling
const upcomingEvents = [
  {
    id: "1",
    name: "Al-Hilal vs Al-Nassr",
    date: "2024-03-15",
    time: "19:00",
    venue: "King Fahd International Stadium",
    staffNeeded: 320,
    staffAssigned: 280,
    status: "Understaffed",
  },
  {
    id: "2",
    name: "Al-Ahli vs Al-Ittihad",
    date: "2024-03-19",
    time: "20:00",
    venue: "King Abdullah Sports City",
    staffNeeded: 280,
    staffAssigned: 280,
    status: "Optimal",
  },
  {
    id: "3",
    name: "Saudi Arabia vs UAE",
    date: "2024-03-23",
    time: "18:00",
    venue: "King Fahd International Stadium",
    staffNeeded: 350,
    staffAssigned: 320,
    status: "Understaffed",
  },
]

// Staff recommendations for events
const staffRecommendations = {
  "1": [
    { role: "Security", current: 120, recommended: 140, priority: "high" },
    { role: "Concessions", current: 80, recommended: 90, priority: "medium" },
    { role: "Ticketing", current: 40, recommended: 40, priority: "none" },
    { role: "Cleaning", current: 30, recommended: 35, priority: "low" },
    { role: "Medical", current: 10, recommended: 15, priority: "high" },
  ],
  "2": [
    { role: "Security", current: 110, recommended: 110, priority: "none" },
    { role: "Concessions", current: 85, recommended: 85, priority: "none" },
    { role: "Ticketing", current: 45, recommended: 45, priority: "none" },
    { role: "Cleaning", current: 30, recommended: 30, priority: "none" },
    { role: "Medical", current: 10, recommended: 10, priority: "none" },
  ],
  "3": [
    { role: "Security", current: 130, recommended: 150, priority: "high" },
    { role: "Concessions", current: 90, recommended: 100, priority: "medium" },
    { role: "Ticketing", current: 50, recommended: 50, priority: "none" },
    { role: "Cleaning", current: 35, recommended: 35, priority: "none" },
    { role: "Medical", current: 15, recommended: 15, priority: "none" },
  ],
}

// Available staff pool
const availableStaff = {
  Security: 45,
  Concessions: 32,
  Ticketing: 18,
  Cleaning: 25,
  Medical: 12,
}

export default function StaffScheduler() {
  const [selectedEvent, setSelectedEvent] = useState(upcomingEvents[0].id)
  const [optimized, setOptimized] = useState<string[]>([])
  const [viewMode, setViewMode] = useState("upcoming")

  const event = upcomingEvents.find((e) => e.id === selectedEvent)
  const recommendations = staffRecommendations[selectedEvent]

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Understaffed":
        return <Badge variant="destructive">Understaffed</Badge>
      case "Optimal":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Optimal
          </Badge>
        )
      case "Overstaffed":
        return <Badge variant="secondary">Overstaffed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
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
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Optimal
          </Badge>
        )
    }
  }

  // Handle optimization
  const handleOptimize = (role: string) => {
    if (!optimized.includes(role)) {
      setOptimized([...optimized, role])
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Staff Scheduler</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Tabs defaultValue={viewMode} onValueChange={setViewMode}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-medium">Select Event to Optimize Staffing</h3>
            <Select defaultValue={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {upcomingEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name} ({event.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {event && (
            <div className="rounded-lg border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">{event.name}</h3>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>
                        {event.staffAssigned} / {event.staffNeeded} staff assigned
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(event.status)}
                  <span className="text-sm font-medium">
                    {Math.round((event.staffAssigned / event.staffNeeded) * 100)}% Staffed
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-medium">AI Staffing Recommendations</h3>
            {recommendations.map((rec) => (
              <div
                key={rec.role}
                className={`rounded-lg border p-3 ${
                  rec.priority === "high" && !optimized.includes(rec.role)
                    ? "border-destructive/50 bg-destructive/5"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{rec.role}</h4>
                      {getPriorityBadge(rec.priority)}
                      {optimized.includes(rec.role) && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Optimized
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {rec.current < rec.recommended
                        ? `Need ${rec.recommended - rec.current} more staff members`
                        : rec.current > rec.recommended
                          ? `${rec.current - rec.recommended} excess staff members`
                          : "Optimal staffing level"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{rec.current}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{rec.recommended}</span>
                  </div>
                </div>
                {!optimized.includes(rec.role) && rec.current !== rec.recommended && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {rec.current < rec.recommended
                        ? `${availableStaff[rec.role]} ${rec.role} staff available to assign`
                        : `Reassign to other events or roles`}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleOptimize(rec.role)}>
                      {rec.current < rec.recommended
                        ? `Assign ${rec.recommended - rec.current} Staff`
                        : `Reduce by ${rec.current - rec.recommended} Staff`}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
            <h3 className="text-sm font-medium">AI Scheduling Insights</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  {event?.name} requires {event?.staffNeeded} staff based on historical attendance data and venue
                  capacity.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Consider cross-training 15 security staff for concessions roles to improve flexibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Based on weather forecast and ticket sales, medical staff should be increased by 5 for this event.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

