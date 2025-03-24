"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Trash2, MoreHorizontal, Calendar, MapPin, Users, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "1",
    name: "Al-Hilal vs Al-Nassr",
    date: "2024-03-15T19:00:00",
    venue: "King Fahd International Stadium",
    type: "league",
    capacity: 68752,
    ticketsSold: 58923,
    status: "On Schedule",
  },
  {
    id: "2",
    name: "Al-Ahli vs Al-Ittihad",
    date: "2024-03-19T20:00:00",
    venue: "King Abdullah Sports City",
    type: "cup",
    capacity: 62345,
    ticketsSold: 45678,
    status: "On Schedule",
  },
  {
    id: "3",
    name: "Saudi Arabia vs UAE",
    date: "2024-03-23T18:00:00",
    venue: "King Fahd International Stadium",
    type: "international",
    capacity: 68752,
    ticketsSold: 61234,
    status: "On Schedule",
  },
  {
    id: "4",
    name: "Al-Shabab vs Al-Fateh",
    date: "2024-03-26T19:30:00",
    venue: "Prince Faisal bin Fahd Stadium",
    type: "league",
    capacity: 22000,
    ticketsSold: 15678,
    status: "On Schedule",
  },
  {
    id: "5",
    name: "Al-Taawoun vs Al-Raed",
    date: "2024-03-30T17:45:00",
    venue: "King Abdullah Sports City",
    type: "league",
    capacity: 62345,
    ticketsSold: 32456,
    status: "On Schedule",
  },
]

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

// Helper function to get badge variant based on event type
const getEventBadgeVariant = (type: string) => {
  switch (type) {
    case "league":
      return "default"
    case "cup":
      return "secondary"
    case "international":
      return "destructive"
    case "friendly":
      return "outline"
    default:
      return "outline"
  }
}

export default function UpcomingEventsList() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedEvent, setSelectedEvent] = useState<(typeof upcomingEvents)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Upcoming Events</CardTitle>
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-start justify-between rounded-lg border p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium">{event.name}</h3>
                  <Badge variant={getEventBadgeVariant(event.type)}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>
                      {event.ticketsSold.toLocaleString()} / {event.capacity.toLocaleString()} tickets sold (
                      {Math.round((event.ticketsSold / event.capacity) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedEvent(event)
                    setDetailsOpen(true)
                  }}
                >
                  Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Cancel</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Event Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.name}</DialogTitle>
              <DialogDescription>Event details and management options</DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Date & Time</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatEventDate(selectedEvent.date)}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Venue</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Ticket Sales</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedEvent.ticketsSold.toLocaleString()} / {selectedEvent.capacity.toLocaleString()} (
                        {Math.round((selectedEvent.ticketsSold / selectedEvent.capacity) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Status</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEvent.status}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium">AI Recommendations</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>
                        Based on historical data, consider opening gates 30 minutes earlier to reduce congestion.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Predicted attendance is 92% of capacity. Prepare additional staff at Gates 2 and 3.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>Weather forecast indicates 30% chance of rain. Consider activating contingency plan.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Edit Event</Button>
                <Button>Manage Staff</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

