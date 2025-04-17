"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Sample event details
const eventDetails = {
  id: 1,
  title: "Al-Hilal vs Al-Nassr",
  type: "Football",
  date: "2025-04-20T19:00:00",
  location: "King Fahd International Stadium",
  expectedAttendance: 68000,
  capacity: 68752,
  ticketsSold: 62500,
  vipTicketsSold: 1800,
  vipCapacity: 2000,
  status: "Confirmed",
  gates: [
    { name: "Gate A", status: "Ready" },
    { name: "Gate B", status: "Ready" },
    { name: "Gate C", status: "Maintenance" },
    { name: "Gate D", status: "Ready" },
  ],
  staffAssigned: 420,
  securityLevel: "High",
}

export function EventDetailsPanel() {
  const [event, setEvent] = useState(eventDetails)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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
      case "Ready":
        return "bg-green-500/10 text-green-500"
      case "Maintenance":
        return "bg-amber-500/10 text-amber-500"
      case "Closed":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-slate-500/10 text-slate-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <Badge variant="outline" className="mt-1">
            {event.type}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            {formatTime(event.date)}
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            {event.location}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Ticket Sales</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>General Admission</span>
              <span>
                {event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()}
              </span>
            </div>
            <Progress value={(event.ticketsSold / event.capacity) * 100} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>VIP Tickets</span>
              <span>
                {event.vipTicketsSold.toLocaleString()} / {event.vipCapacity.toLocaleString()}
              </span>
            </div>
            <Progress value={(event.vipTicketsSold / event.vipCapacity) * 100} className="h-2" />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Gate Status</h4>
          <div className="grid grid-cols-2 gap-2">
            {event.gates.map((gate) => (
              <div key={gate.name} className="flex items-center justify-between rounded-md border p-2 text-sm">
                <span>{gate.name}</span>
                <Badge variant="outline" className={getStatusColor(gate.status)}>
                  {gate.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md border p-2 text-sm">
          <span>Staff Assigned</span>
          <span className="font-medium">{event.staffAssigned}</span>
        </div>

        <div className="flex items-center justify-between rounded-md border p-2 text-sm">
          <span>Security Level</span>
          <Badge>{event.securityLevel}</Badge>
        </div>

        <Button className="w-full">
          View Complete Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
