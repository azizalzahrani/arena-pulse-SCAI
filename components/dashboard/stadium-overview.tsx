"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, Camera, Lightbulb, MapPin, RefreshCw } from "lucide-react"
import { formatDate, formatTime, formatRelativeTime } from "@/utils/format-date"
import { AIBadge } from "@/components/ui/ai-badge"
import { LastUpdated } from "@/components/ui/last-updated"
import {
  useRealtimeGates,
  useRealtimeCameras,
  useRealtimeEvents,
  useRealtimePredictions,
} from "@/hooks/use-realtime-data"
import { useState, useEffect } from "react"

export function StadiumOverview() {
  const { data: gates, loading: gatesLoading, error: gatesError, lastUpdate: gatesLastUpdate } = useRealtimeGates()

  const {
    data: cameras,
    loading: camerasLoading,
    error: camerasError,
    lastUpdate: camerasLastUpdate,
  } = useRealtimeCameras(5)

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
    lastUpdate: eventsLastUpdate,
  } = useRealtimeEvents(3)

  const {
    data: predictions,
    loading: predictionsLoading,
    error: predictionsError,
    lastUpdate: predictionsLastUpdate,
  } = useRealtimePredictions(3)

  const [recentlyUpdated, setRecentlyUpdated] = useState<string | null>(null)

  // Visual indicator for recent updates
  useEffect(() => {
    if (gatesLastUpdate) {
      setRecentlyUpdated("gates")
      const timer = setTimeout(() => setRecentlyUpdated(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [gatesLastUpdate])

  useEffect(() => {
    if (camerasLastUpdate) {
      setRecentlyUpdated("cameras")
      const timer = setTimeout(() => setRecentlyUpdated(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [camerasLastUpdate])

  useEffect(() => {
    if (eventsLastUpdate) {
      setRecentlyUpdated("events")
      const timer = setTimeout(() => setRecentlyUpdated(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [eventsLastUpdate])

  useEffect(() => {
    if (predictionsLastUpdate) {
      setRecentlyUpdated("predictions")
      const timer = setTimeout(() => setRecentlyUpdated(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [predictionsLastUpdate])

  const loading = gatesLoading || camerasLoading || eventsLoading || predictionsLoading
  const error = gatesError || camerasError || eventsError || predictionsError

  if (loading && !gates.length && !cameras.length && !events.length && !predictions.length) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Stadium Overview</CardTitle>
            <CardDescription>Loading dashboard data...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Stadium Overview</CardTitle>
            <CardDescription className="text-red-500">Error: {error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Calculate overall stadium metrics
  const totalCapacity = gates.reduce((sum, gate) => sum + gate.capacity, 0)
  const currentAttendance = gates.reduce((sum, gate) => sum + gate.current_flow, 0)
  const occupancyPercentage = Math.round((currentAttendance / totalCapacity) * 100) || 0

  const openGates = gates.filter((gate) => gate.status === "open").length
  const totalGates = gates.length

  const activeCameras = cameras.filter((camera) => camera.status === "active").length
  const totalCameras = cameras.length

  const camerasWithAnomalies = cameras.filter((camera) => camera.anomaly_count > 0).length

  return (
    <div className="space-y-4">
      <Card className={recentlyUpdated ? "border-primary transition-colors duration-300" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stadium Overview</CardTitle>
              <CardDescription>Real-time status of stadium operations</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {recentlyUpdated && (
                <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Live Update
                </Badge>
              )}
              <LastUpdated
                timestamp={
                  [gatesLastUpdate, camerasLastUpdate, eventsLastUpdate, predictionsLastUpdate]
                    .filter(Boolean)
                    .sort((a, b) => b!.getTime() - a!.getTime())[0] || null
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`flex flex-col space-y-2 ${recentlyUpdated === "gates" ? "animate-pulse" : ""}`}>
              <span className="text-sm font-medium text-muted-foreground">Current Occupancy</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{occupancyPercentage}%</span>
                <span className="text-sm text-muted-foreground">
                  {currentAttendance} / {totalCapacity}
                </span>
              </div>
              <Progress value={occupancyPercentage} className="h-2" />
            </div>

            <div className={`flex flex-col space-y-2 ${recentlyUpdated === "gates" ? "animate-pulse" : ""}`}>
              <span className="text-sm font-medium text-muted-foreground">Gates Status</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">
                  {openGates} / {totalGates}
                </span>
                <span className="text-sm text-muted-foreground">Gates Open</span>
              </div>
              <Progress value={(openGates / totalGates) * 100} className="h-2" />
            </div>

            <div className={`flex flex-col space-y-2 ${recentlyUpdated === "cameras" ? "animate-pulse" : ""}`}>
              <span className="text-sm font-medium text-muted-foreground">Camera Status</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">
                  {activeCameras} / {totalCameras}
                </span>
                <span className="text-sm text-muted-foreground">
                  {camerasWithAnomalies > 0 && (
                    <span className="text-red-500 font-medium">{camerasWithAnomalies} Anomalies</span>
                  )}
                  {camerasWithAnomalies === 0 && "All Normal"}
                </span>
              </div>
              <Progress value={(activeCameras / totalCameras) * 100} className="h-2" />
            </div>
          </div>

          <Tabs defaultValue="events">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="events">
                Upcoming Events
                {recentlyUpdated === "events" && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="cameras">
                Camera Alerts
                {recentlyUpdated === "cameras" && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="predictions">
                AI Insights
                {recentlyUpdated === "predictions" && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              {events.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No upcoming events scheduled</p>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-start space-x-4 p-3 border rounded-lg ${recentlyUpdated === "events" ? "border-primary" : ""}`}
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={event.type === "match" ? "default" : "outline"}>{event.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>
                            {formatDate(event.date)} {formatTime(event.time)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          <span>Expected: {event.expected_attendance.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <LastUpdated timestamp={eventsLastUpdate} className="flex justify-end" />
            </TabsContent>

            <TabsContent value="cameras" className="space-y-4">
              {cameras.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No camera data available</p>
              ) : (
                cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className={`flex items-start space-x-4 p-3 border rounded-lg ${
                      recentlyUpdated === "cameras" ? "border-primary" : ""
                    }`}
                  >
                    <div className={`bg-${camera.anomaly_count > 0 ? "red" : "green"}-500/10 p-2 rounded-full`}>
                      <Camera className={`h-5 w-5 text-${camera.anomaly_count > 0 ? "red" : "green"}-500`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{camera.name}</h4>
                        <Badge variant={camera.anomaly_count > 0 ? "destructive" : "outline"}>
                          {camera.anomaly_count > 0 ? `${camera.anomaly_count} Anomalies` : "Normal"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{camera.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span>Detected: {camera.detection_count} people</span>
                        <span>Sentiment: {Math.round(Number(camera.sentiment_score) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <LastUpdated timestamp={camerasLastUpdate} className="flex justify-end" />
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              {predictions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No AI predictions available</p>
              ) : (
                predictions.map((prediction) => (
                  <div
                    key={prediction.id}
                    className={`flex items-start space-x-4 p-3 border rounded-lg ${
                      recentlyUpdated === "predictions" ? "border-primary" : ""
                    }`}
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h4 className="font-medium">{prediction.prediction_type.replace("_", " ")}</h4>
                          <AIBadge className="ml-2" />
                        </div>
                        <Badge variant={prediction.result.impact === "high" ? "destructive" : "outline"}>
                          {prediction.result.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm">{prediction.result.summary}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Confidence: {Math.round(Number(prediction.confidence_score) * 100)}%</span>
                        <span>{formatRelativeTime(prediction.created_at)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <LastUpdated timestamp={predictionsLastUpdate} className="flex justify-end" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
