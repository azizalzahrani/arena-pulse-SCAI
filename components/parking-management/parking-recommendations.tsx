"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ChevronRight, Sparkles } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  timeframe: string
  implemented: boolean
}

export function ParkingRecommendations() {
  // Simulated recommendations
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "rec1",
      title: "Open overflow parking area",
      description:
        "North and East parking areas are nearing capacity. Open the overflow parking area near the south entrance to accommodate additional vehicles.",
      impact: "high",
      timeframe: "Immediate",
      implemented: false,
    },
    {
      id: "rec2",
      title: "Adjust entry gate allocation",
      description:
        "Reallocate 2 entry lanes from South to North parking to handle increased traffic flow and reduce wait times.",
      impact: "medium",
      timeframe: "Within 30 minutes",
      implemented: false,
    },
    {
      id: "rec3",
      title: "Deploy additional parking attendants",
      description:
        "Add 4 more parking attendants to the East parking area to improve vehicle flow and reduce parking time.",
      impact: "medium",
      timeframe: "Within 1 hour",
      implemented: false,
    },
    {
      id: "rec4",
      title: "Update digital signage",
      description:
        "Update digital road signs to direct new arrivals to West parking area which currently has 68% availability.",
      impact: "high",
      timeframe: "Immediate",
      implemented: true,
    },
  ])

  const handleImplement = (id: string) => {
    setRecommendations(recommendations.map((rec) => (rec.id === id ? { ...rec, implemented: true } : rec)))
  }

  const handleDismiss = (id: string) => {
    setRecommendations(recommendations.filter((rec) => rec.id !== id))
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/50"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/50"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-arena-purple" />
          <CardTitle className="text-lg">AI Recommendations</CardTitle>
        </div>
        <Badge variant="outline" className="bg-arena-purple/10 text-arena-purple">
          {recommendations.filter((r) => !r.implemented).length} Pending
        </Badge>
      </CardHeader>

      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`rounded-md border p-4 transition-colors ${
                rec.implemented ? "border-green-500/20 bg-green-500/5" : "border-muted"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{rec.title}</h3>
                    {rec.implemented && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Implemented
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Badge variant="outline" className={getImpactColor(rec.impact)}>
                      {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                    </Badge>
                    <span className="text-xs text-muted-foreground">{rec.timeframe}</span>
                  </div>
                </div>

                {!rec.implemented && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-500"
                      onClick={() => handleImplement(rec.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => handleDismiss(rec.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {rec.implemented && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
