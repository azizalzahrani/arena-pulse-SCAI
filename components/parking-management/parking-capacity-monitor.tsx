"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ParkingCapacityMonitor() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Parking Capacity</CardTitle>
        <CardDescription>Real-time parking lot occupancy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">General Parking (North)</span>
            <Badge variant="outline" className="bg-red-100">
              92% Full
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: "92%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">42 spots remaining</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">General Parking (East)</span>
            <Badge variant="outline" className="bg-yellow-100">
              68% Full
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "68%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">160 spots remaining</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">VIP Parking</span>
            <Badge variant="outline" className="bg-yellow-100">
              75% Full
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">50 spots remaining</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Staff Parking</span>
            <Badge variant="outline" className="bg-green-100">
              45% Full
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">110 spots remaining</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Handicap Parking</span>
            <Badge variant="outline" className="bg-green-100">
              30% Full
            </Badge>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">70 spots remaining</p>
        </div>
      </CardContent>
    </Card>
  )
}
