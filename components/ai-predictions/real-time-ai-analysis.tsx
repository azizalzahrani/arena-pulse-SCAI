"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Users,
  ShieldAlert,
  Utensils,
  Thermometer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AIBadge } from "@/components/ui/ai-badge"

interface AnalysisData {
  category: string
  status: "normal" | "warning" | "critical"
  value: number
  trend: "up" | "down" | "stable"
  insights: string[]
}

export function RealTimeAIAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([
    {
      category: "Crowd Density",
      status: "normal",
      value: 42,
      trend: "up",
      insights: [
        "Current density is within expected parameters",
        "Slight increase in North and East sections",
        "No immediate action required",
      ],
    },
    {
      category: "Security Incidents",
      status: "warning",
      value: 3,
      trend: "up",
      insights: [
        "Minor incidents reported at Gate B",
        "Additional security personnel recommended",
        "Monitor situation closely over next 30 minutes",
      ],
    },
    {
      category: "Concession Demand",
      status: "normal",
      value: 65,
      trend: "stable",
      insights: [
        "Demand is evenly distributed across all concession areas",
        "No staffing adjustments needed at this time",
        "Inventory levels are sufficient",
      ],
    },
    {
      category: "Temperature Comfort",
      status: "critical",
      value: 87,
      trend: "up",
      insights: [
        "Temperature in sections A3-A7 exceeding comfort thresholds",
        "Increase cooling output by 20% immediately",
        "Distribute water to affected sections",
        "Monitor for heat-related medical incidents",
      ],
    },
  ])

  const refreshData = () => {
    setIsLoading(true)

    // Simulate API call to refresh data
    setTimeout(() => {
      // Generate some random changes to the data
      const updatedData = analysisData.map((item) => {
        const randomChange = Math.random() > 0.7
        if (!randomChange) return item

        const newValue = Math.max(0, Math.min(100, item.value + (Math.random() > 0.5 ? 5 : -5)))
        const newTrend: "up" | "down" | "stable" =
          newValue > item.value ? "up" : newValue < item.value ? "down" : "stable"

        let newStatus: "normal" | "warning" | "critical" = item.status
        if (newValue > 80) newStatus = "critical"
        else if (newValue > 60) newStatus = "warning"
        else newStatus = "normal"

        return {
          ...item,
          value: newValue,
          trend: newTrend,
          status: newStatus,
        }
      })

      setAnalysisData(updatedData)
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1500)
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 30000)

    return () => clearInterval(interval)
  }, [analysisData])

  const getStatusColor = (status: AnalysisData["status"]) => {
    switch (status) {
      case "normal":
        return "bg-arena-teal text-white"
      case "warning":
        return "bg-arena-orange text-white"
      case "critical":
        return "bg-destructive text-destructive-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Crowd Density":
        return <Users className="h-5 w-5" />
      case "Security Incidents":
        return <ShieldAlert className="h-5 w-5" />
      case "Concession Demand":
        return <Utensils className="h-5 w-5" />
      case "Temperature Comfort":
        return <Thermometer className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle>Real-Time AI Analysis</CardTitle>
              <CardDescription>Live AI-powered insights based on current stadium conditions</CardDescription>
            </div>
            <AIBadge />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
              {isLoading ? "Updating..." : "Refresh"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights">
          <TabsList className="mb-4">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            {analysisData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <h3 className="font-medium">{item.category}</h3>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>

                <ul className="space-y-2">
                  {item.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      {item.status === "critical" ? (
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-arena-teal mt-0.5 shrink-0" />
                      )}
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="metrics">
            <div className="space-y-4">
              {analysisData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.value}%</span>
                      <span
                        className={cn(
                          "text-xs",
                          item.trend === "up"
                            ? "text-destructive"
                            : item.trend === "down"
                              ? "text-arena-teal"
                              : "text-muted-foreground",
                        )}
                      >
                        {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.status === "normal"
                          ? "bg-arena-teal"
                          : item.status === "warning"
                            ? "bg-arena-orange"
                            : "bg-destructive",
                      )}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
