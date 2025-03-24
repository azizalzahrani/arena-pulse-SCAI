"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockPredictionData } from "@/lib/mock-data"

export default function BottleneckPrediction() {
  const [data] = useState(mockPredictionData.bottlenecks)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicted Bottlenecks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.location} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.location}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge
                  variant={
                    item.riskLevel === "High" ? "destructive" : item.riskLevel === "Medium" ? "default" : "outline"
                  }
                >
                  {item.riskLevel} Risk
                </Badge>
              </div>
              <Progress value={item.congestionPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">{item.congestionPercent}% congestion predicted</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

