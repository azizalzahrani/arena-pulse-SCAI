"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from "recharts"
import { BrainCircuit } from "lucide-react"

// Mock data for attendance forecast
const attendanceData = [
  {
    event: "Al-Hilal vs Al-Nassr",
    date: "Mar 15",
    predicted: 58923,
    capacity: 68752,
    historical: 62500,
  },
  {
    event: "Al-Ahli vs Al-Ittihad",
    date: "Mar 19",
    predicted: 45678,
    capacity: 62345,
    historical: 48000,
  },
  {
    event: "Saudi Arabia vs UAE",
    date: "Mar 23",
    predicted: 61234,
    capacity: 68752,
    historical: 65000,
  },
  {
    event: "Al-Shabab vs Al-Fateh",
    date: "Mar 26",
    predicted: 15678,
    capacity: 22000,
    historical: 14500,
  },
  {
    event: "Al-Taawoun vs Al-Raed",
    date: "Mar 30",
    predicted: 32456,
    capacity: 62345,
    historical: 30000,
  },
]

export default function EventAttendanceForecast() {
  const [forecastType, setForecastType] = useState("all")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Attendance Forecast</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Select defaultValue={forecastType} onValueChange={setForecastType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="league">League Matches</SelectItem>
            <SelectItem value="cup">Cup Matches</SelectItem>
            <SelectItem value="international">International</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{data.event}</div>
                          <div className="text-sm text-muted-foreground">{label}</div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Predicted:</span>
                              <span className="font-medium">{data.predicted.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Historical:</span>
                              <span className="font-medium">{data.historical.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Capacity:</span>
                              <span className="font-medium">{data.capacity.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm">Fill Rate:</span>
                              <span className="font-medium">{Math.round((data.predicted / data.capacity) * 100)}%</span>
                            </div>
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="predicted" name="Predicted Attendance" fill="hsl(var(--primary))" />
                <Bar dataKey="historical" name="Historical Average" fill="#8884d8" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
          <h3 className="text-sm font-medium">AI Insights</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
              <span>The Saudi Arabia vs UAE match is predicted to have the highest attendance at 89% of capacity.</span>
            </li>
            <li className="flex items-start gap-2">
              <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Al-Shabab vs Al-Fateh shows a 8% increase over historical attendance, likely due to recent team
                performance.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Consider promotional campaigns for Al-Taawoun vs Al-Raed to increase attendance from the predicted 52%.
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

