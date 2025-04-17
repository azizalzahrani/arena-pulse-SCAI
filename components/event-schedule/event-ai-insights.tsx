"use client"

import { useState } from "react"
import { Sparkles, TrendingUp, Users, Clock, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EventAIInsights() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md flex items-center">
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          AI Insights
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Attendance Prediction</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Al-Hilal vs Al-Nassr match is predicted to reach 98% capacity based on historical data and social media
              engagement.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">Crowd Management</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Recommend opening Gates A and B 30 minutes earlier for the Saudi Cup to optimize entry flow and reduce
              congestion.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Scheduling Optimization</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Moving the Riyadh Season Concert to 8:30 PM could increase attendance by 12% based on traffic patterns and
              demographic analysis.
            </p>
          </div>

          <Button variant="outline" className="mt-2 w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
