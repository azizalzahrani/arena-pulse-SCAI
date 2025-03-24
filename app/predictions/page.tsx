"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionEngine } from "@/components/predictions/prediction-engine"
import { ScenarioPlanner } from "@/components/predictions/scenario-planner"
import { AnalysisProvider } from "@/contexts/analysis-context"

export default function PredictionsPage() {
  return (
    <AnalysisProvider>
      <div className="container space-y-6 p-4 md:p-6 pt-0">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">AI Predictions</h2>
          <p className="text-muted-foreground">
            Use AI to predict crowd behavior and plan for different scenarios based on automated analysis data
          </p>
        </div>

        <Tabs defaultValue="predictions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="predictions">Crowd Predictions</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          </TabsList>
          <TabsContent value="predictions" className="space-y-4">
            <PredictionEngine />
          </TabsContent>
          <TabsContent value="scenarios" className="space-y-4">
            <ScenarioPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </AnalysisProvider>
  )
}

