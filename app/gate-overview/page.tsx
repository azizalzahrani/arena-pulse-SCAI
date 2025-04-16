import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { GateOverviewHeader } from "@/components/gate-overview/gate-overview-header"
import { GateControlPanel } from "@/components/gate-overview/gate-control-panel"
import { GateTrafficAnalytics } from "@/components/gate-overview/gate-traffic-analytics"
import { GateAutomationSettings } from "@/components/gate-overview/gate-automation-settings"
import { GateSecurityStatus } from "@/components/gate-overview/gate-security-status"
import { StadiumBlueprintMap } from "@/components/gate-overview/stadium-blueprint-map"

export const metadata: Metadata = {
  title: "Arena Pulse - Gate Overview",
  description: "Gate management and control system for stadium operations",
}

export default function GateOverviewPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">
          <GateOverviewHeader />

          <div className="container mx-auto p-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StadiumBlueprintMap />
              </div>
              <div className="lg:col-span-1">
                <GateControlPanel />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <GateAutomationSettings />
              </div>
              <div className="lg:col-span-1">
                <GateTrafficAnalytics />
              </div>
              <div className="lg:col-span-1">
                <GateSecurityStatus />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
