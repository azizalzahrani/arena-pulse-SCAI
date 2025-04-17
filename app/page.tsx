import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StadiumMetrics } from "@/components/dashboard/stadium-metrics"
import { CrowdDensityHeatmap } from "@/components/dashboard/crowd-density-heatmap"
import { GateStatus } from "@/components/dashboard/gate-status"
import { CrowdFlowPrediction } from "@/components/dashboard/crowd-flow-prediction"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { PredictiveInsights } from "@/components/dashboard/predictive-insights"

export const metadata: Metadata = {
  title: "Arena Pulse - Dashboard",
  description: "Real-time stadium management and monitoring system",
}

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto">
      <DashboardHeader />

      <div className="container mx-auto p-4 space-y-6">
        <StadiumMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CrowdDensityHeatmap />
          </div>
          <div className="lg:col-span-1">
            <AlertsPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <GateStatus />
          </div>
          <div className="lg:col-span-1">
            <CrowdFlowPrediction />
          </div>
          <div className="lg:col-span-1">
            <PredictiveInsights />
          </div>
        </div>
      </div>
    </main>
  )
}
