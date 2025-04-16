"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, AlertTriangle, Calendar, Sparkles } from "lucide-react"

export function GateAutomationSettings() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [crowdThreshold, setCrowdThreshold] = useState(80)
  const [weatherResponse, setWeatherResponse] = useState(true)
  const [prayerTimeAdjustment, setPrayerTimeAdjustment] = useState(true)
  const [emergencyResponse, setEmergencyResponse] = useState(true)
  const [predictionWindow, setPredictionWindow] = useState("30")
  const [autoSchedule, setAutoSchedule] = useState(true)
  const [maintenanceSchedule, setMaintenanceSchedule] = useState("weekly")

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Automation</CardTitle>
            <p className="text-sm text-muted-foreground">Smart gate management settings</p>
          </div>
          <Badge className="bg-arena-purple">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-arena-purple" />
            <div>
              <h3 className="font-medium">AI-Powered Gate Control</h3>
              <p className="text-xs text-muted-foreground">Automatically manage gates based on crowd data</p>
            </div>
          </div>
          <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="crowd-threshold" className="text-sm">
                Crowd Density Threshold
              </Label>
              <span className="text-sm font-medium">{crowdThreshold}%</span>
            </div>
            <Slider
              id="crowd-threshold"
              min={50}
              max={95}
              step={5}
              value={[crowdThreshold]}
              onValueChange={(value) => setCrowdThreshold(value[0])}
              disabled={!aiEnabled}
            />
            <p className="text-xs text-muted-foreground">
              Gates will automatically open additional lanes when crowd density exceeds this threshold
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prediction-window" className="text-sm">
              Prediction Window
            </Label>
            <Select
              id="prediction-window"
              value={predictionWindow}
              onValueChange={setPredictionWindow}
              disabled={!aiEnabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select prediction window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
                <SelectItem value="120">2 Hours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How far in advance the AI will predict crowd flow and adjust gates
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Smart Response Settings</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <Label htmlFor="emergency-response" className="text-sm cursor-pointer">
                Emergency Response
              </Label>
            </div>
            <Switch
              id="emergency-response"
              checked={emergencyResponse}
              onCheckedChange={setEmergencyResponse}
              disabled={!aiEnabled}
            />
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Automatically open all gates in case of emergency detection
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-arena-blue" />
              <Label htmlFor="prayer-time" className="text-sm cursor-pointer">
                Prayer Time Adjustment
              </Label>
            </div>
            <Switch
              id="prayer-time"
              checked={prayerTimeAdjustment}
              onCheckedChange={setPrayerTimeAdjustment}
              disabled={!aiEnabled}
            />
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Adjust gate capacity before and after prayer times to accommodate flow
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-arena-teal" />
              <Label htmlFor="auto-schedule" className="text-sm cursor-pointer">
                Auto Schedule
              </Label>
            </div>
            <Switch id="auto-schedule" checked={autoSchedule} onCheckedChange={setAutoSchedule} disabled={!aiEnabled} />
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Automatically schedule gate openings based on event calendar
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="maintenance-schedule" className="text-sm">
            Maintenance Schedule
          </Label>
          <Select
            id="maintenance-schedule"
            value={maintenanceSchedule}
            onValueChange={setMaintenanceSchedule}
            disabled={!aiEnabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select maintenance schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">AI will schedule maintenance during low-traffic periods</p>
        </div>

        <Button className="w-full" disabled={!aiEnabled}>
          <Sparkles className="h-4 w-4 mr-2" />
          Apply AI Settings
        </Button>
      </CardContent>
    </Card>
  )
}
