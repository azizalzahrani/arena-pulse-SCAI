"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit, AlertTriangle, Calendar, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for event conflicts
const eventConflicts = [
  {
    id: "conflict1",
    date: "2024-03-19",
    events: [
      {
        name: "Al-Ittihad vs Al-Hilal",
        time: "18:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 52000,
      },
      {
        name: "Al-Shabab vs Al-Taawoun",
        time: "20:30",
        venue: "Prince Faisal bin Fahd Stadium",
        expectedAttendance: 18000,
      },
      {
        name: "Al-Fateh vs Al-Fayha",
        time: "20:00",
        venue: "Al-Fateh Club Stadium",
        expectedAttendance: 12000,
      },
    ],
    conflictType: "high",
    impactAreas: ["Security staffing", "Traffic management", "Media coverage"],
    aiRecommendations: [
      "Reschedule Al-Fateh vs Al-Fayha to the following day to reduce security staffing pressure",
      "Stagger start times by at least 3 hours between major events",
      "Coordinate with traffic authorities for special measures around King Abdullah Sports City",
    ],
    resolved: false,
  },
  {
    id: "conflict2",
    date: "2024-03-05",
    events: [
      {
        name: "Al-Hilal vs Al-Ahli",
        time: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 58000,
      },
      {
        name: "Al-Nassr vs Al-Ettifaq",
        time: "21:30",
        venue: "Mrsool Park",
        expectedAttendance: 25000,
      },
    ],
    conflictType: "medium",
    impactAreas: ["Security staffing", "Fan experience"],
    aiRecommendations: [
      "Maintain current schedule but increase security staffing by 20%",
      "Implement special traffic routes to avoid congestion between venues",
      "Coordinate public transportation schedule adjustments with authorities",
    ],
    resolved: false,
  },
  {
    id: "conflict3",
    date: "2024-04-09",
    events: [
      {
        name: "Saudi Arabia vs UAE",
        time: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 62000,
      },
      {
        name: "Concert Event",
        time: "20:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 35000,
      },
    ],
    conflictType: "high",
    impactAreas: ["Security staffing", "Traffic management", "Hotel availability", "Media resources"],
    aiRecommendations: [
      "Reschedule concert event to the following weekend",
      "If rescheduling is not possible, increase security staffing by 35%",
      "Coordinate with hotel associations for accommodation planning",
      "Implement city-wide traffic management plan",
    ],
    resolved: false,
  },
]

// Mock data for optimized schedules
const optimizedSchedules = [
  {
    id: "opt1",
    originalDate: "2024-03-19",
    events: [
      {
        name: "Al-Ittihad vs Al-Hilal",
        originalTime: "18:00",
        optimizedTime: "18:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 52000,
        unchanged: true,
      },
      {
        name: "Al-Shabab vs Al-Taawoun",
        originalTime: "20:30",
        optimizedTime: "17:00",
        venue: "Prince Faisal bin Fahd Stadium",
        expectedAttendance: 18000,
        unchanged: false,
        reason: "Reduced overlap with major event",
      },
      {
        name: "Al-Fateh vs Al-Fayha",
        originalTime: "20:00",
        optimizedTime: "15:30",
        venue: "Al-Fateh Club Stadium",
        expectedAttendance: 12000,
        unchanged: false,
        reason: "Eliminated overlap with other events",
      },
    ],
    benefits: [
      "Reduced security staffing requirements by 25%",
      "Eliminated traffic congestion between venues",
      "Improved media coverage distribution",
      "Estimated cost savings: SAR 120,000",
    ],
  },
  {
    id: "opt2",
    originalDate: "2024-03-05",
    events: [
      {
        name: "Al-Hilal vs Al-Ahli",
        originalTime: "19:00",
        optimizedTime: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 58000,
        unchanged: true,
      },
      {
        name: "Al-Nassr vs Al-Ettifaq",
        originalTime: "21:30",
        optimizedTime: "18:00",
        venue: "Mrsool Park",
        expectedAttendance: 25000,
        unchanged: false,
        reason: "Moved to the following day (2024-03-06)",
      },
    ],
    benefits: [
      "Eliminated security staffing conflict",
      "Improved fan experience with dedicated media coverage",
      "Reduced traffic congestion in Riyadh",
      "Estimated cost savings: SAR 85,000",
    ],
  },
]

