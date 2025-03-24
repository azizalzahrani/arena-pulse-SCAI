"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoIcon, Maximize2, RefreshCw, Camera } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAnalysisContext } from "@/contexts/analysis-context"

// Simulated camera feeds
const CAMERA_FEEDS = [
  { id: "main-entrance", name: "Main Entrance", status: "active" },
  { id: "north-gate", name: "North Gate", status: "active" },
  { id: "food-court", name: "Food Court", status: "active" },
  { id: "west-stands", name: "West Stands", status: "warning" },
]

// Person class for more realistic movement
class Person {
  id: number
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
  history: Array<{ x: number; y: number }>
  color: string

  constructor(id: number, x: number, y: number, width: number, height: number) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.history = []

    // Generate a random color for flow trails
    const r = Math.floor(Math.random() * 100) + 155 // Brighter colors
    const g = Math.floor(Math.random() * 100) + 155
    const b = Math.floor(Math.random() * 100) + 155
    this.color = `rgba(${r}, ${g}, ${b}, 0.7)`
  }

  update(canvasWidth: number, canvasHeight: number) {
    // Add current position to history
    this.history.push({ x: this.x + this.width / 2, y: this.y + this.height / 2 })

    // Limit history length
    if (this.history.length > 10) {
      this.history.shift()
    }

    // Update position
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x + this.width > canvasWidth) {
      this.vx *= -1
    }

    if (this.y < 0 || this.y + this.height > canvasHeight) {
      this.vy *= -1
    }

    // Random direction changes
    if (Math.random() < 0.05) {
      this.vx += (Math.random() - 0.5) * 0.5
      this.vy += (Math.random() - 0.5) * 0.5

      // Limit speed
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
      if (speed > 3) {
        this.vx = (this.vx / speed) * 3
        this.vy = (this.vy / speed) * 3
      }
    }
  }
}

// Generate initial people for each camera
const generatePeople = (cameraId: string, count: number): Person[] => {
  const people: Person[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 740
    const y = Math.random() * 390
    people.push(new Person(i, x, y, 30, 60))
  }
  return people
}

// Initial people data for each camera
const INITIAL_PEOPLE = {
  "main-entrance": generatePeople("main-entrance", 15),
  "north-gate": generatePeople("north-gate", 8),
  "food-court": generatePeople("food-court", 25),
  "west-stands": generatePeople("west-stands", 20),
}

// Background images for each camera
const CAMERA_BACKGROUNDS = {
  "main-entrance": "/placeholder.svg?height=600&width=1000&text=Arena+Main+Entrance",
  "north-gate": "/placeholder.svg?height=600&width=1000&text=North+Gate",
  "food-court": "/placeholder.svg?height=600&width=1000&text=Food+Court",
  "west-stands": "/placeholder.svg?height=600&width=1000&text=West+Stands",
}

