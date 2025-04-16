"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlertTriangle, Eye, Clock, ArrowRight, BarChart3, Sparkles } from "lucide-react"

interface AnomalyDetectionProps {
  camera: {
    id: string
    name: string
    anomalyCount: number
  }
}

interface AnomalyEvent {
  id: string
  type: "movement" | "loitering" | "flow" | "density" | "object"
  description: string
  confidence: number
  timestamp: string
  location: string
  status: "active" | "investigating" | "resolved"
  severity: "low" | "medium" | "high"
}

export function AnomalyDetection({ camera }: AnomalyDetectionProps) {
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>([])
  const [behaviorMetrics, setBehaviorMetrics] = useState({
    normalMovement: 85,
    crowdDensity: 65,
    flowDirection: 92,
    unusualBehavior: camera.anomalyCount > 0 ? 35 : 8,
  })

  // Generate anomaly data
  useEffect(() => {
    const anomalyTypes: AnomalyEvent["type"][] = ["movement", "loitering", "flow", "density", "object"]
    const locations = ["North Section", "Near Gate", "Concourse", "Seating Area", "Entrance"]
    const descriptions = [
      "Person moving erratically",
      "Individual loitering near exit",
      "Group moving against crowd flow",
      "Unusual crowd density forming",
      "Unattended object detected",
    ]

    const generatedAnomalies: AnomalyEvent[] = []

    // Always generate at least the number of anomalies reported by the camera
    for (let i = 0; i < Math.max(1, camera.anomalyCount); i++) {
      const typeIndex = Math.floor(Math.random() * anomalyTypes.length)
      const type = anomalyTypes[typeIndex]

      generatedAnomalies.push({
        id: `anomaly-${i}`,
        type,
        description: descriptions[typeIndex],
        confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
        timestamp: `${Math.floor(Math.random() * 10) + 1}m ago`,
        location: locations[Math.floor(Math.random() * locations.length)],
        status: i === 0 ? "active" : Math.random() > 0.5 ? "investigating" : "resolved",
        severity: i === 0 ? "high" : Math.random() > 0.7 ? "medium" : "low",
      })
    }

    setAnomalies(generatedAnomalies)
  }, [camera.anomalyCount])

  // Update behavior metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setBehaviorMetrics((prev) => ({
        ...prev,
        normalMovement: Math.max(70, Math.min(95, prev.normalMovement + (Math.random() * 6 - 3))),
        crowdDensity: Math.max(40, Math.min(90, prev.crowdDensity + (Math.random() * 8 - 4))),
        flowDirection: Math.max(80, Math.min(98, prev.flowDirection + (Math.random() * 4 - 2))),
        unusualBehavior:
          camera.anomalyCount > 0
            ? Math.max(20, Math.min(50, prev.unusualBehavior + (Math.random() * 10 - 5)))
            : Math.max(2, Math.min(15, prev.unusualBehavior + (Math.random() * 4 - 2))),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [camera.anomalyCount])

  const getStatusBadge = (status: AnomalyEvent["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-500 text-white">Active</Badge>
      case "investigating":
        return <Badge className="bg-yellow-500 text-white">Investigating</Badge>
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
            Resolved
          </Badge>
        )
    }
  }

  const getSeverityBadge = (severity: AnomalyEvent["severity"]) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500 text-white">Low</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Anomaly Detection</CardTitle>
            <Badge className="bg-purple-600 text-white">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Behavior Analysis</h3>
            <Badge
              variant="outline"
              className={`${
                behaviorMetrics.unusualBehavior > 20
                  ? "bg-red-500/20 text-red-400 border-red-500/50"
                  : "bg-green-500/20 text-green-400 border-green-500/50"
              }`}
            >
              {behaviorMetrics.unusualBehavior > 20 ? "Anomalies Detected" : "Normal Behavior"}
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Normal Movement</span>
                <span>{behaviorMetrics.normalMovement}%</span>
              </div>
              <Progress value={behaviorMetrics.normalMovement} className="h-1.5 bg-gray-700">
                <div className="h-full bg-green-500 rounded-full" />
              </Progress>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Crowd Density</span>
                <span>{behaviorMetrics.crowdDensity}%</span>
              </div>
              <Progress value={behaviorMetrics.crowdDensity} className="h-1.5 bg-gray-700">
                <div
                  className={`h-full rounded-full ${
                    behaviorMetrics.crowdDensity > 80 ? "bg-red-500" : "bg-yellow-500"
                  }`}
                />
              </Progress>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Flow Direction</span>
                <span>{behaviorMetrics.flowDirection}%</span>
              </div>
              <Progress value={behaviorMetrics.flowDirection} className="h-1.5 bg-gray-700">
                <div className="h-full bg-blue-500 rounded-full" />
              </Progress>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Unusual Behavior</span>
                <span>{behaviorMetrics.unusualBehavior}%</span>
              </div>
              <Progress value={behaviorMetrics.unusualBehavior} className="h-1.5 bg-gray-700">
                <div
                  className={`h-full rounded-full ${
                    behaviorMetrics.unusualBehavior > 20 ? "bg-red-500" : "bg-green-500"
                  }`}
                />
              </Progress>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white">Anomaly Types</h3>

            <Tabs defaultValue="current" className="mt-4">
              <TabsList className="bg-gray-700 border-gray-600">
                <TabsTrigger value="current" className="data-[state=active]:bg-gray-600">
                  Current
                </TabsTrigger>
                <TabsTrigger value="historical" className="data-[state=active]:bg-gray-600">
                  Historical
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="mt-4">
                <div className="space-y-3">
                  {camera.anomalyCount > 0 ? (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-red-500/20 rounded-md">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <div className="text-xs">
                          <p className="font-medium text-red-400">Erratic Movement</p>
                          <p className="text-gray-400">Person moving against crowd flow</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-yellow-500/20 rounded-md">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <div className="text-xs">
                          <p className="font-medium text-yellow-400">Loitering</p>
                          <p className="text-gray-400">Individual lingering near exit</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-24 text-gray-500 text-sm">
                      No anomalies currently detected
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="historical" className="mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-md">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    <div className="text-xs">
                      <p className="font-medium text-gray-300">Crowd Flow Disruption</p>
                      <p className="text-gray-400">15:32 - Resolved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div className="text-xs">
                      <p className="font-medium text-gray-300">Unattended Object</p>
                      <p className="text-gray-400">14:45 - Resolved</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Detected Anomalies</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs bg-gray-700 border-gray-600 text-gray-300">
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs bg-gray-700 border-gray-600 text-gray-300">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View All
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
              {anomalies.length > 0 ? (
                anomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className={`border rounded-md p-3 ${
                      anomaly.status === "active"
                        ? "border-red-500/50 bg-red-500/10"
                        : anomaly.status === "investigating"
                          ? "border-yellow-500/50 bg-yellow-500/10"
                          : "border-gray-700 bg-gray-800"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          className={`h-5 w-5 mt-0.5 ${
                            anomaly.severity === "high"
                              ? "text-red-500"
                              : anomaly.severity === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <div>
                          <h4 className="text-sm font-medium text-white">{anomaly.description}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {anomaly.location} • Confidence: {anomaly.confidence}%
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(anomaly.status)}
                        {getSeverityBadge(anomaly.severity)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>Detected {anomaly.timestamp}</span>
                      </div>

                      {anomaly.status !== "resolved" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-gray-700 border-gray-600 text-gray-300"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="h-7 text-xs bg-red-500 hover:bg-red-600 text-white">
                            Respond
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mb-2 opacity-50" />
                  <p>No anomalies detected in this area</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
