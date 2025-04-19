"use client"

import { Sparkles, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Import the language context and switcher at the top
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function AIPredictionsHeader() {
  const { t } = useLanguage()

  return (
    <div className="bg-gradient-to-r from-arena-purple/90 to-arena-blue/90 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{t("ai-powered-predictions")}</h1>
              <Badge className="bg-white/20 text-white">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {t("google-ai")}
              </Badge>
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">{t("advanced-machine-learning")}</p>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Info className="h-4 w-4 mr-2" />
                    {t("how-it-works")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>{t("advanced-machine-learning")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
