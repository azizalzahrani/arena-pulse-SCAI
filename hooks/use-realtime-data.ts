"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@/lib/supabase"
import type { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js"

// Generic hook for real-time data
export function useRealtimeData<T>(
  table: string,
  schema = "arena_pulse",
  options: {
    limit?: number
    orderBy?: { column: string; ascending: boolean }
    filter?: { column: string; value: any }
  } = {},
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const supabase = createClientComponentClient()
    let subscription: RealtimeChannel

    async function fetchInitialData() {
      try {
        setLoading(true)

        let query = supabase.from(`${schema}.${table}`).select("*")

        // Apply filter if provided
        if (options.filter) {
          query = query.eq(options.filter.column, options.filter.value)
        }

        // Apply ordering if provided
        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending,
          })
        }

        // Apply limit if provided
        if (options.limit) {
          query = query.limit(options.limit)
        }

        const { data: initialData, error: fetchError } = await query

        if (fetchError) {
          throw new Error(`Error fetching ${table}: ${fetchError.message}`)
        }

        setData(initialData || [])
        setLastUpdate(new Date())
      } catch (err) {
        console.error(`Error in useRealtimeData for ${table}:`, err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()

    // Set up real-time subscription
    subscription = supabase
      .channel(`${schema}_${table}_changes`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: schema,
          table: table,
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          console.log(`Real-time update for ${table}:`, payload)

          // Handle different event types
          if (payload.eventType === "INSERT") {
            setData((currentData) => {
              const newData = [payload.new as T, ...currentData]
              // Apply limit if needed
              return options.limit ? newData.slice(0, options.limit) : newData
            })
          } else if (payload.eventType === "UPDATE") {
            setData((currentData) =>
              currentData.map((item) =>
                // @ts-ignore - We know id exists on our tables
                item.id === payload.new.id ? (payload.new as T) : item,
              ),
            )
          } else if (payload.eventType === "DELETE") {
            setData((currentData) =>
              currentData.filter(
                (item) =>
                  // @ts-ignore - We know id exists on our tables
                  item.id !== payload.old.id,
              ),
            )
          }

          setLastUpdate(new Date())
        },
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [table, schema, JSON.stringify(options)])

  return { data, loading, error, lastUpdate }
}

// Specific hooks for each data type
export type Gate = {
  id: string
  name: string
  arabic_name?: string
  status: string
  type: string
  capacity: number
  current_flow: number
  security_level: string
}

export function useRealtimeGates(limit?: number) {
  return useRealtimeData<Gate>("gates", "arena_pulse", {
    limit,
    orderBy: { column: "name", ascending: true },
  })
}

export type Camera = {
  id: string
  name: string
  location: string
  status: string
  detection_count: number
  sentiment_score: number
  anomaly_count: number
  image_url?: string
  created_at: string
  updated_at: string
}

export function useRealtimeCameras(limit?: number) {
  return useRealtimeData<Camera>("cameras", "arena_pulse", {
    limit,
    orderBy: { column: "anomaly_count", ascending: false },
  })
}

export type Event = {
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
  created_at: string
  updated_at: string
}

export function useRealtimeEvents(limit?: number, status = "scheduled") {
  return useRealtimeData<Event>("events", "arena_pulse", {
    limit,
    filter: { column: "status", value: status },
    orderBy: { column: "date", ascending: true },
  })
}

export type AIPrediction = {
  id: string
  query: string
  result: any
  model?: string
  prediction_type: string
  confidence_score: number
  created_at: string
  created_by?: string
}

export function useRealtimePredictions(limit?: number, predictionType?: string) {
  const options: any = {
    limit,
    orderBy: { column: "created_at", ascending: false },
  }

  if (predictionType) {
    options.filter = { column: "prediction_type", value: predictionType }
  }

  return useRealtimeData<AIPrediction>("ai_predictions", "arena_pulse", options)
}
