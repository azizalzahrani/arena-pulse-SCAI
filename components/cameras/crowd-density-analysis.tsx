"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Users, Thermometer, AlertTriangle, Eye } from "lucide-react"

interface CrowdDensityAnalysisProps {
  camera: {
    id: string
    name: string
    occupancy: number
  }
}

export function CrowdDensityAnalysis({ camera }: CrowdDensityAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heatmapOpacity, setHeatmapOpacity] = useState(70)
  const [densityThreshold, setDensityThreshold] = useState(75)

  // Generate and render heatmap
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Generate density points
    const numPoints = 15
    const points = []

    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = 30 + Math.random() * 50
      const intensity = 0.3 + Math.random() * 0.7

      points.push({ x, y, radius, intensity })
    }

    // Draw heatmap
    for (let x = 0; x < canvas.width; x += 5) {
      for (let y = 0; y < canvas.height; y += 5) {
        let totalHeat = 0

        for (const point of points) {
          const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
          if (distance < point.radius) {
            const heat = (1 - distance / point.radius) * point.intensity
            totalHeat += heat
          }
        }

        totalHeat = Math.min(1, totalHeat)

        if (totalHeat > 0) {
          let color
          const opacity = (totalHeat * heatmapOpacity) / 100

          if (totalHeat > densityThreshold / 100) {
            // Red for high density
            color = `rgba(255, 0, 0, ${opacity})`
          } else if (totalHeat > 0.5) {
            // Yellow for medium density
            color = `rgba(255, 255, 0, ${opacity})`
          } else {
            // Green for low density
            color = `rgba(0, 255, 0, ${opacity})`
          }

          ctx.fillStyle = color
          ctx.fillRect(x, y, 5, 5)
        }
      }
    }

    // Add area labels
    ctx.font = "14px monospace"
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText(camera.name.toUpperCase(), canvas.width / 2 - 40, canvas.height / 2)
  }, [camera.name, heatmapOpacity, densityThreshold])

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Crowd Density Heatmap</h3>
            <Badge className={camera.occupancy > 80 ? "bg-red-500" : "bg-yellow-500"}>
              {camera.occupancy}% Occupancy
            </Badge>
          </div>

          <div className="relative bg-gray-900 rounded-md overflow-hidden" style={{ height: "300px" }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Eye className="h-3.5 w-3.5 text-blue-400 mr-1" />
                  <span className="text-gray-300">Heatmap Opacity</span>
                </div>
                <span className="text-gray-300">{heatmapOpacity}%</span>
              </div>
              <Slider
                value={[heatmapOpacity]}
                min={10}
                max={100}
                step={5}
                onValueChange={(value) => setHeatmapOpacity(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Thermometer className="h-3.5 w-3.5 text-red-400 mr-1" />
                  <span className="text-gray-300">Density Threshold</span>
                </div>
                <span className="text-gray-300">{densityThreshold}%</span>
              </div>
              <Slider
                value={[densityThreshold]}
                min={50}
                max={90}
                step={5}
                onValueChange={(value) => setDensityThreshold(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white mb-4">Density Analysis</h3>

          <Tabs defaultValue="hotspots">
            <TabsList className="bg-gray-700 border-gray-600">
              <TabsTrigger value="hotspots" className="data-[state=active]:bg-gray-600">
                Hotspots
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-gray-600">
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hotspots" className="mt-4">
              <div className="space-y-3">
                <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-red-400 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Critical Density
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Northeast corner showing 85% density. Potential bottleneck forming.
                  </p>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-yellow-400 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Moderate Density
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Central area showing 73% density. Monitor for potential increase.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mt-4">
              <div className="space-y-3">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-blue-400 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Flow Analysis
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Crowd is moving 30% slower than optimal in northeast section. Consider opening alternative route.
                  </p>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-md p-3">
                  <h4 className="text-sm font-medium text-purple-400 flex items-center">
                    <Thermometer className="h-4 w-4 mr-1" />
                    Density Prediction
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Based on current trends, central area will reach critical density (85%+) in approximately 12
                    minutes.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
