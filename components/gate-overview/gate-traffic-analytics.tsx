"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Generate sample traffic data
const generateTrafficData = (timeRange: "day" | "week" | "month") => {
  const data = []
  const now = new Date()
  let points = 0
  let interval = 0

  switch (timeRange) {
    case "day":
      points = 24
      interval = 60 * 60 * 1000 // 1 hour in ms
      break
    case "week":
      points = 7
      interval = 24 * 60 * 60 * 1000 // 1 day in ms
      break
    case "month":
      points = 30
      interval = 24 * 60 * 60 * 1000 // 1 day in ms
      break
  }

  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * interval)

    // Format the time label based on the range
    let timeLabel = ""
    if (timeRange === "day") {
      timeLabel = time.getHours().toString().padStart(2, "0") + ":00"
    } else {
      timeLabel = `${time.getMonth() + 1}/${time.getDate()}`
    }

    // Generate traffic values with some randomness
    const northTraffic = Math.floor(Math.random() * 300 + 100)
    const southTraffic = Math.floor(Math.random() * 250 + 150)
    const eastTraffic = Math.floor(Math.random() * 200 + 100)
    const westTraffic = Math.floor(Math.random() * 180 + 120)

    data.push({
      time: timeLabel,
      north: northTraffic,
      south: southTraffic,
      east: eastTraffic,
      west: westTraffic,
    })
  }

  return data
}

export function GateTrafficAnalytics() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day")
  const [selectedGate, setSelectedGate] = useState("all")
  const data = generateTrafficData(timeRange)

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>Gate Traffic</CardTitle>
            <p className="text-sm text-muted-foreground">People flow through gates over time</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedGate} onValueChange={setSelectedGate}>
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue placeholder="Select gate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gates</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
            <Tabs defaultValue="day" value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <TabsList className="h-8">
                <TabsTrigger value="day" className="text-xs">
                  24h
                </TabsTrigger>
                <TabsTrigger value="week" className="text-xs">
                  7d
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs">
                  30d
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            north: {
              label: "North Gates",
              color: "hsl(var(--primary))",
            },
            south: {
              label: "South Gates",
              color: "hsl(var(--arena-blue))",
            },
            east: {
              label: "East Gates",
              color: "hsl(var(--arena-teal))",
            },
            west: {
              label: "West Gates",
              color: "hsl(var(--arena-orange))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {(selectedGate === "all" || selectedGate === "north") && (
                <Line
                  type="monotone"
                  dataKey="north"
                  stroke="var(--color-north)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                  name="North Gates"
                />
              )}
              {(selectedGate === "all" || selectedGate === "south") && (
                <Line
                  type="monotone"
                  dataKey="south"
                  stroke="var(--color-south)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                  name="South Gates"
                />
              )}
              {(selectedGate === "all" || selectedGate === "east") && (
                <Line
                  type="monotone"
                  dataKey="east"
                  stroke="var(--color-east)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                  name="East Gates"
                />
              )}
              {(selectedGate === "all" || selectedGate === "west") && (
                <Line
                  type="monotone"
                  dataKey="west"
                  stroke="var(--color-west)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                  name="West Gates"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-xs text-muted-foreground">North Gates</div>
            <div className="text-lg font-bold">1,245</div>
            <div className="text-xs text-green-600">+12% from avg</div>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-xs text-muted-foreground">South Gates</div>
            <div className="text-lg font-bold">1,876</div>
            <div className="text-xs text-green-600">+8% from avg</div>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-xs text-muted-foreground">East Gates</div>
            <div className="text-lg font-bold">932</div>
            <div className="text-xs text-red-600">-5% from avg</div>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-xs text-muted-foreground">West Gates</div>
            <div className="text-lg font-bold">1,103</div>
            <div className="text-xs text-green-600">+3% from avg</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
