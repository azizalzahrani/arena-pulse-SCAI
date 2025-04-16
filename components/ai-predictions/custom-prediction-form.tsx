"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { generatePrediction, type PredictionInput, type PredictionResult } from "@/app/actions/generate-prediction"
import { AIBadge } from "@/components/ui/ai-badge"

interface CustomPredictionFormProps {
  onPredictionGenerated?: (prediction: PredictionResult) => void
}

export function CustomPredictionForm({ onPredictionGenerated }: CustomPredictionFormProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<PredictionInput>({
    eventType: "match",
    attendanceEstimate: 30000,
    timeWindow: "60",
    predictionType: "crowd",
    weatherCondition: "",
    specialCircumstances: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // Call the server action to generate a prediction
      const prediction = await generatePrediction(formData)

      // Notify the parent component
      if (onPredictionGenerated) {
        onPredictionGenerated(prediction)
      }

      toast({
        title: "Prediction Generated",
        description: `${prediction.title} has been added to your dashboard.`,
      })
    } catch (error) {
      console.error("Error generating prediction:", error)
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Custom Prediction</CardTitle>
            <CardDescription>Create a tailored prediction using our AI engine</CardDescription>
          </div>
          <AIBadge />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={formData.eventType} onValueChange={(value) => handleChange("eventType", value)}>
              <SelectTrigger id="eventType">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Football Match</SelectItem>
                <SelectItem value="concert">Concert</SelectItem>
                <SelectItem value="ceremony">Ceremony</SelectItem>
                <SelectItem value="exhibition">Exhibition</SelectItem>
                <SelectItem value="tournament">Tournament</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendanceEstimate">Estimated Attendance</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="attendanceEstimate"
                min={5000}
                max={60000}
                step={1000}
                value={[formData.attendanceEstimate]}
                onValueChange={(value) => handleChange("attendanceEstimate", value[0])}
              />
              <span className="min-w-[80px] text-right">{formData.attendanceEstimate.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeWindow">Prediction Window</Label>
            <Select value={formData.timeWindow} onValueChange={(value) => handleChange("timeWindow", value)}>
              <SelectTrigger id="timeWindow">
                <SelectValue placeholder="Select time window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
                <SelectItem value="120">2 Hours</SelectItem>
                <SelectItem value="240">4 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="predictionType">Prediction Type</Label>
            <Select value={formData.predictionType} onValueChange={(value) => handleChange("predictionType", value)}>
              <SelectTrigger id="predictionType">
                <SelectValue placeholder="Select prediction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crowd">Crowd Flow</SelectItem>
                <SelectItem value="security">Security Incidents</SelectItem>
                <SelectItem value="capacity">Section Capacity</SelectItem>
                <SelectItem value="emergency">Emergency Response</SelectItem>
                <SelectItem value="traffic">Traffic & Parking</SelectItem>
                <SelectItem value="concessions">Concession Demand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weatherCondition">Weather Condition (Optional)</Label>
            <Input
              id="weatherCondition"
              placeholder="e.g., Rainy, Hot, Windy"
              value={formData.weatherCondition}
              onChange={(e) => handleChange("weatherCondition", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialCircumstances">Special Circumstances (Optional)</Label>
            <Textarea
              id="specialCircumstances"
              placeholder="e.g., VIP visit, Holiday, Local event"
              value={formData.specialCircumstances}
              onChange={(e) => handleChange("specialCircumstances", e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating AI Prediction...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Prediction
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
