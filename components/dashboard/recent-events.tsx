"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockDashboardData } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"

export default function RecentEvents() {
  const events = mockDashboardData.recentEvents
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Recent Events")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{event.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={event.status === t("Completed") ? "outline" : "secondary"}>{t(event.status)}</Badge>
                <span className="text-sm font-medium">
                  {event.attendance.toLocaleString()} / {event.capacity.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

