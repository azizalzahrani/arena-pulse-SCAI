"use client"

import { Car, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function ParkingManagementHeader() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Parking Management</h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList>
            <TabsTrigger value="all">All Parking Areas</TabsTrigger>
            <TabsTrigger value="north">North Parking</TabsTrigger>
            <TabsTrigger value="south">South Parking</TabsTrigger>
            <TabsTrigger value="vip">VIP Parking</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
