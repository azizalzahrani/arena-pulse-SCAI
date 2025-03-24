"use client"

import * as tf from "@tensorflow/tfjs"

export interface CrowdAnalysisResult {
  count: number
  density: number
  heatmapData?: number[][]
  boundingBoxes?: Array<{
    x: number
    y: number
    width: number
    height: number
    confidence: number
  }>
}

export interface CrowdDensityModelConfig {
  modelPath: string
  threshold?: number
  maxDetections?: number
}

export class CrowdDensityModel {
  private model: tf.GraphModel | null = null
  private isLoading = false
  private config: CrowdDensityModelConfig

  constructor(config: CrowdDensityModelConfig) {
    this.config = {
      threshold: 0.5,
      maxDetections: 100,
      ...config,
    }
  }

  /**
   * Loads the model from the specified path
   */
  async load(): Promise<void> {
    if (this.model) return
    if (this.isLoading) return

    try {
      this.isLoading = true
      console.log("Loading crowd density model from:", this.config.modelPath)

      // Load the model
      this.model = await tf.loadGraphModel(this.config.modelPath)

      // Warm up the model with a dummy tensor
      const dummyTensor = tf.zeros([1, 300, 300, 3])
      await this.model.executeAsync(dummyTensor)
      dummyTensor.dispose()

      console.log("Crowd density model loaded successfully")
    } catch (error) {
      console.error("Failed to load crowd density model:", error)
      throw error
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Analyzes an image and returns crowd analysis results
   */
  async analyze(
    image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageData,
  ): Promise<CrowdAnalysisResult> {
    if (!this.model) {
      await this.load()
    }

    return tf.tidy(() => {
      // Convert image to tensor
      const imageTensor = tf.browser.fromPixels(image)

      // Normalize and resize the image
      const normalized = tf.div(tf.expandDims(imageTensor), 255.0)
      const resized = tf.image.resizeBilinear(normalized, [300, 300])

      // Run inference
      const predictions = this.model!.predict(resized) as tf.Tensor[]

      // Process predictions to get crowd analysis results
      const result = this.processPredictions(predictions, image)

      return result
    })
  }

  /**
   * Process model predictions to extract crowd analysis data
   */
  private processPredictions(
    predictions: tf.Tensor[],
    image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageData,
  ): CrowdAnalysisResult {
    // Assuming predictions[0] contains detection scores and predictions[1] contains bounding boxes
    const scores = predictions[0].dataSync()
    const boxes = predictions[1].dataSync()

    const validDetections = []
    let totalCount = 0

    // Process detections
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > this.config.threshold!) {
        totalCount++

        if (validDetections.length < this.config.maxDetections!) {
          const [y, x, height, width] = [boxes[i * 4], boxes[i * 4 + 1], boxes[i * 4 + 2], boxes[i * 4 + 3]]

          validDetections.push({
            x,
            y,
            width,
            height,
            confidence: scores[i],
          })
        }
      }
    }

    // Calculate density (people per unit area)
    const density = (totalCount / (image.width * (image as any).height)) * 10000

    return {
      count: totalCount,
      density,
      boundingBoxes: validDetections,
    }
  }

  /**
   * Cleans up resources used by the model
   */
  dispose(): void {
    if (this.model) {
      this.model.dispose()
      this.model = null
    }
  }
}

