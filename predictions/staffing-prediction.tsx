"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { mockPredictionData } from "@/lib/mock-data"

export default function StaffingPrediction() {
  const [data] = useState(mockPredictionData.staffing)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimal Staffing Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-muted-foreground">Current: {payload[0].value} staff</div>
                          <div className="text-sm text-muted-foreground">Recommended: {payload[1].value} staff</div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="current" fill="#8884d8" name="Current" />
                <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8884d8]" />
            <span className="text-sm">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#82ca9d]" />
            <span className="text-sm">Recommended</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

