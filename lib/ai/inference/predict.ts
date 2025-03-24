"\"use client"

import { CrowdDensityModel, type CrowdAnalysisResult } from "../models/crowd-density-model"

// Cache for model instances
const modelCache = new Map<string, CrowdDensityModel>()

/**
 * Gets or creates a model instance
 */
export function getModel(modelPath: string): CrowdDensityModel {
  if (!modelCache.has(modelPath)) {
    const model = new CrowdDensityModel({ modelPath })
    modelCache.set(modelPath, model)
  }
  return modelCache.get(modelPath)!
}

/**
 * Analyzes a single image and returns crowd analysis results
 */
export async function predictCrowdDensity(
  imageSource: HTMLImageElement | HTMLCanvasElement | ImageData,
  modelPath = "/models/crowd-density-model/model.json",
): Promise<CrowdAnalysisResult> {
  const model = getModel(modelPath)
  return await model.analyze(imageSource)
}

/**
 * Analyzes a video stream frame by frame
 */
export async function analyzeVideoFrame(
  videoElement: HTMLVideoElement,
  modelPath = "/models/crowd-density-model/model.json",
): Promise<CrowdAnalysisResult> {
  const model = getModel(modelPath)
  return await model.analyze(videoElement)
}

/**
 * Creates a heatmap visualization from crowd analysis results
 */
export function createHeatmapVisualization(result: CrowdAnalysisResult, canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d")
  if (!ctx || !result.heatmapData) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw heatmap
  const heatmap = result.heatmapData
  const height = heatmap.length
  const width = heatmap[0].length

  // Find max value for normalization
  let maxVal = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      maxVal = Math.max(maxVal, heatmap[y][x])
    }
  }

  // Draw each pixel
  const scaleX = canvas.width / width
  const scaleY = canvas.height / height

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = heatmap[y][x] / maxVal

      // Skip very low values
      if (value < 0.05) continue

      // Create a heat color (red with varying opacity)
      const alpha = Math.min(value * 0.8, 0.8)
      ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`

      // Draw a rectangle for this pixel
      ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY)
    }
  }

  // Add count text
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  ctx.lineWidth = 3
  ctx.font = "24px Arial"
  const text = `Count: ${result.count} | Density: ${result.density.toFixed(2)}`
  ctx.strokeText(text, 10, 30)
  ctx.fillText(text, 10, 30)
}

/**
 * Cleans up all model instances
 */
export function disposeModels(): void {
  modelCache.forEach((model) => model.dispose())
  modelCache.clear()
}

