"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample event data
const eventData = {
  "2025-04-16": [{ title: "Staff Training", type: "Internal" }],
  "2025-04-18": [{ title: "Stadium Maintenance", type: "Maintenance" }],
  "2025-04-20": [{ title: "Al-Hilal vs Al-Nassr", type: "Football" }],
  "2025-04-25": [{ title: "Saudi Cup Horse Racing", type: "Horse Racing" }],
  "2025-05-02": [{ title: "Crown Prince Camel Festival", type: "Camel Racing" }],
  "2025-05-10": [{ title: "Al-Ahli vs Al-Ittihad", type: "Football" }],
  "2025-05-15": [{ title: "Riyadh Season Concert", type: "Concert" }],
  "2025-05-22": [{ title: "Cultural Festival", type: "Cultural" }],
}

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getEventType = (type: string) => {
    switch (type) {
      case "Football":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Horse Racing":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Camel Racing":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Concert":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "Cultural":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "Maintenance":
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
      case "Internal":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
    }
  }

  const days = getDaysInMonth(currentMonth)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Event Calendar</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{getMonthName(currentMonth)}</span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[80px] rounded-md p-1 ${day ? "border bg-card" : ""} ${
                day && day.toDateString() === new Date().toDateString() ? "border-primary" : "border-border"
              }`}
            >
              {day && (
                <>
                  <div className="text-right text-xs">{day.getDate()}</div>
                  <div className="mt-1 space-y-1">
                    {day &&
                      eventData[formatDateKey(day)]?.map((event, eventIndex) => (
                        <Badge
                          key={eventIndex}
                          variant="outline"
                          className={`block truncate text-xs ${getEventType(event.type)}`}
                        >
                          {event.title}
                        </Badge>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
