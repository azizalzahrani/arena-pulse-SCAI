"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Users, MapPin, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Al-Hilal vs Al-Nassr",
    type: "Football",
    date: "2025-04-20T19:00:00",
    location: "King Fahd International Stadium",
    expectedAttendance: 68000,
    capacity: 68752,
    image: "/vibrant-stadium-atmosphere.png",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "Saudi Cup Horse Racing",
    type: "Horse Racing",
    date: "2025-04-25T16:30:00",
    location: "King Abdulaziz Racetrack",
    expectedAttendance: 12000,
    capacity: 15000,
    image: "/saudi-desert-race.png",
    status: "Confirmed",
  },
  {
    id: 3,
    title: "Crown Prince Camel Festival",
    type: "Camel Racing",
    date: "2025-05-02T15:00:00",
    location: "King Abdulaziz Camel Racing Track",
    expectedAttendance: 8500,
    capacity: 10000,
    image: "/desert-race.png",
    status: "Planning",
  },
  {
    id: 4,
    title: "Saudi Pro League: Al-Ahli vs Al-Ittihad",
    type: "Football",
    date: "2025-05-10T20:00:00",
    location: "King Abdullah Sports City",
    expectedAttendance: 59000,
    capacity: 62000,
    image: "/modern-saudi-stadium.png",
    status: "Confirmed",
  },
  {
    id: 5,
    title: "Riyadh Season Concert",
    type: "Concert",
    date: "2025-05-15T21:00:00",
    location: "Mohammed Abdo Arena",
    expectedAttendance: 18000,
    capacity: 20000,
    image: "/saudi-concert-night.png",
    status: "Planning",
  },
]

export function UpcomingEvents() {
  const [events, setEvents] = useState(upcomingEvents)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Planning":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
    }
  }

  const getAttendancePercentage = (expected: number, capacity: number) => {
    return Math.round((expected / capacity) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm md:flex-row"
            >
              <div className="relative h-48 w-full md:h-auto md:w-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge variant="outline" className="mt-1">
                      {event.type}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {formatTime(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {event.expectedAttendance.toLocaleString()} / {event.capacity.toLocaleString()} (
                    {getAttendancePercentage(event.expectedAttendance, event.capacity)}%)
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${getAttendancePercentage(event.expectedAttendance, event.capacity)}%`,
                      }}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="ml-2 rounded-full p-1 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Event</DropdownMenuItem>
                      <DropdownMenuItem>Manage Capacity</DropdownMenuItem>
                      <DropdownMenuItem>Generate Reports</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
