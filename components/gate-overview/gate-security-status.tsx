"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldCheck, ShieldAlert, Clock, Eye, AlertTriangle } from "lucide-react"

interface SecurityAlert {
  id: string
  gate: string
  time: string
  description: string
  severity: "low" | "medium" | "high"
  status: "active" | "investigating" | "resolved"
}

const securityAlerts: SecurityAlert[] = [
  {
    id: "1",
    gate: "North Main Gate",
    time: "5 min ago",
    description: "Unauthorized access attempt detected",
    severity: "medium",
    status: "investigating",
  },
  {
    id: "2",
    gate: "East Service Gate",
    time: "15 min ago",
    description: "Suspicious package reported near entrance",
    severity: "high",
    status: "active",
  },
  {
    id: "3",
    gate: "South Family Gate",
    time: "30 min ago",
    description: "Tailgating incident detected",
    severity: "low",
    status: "resolved",
  },
  {
    id: "4",
    gate: "West Main Gate",
    time: "45 min ago",
    description: "ID verification system temporary failure",
    severity: "medium",
    status: "resolved",
  },
  {
    id: "5",
    gate: "North VIP Gate",
    time: "1 hour ago",
    description: "Unauthorized vehicle in restricted area",
    severity: "high",
    status: "investigating",
  },
]

export function GateSecurityStatus() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(securityAlerts)

  const getSeverityBadge = (severity: SecurityAlert["severity"]) => {
    switch (severity) {
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "high":
        return <Badge className="bg-red-500">High</Badge>
    }
  }

  const getStatusBadge = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-500">Active</Badge>
      case "investigating":
        return <Badge className="bg-yellow-500">Investigating</Badge>
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Resolved
          </Badge>
        )
    }
  }

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            status: "resolved",
          }
        }
        return alert
      }),
    )
  }

  const activeAlerts = alerts.filter((alert) => alert.status !== "resolved")

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Security Status</CardTitle>
            <p className="text-sm text-muted-foreground">Gate security alerts and incidents</p>
          </div>
          <div className="flex items-center gap-2">
            {activeAlerts.length > 0 ? (
              <Badge className="bg-red-500">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                {activeAlerts.length} Active
              </Badge>
            ) : (
              <Badge className="bg-green-500">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                All Clear
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 pb-4 space-y-3">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <ShieldCheck className="h-8 w-8 mb-2 opacity-50" />
                <p>No security alerts</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {alert.severity === "high" ? (
                        <ShieldAlert className="h-5 w-5 mt-0.5 text-red-600" />
                      ) : (
                        <ShieldCheck className="h-5 w-5 mt-0.5 text-yellow-500" />
                      )}
                      <div>
                        <h4 className="font-medium">{alert.gate}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getStatusBadge(alert.status)}
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{alert.time}</span>
                  </div>

                  {alert.status !== "resolved" && (
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        Mark Resolved
                      </Button>
                      <Button size="sm" className="h-8 text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View Cameras
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">Security Level:</span>{" "}
              {activeAlerts.some((a) => a.severity === "high") ? (
                <span className="text-red-600 font-medium">Elevated</span>
              ) : activeAlerts.length > 0 ? (
                <span className="text-yellow-600 font-medium">Cautious</span>
              ) : (
                <span className="text-green-600 font-medium">Normal</span>
              )}
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Security Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
