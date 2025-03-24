"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

export default function StaffHeader() {
  const [date, setDate] = useState<Date>(new Date())
  const [venue, setVenue] = useState("all")
  const [staffType, setStaffType] = useState("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Optimize staffing levels and performance across all venues</p>
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
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>Add a new staff member to your team. Fill in the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="Mohammed Al-Harbi" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Select defaultValue="security">
                    <SelectTrigger className="col-span-3" id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security Staff</SelectItem>
                      <SelectItem value="concessions">Concessions Staff</SelectItem>
                      <SelectItem value="ticketing">Ticketing Staff</SelectItem>
                      <SelectItem value="cleaning">Cleaning Staff</SelectItem>
                      <SelectItem value="medical">Medical Staff</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="venue" className="text-right">
                    Primary Venue
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
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" placeholder="+966 50 123 4567" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="mohammed@example.com" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Staff Member</Button>
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
          <Select value={staffType} onValueChange={setStaffType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Staff type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="concessions">Concessions</SelectItem>
              <SelectItem value="ticketing">Ticketing</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="supervisors">Supervisors</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Staff Data
        </Button>
      </div>
    </div>
  )
}

