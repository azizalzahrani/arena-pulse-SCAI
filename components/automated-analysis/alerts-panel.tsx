"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, InfoIcon, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAnalysisContext } from "@/contexts/analysis-context"

// Alert types
type AlertType = "critical" | "warning" | "info" | "resolved"

// Alert interface
interface Alert {
  id: string
  type: AlertType
  message: string
  location: string
  timestamp: Date
  isNew: boolean
}

export function AlertsPanel() {
  const { analysisData } = useAnalysisContext()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const lastAlertTimeRef = useRef(Date.now())
  const prevAnalysisDataRef = useRef(analysisData)

  // Generate alerts based on analysis data
  useEffect(() => {
    // Limit alert generation frequency
    const now = Date.now()
    if (now - lastAlertTimeRef.current < 10000) {
      prevAnalysisDataRef.current = analysisData
      return
    }

    const prevData = prevAnalysisDataRef.current
    const newAlerts: Alert[] = []

    // Check for crowd density alerts
    if (analysisData.crowdDensity > 4) {
      newAlerts.push({
        id: `density-critical-${Date.now()}`,
        type: "critical",
        message: `Dangerous crowd density detected: ${analysisData.crowdDensity.toFixed(1)} p/m²`,
        location: analysisData.location || "Unknown",
        timestamp: new Date(),
        isNew: true,
      })
    } else if (analysisData.crowdDensity > 3 && prevData.crowdDensity <= 3) {
      newAlerts.push({
        id: `density-warning-${Date.now()}`,
        type: "warning",
        message: `High crowd density detected: ${analysisData.crowdDensity.toFixed(1)} p/m²`,
        location: analysisData.location || "Unknown",
        timestamp: new Date(),
        isNew: true,
      })
    } else if (analysisData.crowdDensity < 3 && prevData.crowdDensity >= 3) {
      newAlerts.push({
        id: `density-resolved-${Date.now()}`,
        type: "resolved",
        message: `Crowd density returned to normal: ${analysisData.crowdDensity.toFixed(1)} p/m²`,
        location: analysisData.location || "Unknown",
        timestamp: new Date(),
        isNew: true,
      })
    }

    // Check for flow rate alerts
    if (analysisData.flowRate < 15 && prevData.flowRate >= 15) {
      newAlerts.push({
        id: `flow-warning-${Date.now()}`,
        type: "warning",
        message: `Low flow rate detected: ${analysisData.flowRate.toFixed(1)} p/min`,
        location: analysisData.location || "Unknown",
        timestamp: new Date(),
        isNew: true,
      })
    }

    // Check for bottleneck alerts
    if (analysisData.bottleneckCount > prevData.bottleneckCount) {
      newAlerts.push({
        id: `bottleneck-warning-${Date.now()}`,
        type: "warning",
        message: `New bottleneck formed: ${analysisData.bottleneckCount} total`,
        location: analysisData.location || "Unknown",
        timestamp: new Date(),
        isNew: true,
      })
    }

    // Add informational alert occasionally
    if (Math.random() < 0.3 && newAlerts.length === 0) {
      newAlerts.push({
        id: `info-${Date.now()}`,
        type: "info",
        message: "All systems operating normally",
        location: "System",
        timestamp: new Date(),
        isNew: true,
      })
    }

    // Add new alerts to the list
    if (newAlerts.length > 0) {
      setAlerts((prev) => {
        // Keep only the 10 most recent alerts
        const combined = [...newAlerts, ...prev].slice(0, 10)

        // Mark older alerts as not new
        return combined.map((alert, index) => (index >= newAlerts.length ? { ...alert, isNew: false } : alert))
      })

      lastAlertTimeRef.current = now
    }

    prevAnalysisDataRef.current = analysisData
  }, [analysisData])

  // Get alert icon based on type
  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
  }

  // Get alert background color based on type
  const getAlertBg = (type: AlertType) => {
    switch (type) {
      case "critical":
        return "bg-red-500/10"
      case "warning":
        return "bg-yellow-500/10"
      case "info":
        return "bg-blue-500/10"
      case "resolved":
        return "bg-green-500/10"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Alert System</CardTitle>
          {alerts.some((a) => a.isNew) && (
            <Badge variant="destructive" className="ml-2">
              New Alerts
            </Badge>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Real-time alerts based on crowd conditions and anomaly detection.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-2 rounded-md p-2 ${getAlertBg(alert.type)} ${
                  alert.isNew ? "animate-pulse" : ""
                }`}
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{alert.message}</p>
                    {alert.isNew && <Badge variant="outline">New</Badge>}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{alert.location}</span>
                    <span>{alert.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
              <p>No alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

