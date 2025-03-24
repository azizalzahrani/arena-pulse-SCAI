import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, Users, Clock } from "lucide-react"

export default function PredictionInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Potential Bottleneck at King Fahd Stadium Gate 3</h3>
              <p className="text-sm text-muted-foreground">
                Based on historical data from previous Riyadh derbies and current ticket sales, we predict an 82% chance
                of congestion at Gate 3 between 18:00-19:00. Consider opening additional entry points.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Increased Attendance Expected for Saudi Super Cup</h3>
              <p className="text-sm text-muted-foreground">
                Ticket sales are trending 18% higher than last year's Saudi Super Cup. Prepare for approximately 8,500
                more attendees than initially forecasted at King Abdullah Sports City.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Staff Reallocation Recommended for Jeddah Derby</h3>
              <p className="text-sm text-muted-foreground">
                King Abdullah Sports City Concessions Area B is overstaffed by approximately 10 team members, while
                Security Checkpoint 2 requires 6 additional staff members to maintain optimal service levels during the
                upcoming Jeddah Derby.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Peak Arrival Time Adjustment for Riyadh</h3>
              <p className="text-sm text-muted-foreground">
                Based on social media activity and traffic patterns in Riyadh, we predict peak arrival time will be 45
                minutes earlier than usual for the Al-Hilal vs Al-Shabab match. Adjust staff schedules accordingly.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

