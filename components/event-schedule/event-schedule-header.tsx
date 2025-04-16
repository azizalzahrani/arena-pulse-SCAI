"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Info, Calendar, Plus, Filter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function EventScheduleHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedStadium, setSelectedStadium] = useState("king-fahd")

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="bg-gradient-to-r from-arena-purple/90 to-arena-blue/90 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Event Schedule / جدول الفعاليات</h1>
              <Badge className="bg-green-500 text-white">
                <Calendar className="h-3.5 w-3.5 mr-1" />3 Upcoming Events
              </Badge>
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">
              Manage and monitor stadium events, schedules, and resource allocation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>

            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

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
                  <p>Event schedule last updated: 5 minutes ago</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Today: Al Hilal vs Al Nassr
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Next: Concert (Apr 20)
          </Badge>
        </div>
      </div>
    </div>
  )
}
