"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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

// Define the form schema
const gateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  arabic_name: z.string().optional(),
  status: z.enum(["open", "closed", "partial", "maintenance"]),
  type: z.enum(["main", "vip", "service", "emergency", "family"]),
  auto_mode: z.boolean().default(false),
  capacity: z.coerce.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  current_flow: z.coerce.number().min(0, {
    message: "Current flow must be at least 0.",
  }),
  security_level: z.enum(["normal", "elevated", "high"]),
})

type GateFormValues = z.infer<typeof gateFormSchema>

interface GateFormProps {
  gate?: Gate
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function GateForm({ gate, onSubmit, onCancel }: GateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default form values
  const defaultValues: Partial<GateFormValues> = {
    name: gate?.name || "",
    arabic_name: gate?.arabic_name || "",
    status: gate?.status || "closed",
    type: gate?.type || "main",
    auto_mode: gate?.auto_mode || false,
    capacity: gate?.capacity || 1000,
    current_flow: gate?.current_flow || 0,
    security_level: gate?.security_level || "normal",
  }

  const form = useForm<GateFormValues>({
    resolver: zodResolver(gateFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: GateFormValues) => {
    setIsSubmitting(true)
    try {
      if (gate) {
        // If editing, include the ID
        await onSubmit({ id: gate.id, ...data })
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
                <Input placeholder="Enter gate name" {...field} />
              </FormControl>
              <FormDescription>The English name of the gate.</FormDescription>
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
              <FormDescription>The Arabic name of the gate (optional).</FormDescription>
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="main">Main</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Type of gate.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Maximum capacity of the gate.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current_flow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Flow</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Current flow through the gate.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="security_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="elevated">Elevated</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Security level at this gate.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="auto_mode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Auto Mode</FormLabel>
                  <FormDescription>Enable automatic gate control.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : gate ? "Update Gate" : "Add Gate"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
