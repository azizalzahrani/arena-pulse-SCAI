"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Maximize, Minimize, Volume2, VolumeX, AlertTriangle, Camera, Sparkles, BarChart3 } from "lucide-react"
import { EnhancedCameraFeed } from "./enhanced-camera-feed"
import { CameraAnalytics } from "./camera-analytics"
import { CrowdDensityAnalysis } from "./crowd-density-analysis"
import { BehaviorAnalysis } from "./behavior-analysis"

// Camera data
const cameras = [
  {
    id: "vip-section",
    name: "VIP Section",
    arabicName: "قسم كبار الشخصيات",
    location: "West Stand, Level 2",
    status: "active",
    detectionCount: 14,
    sentimentScore: 0.85,
    anomalyCount: 0,
    occupancy: 67,
    image: "/camera-feeds/vip-section.jpg",
  },
  {
    id: "gate-a",
    name: "Gate A",
    arabicName: "البوابة أ",
    location: "North Entrance",
    status: "active",
    detectionCount: 12,
    sentimentScore: 0.72,
    anomalyCount: 0,
    occupancy: 75,
    image: "/camera-feeds/gate-a.jpg",
  },
  {
    id: "concourse",
    name: "Concourse",
    arabicName: "الردهة",
    location: "Main Level",
    status: "active",
    detectionCount: 23,
    sentimentScore: 0.68,
    anomalyCount: 1,
    occupancy: 82,
    image: "/camera-feeds/concourse.jpg",
  },
  {
    id: "family-section",
    name: "Family Section",
    arabicName: "قسم العائلات",
    location: "East Stand",
    status: "active",
    detectionCount: 31,
    sentimentScore: 0.91,
    anomalyCount: 0,
    occupancy: 65,
    image: "/camera-feeds/family-section.jpg",
  },
  {
    id: "prayer-area",
    name: "Prayer Area",
    arabicName: "منطقة الصلاة",
    location: "South Concourse",
    status: "active",
    detectionCount: 8,
    sentimentScore: 0.95,
    anomalyCount: 0,
    occupancy: 45,
    image: "/camera-feeds/prayer-area.jpg",
  },
  {
    id: "food-court",
    name: "Food Court",
    arabicName: "ساحة الطعام",
    location: "North Concourse",
    status: "active",
    detectionCount: 27,
    sentimentScore: 0.76,
    anomalyCount: 0,
    occupancy: 78,
    image: "/camera-feeds/food-court.jpg",
  },
]

export function EnhancedCameraGrid() {
  const [fullscreenCamera, setFullscreenCamera] = useState<string | null>(null)
  const [muteStatus, setMuteStatus] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("camera")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const toggleMute = (cameraId: string) => {
    setMuteStatus((prev) => ({
      ...prev,
      [cameraId]: !prev[cameraId],
    }))
  }

  const selectedCamera = cameras.find((camera) => camera.id === fullscreenCamera)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Camera Feeds</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8"
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8"
          >
            List View
          </Button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        {cameras.slice(0, 3).map((camera) => (
          <Card key={camera.id} className="overflow-hidden bg-gray-900 border-gray-800">
            <div className="relative">
              <EnhancedCameraFeed camera={camera} />
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <Badge className="bg-green-500/80 text-white">Live</Badge>
                <Badge className="bg-black/50 text-white">
                  <Camera className="h-3 w-3 mr-1" />
                  {camera.detectionCount}
                </Badge>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => toggleMute(camera.id)}
                >
                  {muteStatus[camera.id] ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setFullscreenCamera(camera.id)}
                >
                  <Maximize className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-white">{camera.name}</h3>
                  <p className="text-xs text-white/70">{camera.arabicName}</p>
                </div>
                <div className="flex items-center gap-1">
                  {camera.occupancy > 80 && (
                    <Badge className="bg-red-500/80 text-white">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      High Occupancy
                    </Badge>
                  )}
                  {camera.anomalyCount > 0 && (
                    <Badge className="bg-yellow-500/80 text-white">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Anomaly
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Fullscreen Camera Dialog */}
      <Dialog open={!!fullscreenCamera} onOpenChange={(open) => !open && setFullscreenCamera(null)}>
        <DialogContent className="max-w-5xl bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{selectedCamera?.name}</span>
                <Badge className="bg-green-500/80 text-white">Live</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/30 text-white hover:bg-black/50"
                  onClick={() => toggleMute(selectedCamera?.id || "")}
                >
                  {muteStatus[selectedCamera?.id || ""] ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/30 text-white hover:bg-black/50"
                  onClick={() => setFullscreenCamera(null)}
                >
                  <Minimize className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="camera" className="data-[state=active]:bg-gray-700">
                <Camera className="h-4 w-4 mr-2" />
                Camera Feed
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="density" className="data-[state=active]:bg-gray-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Crowd Density
              </TabsTrigger>
              <TabsTrigger value="behavior" className="data-[state=active]:bg-gray-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Behavior Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-4">
              {selectedCamera && <EnhancedCameraFeed camera={selectedCamera} fullscreen />}
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              {selectedCamera && <CameraAnalytics camera={selectedCamera} />}
            </TabsContent>

            <TabsContent value="density" className="mt-4">
              {selectedCamera && <CrowdDensityAnalysis camera={selectedCamera} />}
            </TabsContent>

            <TabsContent value="behavior" className="mt-4">
              {selectedCamera && <BehaviorAnalysis camera={selectedCamera} />}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
