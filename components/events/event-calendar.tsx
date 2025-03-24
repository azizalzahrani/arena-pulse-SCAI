"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, Users, DollarSign, Clock, MapPin, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Enhanced mock data for events with more details
const eventDates = [
  {
    id: "e1",
    date: new Date(2024, 2, 5),
    count: 2,
    type: "league",
    events: [
      {
        name: "Al-Hilal vs Al-Ahli",
        time: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 58000,
        ticketsSold: 52000,
        weatherRisk: "low",
        staffingLevel: "optimal",
        estimatedRevenue: 3200000,
        notes: "Rivalry match with high security requirements",
      },
      {
        name: "Al-Nassr vs Al-Ettifaq",
        time: "21:30",
        venue: "Mrsool Park",
        expectedAttendance: 25000,
        ticketsSold: 18000,
        weatherRisk: "low",
        staffingLevel: "understaffed",
        estimatedRevenue: 1500000,
        notes: "Concurrent with another major event",
      },
    ],
  },
  // Other event dates remain the same
  {
    id: "e2",
    date: new Date(2024, 2, 12),
    count: 1,
    type: "cup",
    events: [
      {
        name: "Saudi Super Cup Semi-Final",
        time: "20:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 45000,
        ticketsSold: 38000,
        weatherRisk: "medium",
        staffingLevel: "optimal",
        estimatedRevenue: 2800000,
        notes: "High-profile cup match",
      },
    ],
  },
  {
    id: "e3",
    date: new Date(2024, 2, 15),
    count: 1,
    type: "international",
    events: [
      {
        name: "Saudi Arabia vs Qatar",
        time: "19:30",
        venue: "King Fahd International Stadium",
        expectedAttendance: 65000,
        ticketsSold: 60000,
        weatherRisk: "low",
        staffingLevel: "understaffed",
        estimatedRevenue: 4500000,
        notes: "International friendly with high security requirements",
      },
    ],
  },
  {
    id: "e4",
    date: new Date(2024, 2, 19),
    count: 3,
    type: "league",
    events: [
      {
        name: "Al-Ittihad vs Al-Hilal",
        time: "18:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 52000,
        ticketsSold: 48000,
        weatherRisk: "high",
        staffingLevel: "optimal",
        estimatedRevenue: 3100000,
        notes: "Weather concerns may affect attendance",
      },
      {
        name: "Al-Shabab vs Al-Taawoun",
        time: "20:30",
        venue: "Prince Faisal bin Fahd Stadium",
        expectedAttendance: 18000,
        ticketsSold: 12000,
        weatherRisk: "high",
        staffingLevel: "overstaffed",
        estimatedRevenue: 900000,
        notes: "Weather alert in effect",
      },
      {
        name: "Al-Fateh vs Al-Fayha",
        time: "20:00",
        venue: "Al-Fateh Club Stadium",
        expectedAttendance: 12000,
        ticketsSold: 8000,
        weatherRisk: "high",
        staffingLevel: "optimal",
        estimatedRevenue: 600000,
        notes: "Lower priority match",
      },
    ],
  },
  {
    id: "e5",
    date: new Date(2024, 2, 23),
    count: 1,
    type: "friendly",
    events: [
      {
        name: "Al-Nassr vs Al-Ain FC",
        time: "19:00",
        venue: "Mrsool Park",
        expectedAttendance: 22000,
        ticketsSold: 15000,
        weatherRisk: "low",
        staffingLevel: "optimal",
        estimatedRevenue: 1200000,
        notes: "International club friendly",
      },
    ],
  },
  {
    id: "e6",
    date: new Date(2024, 2, 26),
    count: 2,
    type: "league",
    events: [
      {
        name: "Al-Hilal vs Al-Taawoun",
        time: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 45000,
        ticketsSold: 38000,
        weatherRisk: "low",
        staffingLevel: "optimal",
        estimatedRevenue: 2700000,
        notes: "Standard league match",
      },
      {
        name: "Al-Ahli vs Al-Fayha",
        time: "21:30",
        venue: "King Abdullah Sports City",
        expectedAttendance: 32000,
        ticketsSold: 25000,
        weatherRisk: "low",
        staffingLevel: "understaffed",
        estimatedRevenue: 1800000,
        notes: "Staffing concerns identified",
      },
    ],
  },
  {
    id: "e7",
    date: new Date(2024, 2, 30),
    count: 1,
    type: "cup",
    events: [
      {
        name: "King's Cup Quarter-Final",
        time: "20:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 55000,
        ticketsSold: 48000,
        weatherRisk: "medium",
        staffingLevel: "optimal",
        estimatedRevenue: 3500000,
        notes: "High-profile cup match with increased security",
      },
    ],
  },
  {
    id: "e8",
    date: new Date(2024, 3, 2),
    count: 1,
    type: "league",
    events: [
      {
        name: "Al-Nassr vs Al-Shabab",
        time: "19:30",
        venue: "Mrsool Park",
        expectedAttendance: 28000,
        ticketsSold: 22000,
        weatherRisk: "low",
        staffingLevel: "optimal",
        estimatedRevenue: 1900000,
        notes: "Standard league match",
      },
    ],
  },
  {
    id: "e9",
    date: new Date(2024, 3, 6),
    count: 2,
    type: "league",
    events: [
      {
        name: "Al-Ittihad vs Al-Ettifaq",
        time: "18:00",
        venue: "King Abdullah Sports City",
        expectedAttendance: 35000,
        ticketsSold: 28000,
        weatherRisk: "low",
        staffingLevel: "optimal",
        estimatedRevenue: 2100000,
        notes: "Standard league match",
      },
      {
        name: "Al-Fateh vs Al-Taawoun",
        time: "20:30",
        venue: "Al-Fateh Club Stadium",
        expectedAttendance: 12000,
        ticketsSold: 8000,
        weatherRisk: "low",
        staffingLevel: "overstaffed",
        estimatedRevenue: 600000,
        notes: "Lower priority match",
      },
    ],
  },
  {
    id: "e10",
    date: new Date(2024, 3, 9),
    count: 1,
    type: "international",
    events: [
      {
        name: "Saudi Arabia vs UAE",
        time: "19:00",
        venue: "King Fahd International Stadium",
        expectedAttendance: 62000,
        ticketsSold: 55000,
        weatherRisk: "low",
        staffingLevel: "understaffed",
        estimatedRevenue: 4200000,
        notes: "International match with high security requirements",
      },
    ],
  },
]

