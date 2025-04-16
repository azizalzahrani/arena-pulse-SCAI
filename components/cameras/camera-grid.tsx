"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Maximize, Minimize, Volume2, VolumeX, AlertTriangle, Camera, Sparkles, Search } from "lucide-react"
import { CameraFeed } from "./camera-feed"
import { SentimentAnalysis } from "./sentiment-analysis"
import { AnomalyDetection } from "./anomaly-detection"
import { LostPersonTracking } from "./lost-person-tracking"
import { createActionClient } from "@/lib/supabase"
import { AIBadge } from "@/components/ui/ai-badge"

// Define the Camera type
type CameraType = {
  id: string
  name: string
  arabic_name?: string
  location: string
  status: string
  detection_count: number
  sentiment_score: number
  anomaly_count: number
  image_url?: string
}

export function CameraGrid() {
  const [fullscreenCamera, setFullscreenCamera] = useState<string | null>(null)
  const [muteStatus, setMuteStatus] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("camera")
  const [cameras, setCameras] = useState<CameraType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true)
        const supabase = createActionClient()
        const { data, error } = await supabase.from("arena_pulse.cameras").select("*")

        if (error) throw error
        setCameras(data || [])
      } catch (err) {
        console.error("Error fetching cameras:", err)
        setError("Failed to load cameras. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCameras()
  }, [])

  const toggleMute = (cameraId: string) => {
    setMuteStatus((prev) => ({
      ...prev,
      [cameraId]: !prev[cameraId],
    }))
  }

  const selectedCamera = cameras.find((camera) => camera.id === fullscreenCamera)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading cameras...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // If no cameras are found, use the original mock data
  if (cameras.length === 0) {
    // Use the original mock data here
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="overflow-hidden bg-gray-900 border-gray-800">
          <div className="relative">
            <img src="/camera-feeds/vip-section.jpg" alt="VIP Section" className="w-full h-48 object-cover" />
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <Badge className="bg-green-500/80 text-white">Live</Badge>
              <Badge className="bg-black/50 text-white">
                <Camera className="h-3 w-3 mr-1" />
                14
              </Badge>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-white">VIP Section</h3>
                <p className="text-xs text-white/70">قسم كبار الشخصيات</p>
              </div>
            </div>
          </div>
        </Card>
        {/* Add more mock camera cards as needed */}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cameras.map((camera) => (
        <Card key={camera.id} className="overflow-hidden bg-gray-900 border-gray-800">
          <div className="relative">
            <CameraFeed camera={camera} />
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <Badge className="bg-green-500/80 text-white">Live</Badge>
              <Badge className="bg-black/50 text-white">
                <Camera className="h-3 w-3 mr-1" />
                {camera.detection_count}
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
                <p className="text-xs text-white/70">{camera.arabic_name}</p>
              </div>
              <div className="flex items-center gap-1">
                {camera.sentiment_score < 0.6 && (
                  <Badge className="bg-red-500/80 text-white">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Negative Sentiment
                  </Badge>
                )}
                {camera.anomaly_count > 0 && (
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
              <TabsTrigger value="sentiment" className="data-[state=active]:bg-gray-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Sentiment Analysis
                <AIBadge className="ml-2" />
              </TabsTrigger>
              <TabsTrigger value="anomaly" className="data-[state=active]:bg-gray-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Anomaly Detection
                <AIBadge className="ml-2" />
              </TabsTrigger>
              <TabsTrigger value="lost" className="data-[state=active]:bg-gray-700">
                <Search className="h-4 w-4 mr-2" />
                Lost Person Tracking
                <AIBadge className="ml-2" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-4">
              {selectedCamera && <CameraFeed camera={selectedCamera} fullscreen />}
            </TabsContent>

            <TabsContent value="sentiment" className="mt-4">
              {selectedCamera && <SentimentAnalysis camera={selectedCamera} />}
            </TabsContent>

            <TabsContent value="anomaly" className="mt-4">
              {selectedCamera && <AnomalyDetection camera={selectedCamera} />}
            </TabsContent>

            <TabsContent value="lost" className="mt-4">
              {selectedCamera && <LostPersonTracking camera={selectedCamera} />}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
