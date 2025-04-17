"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Maximize2, ZoomIn, ZoomOut, Layers } from "lucide-react"
import { ParkingSpotDetails } from "./parking-spot-details"

// Simulated parking data
const parkingAreas = [
  { id: "north", name: "North Parking", capacity: 450, occupied: 382, status: "high" },
  { id: "south", name: "South Parking", capacity: 320, occupied: 187, status: "medium" },
  { id: "east", name: "East Parking", capacity: 280, occupied: 243, status: "high" },
  { id: "west", name: "West Parking", capacity: 350, occupied: 112, status: "low" },
  { id: "vip", name: "VIP Parking", capacity: 120, occupied: 98, status: "high" },
]

export function StadiumParkingMap() {
  const [activeTab, setActiveTab] = useState("live")
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleZoomIn = () => {
    if (zoomLevel < 1.5) setZoomLevel(zoomLevel + 0.1)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.8) setZoomLevel(zoomLevel - 0.1)
  }

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId === selectedArea ? null : areaId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/50"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Stadium Parking Map</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[240px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live">Live View</TabsTrigger>
            <TabsTrigger value="predictive">Predictive View</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative">
          <div className="relative h-[500px] overflow-hidden">
            <div
              className="relative h-full w-full transition-transform duration-300 ease-in-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src="/stadium-parking-map.jpg"
                alt="Stadium Parking Map"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />

              {/* Overlay for parking areas */}
              <div className="absolute inset-0">
                {/* North Parking Area */}
                <div
                  className={`absolute left-[40%] top-[10%] h-[12%] w-[20%] cursor-pointer rounded-md border-2 ${
                    selectedArea === "north"
                      ? "border-arena-blue animate-pulse"
                      : getStatusColor(parkingAreas[0].status)
                  } transition-all duration-300`}
                  onClick={() => handleAreaClick("north")}
                >
                  <div className="absolute bottom-2 left-2 flex flex-col">
                    <span className="text-xs font-bold text-white">North Parking</span>
                    <span className="text-xs text-white/80">
                      {Math.round((parkingAreas[0].occupied / parkingAreas[0].capacity) * 100)}% Full
                    </span>
                  </div>
                </div>

                {/* South Parking Area */}
                <div
                  className={`absolute bottom-[10%] left-[40%] h-[12%] w-[20%] cursor-pointer rounded-md border-2 ${
                    selectedArea === "south"
                      ? "border-arena-blue animate-pulse"
                      : getStatusColor(parkingAreas[1].status)
                  } transition-all duration-300`}
                  onClick={() => handleAreaClick("south")}
                >
                  <div className="absolute bottom-2 left-2 flex flex-col">
                    <span className="text-xs font-bold text-white">South Parking</span>
                    <span className="text-xs text-white/80">
                      {Math.round((parkingAreas[1].occupied / parkingAreas[1].capacity) * 100)}% Full
                    </span>
                  </div>
                </div>

                {/* East Parking Area */}
                <div
                  className={`absolute right-[10%] top-[40%] h-[20%] w-[12%] cursor-pointer rounded-md border-2 ${
                    selectedArea === "east" ? "border-arena-blue animate-pulse" : getStatusColor(parkingAreas[2].status)
                  } transition-all duration-300`}
                  onClick={() => handleAreaClick("east")}
                >
                  <div className="absolute bottom-2 left-2 flex flex-col">
                    <span className="text-xs font-bold text-white">East Parking</span>
                    <span className="text-xs text-white/80">
                      {Math.round((parkingAreas[2].occupied / parkingAreas[2].capacity) * 100)}% Full
                    </span>
                  </div>
                </div>

                {/* West Parking Area */}
                <div
                  className={`absolute left-[10%] top-[40%] h-[20%] w-[12%] cursor-pointer rounded-md border-2 ${
                    selectedArea === "west" ? "border-arena-blue animate-pulse" : getStatusColor(parkingAreas[3].status)
                  } transition-all duration-300`}
                  onClick={() => handleAreaClick("west")}
                >
                  <div className="absolute bottom-2 left-2 flex flex-col">
                    <span className="text-xs font-bold text-white">West Parking</span>
                    <span className="text-xs text-white/80">
                      {Math.round((parkingAreas[3].occupied / parkingAreas[3].capacity) * 100)}% Full
                    </span>
                  </div>
                </div>

                {/* VIP Parking Area - Not visible in this map, so we'll make it smaller and place it near the stadium */}
                <div
                  className={`absolute bottom-[35%] left-[45%] h-[10%] w-[10%] cursor-pointer rounded-md border-2 ${
                    selectedArea === "vip" ? "border-arena-blue animate-pulse" : getStatusColor(parkingAreas[4].status)
                  } transition-all duration-300`}
                  onClick={() => handleAreaClick("vip")}
                >
                  <div className="absolute bottom-2 left-2 flex flex-col">
                    <span className="text-xs font-bold text-white">VIP Parking</span>
                    <span className="text-xs text-white/80">
                      {Math.round((parkingAreas[4].occupied / parkingAreas[4].capacity) * 100)}% Full
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Detection Boxes - Only in live view */}
              {activeTab === "live" && (
                <div className="absolute inset-0">
                  {/* Simulated AI detection boxes */}
                  <div className="absolute left-[42%] top-[12%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">87%</span>
                  </div>
                  <div className="absolute left-[48%] top-[14%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">92%</span>
                  </div>
                  <div className="absolute left-[52%] top-[11%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">78%</span>
                  </div>

                  {/* More detection boxes in other areas */}
                  <div className="absolute bottom-[12%] left-[45%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">81%</span>
                  </div>
                  <div className="absolute bottom-[14%] left-[50%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">75%</span>
                  </div>

                  <div className="absolute right-[12%] top-[42%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">89%</span>
                  </div>
                  <div className="absolute right-[14%] top-[48%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">94%</span>
                  </div>

                  <div className="absolute left-[12%] top-[45%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">83%</span>
                  </div>

                  <div className="absolute bottom-[38%] left-[48%] h-[3%] w-[2%] rounded-sm border-2 border-green-500">
                    <span className="absolute -top-5 left-0 text-xs text-green-500">96%</span>
                  </div>
                </div>
              )}

              {/* Predictive Heatmap - Only in predictive view */}
              {activeTab === "predictive" && (
                <div className="absolute inset-0 bg-black/30">
                  {/* North area - high occupancy prediction */}
                  <div className="absolute left-[40%] top-[10%] h-[12%] w-[20%] bg-red-500/30"></div>

                  {/* South area - medium occupancy prediction */}
                  <div className="absolute bottom-[10%] left-[40%] h-[12%] w-[20%] bg-yellow-500/30"></div>

                  {/* East area - high occupancy prediction */}
                  <div className="absolute right-[10%] top-[40%] h-[20%] w-[12%] bg-red-500/30"></div>

                  {/* West area - low occupancy prediction */}
                  <div className="absolute left-[10%] top-[40%] h-[20%] w-[12%] bg-green-500/30"></div>

                  {/* VIP area - high occupancy prediction */}
                  <div className="absolute bottom-[35%] left-[45%] h-[10%] w-[10%] bg-red-500/30"></div>

                  {/* Time indicators */}
                  <div className="absolute bottom-4 right-4 rounded-md bg-black/70 p-2">
                    <span className="text-xs text-white">Predicted at 17:00</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2">
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute right-4 top-4 rounded-md bg-black/70 p-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                <span className="text-xs text-white">Low Occupancy (&lt;50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                <span className="text-xs text-white">Medium Occupancy (50-80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                <span className="text-xs text-white">High Occupancy (&gt;80%)</span>
              </div>
            </div>
          </div>

          {/* AI Status */}
          <div className="absolute right-4 top-20 rounded-md bg-black/70 p-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-xs text-white">AI Active</span>
            </div>
          </div>

          {/* Parking spot details panel */}
          {selectedArea && (
            <ParkingSpotDetails
              area={parkingAreas.find((area) => area.id === selectedArea)!}
              onClose={() => setSelectedArea(null)}
            />
          )}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-5 border-t">
          {parkingAreas.map((area) => (
            <div
              key={area.id}
              className={`flex cursor-pointer flex-col items-center justify-center p-4 transition-colors hover:bg-muted/50 ${
                selectedArea === area.id ? "bg-muted" : ""
              }`}
              onClick={() => handleAreaClick(area.id)}
            >
              <div className="text-sm font-medium">{area.name}</div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(area.status)}>
                  {area.occupied}/{area.capacity}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {Math.round((area.occupied / area.capacity) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
