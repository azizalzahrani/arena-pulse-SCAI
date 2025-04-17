"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function ParkingAIInsights() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">AI Insights</CardTitle>
        <Sparkles className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              624 spots available
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
            >
              High demand
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Current capacity is at 75% with peak time approaching in 45 minutes.
          </p>
        </div>

        <div className="space-y-2 rounded-lg bg-muted p-3">
          <h4 className="font-medium">Predicted Occupancy</h4>
          <p className="text-sm text-muted-foreground">
            Based on historical data and today's event, we predict 95% occupancy by 7:30 PM.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span className="text-xs">North parking will reach capacity first</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Weather Impact</h4>
          <p className="text-sm text-muted-foreground">
            Current weather conditions are increasing parking duration by approximately 12 minutes per vehicle.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Unusual Activity</h4>
          <p className="text-sm text-muted-foreground">
            South entrance showing 23% higher traffic than normal for this time and event type.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
