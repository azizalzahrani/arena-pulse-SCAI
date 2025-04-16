"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Download,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react"
import type { PredictionResult } from "@/app/actions/generate-prediction"

interface PredictionDetailProps {
  prediction: PredictionResult
  onImplement?: (id: string) => void
  onExport?: (prediction: PredictionResult) => void
}

export function PredictionDetail({ prediction, onImplement, onExport }: PredictionDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const handleImplement = () => {
    if (onImplement) {
      onImplement(prediction.id)
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport(prediction)
    }
  }

  const renderTrendIcon = () => {
    switch (prediction.trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const renderImpactBadge = () => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={colors[prediction.impact]}>
        {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)} Impact
      </Badge>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{prediction.title}</CardTitle>
          <div className="flex items-center gap-2">
            {renderImpactBadge()}
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {prediction.time}
            </Badge>
          </div>
        </div>
        <CardDescription>{prediction.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="risks">Risk Factors</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Accuracy</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-2xl font-bold">{prediction.accuracy}%</span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Trend</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-2xl font-bold capitalize">{prediction.trend}</span>
                  {renderTrendIcon()}
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Generated</div>
              <div className="mt-1">{prediction.generated}</div>
            </div>
          </TabsContent>
          <TabsContent value="recommendations" className="pt-4">
            <ul className="space-y-2">
              {prediction.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 rounded-lg border p-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="risks" className="pt-4">
            <ul className="space-y-2">
              {prediction.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start gap-2 rounded-lg border p-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={handleImplement}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Implement
        </Button>
      </CardFooter>
    </Card>
  )
}
