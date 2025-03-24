"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrainCircuit } from "lucide-react"

// Mock data for staff performance
const staffPerformanceData = {
  byRole: [
    { name: "Security", efficiency: 87, satisfaction: 82, benchmark: 80 },
    { name: "Concessions", efficiency: 76, satisfaction: 68, benchmark: 75 },
    { name: "Ticketing", efficiency: 92, satisfaction: 88, benchmark: 85 },
    { name: "Cleaning", efficiency: 84, satisfaction: 79, benchmark: 78 },
    { name: "Medical", efficiency: 95, satisfaction: 91, benchmark: 90 },
    { name: "Supervisors", efficiency: 89, satisfaction: 85, benchmark: 88 },
  ],
  byVenue: [
    { name: "King Fahd", efficiency: 88, satisfaction: 83, benchmark: 82 },
    { name: "King Abdullah", efficiency: 85, satisfaction: 80, benchmark: 81 },
    { name: "Prince Faisal", efficiency: 82, satisfaction: 78, benchmark: 80 },
    { name: "Mrsool Park", efficiency: 90, satisfaction: 86, benchmark: 83 },
  ],
}

export default function StaffPerformance() {
  const [viewMode, setViewMode] = useState("byRole")
  const [metricType, setMetricType] = useState("efficiency")

  // Select the data based on the view mode
  const data = staffPerformanceData[viewMode]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Staff Performance</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="byRole">By Role</SelectItem>
              <SelectItem value="byVenue">By Venue</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={metricType} onValueChange={setMetricType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="satisfaction">Satisfaction</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{label}</div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">
                                {metricType === "efficiency" ? "Efficiency" : "Satisfaction"}:
                              </span>
                              <span className="font-medium">{payload[0].value}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Benchmark:</span>
                              <span className="font-medium">{payload[1].value}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Difference:</span>
                              <span
                                className={`font-medium ${(payload[0].value - payload[1].value) >= 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {payload[0].value - payload[1].value >= 0 ? "+" : ""}
                                {payload[0].value - payload[1].value}%
                              </span>
                            </div>
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Bar
                  dataKey={metricType}
                  name={metricType === "efficiency" ? "Efficiency" : "Satisfaction"}
                  fill="hsl(var(--primary))"
                />
                <Bar dataKey="benchmark" name="Industry Benchmark" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
          <h3 className="text-sm font-medium">AI Insights</h3>
          {metricType === "efficiency" && (
            <p className="text-sm text-muted-foreground">
              Ticketing staff shows the highest efficiency at 92%, exceeding the benchmark by 7%. Consider documenting
              their processes to implement across other venues.
            </p>
          )}
          {metricType === "satisfaction" && (
            <p className="text-sm text-muted-foreground">
              Concessions staff satisfaction is 7% below benchmark. Our analysis suggests this may be due to
              understaffing during peak periods. Consider increasing staff during high-volume events.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

