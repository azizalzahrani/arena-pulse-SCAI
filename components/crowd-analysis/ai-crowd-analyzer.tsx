"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useCrowdAnalysis } from "@/hooks/use-crowd-analysis"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AICrowdAnalyzer() {
  const [activeTab, setActiveTab] = useState<"image" | "video">("image")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [results, setResults] = useState<any>(null)

  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isLoading, error, analyzeImage, analyzeVideo, startVideoTracking, stopVideoTracking, visualizeResults } =
    useCrowdAnalysis({ autoLoad: true })

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setImageUrl(url)

    // Revoke previous URL to avoid memory leaks
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }
  }

  // Handle image analysis
  const handleAnalyzeImage = async () => {
    if (imageRef.current && imageUrl) {
      await analyzeImage(imageRef.current)
    }
  }

  // Handle video controls
  const handleStartVideo = async () => {
    if (!videoRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setIsVideoPlaying(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const handleStopVideo = () => {
    if (!videoRef.current) return

    const stream = videoRef.current.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    videoRef.current.srcObject = null
    setIsVideoPlaying(false)
    stopVideoTracking()
  }

  const handleToggleTracking = () => {
    if (!videoRef.current || !isVideoPlaying) return

    if (results) {
      stopVideoTracking()
      setResults(null)
    } else {
      startVideoTracking(videoRef.current)
    }
  }

  // Update visualization when results change
  useEffect(() => {
    if (results && canvasRef.current) {
      visualizeResults(canvasRef.current)
    }
  }, [results, visualizeResults])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
      handleStopVideo()
    }
  }, [imageUrl])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>AI Crowd Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "image" | "video")}>
          <TabsList className="mb-4">
            <TabsTrigger value="image">Image Analysis</TabsTrigger>
            <TabsTrigger value="video">Video Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => fileInputRef.current?.click()}>Select Image</Button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

              {imageUrl && (
                <div className="relative w-full max-w-2xl">
                  <img
                    ref={imageRef}
                    src={imageUrl || "/placeholder.svg"}
                    alt="Selected image"
                    className="w-full h-auto"
                    crossOrigin="anonymous"
                  />
                  <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                </div>
              )}

              <Button onClick={handleAnalyzeImage} disabled={!imageUrl || isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Image"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {!isVideoPlaying ? (
                  <Button onClick={handleStartVideo}>Start Camera</Button>
                ) : (
                  <>
                    <Button onClick={handleToggleTracking} variant="outline">
                      {results ? "Stop Tracking" : "Start Tracking"}
                    </Button>
                    <Button onClick={handleStopVideo} variant="destructive">
                      Stop Camera
                    </Button>
                  </>
                )}
              </div>

              <div className="relative w-full max-w-2xl">
                <video ref={videoRef} className="w-full h-auto" playsInline muted />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">Error: {error.message}</div>}

        {results && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Analysis Results:</h3>
            <p>People Count: {results.count}</p>
            <p>Crowd Density: {results.density.toFixed(4)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

