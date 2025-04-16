"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the Camera type
type Camera = {
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

// Define the form schema
const cameraFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  arabic_name: z.string().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.enum(["active", "inactive", "maintenance"]),
  detection_count: z.coerce.number().min(0, {
    message: "Detection count must be at least 0.",
  }),
  sentiment_score: z.coerce.number().min(0).max(1, {
    message: "Sentiment score must be between 0 and 1.",
  }),
  anomaly_count: z.coerce.number().min(0, {
    message: "Anomaly count must be at least 0.",
  }),
  image_url: z.string().optional(),
})

type CameraFormValues = z.infer<typeof cameraFormSchema>

interface CameraFormProps {
  camera?: Camera
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function CameraForm({ camera, onSubmit, onCancel }: CameraFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default form values
  const defaultValues: Partial<CameraFormValues> = {
    name: camera?.name || "",
    arabic_name: camera?.arabic_name || "",
    location: camera?.location || "",
    status: camera?.status || "active",
    detection_count: camera?.detection_count || 0,
    sentiment_score: camera?.sentiment_score || 0.5,
    anomaly_count: camera?.anomaly_count || 0,
    image_url: camera?.image_url || "/vintage-camera-still-life.png",
  }

  const form = useForm<CameraFormValues>({
    resolver: zodResolver(cameraFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: CameraFormValues) => {
    setIsSubmitting(true)
    try {
      if (camera) {
        // If editing, include the ID
        await onSubmit({ id: camera.id, ...data })
      } else {
        // If adding new, just submit the data
        await onSubmit(data)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter camera name" {...field} />
              </FormControl>
              <FormDescription>The English name of the camera.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arabic_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arabic Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Arabic name" {...field} />
              </FormControl>
              <FormDescription>The Arabic name of the camera (optional).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter camera location" {...field} />
              </FormControl>
              <FormDescription>Where the camera is located in the stadium.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Current operational status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormDescription>URL to the camera feed image.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="detection_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detection Count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Number of detections.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sentiment_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sentiment Score</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" max="1" {...field} />
                </FormControl>
                <FormDescription>Score between 0-1.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="anomaly_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anomaly Count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Number of anomalies.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : camera ? "Update Camera" : "Add Camera"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
