"use client"

import { Sparkles, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AIPredictionsHeader() {
  return (
    <div className="bg-gradient-to-r from-arena-purple/90 to-arena-blue/90 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">AI-Powered Predictions</h1>
              <Badge className="bg-white/20 text-white">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Google AI
              </Badge>
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">
              Advanced machine learning algorithms analyze historical and real-time data to predict crowd movements,
              identify potential issues, and optimize stadium operations.
            </p>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Info className="h-4 w-4 mr-2" />
                  How It Works
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Our AI system combines computer vision, natural language processing, and predictive analytics to
                  provide actionable insights for stadium management.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
