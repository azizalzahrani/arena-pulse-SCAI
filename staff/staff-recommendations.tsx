"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, TrendingUp, AlertCircle, Clock, Users } from "lucide-react"

// Mock data for staff recommendations
const staffRecommendationsData = [
  {
    id: "1",
    title: "Security Staff Reallocation",
    description: "King Fahd Stadium is overstaffed by 15 security personnel for upcoming events.",
    impact: "High",
    category: "Staffing Efficiency",
    recommendation:
      "Reassign 15 security staff from King Fahd Stadium to King Abdullah Sports City for the upcoming international match.",
    potentialSavings: 12500,
    implementationDifficulty: 25,
    status: "Pending",
  },
  {
    id: "2",
    title: "Cross-Training Program",
    description: "Staff specialization limits flexibility during peak periods.",
    impact: "Medium",
    category: "Training",
    recommendation:
      "Implement cross-training program for 30% of security staff to handle concessions during peak periods.",
    potentialSavings: 28000,
    implementationDifficulty: 60,
    status: "Pending",
  },
  {
    id: "3",
    title: "Shift Optimization",
    description: "Current shift patterns don't align with event attendance patterns.",
    impact: "High",
    category: "Scheduling",
    recommendation: "Adjust shift start times to better align with peak attendance periods, reducing overtime by 15%.",
    potentialSavings: 35000,
    implementationDifficulty: 45,
    status: "Pending",
  },
  {
    id: "4",
    title: "Staff Retention Program",
    description: "High turnover rate among concessions staff increases training costs.",
    impact: "Medium",
    category: "Retention",
    recommendation: "Implement incentive program for concessions staff with performance-based bonuses.",
    potentialSavings: 42000,
    implementationDifficulty: 55,
    status: "Pending",
  },
]

export default function StaffRecommendations() {
  const [implemented, setImplemented] = useState<string[]>([])

  // Handle implementation
  const handleImplement = (id: string) => {
    if (!implemented.includes(id)) {
      setImplemented([...implemented, id])
    }
  }

  // Get impact badge
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge variant="destructive">High Impact</Badge>
      case "Medium":
        return <Badge>Medium Impact</Badge>
      case "Low":
        return <Badge variant="secondary">Low Impact</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Staffing Efficiency":
        return <Users className="h-5 w-5 text-blue-500" />
      case "Training":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "Scheduling":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "Retention":
        return <AlertCircle className="h-5 w-5 text-purple-500" />
      default:
        return <BrainCircuit className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Staff Recommendations</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Badge variant="outline">{staffRecommendationsData.length - implemented.length} Pending</Badge>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-auto">
        <div className="space-y-4">
          {staffRecommendationsData.map((rec) => (
            <div
              key={rec.id}
              className={`rounded-lg border p-4 ${
                rec.impact === "High" && !implemented.includes(rec.id) ? "border-destructive/50 bg-destructive/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {getCategoryIcon(rec.category)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{rec.title}</h3>
                    {getImpactBadge(rec.impact)}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>

                  <div className="mt-3 rounded-md bg-muted/50 p-2 text-sm">
                    <strong>Recommendation:</strong> {rec.recommendation}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Potential Annual Savings</p>
                      <p className="font-medium">SAR {rec.potentialSavings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Implementation Difficulty</p>
                      <div className="flex items-center gap-2">
                        <Progress value={rec.implementationDifficulty} className="h-2" />
                        <span className="text-xs">{rec.implementationDifficulty}%</span>
                      </div>
                    </div>
                  </div>

                  {!implemented.includes(rec.id) ? (
                    <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => handleImplement(rec.id)}>
                      Implement Recommendation
                    </Button>
                  ) : (
                    <Badge variant="outline" className="mt-3 w-full justify-center bg-green-500/10 text-green-500">
                      Implemented
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

