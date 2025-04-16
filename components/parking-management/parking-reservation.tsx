"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CreditCard, Ticket, Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function ParkingReservation() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Parking Reservations</CardTitle>
        <CardDescription>Reserve and manage parking spots for upcoming events</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new">
          <TabsList className="mb-4">
            <TabsTrigger value="new">New Reservation</TabsTrigger>
            <TabsTrigger value="manage">Manage Existing</TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event">Select Event</Label>
                  <Select defaultValue="concert">
                    <SelectTrigger id="event">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concert">Summer Concert Series - July 15</SelectItem>
                      <SelectItem value="football">Football Match - July 18</SelectItem>
                      <SelectItem value="exhibition">Tech Exhibition - July 22</SelectItem>
                      <SelectItem value="conference">Business Conference - July 25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lot">Preferred Parking Lot</Label>
                  <Select defaultValue="north">
                    <SelectTrigger id="lot">
                      <SelectValue placeholder="Select parking lot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North Lot (120/154 spaces)</SelectItem>
                      <SelectItem value="east">East Lot (187/203 spaces)</SelectItem>
                      <SelectItem value="south">South Lot (98/150 spaces)</SelectItem>
                      <SelectItem value="west">West Lot (176/202 spaces)</SelectItem>
                      <SelectItem value="vip">VIP Lot (45/50 spaces)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Select defaultValue="sedan">
                    <SelectTrigger id="vehicle">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="accessible">Accessible Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">License Plate</Label>
                  <Input id="license" placeholder="Enter your license plate" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special">Special Requirements</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="special">
                      <SelectValue placeholder="Select if needed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="accessible">Accessible Parking</SelectItem>
                      <SelectItem value="oversized">Oversized Vehicle</SelectItem>
                      <SelectItem value="electric">Electric Vehicle Charging</SelectItem>
                      <SelectItem value="valet">Valet Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Reserve and Pay ($25.00)
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Summer Concert Series - July 15</h3>
                      <p className="text-sm text-muted-foreground">North Lot, Space A-42</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Football Match - July 18</h3>
                      <p className="text-sm text-muted-foreground">VIP Lot, Space V-12</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 opacity-60">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Tech Exhibition - June 22</h3>
                      <p className="text-sm text-muted-foreground">East Lot, Space E-78 (Past Event)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    View Receipt
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
