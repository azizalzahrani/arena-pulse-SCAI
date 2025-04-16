"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { useState } from "react"
import { AIBadge } from "@/components/ui/ai-badge"

// Generate sample accuracy data
const generateAccuracyData = (timeRange: "day" | "week" | "month") => {
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

    // Generate accuracy values with some randomness but trending upward
    const baseAccuracy = 85 + (points - i) * (10 / points) // Trend from 85% to 95%
    const crowdAccuracy = Math.min(98, baseAccuracy + Math.random() * 3 - 1)
    const eventAccuracy = Math.min(98, baseAccuracy - 2 + Math.random() * 4 - 2)
    const anomalyAccuracy = Math.min(98, baseAccuracy - 5 + Math.random() * 6 - 3)

    data.push({
      time: timeLabel,
      crowd: Number.parseFloat(crowdAccuracy.toFixed(1)),
      event: Number.parseFloat(eventAccuracy.toFixed(1)),
      anomaly: Number.parseFloat(anomalyAccuracy.toFixed(1)),
    })
  }

  return data
}

export function PredictionAccuracy() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week")
  const data = generateAccuracyData(timeRange)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Prediction Accuracy</CardTitle>
          <AIBadge />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            crowd: {
              label: "Crowd Flow",
              color: "hsl(var(--primary))",
            },
            event: {
              label: "Event Impact",
              color: "hsl(var(--arena-blue))",
            },
            anomaly: {
              label: "Anomaly Detection",
              color: "hsl(var(--arena-orange))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="crowd"
                stroke="var(--color-crowd)"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="Crowd Flow"
              />
              <Line
                type="monotone"
                dataKey="event"
                stroke="var(--color-event)"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="Event Impact"
              />
              <Line
                type="monotone"
                dataKey="anomaly"
                stroke="var(--color-anomaly)"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="Anomaly Detection"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
