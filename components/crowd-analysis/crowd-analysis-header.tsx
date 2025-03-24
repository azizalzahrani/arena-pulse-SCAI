"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Download, Filter } from "lucide-react"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CrowdAnalysisHeader() {
  const [timeFilter, setTimeFilter] = useState("real-time")
  const [venue, setVenue] = useState(mockCrowdAnalysisData.currentVenue)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Crowd Analysis</h1>
          <p className="text-muted-foreground">Real-time crowd density and flow analysis for {venue}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={venue} onValueChange={setVenue}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="King Fahd International Stadium">King Fahd International Stadium</SelectItem>
              <SelectItem value="King Abdullah Sports City">King Abdullah Sports City</SelectItem>
              <SelectItem value="Prince Faisal bin Fahd Stadium">Prince Faisal bin Fahd Stadium</SelectItem>
              <SelectItem value="Mrsool Park">Mrsool Park</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue={timeFilter} onValueChange={setTimeFilter} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="real-time">Real-time</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter Zones
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="league">League Matches</SelectItem>
              <SelectItem value="cup">Cup Matches</SelectItem>
              <SelectItem value="international">International</SelectItem>
              <SelectItem value="special">Special Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

