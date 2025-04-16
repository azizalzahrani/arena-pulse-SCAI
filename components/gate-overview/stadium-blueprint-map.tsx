"use client"

import { Switch } from "@/components/ui/switch"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ZoomIn, ZoomOut, Maximize, Minimize, Lock, Unlock, Settings, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Gate data with positions on the blueprint
const gates = [
  {
    id: "north-main",
    name: "North Main Gate",
    arabicName: "البوابة الرئيسية الشمالية",
    x: 50,
    y: 15,
    status: "open", // open, closed, partial, maintenance
    type: "main",
    capacity: 2000,
    current: 120,
    securityLevel: "normal", // normal, elevated, high
    lastActivity: "2 min ago",
    cameras: ["NC-1", "NC-2"],
    autoMode: true,
  },
  {
    id: "north-vip",
    name: "North VIP Gate",
    arabicName: "بوابة كبار الشخصيات الشمالية",
    x: 40,
    y: 10,
    status: "partial",
    type: "vip",
    capacity: 500,
    current: 45,
    securityLevel: "elevated",
    lastActivity: "5 min ago",
    cameras: ["NV-1"],
    autoMode: true,
  },
  {
    id: "east-main",
    name: "East Main Gate",
    arabicName: "البوابة الرئيسية الشرقية",
    x: 85,
    y: 50,
    status: "open",
    type: "main",
    capacity: 1800,
    current: 210,
    securityLevel: "normal",
    lastActivity: "1 min ago",
    cameras: ["EC-1", "EC-2"],
    autoMode: true,
  },
  {
    id: "east-service",
    name: "East Service Gate",
    arabicName: "بوابة الخدمة الشرقية",
    x: 80,
    y: 40,
    status: "closed",
    type: "service",
    capacity: 200,
    current: 0,
    securityLevel: "normal",
    lastActivity: "30 min ago",
    cameras: ["ES-1"],
    autoMode: false,
  },
  {
    id: "south-main",
    name: "South Main Gate",
    arabicName: "البوابة الرئيسية الجنوبية",
    x: 50,
    y: 85,
    status: "open",
    type: "main",
    capacity: 2000,
    current: 350,
    securityLevel: "normal",
    lastActivity: "30 sec ago",
    cameras: ["SC-1", "SC-2"],
    autoMode: true,
  },
  {
    id: "south-family",
    name: "South Family Gate",
    arabicName: "بوابة العائلة الجنوبية",
    x: 60,
    y: 80,
    status: "open",
    type: "family",
    capacity: 1200,
    current: 280,
    securityLevel: "normal",
    lastActivity: "1 min ago",
    cameras: ["SF-1"],
    autoMode: true,
  },
  {
    id: "west-main",
    name: "West Main Gate",
    arabicName: "البوابة الرئيسية الغربية",
    x: 15,
    y: 50,
    status: "open",
    type: "main",
    capacity: 1800,
    current: 190,
    securityLevel: "normal",
    lastActivity: "3 min ago",
    cameras: ["WC-1", "WC-2"],
    autoMode: true,
  },
  {
    id: "west-emergency",
    name: "West Emergency Exit",
    arabicName: "مخرج الطوارئ الغربي",
    x: 20,
    y: 60,
    status: "closed",
    type: "emergency",
    capacity: 1000,
    current: 0,
    securityLevel: "elevated",
    lastActivity: "2 hours ago",
    cameras: ["WE-1"],
    autoMode: false,
  },
  {
    id: "northwest-service",
    name: "Northwest Service Gate",
    arabicName: "بوابة الخدمة الشمالية الغربية",
    x: 25,
    y: 25,
    status: "maintenance",
    type: "service",
    capacity: 200,
    current: 0,
    securityLevel: "normal",
    lastActivity: "5 hours ago",
    cameras: ["NWS-1"],
    autoMode: false,
  },
  {
    id: "northeast-emergency",
    name: "Northeast Emergency Exit",
    arabicName: "مخرج الطوارئ الشمالي الشرقي",
    x: 75,
    y: 25,
    status: "closed",
    type: "emergency",
    capacity: 1000,
    current: 0,
    securityLevel: "normal",
    lastActivity: "1 day ago",
    cameras: ["NEE-1"],
    autoMode: false,
  },
]

