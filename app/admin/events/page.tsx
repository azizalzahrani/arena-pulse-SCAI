"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { DataTable } from "@/components/admin/data-table"
import { EventForm } from "@/components/admin/events/event-form"
import { createActionClient } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Calendar, Clock, MapPin, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDate, formatTime } from "@/utils/format-date"

// Define the Event type
type Event = {
  id: string
  title: string
  description: string
  status: string
  type: string
  date: string
  time: string
  location: string
  capacity: number
  expected_attendance: number
  created_at?: string
  updated_at?: string
}

export default function EventsPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch events data
  const fetchEvents = async () => {
    try {
      setIsRefreshing(true)
      const supabase = createActionClient()
      const { data, error } = await supabase.from("arena_pulse_events").select("*").order("date", { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to fetch events data",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Handle adding a new event
  const handleAddEvent = async (data: Omit<Event, "id" | "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_events").insert([data])

      if (error) throw error

      toast({
        title: "Success",
        description: "Event added successfully",
      })
      setIsAddDialogOpen(false)
      fetchEvents()
    } catch (error) {
      console.error("Error adding event:", error)
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      })
    }
  }

  // Handle editing an event
  const handleEditEvent = async (data: Omit<Event, "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_events").update(data).eq("id", data.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Event updated successfully",
      })
      setIsEditDialogOpen(false)
      fetchEvents()
    } catch (error) {
      console.error("Error updating event:", error)
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      })
    }
  }

  // Handle deleting an event
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_events").delete().eq("id", selectedEvent.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  // Table columns definition
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-muted-foreground">{row.original.description}</div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.type === "match"
              ? "bg-blue-100 text-blue-800"
              : row.original.type === "concert"
                ? "bg-purple-100 text-purple-800"
                : row.original.type === "ceremony"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
          }
        >
          {row.original.type.charAt(0).toUpperCase() + row.original.type.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.status === "scheduled"
              ? "bg-blue-100 text-blue-800"
              : row.original.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : row.original.status === "completed"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
          }
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          {formatDate(row.original.date)}
        </div>
      ),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          {formatTime(row.original.time)}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.original.location}
        </div>
      ),
    },
    {
      accessorKey: "attendance",
      header: "Attendance",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>
            {row.original.expected_attendance.toLocaleString()} / {row.original.capacity.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedEvent(row.original)
              setIsEditDialogOpen(true)
            }}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              setSelectedEvent(row.original)
              setIsDeleteDialogOpen(true)
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <AdminHeader
        title="Events Management"
        description="Add, edit, and delete stadium events"
        onRefresh={fetchEvents}
        onAdd={() => setIsAddDialogOpen(true)}
        showAddButton={true}
        isRefreshing={isRefreshing}
      />

      <div className="container mx-auto p-6">
        <DataTable columns={columns} data={events} searchColumn="title" searchPlaceholder="Search events..." />
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <EventForm onSubmit={handleAddEvent} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <EventForm event={selectedEvent} onSubmit={handleEditEvent} onCancel={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event "{selectedEvent?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
