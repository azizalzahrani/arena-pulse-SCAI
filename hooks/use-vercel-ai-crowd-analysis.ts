"use client"

import { useState, useCallback } from "react"
import { analyzeImageWithOpenAI, analyzeImageWithReplicate } from "@/lib/ai/vercel-ai-integration"
import type { CrowdAnalysisResult } from "@/lib/ai/models/crowd-density-model"

type AIProvider = "openai" | "replicate"

interface UseVercelAICrowdAnalysisOptions {
  defaultProvider?: AIProvider
}

export function useVercelAICrowdAnalysis(options: UseVercelAICrowdAnalysisOptions = {}) {
  const { defaultProvider = "openai" } = options

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [results, setResults] = useState<CrowdAnalysisResult | null>(null)
  const [provider, setProvider] = useState<AIProvider>(defaultProvider)

  const analyzeImage = useCallback(
    async (imageElement: HTMLImageElement | HTMLCanvasElement) => {
      setIsLoading(true)
      setError(null)

      try {
        let result

        if (provider === "openai") {
          result = await analyzeImageWithOpenAI(imageElement)
        } else {
          result = await analyzeImageWithReplicate(imageElement)
        }

        setResults(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [provider],
  )

  return {
    isLoading,
    error,
    results,
    provider,
    setProvider,
    analyzeImage,
  }
}

