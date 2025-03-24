"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ChartContainer } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { RefreshCw, AlertTriangle, Save, Share2, Trash2, Calendar, Info, Download } from "lucide-react"
import { useAnalysisData } from "@/contexts/analysis-context"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Advanced scenario generation that incorporates venue data
const generateScenarioData = (
  baseCapacity: number,
  weatherImpact: number,
  eventType: string,
  eventDate: Date,
  currentMetrics: any,
) => {
  const data = []

  // Different event types have different patterns
  let pattern = []

  if (eventType === "concert") {
    pattern = [0.2, 0.4, 0.7, 0.9, 1.0, 0.95, 0.9, 0.7, 0.5, 0.3]
  } else if (eventType === "sports") {
    pattern = [0.3, 0.5, 0.8, 0.9, 0.95, 0.9, 0.85, 0.8, 0.7, 0.4]
  } else if (eventType === "exhibition") {
    pattern = [0.4, 0.6, 0.7, 0.8, 0.8, 0.75, 0.7, 0.65, 0.6, 0.5]
  } else {
    pattern = [0.3, 0.5, 0.6, 0.7, 0.8, 0.8, 0.7, 0.6, 0.5, 0.4]
  }

  // Weather impact (negative for bad weather, positive for good weather)
  const weatherMultiplier = 1 + weatherImpact / 100

  // Use current metrics to inform the baseline
  const densityFactor = currentMetrics ? currentMetrics.crowdDensity / 2.5 : 1

  // Generate data for each hour
  for (let i = 0; i < pattern.length; i++) {
    const hour = i + 12 // Start at noon
    const timeLabel = `${hour}:00`

    // Calculate attendance based on pattern, capacity, weather, and current conditions
    const attendance = Math.round(baseCapacity * pattern[i] * weatherMultiplier * densityFactor)

    // Calculate metrics based on attendance
    const density = (attendance / baseCapacity) * 3.5 // max density of 3.5 people/m²
    const waitTime = Math.round((attendance / baseCapacity) * 20) // max wait time of 20 minutes
    const flowRate = Math.round(attendance / 60) // simple flow rate calculation

    data.push({
      time: timeLabel,
      attendance,
      density: Number.parseFloat(density.toFixed(1)),
      waitTime,
      flowRate,
      hour,
    })
  }

  return data
}

