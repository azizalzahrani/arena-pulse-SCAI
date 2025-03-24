import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle } from "lucide-react"

export default function AutomatedAnalysisHeader() {
  return (
    <Card className="mb-4">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Automated Crowd Analysis</h1>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                System Active
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time crowd monitoring with AI-powered video analysis and sensor integration
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Activity className="h-4 w-4" />
              System Status
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <AlertTriangle className="h-4 w-4" />
              Alerts: 2
            </Button>
            <Button variant="default" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