export default function EventConflictAnalyzer() {
  const [activeTab, setActiveTab] = useState("conflicts")
  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([])
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([])

  // Handle resolving a conflict
  const handleResolveConflict = (id: string) => {
    if (!resolvedConflicts.includes(id)) {
      setResolvedConflicts([...resolvedConflicts, id])
    }
  }

  // Handle applying an optimization
  const handleApplyOptimization = (id: string) => {
    if (!appliedOptimizations.includes(id)) {
      setAppliedOptimizations([...appliedOptimizations, id])
    }
  }

  // Get conflict type badge
  const getConflictBadge = (type: string) => {
    switch (type) {
      case "high":
        return <Badge variant="destructive">High Impact</Badge>
      case "medium":
        return <Badge>Medium Impact</Badge>
      case "low":
        return <Badge variant="secondary">Low Impact</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Event Conflict Analyzer</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="conflicts">Detected Conflicts</TabsTrigger>
            <TabsTrigger value="optimizations">Optimized Schedules</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {activeTab === "conflicts" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                AI has detected {eventConflicts.length} potential scheduling conflicts that may impact operations.
              </p>
              <Badge variant="outline">{eventConflicts.length - resolvedConflicts.length} Unresolved</Badge>
            </div>

            <div className="space-y-4">
              {eventConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className={`rounded-lg border p-4 ${
                    conflict.conflictType === "high" && !resolvedConflicts.includes(conflict.id)
                      ? "border-destructive/50 bg-destructive/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        conflict.conflictType === "high"
                          ? "text-destructive"
                          : conflict.conflictType === "medium"
                            ? "text-amber-500"
                            : "text-muted-foreground"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Conflict on {conflict.date}</h3>
                          {getConflictBadge(conflict.conflictType)}
                        </div>
                        {resolvedConflicts.includes(conflict.id) ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Resolved
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Conflicting events:</p>
                        <ul className="space-y-1 text-sm">
                          {conflict.events.map((event, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>
                                  {event.name} ({event.time})
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{event.expectedAttendance.toLocaleString()}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm">Impact areas:</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {conflict.impactAreas.map((area, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 rounded-md bg-muted/50 p-2">
                        <p className="text-sm font-medium">AI Recommendations:</p>
                        <ul className="mt-1 space-y-1 text-sm">
                          {conflict.aiRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <BrainCircuit className="mt-0.5 h-3.5 w-3.5 text-primary" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!resolvedConflicts.includes(conflict.id) && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => handleResolveConflict(conflict.id)}
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                AI has generated {optimizedSchedules.length} optimized scheduling options to resolve conflicts.
              </p>
              <Badge variant="outline">{optimizedSchedules.length - appliedOptimizations.length} Pending</Badge>
            </div>

            <div className="space-y-4">
              {optimizedSchedules.map((schedule) => (
                <div key={schedule.id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Optimized Schedule for {schedule.originalDate}</h3>
                        {appliedOptimizations.includes(schedule.id) ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Applied
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-2 space-y-2">
                        <p className="text-sm">Schedule adjustments:</p>
                        <ul className="space-y-2 text-sm">
                          {schedule.events.map((event, index) => (
                            <li key={index} className="rounded-md bg-muted/30 p-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{event.name}</span>
                                <Badge variant={event.unchanged ? "outline" : "secondary"}>
                                  {event.unchanged ? "Unchanged" : "Rescheduled"}
                                </Badge>
                              </div>
                              {!event.unchanged && (
                                <div className="mt-1 flex items-center gap-1 text-xs">
                                  <span>{event.originalTime}</span>
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium">{event.optimizedTime}</span>
                                  {event.reason && <span className="ml-2 text-muted-foreground">({event.reason})</span>}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm font-medium">Benefits:</p>
                        <ul className="mt-1 space-y-1 text-sm">
                          {schedule.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!appliedOptimizations.includes(schedule.id) && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => handleApplyOptimization(schedule.id)}
                        >
                          Apply Optimization
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

