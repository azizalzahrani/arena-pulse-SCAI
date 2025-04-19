"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Users, ArrowRight, Bell, Clock, Thermometer, Calendar } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// Add the Dialog imports at the top of the file
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronRight,
  BarChart3,
  Settings,
  Filter,
  AlertTriangle,
  Check,
  SwitchCameraIcon as Switch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

export function StadiumMetrics() {
  const { t } = useLanguage()
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <MetricCard
          title={t("total-attendance")}
          value="32,458"
          icon={<Users className="h-5 w-5" />}
          description={t("current-stadium-capacity") + " (81%)"}
          change={{ value: "+12%", direction: "up" }}
          tooltip={t("total-attendance")}
          onMoreClick={() => setOpenDialog("attendance")}
        />

        <MetricCard
          title={t("entry-rate")}
          value="425/hr"
          icon={<ArrowRight className="h-5 w-5" />}
          description={t("people-entering-per-hour")}
          change={{ value: "+8%", direction: "up" }}
          tooltip={t("entry-rate")}
          onMoreClick={() => setOpenDialog("entry")}
        />

        <MetricCard
          title={t("active-alerts")}
          value="3"
          icon={<Bell className="h-5 w-5" />}
          description={`2 ${t("security-medical")}`}
          change={{ value: "-2", direction: "down" }}
          tooltip={t("active-alerts")}
          alertStyle={true}
          onMoreClick={() => setOpenDialog("alerts")}
        />

        <MetricCard
          title={t("match-time")}
          value="65:12"
          icon={<Clock className="h-5 w-5" />}
          description="Al Hilal vs Al Nassr"
          tooltip={t("match-time")}
          onMoreClick={() => setOpenDialog("match")}
        />

        <MetricCard
          title={t("weather")}
          value="38°C"
          icon={<Thermometer className="h-5 w-5" />}
          description={t("feels-like") + " 41°C • Riyadh"}
          extraContent={
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span>{t("humidity")}</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{t("wind")}</span>
                <span className="font-medium">15 km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{t("uv")}</span>
                <span className="font-medium">9</span>
              </div>
            </div>
          }
          tooltip={t("weather")}
        />

        <MetricCard
          title={t("prayer-times")}
          value={t("asr")}
          icon={<Calendar className="h-5 w-5" />}
          description={`01:23 ${t("remaining")}`}
          extraContent={
            <div className="mt-2 grid grid-cols-4 gap-1 text-xs">
              <div className="flex flex-col items-center">
                <span>Dhuhr</span>
                <span className="font-medium">11:45</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{t("asr")}</span>
                <span className="font-medium">15:12</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Maghrib</span>
                <span className="font-medium">18:32</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Isha</span>
                <span className="font-medium">20:02</span>
              </div>
            </div>
          }
          tooltip={t("prayer-times")}
        />
      </div>

      {/* Attendance Dialog */}
      <Dialog open={openDialog === "attendance"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-arena-purple" />
              {t("attendance-insights")}
            </DialogTitle>
            <DialogDescription>{t("detailed-attendance-statistics")}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
              <TabsTrigger value="sections">{t("sections")}</TabsTrigger>
              <TabsTrigger value="controls">{t("controls")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("total-attendance")}</h3>
                  <p className="text-2xl font-bold mt-1">32,458</p>
                  <p className="text-xs text-green-600 mt-1">+12% {t("from-average")}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("capacity")}</h3>
                  <p className="text-2xl font-bold mt-1">81%</p>
                  <p className="text-xs text-muted-foreground mt-1">40,000 {t("maximum")}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("remaining")}</h3>
                  <p className="text-2xl font-bold mt-1">7,542</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("seats-available")}</p>
                </div>
              </div>

              <div className="bg-muted/30 h-[200px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">{t("attendance-trend-chart")}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("demographics")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("adults")}</span>
                      <span>24,343 (75%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("children")}</span>
                      <span>5,192 (16%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("vips")}</span>
                      <span>2,923 (9%)</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("entry-points")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("north-gates")}</span>
                      <span>10,547 (32%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("south-gates")}</span>
                      <span>8,762 (27%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("east-west-gates")}</span>
                      <span>13,149 (41%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sections" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t("section-capacity")}</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("filter-sections")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all-sections")}</SelectItem>
                    <SelectItem value="vip">{t("vip-sections")}</SelectItem>
                    <SelectItem value="general">{t("general-admission")}</SelectItem>
                    <SelectItem value="family">{t("family-sections")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("north-stand")}</h4>
                      <p className="text-xs text-muted-foreground">{t("general-admission")}</p>
                    </div>
                    <Badge className="bg-yellow-500">85% {t("full")}</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>8,500 / 10,000</span>
                      <span>1,500 {t("remaining")}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("south-stand")}</h4>
                      <p className="text-xs text-muted-foreground">{t("family-section")}</p>
                    </div>
                    <Badge className="bg-green-500">72% {t("full")}</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>7,200 / 10,000</span>
                      <span>2,800 {t("remaining")}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("east-stand")}</h4>
                      <p className="text-xs text-muted-foreground">{t("general-admission")}</p>
                    </div>
                    <Badge className="bg-red-500">93% {t("full")}</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>9,300 / 10,000</span>
                      <span>700 {t("remaining")}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "93%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("west-stand")}</h4>
                      <p className="text-xs text-muted-foreground">{t("vip-section")}</p>
                    </div>
                    <Badge className="bg-green-500">75% {t("full")}</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>7,500 / 10,000</span>
                      <span>2,500 {t("remaining")}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("capacity-management")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("adjust-maximum-capacity")}</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("maximum-capacity")}</Label>
                      <span className="text-sm font-medium">40,000</span>
                    </div>
                    <Slider defaultValue={[100]} max={100} step={5} />
                    <p className="text-xs text-muted-foreground">100% {t("of-designed-capacity")}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("capacity-alert-threshold")}</Label>
                    <div className="flex items-center gap-2">
                      <Slider defaultValue={[90]} max={100} step={5} className="flex-1" />
                      <span className="text-sm font-medium min-w-[40px] text-right">90%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t("alert-when-capacity-exceeds")}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("advanced-settings")}
                    </Button>
                    <Button>{t("apply-changes")}</Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("entry-control")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("manage-entry-points")}</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("automatic-flow-control")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("vip-priority-access")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("family-section-quota")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">{t("update-entry-controls")}</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Entry Rate Dialog */}
      <Dialog open={openDialog === "entry"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-arena-blue" />
              {t("entry-rate-analysis")}
            </DialogTitle>
            <DialogDescription>{t("real-time-entry-flow")}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="realtime" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="realtime">{t("real-time")}</TabsTrigger>
              <TabsTrigger value="gates">{t("gates")}</TabsTrigger>
              <TabsTrigger value="controls">{t("flow-control")}</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("current-rate")}</h3>
                  <p className="text-2xl font-bold mt-1">425/hr</p>
                  <p className="text-xs text-green-600 mt-1">+8% {t("from-average")}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("peak-rate")}</h3>
                  <p className="text-2xl font-bold mt-1">1,250/hr</p>
                  <p className="text-xs text-muted-foreground mt-1">12:30 - 13:30</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("wait-time")}</h3>
                  <p className="text-2xl font-bold mt-1">4.5 min</p>
                  <p className="text-xs text-green-600 mt-1">-2 min {t("from-average")}</p>
                </div>
              </div>

              <div className="bg-muted/30 h-[200px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">{t("entry-rate-trend-chart")}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("entry-breakdown")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("general-admission")}</span>
                      <span>310/hr (73%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("family-section")}</span>
                      <span>85/hr (20%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("vip-access")}</span>
                      <span>30/hr (7%)</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("entry-methods")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("mobile-tickets")}</span>
                      <span>340/hr (80%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("physical-tickets")}</span>
                      <span>55/hr (13%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("season-passes")}</span>
                      <span>30/hr (7%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gates" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t("gate-performance")}</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("filter-gates")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("all-gates")}</SelectItem>
                    <SelectItem value="north">{t("north-gates")}</SelectItem>
                    <SelectItem value="south">{t("south-gates")}</SelectItem>
                    <SelectItem value="east">{t("east-gates")}</SelectItem>
                    <SelectItem value="west">{t("west-gates")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("north-main-gate")}</h4>
                      <p className="text-xs text-muted-foreground">6 {t("active-lanes")}</p>
                    </div>
                    <Badge className="bg-green-500">120/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t("efficiency")}: 95%</span>
                      <span>{t("wait-time")}: 3 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("south-main-gate")}</h4>
                      <p className="text-xs text-muted-foreground">8 {t("active-lanes")}</p>
                    </div>
                    <Badge className="bg-green-500">160/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t("efficiency")}: 90%</span>
                      <span>{t("wait-time")}: 5 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("east-main-gate")}</h4>
                      <p className="text-xs text-muted-foreground">5 {t("active-lanes")}</p>
                    </div>
                    <Badge className="bg-yellow-500">85/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t("efficiency")}: 75%</span>
                      <span>{t("wait-time")}: 8 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{t("vip-entrance")}</h4>
                      <p className="text-xs text-muted-foreground">2 {t("active-lanes")}</p>
                    </div>
                    <Badge className="bg-green-500">30/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t("efficiency")}: 98%</span>
                      <span>{t("wait-time")}: 1 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "98%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("flow-management")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("adjust-entry-flow")}</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("active-lanes")}</Label>
                      <span className="text-sm font-medium">21/30</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={5} />
                    <p className="text-xs text-muted-foreground">70% {t("of-total-capacity")}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("staff-allocation")}</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue placeholder={t("select-allocation-strategy")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">{t("balanced-default")}</SelectItem>
                        <SelectItem value="north">{t("north-priority")}</SelectItem>
                        <SelectItem value="south">{t("south-priority")}</SelectItem>
                        <SelectItem value="dynamic">{t("dynamic-ai-allocation")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("ai-flow-optimization")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("dynamic-lane-opening")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">{t("update-flow-controls")}</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("wait-time-management")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("set-thresholds-and-alerts")}</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("wait-time-alert-threshold")}</Label>
                      <span className="text-sm font-medium">10 {t("minutes")}</span>
                    </div>
                    <Slider defaultValue={[10]} max={30} step={1} />
                    <p className="text-xs text-muted-foreground">{t("alert-when-wait-time-exceeds")}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("sms-wait-time-alerts")}</Label>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("app-notifications")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button variant="outline" className="w-full">
                    {t("test-alert-system")}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Alerts Dialog */}
      <Dialog open={openDialog === "alerts"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500" />
              {t("active-alerts-management")}
            </DialogTitle>
            <DialogDescription>{t("monitor-and-respond")}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="active" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="active">{t("active-alerts")} (3)</TabsTrigger>
              <TabsTrigger value="resolved">{t("resolved")}</TabsTrigger>
              <TabsTrigger value="settings">{t("alert-settings")}</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t("current-alerts")}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    {t("filter")}
                  </Button>
                  <Button variant="destructive" size="sm" className="h-8">
                    <Bell className="h-3.5 w-3.5 mr-1" />
                    {t("test-alert")}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("unauthorized-access")}</h4>
                        <Badge className="bg-red-500">{t("high-priority")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("security-personnel-dispatched")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("reported")} 5 {t("minutes-ago")}
                        </span>
                        <span className="text-red-500">• {t("requires-immediate-attention")}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          {t("view-cameras")}
                        </Button>
                        <Button size="sm" className="h-8">
                          {t("respond")}
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          {t("escalate")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("medical-assistance-requested")}</h4>
                        <Badge className="bg-yellow-500">{t("medium-priority")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("section-b-row-23")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("reported")} 12 {t("minutes-ago")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          {t("view-location")}
                        </Button>
                        <Button size="sm" className="h-8">
                          {t("check-status")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("capacity-warning")}</h4>
                        <Badge className="bg-blue-500">{t("low-priority")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("section-approaching-capacity")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("reported")} 3 {t("minutes-ago")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          {t("view-section")}
                        </Button>
                        <Button size="sm" className="h-8">
                          {t("adjust-flow")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t("recently-resolved")}</h3>
                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("time-period")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t("today")}</SelectItem>
                    <SelectItem value="week">{t("this-week")}</SelectItem>
                    <SelectItem value="month">{t("this-month")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="border rounded-lg p-3 opacity-70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("suspicious-package")}</h4>
                        <Badge variant="outline">{t("resolved")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("false-alarm")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("resolved")} 15 {t("minutes-ago")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3 opacity-70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("gate-malfunction")}</h4>
                        <Badge variant="outline">{t("resolved")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("south-gate-3-fixed")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("resolved")} 45 {t("minutes-ago")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3 opacity-70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t("crowd-congestion")}</h4>
                        <Badge variant="outline">{t("resolved")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("concession-area-congestion-resolved")}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {t("resolved")} 1 {t("hour-ago")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("alert-preferences")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("configure-alert-thresholds")}</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("security-alerts")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("medical-alerts")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("capacity-alerts")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("weather-alerts")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("system-alerts")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("minimum-alert-priority")}</Label>
                    <Select defaultValue="low">
                      <SelectTrigger>
                        <SelectValue placeholder={t("select-minimum-priority")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t("low-all-alerts")}</SelectItem>
                        <SelectItem value="medium">{t("medium-high-only")}</SelectItem>
                        <SelectItem value="high">{t("high-priority-only")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">{t("save-preferences")}</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("notification-methods")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("choose-how-receive-alerts")}</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("dashboard-notifications")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("email-notifications")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("sms-notifications")}</Label>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("mobile-app-push-notifications")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("email-recipients")}</Label>
                    <Input defaultValue="operations@stadium.com, security@stadium.com" />
                    <p className="text-xs text-muted-foreground">{t("comma-separated-list")}</p>
                  </div>

                  <Button className="w-full">{t("update-notification-settings")}</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Match Time Dialog */}
      <Dialog open={openDialog === "match"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-arena-teal" />
              {t("match-information")}
            </DialogTitle>
            <DialogDescription>Al Hilal vs Al Nassr - {t("saudi-pro-league")}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">{t("match-overview")}</TabsTrigger>
              <TabsTrigger value="timeline">{t("timeline")}</TabsTrigger>
              <TabsTrigger value="operations">{t("operations")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-full mb-2"></div>
                    <h3 className="font-bold">Al Hilal</h3>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold">2 - 1</div>
                    <div className="text-sm text-muted-foreground">65:12 ({t("second-half")})</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-full mb-2"></div>
                    <h3 className="font-bold">Al Nassr</h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("kickoff-time")}</h3>
                  <p className="text-xl font-bold mt-1">14:00</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("local-time")} (AST)</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("current-time")}</h3>
                  <p className="text-xl font-bold mt-1">65:12</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("second-half")}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">{t("expected-end")}</h3>
                  <p className="text-xl font-bold mt-1">15:45</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("approx-no-extra-time")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("match-details")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("competition")}</span>
                      <span className="font-medium">{t("saudi-pro-league")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("matchday")}</span>
                      <span className="font-medium">{t("round")} 24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("referee")}</span>
                      <span className="font-medium">Mohammed Al-Hoaish</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("weather")}</span>
                      <span className="font-medium">38°C, {t("clear")}</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{t("stadium-information")}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("venue")}</span>
                      <span className="font-medium">{t("king-fahd-stadium")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("capacity")}</span>
                      <span className="font-medium">40,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("attendance")}</span>
                      <span className="font-medium">32,458 (81%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("pitch-condition")}</span>
                      <span className="font-medium">{t("excellent")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t("match-timeline")}</h3>
                <Button variant="outline" size="sm" className="h-8">
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  {t("match-stats")}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">62'</Badge>
                    <h4 className="font-medium">{t("goal")}! Al Hilal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("salem-al-dawsari-scores")}</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-yellow-500 mr-2">58'</Badge>
                    <h4 className="font-medium">{t("yellow-card")}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("saud-abdulhamid-yellow")}</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">46'</Badge>
                    <h4 className="font-medium">{t("second-half-begins")}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("second-half-underway")}</p>
                </div>

                <div className="border-l-4 border-muted pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-muted-foreground mr-2">45'</Badge>
                    <h4 className="font-medium">{t("half-time")}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("referee-blows-half-time")}</p>
                </div>

                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">32'</Badge>
                    <h4 className="font-medium">{t("goal")}! Al Nassr</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("ronaldo-equalizes")}</p>
                </div>

                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">14'</Badge>
                    <h4 className="font-medium">{t("goal")}! Al Hilal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("mitrovic-scores")}</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">1'</Badge>
                    <h4 className="font-medium">{t("kick-off")}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t("match-begins")}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("operational-timeline")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("key-operational-events")}</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{t("pre-match-operations")}</h4>
                      <p className="text-xs text-muted-foreground">{t("gates-opened-at")} 11:00.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{t("first-half-operations")}</h4>
                      <p className="text-xs text-muted-foreground">{t("concessions-operating-normally")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{t("second-half-operations")}</h4>
                      <p className="text-xs text-muted-foreground">{t("in-progress-monitoring")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{t("post-match-operations")}</h4>
                      <p className="text-xs text-muted-foreground">{t("scheduled-to-begin")} 15:45.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">{t("operational-controls")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t("manage-match-related-operations")}</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>{t("post-match-exit-strategy")}</Label>
                    <Select defaultValue="phased">
                      <SelectTrigger>
                        <SelectValue placeholder={t("select-exit-strategy")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phased">{t("phased-exit-default")}</SelectItem>
                        <SelectItem value="all">{t("all-gates-open")}</SelectItem>
                        <SelectItem value="sectional">{t("sectional-exit")}</SelectItem>
                        <SelectItem value="vip-first">{t("vip-priority-exit")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("extra-time-preparations")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("post-match-traffic-management")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">{t("prayer-break-accommodations")}</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">{t("update-match-operations")}</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  description: string
  change?: { value: string; direction: "up" | "down" }
  tooltip: string
  alertStyle?: boolean
  extraContent?: React.ReactNode
  onMoreClick?: () => void
}

function MetricCard({
  title,
  value,
  icon,
  description,
  change,
  tooltip,
  alertStyle,
  extraContent,
  onMoreClick,
}: MetricCardProps) {
  const { t } = useLanguage()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{title}</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl font-bold">{value}</h2>
                    {change && (
                      <span
                        className={`text-xs font-medium ${change.direction === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {change.value}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-2 rounded-full ${alertStyle ? "bg-red-100 text-red-600" : "bg-muted"}`}>{icon}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
              {extraContent}

              {onMoreClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs h-7 border border-dashed border-muted-foreground/30"
                  onClick={onMoreClick}
                >
                  <ChevronRight className="h-3.5 w-3.5 mr-1" />
                  {t("more-insights")}
                </Button>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
