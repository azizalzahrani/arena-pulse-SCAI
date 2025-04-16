"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Music, Star, Users, MapPin, ArrowRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "match" | "concert" | "ceremony" | "other"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  attendance: {
    expected: number
    capacity: number
  }
  description: string
}

export function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Sample events data
  const events: Event[] = [
    {
      id: "1",
      title: "Al Hilal vs Al Nassr",
      date: "Apr 16, 2025",
      time: "19:00",
      location: "King Fahd Stadium",
      type: "match",
      status: "confirmed",
      attendance: {
        expected: 35000,
        capacity: 40000,
      },
      description: "Saudi Pro League match between Al Hilal and Al Nassr.",
    },
    {
      id: "3",
      title: "International Music Concert",
      date: "Apr 20, 2025",
      time: "20:00",
      location: "King Fahd Stadium",
      type: "concert",
      status: "confirmed",
      attendance: {
        expected: 38000,
        capacity: 40000,
      },
      description: "International music artist performing live.",
    },
    {
      id: "4",
      title: "Al Hilal vs Al Ittihad",
      date: "Apr 25, 2025",
      time: "19:00",
      location: "King Fahd Stadium",
      type: "match",
      status: "scheduled",
      attendance: {
        expected: 32000,
        capacity: 40000,
      },
      description: "Saudi Pro League match between Al Hilal and Al Ittihad.",
    },
    {
      id: "5",
      title: "Award Ceremony",
      date: "Apr 30, 2025",
      time: "18:00",
      location: "King Fahd Stadium",
      type: "ceremony",
      status: "scheduled",
      attendance: {
        expected: 25000,
        capacity: 40000,
      },
      description: "Annual sports awards ceremony.",
    },
    {
      id: "6",
      title: "Al Nassr vs Al Ahli",
      date: "May 5, 2025",
      time: "19:00",
      location: "King Fahd Stadium",
      type: "match",
      status: "scheduled",
      attendance: {
        expected: 30000,
        capacity: 40000,
      },
      description: "Saudi Pro League match between Al Nassr and Al Ahli.",
    },
  ]

  const pastEvents: Event[] = [
    {
      id: "7",
      title: "Al Hilal vs Al Ahli",
      date: "Apr 10, 2025",
      time: "19:00",
      location: "King Fahd Stadium",
      type: "match",
      status: "completed",
      attendance: {
        expected: 33000,
        capacity: 40000,
      },
      description: "Saudi Pro League match between Al Hilal and Al Ahli.",
    },
    {
      id: "8",
      title: "Cultural Festival",
      date: "Apr 5, 2025",
      time: "16:00",
      location: "King Fahd Stadium",
      type: "ceremony",
      status: "completed",
      attendance: {
        expected: 28000,
        capacity: 40000,
      },
      description: "Annual cultural festival celebrating local heritage.",
    },
    {
      id: "9",
      title: "Al Nassr vs Al Ittihad",
      date: "Apr 1, 2025",
      time: "19:00",
      location: "King Fahd Stadium",
      type: "match",
      status: "completed",
      attendance: {
        expected: 34000,
        capacity: 40000,
      },
      description: "Saudi Pro League match between Al Nassr and Al Ittihad.",
    },
  ]

  const filteredEvents = activeTab === "upcoming" ? events : pastEvents

  const getEventTypeIcon = (type: Event["type"]) => {
    switch (type) {
      case "match":
        return <Calendar className="h-4 w-4 text-arena-blue" />
      case "concert":
        return <Music className="h-4 w-4 text-arena-purple" />
      case "ceremony":
        return <Star className="h-4 w-4 text-arena-orange" />
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getEventStatusBadge = (status: Event["status"]) => {
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
          <CardTitle>Events</CardTitle>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="px-4 pb-4 space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getEventTypeIcon(event.type)}
                    <h4 className="font-medium">{event.title}</h4>
                  </div>
                  {getEventStatusBadge(event.status)}
                </div>

                <p className="text-sm text-muted-foreground mt-2">{event.description}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>
                      {event.attendance.expected.toLocaleString()} / {event.attendance.capacity.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            View All Events
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
