"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, DetectionBox } from "@/types"
import { ErrorBoundary } from "@/components/error-boundary"

/**
 * Props for the CameraFeed component
 * @interface CameraFeedProps
 * @property {Camera} camera - The camera data to display
 * @property {boolean} [fullscreen=false] - Whether to display the feed in fullscreen mode
 */
interface CameraFeedProps {
  camera: Camera
  fullscreen?: boolean
}

/**
 * CameraFeed component that displays a simulated camera feed with AI detection boxes.
 * The component generates random detection boxes that move around the feed to simulate
 * real-time object detection.
 * 
 * @example
 * ```tsx
 * <CameraFeed camera={cameraData} />
 * ```
 * 
 * @example
 * ```tsx
 * <CameraFeed camera={cameraData} fullscreen={true} />
 * ```
 */
function CameraFeedContent({ camera, fullscreen = false }: CameraFeedProps) {
  const [detections, setDetections] = useState<DetectionBox[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  /**
   * Generates random detection boxes based on the camera's detection count
   * @returns {DetectionBox[]} Array of generated detection boxes
   */
  const generateDetections = () => {
    const count = camera.detectionCount
    const newDetections: DetectionBox[] = []

    for (let i = 0; i < count; i++) {
      const width = Math.floor(Math.random() * 60) + 40 // 40-100px
      const height = Math.floor(Math.random() * 60) + 60 // 60-120px
      const x = Math.floor(Math.random() * (dimensions.width - width))
      const y = Math.floor(Math.random() * (dimensions.height - height))
      const confidence = Math.floor(Math.random() * 30) + 65 // 65-95%

      newDetections.push({
        id: i,
        x,
        y,
        width,
        height,
        confidence,
        timestamp: new Date(),
        type: Math.random() > 0.5 ? "person" : "vehicle"
      })
    }

    return newDetections
  }

  // Generate random detection boxes
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setDetections(generateDetections())

      // Update detections periodically to simulate movement
      const interval = setInterval(() => {
        setDetections((prev) =>
          prev.map((box) => ({
            ...box,
            x: Math.max(0, Math.min(dimensions.width - box.width, box.x + (Math.random() * 10 - 5))),
            y: Math.max(0, Math.min(dimensions.height - box.height, box.y + (Math.random() * 10 - 5))),
            timestamp: new Date()
          })),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [camera.detectionCount, dimensions])

  // Update dimensions when container size changes
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          })
        }
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-testid="camera-feed-container"
      className={`relative overflow-hidden bg-gray-900 ${fullscreen ? "h-[60vh]" : "aspect-video"}`}
    >
      {/* Camera feed background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-700" />
          ))}
        </div>
      </div>

      {/* Camera feed image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xs text-gray-500 uppercase tracking-wider">Camera Feed Simulation</div>
      </div>

      {/* Camera overlay with detection boxes */}
      <div className="absolute inset-0">
        {detections.map((box) => (
          <div
            key={box.id}
            data-testid="detection-box"
            className="absolute border-2 border-green-500"
            style={{
              left: `${box.x}px`,
              top: `${box.y}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
            }}
          >
            <div className="absolute -top-5 -left-0.5 bg-green-500 text-black text-xs px-1 font-mono">
              {box.confidence}%
            </div>
          </div>
        ))}
      </div>

      {/* Camera info overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-2 text-xs font-mono text-white opacity-80">
        CAM: {camera.name.toUpperCase()} | {new Date().toLocaleTimeString()} | FPS: 30
      </div>

      {/* Camera status overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex justify-between items-center text-xs font-mono text-white opacity-80">
        <div>AI DETECTED: {camera.detectionCount}</div>
        <div>SIMULATED</div>
      </div>

      {/* AI Processing indicator */}
      <div className="absolute top-2 right-2 text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
        AI Processing
      </div>
    </div>
  )
}

export function CameraFeed(props: CameraFeedProps) {
  return (
    <ErrorBoundary>
      <CameraFeedContent {...props} />
    </ErrorBoundary>
  )
}
