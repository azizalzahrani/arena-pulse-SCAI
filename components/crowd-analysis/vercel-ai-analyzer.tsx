"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useVercelAICrowdAnalysis } from "@/hooks/use-vercel-ai-crowd-analysis"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VercelAICrowdAnalyzer() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isLoading, error, results, provider, setProvider, analyzeImage } = useVercelAICrowdAnalysis()

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Vercel AI Crowd Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">AI Provider</label>
          <Select value={provider} onValueChange={(value) => setProvider(value as "openai" | "replicate")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI (GPT-4o Vision)</SelectItem>
              <SelectItem value="replicate">Replicate (Crowd Counter)</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

          <Button onClick={handleAnalyzeImage} disabled={!imageUrl || isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Image"}
          </Button>
        </div>

        {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">Error: {error.message}</div>}

        {results && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Analysis Results:</h3>
            <p>People Count: {results.count}</p>
            <p>Crowd Density: {results.density.toFixed(4)}</p>
            {results.metadata && (
              <>
                <p className="mt-2 font-semibold">Areas with highest concentration:</p>
                <p>{results.metadata.areas}</p>
                <p className="mt-2 font-semibold">Potential risks:</p>
                <p>{results.metadata.risks}</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

