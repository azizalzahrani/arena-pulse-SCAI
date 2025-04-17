"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, AlertTriangle, Clock, TrendingUp } from "lucide-react"

export function ParkingAIInsights() {
  const [activeTab, setActiveTab] = useState("insights")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-arena-purple" />
          <CardTitle className="text-lg">AI Insights</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-end mb-4">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="insights" className="mt-0 space-y-4">
            <div className="rounded-md border p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-arena-blue" />
                <span className="text-sm font-medium">Occupancy Prediction</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on historical data and current event attendance, North and East parking areas will reach full
                capacity by 17:30.
              </p>
            </div>

            <div className="rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-arena-teal" />
                <span className="text-sm font-medium">Optimal Arrival Time</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                To avoid parking congestion, recommend attendees arrive between 14:00-15:30 or after 18:30.
              </p>
            </div>

            <div className="rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-arena-purple" />
                <span className="text-sm font-medium">Traffic Flow Optimization</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Redirecting 30% of incoming traffic from North to West parking would reduce overall wait times by
                approximately 12 minutes.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-0 space-y-4">
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">North Parking Critical</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                North parking area is at 85% capacity and expected to fill completely within 30 minutes. Redirect
                traffic to West area.
              </p>
            </div>

            <div className="rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">VIP Parking Warning</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                VIP parking is at 82% capacity. Reserve remaining spots for platinum ticket holders only.
              </p>
            </div>

            <div className="rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">East Exit Congestion</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Predicted congestion at East parking exit after event. Consider opening additional exit gate.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
