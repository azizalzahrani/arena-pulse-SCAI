"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Users, Calendar, Thermometer } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"

export function AIPredictionsOverview() {
  const [activeTab, setActiveTab] = useState("crowd")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Prediction Capabilities</CardTitle>
            <CardDescription>Explore the different types of predictions our AI system can generate</CardDescription>
          </div>
          <AIBadge />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crowd" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="crowd" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Crowd Flow</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Event Impact</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span className="hidden sm:inline">Weather Effects</span>
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Anomaly Detection</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crowd" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title="Crowd Density Prediction"
                description="Predict crowd density in different stadium sections up to 2 hours in advance."
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
              <FeatureCard
                title="Flow Pattern Analysis"
                description="Analyze movement patterns to optimize staff placement and gate operations."
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
              <FeatureCard
                title="Capacity Alerts"
                description="Receive early warnings when sections are predicted to approach capacity."
                icon={<Users className="h-5 w-5 text-arena-purple" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title="Prayer Time Impact"
                description="Predict crowd movement during prayer times to manage flow and services."
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
              <FeatureCard
                title="Match Events"
                description="Anticipate crowd reactions to goals, halftime, and match conclusion."
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
              <FeatureCard
                title="Post-Event Planning"
                description="Optimize exit strategies based on predicted crowd dispersal patterns."
                icon={<Calendar className="h-5 w-5 text-arena-blue" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title="Temperature Impact"
                description="Predict how temperature changes will affect crowd behavior and comfort."
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
              <FeatureCard
                title="Weather Alerts"
                description="Receive advance warnings about weather conditions affecting operations."
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
              <FeatureCard
                title="Climate Control"
                description="Optimize HVAC systems based on predicted attendance and weather."
                icon={<Thermometer className="h-5 w-5 text-arena-orange" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                title="Security Incidents"
                description="Detect unusual patterns that may indicate security concerns."
                icon={<Brain className="h-5 w-5 text-arena-teal" />}
              />
              <FeatureCard
                title="Medical Emergencies"
                description="Identify potential medical incident hotspots before they occur."
                icon={<Brain className="h-5 w-5 text-arena-teal" />}
              />
              <FeatureCard
                title="System Anomalies"
                description="Predict potential system failures or performance issues."
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
