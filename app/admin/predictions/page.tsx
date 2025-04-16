"use client"

import { useState, useEffect } from "react"
import { createActionClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PredictionDetail } from "@/components/admin/predictions/prediction-detail"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle2, Clock, Plus, RefreshCw, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Prediction = {
  id: string
  created_at: string
  event_id: string
  model: string
  prediction_type: string
  confidence: number
  prediction_data: any
  status: string
}

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [predictionToDelete, setPredictionToDelete] = useState<string | null>(null)

  async function fetchPredictions() {
    setLoading(true)
    setError(null)
    try {
      const supabase = createActionClient()
      const { data, error } = await supabase
        .schema("arena_pulse")
        .from("ai_predictions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setPredictions(data || [])
    } catch (err) {
      console.error("Error fetching predictions:", err)
      setError("Failed to load predictions. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPredictions()
    setRefreshing(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createActionClient()
      const { error } = await supabase.schema("arena_pulse").from("ai_predictions").delete().eq("id", id)

      if (error) throw error

      // Remove the deleted prediction from the state
      setPredictions(predictions.filter((p) => p.id !== id))

      // If the deleted prediction was selected, clear the selection
      if (selectedPrediction?.id === id) {
        setSelectedPrediction(null)
      }
    } catch (err) {
      console.error("Error deleting prediction:", err)
      setError("Failed to delete prediction. Please try again later.")
    } finally {
      setDeleteDialogOpen(false)
      setPredictionToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setPredictionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const filteredPredictions = predictions.filter((prediction) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return prediction.status === "pending"
    if (activeTab === "completed") return prediction.status === "completed"
    if (activeTab === "failed") return prediction.status === "failed"
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Predictions</h1>
          <p className="text-muted-foreground">Manage and monitor AI predictions for the arena</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Prediction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Prediction</DialogTitle>
                <DialogDescription>
                  This feature is coming soon. You will be able to create custom predictions.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Predictions</CardTitle>
              <CardDescription>
                {filteredPredictions.length} prediction{filteredPredictions.length !== 1 ? "s" : ""}
              </CardDescription>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500">{error}</p>
                  <Button variant="outline" size="sm" onClick={fetchPredictions} className="mt-2">
                    Try Again
                  </Button>
                </div>
              ) : filteredPredictions.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No predictions found</p>
                </div>
              ) : (
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
                  {filteredPredictions.map((prediction) => (
                    <div
                      key={prediction.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
                        selectedPrediction?.id === prediction.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedPrediction(prediction)}
                    >
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(prediction.status)}
                        <div>
                          <p className="text-sm font-medium">
                            {prediction.prediction_type.charAt(0).toUpperCase() + prediction.prediction_type.slice(1)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(prediction.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <AlertDialog
                        open={deleteDialogOpen && predictionToDelete === prediction.id}
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              confirmDelete(prediction.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the prediction.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(prediction.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedPrediction ? (
            <PredictionDetail prediction={selectedPrediction} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-10">
                <p className="text-muted-foreground">Select a prediction to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
