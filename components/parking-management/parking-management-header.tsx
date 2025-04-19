"use client"

import { Car, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Import the language context and switcher at the top
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function ParkingManagementHeader() {
  const { t } = useLanguage()
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{t("parking-management")}</h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              {t("last-updated")}: {lastUpdated.toLocaleTimeString()}
            </p>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("refresh")}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t("export")}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList>
            <TabsTrigger value="all">{t("all-parking-areas")}</TabsTrigger>
            <TabsTrigger value="north">{t("north-parking")}</TabsTrigger>
            <TabsTrigger value="south">{t("south-parking")}</TabsTrigger>
            <TabsTrigger value="vip">{t("vip-parking")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
