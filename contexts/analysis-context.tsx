"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

// Define the shape of our analysis data
interface AnalysisData {
  crowdDensity: number
  flowRate: number
  bottleneckCount: number
  occupancy: number
  anomalyDetected: boolean
  safetyScore: number
  lastUpdated: Date
  timestamp: string
  peopleCount: number
  hotspots: number
  location: string
  historicalData: {
    density: number[]
    occupancy: number[]
    flow: number[]
    wait: number[]
  }
}

// Default data
const defaultAnalysisData: AnalysisData = {
  crowdDensity: 2.1,
  flowRate: 45,
  bottleneckCount: 1,
  occupancy: 65,
  anomalyDetected: false,
  safetyScore: 85,
  lastUpdated: new Date(),
  timestamp: new Date().toISOString(),
  peopleCount: 100,
  hotspots: 2,
  location: "Main Entrance",
  historicalData: {
    density: Array.from({ length: 24 }, () => Math.random() * 3 + 1),
    occupancy: Array.from({ length: 24 }, () => Math.random() * 40 + 40),
    flow: Array.from({ length: 24 }, () => Math.random() * 20 + 10),
    wait: Array.from({ length: 24 }, () => Math.random() * 15 + 5),
  },
}

interface AnalysisContextType {
  analysisData: AnalysisData
  updateAnalysisData: (data: Partial<AnalysisData>) => void
  isLive: boolean
  setIsLive: (isLive: boolean) => void
}

// Create the context with default values
const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

// Create and export the hook for using the context
export function useAnalysisContext() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error("useAnalysisContext must be used within an AnalysisProvider")
  }
  return context
}

// Also export the hook for easier imports
export const useAnalysisData = useAnalysisContext

// Provider component
export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData>(defaultAnalysisData)
  const [isLive, setIsLive] = useState(true)

  // Use a ref to track the latest data without causing re-renders
  const analysisDataRef = useRef(analysisData)
  analysisDataRef.current = analysisData

  const updateAnalysisData = (data: Partial<AnalysisData>) => {
    setAnalysisData((prev) => ({
      ...prev,
      ...data,
      lastUpdated: new Date(),
    }))
  }

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Get current data from ref to avoid dependency on analysisData
      const currentData = analysisDataRef.current

      // Random fluctuations to simulate real-time changes
      updateAnalysisData({
        crowdDensity: Math.max(0.5, Math.min(5, currentData.crowdDensity + (Math.random() - 0.5) * 0.3)),
        flowRate: Math.max(10, Math.min(100, currentData.flowRate + (Math.random() - 0.5) * 5)),
        bottleneckCount: Math.floor(
          Math.max(
            0,
            Math.min(3, currentData.bottleneckCount + (Math.random() < 0.1 ? (Math.random() < 0.5 ? 1 : -1) : 0)),
          ),
        ),
        occupancy: Math.max(20, Math.min(95, currentData.occupancy + (Math.random() - 0.5) * 3)),
        timestamp: new Date().toISOString(),
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isLive]) // Remove analysisData from dependencies

  return (
    <AnalysisContext.Provider value={{ analysisData, updateAnalysisData, isLive, setIsLive }}>
      {children}
    </AnalysisContext.Provider>
  )
}

// Also export the context itself for advanced use cases
export { AnalysisContext }

