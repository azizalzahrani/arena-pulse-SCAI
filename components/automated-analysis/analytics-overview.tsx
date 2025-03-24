"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAnalysisContext } from "@/contexts/analysis-context"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Sample historical data for charts
const generateHistoricalData = (current: number, variance = 0.2, points = 24) => {
  const data = []
  let value = current * (1 - variance)

  for (let i = 0; i < points; i++) {
    // Random walk with trend toward current value
    value = value + (Math.random() - 0.5) * variance * current
    // Ensure trend toward current value
    value = value + (current - value) * 0.1

    data.push({
      time: `${23 - i}:00`,
      value: Math.max(0, Number(value.toFixed(2))),
    })
  }

  return data.reverse()
}

export function AnalyticsOverview() {
  const { analysisData } = useAnalysisContext()

  // Default values to prevent undefined errors
  const crowdDensity = analysisData?.crowdDensity ?? 2.1
  const flowRate = analysisData?.flowRate ?? 45
  const occupancy = analysisData?.occupancy ?? 65
  const safetyScore = analysisData?.safetyScore ?? 85

  // Generate historical data based on current values
  const densityHistory = generateHistoricalData(crowdDensity, 0.3)
  const flowRateHistory = generateHistoricalData(flowRate, 0.4)
  const occupancyHistory = generateHistoricalData(occupancy, 0.2)

  // Calculate trends (simple comparison with 6 hours ago)
  const densityTrend = crowdDensity > densityHistory[18].value ? "increasing" : "decreasing"
  const flowRateTrend = flowRate > flowRateHistory[18].value ? "increasing" : "decreasing"
  const occupancyTrend = occupancy > occupancyHistory[18].value ? "increasing" : "decreasing"

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Analytics Overview
          <Badge variant={safetyScore > 80 ? "outline" : "destructive"} className="ml-2">
            Safety Score: {safetyScore}
          </Badge>
        </CardTitle>
        <CardDescription>24-hour trends and real-time analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="density">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="density">Crowd Density</TabsTrigger>
            <TabsTrigger value="flow">Flow Rate</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          </TabsList>

          <TabsContent value="density" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Density</p>
                <p className="text-2xl font-bold">{crowdDensity.toFixed(2)} p/m²</p>
              </div>
              <Badge variant={densityTrend === "increasing" ? "destructive" : "outline"}>
                {densityTrend === "increasing" ? "↑ Increasing" : "↓ Decreasing"}
              </Badge>
            </div>

            <div className="h-[200px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Crowd Density (p/m²)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={densityHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                {densityTrend === "increasing"
                  ? "Crowd density has been increasing over the past 6 hours. Consider monitoring closely."
                  : "Crowd density has been decreasing over the past 6 hours. Conditions are improving."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="flow" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Flow Rate</p>
                <p className="text-2xl font-bold">{flowRate.toFixed(2)} p/min</p>
              </div>
              <Badge variant={flowRateTrend === "increasing" ? "default" : "secondary"}>
                {flowRateTrend === "increasing" ? "↑ Increasing" : "↓ Decreasing"}
              </Badge>
            </div>

            <div className="h-[200px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Flow Rate (p/min)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={flowRateHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                {flowRateTrend === "increasing"
                  ? "Flow rate has been increasing, indicating more people are moving through the venue."
                  : "Flow rate has been decreasing, suggesting reduced movement through the venue."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Occupancy</p>
                <p className="text-2xl font-bold">{occupancy.toFixed(0)}%</p>
              </div>
              <Badge variant={occupancyTrend === "increasing" ? "default" : "secondary"}>
                {occupancyTrend === "increasing" ? "↑ Increasing" : "↓ Decreasing"}
              </Badge>
            </div>

            <div className="h-[200px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Occupancy (%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                {occupancyTrend === "increasing"
                  ? "Venue occupancy has been increasing. Currently at " +
                    occupancy.toFixed(0) +
                    "% of maximum capacity."
                  : "Venue occupancy has been decreasing. Currently at " +
                    occupancy.toFixed(0) +
                    "% of maximum capacity."}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

