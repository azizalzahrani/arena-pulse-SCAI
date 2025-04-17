"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle, XCircle, ArrowRight } from "lucide-react"

export function CameraAIRecommendations() {
  const [dismissedRecommendations, setDismissedRecommendations] = useState<number[]>([])

  const recommendations = [
    {
      id: 1,
      title: "Open Gate B",
      description: "Based on current crowd flow, opening Gate B would reduce Gate A congestion by approximately 35%.",
      impact: "High",
      timeframe: "Immediate",
    },
    {
      id: 2,
      title: "Redirect VIP Traffic",
      description: "VIP section approaching capacity. Direct new arrivals to secondary VIP area in East Stand.",
      impact: "Medium",
      timeframe: "Next 15 minutes",
    },
    {
      id: 3,
      title: "Increase Concourse Monitoring",
      description: "Unusual crowd density patterns detected. Increase security presence in main concourse.",
      impact: "Medium",
      timeframe: "Next 30 minutes",
    },
  ]

  const activeRecommendations = recommendations.filter((rec) => !dismissedRecommendations.includes(rec.id))

  const handleDismiss = (id: number) => {
    setDismissedRecommendations((prev) => [...prev, id])
  }

  const handleImplement = (id: number) => {
    // In a real app, this would trigger an action
    handleDismiss(id)
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge className="bg-red-500">High Impact</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium Impact</Badge>
      case "Low":
        return <Badge className="bg-blue-500">Low Impact</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
          AI Recommendations
        </CardTitle>
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
          {activeRecommendations.length} Active
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        {activeRecommendations.length > 0 ? (
          <div className="space-y-3">
            {activeRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium flex items-center">
                      {recommendation.title}
                      {getImpactBadge(recommendation.impact)}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <ArrowRight className="h-3.5 w-3.5 mr-1" />
                      <span>Timeframe: {recommendation.timeframe}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleDismiss(recommendation.id)}
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                    Dismiss
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleImplement(recommendation.id)}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Implement
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Sparkles className="h-10 w-10 text-gray-300 mb-2" />
            <h3 className="text-sm font-medium text-gray-600">No Active Recommendations</h3>
            <p className="text-xs text-gray-500 mt-1">All current recommendations have been addressed.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
