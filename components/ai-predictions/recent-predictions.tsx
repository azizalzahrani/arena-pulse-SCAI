"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionDetail } from "./prediction-detail"
import { useToast } from "@/components/ui/use-toast"
import type { PredictionResult } from "@/app/actions/generate-prediction"
import { createActionClient } from "@/lib/supabase"

interface RecentPredictionsProps {
  initialPredictions?: PredictionResult[]
  onImplement?: (id: string) => void
}

export function RecentPredictions({ initialPredictions = [], onImplement }: RecentPredictionsProps) {
  const { toast } = useToast()
  const [predictions, setPredictions] = useState<PredictionResult[]>(initialPredictions)
  const [loading, setLoading] = useState(false)

  // Fetch predictions from the database on component mount
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true)
        const supabase = createActionClient()
        const { data, error } = await supabase
          .from("arena_pulse.ai_predictions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error

        // Transform database predictions to the PredictionResult format
        if (data && data.length > 0) {
          const formattedPredictions = data.map((p) => {
            // The result column contains the full prediction result
            return p.result as unknown as PredictionResult
          })

          setPredictions(formattedPredictions)
        }
      } catch (error) {
        console.error("Error fetching predictions:", error)
        toast({
          title: "Error",
          description: "Failed to fetch predictions from the database",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [toast])

  // Add a new prediction to the list
  const addPrediction = (prediction: PredictionResult) => {
    setPredictions((prev) => [prediction, ...prev])
  }

  // Handle implementing a prediction
  const handleImplement = (id: string) => {
    if (onImplement) {
      onImplement(id)
    } else {
      toast({
        title: "Prediction Implemented",
        description: "The prediction has been implemented successfully.",
      })
    }
  }

  // Handle exporting a prediction
  const handleExport = (prediction: PredictionResult) => {
    // Create a JSON blob and download it
    const blob = new Blob([JSON.stringify(prediction, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prediction-${prediction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Prediction Exported",
      description: "The prediction has been exported as JSON.",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Predictions</CardTitle>
        <CardDescription>View and manage your recent AI predictions</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <p>Loading predictions...</p>
          </div>
        ) : predictions.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">No predictions yet</h3>
              <p className="text-sm text-muted-foreground">Use the form to generate your first AI prediction</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high">High Impact</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {predictions.map((prediction) => (
                <PredictionDetail
                  key={prediction.id}
                  prediction={prediction}
                  onImplement={handleImplement}
                  onExport={handleExport}
                />
              ))}
            </TabsContent>
            <TabsContent value="high" className="space-y-4">
              {predictions
                .filter((p) => p.impact === "high")
                .map((prediction) => (
                  <PredictionDetail
                    key={prediction.id}
                    prediction={prediction}
                    onImplement={handleImplement}
                    onExport={handleExport}
                  />
                ))}
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              {predictions.slice(0, 3).map((prediction) => (
                <PredictionDetail
                  key={prediction.id}
                  prediction={prediction}
                  onImplement={handleImplement}
                  onExport={handleExport}
                />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
