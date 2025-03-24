"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CrowdFlowPatterns() {
  const [flowFilter, setFlowFilter] = useState("all")
  const { flowPatterns, zoneDensity } = mockCrowdAnalysisData

  // Filter flow patterns based on selected filter
  const filteredFlows = flowFilter === "all" ? flowPatterns : flowPatterns.filter((flow) => flow.status === flowFilter)

  // Helper function to get zone coordinates by id
  const getZoneCoords = (id: string) => {
    const zone = zoneDensity.find((z) => z.id === id)
    return zone ? { x: zone.x, y: zone.y } : { x: 50, y: 50 }
  }

  // Helper function to determine color class based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Critical":
        return "stroke-[hsl(var(--density-critical))]"
      case "High":
        return "stroke-[hsl(var(--density-high))]"
      case "Medium":
        return "stroke-[hsl(var(--density-medium))]"
      case "Low":
        return "stroke-[hsl(var(--density-low))]"
      default:
        return "stroke-muted-foreground"
    }
  }

  // Helper function to determine line width based on volume
  const getLineWidth = (volume: number) => {
    if (volume > 1200) return 4
    if (volume > 800) return 3
    if (volume > 400) return 2
    return 1
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Crowd Flow Patterns</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Visualizes movement patterns between different zones. Thicker lines indicate higher volume of
                  movement.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select defaultValue={flowFilter} onValueChange={setFlowFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter flows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Flows</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full rounded-md border bg-muted/20">
          {/* Stadium outline */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] border-2 border-muted-foreground/30"></div>

          {/* Field outline */}
          <div className="absolute left-1/2 top-1/2 h-[150px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] border-2 border-green-600/50 bg-green-600/20"></div>

          {/* SVG for flow lines */}
          <svg className="absolute h-full w-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>
            {filteredFlows.map((flow, index) => {
              const fromCoords = getZoneCoords(flow.from)
              const toCoords = getZoneCoords(flow.to)

              return (
                <line
                  key={index}
                  x1={`${fromCoords.x}%`}
                  y1={`${fromCoords.y}%`}
                  x2={`${toCoords.x}%`}
                  y2={`${toCoords.y}%`}
                  className={`${getStatusClass(flow.status)}`}
                  strokeWidth={getLineWidth(flow.volume)}
                  strokeDasharray={flow.status === "Critical" ? "5,3" : "none"}
                  markerEnd="url(#arrowhead)"
                />
              )
            })}
          </svg>

          {/* Render each zone as a small circle */}
          {zoneDensity.map((zone) => (
            <div
              key={zone.id}
              className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-xs font-bold shadow-md"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
              }}
              title={zone.name}
            ></div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 rounded-full" style={{ backgroundColor: "hsl(var(--density-low))" }}></div>
            <span className="text-sm">Low Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-6 rounded-full" style={{ backgroundColor: "hsl(var(--density-medium))" }}></div>
            <span className="text-sm">Medium Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 rounded-full" style={{ backgroundColor: "hsl(var(--density-high))" }}></div>
            <span className="text-sm">High Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-6 rounded-full" style={{ backgroundColor: "hsl(var(--density-critical))" }}></div>
            <span className="text-sm">Critical Volume</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Highest Volume Flows:</h3>
          <div className="mt-2 space-y-1">
            {flowPatterns
              .sort((a, b) => b.volume - a.volume)
              .slice(0, 3)
              .map((flow, index) => {
                const fromZone = zoneDensity.find((z) => z.id === flow.from)
                const toZone = zoneDensity.find((z) => z.id === flow.to)

                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>
                      {fromZone?.name} → {toZone?.name}
                    </span>
                    <span
                      className={flow.status === "Critical" ? "font-bold" : ""}
                      style={{ color: flow.status === "Critical" ? "hsl(var(--density-critical))" : "inherit" }}
                    >
                      {flow.volume} people/min
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

