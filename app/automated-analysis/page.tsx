import type { Metadata } from "next"
import { AnalysisProvider } from "@/contexts/analysis-context"
import { LiveVideoFeed } from "@/components/automated-analysis/live-video-feed"
import { SensorDataDashboard } from "@/components/automated-analysis/sensor-data-dashboard"
import { AnalyticsOverview } from "@/components/automated-analysis/analytics-overview"
import { AlertsPanel } from "@/components/automated-analysis/alerts-panel"

export const metadata: Metadata = {
  title: "Automated Analysis | Arena Pulse",
  description: "Real-time automated crowd analysis for arena management",
}

export default function AutomatedAnalysisPage() {
  return (
    <AnalysisProvider>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <LiveVideoFeed />
          <AnalyticsOverview />
          <SensorDataDashboard />
        </div>
        <AlertsPanel />
      </div>
    </AnalysisProvider>
  )
}

