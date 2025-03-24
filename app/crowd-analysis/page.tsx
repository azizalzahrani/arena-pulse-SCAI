import type { Metadata } from "next"
import CrowdAnalysisHeader from "@/components/crowd-analysis/crowd-analysis-header"
import CrowdHeatmap from "@/components/crowd-analysis/crowd-heatmap"
import CrowdFlowPatterns from "@/components/crowd-analysis/crowd-flow-patterns"
import CongestionPoints from "@/components/crowd-analysis/congestion-points"
import ZoneAnalysis from "@/components/crowd-analysis/zone-analysis"
import CrowdInsights from "@/components/crowd-analysis/crowd-insights"
import AISolutionsColumn from "@/components/dashboard/ai-solutions-column"

export const metadata: Metadata = {
  title: "Crowd Analysis | Arena Pulse",
  description: "Detailed crowd analysis and management for sports venues",
}

export default function CrowdAnalysisPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <CrowdAnalysisHeader />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CrowdHeatmap />
            <CrowdFlowPatterns />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <CongestionPoints />
            <ZoneAnalysis className="lg:col-span-2" />
          </div>
          <CrowdInsights />
        </div>
        <AISolutionsColumn />
      </div>
    </div>
  )
}

