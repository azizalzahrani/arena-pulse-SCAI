"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"

export function ParkingRecommendations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>AI Recommendations</CardTitle>
        <Sparkles className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">Redirect Traffic</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                North parking is approaching capacity. Redirect incoming traffic to South zones B1 and B2.
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Check className="h-3.5 w-3.5" />
              Apply
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">Open Reserve Section</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on current arrival rate, we recommend opening reserve section D1 within the next 30 minutes.
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Check className="h-3.5 w-3.5" />
              Apply
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">Staff Reallocation</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Move 2 staff members from South entrance to North entrance to handle increased traffic flow.
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Check className="h-3.5 w-3.5" />
              Apply
            </Button>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">VIP Overflow Plan</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                VIP section is 60% full. Prepare overflow area C2 for potential VIP spillover.
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Check className="h-3.5 w-3.5" />
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
