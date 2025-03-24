"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Users, Ticket, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useNotifications } from "@/components/notifications/notifications-provider"
import { mockDashboardData } from "@/lib/mock-data"
import { fetchDashboardOverview } from "@/lib/api-service"
import { useLanguage } from "@/lib/language-context"

export default function OverviewCards() {
  const [data, setData] = useState(mockDashboardData.overview)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const { t } = useLanguage()

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        setIsLoading(true)
        // Get mock data directly
        const overviewData = await fetchDashboardOverview()

        if (isMounted) {
          setData(overviewData)

          // Simulate data updates
          const interval = setInterval(async () => {
            try {
              // Simulate a random change in crowd density
              const updatedData = { ...overviewData }
              const randomChange = Math.random() * 0.2 - 0.1 // Random change between -0.1 and 0.1
              updatedData.crowdDensity.value = Number.parseFloat(
                (updatedData.crowdDensity.value + randomChange).toFixed(1),
              )

              // Check for significant changes that might require notifications
              if (updatedData.crowdDensity.value > data.crowdDensity.value * 1.03) {
                addNotification({
                  id: Date.now().toString(),
                  title: "High Crowd Density Alert",
                  description: `Crowd density has increased to ${updatedData.crowdDensity.value} people/m². Check King Fahd Stadium Gate 3 area.`,
                  type: "warning",
                  timestamp: new Date(),
                })

                toast({
                  title: "High Crowd Density Alert",
                  description: "Crowd density has increased significantly at King Fahd Stadium Gate 3.",
                  variant: "destructive",
                })
              }

              if (isMounted) {
                setData(updatedData)
              }
            } catch (error) {
              console.error("Failed to update overview data:", error)
            }
          }, 30000) // Update every 30 seconds

          return () => clearInterval(interval)
        }
      } catch (error) {
        console.error("Failed to load overview data:", error)

        if (isMounted) {
          // Use mock data as a fallback
          setData(mockDashboardData.overview)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [addNotification, toast])

  // Add a loading state to the component
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse bg-muted rounded"></div>
              <div className="h-4 w-4 animate-pulse bg-muted rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
              <div className="h-4 w-20 animate-pulse bg-muted rounded mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("Current Attendance")}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.currentAttendance.value.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {data.currentAttendance.change > 0 ? "+" : ""}
            {data.currentAttendance.change}% {t("from last hour")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("Ticket Sales")}</CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.ticketSales.value.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {data.ticketSales.change > 0 ? "+" : ""}
            {data.ticketSales.change}% {t("from yesterday")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("Crowd Density")}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.crowdDensity.value} {t("people/m²")}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.crowdDensity.change > 0 ? "+" : ""}
            {data.crowdDensity.change}% {t("from last hour")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("Bottleneck Alerts")}</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.bottleneckAlerts.value}</div>
          <p className="text-xs text-muted-foreground">
            {data.bottleneckAlerts.change > 0 ? "+" : ""}
            {data.bottleneckAlerts.change} {t("from last hour")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

