"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, TrendingDown, TrendingUp, Thermometer, Users, Car, Calendar, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface PredictionItem {
  id: string
  title: string
  time: string
  description: string
  impact: "low" | "medium" | "high"
  trend: "increasing" | "decreasing" | "stable"
  icon: "crowd" | "temperature" | "traffic" | "prayer" | "event"
  accuracy: number
  generated: string
}

const mockPredictions: PredictionItem[] = [
  {
    id: "1",
    title: "Prayer Time Impact",
    time: "15 min",
    description: "Crowd movement expected for Asr prayer. Prepare prayer areas and adjust staff.",
    impact: "medium",
    trend: "increasing",
    icon: "prayer",
    accuracy: 94,
    generated: "10 minutes ago",
  },
  {
    id: "2",
    title: "Temperature Increase",
    time: "30 min",
    description: "Stadium temperature rising, adjust cooling systems in sections A, B, and VIP.",
    impact: "medium",
    trend: "increasing",
    icon: "temperature",
    accuracy: 91,
    generated: "15 minutes ago",
  },
  {
    id: "3",
    title: "Post-Match Traffic",
    time: "90 min",
    description: "Heavy traffic expected at parking areas. Coordinate with traffic control.",
    impact: "high",
    trend: "increasing",
    icon: "traffic",
    accuracy: 88,
    generated: "25 minutes ago",
  },
  {
    id: "4",
    title: "Family Section Capacity",
    time: "45 min",
    description: "Family section approaching capacity. Consider opening additional seating areas.",
    impact: "medium",
    trend: "stable",
    icon: "crowd",
    accuracy: 95,
    generated: "30 minutes ago",
  },
  {
    id: "5",
    title: "VIP Arrival Prediction",
    time: "60 min",
    description: "VIP guests expected to arrive. Prepare special protocols and security measures.",
    impact: "medium",
    trend: "increasing",
    icon: "event",
    accuracy: 89,
    generated: "35 minutes ago",
  },
  {
    id: "6",
    title: "Concession Area Demand",
    time: "20 min",
    description: "Increased demand expected at concession areas. Ensure adequate staffing.",
    impact: "low",
    trend: "increasing",
    icon: "crowd",
    accuracy: 92,
    generated: "40 minutes ago",
  },
]

const getImpactColor = (impact: PredictionItem["impact"]) => {
  switch (impact) {
    case "low":
      return "bg-arena-teal text-white"
    case "medium":
      return "bg-arena-orange text-white"
    case "high":
      return "bg-destructive text-destructive-foreground"
  }
}

const getIcon = (icon: PredictionItem["icon"]) => {
  switch (icon) {
    case "crowd":
      return <Users className="h-5 w-5 text-muted-foreground" />
    case "temperature":
      return <Thermometer className="h-5 w-5 text-arena-orange" />
    case "traffic":
      return <Car className="h-5 w-5 text-muted-foreground" />
    case "prayer":
      return <Clock className="h-5 w-5 text-arena-purple" />
    case "event":
      return <Calendar className="h-5 w-5 text-arena-blue" />
  }
}

export function RecentPredictions() {
  const { toast } = useToast()
  const [predictions, setPredictions] = useState<PredictionItem[]>(mockPredictions)
  const [viewingPrediction, setViewingPrediction] = useState<string | null>(null)

  const handleViewDetails = (id: string) => {
    setViewingPrediction(id === viewingPrediction ? null : id)
  }

  const handleExport = (id: string) => {
    // Simulate export functionality
    toast({
      title: "Prediction Exported",
      description: "The prediction has been exported to PDF format.",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Predictions</CardTitle>
        <CardDescription>AI-generated predictions based on current stadium conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-0.5">{getIcon(prediction.icon)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{prediction.title}</h4>
                    <Badge className={cn(getImpactColor(prediction.impact))}>
                      {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{prediction.description}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">In {prediction.time}</span>
                    <span className="text-xs flex items-center gap-0.5">
                      {prediction.trend === "increasing" ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-destructive" />
                          <span className="text-destructive">Increasing</span>
                        </>
                      ) : prediction.trend === "decreasing" ? (
                        <>
                          <TrendingDown className="h-3 w-3 text-arena-teal" />
                          <span className="text-arena-teal">Decreasing</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Stable</span>
                      )}
                    </span>
                  </div>

                  {viewingPrediction === prediction.id && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Accuracy:</span>
                          <span className="ml-1 font-medium">{prediction.accuracy}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Generated:</span>
                          <span className="ml-1 font-medium">{prediction.generated}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handleExport(prediction.id)}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Export
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex items-center gap-1 h-7 px-2"
                      onClick={() => handleViewDetails(prediction.id)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {viewingPrediction === prediction.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
