"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EventScheduleHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState("king-fahd")

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Event Schedule / جدول الفعاليات</h1>
        </div>
        <p className="mt-2 text-white/80 max-w-2xl">
          Manage upcoming events, capacity planning, and AI-powered insights
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select value={selectedVenue} onValueChange={setSelectedVenue}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-[180px]">
            <SelectValue placeholder="Select venue" />
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
              <p>Refresh event data</p>
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
                <span className="sr-only">Event information</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Events last updated: 2 minutes ago</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
