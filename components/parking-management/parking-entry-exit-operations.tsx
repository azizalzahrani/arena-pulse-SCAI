"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  Clock,
  Users,
  Car,
  ToggleLeft,
  CheckCircle2,
} from "lucide-react"

// Entry/exit data
const entryExitPoints = [
  {
    id: "E1",
    name: "North Entry",
    type: "entry",
    status: "open",
    waitTime: "5 min",
    throughput: "120 vehicles/hour",
    autoMode: true,
    lastIncident: "None",
    staffAssigned: 2,
  },
  {
    id: "E2",
    name: "South Entry",
    type: "entry",
    status: "open",
    waitTime: "12 min",
    throughput: "90 vehicles/hour",
    autoMode: true,
    lastIncident: "2 hours ago - Vehicle without ticket",
    staffAssigned: 3,
  },
  {
    id: "E3",
    name: "East Entry",
    type: "entry",
    status: "open",
    waitTime: "8 min",
    throughput: "105 vehicles/hour",
    autoMode: true,
    lastIncident: "None",
    staffAssigned: 2,
  },
  {
    id: "X1",
    name: "West Exit",
    type: "exit",
    status: "open",
    waitTime: "3 min",
    throughput: "140 vehicles/hour",
    autoMode: true,
    lastIncident: "None",
    staffAssigned: 1,
  },
  {
    id: "X2",
    name: "Northwest Exit",
    type: "exit",
    status: "open",
    waitTime: "2 min",
    throughput: "130 vehicles/hour",
    autoMode: true,
    lastIncident: "1 hour ago - Barrier malfunction",
    staffAssigned: 1,
  },
]

export function ParkingEntryExitOperations() {
  const [activeTab, setActiveTab] = useState("all")
  const [points, setPoints] = useState(entryExitPoints)

  const toggleStatus = (id: string) => {
    setPoints(
      points.map((point) =>
        point.id === id ? { ...point, status: point.status === "open" ? "closed" : "open" } : point,
      ),
    )
  }

  const toggleAutoMode = (id: string) => {
    setPoints(points.map((point) => (point.id === id ? { ...point, autoMode: !point.autoMode } : point)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Open</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      default:
        return <Badge className="bg-yellow-500">Unknown</Badge>
    }
  }

  const filteredPoints = activeTab === "all" ? points : points.filter((point) => point.type === activeTab)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Entry & Exit Operations</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="entry">Entries</TabsTrigger>
            <TabsTrigger value="exit">Exits</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredPoints.map((point) => (
            <div key={point.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {point.type === "entry" ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  )}
                  <h3 className="font-medium">
                    {point.name} <span className="text-sm text-muted-foreground">({point.id})</span>
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(point.status)}
                  <Button
                    variant={point.status === "open" ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleStatus(point.id)}
                  >
                    {point.status === "open" ? "Close" : "Open"}
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Wait Time</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{point.waitTime}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Throughput</span>
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{point.throughput}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Staff</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{point.staffAssigned} personnel</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Auto Mode</span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={point.autoMode}
                      onCheckedChange={() => toggleAutoMode(point.id)}
                      id={`auto-${point.id}`}
                    />
                    <Label htmlFor={`auto-${point.id}`} className="text-xs">
                      {point.autoMode ? "On" : "Off"}
                    </Label>
                  </div>
                </div>
              </div>

              {point.lastIncident !== "None" && (
                <div className="mt-3 flex items-start gap-2 rounded-md bg-yellow-500/10 p-2 text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs">{point.lastIncident}</span>
                </div>
              )}

              {point.autoMode && (
                <div className="mt-3 flex items-start gap-2 rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                  <ToggleLeft className="h-4 w-4" />
                  <span className="text-xs">
                    AI is managing this {point.type} point. It will automatically adjust based on traffic conditions.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <h3 className="mb-2 font-medium">AI Recommendations</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 rounded-md bg-green-500/10 p-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <div className="text-xs">
                <p className="font-medium">Open additional exit X3 at 18:00</p>
                <p>
                  Expected crowd departure will increase after the main event. Opening X3 will reduce exit wait times by
                  approximately 40%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-md bg-yellow-500/10 p-2 text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="h-4 w-4" />
              <div className="text-xs">
                <p className="font-medium">Add staff to South Entry (E2)</p>
                <p>
                  Current wait time is above threshold (12 min). Adding 1 additional staff member could reduce wait time
                  to 7 min.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
