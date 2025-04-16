import type { Metadata } from "next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AIPredictionsHeader } from "@/components/ai-predictions/ai-predictions-header"
import { AIPredictionsOverview } from "@/components/ai-predictions/ai-predictions-overview"
import { PredictionModels } from "@/components/ai-predictions/prediction-models"
import { PredictionAccuracy } from "@/components/ai-predictions/prediction-accuracy"
import { CustomPredictionForm } from "@/components/ai-predictions/custom-prediction-form"
import { RecentPredictions } from "@/components/ai-predictions/recent-predictions"

export const metadata: Metadata = {
  title: "Arena Pulse - AI-Powered Predictions",
  description: "Advanced AI predictions for stadium crowd management and event planning",
}

export default function AIPredictionsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto">
          <AIPredictionsHeader />

          <div className="container mx-auto p-4 space-y-6">
            <AIPredictionsOverview />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PredictionModels />
              <PredictionAccuracy />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <CustomPredictionForm />
              </div>
              <div className="md:col-span-2">
                <RecentPredictions />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