// AI recommendations based on event data
const aiRecommendations = {
  e1: [
    "Consider reassigning 15 security staff from Al-Nassr match to Al-Hilal match due to higher attendance",
    "Implement staggered entry times to reduce congestion as both matches have high attendance",
    "Prepare for 10% higher concession sales than typical for rivalry matches",
  ],
  e3: [
    "Increase security staffing by 25% for international match based on historical data",
    "Deploy additional 10 staff at Gates 2 and 3 where congestion is predicted",
    "Prepare VIP area for diplomatic guests with specialized security protocols",
  ],
  e4: [
    "Weather alert: 70% chance of rain may reduce attendance by 8-12%",
    "Consider consolidating staff from Al-Shabab match to Al-Ittihad match due to weather impact",
    "Prepare covered areas and additional staff for umbrella management",
  ],
  e6: [
    "Al-Ahli match is understaffed by approximately 15 security personnel",
    "Consider temporary reassignment from Al-Hilal match which has optimal staffing",
    "Predicted 5% increase in attendance based on recent team performance",
  ],
  e10: [
    "International match requires 30% more staff than currently assigned",
    "VIP section expected to be at full capacity - assign 5 additional specialized staff",
    "Prepare for increased media presence with dedicated staff support",
  ],
}

export default function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [selectedDateEvents, setSelectedDateEvents] = useState<any>(null)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const { t, language } = useLanguage()

  // Function to check if a date has events - with safety checks
  const hasEvent = (day: Date | undefined) => {
    if (!day || !(day instanceof Date)) return null

    return eventDates.find(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Custom day render function - with safety checks
  const renderDay = (day: Date) => {
    // Skip rendering for invalid dates
    if (!day || !(day instanceof Date)) return null

    const event = hasEvent(day)
    if (!event) return null

    let badgeColor = "bg-primary"
    if (event.type === "cup") badgeColor = "bg-blue-500"
    if (event.type === "international") badgeColor = "bg-purple-500"
    if (event.type === "friendly") badgeColor = "bg-amber-500"

    return (
      <div className="relative h-full w-full p-2">
        <div className={`absolute bottom-1 ${language === "ar" ? "left-1" : "right-1"}`}>
          <span className={`flex h-2 w-2 rounded-full ${badgeColor}`} />
        </div>
        {event.count > 1 && (
          <div className={`absolute bottom-1 ${language === "ar" ? "right-1" : "left-1"}`}>
            <span className="text-[10px] font-medium">{event.count}</span>
          </div>
        )}
      </div>
    )
  }

  // Update selected date events when date changes
  useEffect(() => {
    if (date) {
      const events = hasEvent(date)
      setSelectedDateEvents(events)

      // Reset AI insights when date changes
      setShowAIInsights(false)
    }
  }, [date])

  // Get weather risk badge
  const getWeatherRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">{t("High Risk")}</Badge>
      case "medium":
        return <Badge>{t("Medium Risk")}</Badge>
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            {t("Low Risk")}
          </Badge>
        )
      default:
        return <Badge variant="outline">{t("Unknown")}</Badge>
    }
  }

  // Get staffing level badge
  const getStaffingBadge = (level: string) => {
    switch (level) {
      case "understaffed":
        return <Badge variant="destructive">{t("Understaffed")}</Badge>
      case "optimal":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            {t("Optimal")}
          </Badge>
        )
      case "overstaffed":
        return <Badge variant="secondary">{t("Overstaffed")}</Badge>
      default:
        return <Badge variant="outline">{t("Unknown")}</Badge>
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>{t("Event Calendar")}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  {t(
                    "View and manage all scheduled events across your venues. Colored dots indicate event types. Select a date to see detailed event information.",
                  )}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <div className="rounded-md border p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                onMonthChange={setMonth}
                month={month}
                className="mx-auto w-full max-w-sm"
                components={{
                  Day: ({ day, ...props }) => (
                    <div {...props}>
                      {props.children}
                      {day ? renderDay(day) : null}
                    </div>
                  ),
                }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-sm">{t("League Match")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">{t("Cup Match")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">{t("International")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">{t("Friendly")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {selectedDateEvents ? (
              <div className="space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {t("Events on")}{" "}
                    {date?.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <Badge>
                    {selectedDateEvents.count} {selectedDateEvents.count === 1 ? t("Event") : t("Events")}
                  </Badge>
                </div>

                <div className="space-y-3 overflow-y-auto pr-2 flex-grow" style={{ maxHeight: "350px" }}>
                  {selectedDateEvents.events.map((event, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{event.name}</h4>
                        <Badge
                          variant={
                            selectedDateEvents.type === "international"
                              ? "destructive"
                              : selectedDateEvents.type === "cup"
                                ? "default"
                                : selectedDateEvents.type === "friendly"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {t(selectedDateEvents.type.charAt(0).toUpperCase() + selectedDateEvents.type.slice(1))}
                        </Badge>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {event.ticketsSold.toLocaleString()} / {event.expectedAttendance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>SAR {event.estimatedRevenue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{t("Weather")}:</span>
                          {getWeatherRiskBadge(event.weatherRisk)}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{t("Staffing")}:</span>
                          {getStaffingBadge(event.staffingLevel)}
                        </div>
                      </div>

                      {event.notes && (
                        <div className="mt-2 flex items-start gap-1 text-xs text-muted-foreground">
                          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{event.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {aiRecommendations[selectedDateEvents.id] && (
                  <div className="mt-auto pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">{t("AI Event Insights")}</h3>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setShowAIInsights(!showAIInsights)}>
                        {showAIInsights ? t("Hide Insights") : t("Show Insights")}
                      </Button>
                    </div>

                    {showAIInsights && (
                      <div className="mt-2 rounded-md bg-muted/50 p-3">
                        <ul className="space-y-2 text-sm">
                          {aiRecommendations[selectedDateEvents.id].map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">{t("Select a date to view event details")}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

