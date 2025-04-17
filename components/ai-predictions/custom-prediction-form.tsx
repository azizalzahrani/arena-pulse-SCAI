"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function CustomPredictionForm() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    eventType: "match",
    attendanceEstimate: 30000,
    timeWindow: "60",
    predictionType: "crowd",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Prediction Generated",
        description: `Custom ${formData.predictionType} prediction for ${formData.attendanceEstimate.toLocaleString()} attendees has been added to your dashboard.`,
      })
    }, 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Generate Custom Prediction</CardTitle>
        <CardDescription>Create a tailored prediction for specific scenarios</CardDescription>
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
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Prediction
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
