"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { Progress } from "@/components/ui/progress"

interface ZoneAnalysisProps {
  className?: string
}

export default function ZoneAnalysis({ className }: ZoneAnalysisProps) {
  const [selectedZones, setSelectedZones] = useState<string[]>(["Gate 3 Entrance", "East Concourse"])
  const { zoneAnalysis } = mockCrowdAnalysisData

  // Helper function to get color for a zone
  const getZoneColor = (zoneName: string) => {
    const colors = {
      "Gate 3 Entrance": "hsl(var(--density-critical))",
      "East Concourse": "hsl(var(--density-high))",
      "South Stand": "hsl(var(--density-high))",
      "North Concourse": "hsl(var(--density-high))",
      "Gate 4 Security": "hsl(var(--density-high))",
    }
    return colors[zoneName] || "hsl(var(--primary))"
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Zone Analysis</CardTitle>
        <Select defaultValue={selectedZones[0]} onValueChange={(value) => setSelectedZones([value, selectedZones[1]])}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select zone" />
          </SelectTrigger>
          <SelectContent>
            {zoneAnalysis.timeSeriesData[0] &&
              Object.keys(zoneAnalysis.timeSeriesData[0])
                .filter((key) => key !== "time")
                .map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={zoneAnalysis.timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Density (people/m²)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{label}</div>
                          {payload.map((entry, index) => (
                            <div key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.name}: {entry.value} people/m²
                            </div>
                          ))}
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                {selectedZones.map((zone, index) => (
                  <Line
                    key={zone}
                    type="monotone"
                    dataKey={zone}
                    name={zone}
                    stroke={getZoneColor(zone)}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="font-medium">Zone Capacity</h3>
          <div className="space-y-3">
            {zoneAnalysis.zoneCapacity
              .filter((zone) => selectedZones.includes(zone.zone))
              .map((zone) => (
                <div key={zone.zone} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{zone.zone}</span>
                    <span className="text-sm">
                      {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={zone.percentFull}
                    className="h-2"
                    indicatorClassName={
                      zone.percentFull > 90
                        ? "bg-[hsl(var(--density-critical))]"
                        : zone.percentFull > 75
                          ? "bg-[hsl(var(--density-high))]"
                          : zone.percentFull > 50
                            ? "bg-[hsl(var(--density-medium))]"
                            : "bg-[hsl(var(--density-low))]"
                    }
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{zone.percentFull}% Full</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

