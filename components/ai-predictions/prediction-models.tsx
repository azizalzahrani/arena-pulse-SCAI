"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ModelType = "standard" | "advanced" | "expert"

interface ModelInfo {
  name: string
  description: string
  features: string[]
  accuracy: number
  latency: string
  badge?: string
}

const modelData: Record<ModelType, ModelInfo> = {
  standard: {
    name: "Standard Prediction Model",
    description: "Basic prediction capabilities suitable for regular operations",
    features: [
      "Crowd density prediction",
      "Basic flow analysis",
      "Simple anomaly detection",
      "30-minute prediction window",
    ],
    accuracy: 85,
    latency: "5 seconds",
  },
  advanced: {
    name: "Advanced Prediction Model",
    description: "Enhanced predictions with deeper historical analysis",
    features: [
      "All Standard features",
      "Weather impact analysis",
      "Event correlation",
      "60-minute prediction window",
      "Sectional crowd flow",
    ],
    accuracy: 92,
    latency: "8 seconds",
    badge: "Recommended",
  },
  expert: {
    name: "Expert Prediction Model",
    description: "Highest accuracy with multi-factor analysis",
    features: [
      "All Advanced features",
      "Multi-venue correlation",
      "VIP movement prediction",
      "120-minute prediction window",
      "Anomaly root cause analysis",
      "Emergency scenario planning",
    ],
    accuracy: 97,
    latency: "12 seconds",
    badge: "Premium",
  },
}

export function PredictionModels() {
  const [activeModel, setActiveModel] = useState<ModelType>("advanced")
  const [isActivating, setIsActivating] = useState(false)

  const handleActivate = () => {
    setIsActivating(true)
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false)
    }, 1500)
  }

  const model = modelData[activeModel]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Prediction Models</CardTitle>
            <CardDescription>Select and activate different prediction models</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Change Model
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setActiveModel("standard")}
                className="flex items-center justify-between"
              >
                Standard Model
                {activeModel === "standard" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveModel("advanced")}
                className="flex items-center justify-between"
              >
                Advanced Model
                {activeModel === "advanced" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModel("expert")} className="flex items-center justify-between">
                Expert Model
                {activeModel === "expert" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{model.name}</h3>
            {model.badge && (
              <Badge className={model.badge === "Premium" ? "bg-arena-purple" : "bg-arena-blue"}>{model.badge}</Badge>
            )}
          </div>

          <p className="text-muted-foreground">{model.description}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Accuracy</span>
              <span className="text-sm">{model.accuracy}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-arena-purple rounded-full" style={{ width: `${model.accuracy}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Processing Latency</span>
              <span className="text-sm">{model.latency}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Features</h4>
            <ul className="space-y-1">
              {model.features.map((feature, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-arena-teal" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full mt-4" onClick={handleActivate} disabled={isActivating}>
            {isActivating ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                Activating...
              </>
            ) : (
              <>Activate {activeModel.charAt(0).toUpperCase() + activeModel.slice(1)} Model</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