export function LiveVideoFeed() {
  const { updateAnalysisData } = useAnalysisContext()
  const [activeCamera, setActiveCamera] = useState(CAMERA_FEEDS[0].id)
  const [isProcessing, setIsProcessing] = useState(true)
  const [heatmapVisible, setHeatmapVisible] = useState(true)
  const [boxesVisible, setBoxesVisible] = useState(true)
  const [flowVisible, setFlowVisible] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [people, setPeople] = useState<Record<string, Person[]>>({ ...INITIAL_PEOPLE })
  const [frameCount, setFrameCount] = useState(0)
  const animationRef = useRef<number | null>(null)

  // Use a ref to track the last update time to prevent too frequent updates
  const lastUpdateTimeRef = useRef(Date.now())

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isProcessing) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const animate = () => {
      setPeople((prevPeople) => {
        const newPeople = { ...prevPeople }
        newPeople[activeCamera] = newPeople[activeCamera].map((person) => {
          person.update(800, 450)
          return person
        })
        return newPeople
      })

      setFrameCount((prev) => prev + 1)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isProcessing, activeCamera])

  // Update analysis data based on current people count - but limit frequency
  useEffect(() => {
    // Only update every 2 seconds to prevent too many updates
    const now = Date.now()
    if (now - lastUpdateTimeRef.current < 2000) return

    if (isProcessing) {
      const activePeople = people[activeCamera] || []
      const crowdData = {
        count: activePeople.length,
        density: Number.parseFloat((activePeople.length / 100).toFixed(1)),
        flow: Math.floor(10 + Math.random() * 20),
        hotspots: heatmapVisible ? Math.min(3, Math.floor(activePeople.length / 4)) : 0,
      }

      // Update the analysis context with new data
      updateAnalysisData({
        crowdDensity: crowdData.density,
        peopleCount: crowdData.count,
        flowRate: crowdData.flow,
        hotspots: crowdData.hotspots,
        location: CAMERA_FEEDS.find((cam) => cam.id === activeCamera)?.name || "Unknown",
        timestamp: new Date().toISOString(),
      })

      lastUpdateTimeRef.current = now
    }
  }, [people, activeCamera, isProcessing, heatmapVisible, updateAnalysisData])

  // Draw the canvas with people and effects
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const activePeople = people[activeCamera]

    // Draw optical flow trails if enabled
    if (flowVisible && isProcessing) {
      activePeople.forEach((person) => {
        if (person.history.length > 1) {
          ctx.beginPath()
          ctx.moveTo(person.history[0].x, person.history[0].y)

          for (let i = 1; i < person.history.length; i++) {
            ctx.lineTo(person.history[i].x, person.history[i].y)
          }

          ctx.strokeStyle = person.color
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })
    }

    // Draw people with bounding boxes if enabled
    if (boxesVisible && isProcessing) {
      activePeople.forEach((person) => {
        // Draw bounding box
        ctx.strokeStyle = "rgba(0, 255, 0, 0.8)"
        ctx.lineWidth = 2
        ctx.strokeRect(person.x, person.y, person.width, person.height)

        // Add confidence score
        ctx.fillStyle = "rgba(0, 255, 0, 0.8)"
        ctx.font = "10px Arial"
        const confidence = (80 + Math.random() * 19).toFixed(1)
        ctx.fillText(`${confidence}%`, person.x, person.y - 5)
      })
    }

    // Draw heatmap if enabled
    if (heatmapVisible && isProcessing) {
      activePeople.forEach((person) => {
        // Create a radial gradient for each person
        const gradient = ctx.createRadialGradient(
          person.x + person.width / 2,
          person.y + person.height / 2,
          5,
          person.x + person.width / 2,
          person.y + person.height / 2,
          40,
        )
        gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)")
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(person.x + person.width / 2, person.y + person.height / 2, 40, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Add CCTV overlay elements
    // Camera ID and timestamp
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "12px monospace"
    ctx.fillText(
      `CAM: ${activeCamera.toUpperCase()} | ${currentTime.toLocaleTimeString()} | FPS: ${Math.min(30, frameCount % 31)}`,
      10,
      20,
    )

    // Recording indicator
    ctx.fillStyle = "rgba(255, 0, 0, 0.8)"
    ctx.beginPath()
    ctx.arc(canvas.width - 20, 20, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillText("REC", canvas.width - 40, 24)

    // Add AI processing indicator
    if (isProcessing) {
      ctx.fillStyle = "rgba(0, 255, 0, 0.8)"
      ctx.fillText("AI ACTIVE", canvas.width - 80, canvas.height - 10)
    }

    // Add grid overlay for depth perception
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical lines
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
  }, [people, boxesVisible, heatmapVisible, flowVisible, isProcessing, activeCamera, currentTime, frameCount])

  // Calculate crowd metrics based on current people
  const activePeople = people[activeCamera] || []
  const crowdData = {
    count: activePeople.length,
    density: (activePeople.length / 100).toFixed(1),
    flow: Math.floor(10 + Math.random() * 20),
    hotspots: heatmapVisible ? Math.min(3, Math.floor(activePeople.length / 4)) : 0,
  }

  return (
    <Card className="w-full col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
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
            onClick={() => setBoxesVisible(!boxesVisible)}
            className={boxesVisible ? "bg-primary/10" : ""}
          >
            Boxes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFlowVisible(!flowVisible)}
            className={flowVisible ? "bg-primary/10" : ""}
          >
            Flow
          </Button>
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
              <div className="relative overflow-hidden rounded-md bg-black" style={{ height: "450px" }}>
                {/* Simulated video feed background */}
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${CAMERA_BACKGROUNDS[camera.id as keyof typeof CAMERA_BACKGROUNDS]})`,
                    filter: "brightness(0.7) contrast(1.2)",
                  }}
                ></div>

                {/* Canvas for drawing people and effects */}
                <canvas ref={canvasRef} width={800} height={450} className="absolute inset-0 h-full w-full" />

                {/* CCTV overlay effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Scanlines effect */}
                  <div className="absolute inset-0 bg-scanlines opacity-10"></div>

                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-30"></div>

                  {/* Noise effect */}
                  <div className="absolute inset-0 bg-noise opacity-5"></div>
                </div>

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

      <style jsx global>{`
        .bg-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        
        .bg-radial-gradient {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
        
        .bg-noise {
          background-image: url("data:image/png;base64,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");
        }
      `}</style>
    </Card>
  )
}

