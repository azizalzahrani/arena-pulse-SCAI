"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, RefreshCw } from "lucide-react"
import { formatDate, formatTime } from "@/utils/format-date"
import { LastUpdated } from "@/components/ui/last-updated"
import { useRealtimeEvents } from "@/hooks/use-realtime-data"

export function UpcomingEventsList() {
  const { data: events, loading, error, lastUpdate } = useRealtimeEvents(5)

  const [recentlyUpdated, setRecentlyUpdated] = useState(false)

  // Visual indicator for recent updates
  useEffect(() => {
    if (lastUpdate) {
      setRecentlyUpdated(true)
      const timer = setTimeout(() => setRecentlyUpdated(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [lastUpdate])

  if (loading && events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Loading events...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>An error occurred.</CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className={recentlyUpdated ? "border-primary transition-colors duration-300" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next scheduled events at the stadium</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {recentlyUpdated && (
              <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse">
                <RefreshCw className="h-3 w-3 mr-1" />
                Live Update
              </Badge>
            )}
            <LastUpdated timestamp={lastUpdate} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No upcoming events scheduled</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`p-4 border rounded-lg space-y-3 ${recentlyUpdated ? "border-primary" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{event.title}</h3>
                <Badge variant={event.type === "match" ? "default" : "outline"}>{event.type}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDate(event.date)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatTime(event.time)}</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Expected: {event.expected_attendance.toLocaleString()}</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="pt-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">
                    {Math.round((event.expected_attendance / event.capacity) * 100)}% Expected
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.round((event.expected_attendance / event.capacity) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
