"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function CrowdAnalysisDemo() {
  const [useReplicate, setUseReplicate] = useState(true)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<any>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setError(null)

    // Revoke previous URL to avoid memory leaks
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }
  }

  // Convert image to base64
  const imageToBase64 = (img: HTMLImageElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      ctx.drawImage(img, 0, 0)

      // Get base64 data URL
      try {
        const dataURL = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataURL)
      } catch (e) {
        reject(e)
      }
    })
  }

  // Handle image analysis
  const handleAnalyzeImage = async () => {
    if (!imageRef.current || !imageUrl) return

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      // Convert image to base64
      const base64Image = await imageToBase64(imageRef.current)

      // Call API
      const response = await fetch("/api/crowd-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API error:", errorData)
        throw new Error(errorData.details || errorData.error || "Failed to analyze image")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError(err.message || "An error occurred while analyzing the image")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Crowd Analysis Demo</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Crowd Analysis with AI</CardTitle>
          <CardDescription>Upload an image of a crowd to analyze it using AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Switch id="ai-mode" checked={useReplicate} onCheckedChange={setUseReplicate} />
            <Label htmlFor="ai-mode">
              {useReplicate ? "Using Replicate AI (Cloud)" : "Using TensorFlow.js (Local)"}
            </Label>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
              </div>
            )}

            <Button onClick={handleAnalyzeImage} disabled={!imageUrl || isLoading} className="w-full md:w-auto">
              {isLoading ? "Analyzing..." : "Analyze Crowd"}
            </Button>
          </div>

          {results && (
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h4 className="font-semibold text-lg mb-2">People Count</h4>
                  <p className="text-3xl font-bold">{results.count}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h4 className="font-semibold text-lg mb-2">Crowd Density</h4>
                  <p className="text-3xl font-bold">{(results.density * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

