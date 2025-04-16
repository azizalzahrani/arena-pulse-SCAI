"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { DataTable } from "@/components/admin/data-table"
import { CameraForm } from "@/components/admin/cameras/camera-form"
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
import Image from "next/image"

// Define the Camera type
type CameraType = {
  id: string
  name: string
  arabic_name?: string
  location: string
  status: string
  detection_count: number
  sentiment_score: number
  anomaly_count: number
  image_url?: string
  created_at?: string
  updated_at?: string
}

export default function CamerasPage() {
  const { toast } = useToast()
  const [cameras, setCameras] = useState<CameraType[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<CameraType | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch cameras data
  const fetchCameras = async () => {
    try {
      setIsRefreshing(true)
      const supabase = createActionClient()
      const { data, error } = await supabase.from("arena_pulse_cameras").select("*").order("name")

      if (error) throw error
      setCameras(data || [])
    } catch (error) {
      console.error("Error fetching cameras:", error)
      toast({
        title: "Error",
        description: "Failed to fetch cameras data",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCameras()
  }, [])

  // Handle adding a new camera
  const handleAddCamera = async (data: Omit<CameraType, "id" | "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_cameras").insert([data])

      if (error) throw error

      toast({
        title: "Success",
        description: "Camera added successfully",
      })
      setIsAddDialogOpen(false)
      fetchCameras()
    } catch (error) {
      console.error("Error adding camera:", error)
      toast({
        title: "Error",
        description: "Failed to add camera",
        variant: "destructive",
      })
    }
  }

  // Handle editing a camera
  const handleEditCamera = async (data: Omit<CameraType, "created_at" | "updated_at">) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_cameras").update(data).eq("id", data.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Camera updated successfully",
      })
      setIsEditDialogOpen(false)
      fetchCameras()
    } catch (error) {
      console.error("Error updating camera:", error)
      toast({
        title: "Error",
        description: "Failed to update camera",
        variant: "destructive",
      })
    }
  }

  // Handle deleting a camera
  const handleDeleteCamera = async () => {
    if (!selectedCamera) return

    try {
      const supabase = createActionClient()
      const { error } = await supabase.from("arena_pulse_cameras").delete().eq("id", selectedCamera.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Camera deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchCameras()
    } catch (error) {
      console.error("Error deleting camera:", error)
      toast({
        title: "Error",
        description: "Failed to delete camera",
        variant: "destructive",
      })
    }
  }

  // Table columns definition
  const columns: ColumnDef<CameraType>[] = [
    {
      accessorKey: "image_url",
      header: "Preview",
      cell: ({ row }) => {
        const imageUrl = row.original.image_url || "/vintage-camera-still-life.png"
        return (
          <div className="relative h-16 w-24 rounded-md overflow-hidden">
            <Image src={imageUrl || "/placeholder.svg"} alt={row.original.name} fill className="object-cover" />
          </div>
        )
      },
    },
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
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-800"
                : status === "inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "detection_count",
      header: "Detections",
    },
    {
      accessorKey: "sentiment_score",
      header: "Sentiment",
      cell: ({ row }) => {
        const score = row.original.sentiment_score
        return (
          <Badge
            className={
              score > 0.7
                ? "bg-green-100 text-green-800"
                : score > 0.4
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }
          >
            {Math.round(score * 100)}%
          </Badge>
        )
      },
    },
    {
      accessorKey: "anomaly_count",
      header: "Anomalies",
      cell: ({ row }) => {
        const count = row.original.anomaly_count
        return (
          <Badge
            className={
              count === 0
                ? "bg-green-100 text-green-800"
                : count < 3
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }
          >
            {count}
          </Badge>
        )
      },
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
              setSelectedCamera(row.original)
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
              setSelectedCamera(row.original)
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
        title="Cameras Management"
        description="Add, edit, and delete surveillance cameras"
        onRefresh={fetchCameras}
        onAdd={() => setIsAddDialogOpen(true)}
        showAddButton={true}
        isRefreshing={isRefreshing}
      />

      <div className="container mx-auto p-6">
        <DataTable columns={columns} data={cameras} searchColumn="name" searchPlaceholder="Search cameras..." />
      </div>

      {/* Add Camera Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Camera</DialogTitle>
          </DialogHeader>
          <CameraForm onSubmit={handleAddCamera} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Camera Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Camera</DialogTitle>
          </DialogHeader>
          {selectedCamera && (
            <CameraForm
              camera={selectedCamera}
              onSubmit={handleEditCamera}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the camera "{selectedCamera?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCamera} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
