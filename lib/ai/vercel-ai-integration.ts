"use client"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { CrowdAnalysisResult } from "./models/crowd-density-model"

/**
 * Analyzes an image using OpenAI's vision capabilities
 */
export async function analyzeImageWithOpenAI(
  imageElement: HTMLImageElement | HTMLCanvasElement,
): Promise<CrowdAnalysisResult> {
  // Convert image to base64
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = imageElement.width
  canvas.height = imageElement.height

  ctx?.drawImage(imageElement, 0, 0)
  const dataUrl = canvas.toDataURL("image/jpeg")
  const base64Image = dataUrl.split(",")[1]

  try {
    // Use AI SDK to analyze the image
    const response = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this crowd image and provide the following information in JSON format:
        {
          "count": [approximate number of people],
          "density": [crowd density as a number between 0-1],
          "areas": [areas with highest concentration],
          "risks": [any potential safety risks]
        }
        Only respond with valid JSON.`,
      images: [dataUrl],
    })

    // Parse the response
    const jsonMatch = response.text.match(/\{[\s\S]*\}/)
    const jsonString = jsonMatch ? jsonMatch[0] : "{}"
    const result = JSON.parse(jsonString)

    return {
      count: result.count || 0,
      density: result.density || 0,
      heatmapData: undefined, // OpenAI doesn't provide heatmap data
      metadata: {
        areas: result.areas,
        risks: result.risks,
      },
    }
  } catch (error) {
    console.error("Error analyzing image with OpenAI:", error)
    throw error
  }
}

/**
 * Analyzes an image using Replicate's crowd counting model
 */
export async function analyzeImageWithReplicate(
  imageElement: HTMLImageElement | HTMLCanvasElement,
): Promise<CrowdAnalysisResult> {
  // Convert image to base64
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = imageElement.width
  canvas.height = imageElement.height

  ctx?.drawImage(imageElement, 0, 0)
  const dataUrl = canvas.toDataURL("image/jpeg")

  try {
    // Call Replicate API
    const response = await fetch("/api/analyze-crowd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: dataUrl,
      }),
    })

    const result = await response.json()

    return {
      count: result.count || 0,
      density: result.density || 0,
      heatmapData: result.heatmap,
      boundingBoxes: result.detections?.map((d: any) => ({
        x: d.x,
        y: d.y,
        width: d.width,
        height: d.height,
        confidence: d.confidence,
      })),
    }
  } catch (error) {
    console.error("Error analyzing image with Replicate:", error)
    throw error
  }
}

