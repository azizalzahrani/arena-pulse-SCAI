"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Simulated data
const hourlyData = [
  { time: "09:00", north: 120, south: 80, east: 100, west: 60, vip: 30 },
  { time: "10:00", north: 180, south: 120, east: 150, west: 90, vip: 45 },
  { time: "11:00", north: 250, south: 160, east: 180, west: 120, vip: 60 },
  { time: "12:00", north: 300, south: 200, east: 220, west: 150, vip: 75 },
  { time: "13:00", north: 350, south: 230, east: 240, west: 180, vip: 85 },
  { time: "14:00", north: 380, south: 250, east: 260, west: 200, vip: 95 },
  { time: "15:00", north: 400, south: 270, east: 270, west: 220, vip: 100 },
  { time: "16:00", north: 420, south: 280, east: 275, west: 230, vip: 110 },
  { time: "17:00", north: 430, south: 290, east: 280, west: 240, vip: 115 },
  { time: "18:00", north: 425, south: 285, east: 270, west: 235, vip: 110 },
  { time: "19:00", north: 410, south: 270, east: 260, west: 220, vip: 105 },
  { time: "20:00", north: 380, south: 250, east: 240, west: 200, vip: 95 },
]

const weeklyData = [
  { day: "Mon", occupancy: 65 },
  { day: "Tue", occupancy: 58 },
  { day: "Wed", occupancy: 62 },
  { day: "Thu", occupancy: 70 },
  { day: "Fri", occupancy: 85 },
  { day: "Sat", occupancy: 92 },
  { day: "Sun", occupancy: 78 },
]

const entryExitData = [
  { time: "09:00", entries: 120, exits: 20 },
  { time: "10:00", entries: 150, exits: 40 },
  { time: "11:00", entries: 180, exits: 60 },
  { time: "12:00", entries: 160, exits: 80 },
  { time: "13:00", entries: 140, exits: 100 },
  { time: "14:00", entries: 130, exits: 120 },
  { time: "15:00", entries: 120, exits: 140 },
  { time: "16:00", entries: 100, exits: 160 },
  { time: "17:00", entries: 80, exits: 180 },
  { time: "18:00", entries: 60, exits: 200 },
  { time: "19:00", entries: 40, exits: 180 },
  { time: "20:00", entries: 20, exits: 160 },
]

export function ParkingAnalytics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Parking Analytics</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="occupancy">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
            <TabsTrigger value="flow">Entry/Exit Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="occupancy" className="mt-4">
            <ChartContainer
              config={{
                north: {
                  label: "North Parking",
                  color: "hsl(var(--chart-1))",
                },
                south: {
                  label: "South Parking",
                  color: "hsl(var(--chart-2))",
                },
                east: {
                  label: "East Parking",
                  color: "hsl(var(--chart-3))",
                },
                west: {
                  label: "West Parking",
                  color: "hsl(var(--chart-4))",
                },
                vip: {
                  label: "VIP Parking",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="north" stroke="var(--color-north)" strokeWidth={2} />
                  <Line type="monotone" dataKey="south" stroke="var(--color-south)" strokeWidth={2} />
                  <Line type="monotone" dataKey="east" stroke="var(--color-east)" strokeWidth={2} />
                  <Line type="monotone" dataKey="west" stroke="var(--color-west)" strokeWidth={2} />
                  <Line type="monotone" dataKey="vip" stroke="var(--color-vip)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                AI Analysis: Peak occupancy observed at 17:00 with North parking reaching 95% capacity. West parking
                consistently shows the lowest utilization rate.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-4">
            <ChartContainer
              config={{
                occupancy: {
                  label: "Occupancy %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="occupancy" fill="var(--color-occupancy)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                AI Analysis: Weekend days show significantly higher parking utilization. Saturday has the highest
                occupancy at 92%, while Tuesday has the lowest at 58%.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="flow" className="mt-4">
            <ChartContainer
              config={{
                entries: {
                  label: "Entries",
                  color: "hsl(var(--chart-1))",
                },
                exits: {
                  label: "Exits",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={entryExitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="entries" stroke="var(--color-entries)" strokeWidth={2} />
                  <Line type="monotone" dataKey="exits" stroke="var(--color-exits)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                AI Analysis: Entry flow peaks at 11:00 while exit flow peaks at 18:00. The crossover point occurs at
                approximately 14:30, indicating the midpoint of the event.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
