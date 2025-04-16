import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PrayerCapacityMonitor() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Capacity Monitor</CardTitle>
        <CardDescription>Current occupancy of prayer facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Main Prayer Hall</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>425/500 people</span>
              <span>Near capacity</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Gate A Prayer Room</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <Progress value={42} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>21/50 people</span>
              <span>Available</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Gate C Prayer Room</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <Progress value={30} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15/50 people</span>
              <span>Available</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">VIP Prayer Area</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <Progress value={15} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>3/20 people</span>
              <span>Available</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Section 2 Prayer Room</span>
              <span className="text-sm font-medium">60%</span>
            </div>
            <Progress value={60} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>30/50 people</span>
              <span>Available</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
