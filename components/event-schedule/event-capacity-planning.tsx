"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample capacity data
const capacityData = [
  {
    id: 1,
    name: "King Fahd International Stadium",
    totalCapacity: 68752,
    sections: [
      { name: "North Stand", capacity: 18000, accessible: true },
      { name: "South Stand", capacity: 18000, accessible: true },
      { name: "East Stand", capacity: 15000, accessible: true },
      { name: "West Stand", capacity: 15000, accessible: true },
      { name: "VIP Boxes", capacity: 2752, accessible: true },
    ],
    facilities: [
      { name: "Parking Lots", capacity: 10000, status: "Available" },
      { name: "Food Courts", capacity: 5000, status: "Available" },
      { name: "Prayer Areas", capacity: 2000, status: "Available" },
      { name: "First Aid Stations", capacity: 500, status: "Available" },
    ],
    upcomingEvents: [
      {
        name: "Al-Hilal vs Al-Nassr",
        date: "2025-04-20",
        expectedAttendance: 68000,
      },
      {
        name: "Saudi Pro League: Al-Ahli vs Al-Ittihad",
        date: "2025-05-10",
        expectedAttendance: 59000,
      },
    ],
  },
  {
    id: 2,
    name: "King Abdullah Sports City",
    totalCapacity: 62000,
    sections: [
      { name: "North Stand", capacity: 16000, accessible: true },
      { name: "South Stand", capacity: 16000, accessible: true },
      { name: "East Stand", capacity: 14000, accessible: true },
      { name: "West Stand", capacity: 14000, accessible: true },
      { name: "VIP Boxes", capacity: 2000, accessible: true },
    ],
    facilities: [
      { name: "Parking Lots", capacity: 8000, status: "Available" },
      { name: "Food Courts", capacity: 4000, status: "Available" },
      { name: "Prayer Areas", capacity: 1500, status: "Available" },
      { name: "First Aid Stations", capacity: 400, status: "Available" },
    ],
    upcomingEvents: [
      {
        name: "Saudi Pro League: Al-Ahli vs Al-Ittihad",
        date: "2025-05-10",
        expectedAttendance: 59000,
      },
    ],
  },
  {
    id: 3,
    name: "King Abdulaziz Racetrack",
    totalCapacity: 15000,
    sections: [
      { name: "Main Grandstand", capacity: 8000, accessible: true },
      { name: "East Wing", capacity: 3500, accessible: true },
      { name: "West Wing", capacity: 3500, accessible: true },
    ],
    facilities: [
      { name: "Parking Lots", capacity: 3000, status: "Available" },
      { name: "Food Courts", capacity: 1500, status: "Available" },
      { name: "Prayer Areas", capacity: 500, status: "Available" },
      { name: "First Aid Stations", capacity: 200, status: "Available" },
    ],
    upcomingEvents: [
      {
        name: "Saudi Cup Horse Racing",
        date: "2025-04-25",
        expectedAttendance: 12000,
      },
    ],
  },
]

export function EventCapacityPlanning() {
  const [venues, setVenues] = useState(capacityData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue Capacity Planning</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1">
          <TabsList className="mb-4">
            {venues.map((venue) => (
              <TabsTrigger key={venue.id} value={venue.id.toString()}>
                {venue.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {venues.map((venue) => (
            <TabsContent key={venue.id} value={venue.id.toString()}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Venue Overview</h3>
                    <div className="mt-2 text-2xl font-bold">{venue.totalCapacity.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total Capacity</p>

                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Upcoming Events</h4>
                      {venue.upcomingEvents.map((event, index) => (
                        <div key={index} className="rounded-md border p-2">
                          <div className="font-medium">{event.name}</div>
                          <div className="flex items-center justify-between text-sm">
                            <span>{event.date}</span>
                            <span>{event.expectedAttendance.toLocaleString()} expected</span>
                          </div>
                          <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                            <div
                              className="h-1.5 rounded-full bg-primary"
                              style={{
                                width: `${Math.min(100, (event.expectedAttendance / venue.totalCapacity) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Sections</h3>
                    <div className="mt-2 space-y-2">
                      {venue.sections.map((section, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                          <span>{section.name}</span>
                          <div className="flex items-center">
                            <span className="mr-2">{section.capacity.toLocaleString()}</span>
                            <Badge variant={section.accessible ? "default" : "destructive"}>
                              {section.accessible ? "Open" : "Closed"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Facilities</h3>
                    <div className="mt-2 space-y-2">
                      {venue.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                          <span>{facility.name}</span>
                          <div className="flex items-center">
                            <span className="mr-2">{facility.capacity.toLocaleString()}</span>
                            <Badge variant={facility.status === "Available" ? "outline" : "destructive"}>
                              {facility.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
