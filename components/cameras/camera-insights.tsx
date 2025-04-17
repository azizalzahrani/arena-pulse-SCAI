"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlertTriangle, Users, TrendingUp, Clock, RefreshCw } from "lucide-react"

export function CameraInsights() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Updating..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="occupancy">
          <TabsList className="w-full">
            <TabsTrigger value="occupancy" className="flex-1">
              <Users className="h-4 w-4 mr-1" />
              Occupancy
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="occupancy" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">VIP Section</span>
                </div>
                <Badge className="bg-yellow-500">67% Full</Badge>
              </div>
              <Progress value={67} className="h-2">
                <div className="h-full bg-yellow-500 rounded-full" />
              </Progress>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">Gate A</span>
                </div>
                <Badge className="bg-yellow-500">75% Full</Badge>
              </div>
              <Progress value={75} className="h-2">
                <div className="h-full bg-yellow-500 rounded-full" />
              </Progress>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">Concourse</span>
                </div>
                <Badge className="bg-red-500">82% Full</Badge>
              </div>
              <Progress value={82} className="h-2">
                <div className="h-full bg-red-500 rounded-full" />
              </Progress>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                AI Occupancy Analysis
              </h4>
              <p className="text-xs text-blue-700 mt-1">
                Concourse area is approaching capacity (82%). Consider redirecting traffic to East entrance to prevent
                congestion.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">Crowd Flow Rate</span>
                </div>
                <Badge className="bg-green-500">Normal</Badge>
              </div>
              <div className="h-20 bg-gray-100 rounded-md flex items-end">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 mx-0.5 rounded-t-sm"
                    style={{
                      height: `${20 + Math.sin(i / 3) * 15 + Math.random() * 10}%`,
                      backgroundColor: i > 18 ? "#3b82f6" : i > 12 ? "#10b981" : "#6366f1",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />
                AI Trend Analysis
              </h4>
              <p className="text-xs text-blue-700 mt-1">
                Crowd flow is increasing 23% faster than typical for this time. Predicted peak in 45 minutes. Consider
                opening additional gates.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-4 space-y-3">
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">High Density Alert</h4>
                  <p className="text-xs text-red-700 mt-0.5">
                    Concourse area exceeding 80% capacity. Potential bottleneck forming.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-red-600">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>3 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Flow Disruption</h4>
                  <p className="text-xs text-yellow-700 mt-0.5">
                    Unusual movement pattern detected at Gate A. Possible obstruction.
                  </p>
                  <div className="flex items-center mt-2 text-xs text-yellow-600">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>7 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-blue-500" />
                AI Alert Analysis
              </h4>
              <p className="text-xs text-blue-700 mt-1">
                2 active alerts detected. Crowd management intervention recommended within 10 minutes to prevent
                escalation.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
