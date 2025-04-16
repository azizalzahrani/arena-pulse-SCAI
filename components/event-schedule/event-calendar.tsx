"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Music, Star, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "match" | "concert" | "ceremony" | "other"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
}

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState("April 2025")
  const [viewMode, setViewMode] = useState("month")
  const [selectedDate, setSelectedDate] = useState<number | null>(16) // Today's date

  // Sample events data
  const events: Record<number, CalendarEvent[]> = {
    16: [
      {
        id: "1",
        title: "Al Hilal vs Al Nassr",
        date: "Apr 16, 2025",
        time: "19:00",
        type: "match",
        status: "confirmed",
      },
    ],
    18: [
      {
        id: "2",
        title: "Stadium Maintenance",
        date: "Apr 18, 2025",
        time: "09:00",
        type: "other",
        status: "scheduled",
      },
    ],
    20: [
      {
        id: "3",
        title: "International Music Concert",
        date: "Apr 20, 2025",
        time: "20:00",
        type: "concert",
        status: "confirmed",
      },
    ],
    25: [
      {
        id: "4",
        title: "Al Hilal vs Al Ittihad",
        date: "Apr 25, 2025",
        time: "19:00",
        type: "match",
        status: "scheduled",
      },
    ],
    30: [
      {
        id: "5",
        title: "Award Ceremony",
        date: "Apr 30, 2025",
        time: "18:00",
        type: "ceremony",
        status: "scheduled",
      },
    ],
  }

  const daysInMonth = 30 // Simplified for April
  const firstDayOfMonth = 2 // Tuesday (0-indexed, 0 = Sunday)

  const handlePrevMonth = () => {
    setCurrentMonth("March 2025")
  }

  const handleNextMonth = () => {
    setCurrentMonth("May 2025")
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
  }

  const getEventTypeIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "match":
        return <Calendar className="h-3.5 w-3.5 text-arena-blue" />
      case "concert":
        return <Music className="h-3.5 w-3.5 text-arena-purple" />
      case "ceremony":
        return <Star className="h-3.5 w-3.5 text-arena-orange" />
      default:
        return <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
    }
  }

  const getEventStatusBadge = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>{currentMonth}</CardTitle>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Today</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div key={i} className="text-center text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 border rounded-md bg-muted/20"></div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const hasEvents = events[day] !== undefined
            const isSelected = selectedDate === day
            const isToday = day === 16 // Assuming today is April 16

            return (
              <div
                key={`day-${day}`}
                className={`h-24 border rounded-md p-1 overflow-hidden transition-colors ${
                  isSelected
                    ? "border-arena-purple bg-arena-purple/10"
                    : isToday
                      ? "border-arena-blue bg-arena-blue/5"
                      : "hover:bg-muted/20"
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-sm font-medium h-5 w-5 flex items-center justify-center rounded-full ${
                      isToday ? "bg-arena-blue text-white" : ""
                    }`}
                  >
                    {day}
                  </span>
                  {hasEvents && (
                    <Badge className="text-[10px] h-5" variant="outline">
                      {events[day].length}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 space-y-1">
                  {hasEvents &&
                    events[day].map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs truncate rounded px-1 py-0.5 ${
                          event.type === "match"
                            ? "bg-arena-blue/20 text-arena-blue"
                            : event.type === "concert"
                              ? "bg-arena-purple/20 text-arena-purple"
                              : event.type === "ceremony"
                                ? "bg-arena-orange/20 text-arena-orange"
                                : "bg-muted"
                        }`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Date Events */}
        {selectedDate && events[selectedDate] && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-3">Events on April {selectedDate}, 2025</h3>
            <div className="space-y-3">
              {events[selectedDate].map((event) => (
                <div key={event.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getEventTypeIcon(event.type)}
                      <h4 className="font-medium">{event.title}</h4>
                    </div>
                    {getEventStatusBadge(event.status)}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      View Details
                    </Button>
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
