"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Users, ArrowRight, Check } from "lucide-react"
// Replace the existing Badge with AIBadge
import { AIBadge } from "@/components/ui/ai-badge"

export function EventAIRecommendations() {
  return (
    <Card className="h-full">
      {/* Update the CardHeader to use AIBadge instead of the custom badge */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>AI Recommendations</CardTitle>
            <AIBadge />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-arena-purple" />
            <h3 className="font-medium">Staffing Optimization</h3>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Current: 450 staff</span>
              <span className="text-green-500">Recommended: 425 staff</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            AI analysis suggests a 5% reduction in staff would maintain optimal service levels.
          </p>
        </div>

        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Gate Opening Time</h4>
              <Badge className="bg-yellow-500">Adjustment Needed</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Recommend opening gates 30 minutes earlier (16:30) based on expected attendance and traffic patterns.
            </p>
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Check className="h-3.5 w-3.5 mr-1" />
                Apply
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Security Allocation</h4>
              <Badge className="bg-green-500">Optimized</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Current security allocation is optimal. Focus additional resources on South and East entrances.
            </p>
          </div>

          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Concession Staffing</h4>
              <Badge className="bg-yellow-500">Adjustment Needed</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Increase concession staff by 15% in North Stand based on historical purchase patterns for this match type.
            </p>
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Check className="h-3.5 w-3.5 mr-1" />
                Apply
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Weather Considerations</h4>
              <Badge className="bg-blue-500">Information</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Forecast indicates 32°C temperature. Recommend increasing water stations and cooling areas throughout the
              venue.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-arena-purple" />
            <span>Based on historical data analysis</span>
          </div>
          <Button variant="link" size="sm" className="h-6 p-0">
            View All Recommendations
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
