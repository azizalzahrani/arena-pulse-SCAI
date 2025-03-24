"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CongestionPoints() {
  const { congestionPoints } = mockCrowdAnalysisData

  // Helper function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Increasing":
        return <ArrowUpIcon className="h-4 w-4 text-[hsl(var(--density-critical))]" />
      case "Decreasing":
        return <ArrowDownIcon className="h-4 w-4 text-[hsl(var(--density-low))]" />
      default:
        return <ArrowRightIcon className="h-4 w-4 text-[hsl(var(--density-medium))]" />
    }
  }

  // Helper function to get status class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-[hsl(var(--density-critical))] text-white"
      case "High":
        return "bg-[hsl(var(--density-high))] text-white"
      case "Medium":
        return "bg-[hsl(var(--density-medium))] text-black"
      case "Low":
        return "bg-[hsl(var(--density-low))] text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Helper function to get progress color
  const getProgressColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-[hsl(var(--density-critical))]"
      case "High":
        return "bg-[hsl(var(--density-high))]"
      case "Medium":
        return "bg-[hsl(var(--density-medium))]"
      case "Low":
        return "bg-[hsl(var(--density-low))]"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Congestion Points</CardTitle>
          {congestionPoints.some((point) => point.status === "Critical") && (
            <AlertTriangle className="h-5 w-5 text-[hsl(var(--density-critical))] critical-alert" />
          )}
        </div>
        <Badge variant="outline">{congestionPoints.length} Active</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {congestionPoints.map((point) => (
            <div key={point.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getStatusClass(point.status)} ${point.status === "Critical" ? "critical-alert" : ""}`}
                  >
                    {point.status}
                  </Badge>
                  <h3 className="font-medium">{point.location}</h3>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(point.trend)}
                  <span className="text-sm">{point.trend}</span>
                </div>
              </div>

              <Progress
                value={(point.density / 5) * 100}
                className="h-2"
                indicatorClassName={getProgressColor(point.status)}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <div>
                  Density: <span className="font-medium">{point.density} people/m²</span>
                </div>
                <div>
                  Since: <span className="font-medium">{point.startTime}</span>
                </div>
                <div>
                  Duration: <span className="font-medium">{point.duration}</span>
                </div>
                <div>
                  Affected: <span className="font-medium">{point.affectedCount.toLocaleString()} people</span>
                </div>
              </div>

              {point.status === "Critical" && (
                <div className="rounded-md bg-muted/50 p-2 text-xs">
                  <span className="font-medium">Recommended action: </span>
                  {point.recommendedAction}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

