"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, RefreshCw, Plus, Filter } from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EventsHeader() {
  const [date, setDate] = useState<Date>(new Date())
  const [venue, setVenue] = useState("all")
  const [eventType, setEventType] = useState("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Schedule, optimize, and analyze events across all venues</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event to your schedule. Fill in the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Event Name
                  </Label>
                  <Input id="name" placeholder="Al-Hilal vs Al-Nassr" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="venue" className="text-right">
                    Venue
                  </Label>
                  <Select defaultValue="king-fahd">
                    <SelectTrigger className="col-span-3" id="venue">
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="king-fahd">King Fahd International Stadium</SelectItem>
                      <SelectItem value="king-abdullah">King Abdullah Sports City</SelectItem>
                      <SelectItem value="prince-faisal">Prince Faisal bin Fahd Stadium</SelectItem>
                      <SelectItem value="mrsool-park">Mrsool Park</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date & Time
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input id="date" type="date" className="flex-1" />
                    <Input id="time" type="time" className="w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Event Type
                  </Label>
                  <Select defaultValue="league">
                    <SelectTrigger className="col-span-3" id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="league">League Match</SelectItem>
                      <SelectItem value="cup">Cup Match</SelectItem>
                      <SelectItem value="international">International Match</SelectItem>
                      <SelectItem value="friendly">Friendly Match</SelectItem>
                      <SelectItem value="special">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">
                    Expected Capacity
                  </Label>
                  <Input id="capacity" type="number" placeholder="60000" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Select value={venue} onValueChange={setVenue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Venues</SelectItem>
              <SelectItem value="king-fahd">King Fahd Stadium</SelectItem>
              <SelectItem value="king-abdullah">King Abdullah Sports City</SelectItem>
              <SelectItem value="prince-faisal">Prince Faisal Stadium</SelectItem>
              <SelectItem value="mrsool-park">Mrsool Park</SelectItem>
            </SelectContent>
          </Select>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="league">League Matches</SelectItem>
              <SelectItem value="cup">Cup Matches</SelectItem>
              <SelectItem value="international">International</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="special">Special Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Schedule
        </Button>
      </div>
    </div>
  )
}

