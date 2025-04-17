"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ParkingHistoricalData() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Historical Data</CardTitle>
        <Select defaultValue="lastMonth">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastQuarter">Last Quarter</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Occupancy Patterns</h4>
            <div className="h-[120px] w-full rounded-md bg-muted">
              {/* This would be a chart in a real application */}
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Occupancy chart visualization</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Event Correlation</h4>
            <div className="rounded-lg border p-3">
              <p className="text-sm">
                <span className="font-medium">Football matches:</span> 92% average occupancy
              </p>
              <p className="text-sm">
                <span className="font-medium">Concerts:</span> 87% average occupancy
              </p>
              <p className="text-sm">
                <span className="font-medium">Exhibitions:</span> 65% average occupancy
              </p>
              <p className="text-sm">
                <span className="font-medium">Religious holidays:</span> 78% average occupancy
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Seasonal Trends</h4>
            <p className="text-sm text-muted-foreground">
              Winter months show 15% lower average occupancy compared to spring and fall events. Summer evening events
              have the highest turnover rate at 3.5 vehicles per spot.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
