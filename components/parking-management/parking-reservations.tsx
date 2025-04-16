"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock reservation data
const initialReservations = [
  {
    id: "RES-001",
    name: "Ahmed Al-Farsi",
    type: "VIP",
    date: "2023-11-15",
    event: "Al-Hilal vs. Al-Nassr",
    status: "confirmed",
    spotId: "V-23",
  },
  {
    id: "RES-002",
    name: "Fatima Khalid",
    type: "General",
    date: "2023-11-15",
    event: "Al-Hilal vs. Al-Nassr",
    status: "confirmed",
    spotId: "G-156",
  },
  {
    id: "RES-003",
    name: "Mohammed Al-Qahtani",
    type: "Handicap",
    date: "2023-11-15",
    event: "Al-Hilal vs. Al-Nassr",
    status: "pending",
    spotId: "H-12",
  },
  {
    id: "RES-004",
    name: "Noura Al-Saud",
    type: "VIP",
    date: "2023-11-18",
    event: "Concert: Khaleeji Night",
    status: "confirmed",
    spotId: "V-05",
  },
  {
    id: "RES-005",
    name: "Saad Ibrahim",
    type: "General",
    date: "2023-11-18",
    event: "Concert: Khaleeji Night",
    status: "cancelled",
    spotId: "G-201",
  },
]

export function ParkingReservations() {
  const [reservations, setReservations] = useState(initialReservations)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newReservation, setNewReservation] = useState({
    name: "",
    type: "General",
    date: "",
    event: "",
    spotId: "",
  })

  const handleAddReservation = () => {
    const id = `RES-${String(reservations.length + 1).padStart(3, "0")}`
    setReservations([
      ...reservations,
      {
        ...newReservation,
        id,
        status: "confirmed",
      },
    ])
    setIsDialogOpen(false)
    setNewReservation({
      name: "",
      type: "General",
      date: "",
      event: "",
      spotId: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Parking Reservations</CardTitle>
          <CardDescription>Manage parking spot reservations for upcoming events</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Reservation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reservation</DialogTitle>
              <DialogDescription>Create a new parking reservation for an upcoming event.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newReservation.name}
                  onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newReservation.type}
                  onValueChange={(value) => setNewReservation({ ...newReservation, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Handicap">Handicap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newReservation.date}
                  onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Event
                </Label>
                <Input
                  id="event"
                  value={newReservation.event}
                  onChange={(e) => setNewReservation({ ...newReservation, event: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="spotId" className="text-right">
                  Spot ID
                </Label>
                <Input
                  id="spotId"
                  value={newReservation.spotId}
                  onChange={(e) => setNewReservation({ ...newReservation, spotId: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddReservation}>Add Reservation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Spot</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.id}</TableCell>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.type}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.event}</TableCell>
                <TableCell>{reservation.spotId}</TableCell>
                <TableCell>{getStatusBadge(reservation.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
