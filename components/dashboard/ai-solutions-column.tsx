"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, BrainCircuit, Lightbulb, ArrowRight } from "lucide-react"
import { useNotifications } from "@/components/notifications/notifications-provider"
import { formatDistanceToNow } from "date-fns"
import { useLanguage } from "@/lib/language-context"

// Define the AI solution types
type SolutionLevel = "critical" | "warning" | "suggestion" | "success"
type AISolution = {
  id: string
  title: string
  description: string
  level: SolutionLevel
  timestamp: Date
  actions?: string[]
  applied?: boolean
}

export default function AISolutionsColumn() {
  const { notifications } = useNotifications()
  const [solutions, setSolutions] = useState<AISolution[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const { t } = useLanguage()

  // Generate initial AI solutions
  useEffect(() => {
    const initialSolutions: AISolution[] = [
      {
        id: "sol1",
        title: "Critical Congestion at Gate 3",
        description: "Crowd density exceeds safety threshold. Immediate action required.",
        level: "critical",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        actions: [
          "Open additional entry lanes",
          "Redirect fans to Gates 2 and 4",
          "Deploy 5 additional security staff",
        ],
      },
      {
        id: "sol2",
        title: "Staff Reallocation Needed",
        description: "East Concourse is understaffed while South Concourse has excess staff.",
        level: "warning",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        actions: [
          "Move 3 staff members from South to East Concourse",
          "Prioritize concession stands with longest queues",
        ],
      },
      {
        id: "sol3",
        title: "Optimize Ticket Scanning",
        description: "Current scanning process is causing delays at peak entry times.",
        level: "suggestion",
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        actions: ["Implement express entry lanes for mobile tickets", "Add 2 additional scanners at Gate 2"],
      },
      {
        id: "sol4",
        title: "VIP Area Optimization Complete",
        description: "VIP area flow has been optimized based on previous recommendations.",
        level: "success",
        timestamp: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
        applied: true,
      },
    ]

    setSolutions(initialSolutions)

    // Simulate receiving new AI solutions
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        // 20% chance every minute
        const newSolution: AISolution = {
          id: `sol-${Date.now()}`,
          title: "New Bottleneck Detected",
          description: "Potential bottleneck forming at North Concourse. Proactive measures recommended.",
          level: Math.random() > 0.7 ? "critical" : Math.random() > 0.4 ? "warning" : "suggestion",
          timestamp: new Date(),
          actions: [
            "Deploy 2 staff members to direct traffic flow",
            "Open additional concession stands to distribute crowd",
          ],
        }

        setSolutions((prev) => [newSolution, ...prev])
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  // Apply a solution (mark as applied)
  const applySolution = (id: string) => {
    setSolutions((prev) =>
      prev.map((solution) => (solution.id === id ? { ...solution, applied: true, level: "success" } : solution)),
    )
  }

  // Filter solutions based on active tab
  const filteredSolutions = solutions.filter((solution) => {
    if (activeTab === "all") return true
    if (activeTab === "critical") return solution.level === "critical"
    if (activeTab === "warnings") return solution.level === "warning"
    if (activeTab === "suggestions") return solution.level === "suggestion"
    if (activeTab === "applied") return solution.applied
    return true
  })

  // Get icon based on solution level
  const getSolutionIcon = (level: SolutionLevel) => {
    switch (level) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
  }

  // Get badge variant based on solution level
  const getBadgeVariant = (level: SolutionLevel): "destructive" | "outline" | "secondary" | "default" => {
    switch (level) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      case "suggestion":
        return "secondary"
      case "success":
        return "outline"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="h-[calc(100vh-13rem)] overflow-hidden flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <CardTitle>{t("AI Solutions")}</CardTitle>
            </div>
            <Badge variant="outline" className="font-normal">
              {solutions.filter((s) => !s.applied).length} {t("Active")}
            </Badge>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">{t("All")}</TabsTrigger>
              <TabsTrigger value="critical" className="text-destructive">
                {t("Critical")}
              </TabsTrigger>
              <TabsTrigger value="warnings">{t("Warnings")}</TabsTrigger>
              <TabsTrigger value="suggestions">{t("Suggestions")}</TabsTrigger>
              <TabsTrigger value="applied">{t("Applied")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pb-0">
          <div className="space-y-4 pr-2">
            {filteredSolutions.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-center">
                <BrainCircuit className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">{t("No notifications to display")}</p>
              </div>
            ) : (
              filteredSolutions.map((solution) => (
                <div
                  key={solution.id}
                  className={`rounded-lg border p-4 ${
                    solution.level === "critical" && !solution.applied ? "border-destructive/50 bg-destructive/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getSolutionIcon(solution.level)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{solution.title}</h3>
                        <Badge variant={getBadgeVariant(solution.level)}>
                          {solution.applied ? t("Applied") : t(solution.level)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{solution.description}</p>

                      {solution.actions && !solution.applied && (
                        <div className="mt-3">
                          <h4 className="text-xs font-medium uppercase text-muted-foreground">
                            {t("Recommended Actions")}
                          </h4>
                          <ul className="mt-1 space-y-1">
                            {solution.actions.map((action, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <ArrowRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                            onClick={() => applySolution(solution.id)}
                          >
                            {t("Apply Solution")}
                          </Button>
                        </div>
                      )}

                      <div className="mt-2 text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(solution.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

