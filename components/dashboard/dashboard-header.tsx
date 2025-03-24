"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { useLanguage } from "@/lib/language-context"

export default function DashboardHeader() {
  const today = new Date()
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{t("Welcome back")}, Aziz</h1>
        <p className="text-muted-foreground">{t("Here's what's happening at your venues today")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(today, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="single" selected={today} initialFocus />
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          {t("Export")}
        </Button>
      </div>
    </div>
  )
}

