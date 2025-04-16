"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Users,
  Info,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Calendar,
  Filter,
  BarChart3,
  Layers,
  RefreshCw,
  Settings,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface HotspotData {
  id: string
  name: string
  arabicName: string
  x: number
  y: number
  density: "low" | "medium" | "high"
  capacity: {
    current: number
    total: number
    percentage: number
  }
  trend: "increasing" | "decreasing" | "stable"
  trendValue: string
  staffCount: number
  securityLevel: "normal" | "elevated" | "high"
  facilities: string[]
  notes: string
  historicalData: Array<{
    time: string
    value: number
  }>
}

// Base hotspot data
const baseHotspots: HotspotData[] = [
  {
    id: "north-stand",
    name: "North Stand",
    arabicName: "المدرج الشمالي",
    x: 50,
    y: 25,
    density: "low",
    capacity: {
      current: 4250,
      total: 8500,
      percentage: 50,
    },
    trend: "decreasing",
    trendValue: "10% in last 30 min",
    staffCount: 24,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms", "First Aid", "Prayer Room"],
    notes: "Family section located here. Extra staff assigned during peak times.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 40 + 30),
    })),
  },
  {
    id: "south-stand",
    name: "South Stand",
    arabicName: "المدرج الجنوبي",
    x: 50,
    y: 75,
    density: "medium",
    capacity: {
      current: 6800,
      total: 8500,
      percentage: 80,
    },
    trend: "stable",
    trendValue: "2% in last 30 min",
    staffCount: 32,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms", "First Aid", "VIP Lounge"],
    notes: "Main entrance for away team supporters. Increased security presence during rivalry matches.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 30 + 60),
    })),
  },
  {
    id: "east-stand",
    name: "East Stand",
    arabicName: "المدرج الشرقي",
    x: 75,
    y: 50,
    density: "medium",
    capacity: {
      current: 5950,
      total: 7000,
      percentage: 85,
    },
    trend: "increasing",
    trendValue: "5% in last 30 min",
    staffCount: 28,
    securityLevel: "elevated",
    facilities: ["Concessions", "Restrooms", "First Aid", "Premium Seating"],
    notes: "Contains premium seating areas. Monitor closely as approaching capacity.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 20 + 70),
    })),
  },
  {
    id: "west-stand",
    name: "West Stand",
    arabicName: "المدرج الغربي",
    x: 25,
    y: 50,
    density: "high",
    capacity: {
      current: 6650,
      total: 7000,
      percentage: 95,
    },
    trend: "increasing",
    trendValue: "8% in last 30 min",
    staffCount: 35,
    securityLevel: "high",
    facilities: ["Concessions", "Restrooms", "First Aid", "Media Center", "VIP Boxes"],
    notes: "Main stand with media facilities and VIP boxes. Currently near capacity, consider redirecting flow.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 15 + 80),
    })),
  },
  {
    id: "northeast-corner",
    name: "Northeast Corner",
    arabicName: "الركن الشمالي الشرقي",
    x: 67,
    y: 33,
    density: "low",
    capacity: {
      current: 1200,
      total: 3000,
      percentage: 40,
    },
    trend: "stable",
    trendValue: "1% in last 30 min",
    staffCount: 12,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms"],
    notes: "Connecting section between North and East stands. Good area for overflow.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 20 + 30),
    })),
  },
  {
    id: "northwest-corner",
    name: "Northwest Corner",
    arabicName: "الركن الشمالي الغربي",
    x: 33,
    y: 33,
    density: "low",
    capacity: {
      current: 1350,
      total: 3000,
      percentage: 45,
    },
    trend: "decreasing",
    trendValue: "3% in last 30 min",
    staffCount: 10,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms"],
    notes: "Connecting section between North and West stands. Good visibility of field.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 25 + 35),
    })),
  },
  {
    id: "southeast-corner",
    name: "Southeast Corner",
    arabicName: "الركن الجنوبي الشرقي",
    x: 67,
    y: 67,
    density: "medium",
    capacity: {
      current: 2100,
      total: 3000,
      percentage: 70,
    },
    trend: "increasing",
    trendValue: "4% in last 30 min",
    staffCount: 15,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms", "Fan Zone"],
    notes: "Contains special fan zone with activities. Popular area during halftime.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 20 + 60),
    })),
  },
  {
    id: "southwest-corner",
    name: "Southwest Corner",
    arabicName: "الركن الجنوبي الغربي",
    x: 33,
    y: 67,
    density: "medium",
    capacity: {
      current: 1950,
      total: 3000,
      percentage: 65,
    },
    trend: "stable",
    trendValue: "1% in last 30 min",
    staffCount: 14,
    securityLevel: "normal",
    facilities: ["Concessions", "Restrooms"],
    notes: "Connecting section between South and West stands. Good area for families.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 15 + 55),
    })),
  },
  {
    id: "vip-entrance",
    name: "VIP Entrance",
    arabicName: "مدخل كبار الشخصيات",
    x: 85,
    y: 40,
    density: "low",
    capacity: {
      current: 120,
      total: 200,
      percentage: 60,
    },
    trend: "increasing",
    trendValue: "15% in last 30 min",
    staffCount: 8,
    securityLevel: "elevated",
    facilities: ["Private Lounge", "Dedicated Restrooms", "Concierge Service"],
    notes: "Exclusive entrance for VIPs and dignitaries. Enhanced security protocols in place.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 30 + 40),
    })),
  },
  {
    id: "main-concourse",
    name: "Main Concourse",
    arabicName: "الردهة الرئيسية",
    x: 50,
    y: 50,
    density: "high",
    capacity: {
      current: 850,
      total: 1000,
      percentage: 85,
    },
    trend: "increasing",
    trendValue: "12% in last 30 min",
    staffCount: 20,
    securityLevel: "elevated",
    facilities: ["Food Court", "Merchandise Stores", "Information Desk"],
    notes: "Central hub for stadium services. High traffic area, especially before match and during halftime.",
    historicalData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      value: Math.floor(Math.random() * 25 + 70),
    })),
  },
]

