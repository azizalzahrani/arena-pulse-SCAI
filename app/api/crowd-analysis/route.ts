import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Check if API key exists
    const apiKey = process.env.REPLICATE_API_KEY
    if (!apiKey) {
      console.error("REPLICATE_API_KEY is not defined in environment variables")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    // Make direct fetch request to Replicate API instead of using the SDK
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        version: "8b5e8a00a74e0d375b5ebc1ca3055389f15189cd0b2e827e8e9c1d8a6746b5bc",
        input: { image },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Replicate API error:", errorData)
      return NextResponse.json(
        {
          error: "Replicate API error",
          details: errorData,
          status: response.status,
        },
        { status: response.status },
      )
    }

    // Get the prediction ID from the response
    const prediction = await response.json()

    // Poll for results (Replicate runs predictions asynchronously)
    const result = await pollForResults(prediction.id, apiKey)

    // Process the prediction results
    const processedResult = {
      count: result.output?.count || 0,
      density: result.output?.count / 1000 || 0, // Normalize to 0-1 range
      heatmap: result.output?.heatmap || null,
    }

    return NextResponse.json(processedResult)
  } catch (error) {
    console.error("Error in crowd analysis API:", error)
    return NextResponse.json({ error: "Failed to analyze crowd", details: error.message }, { status: 500 })
  }
}

// Helper function to poll for results
async function pollForResults(predictionId: string, apiKey: string, maxAttempts = 20) {
  let attempts = 0

  while (attempts < maxAttempts) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error polling for results: ${JSON.stringify(error)}`)
    }

    const prediction = await response.json()

    if (prediction.status === "succeeded") {
      return prediction
    } else if (prediction.status === "failed") {
      throw new Error(`Prediction failed: ${prediction.error}`)
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, 1000))
    attempts++
  }

  throw new Error("Prediction timed out")
}

