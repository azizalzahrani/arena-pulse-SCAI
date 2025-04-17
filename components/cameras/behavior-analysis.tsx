"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlertTriangle, Activity, Search, Clock, ArrowRight } from "lucide-react"

interface BehaviorAnalysisProps {
  camera: {
    id: string
    name: string
    anomalyCount: number
  }
}

interface BehaviorMetric {
  name: string
  value: number
  threshold: number
  icon: React.ReactNode
}

export function BehaviorAnalysis({ camera }: BehaviorAnalysisProps) {
  const [metrics, setMetrics] = useState<BehaviorMetric[]>([])
  const [detectedEvents, setDetectedEvents] = useState<any[]>([])

  // Generate behavior metrics
  useEffect(() => {
    const generatedMetrics: BehaviorMetric[] = [
      {
        name: "Normal Movement",
        value: camera.anomalyCount > 0 ? 65 + Math.random() * 15 : 85 + Math.random() * 10,
        threshold: 70,
        icon: <Activity className="h-3.5 w-3.5 text-blue-400" />,
      },
      {
        name: "Crowd Flow",
        value: camera.anomalyCount > 0 ? 60 + Math.random() * 15 : 80 + Math.random() * 15,
        threshold: 65,
        icon: <ArrowRight className="h-3.5 w-3.5 text-green-400" />,
      },
      {
        name: "Unusual Behavior",
        value: camera.anomalyCount > 0 ? 25 + Math.random() * 15 : 5 + Math.random() * 10,
        threshold: 20,
        icon: <AlertTriangle className="h-3.5 w-3.5 text-red-400" />,
      },
      {
        name: "Loitering",
        value: camera.anomalyCount > 0 ? 15 + Math.random() * 20 : 5 + Math.random() * 10,
        threshold: 25,
        icon: <Clock className="h-3.5 w-3.5 text-yellow-400" />,
      },
    ]

    setMetrics(generatedMetrics)

    // Generate detected events
    if (camera.anomalyCount > 0) {
      setDetectedEvents([
        {
          type: "movement",
          description: "Erratic movement pattern",
          location: "Northeast corner",
          confidence: 78,
          time: "2m ago",
          severity: "medium",
        },
        {
          type: "flow",
          description: "Crowd moving against flow",
          location: "Central area",
          confidence: 85,
          time: "5m ago",
          severity: "high",
        },
      ])
    } else {
      setDetectedEvents([])
    }
  }, [camera.anomalyCount])

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Behavior Metrics</h3>
            <Badge className={camera.anomalyCount > 0 ? "bg-red-500" : "bg-green-500"}>
              {camera.anomalyCount > 0 ? "Anomalies Detected" : "Normal Behavior"}
            </Badge>
          </div>

          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {metric.icon}
                    <span className="text-gray-300">{metric.name}</span>
                  </div>
                  <Badge
                    className={
                      metric.name === "Unusual Behavior" || metric.name === "Loitering"
                        ? metric.value > metric.threshold
                          ? "bg-red-500"
                          : "bg-green-500"
                        : metric.value < metric.threshold
                          ? "bg-red-500"
                          : "bg-green-500"
                    }
                  >
                    {Math.round(metric.value)}%
                  </Badge>
                </div>
                <Progress value={metric.value} className="h-1.5 bg-gray-700">
                  <div
                    className={`h-full rounded-full ${
                      metric.name === "Unusual Behavior" || metric.name === "Loitering"
                        ? metric.value > metric.threshold
                          ? "bg-red-500"
                          : "bg-green-500"
                        : metric.value < metric.threshold
                          ? "bg-red-500"
                          : "bg-green-500"
                    }`}
                  />
                </Progress>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white mb-4">Behavior Analysis</h3>

          <Tabs defaultValue="events">
            <TabsList className="bg-gray-700 border-gray-600">
              <TabsTrigger value="events" className="data-[state=active]:bg-gray-600">
                Detected Events
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-gray-600">
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-4">
              {detectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {detectedEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`bg-${event.severity === "high" ? "red" : "yellow"}-500/20 border border-${event.severity === "high" ? "red" : "yellow"}-500/30 rounded-md p-3`}
                    >
                      <h4
                        className={`text-sm font-medium text-${event.severity === "high" ? "red" : "yellow"}-400 flex items-center`}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {event.description}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-300">
                          {event.location} • {event.confidence}% confidence
                        </p>
                        <Badge className={event.severity === "high" ? "bg-red-500" : "bg-yellow-500"}>
                          {event.time}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Search className="h-10 w-10 text-gray-500 mb-2" />
                  <h3 className="text-sm font-medium text-gray-400">No Anomalies Detected</h3>
                  <p className="text-xs text-gray-500 mt-1">All behavior patterns within normal parameters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights" className="mt-4">
              <div className="space-y-3">
                {camera.anomalyCount > 0 ? (
                  <>
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-blue-400 flex items-center">
                        <Activity className="h-4 w-4 mr-1" />
                        Pattern Analysis
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Detected movement patterns suggest potential crowd agitation. Recommend increased monitoring and
                        staff presence.
                      </p>
                    </div>

                    <div className="bg-purple-500/20 border border-purple-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-purple-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Temporal Analysis
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Unusual behavior has increased 35% in the last 15 minutes. Situation may escalate if not
                        addressed.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-green-400 flex items-center">
                        <Activity className="h-4 w-4 mr-1" />
                        Normal Patterns
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        All movement patterns within expected parameters. Crowd flow is optimal.
                      </p>
                    </div>

                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-blue-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Predictive Analysis
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Based on historical data, this area typically maintains normal behavior patterns for the next 45
                        minutes.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
