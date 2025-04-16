"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function ParkingMap() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Parking Map</CardTitle>
        <CardDescription>Interactive map of parking areas</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="relative h-[400px] w-full overflow-hidden rounded-md border">
          <Image src="/images/parking-map.png" alt="Stadium parking map" fill className="object-cover" />

          {/* North Parking Overlay */}
          <div className="absolute top-[15%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-red-500 text-white">North: 92% Full</Badge>
          </div>

          {/* East Parking Overlay */}
          <div className="absolute top-[50%] right-[15%] transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-yellow-500 text-white">East: 68% Full</Badge>
          </div>

          {/* South Parking Overlay */}
          <div className="absolute bottom-[15%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-green-500 text-white">South: 45% Full</Badge>
          </div>

          {/* VIP Parking Overlay */}
          <div className="absolute top-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-purple-500 text-white">VIP: 75% Full</Badge>
          </div>

          {/* Staff Parking Overlay */}
          <div className="absolute bottom-[30%] right-[30%] transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-blue-500 text-white">Staff: 45% Full</Badge>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-red-500 text-red-500">
            High Occupancy (80-100%)
          </Badge>
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium Occupancy (50-79%)
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low Occupancy (0-49%)
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
