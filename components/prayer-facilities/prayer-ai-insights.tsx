import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, Users } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"

export function PrayerAIInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
          <AIBadge />
        </div>
        <CardDescription>AI-powered recommendations and analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 border rounded-md bg-blue-50">
            <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm">Capacity Prediction</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on historical data and today's event, we predict the Main Prayer Hall will reach 95% capacity
                during Asr prayer. Consider opening additional prayer spaces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border rounded-md">
            <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-sm">Usage Patterns</div>
              <p className="text-xs text-muted-foreground mt-1">
                Prayer facility usage has increased by 22% compared to last month. The Main Prayer Hall and Section 2
                Prayer Room are the most utilized spaces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border rounded-md">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-sm">Demographic Analysis</div>
              <p className="text-xs text-muted-foreground mt-1">
                We've observed a 15% increase in families using prayer facilities. Consider allocating more
                family-friendly prayer spaces during weekend events.
              </p>
            </div>
          </div>

          <div className="p-3 border rounded-md bg-gray-50">
            <div className="font-medium text-sm mb-2">Recommended Actions</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-arena-purple mr-2"></span>
                Open additional prayer space near Section 5 for Asr prayer
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-arena-purple mr-2"></span>
                Increase cleaning frequency in Main Prayer Hall
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-arena-purple mr-2"></span>
                Add more wudu stations at Gate A for upcoming event
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
