import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { ParkingManagementHeader } from "@/components/parking-management/parking-management-header"
import { ParkingOverview } from "@/components/parking-management/parking-overview"
import { ParkingMap } from "@/components/parking-management/parking-map"
import { ParkingAnalytics } from "@/components/parking-management/parking-analytics"
import { ParkingAIAssistant } from "@/components/parking-management/parking-ai-assistant"
import { ParkingCapacityMonitor } from "@/components/parking-management/parking-capacity-monitor"
import { SmartRouting } from "@/components/parking-management/smart-routing"
import { ParkingReservations } from "@/components/parking-management/parking-reservations"

export const metadata: Metadata = {
  title: "Arena Pulse - Parking Management",
  description: "Parking management and monitoring for stadium operations",
}

export default function ParkingManagementPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">
          <ParkingManagementHeader />

          <div className="container mx-auto p-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ParkingOverview />
              </div>
              <div className="lg:col-span-2">
                <ParkingMap />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ParkingAnalytics />
              </div>
              <div className="lg:col-span-1">
                <ParkingAIAssistant />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ParkingCapacityMonitor />
              </div>
              <div>
                <SmartRouting />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ParkingReservations />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
