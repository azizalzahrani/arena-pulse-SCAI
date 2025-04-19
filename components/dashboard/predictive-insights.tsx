"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Thermometer, Users, AlertTriangle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

interface Prediction {
  id: string
  title: string
  description: string
  time: string
  timeRemaining: string
  impact: "low" | "medium" | "high"
  trend: "increasing" | "decreasing" | "stable"
  icon: React.ReactNode
}

const predictions: Prediction[] = [
  {
    id: "1",
    title: "Prayer Time Impact",
    description: "Crowd movement expected for Asr prayer",
    time: "15:12",
    timeRemaining: "in 15 min",
    impact: "medium",
    trend: "increasing",
    icon: <Clock className="h-5 w-5 text-arena-purple" />,
  },
  {
    id: "2",
    title: "Temperature Increase",
    description: "Stadium temperature rising in sections A, B",
    time: "14:30",
    timeRemaining: "in 30 min",
    impact: "medium",
    trend: "increasing",
    icon: <Thermometer className="h-5 w-5 text-arena-orange" />,
  },
  {
    id: "3",
    title: "Concession Area Congestion",
    description: "Increased crowd at north concessions",
    time: "14:45",
    timeRemaining: "in 45 min",
    impact: "low",
    trend: "increasing",
    icon: <Users className="h-5 w-5 text-arena-blue" />,
  },
  {
    id: "4",
    title: "Potential Security Incident",
    description: "Unusual activity detected at east entrance",
    time: "14:50",
    timeRemaining: "in 50 min",
    impact: "high",
    trend: "increasing",
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
  },
]

export function PredictiveInsights() {
  const { t } = useLanguage()

  const getImpactBadge = (impact: Prediction["impact"]) => {
    switch (impact) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("predictive-insights")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("ai-powered-predictions")}</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 pb-4 space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{prediction.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{t(prediction.title.toLowerCase().replace(/ /g, "-"))}</h4>
                      {getImpactBadge(prediction.impact)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(prediction.description.toLowerCase().replace(/ /g, "-"))}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {prediction.timeRemaining}
                      </span>

                      <span
                        className={`flex items-center gap-1 ${
                          prediction.trend === "increasing"
                            ? "text-red-600"
                            : prediction.trend === "decreasing"
                              ? "text-green-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {prediction.trend === "increasing" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                          >
                            <path d="m6 18 6-6 6 6"></path>
                            <path d="M6 6h12"></path>
                          </svg>
                        ) : prediction.trend === "decreasing" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M6 6 12 12 18 6"></path>
                            <path d="M6 18h12"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M8 12h8"></path>
                          </svg>
                        )}
                        <span>{prediction.trend.charAt(0).toUpperCase() + prediction.trend.slice(1)}</span>
                      </span>
                    </div>
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
