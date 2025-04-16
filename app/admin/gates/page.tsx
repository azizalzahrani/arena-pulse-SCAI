"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { DataTable } from "@/components/admin/data-table"
import { GateForm } from "@/components/admin/gates/gate-form"
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
import { Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { ColumnDef } from "@tanstack/react-table"

// Define the Gate type
type Gate = {
  id: string
  name: string
  arabic_name?: string
  status: string
  type: string
  auto_mode: boolean
  capacity: number
  current_flow: number
  security_level: string
  created_at?: string
  updated_at?: string
}

export default function GatesPage() {
  const { toast } = useToast()
  const [gates, setGates] = useState<Gate[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch gates data
  const fetchGates = async () => {
    try {
      setIsRefreshing(true)
      const supabase = createActionClient()
      const { data, error } = await supabase.from("arena_pulse_gates").select("*").order("name")

      if (error) throw error
      setGates(data || [])
    } catch (error) {
      console.error("Error fetching gates:", error)
      toast({
        title: "Error",
        description: "Failed to fetch gates data",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGates()
  }, [])

  // Handle adding a new gate
  const handleAddGate = async (data: Omit<Gate, "id" | "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_gates").insert([data])

      if (error) throw error

      toast({
        title: "Success",
        description: "Gate added successfully",
      })
      setIsAddDialogOpen(false)
      fetchGates()
    } catch (error) {
      console.error("Error adding gate:", error)
      toast({
        title: "Error",
        description: "Failed to add gate",
        variant: "destructive",
      })
    }
  }

  // Handle editing a gate
  const handleEditGate = async (data: Omit<Gate, "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_gates").update(data).eq("id", data.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Gate updated successfully",
      })
      setIsEditDialogOpen(false)
      fetchGates()
    } catch (error) {
      console.error("Error updating gate:", error)
      toast({
        title: "Error",
        description: "Failed to update gate",
        variant: "destructive",
      })
    }
  }

  // Handle deleting a gate
  const handleDeleteGate = async () => {
    if (!selectedGate) return

    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_gates").delete().eq("id", selectedGate.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Gate deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchGates()
    } catch (error) {
      console.error("Error deleting gate:", error)
      toast({
        title: "Error",
        description: "Failed to delete gate",
        variant: "destructive",
      })
    }
  }

  // Table columns definition
  const columns: ColumnDef<Gate>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <div>{row.original.name}</div>
          {row.original.arabic_name && <div className="text-xs text-muted-foreground">{row.original.arabic_name}</div>}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge
            className={
              status === "open"
                ? "bg-green-100 text-green-800"
                : status === "closed"
                  ? "bg-red-100 text-red-800"
                  : status === "partial"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.type.charAt(0).toUpperCase() + row.original.type.slice(1)}</Badge>
      ),
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "current_flow",
      header: "Current Flow",
    },
    {
      accessorKey: "security_level",
      header: "Security Level",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.security_level === "normal"
              ? "bg-green-100 text-green-800"
              : row.original.security_level === "elevated"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }
        >
          {row.original.security_level.charAt(0).toUpperCase() + row.original.security_level.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "auto_mode",
      header: "Auto Mode",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={row.original.auto_mode ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        >
          {row.original.auto_mode ? "Enabled" : "Disabled"}
        </Badge>
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
              setSelectedGate(row.original)
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
              setSelectedGate(row.original)
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
        title="Gates Management"
        description="Add, edit, and delete stadium gates"
        onRefresh={fetchGates}
        onAdd={() => setIsAddDialogOpen(true)}
        showAddButton={true}
        isRefreshing={isRefreshing}
      />

      <div className="container mx-auto p-6">
        <DataTable columns={columns} data={gates} searchColumn="name" searchPlaceholder="Search gates..." />
      </div>

      {/* Add Gate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Gate</DialogTitle>
          </DialogHeader>
          <GateForm onSubmit={handleAddGate} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Gate Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gate</DialogTitle>
          </DialogHeader>
          {selectedGate && (
            <GateForm gate={selectedGate} onSubmit={handleEditGate} onCancel={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the gate "{selectedGate?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGate} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