export function ScenarioPlanner() {
  // Get analysis data from context
  const { analysisData } = useAnalysisData()

  const [scenarioName, setScenarioName] = useState("Summer Concert")
  const [venueCapacity, setVenueCapacity] = useState(5000)
  const [eventType, setEventType] = useState("concert")
  const [weatherImpact, setWeatherImpact] = useState(10) // percentage impact, positive is good
  const [eventDate, setEventDate] = useState(new Date())
  const [isGenerating, setIsGenerating] = useState(false)
  const [scenarioData, setScenarioData] = useState<any[]>([])
  const [selectedMetric, setSelectedMetric] = useState("attendance")
  const [compareWithCurrent, setCompareWithCurrent] = useState(true)
  const [scenarios, setScenarios] = useState([
    { id: 1, name: "Summer Concert", active: true },
    { id: 2, name: "Rainy Day Game", active: false },
  ])

  // Generate scenario when parameters change
  const generateScenario = async () => {
    setIsGenerating(true)

    // Simulate AI model processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate scenario data using current metrics from automated analysis
    const data = generateScenarioData(
      venueCapacity,
      weatherImpact,
      eventType,
      eventDate,
      compareWithCurrent ? analysisData : null,
    )

    setScenarioData(data)
    setIsGenerating(false)
  }

  // Save current scenario
  const saveScenario = () => {
    const newScenario = {
      id: scenarios.length + 1,
      name: scenarioName,
      active: true,
    }

    // Set all other scenarios to inactive
    const updatedScenarios = scenarios.map((s) => ({ ...s, active: false }))
    setScenarios([...updatedScenarios, newScenario])
  }

  // Get color based on metric value
  const getMetricColor = (value: number, metric: string) => {
    if (metric === "attendance") {
      return value > venueCapacity * 0.8 ? "#ef4444" : value > venueCapacity * 0.6 ? "#f59e0b" : "#10b981"
    } else if (metric === "density") {
      return value > 3 ? "#ef4444" : value > 2 ? "#f59e0b" : "#10b981"
    } else if (metric === "waitTime") {
      return value > 15 ? "#ef4444" : value > 10 ? "#f59e0b" : "#10b981"
    } else if (metric === "flowRate") {
      return value > 50 ? "#ef4444" : value > 30 ? "#f59e0b" : "#10b981"
    }
    return "#3b82f6"
  }

  // Get metric label
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case "attendance":
        return "Attendance"
      case "density":
        return "Crowd Density (p/m²)"
      case "waitTime":
        return "Wait Time (min)"
      case "flowRate":
        return "Flow Rate (p/min)"
      default:
        return "Value"
    }
  }

  // Get metric unit
  const getMetricUnit = () => {
    switch (selectedMetric) {
      case "attendance":
        return ""
      case "density":
        return " p/m²"
      case "waitTime":
        return " min"
      case "flowRate":
        return " p/min"
      default:
        return ""
    }
  }

  // Get current metric value for comparison
  const getCurrentMetricValue = () => {
    switch (selectedMetric) {
      case "density":
        return analysisData.crowdDensity
      case "waitTime":
        return analysisData.waitTime
      case "flowRate":
        return analysisData.flowRate
      default:
        return null // No direct comparison for attendance
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Scenario Planner</CardTitle>
            <CardDescription>
              Model different event scenarios and predict crowd behavior based on automated analysis
            </CardDescription>
          </div>
          <Badge variant={isGenerating ? "outline" : "secondary"} className="ml-2">
            {isGenerating ? (
              <span className="flex items-center">
                <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                Processing
              </span>
            ) : (
              "Scenario Tool"
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Controls */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input id="scenario-name" value={scenarioName} onChange={(e) => setScenarioName(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="event-type">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="sports">Sports Match</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="venue-capacity">Venue Capacity</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="venue-capacity"
                  type="number"
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(Number.parseInt(e.target.value) || 1000)}
                />
                <span className="text-sm text-muted-foreground">people</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Weather Impact</Label>
                <span className="text-sm text-muted-foreground">
                  {weatherImpact > 0 ? `+${weatherImpact}%` : `${weatherImpact}%`}
                </span>
              </div>
              <Slider
                value={[weatherImpact]}
                min={-30}
                max={30}
                step={5}
                onValueChange={(value) => setWeatherImpact(value[0])}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Bad Weather</span>
                <span>Neutral</span>
                <span>Good Weather</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="compare-current">Use Current Analysis Data</Label>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      When enabled, the scenario will incorporate current crowd metrics from the automated analysis
                      system.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
              <Switch id="compare-current" checked={compareWithCurrent} onCheckedChange={setCompareWithCurrent} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Saved Scenarios
              </h3>
              <div className="space-y-2">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`flex items-center justify-between rounded-md p-2 ${
                      scenario.active ? "bg-primary/10" : ""
                    }`}
                  >
                    <span className="font-medium">{scenario.name}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          const updatedScenarios = scenarios.map((s) => ({
                            ...s,
                            active: s.id === scenario.id,
                          }))
                          setScenarios(updatedScenarios)
                          setScenarioName(scenario.name)
                        }}
                      >
                        {scenario.active ? (
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                        ) : (
                          <span className="h-2 w-2 rounded-full border"></span>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => {
                          const updatedScenarios = scenarios.filter((s) => s.id !== scenario.id)
                          setScenarios(updatedScenarios)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {compareWithCurrent && (
              <div className="rounded-md bg-muted p-3">
                <h4 className="font-medium mb-1">Current Analysis Data</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Crowd Density:</span>{" "}
                    <span className="font-medium">{analysisData.crowdDensity.toFixed(1)} p/m²</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Flow Rate:</span>{" "}
                    <span className="font-medium">{analysisData.flowRate} p/min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Wait Time:</span>{" "}
                    <span className="font-medium">{analysisData.waitTime} min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Hotspots:</span>{" "}
                    <span className="font-medium">{analysisData.hotspots}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1" onClick={generateScenario} disabled={isGenerating}>
                {isGenerating ? (
                  <span className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Scenario
                  </span>
                ) : (
                  "Generate Scenario"
                )}
              </Button>
              <Button variant="outline" onClick={saveScenario}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Metric Selection */}
        <div>
          <Label>View Metric</Label>
          <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="mt-2">
            <TabsList>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="density">Crowd Density</TabsTrigger>
              <TabsTrigger value="waitTime">Wait Times</TabsTrigger>
              <TabsTrigger value="flowRate">Flow Rate</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scenario Chart */}
        {scenarioData.length > 0 && (
          <div>
            <h3 className="mb-4 font-medium">Predicted {getMetricLabel()} by Hour</h3>
            <div className="h-[300px]">
              <ChartContainer className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  {compareWithCurrent && getCurrentMetricValue() !== null ? (
                    <LineChart data={scenarioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-md">
                                <p className="font-medium">{payload[0].payload.time}</p>
                                <p className="text-sm">
                                  {getMetricLabel()}: {payload[0].value}
                                  {getMetricUnit()}
                                </p>
                                {payload.length > 1 && (
                                  <p className="text-sm">
                                    Current: {payload[1].value}
                                    {getMetricUnit()}
                                  </p>
                                )}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedMetric}
                        name={`Scenario ${getMetricLabel()}`}
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        data={scenarioData.map((d) => ({
                          time: d.time,
                          current: getCurrentMetricValue(),
                        }))}
                        dataKey="current"
                        name={`Current ${getMetricLabel()}`}
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={scenarioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-md">
                                <p className="font-medium">{payload[0].payload.time}</p>
                                <p className="text-sm">
                                  {getMetricLabel()}: {payload[0].value}
                                  {getMetricUnit()}
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Bar dataKey={selectedMetric} name={getMetricLabel()}>
                        {scenarioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getMetricColor(entry[selectedMetric], selectedMetric)} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* Risk Assessment */}
        {scenarioData.length > 0 && (
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-medium">Risk Assessment</h3>
            <div className="space-y-3">
              {selectedMetric === "attendance" && (
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 ${
                      Math.max(...scenarioData.map((d) => d.attendance)) > venueCapacity * 0.9
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="font-medium">Capacity Risk</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.max(...scenarioData.map((d) => d.attendance)) > venueCapacity * 0.9
                        ? "High risk of reaching capacity limits. Consider adding entry restrictions or increasing staff."
                        : Math.max(...scenarioData.map((d) => d.attendance)) > venueCapacity * 0.7
                          ? "Moderate capacity risk. Monitor entry points during peak hours."
                          : "Low capacity risk. Venue should comfortably accommodate expected attendance."}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === "density" && (
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 ${
                      Math.max(...scenarioData.map((d) => d.density)) > 3 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="font-medium">Density Risk</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.max(...scenarioData.map((d) => d.density)) > 3
                        ? "High density risk. Implement crowd control measures and consider reducing ticket sales."
                        : Math.max(...scenarioData.map((d) => d.density)) > 2
                          ? "Moderate density risk. Ensure proper crowd flow management in high-traffic areas."
                          : "Low density risk. Crowd should be comfortably distributed throughout the venue."}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === "waitTime" && (
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 ${
                      Math.max(...scenarioData.map((d) => d.waitTime)) > 15
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="font-medium">Wait Time Risk</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.max(...scenarioData.map((d) => d.waitTime)) > 15
                        ? "High wait time risk. Add more service points or staff to reduce queues."
                        : Math.max(...scenarioData.map((d) => d.waitTime)) > 10
                          ? "Moderate wait time risk. Consider optimizing service efficiency during peak hours."
                          : "Low wait time risk. Wait times should be acceptable for most attendees."}
                    </div>
                  </div>
                </div>
              )}

              {selectedMetric === "flowRate" && (
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 ${
                      Math.max(...scenarioData.map((d) => d.flowRate)) > 50
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="font-medium">Flow Rate Risk</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.max(...scenarioData.map((d) => d.flowRate)) > 50
                        ? "High flow rate risk. Implement crowd control measures to prevent bottlenecks."
                        : Math.max(...scenarioData.map((d) => d.flowRate)) > 30
                          ? "Moderate flow rate risk. Monitor main pathways and entrances."
                          : "Low flow rate risk. Crowd movement should be smooth throughout the venue."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

