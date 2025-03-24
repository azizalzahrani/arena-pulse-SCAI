"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoIcon, Maximize2, RefreshCw, TrendingDown, TrendingUp, Bell, BellOff } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// LiveVideoFeed Component
export function LiveVideoFeed() {
  const [activeCamera, setActiveCamera] = useState("main-entrance")
  const [isProcessing, setIsProcessing] = useState(true)
  const [heatmapVisible, setHeatmapVisible] = useState(true)

  // Simulated camera feeds
  const CAMERA_FEEDS = [
    { id: "main-entrance", name: "Main Entrance", status: "active" },
    { id: "north-gate", name: "North Gate", status: "active" },
    { id: "food-court", name: "Food Court", status: "active" },
    { id: "west-stands", name: "West Stands", status: "warning" },
  ]

  // Simulated crowd data
  const crowdData = {
    count: 342,
    density: 2.8,
    flow: 24,
    hotspots: 2,
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Live Video Analysis</CardTitle>
          <Badge variant={isProcessing ? "default" : "outline"} className="ml-2">
            {isProcessing ? "Processing" : "Paused"}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  AI-powered real-time video analysis of crowd density, flow, and behavior patterns.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHeatmapVisible(!heatmapVisible)}
            className={heatmapVisible ? "bg-primary/10" : ""}
          >
            Heatmap
          </Button>
          <Button
            variant={isProcessing ? "outline" : "default"}
            size="sm"
            onClick={() => setIsProcessing(!isProcessing)}
          >
            {isProcessing ? "Pause" : "Resume"}
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeCamera} onValueChange={setActiveCamera}>
          <TabsList className="mb-2">
            {CAMERA_FEEDS.map((camera) => (
              <TabsTrigger key={camera.id} value={camera.id} className="relative">
                {camera.name}
                {camera.status === "warning" && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {CAMERA_FEEDS.map((camera) => (
            <TabsContent key={camera.id} value={camera.id} className="mt-0">
              <div className="relative aspect-video overflow-hidden rounded-md bg-black">
                {/* Simulated video feed */}
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/placeholder.svg?height=400&width=800)`,
                    filter: "brightness(0.8)",
                  }}
                ></div>

                {/* AI analysis overlay - simplified */}
                {heatmapVisible && (
                  <div className="absolute inset-0 h-full w-full">
                    {/* Simulated heatmap */}
                    <div
                      className="absolute rounded-full bg-red-500/50 blur-xl"
                      style={{ width: "120px", height: "120px", left: "30%", top: "40%" }}
                    ></div>
                    <div
                      className="absolute rounded-full bg-red-500/40 blur-xl"
                      style={{ width: "150px", height: "150px", left: "60%", top: "60%" }}
                    ></div>
                  </div>
                )}

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    AI Processing
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">People Count</div>
                  <div className="text-xl font-bold">{crowdData.count}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Density</div>
                  <div className="text-xl font-bold">{crowdData.density} p/m²</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Flow Rate</div>
                  <div className="text-xl font-bold">{crowdData.flow} p/min</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Hotspots</div>
                  <div className="text-xl font-bold">{crowdData.hotspots}</div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

// SensorDataDashboard Component
export function SensorDataDashboard() {
  const [activeSensor, setActiveSensor] = useState("motion")

  // Simulated sensor types
  const SENSOR_TYPES = [
    { id: "motion", name: "Motion Sensors", unit: "movements", value: 42 },
    { id: "pressure", name: "Pressure Pads", unit: "kg/m²", value: 156 },
    { id: "thermal", name: "Thermal Sensors", unit: "°C", value: 24 },
    { id: "wifi", name: "WiFi Tracking", unit: "devices", value: 87 },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Sensor Network</CardTitle>
          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500">
            Live Data
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Real-time data from the venue's sensor network, providing additional crowd metrics.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeSensor} onValueChange={setActiveSensor}>
          <TabsList className="mb-2">
            {SENSOR_TYPES.map((sensor) => (
              <TabsTrigger key={sensor.id} value={sensor.id}>
                {sensor.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {SENSOR_TYPES.map((sensor) => (
            <TabsContent key={sensor.id} value={sensor.id} className="mt-0">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {sensor.value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{sensor.unit}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Current reading</div>
                </div>
                <div className="text-xs text-muted-foreground">Updated every 30 seconds</div>
              </div>

              <div className="h-[200px] bg-muted/20 rounded-md relative overflow-hidden">
                {/* Simulated chart */}
                <div className="absolute inset-0 flex items-end">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[5%] bg-primary/60"
                      style={{
                        height: `${20 + Math.sin(i * 0.5) * 15 + Math.random() * 30}%`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

// MetricCard Component for AnalyticsOverview
function MetricCard({
  title,
  value,
  trend,
  description,
}: {
  title: string
  value: string
  trend: "up" | "down"
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex justify-between">
        <div className="text-sm font-medium">{title}</div>
        {trend === "up" ? (
          <Badge variant="outline" className="bg-red-500/10 text-red-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            Rising
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            <TrendingDown className="mr-1 h-3 w-3" />
            Falling
          </Badge>
        )}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
}

// AnalyticsOverview Component
export function AnalyticsOverview() {
  // Simulated analytics data
  const ANALYTICS_DATA = {
    current: {
      occupancy: 68,
      trend: "up",
      crowdDensity: 2.4,
      densityTrend: "up",
      flowRate: 24,
      flowTrend: "down",
      waitTime: 12,
      waitTrend: "up",
    },
    historical: {
      occupancy: 72,
      trend: "down",
      crowdDensity: 2.6,
      densityTrend: "down",
      flowRate: 28,
      flowTrend: "up",
      waitTime: 10,
      waitTrend: "down",
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Analytics Overview</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">AI-generated insights from combined video and sensor data analysis.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Event</TabsTrigger>
            <TabsTrigger value="historical">Historical Average</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Venue Occupancy"
                value={`${ANALYTICS_DATA.current.occupancy}%`}
                trend={ANALYTICS_DATA.current.trend as "up" | "down"}
                description="of maximum capacity"
              />
              <MetricCard
                title="Crowd Density"
                value={`${ANALYTICS_DATA.current.crowdDensity} p/m²`}
                trend={ANALYTICS_DATA.current.densityTrend as "up" | "down"}
                description="average across venue"
              />
              <MetricCard
                title="Flow Rate"
                value={`${ANALYTICS_DATA.current.flowRate} p/min`}
                trend={ANALYTICS_DATA.current.flowTrend as "up" | "down"}
                description="at main entrances"
              />
              <MetricCard
                title="Wait Time"
                value={`${ANALYTICS_DATA.current.waitTime} min`}
                trend={ANALYTICS_DATA.current.waitTrend as "up" | "down"}
                description="average at facilities"
              />
            </div>
          </TabsContent>

          <TabsContent value="historical" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Venue Occupancy"
                value={`${ANALYTICS_DATA.historical.occupancy}%`}
                trend={ANALYTICS_DATA.historical.trend as "up" | "down"}
                description="of maximum capacity"
              />
              <MetricCard
                title="Crowd Density"
                value={`${ANALYTICS_DATA.historical.crowdDensity} p/m²`}
                trend={ANALYTICS_DATA.historical.densityTrend as "up" | "down"}
                description="average across venue"
              />
              <MetricCard
                title="Flow Rate"
                value={`${ANALYTICS_DATA.historical.flowRate} p/min`}
                trend={ANALYTICS_DATA.historical.flowTrend as "up" | "down"}
                description="at main entrances"
              />
              <MetricCard
                title="Wait Time"
                value={`${ANALYTICS_DATA.historical.waitTime} min`}
                trend={ANALYTICS_DATA.historical.waitTrend as "up" | "down"}
                description="average at facilities"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// AlertsPanel Component
export function AlertsPanel() {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([])

  // Simulated alerts
  const ALERTS = [
    {
      id: "1",
      severity: "high",
      location: "Main Entrance",
      message: "Crowd density exceeding safe threshold",
      time: "2 minutes ago",
    },
    {
      id: "2",
      severity: "medium",
      location: "Food Court",
      message: "Unusual crowd movement pattern detected",
      time: "15 minutes ago",
    },
    {
      id: "3",
      severity: "low",
      location: "West Stands",
      message: "Slow crowd flow rate",
      time: "28 minutes ago",
    },
    {
      id: "4",
      severity: "medium",
      location: "North Gate",
      message: "Queue length increasing rapidly",
      time: "34 minutes ago",
    },
  ]

  const acknowledgeAlert = (id: string) => {
    setAcknowledgedAlerts((prev) => [...prev, id])
  }

  const activeAlerts = ALERTS.filter((alert) => !acknowledgedAlerts.includes(alert.id))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Alerts & Notifications</CardTitle>
          <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-500">
            {activeAlerts.length} Active
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">AI-detected anomalies and potential issues requiring attention.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch id="alerts-mode" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            <Label htmlFor="alerts-mode" className="text-sm">
              {alertsEnabled ? (
                <span className="flex items-center gap-1">
                  <Bell className="h-3 w-3" /> Enabled
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <BellOff className="h-3 w-3" /> Disabled
                </span>
              )}
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeAlerts.length === 0 ? (
            <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No active alerts</p>
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between rounded-md border p-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      alert.severity === "high"
                        ? "bg-red-500"
                        : alert.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">
                      {alert.location}
                      <span
                        className={`ml-2 text-xs ${
                          alert.severity === "high"
                            ? "text-red-500"
                            : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                  Acknowledge
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

