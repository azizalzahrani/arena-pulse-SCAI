import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCrowdAnalysisData } from "@/lib/mock-data"
import { AlertCircle, TrendingUp, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CrowdInsights() {
  const { insights } = mockCrowdAnalysisData

  // Helper function to get icon based on severity
  const getInsightIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--density-critical))/20] text-[hsl(var(--density-critical))]">
            <AlertCircle className="h-4 w-4" />
          </div>
        )
      case "High":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--density-high))/20] text-[hsl(var(--density-high))]">
            <TrendingUp className="h-4 w-4" />
          </div>
        )
      case "Medium":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--density-medium))/20] text-[hsl(var(--density-medium))]">
            <Users className="h-4 w-4" />
          </div>
        )
      case "Low":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--density-low))/20] text-[hsl(var(--density-low))]">
            <Clock className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
          </div>
        )
    }
  }

  // Helper function to get badge variant based on severity
  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Crowd Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-4">
              {getInsightIcon(insight.severity)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <Badge variant={getBadgeVariant(insight.severity)}>{insight.severity}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>

                {insight.recommendations && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                      {insight.recommendations.map((rec, recIndex) => (
                        <li key={recIndex}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

