import { ParkingManagementHeader } from "@/components/parking-management/parking-management-header"
import { StadiumParkingMap } from "@/components/parking-management/stadium-parking-map"
import { ParkingAnalytics } from "@/components/parking-management/parking-analytics"
import { ParkingAIInsights } from "@/components/parking-management/parking-ai-insights"
import { ParkingRecommendations } from "@/components/parking-management/parking-recommendations"
import { ParkingCapacityOverview } from "@/components/parking-management/parking-capacity-overview"
import { ParkingHistoricalData } from "@/components/parking-management/parking-historical-data"

export default function ParkingManagementPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ParkingManagementHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StadiumParkingMap />
        </div>
        <div className="flex flex-col gap-6">
          <ParkingCapacityOverview />
          <ParkingAIInsights />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ParkingAnalytics />
        <ParkingRecommendations />
      </div>

      <ParkingHistoricalData />
    </div>
  )
}
