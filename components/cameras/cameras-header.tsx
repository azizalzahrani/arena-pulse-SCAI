"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Info, AlertTriangle, Camera, Grid3X3, Grid2X2, Eye, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the language context and switcher at the top
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function CamerasHeader() {
  const { t } = useLanguage()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedStadium, setSelectedStadium] = useState("king-fahd")
  const [aiMode, setAiMode] = useState("standard")
  const [gridLayout, setGridLayout] = useState("2x2")
  const [liveMode, setLiveMode] = useState(true)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{t("video-surveillance")}</h1>
              <Badge className="bg-green-500 text-white">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {t("ai-active")}
              </Badge>
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">{t("ai-powered-video-monitoring")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md">
              <Label htmlFor="live-mode" className="text-white cursor-pointer">
                {t("live-feed")}
              </Label>
              <Switch
                id="live-mode"
                checked={liveMode}
                onCheckedChange={setLiveMode}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <Select value={selectedStadium} onValueChange={setSelectedStadium}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white w-[180px]">
                <SelectValue placeholder="Select stadium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="king-fahd">King Fahd Stadium</SelectItem>
                <SelectItem value="king-abdullah">King Abdullah Sports City</SelectItem>
                <SelectItem value="al-awwal">Al Awwal Park</SelectItem>
              </SelectContent>
            </Select>

            <Select value={aiMode} onValueChange={setAiMode}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white w-[180px]">
                <SelectValue placeholder={t("select-ai-mode")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">{t("standard-detection")}</SelectItem>
                <SelectItem value="sentiment">{t("sentiment-analysis")}</SelectItem>
                <SelectItem value="anomaly">{t("anomaly-detection")}</SelectItem>
                <SelectItem value="lost">{t("lost-person-tracking")}</SelectItem>
              </SelectContent>
            </Select>

            <LanguageSwitcher />

            <Tabs value={gridLayout} onValueChange={setGridLayout}>
              <TabsList className="bg-white/10 border-white/20">
                <TabsTrigger value="2x2" className="data-[state=active]:bg-white/20">
                  <Grid2X2 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="3x3" className="data-[state=active]:bg-white/20">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span className="sr-only">{t("refresh")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("refresh")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">{t("camera-information")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t("last-updated")}: 2 {t("seconds")} {t("ago")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
            <Eye className="h-3.5 w-3.5 mr-1" />
            {t("person-detection")}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            {t("sentiment-analysis")}
          </Badge>
          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            {t("anomaly-detection")}
          </Badge>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/50">
            <Camera className="h-3.5 w-3.5 mr-1" />
            {t("lost-person-tracking")}
          </Badge>
        </div>
      </div>
    </div>
  )
}
