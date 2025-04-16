"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Check, ChevronDown, BrainCircuit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { AIBadge } from "@/components/ui/ai-badge"

type ModelType = "gpt-4o" | "claude-3" | "gemini-pro"

interface ModelInfo {
  name: string
  description: string
  features: string[]
  accuracy: number
  latency: string
  badge?: string
  provider: string
  specialization: string
}

const modelData: Record<ModelType, ModelInfo> = {
  "gpt-4o": {
    name: "GPT-4o Prediction Engine",
    description: "Advanced multimodal AI with deep contextual understanding",
    features: [
      "Real-time crowd flow analysis",
      "Multi-factor prediction modeling",
      "Contextual understanding of events",
      "60-minute prediction window",
      "Anomaly detection with explanation",
    ],
    accuracy: 94,
    latency: "3 seconds",
    badge: "Active",
    provider: "OpenAI",
    specialization: "Crowd Dynamics & Event Management",
  },
  "claude-3": {
    name: "Claude-3 Insight Engine",
    description: "Specialized in nuanced understanding of complex scenarios",
    features: [
      "All GPT-4o features",
      "Enhanced reasoning capabilities",
      "Cultural context awareness",
      "90-minute prediction window",
      "Detailed explanation of predictions",
    ],
    accuracy: 92,
    latency: "4 seconds",
    provider: "Anthropic",
    specialization: "Security & Risk Assessment",
  },
  "gemini-pro": {
    name: "Gemini Pro Analytics",
    description: "Optimized for multimodal data processing and visual analysis",
    features: [
      "All Claude-3 features",
      "Advanced visual processing",
      "Multi-camera correlation",
      "120-minute prediction window",
      "Predictive visualization",
      "Emergency scenario simulation",
    ],
    accuracy: 96,
    latency: "5 seconds",
    badge: "Premium",
    provider: "Google",
    specialization: "Visual Analysis & Emergency Response",
  },
}

export function PredictionModels() {
  const { toast } = useToast()
  const [activeModel, setActiveModel] = useState<ModelType>("gpt-4o")
  const [isActivating, setIsActivating] = useState(false)

  const handleActivate = () => {
    setIsActivating(true)
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false)
      toast({
        title: `${model.name} Activated`,
        description: `The AI prediction engine has been switched to ${model.name}.`,
      })
    }, 1500)
  }

  const model = modelData[activeModel]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CardTitle>AI Prediction Engines</CardTitle>
              <CardDescription>Select and activate different AI models for predictions</CardDescription>
            </div>
            <AIBadge />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4" />
                Change Engine
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveModel("gpt-4o")} className="flex items-center justify-between">
                GPT-4o Engine
                {activeModel === "gpt-4o" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveModel("claude-3")}
                className="flex items-center justify-between"
              >
                Claude-3 Engine
                {activeModel === "claude-3" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveModel("gemini-pro")}
                className="flex items-center justify-between"
              >
                Gemini Pro Engine
                {activeModel === "gemini-pro" && <Check className="h-4 w-4 ml-2" />}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Provider</span>
              <p className="text-sm">{model.provider}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Specialization</span>
              <p className="text-sm">{model.specialization}</p>
            </div>
          </div>

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
            <h4 className="text-sm font-medium">Capabilities</h4>
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
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {activeModel === "gpt-4o" ? "Currently Active" : `Switch to ${model.name}`}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
