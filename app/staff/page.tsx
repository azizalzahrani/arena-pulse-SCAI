import type { Metadata } from "next"
import StaffHeader from "@/components/staff/staff-header"
import StaffOverview from "@/components/staff/staff-overview"
import StaffAllocation from "@/components/staff/staff-allocation"
import StaffPerformance from "@/components/staff/staff-performance"
import StaffScheduler from "@/components/staff/staff-scheduler"
import StaffRecommendations from "@/components/staff/staff-recommendations"
import StaffTrainingAnalysis from "@/components/staff/staff-training-analysis"
import AISolutionsColumn from "@/components/dashboard/ai-solutions-column"

export const metadata: Metadata = {
  title: "Staff Management | Arena Pulse",
  description: "AI-powered staff management and optimization for sports venues",
}

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <StaffHeader />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <StaffOverview />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StaffAllocation />
            <StaffPerformance />
          </div>
          <StaffScheduler />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StaffRecommendations />
            <StaffTrainingAnalysis />
          </div>
        </div>
        <AISolutionsColumn />
      </div>
    </div>
  )
}

