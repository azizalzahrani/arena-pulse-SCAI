"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { mockPredictionData } from "@/lib/mock-data"

export default function CrowdDensityPrediction() {
  const [data] = useState(mockPredictionData.crowdDensity)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicted Crowd Density</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} dot={false} />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8884d8]" />
            <span className="text-sm">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#82ca9d]" />
            <span className="text-sm">Predicted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

