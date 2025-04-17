"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function ParkingAnalytics() {
  // In a real application, this would be dynamic data from an API
  const analyticsData = {
    today: {
      peakTime: "18:30",
      averageStay: "2h 45m",
      turnoverRate: "3.2 vehicles/spot",
      occupancyRate: "78%",
    },
    weekly: {
      peakDay: "Saturday",
      averageStay: "2h 30m",
      turnoverRate: "2.8 vehicles/spot",
      occupancyRate: "65%",
    },
    monthly: {
      peakDay: "15th",
      averageStay: "2h 15m",
      turnoverRate: "2.5 vehicles/spot",
      occupancyRate: "58%",
    },
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Parking Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="today" className="flex-1">
              Today
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex-1">
              Monthly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Peak Time</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.today.peakTime}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Average Stay</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.today.averageStay}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Turnover Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.today.turnoverRate}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Occupancy Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.today.occupancyRate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Peak Day</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.weekly.peakDay}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Average Stay</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.weekly.averageStay}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Turnover Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.weekly.turnoverRate}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Occupancy Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.weekly.occupancyRate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Peak Day</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.monthly.peakDay}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Average Stay</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.monthly.averageStay}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Turnover Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.monthly.turnoverRate}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h4 className="text-sm font-medium text-muted-foreground">Occupancy Rate</h4>
                <p className="mt-1 text-xl font-semibold">{analyticsData.monthly.occupancyRate}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