// Parking areas
const parkingAreas = [
  {
    id: "north-parking",
    name: "North Parking",
    arabicName: "موقف السيارات الشمالي",
    x: 50,
    y: 5,
    capacity: 1200,
    occupied: 850,
    status: "busy", // empty, normal, busy, full
  },
  {
    id: "east-parking",
    name: "East Parking",
    arabicName: "موقف السيارات الشرقي",
    x: 95,
    y: 50,
    capacity: 800,
    occupied: 320,
    status: "normal",
  },
  {
    id: "south-parking",
    name: "South Parking",
    arabicName: "موقف السيارات الجنوبي",
    x: 50,
    y: 95,
    capacity: 1000,
    occupied: 980,
    status: "full",
  },
  {
    id: "west-parking",
    name: "West Parking",
    arabicName: "موقف السيارات الغربي",
    x: 5,
    y: 50,
    capacity: 900,
    occupied: 450,
    status: "normal",
  },
  {
    id: "vip-parking",
    name: "VIP Parking",
    arabicName: "موقف سيارات كبار الشخصيات",
    x: 30,
    y: 5,
    capacity: 200,
    occupied: 120,
    status: "normal",
  },
]

export function StadiumBlueprintMap() {
  const [activeView, setActiveView] = useState("stadium")
  const [selectedGate, setSelectedGate] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [fullscreen, setFullscreen] = useState(false)

  const [gateTypeFilter, setGateTypeFilter] = useState<string | null>(null)
  const [showGateLabels, setShowGateLabels] = useState(true)
  const [showParkingAreas, setShowParkingAreas] = useState(true)
  const [showRoads, setShowRoads] = useState(true)
  const [gateActionDialogOpen, setGateActionDialogOpen] = useState(false)
  const [selectedGateAction, setSelectedGateAction] = useState<string | null>(null)
  const [gateActionReason, setGateActionReason] = useState("")
  const [gateActionDelay, setGateActionDelay] = useState(0)

  const mapRef = useRef<HTMLDivElement>(null)

  const selectedGateData = gates.find((g) => g.id === selectedGate)

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setZoomLevel((prev) => Math.min(prev + 0.2, 2))
    } else {
      setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true)
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetMapPosition = () => {
    setZoomLevel(1)
    setMapPosition({ x: 0, y: 0 })
  }

  const getGateStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "closed":
        return "bg-red-500"
      case "partial":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getGateTypeIcon = (type: string) => {
    switch (type) {
      case "main":
        return "M"
      case "vip":
        return "V"
      case "service":
        return "S"
      case "emergency":
        return "E"
      case "family":
        return "F"
      default:
        return "G"
    }
  }

  const getParkingStatusColor = (status: string) => {
    switch (status) {
      case "empty":
        return "bg-green-500"
      case "normal":
        return "bg-blue-500"
      case "busy":
        return "bg-yellow-500"
      case "full":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleGateStatus = (gateId: string) => {
    // In a real app, this would call an API to toggle the gate
    alert(`Gate ${gateId} status would be toggled here`)
  }

  const handleGateAction = (gateId: string, action: string) => {
    setSelectedGate(gateId)
    setSelectedGateAction(action)
    setGateActionDialogOpen(true)
  }

  const confirmGateAction = () => {
    // In a real app, this would call an API to perform the action
    alert(
      `Action "${selectedGateAction}" on gate ${selectedGate} with reason: "${gateActionReason}" and delay: ${gateActionDelay}s`,
    )
    setGateActionDialogOpen(false)
    setGateActionReason("")
    setGateActionDelay(0)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Open</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>
      case "maintenance":
        return <Badge className="bg-blue-500">Maintenance</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card className={fullscreen ? "fixed inset-0 z-50 rounded-none" : "overflow-hidden"}>
      <CardHeader className="bg-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Stadium Blueprint</CardTitle>
            <p className="text-sm text-muted-foreground">Interactive map of stadium gates and access points</p>
          </div>
          <Tabs defaultValue="stadium" value={activeView} onValueChange={setActiveView}>
            <TabsList>
              <TabsTrigger value="stadium" className="flex items-center gap-2">
                Stadium
              </TabsTrigger>
              <TabsTrigger value="parking" className="flex items-center gap-2">
                Parking
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-background/90 p-2 rounded-md shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleZoom("in")}>
                      <ZoomIn className="h-4 w-4" />
                      <span className="sr-only">Zoom In</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Zoom In</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleZoom("out")}>
                      <ZoomOut className="h-4 w-4" />
                      <span className="sr-only">Zoom Out</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetMapPosition}>
                      <Minimize className="h-4 w-4" />
                      <span className="sr-only">Reset View</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Reset View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setFullscreen(!fullscreen)}
                    >
                      {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      <span className="sr-only">{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  Map Options
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-64">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Display Options</h4>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-gate-labels" className="text-sm cursor-pointer">
                      Gate Labels
                    </Label>
                    <Switch id="show-gate-labels" checked={showGateLabels} onCheckedChange={setShowGateLabels} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-parking" className="text-sm cursor-pointer">
                      Parking Areas
                    </Label>
                    <Switch id="show-parking" checked={showParkingAreas} onCheckedChange={setShowParkingAreas} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-roads" className="text-sm cursor-pointer">
                      Roads & Paths
                    </Label>
                    <Switch id="show-roads" checked={showRoads} onCheckedChange={setShowRoads} />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="gate-filter" className="text-sm">
                      Filter Gates
                    </Label>
                    <Select
                      id="gate-filter"
                      value={gateTypeFilter || ""}
                      onValueChange={(value) => setGateTypeFilter(value === "" ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Gates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Gates</SelectItem>
                        <SelectItem value="main">Main Gates</SelectItem>
                        <SelectItem value="vip">VIP Gates</SelectItem>
                        <SelectItem value="service">Service Gates</SelectItem>
                        <SelectItem value="emergency">Emergency Gates</SelectItem>
                        <SelectItem value="family">Family Gates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Blueprint Map */}
        <div
          className="aspect-[16/9] bg-slate-800 overflow-hidden cursor-move relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={mapRef}
            className="absolute inset-0 w-full h-full transition-transform duration-200"
            style={{
              transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoomLevel})`,
              background: `radial-gradient(circle, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)`,
            }}
          >
            {/* Stadium Outline */}
            <div className="absolute w-[80%] h-[70%] border-4 border-blue-500/30 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Field */}
              <div className="absolute w-[60%] h-[40%] border-2 border-green-500/50 bg-green-900/20 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Gates */}
            {(activeView === "stadium" || activeView === "all") &&
              gates
                .filter((gate) => !gateTypeFilter || gate.type === gateTypeFilter)
                .map((gate) => (
                  <div key={gate.id} className="absolute" style={{ left: `${gate.x}%`, top: `${gate.y}%` }}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={`relative w-8 h-8 rounded-full ${getGateStatusColor(gate.status)} 
                            cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
                            border-2 border-white transition-all duration-200 hover:scale-110 hover:border-opacity-100
                            ${selectedGate === gate.id ? "scale-125 ring-4 ring-white ring-opacity-50" : "border-opacity-70"}`}
                          style={{
                            boxShadow: `0 0 10px 2px rgba(255,255,255,0.3)`,
                          }}
                          onClick={() => setSelectedGate(gate.id)}
                          aria-label={`${gate.name} gate`}
                        >
                          <span className="text-white font-bold text-xs">{getGateTypeIcon(gate.type)}</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-0">
                        <div className="p-3 border-b">
                          <h3 className="font-medium">{gate.name}</h3>
                          <p className="text-xs text-muted-foreground">{gate.arabicName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(gate.status)}
                            <Badge variant="outline">{gate.type.toUpperCase()}</Badge>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant={gate.status === "open" ? "destructive" : "default"}
                              className="w-full text-xs"
                              onClick={() => handleGateAction(gate.id, gate.status === "open" ? "close" : "open")}
                              disabled={gate.status === "maintenance"}
                            >
                              {gate.status === "open" ? (
                                <>
                                  <Lock className="h-3.5 w-3.5 mr-1" />
                                  Close Gate
                                </>
                              ) : (
                                <>
                                  <Unlock className="h-3.5 w-3.5 mr-1" />
                                  Open Gate
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => setDetailsOpen(true)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Details
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => handleGateAction(gate.id, "maintenance")}
                              disabled={gate.status === "maintenance"}
                            >
                              <Settings className="h-3.5 w-3.5 mr-1" />
                              Maintenance
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => handleGateAction(gate.id, "partial")}
                              disabled={gate.status === "maintenance"}
                            >
                              <Users className="h-3.5 w-3.5 mr-1" />
                              Partial
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                    {showGateLabels && (
                      <div className="absolute top-5 left-0 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {gate.name}
                      </div>
                    )}

                    {gate.status === "open" && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}

            {/* Parking Areas */}
            {(activeView === "parking" || activeView === "all") &&
              showParkingAreas &&
              parkingAreas.map((parking) => (
                <div key={parking.id} className="absolute" style={{ left: `${parking.x}%`, top: `${parking.y}%` }}>
                  <div
                    className={`relative w-12 h-6 rounded-md ${getParkingStatusColor(parking.status)} 
                      transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center
                      border-2 border-white border-opacity-70 text-white text-xs font-bold`}
                  >
                    P
                  </div>

                  {showGateLabels && (
                    <div className="absolute top-4 left-0 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {parking.name}
                    </div>
                  )}

                  {showGateLabels && (
                    <div className="absolute top-10 left-0 transform -translate-x-1/2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {parking.occupied}/{parking.capacity}
                    </div>
                  )}
                </div>
              ))}

            {/* Roads and Paths */}
            {showRoads && (
              <>
                <div className="absolute w-[2%] h-[30%] bg-gray-600/50 left-[50%] top-0 transform -translate-x-1/2"></div>
                <div className="absolute w-[2%] h-[30%] bg-gray-600/50 left-[50%] bottom-0 transform -translate-x-1/2"></div>
                <div className="absolute w-[30%] h-[2%] bg-gray-600/50 left-0 top-[50%] transform -translate-y-1/2"></div>
                <div className="absolute w-[30%] h-[2%] bg-gray-600/50 right-0 top-[50%] transform -translate-y-1/2"></div>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-4 bg-black/70 p-2 rounded-md text-xs text-white">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Open</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Closed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Maintenance</span>
          </div>
        </div>

        {/* Gate Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            {selectedGateData && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl">{selectedGateData.name}</DialogTitle>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          selectedGateData.status === "open"
                            ? "bg-green-100 text-green-800"
                            : selectedGateData.status === "closed"
                              ? "bg-red-100 text-red-800"
                              : selectedGateData.status === "partial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                        }
                      `}
                    >
                      {selectedGateData.status.charAt(0).toUpperCase() + selectedGateData.status.slice(1)}
                    </Badge>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Gate Controls */}
                  <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium">Gate Controls</h3>
                      <p className="text-sm text-muted-foreground">Current status: {selectedGateData.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => toggleGateStatus(selectedGateData.id)}
                      >
                        {selectedGateData.status === "open" ? (
                          <>
                            <Lock className="h-4 w-4" />
                            Close Gate
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4" />
                            Open Gate
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Cameras
                      </Button>
                    </div>
                  </div>

                  {/* Gate Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Gate Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">
                            {selectedGateData.type.charAt(0).toUpperCase() + selectedGateData.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="font-medium">{selectedGateData.capacity} people/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Flow:</span>
                          <span className="font-medium">{selectedGateData.current} people/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Security Level:</span>
                          <span className="font-medium">
                            {selectedGateData.securityLevel.charAt(0).toUpperCase() +
                              selectedGateData.securityLevel.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Activity:</span>
                          <span className="font-medium">{selectedGateData.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Automation Settings</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Auto Mode:</span>
                          <Switch checked={selectedGateData.autoMode} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Connected Cameras:</span>
                          <span className="font-medium">{selectedGateData.cameras.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">AI Monitoring:</span>
                          <span className="font-medium">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Auto-Close Time:</span>
                          <span className="font-medium">23:00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Traffic Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Traffic Flow (Last 24 Hours)</h4>
                    <div className="h-[150px] bg-muted/30 rounded-md"></div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Cameras
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">Maintenance Mode</Button>
                      <Button>Update Settings</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Gate Action Dialog */}
        <AlertDialog open={gateActionDialogOpen} onOpenChange={setGateActionDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedGateAction === "open"
                  ? "Open Gate"
                  : selectedGateAction === "close"
                    ? "Close Gate"
                    : selectedGateAction === "maintenance"
                      ? "Set to Maintenance"
                      : "Set to Partial Opening"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedGateAction === "open" && "This will open the gate and allow people to enter."}
                {selectedGateAction === "close" && "This will close the gate and prevent people from entering."}
                {selectedGateAction === "maintenance" &&
                  "This will set the gate to maintenance mode and prevent access."}
                {selectedGateAction === "partial" &&
                  "This will set the gate to partial opening mode with limited access."}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="action-reason">Reason for action</Label>
                <Input
                  id="action-reason"
                  value={gateActionReason}
                  onChange={(e) => setGateActionReason(e.target.value)}
                  placeholder="Enter reason for this action"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="action-delay">Delay (seconds)</Label>
                  <span className="text-sm">{gateActionDelay}s</span>
                </div>
                <Slider
                  id="action-delay"
                  min={0}
                  max={60}
                  step={5}
                  value={[gateActionDelay]}
                  onValueChange={(value) => setGateActionDelay(value[0])}
                />
                <p className="text-xs text-muted-foreground">Set a delay before the action is executed</p>
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmGateAction}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
