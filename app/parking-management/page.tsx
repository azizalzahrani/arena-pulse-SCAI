import { ParkingManagementHeader } from "@/components/parking-management/parking-management-header"
import { ParkingCapacityOverview } from "@/components/parking-management/parking-capacity-overview"
import { ParkingAIInsights } from "@/components/parking-management/parking-ai-insights"
import { ParkingRecommendations } from "@/components/parking-management/parking-recommendations"
import { ParkingAnalytics } from "@/components/parking-management/parking-analytics"
import { ParkingHistoricalData } from "@/components/parking-management/parking-historical-data"
import { StadiumParkingMap } from "@/components/parking-management/stadium-parking-map"
import { ParkingStaffCommunication } from "@/components/parking-management/parking-staff-communication"
import { ParkingEntryExitOperations } from "@/components/parking-management/parking-entry-exit-operations"

export default function ParkingManagementPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ParkingManagementHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StadiumParkingMap />
        </div>
        <div>
          <ParkingCapacityOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ParkingEntryExitOperations />
        <ParkingStaffCommunication />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <ParkingAIInsights />
        </div>
        <div>
          <ParkingRecommendations />
        </div>
        <div>
          <ParkingAnalytics />
        </div>
      </div>

      <div>
        <ParkingHistoricalData />
      </div>
    </div>
  )
}
