"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Users, Calendar, Thermometer } from "lucide-react"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

export function AIPredictionsOverview() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("crowd")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("prediction-capabilities")}</CardTitle>
        <CardDescription>{t("explore-different-types")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crowd" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="crowd" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t("crowd-flow")}</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t("event-impact")}</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span className="hidden sm:inline">{t("weather-effects")}</span>
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">{t("anomaly-detection")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crowd" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title={t("crowd-density-prediction")}
                description={t("predict-crowd-density")}
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
              <FeatureCard
                title={t("flow-pattern-analysis")}
                description={t("analyze-movement-patterns")}
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
              <FeatureCard
                title={t("capacity-alerts")}
                description={t("receive-early-warnings")}
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title={t("prayer-time-impact")}
                description={t("predict-crowd-movement")}
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
              <FeatureCard
                title={t("match-events")}
                description={t("anticipate-crowd-reactions")}
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
              <FeatureCard
                title={t("post-event-planning")}
                description={t("optimize-exit-strategies")}
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title={t("temperature-impact")}
                description={t("predict-how-temperature")}
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
              <FeatureCard
                title={t("weather-alerts")}
                description={t("receive-advance-warnings")}
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
              <FeatureCard
                title={t("climate-control")}
                description={t("optimize-hvac-systems")}
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title={t("security-incidents")}
                description={t("detect-unusual-patterns")}
                icon={<Brain className="h-5 w-5 text-arena-teal" />}
              />
              <FeatureCard
                title={t("medical-emergencies")}
                description={t("identify-potential-medical")}
                icon={<Brain className="h-5 w-5 text-arena-teal" />}
              />
              <FeatureCard
                title={t("system-anomalies")}
                description={t("predict-potential-system")}
                icon={<Brain className="h-5 w-5 text-arena-teal" />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4 border">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
