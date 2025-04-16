"use client"

import { useState } from "react"
import { AIPredictionsHeader } from "@/components/ai-predictions/ai-predictions-header"
import { AIPredictionsOverview } from "@/components/ai-predictions/ai-predictions-overview"
import { CustomPredictionForm } from "@/components/ai-predictions/custom-prediction-form"
import { RecentPredictions } from "@/components/ai-predictions/recent-predictions"
import { PredictionAccuracy } from "@/components/ai-predictions/prediction-accuracy"
import { useToast } from "@/components/ui/use-toast"
import type { PredictionResult } from "@/app/actions/generate-prediction"

export default function AIPredictionsClient() {
  const { toast } = useToast()
  const [predictions, setPredictions] = useState<PredictionResult[]>([])

  // Handle new predictions
  const handlePredictionGenerated = (prediction: PredictionResult) => {
    setPredictions((prev) => [prediction, ...prev])
  }

  // Handle implementing a prediction
  const handleImplementPrediction = (id: string) => {
    toast({
      title: "Prediction Implemented",
      description: "The prediction has been added to your operational dashboard.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <AIPredictionsHeader />
      <div className="container mx-auto p-4 space-y-6">
        <AIPredictionsOverview />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CustomPredictionForm onPredictionGenerated={handlePredictionGenerated} />
          <RecentPredictions initialPredictions={predictions} onImplement={handleImplementPrediction} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PredictionAccuracy />
        </div>
      </div>
    </div>
  )
}
