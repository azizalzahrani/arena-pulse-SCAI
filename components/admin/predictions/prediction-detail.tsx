"use client"

import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, CheckCircle, AlertTriangle } from "lucide-react"
import { formatRelativeTime } from "@/utils/format-date"

// Define the Prediction type
type Prediction = {
  id: string
  prediction_type: string
  query: string
  result: any
  model: string
  confidence_score: number
  created_at: string
  created_by: string
}

interface PredictionDetailProps {
  prediction: Prediction
}

export function PredictionDetail({ prediction }: PredictionDetailProps) {
  // Format prediction type for display
  const formatPredictionType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Get impact badge color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-arena-purple" />
          <h2 className="text-xl font-bold">{formatPredictionType(prediction.prediction_type)} Prediction</h2>
        </div>
        <Badge className="bg-arena-purple/10 text-arena-purple font-mono">{prediction.model}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Generated</h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatRelativeTime(prediction.created_at)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Confidence</h3>
          <Badge
            className={
              prediction.confidence_score > 0.8
                ? "bg-green-100 text-green-800"
                : prediction.confidence_score > 0.6
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }
          >
            {Math.round(prediction.confidence_score * 100)}%
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Query</h3>
        <div className="bg-muted p-3 rounded-md text-sm font-mono whitespace-pre-wrap">{prediction.query}</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Result</h3>
        <div className="border rounded-md p-4 space-y-4">
          {prediction.result.title && (
            <div>
              <h4 className="font-medium">Title</h4>
              <p>{prediction.result.title}</p>
            </div>
          )}

          {prediction.result.summary && (
            <div>
              <h4 className="font-medium">Summary</h4>
              <p>{prediction.result.summary}</p>
            </div>
          )}

          {prediction.result.description && (
            <div>
              <h4 className="font-medium">Description</h4>
              <p>{prediction.result.description}</p>
            </div>
          )}

          {prediction.result.impact && (
            <div>
              <h4 className="font-medium">Impact</h4>
              <Badge className={getImpactColor(prediction.result.impact)}>
                {prediction.result.impact.charAt(0).toUpperCase() + prediction.result.impact.slice(1)}
              </Badge>
            </div>
          )}

          {prediction.result.recommendations && (
            <div>
              <h4 className="font-medium">Recommendations</h4>
              <ul className="mt-2 space-y-2">
                {prediction.result.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prediction.result.riskFactors && (
            <div>
              <h4 className="font-medium">Risk Factors</h4>
              <ul className="mt-2 space-y-2">
                {prediction.result.riskFactors.map((risk: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
