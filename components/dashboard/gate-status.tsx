"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

export function GateStatus() {
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("gate-status")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("current-entry-point-capacity")}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t("north-gate")}</h3>
              <p className="text-xs text-muted-foreground">البوابة الشمالية</p>
            </div>
            <span className="text-sm font-medium">60% (120/200)</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t("south-gate")}</h3>
              <p className="text-xs text-muted-foreground">البوابة الجنوبية</p>
            </div>
            <span className="text-sm font-medium">80% (160/200)</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t("east-gate")}</h3>
              <p className="text-xs text-muted-foreground">البوابة الشرقية</p>
            </div>
            <span className="text-sm font-medium">45% (90/200)</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t("west-gate")}</h3>
              <p className="text-xs text-muted-foreground">البوابة الغربية</p>
            </div>
            <span className="text-sm font-medium">75% (150/200)</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t("vip-entrance")}</h3>
              <p className="text-xs text-muted-foreground">مدخل كبار الشخصيات</p>
            </div>
            <span className="text-sm font-medium">30% (15/50)</span>
          </div>
          <Progress value={30} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
