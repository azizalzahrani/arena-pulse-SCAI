"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createActionClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export type PredictionInput = {
  eventType: string
  attendanceEstimate: number
  timeWindow: string
  predictionType: string
  weatherCondition?: string
  specialCircumstances?: string
}

export type PredictionResult = {
  id: string
  title: string
  time: string
  description: string
  impact: "low" | "medium" | "high"
  trend: "increasing" | "decreasing" | "stable"
  icon: "crowd" | "temperature" | "traffic" | "prayer" | "event"
  accuracy: number
  generated: string
  recommendations: string[]
  riskFactors: string[]
}

export async function generatePrediction(input: PredictionInput): Promise<PredictionResult> {
  const { eventType, attendanceEstimate, timeWindow, predictionType, weatherCondition, specialCircumstances } = input

  // Create a detailed prompt for the AI
  const prompt = `
    As an AI stadium management assistant, generate a detailed prediction for the following scenario:
    
    Event Type: ${eventType}
    Estimated Attendance: ${attendanceEstimate.toLocaleString()} people
    Time Window: ${timeWindow} minutes from now
    Prediction Type: ${predictionType}
    ${weatherCondition ? `Weather Condition: ${weatherCondition}` : ""}
    ${specialCircumstances ? `Special Circumstances: ${specialCircumstances}` : ""}
    
    Respond ONLY with a JSON object (no markdown, no code blocks, no backticks) with the following structure:
    {
      "title": "A concise title for this prediction",
      "description": "A detailed 1-2 sentence description of the prediction",
      "impact": "low, medium, or high",
      "trend": "increasing, decreasing, or stable",
      "icon": "crowd, temperature, traffic, prayer, or event",
      "accuracy": "a number between 80 and 98",
      "recommendations": ["3-5 specific actionable recommendations based on this prediction"],
      "riskFactors": ["2-3 risk factors to monitor"]
    }
    
    Make the prediction realistic, specific, and actionable for stadium management.
  `

  try {
    // Generate the prediction using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
    })

    // Clean the response - remove any markdown formatting or code blocks
    let cleanedResponse = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    // If the response starts with a backtick, remove everything until the first {
    if (cleanedResponse.startsWith("`")) {
      const jsonStartIndex = cleanedResponse.indexOf("{")
      if (jsonStartIndex !== -1) {
        cleanedResponse = cleanedResponse.substring(jsonStartIndex)
      }
    }

    // If the response ends with a backtick, remove everything after the last }
    if (cleanedResponse.endsWith("`")) {
      const jsonEndIndex = cleanedResponse.lastIndexOf("}")
      if (jsonEndIndex !== -1) {
        cleanedResponse = cleanedResponse.substring(0, jsonEndIndex + 1)
      }
    }

    // Parse the cleaned response
    const aiResponse = JSON.parse(cleanedResponse)

    // Generate a unique ID
    const id = uuidv4()

    // Format the time window
    const time = `${timeWindow} min`

    // Format the generated time
    const generated = "Just now"

    const predictionResult: PredictionResult = {
      id,
      title: aiResponse.title,
      time,
      description: aiResponse.description,
      impact: aiResponse.impact as "low" | "medium" | "high",
      trend: aiResponse.trend as "increasing" | "decreasing" | "stable",
      icon: aiResponse.icon as "crowd" | "temperature" | "traffic" | "prayer" | "event",
      accuracy: aiResponse.accuracy,
      generated,
      recommendations: aiResponse.recommendations,
      riskFactors: aiResponse.riskFactors,
    }

    // Store the prediction in the database
    try {
      const supabase = createActionClient()
      await supabase.from("arena_pulse.ai_predictions").insert([
        {
          prediction_type: predictionType,
          query: JSON.stringify(input),
          result: predictionResult,
          model: "gpt-4o",
          confidence_score: predictionResult.accuracy / 100,
          created_by: "system",
        },
      ])
    } catch (dbError) {
      console.error("Error saving prediction to database:", dbError)
      // Continue even if database save fails
    }

    return predictionResult
  } catch (error) {
    console.error("Error generating prediction:", error)

    // Return a fallback prediction if there's an error
    return {
      id: uuidv4(),
      title: `${predictionType} Prediction`,
      time: `${timeWindow} min`,
      description: `Unable to generate detailed prediction. Please try again.`,
      impact: "medium",
      trend: "stable",
      icon: "event",
      accuracy: 85,
      generated: "Just now",
      recommendations: ["Check system parameters", "Try with different inputs"],
      riskFactors: ["AI system connectivity issues"],
    }
  }
}
