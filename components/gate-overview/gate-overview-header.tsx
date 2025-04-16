"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Info, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function GateOverviewHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedStadium, setSelectedStadium] = useState("king-fahd")
  const [emergencyMode, setEmergencyMode] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleEmergencyToggle = (checked: boolean) => {
    if (checked) {
      // In a real app, this would show a confirmation dialog
      if (confirm("Are you sure you want to activate EMERGENCY MODE? This will open all gates.")) {
        setEmergencyMode(true)
      }
    } else {
      setEmergencyMode(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-arena-purple/90 to-arena-blue/90 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Gate Overview / نظرة عامة على البوابات</h1>
              {emergencyMode && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  EMERGENCY MODE
                </Badge>
              )}
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">Real-time gate management, control, and monitoring system</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md">
              <Label htmlFor="emergency-mode" className="text-white cursor-pointer">
                Emergency Mode
              </Label>
              <Switch
                id="emergency-mode"
                checked={emergencyMode}
                onCheckedChange={handleEmergencyToggle}
                className="data-[state=checked]:bg-red-500"
              />
            </div>

            <Select value={selectedStadium} onValueChange={setSelectedStadium}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white w-[180px]">
                <SelectValue placeholder="Select stadium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="king-fahd">King Fahd Stadium</SelectItem>
                <SelectItem value="king-abdullah">King Abdullah Sports City</SelectItem>
                <SelectItem value="al-awwal">Al Awwal Park</SelectItem>
              </SelectContent>
            </Select>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span className="sr-only">Refresh data</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh gate status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Gate information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gate status last updated: 2 minutes ago</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {emergencyMode && (
          <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-md p-3 text-white">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold">EMERGENCY MODE ACTIVE</span>
            </div>
            <p className="mt-1 text-sm">
              All gates have been automatically opened for emergency evacuation. Security personnel have been notified.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
