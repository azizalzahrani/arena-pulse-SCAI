"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Clock, MapPin, Ticket, AlertTriangle, Edit, Trash2 } from "lucide-react"

export function EventDetails() {
  // Sample event data for the currently selected event
  const event = {
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
      vip: 2000,
      general: 33000,
    },
    ticketsSold: 32500,
    ticketsAvailable: 7500,
    description: "Saudi Pro League match between Al Hilal and Al Nassr.",
    teams: {
      home: "Al Hilal",
      away: "Al Nassr",
    },
    staffAssigned: 450,
    securityLevel: "high",
    weatherForecast: "Clear, 32°C",
    notes: "High-profile match with increased security measures. VIP section fully booked.",
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Event Details</CardTitle>
          <Badge className="bg-green-500">Confirmed</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-arena-blue" />
            <h2 className="text-xl font-bold">{event.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.staffAssigned} Staff</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Attendance</h3>
          <div className="flex justify-between text-xs mb-1">
            <span>Expected: {event.attendance.expected.toLocaleString()}</span>
            <span>Capacity: {event.attendance.capacity.toLocaleString()}</span>
          </div>
          <Progress value={(event.attendance.expected / event.attendance.capacity) * 100} className="h-2" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-muted/50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">General</div>
              <div className="text-sm font-medium">{event.attendance.general.toLocaleString()}</div>
            </div>
            <div className="bg-muted/50 p-2 rounded-md">
              <div className="text-xs text-muted-foreground">VIP</div>
              <div className="text-sm font-medium">{event.attendance.vip.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Ticket Sales</h3>
          <div className="flex justify-between text-xs mb-1">
            <span>Sold: {event.ticketsSold.toLocaleString()}</span>
            <span>Available: {event.ticketsAvailable.toLocaleString()}</span>
          </div>
          <Progress value={(event.ticketsSold / (event.ticketsSold + event.ticketsAvailable)) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Additional Information</h3>
          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <p>{event.notes}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="h-8">
            <Ticket className="h-3.5 w-3.5 mr-1" />
            Ticket Info
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" className="h-8">
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
