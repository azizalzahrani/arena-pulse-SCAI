"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { mockDashboardData } from "@/lib/mock-data"

export default function CrowdDensityChart() {
  const [data, setData] = useState(mockDashboardData.crowdDensity)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]
        // Add a new data point
        const lastTime = new Date(newData[newData.length - 1].time)
        lastTime.setMinutes(lastTime.getMinutes() + 15)

        // Generate a random value based on the last value
        const lastValue = newData[newData.length - 1].value
        const randomChange = Math.random() * 0.6 - 0.3 // Random change between -0.3 and 0.3
        const newValue = Math.max(0.5, Math.min(5, lastValue + randomChange))

        newData.push({
          time: lastTime.toISOString(),
          value: Number.parseFloat(newValue.toFixed(2)),
        })

        // Remove the oldest data point to keep the chart size consistent
        return newData.slice(1)
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Crowd Density (people/m²)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  tickFormatter={(time) => {
                    const date = new Date(time)
                    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const date = new Date(label)
                      const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{formattedTime}</div>
                          <div className="text-sm text-muted-foreground">{payload[0].value} people/m²</div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorDensity)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

