"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

interface Alert {
  id: string
  title: string
  location: string
  time: string
  priority: "low" | "medium" | "high" | "critical"
  type: "security" | "medical" | "other"
  status: "new" | "acknowledged" | "resolved"
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Unauthorized access detected at Gate 12",
    location: "Gate 12",
    time: "5 minutes ago",
    priority: "high",
    type: "security",
    status: "new",
  },
  {
    id: "2",
    title: "Suspicious package reported",
    location: "East Entrance",
    time: "8 minutes ago",
    priority: "critical",
    type: "security",
    status: "new",
  },
  {
    id: "3",
    title: "Medical assistance requested",
    location: "Section B, Row 23",
    time: "12 minutes ago",
    priority: "medium",
    type: "medical",
    status: "acknowledged",
  },
  {
    id: "4",
    title: "Spill in concession area",
    location: "North Concourse",
    time: "15 minutes ago",
    priority: "low",
    type: "other",
    status: "acknowledged",
  },
  {
    id: "5",
    title: "Crowd congestion at entrance",
    location: "South Gate",
    time: "20 minutes ago",
    priority: "medium",
    type: "security",
    status: "acknowledged",
  },
]

export function AlertsPanel() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [alertsList, setAlertsList] = useState(alerts)

  const filteredAlerts = activeTab === "all" ? alertsList : alertsList.filter((alert) => alert.type === activeTab)

  const handleAcknowledge = (id: string) => {
    setAlertsList((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: "acknowledged" } : alert)))
  }

  const handleRespond = (id: string) => {
    // In a real app, this would open a response dialog
    console.log(`Responding to alert ${id}`)
  }

  const handleEscalate = (id: string) => {
    // In a real app, this would escalate the alert
    console.log(`Escalating alert ${id}`)
  }

  const getPriorityColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100"
    }
  }

  const getStatusBadge = (status: Alert["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-500">New</Badge>
      case "acknowledged":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Acknowledged
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Resolved
          </Badge>
        )
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{t("alerts")}</CardTitle>
            <Badge className="bg-red-500">{alertsList.filter((a) => a.status === "new").length} New</Badge>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="all" className="text-xs">
                {t("all")}
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs">
                Security
              </TabsTrigger>
              <TabsTrigger value="medical" className="text-xs">
                Medical
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-sm text-muted-foreground">{t("security-and-system-notifications")}</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 pb-4 space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                <p>No alerts in this category</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        className={`h-5 w-5 mt-0.5 ${alert.priority === "critical" ? "text-red-600" : "text-orange-500"}`}
                      />
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.location}</p>
                      </div>
                    </div>
                    {getStatusBadge(alert.status)}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{alert.time}</span>
                    {alert.priority === "high" || alert.priority === "critical" ? (
                      <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                        {alert.priority === "critical" ? "CRITICAL" : "HIGH"} priority
                      </Badge>
                    ) : null}
                  </div>

                  {alert.status === "new" && (
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                      <Button size="sm" className="h-8 text-xs" onClick={() => handleRespond(alert.id)}>
                        Respond
                      </Button>
                      {alert.priority === "critical" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 text-xs"
                          onClick={() => handleEscalate(alert.id)}
                        >
                          Escalate
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