// Time periods for simulation
const timePeriods = [
  { id: "pre-match", name: "Pre-Match (12:00-14:00)" },
  { id: "first-half", name: "First Half (14:00-14:45)" },
  { id: "halftime", name: "Halftime (14:45-15:00)" },
  { id: "second-half", name: "Second Half (15:00-15:45)" },
  { id: "post-match", name: "Post-Match (15:45-17:00)" },
]

// Visualization modes
const visualizationModes = [
  { id: "heatmap", name: "Heatmap", icon: <Layers className="h-4 w-4" /> },
  { id: "dots", name: "Dots", icon: <Users className="h-4 w-4" /> },
  { id: "contour", name: "Contour", icon: <BarChart3 className="h-4 w-4" /> },
]

export function CrowdDensityHeatmap() {
  const [activeView, setActiveView] = useState("stadium")
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [analyticsOpen, setAnalyticsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeIndex, setTimeIndex] = useState(0)
  const [timePeriod, setTimePeriod] = useState("pre-match")
  const [visualizationMode, setVisualizationMode] = useState("dots")
  const [densityThreshold, setDensityThreshold] = useState([30, 70])
  const [refreshInterval, setRefreshInterval] = useState(5)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showLabels, setShowLabels] = useState(false)
  const [showPredictions, setShowPredictions] = useState(false)
  const [hotspots, setHotspots] = useState<HotspotData[]>(baseHotspots)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const playbackRef = useRef<NodeJS.Timeout | null>(null)
  const refreshRef = useRef<NodeJS.Timeout | null>(null)

  const selectedHotspotData = hotspots.find((h) => h.id === selectedHotspot)

  // Function to update hotspot data dynamically
  const updateHotspotData = () => {
    setHotspots((prevHotspots) => {
      return prevHotspots.map((hotspot) => {
        // Simulate changes in capacity
        let capacityChange = Math.floor(Math.random() * 200) - 100

        // Apply different patterns based on time period
        if (timePeriod === "pre-match") {
          capacityChange = Math.abs(capacityChange) // Always increasing during pre-match
        } else if (timePeriod === "halftime") {
          capacityChange = Math.abs(capacityChange) * 0.5 // Moderate movement during halftime
        } else if (timePeriod === "post-match") {
          capacityChange = -Math.abs(capacityChange) // Always decreasing during post-match
        }

        // Calculate new capacity
        const newCurrent = Math.max(0, Math.min(hotspot.capacity.total, hotspot.capacity.current + capacityChange))
        const newPercentage = Math.round((newCurrent / hotspot.capacity.total) * 100)

        // Determine trend
        const trend = capacityChange > 0 ? "increasing" : capacityChange < 0 ? "decreasing" : "stable"
        const trendValue = `${Math.abs(Math.round((capacityChange / hotspot.capacity.current) * 100))}% in last 30 min`

        // Determine density level
        let density: "low" | "medium" | "high" = "low"
        if (newPercentage >= densityThreshold[1]) {
          density = "high"
        } else if (newPercentage >= densityThreshold[0]) {
          density = "medium"
        }

        // Update security level based on density
        let securityLevel: "normal" | "elevated" | "high" = "normal"
        if (density === "high") {
          securityLevel = "high"
        } else if (density === "medium") {
          securityLevel = "elevated"
        }

        return {
          ...hotspot,
          density,
          capacity: {
            current: newCurrent,
            total: hotspot.capacity.total,
            percentage: newPercentage,
          },
          trend,
          trendValue,
          securityLevel,
        }
      })
    })

    setLastUpdated(new Date())
  }

  // Handle playback controls
  useEffect(() => {
    if (isPlaying) {
      playbackRef.current = setInterval(() => {
        setTimeIndex((prev) => (prev + 1) % 24)
      }, 1000)
    } else if (playbackRef.current) {
      clearInterval(playbackRef.current)
    }

    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current)
      }
    }
  }, [isPlaying])

  // Handle auto refresh
  useEffect(() => {
    if (autoRefresh) {
      updateHotspotData() // Initial update

      refreshRef.current = setInterval(() => {
        updateHotspotData()
      }, refreshInterval * 1000)
    } else if (refreshRef.current) {
      clearInterval(refreshRef.current)
    }

    return () => {
      if (refreshRef.current) {
        clearInterval(refreshRef.current)
      }
    }
  }, [autoRefresh, refreshInterval, timePeriod, densityThreshold])

  // Update data when time period changes
  useEffect(() => {
    updateHotspotData()
  }, [timePeriod])

  const getDensityColor = (density: HotspotData["density"]) => {
    switch (density) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-orange-500"
      case "high":
        return "bg-red-500"
    }
  }

  const getTrendIcon = (trend: HotspotData["trend"]) => {
    switch (trend) {
      case "increasing":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="m6 18 6-6 6 6"></path>
            <path d="M6 6h12"></path>
          </svg>
        )
      case "decreasing":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M6 6 12 12 18 6"></path>
            <path d="M6 18h12"></path>
          </svg>
        )
      case "stable":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M8 12h8"></path>
          </svg>
        )
    }
  }

  const getSecurityLevelBadge = (level: HotspotData["securityLevel"]) => {
    switch (level) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case "elevated":
        return <Badge className="bg-orange-100 text-orange-800">Elevated</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
    }
  }

  const handleExportData = () => {
    // In a real app, this would export data to CSV or PDF
    alert("Data export functionality would be implemented here")
  }

  const handleTimeSkip = (direction: "forward" | "backward") => {
    if (direction === "forward") {
      setTimeIndex((prev) => (prev + 1) % 24)
    } else {
      setTimeIndex((prev) => (prev - 1 + 24) % 24)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Crowd Density Heatmap</CardTitle>
            <p className="text-sm text-muted-foreground">
              Real-time visualization of King Fahd Stadium and surroundings
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tabs defaultValue="stadium" value={activeView} onValueChange={setActiveView}>
              <TabsList>
                <TabsTrigger value="stadium" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Stadium
                </TabsTrigger>
                <TabsTrigger value="parking" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-2"></path>
                    <path d="M5 17H3c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1h2"></path>
                    <rect width="14" height="14" x="5" y="3" rx="2"></rect>
                    <path d="M8 17v4"></path>
                    <path d="M16 17v4"></path>
                    <path d="M9 8h6"></path>
                    <path d="M12 8v4"></path>
                  </svg>
                  Parking
                </TabsTrigger>
                <TabsTrigger value="facilities" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <path d="M3 10h18"></path>
                    <path d="M10 3v18"></path>
                  </svg>
                  Facilities
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M3 12h18"></path>
                    <path d="M3 18h18"></path>
                  </svg>
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)} className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Control Bar */}
          <div className="bg-muted/30 border-b p-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  {timePeriods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Density Thresholds</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                      <Slider
                        value={densityThreshold}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={setDensityThreshold}
                        className="[&>span:first-child]:bg-green-500 [&>span:last-child]:bg-red-500"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>{densityThreshold[0]}%</span>
                        <span>{densityThreshold[1]}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-predictions">Show Predictions</Label>
                      <Switch id="show-predictions" checked={showPredictions} onCheckedChange={setShowPredictions} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-labels">Show Labels</Label>
                      <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <ToggleGroup
                type="single"
                value={visualizationMode}
                onValueChange={(value) => value && setVisualizationMode(value)}
              >
                {visualizationModes.map((mode) => (
                  <ToggleGroupItem key={mode.id} value={mode.id} size="sm" className="h-8 px-2">
                    {mode.icon}
                    <span className="sr-only">{mode.name}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted/50 rounded-md p-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeSkip("backward")}>
                  <SkipBack className="h-3.5 w-3.5" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant={isPlaying ? "default" : "ghost"}
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleTimeSkip("forward")}>
                  <SkipForward className="h-3.5 w-3.5" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>

              <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => updateHotspotData()}>
                <RefreshCw className={`h-3.5 w-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setAnalyticsOpen(true)}>
                <BarChart3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Analytics</span>
              </Button>

              <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleExportData}>
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          <div className="aspect-[16/9] bg-black flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/images/stadium-blueprint.jpeg"
                alt="Stadium Blueprint"
                fill
                className="object-cover"
                priority
              />

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <div key={hotspot.id} className="absolute" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
                  <button
                    className={`relative w-6 h-6 rounded-full ${getDensityColor(hotspot.density)} 
                      cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
                      border-2 border-white transition-all duration-200 hover:scale-110 hover:border-opacity-100
                      ${selectedHotspot === hotspot.id ? "scale-125 ring-4 ring-white ring-opacity-50" : "border-opacity-70"}`}
                    style={{
                      boxShadow: `0 0 10px 2px rgba(255,255,255,0.3)`,
                    }}
                    onClick={() => {
                      setSelectedHotspot(hotspot.id)
                      setDetailsOpen(true)
                    }}
                    aria-label={`${hotspot.name} hotspot`}
                  >
                    <span className="sr-only">{hotspot.name}</span>
                    {selectedHotspot === hotspot.id && <Info className="h-3 w-3 text-white" />}
                  </button>

                  {showLabels && (
                    <div className="absolute top-4 left-0 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {hotspot.name}
                    </div>
                  )}

                  {showPredictions && hotspot.trend === "increasing" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-black/70 p-2 rounded-md text-xs text-white">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Low (&lt;{densityThreshold[0]}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>
                    Medium ({densityThreshold[0]}-{densityThreshold[1]}%)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>High (&gt;{densityThreshold[1]}%)</span>
                </div>
              </div>

              {/* Time indicator */}
              <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {selectedHotspotData && (
            <div className="border-t p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{selectedHotspotData.name}</h3>
                    <span className="text-sm text-muted-foreground">{selectedHotspotData.arabicName}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          selectedHotspotData.density === "low"
                            ? "bg-green-100 text-green-800"
                            : selectedHotspotData.density === "medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }
                      `}
                    >
                      {selectedHotspotData.density.charAt(0).toUpperCase() + selectedHotspotData.density.slice(1)}{" "}
                      Density
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Current Status: {selectedHotspotData.capacity.current.toLocaleString()} /{" "}
                      {selectedHotspotData.capacity.total.toLocaleString()} ({selectedHotspotData.capacity.percentage}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>Occupancy Trend:</span>
                    <span
                      className={`flex items-center ${
                        selectedHotspotData.trend === "increasing"
                          ? "text-red-600"
                          : selectedHotspotData.trend === "decreasing"
                            ? "text-green-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {getTrendIcon(selectedHotspotData.trend)}
                      {selectedHotspotData.trend.charAt(0).toUpperCase() + selectedHotspotData.trend.slice(1)} (
                      {selectedHotspotData.trendValue})
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setDetailsOpen(true)}>
                    <Info className="h-4 w-4" />
                    Details
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Cameras
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            {selectedHotspotData && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl">{selectedHotspotData.name}</DialogTitle>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          selectedHotspotData.density === "low"
                            ? "bg-green-100 text-green-800"
                            : selectedHotspotData.density === "medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }
                      `}
                    >
                      {selectedHotspotData.density.charAt(0).toUpperCase() + selectedHotspotData.density.slice(1)}{" "}
                      Density
                    </Badge>
                  </div>
                  <DialogDescription className="text-base font-medium">
                    {selectedHotspotData.arabicName}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Capacity Section */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Capacity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {selectedHotspotData.capacity.current.toLocaleString()} /{" "}
                          {selectedHotspotData.capacity.total.toLocaleString()} people
                        </span>
                        <span className="text-sm font-medium">{selectedHotspotData.capacity.percentage}%</span>
                      </div>
                      <Progress value={selectedHotspotData.capacity.percentage} className="h-2" />
                      <div className="flex items-center gap-2 text-sm">
                        <span>Trend:</span>
                        <span
                          className={`flex items-center ${
                            selectedHotspotData.trend === "increasing"
                              ? "text-red-600"
                              : selectedHotspotData.trend === "decreasing"
                                ? "text-green-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {getTrendIcon(selectedHotspotData.trend)}
                          {selectedHotspotData.trend.charAt(0).toUpperCase() + selectedHotspotData.trend.slice(1)} (
                          {selectedHotspotData.trendValue})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Historical Data Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Historical Occupancy</h4>
                    <ChartContainer
                      config={{
                        occupancy: {
                          label: "Occupancy %",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[150px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={selectedHotspotData.historicalData.map((item) => ({
                            time: item.time,
                            occupancy: item.value,
                          }))}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={3} />
                          <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} tickCount={6} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="occupancy"
                            stroke="var(--color-occupancy)"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 4 }}
                            name="Occupancy %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Staff & Security Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Staff Information</h4>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span>Staff Count:</span>
                          <span className="font-medium">{selectedHotspotData.staffCount} personnel</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span>Staff Ratio:</span>
                          <span className="font-medium">
                            1:{Math.round(selectedHotspotData.capacity.current / selectedHotspotData.staffCount)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Security Level</h4>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span>Current Level:</span>
                          <div>{getSecurityLevelBadge(selectedHotspotData.securityLevel)}</div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span>Last Updated:</span>
                          <span className="font-medium">{lastUpdated.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Facilities Section */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Available Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotspotData.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Notes</h4>
                    <div className="bg-muted/50 p-3 rounded-md text-sm">{selectedHotspotData.notes}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Cameras
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">Send Alert</Button>
                      <Button>Dispatch Staff</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Analytics Dialog */}
        <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Crowd Density Analytics</DialogTitle>
              <DialogDescription>Detailed analytics and trends for stadium crowd density</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium">Total Attendance</h3>
                  <p className="text-3xl font-bold mt-2">
                    {hotspots.reduce((sum, h) => sum + h.capacity.current, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(
                      (hotspots.reduce((sum, h) => sum + h.capacity.current, 0) /
                        hotspots.reduce((sum, h) => sum + h.capacity.total, 0)) *
                        100,
                    )}
                    % of capacity
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium">High Density Areas</h3>
                  <p className="text-3xl font-bold mt-2">{hotspots.filter((h) => h.density === "high").length}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round((hotspots.filter((h) => h.density === "high").length / hotspots.length) * 100)}% of all
                    areas
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-lg font-medium">Increasing Trends</h3>
                  <p className="text-3xl font-bold mt-2">{hotspots.filter((h) => h.trend === "increasing").length}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round((hotspots.filter((h) => h.trend === "increasing").length / hotspots.length) * 100)}% of
                    all areas
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Density Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0")
                        return {
                          time: `${hour}:00`,
                          north: hotspots.find((h) => h.id === "north-stand")?.historicalData[i]?.value || 0,
                          south: hotspots.find((h) => h.id === "south-stand")?.historicalData[i]?.value || 0,
                          east: hotspots.find((h) => h.id === "east-stand")?.historicalData[i]?.value || 0,
                          west: hotspots.find((h) => h.id === "west-stand")?.historicalData[i]?.value || 0,
                        }
                      })}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="north" stroke="#8884d8" name="North Stand" />
                      <Line type="monotone" dataKey="south" stroke="#82ca9d" name="South Stand" />
                      <Line type="monotone" dataKey="east" stroke="#ffc658" name="East Stand" />
                      <Line type="monotone" dataKey="west" stroke="#ff8042" name="West Stand" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Density by Section</h3>
                  <div className="space-y-3">
                    {hotspots.map((hotspot) => (
                      <div key={hotspot.id} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getDensityColor(hotspot.density)}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{hotspot.name}</span>
                            <span className="text-sm">{hotspot.capacity.percentage}%</span>
                          </div>
                          <Progress value={hotspot.capacity.percentage} className="h-1.5 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {hotspots
                      .filter((h) => h.density === "high" || (h.density === "medium" && h.trend === "increasing"))
                      .map((hotspot) => (
                        <div key={hotspot.id} className="bg-muted/50 p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getDensityColor(hotspot.density)}`} />
                            <h4 className="font-medium">{hotspot.name}</h4>
                          </div>
                          <p className="text-sm mt-1">
                            {hotspot.density === "high"
                              ? "Consider redirecting crowd flow and increasing staff presence."
                              : "Monitor closely as approaching high density levels."}
                          </p>
                        </div>
                      ))}

                    {hotspots.filter((h) => h.density === "low" && h.trend === "stable").length > 0 && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <h4 className="font-medium">Low Density Areas</h4>
                        </div>
                        <p className="text-sm mt-1">
                          Consider redirecting crowds to{" "}
                          {hotspots
                            .filter((h) => h.density === "low" && h.trend === "stable")
                            .map((h) => h.name)
                            .join(", ")}{" "}
                          to balance density.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Heatmap Settings</DialogTitle>
              <DialogDescription>Configure visualization and refresh settings</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Visualization</h4>
                <div className="grid grid-cols-3 gap-2">
                  {visualizationModes.map((mode) => (
                    <Button
                      key={mode.id}
                      variant={visualizationMode === mode.id ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setVisualizationMode(mode.id)}
                    >
                      <div className="h-8 w-8 flex items-center justify-center mb-1">{mode.icon}</div>
                      <span className="text-xs">{mode.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Density Thresholds</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <Slider
                    value={densityThreshold}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={setDensityThreshold}
                    className="[&>span:first-child]:bg-green-500 [&>span:last-child]:bg-red-500"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{densityThreshold[0]}%</span>
                    <span>{densityThreshold[1]}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Auto Refresh</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-refresh">Enable Auto Refresh</Label>
                  <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                  <Select
                    value={refreshInterval.toString()}
                    onValueChange={(v) => setRefreshInterval(Number(v))}
                    disabled={!autoRefresh}
                  >
                    <SelectTrigger id="refresh-interval">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Display Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-labels">Show Section Labels</Label>
                    <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-predictions">Show Predictions</Label>
                    <Switch id="show-predictions" checked={showPredictions} onCheckedChange={setShowPredictions} />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
