"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CrowdHeatmap() {
  const [viewMode, setViewMode] = useState("density")
  const { zoneDensity } = mockCrowdAnalysisData

  // Helper function to determine color class based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Critical":
        return "density-critical"
      case "High":
        return "density-high"
      case "Medium":
        return "density-medium"
      case "Low":
        return "density-low"
      default:
        return "bg-muted"
    }
  }

  // Helper function to determine if a zone should pulse (for critical alerts)
  const shouldPulse = (status: string) => {
    return status === "Critical" ? "critical-alert" : ""
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Crowd Density Heatmap</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Visualizes crowd density across different zones of the venue. Critical areas (red) require immediate
                  attention.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Tabs defaultValue={viewMode} onValueChange={setViewMode}>
          <TabsList>
            <TabsTrigger value="density">Density</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy %</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full rounded-md border bg-muted/20">
          {/* Stadium outline */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] border-2 border-muted-foreground/30"></div>

          {/* Field outline */}
          <div className="absolute left-1/2 top-1/2 h-[150px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] border-2 border-green-600/50 bg-green-600/20"></div>

          {/* Render each zone as a circle with appropriate color */}
          {zoneDensity.map((zone) => (
            <div
              key={zone.id}
              className={`absolute flex items-center justify-center rounded-full ${getStatusClass(zone.status)} ${shouldPulse(zone.status)} text-xs font-bold`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.radius * 2}px`,
                height: `${zone.radius * 2}px`,
                transform: "translate(-50%, -50%)",
                opacity: viewMode === "density" ? 0.8 : 0.7,
              }}
              title={`${zone.name}: ${zone.density} people/m²`}
            >
              {zone.radius > 15 &&
                (viewMode === "density" ? zone.density.toFixed(1) : `${Math.round((zone.density / 5) * 100)}%`)}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full density-low"></div>
            <span className="text-sm">Low (&lt;2.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full density-medium"></div>
            <span className="text-sm">Medium (2.0-3.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full density-high"></div>
            <span className="text-sm">High (3.0-4.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full density-critical critical-alert"></div>
            <span className="text-sm">Critical (&gt;4.0)</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Critical Areas:</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {zoneDensity
              .filter((zone) => zone.status === "Critical")
              .map((zone) => (
                <Badge key={zone.id} variant="destructive" className="critical-alert">
                  {zone.name}: {zone.density} people/m²
                </Badge>
              ))}
            {zoneDensity.filter((zone) => zone.status === "Critical").length === 0 && (
              <span className="text-sm text-muted-foreground">No critical areas detected</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

