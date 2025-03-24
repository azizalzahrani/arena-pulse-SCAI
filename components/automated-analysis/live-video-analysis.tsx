"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoIcon, Maximize2, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simulated camera feeds
const CAMERA_FEEDS = [
  { id: "main-entrance", name: "Main Entrance", status: "active" },
  { id: "north-gate", name: "North Gate", status: "active" },
  { id: "food-court", name: "Food Court", status: "active" },
  { id: "west-stands", name: "West Stands", status: "warning" },
]

export default function LiveVideoAnalysis() {
  const [activeCamera, setActiveCamera] = useState(CAMERA_FEEDS[0].id)
  const [isProcessing, setIsProcessing] = useState(true)
  const [heatmapVisible, setHeatmapVisible] = useState(true)

  // Simulated crowd data
  const crowdData = {
    count: 342,
    density: 2.8,
    flow: 24,
    hotspots: 2,
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Live Video Analysis</CardTitle>
          <Badge variant={isProcessing ? "default" : "outline"} className="ml-2">
            {isProcessing ? "Processing" : "Paused"}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  AI-powered real-time video analysis of crowd density, flow, and behavior patterns.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHeatmapVisible(!heatmapVisible)}
            className={heatmapVisible ? "bg-primary/10" : ""}
          >
            Heatmap
          </Button>
          <Button
            variant={isProcessing ? "outline" : "default"}
            size="sm"
            onClick={() => setIsProcessing(!isProcessing)}
          >
            {isProcessing ? "Pause" : "Resume"}
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeCamera} onValueChange={setActiveCamera}>
          <TabsList className="mb-2">
            {CAMERA_FEEDS.map((camera) => (
              <TabsTrigger key={camera.id} value={camera.id} className="relative">
                {camera.name}
                {camera.status === "warning" && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {CAMERA_FEEDS.map((camera) => (
            <TabsContent key={camera.id} value={camera.id} className="mt-0">
              <div className="relative aspect-video overflow-hidden rounded-md bg-black">
                {/* Simulated video feed */}
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/placeholder.svg?height=400&width=800)`,
                    filter: "brightness(0.8)",
                  }}
                ></div>

                {/* AI analysis overlay - simplified */}
                {heatmapVisible && (
                  <div className="absolute inset-0 h-full w-full">
                    {/* Simulated heatmap */}
                    <div
                      className="absolute rounded-full bg-red-500/50 blur-xl"
                      style={{ width: "120px", height: "120px", left: "30%", top: "40%" }}
                    ></div>
                    <div
                      className="absolute rounded-full bg-red-500/40 blur-xl"
                      style={{ width: "150px", height: "150px", left: "60%", top: "60%" }}
                    ></div>
                  </div>
                )}

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    AI Processing
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">People Count</div>
                  <div className="text-xl font-bold">{crowdData.count}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Density</div>
                  <div className="text-xl font-bold">{crowdData.density} p/m²</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Flow Rate</div>
                  <div className="text-xl font-bold">{crowdData.flow} p/min</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Hotspots</div>
                  <div className="text-xl font-bold">{crowdData.hotspots}</div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

