"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, GraduationCap, Award, CheckCircle2 } from "lucide-react"

// Mock data for training needs analysis
const trainingNeedsData = {
  Security: [
    { skill: "Crowd Control", currentLevel: 75, requiredLevel: 90, gap: 15, priority: "high" },
    { skill: "Emergency Response", currentLevel: 82, requiredLevel: 95, gap: 13, priority: "high" },
    { skill: "Conflict Resolution", currentLevel: 68, requiredLevel: 85, gap: 17, priority: "high" },
    { skill: "First Aid", currentLevel: 70, requiredLevel: 80, gap: 10, priority: "medium" },
    { skill: "Communication", currentLevel: 72, requiredLevel: 80, gap: 8, priority: "medium" },
  ],
  Concessions: [
    { skill: "Food Safety", currentLevel: 85, requiredLevel: 95, gap: 10, priority: "high" },
    { skill: "Customer Service", currentLevel: 72, requiredLevel: 85, gap: 13, priority: "high" },
    { skill: "POS System Operation", currentLevel: 78, requiredLevel: 85, gap: 7, priority: "medium" },
    { skill: "Inventory Management", currentLevel: 65, requiredLevel: 75, gap: 10, priority: "medium" },
    { skill: "Upselling Techniques", currentLevel: 60, requiredLevel: 75, gap: 15, priority: "medium" },
  ],
  Ticketing: [
    { skill: "Ticketing Software", currentLevel: 82, requiredLevel: 90, gap: 8, priority: "medium" },
    { skill: "Customer Service", currentLevel: 78, requiredLevel: 90, gap: 12, priority: "high" },
    { skill: "Problem Solving", currentLevel: 75, requiredLevel: 85, gap: 10, priority: "medium" },
    { skill: "Fraud Detection", currentLevel: 70, requiredLevel: 85, gap: 15, priority: "high" },
    { skill: "Communication", currentLevel: 80, requiredLevel: 85, gap: 5, priority: "low" },
  ],
}

// Training programs
const trainingPrograms = [
  {
    id: "1",
    name: "Advanced Crowd Control",
    duration: "2 days",
    cost: 1200,
    targetSkills: ["Crowd Control", "Conflict Resolution"],
  },
  {
    id: "2",
    name: "Emergency Response Training",
    duration: "3 days",
    cost: 1800,
    targetSkills: ["Emergency Response", "First Aid"],
  },
  {
    id: "3",
    name: "Customer Excellence",
    duration: "1 day",
    cost: 800,
    targetSkills: ["Customer Service", "Communication"],
  },
  {
    id: "4",
    name: "Food Safety Certification",
    duration: "2 days",
    cost: 1500,
    targetSkills: ["Food Safety", "Inventory Management"],
  },
  {
    id: "5",
    name: "Ticketing System Masterclass",
    duration: "1 day",
    cost: 900,
    targetSkills: ["Ticketing Software", "Fraud Detection"],
  },
]

export default function StaffTrainingAnalysis() {
  const [selectedRole, setSelectedRole] = useState("Security")
  const [scheduledTraining, setScheduledTraining] = useState<string[]>([])

  const trainingNeeds = trainingNeedsData[selectedRole]

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge>Medium Priority</Badge>
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get recommended training programs for selected role
  const getRecommendedPrograms = () => {
    const highPrioritySkills = trainingNeeds.filter((need) => need.priority === "high").map((need) => need.skill)

    return trainingPrograms.filter((program) =>
      program.targetSkills.some((skill) => highPrioritySkills.includes(skill)),
    )
  }

  // Handle scheduling training
  const handleScheduleTraining = (id: string) => {
    if (!scheduledTraining.includes(id)) {
      setScheduledTraining([...scheduledTraining, id])
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>AI Training Analysis</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Select defaultValue={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(trainingNeedsData).map((role) => (
              <SelectItem key={role} value={role}>
                {role} Staff
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Skill Gap Analysis for {selectedRole} Staff</h3>
            <div className="mt-2 space-y-3">
              {trainingNeeds.map((need) => (
                <div key={need.skill} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{need.skill}</span>
                      {getPriorityBadge(need.priority)}
                    </div>
                    <span className="text-sm">
                      Gap: <span className="font-medium text-destructive">{need.gap}%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={need.currentLevel}
                      max={need.requiredLevel}
                      className="h-2"
                      indicatorClassName={
                        need.gap > 15
                          ? "bg-destructive"
                          : need.gap > 10
                            ? "bg-amber-500"
                            : need.gap > 5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      {need.currentLevel}% / {need.requiredLevel}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-medium">Recommended Training Programs</h3>
            </div>
            <div className="mt-2 space-y-3">
              {getRecommendedPrograms().map((program) => (
                <div key={program.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{program.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Duration: {program.duration} • Cost: SAR {program.cost.toLocaleString()}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {program.targetSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {!scheduledTraining.includes(program.id) ? (
                      <Button variant="outline" size="sm" onClick={() => handleScheduleTraining(program.id)}>
                        Schedule
                      </Button>
                    ) : (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Scheduled
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {getRecommendedPrograms().length === 0 && (
                <p className="text-sm text-muted-foreground">No high priority training programs needed at this time.</p>
              )}
            </div>
          </div>

          <div className="rounded-md bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-medium">AI Training Insights</h3>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  {selectedRole} staff would benefit most from training in{" "}
                  {trainingNeeds.find((n) => n.priority === "high")?.skill}.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Group training sessions could reduce costs by 25% compared to individual training.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Based on upcoming events, schedule training during the low season in June-July for minimal disruption.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

