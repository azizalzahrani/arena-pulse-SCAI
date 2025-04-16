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

// Update the StadiumMetrics component to include state for dialogs
export function StadiumMetrics() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Attendance"
          value="32,458"
          icon={<Users className="h-5 w-5" />}
          description="Current stadium capacity (81%)"
          change={{ value: "+12%", direction: "up" }}
          tooltip="Total number of attendees currently in the stadium"
          onMoreClick={() => setOpenDialog("attendance")}
        />

        <MetricCard
          title="Entry Rate"
          value="425/hr"
          icon={<ArrowRight className="h-5 w-5" />}
          description="People entering per hour"
          change={{ value: "+8%", direction: "up" }}
          tooltip="Rate of people entering the stadium per hour"
          onMoreClick={() => setOpenDialog("entry")}
        />

        <MetricCard
          title="Active Alerts"
          value="3"
          icon={<Bell className="h-5 w-5" />}
          description="2 security, 1 medical"
          change={{ value: "-2", direction: "down" }}
          tooltip="Current active alerts requiring attention"
          alertStyle={true}
          onMoreClick={() => setOpenDialog("alerts")}
        />

        <MetricCard
          title="Match Time"
          value="65:12"
          icon={<Clock className="h-5 w-5" />}
          description="Al Hilal vs Al Nassr"
          tooltip="Current match time"
          onMoreClick={() => setOpenDialog("match")}
        />

        <MetricCard
          title="Weather"
          value="38°C"
          icon={<Thermometer className="h-5 w-5" />}
          description="Feels like 41°C • Riyadh"
          extraContent={
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <span>Humidity</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Wind</span>
                <span className="font-medium">15 km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <span>UV</span>
                <span className="font-medium">9</span>
              </div>
            </div>
          }
          tooltip="Current weather conditions at the stadium"
        />

        <MetricCard
          title="Prayer Times"
          value="Asr"
          icon={<Calendar className="h-5 w-5" />}
          description="01:23 remaining"
          extraContent={
            <div className="mt-2 grid grid-cols-4 gap-1 text-xs">
              <div className="flex flex-col items-center">
                <span>Dhuhr</span>
                <span className="font-medium">11:45</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Asr</span>
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
          tooltip="Prayer times for today"
        />
      </div>

      {/* Attendance Dialog */}
      <Dialog open={openDialog === "attendance"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-arena-purple" />
              Attendance Insights
            </DialogTitle>
            <DialogDescription>Detailed attendance statistics and capacity management</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Attendance</h3>
                  <p className="text-2xl font-bold mt-1">32,458</p>
                  <p className="text-xs text-green-600 mt-1">+12% from average</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Capacity</h3>
                  <p className="text-2xl font-bold mt-1">81%</p>
                  <p className="text-xs text-muted-foreground mt-1">40,000 maximum</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                  <p className="text-2xl font-bold mt-1">7,542</p>
                  <p className="text-xs text-muted-foreground mt-1">seats available</p>
                </div>
              </div>

              <div className="bg-muted/30 h-[200px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Attendance trend chart would appear here</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Demographics</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Adults</span>
                      <span>24,343 (75%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Children</span>
                      <span>5,192 (16%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VIPs</span>
                      <span>2,923 (9%)</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Entry Points</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>North Gates</span>
                      <span>10,547 (32%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>South Gates</span>
                      <span>8,762 (27%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>East/West Gates</span>
                      <span>13,149 (41%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sections" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Section Capacity</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="vip">VIP Sections</SelectItem>
                    <SelectItem value="general">General Admission</SelectItem>
                    <SelectItem value="family">Family Sections</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">North Stand</h4>
                      <p className="text-xs text-muted-foreground">General Admission</p>
                    </div>
                    <Badge className="bg-yellow-500">85% Full</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>8,500 / 10,000</span>
                      <span>1,500 remaining</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">South Stand</h4>
                      <p className="text-xs text-muted-foreground">Family Section</p>
                    </div>
                    <Badge className="bg-green-500">72% Full</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>7,200 / 10,000</span>
                      <span>2,800 remaining</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">East Stand</h4>
                      <p className="text-xs text-muted-foreground">General Admission</p>
                    </div>
                    <Badge className="bg-red-500">93% Full</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>9,300 / 10,000</span>
                      <span>700 remaining</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "93%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">West Stand</h4>
                      <p className="text-xs text-muted-foreground">VIP Section</p>
                    </div>
                    <Badge className="bg-green-500">75% Full</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>7,500 / 10,000</span>
                      <span>2,500 remaining</span>
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
                <h3 className="font-medium">Capacity Management</h3>
                <p className="text-sm text-muted-foreground mt-1">Adjust maximum capacity for safety and comfort</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Maximum Capacity</Label>
                      <span className="text-sm font-medium">40,000</span>
                    </div>
                    <Slider defaultValue={[100]} max={100} step={5} />
                    <p className="text-xs text-muted-foreground">100% of designed capacity</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Capacity Alert Threshold</Label>
                    <div className="flex items-center gap-2">
                      <Slider defaultValue={[90]} max={100} step={5} className="flex-1" />
                      <span className="text-sm font-medium min-w-[40px] text-right">90%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Alert when capacity exceeds this threshold</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
                    <Button>Apply Changes</Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Entry Control</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage entry points and flow control</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Automatic Flow Control</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">VIP Priority Access</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Family Section Quota</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">Update Entry Controls</Button>
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
              Entry Rate Analysis
            </DialogTitle>
            <DialogDescription>Real-time entry flow statistics and gate management</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="realtime" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="realtime">Real-time</TabsTrigger>
              <TabsTrigger value="gates">Gates</TabsTrigger>
              <TabsTrigger value="controls">Flow Control</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Rate</h3>
                  <p className="text-2xl font-bold mt-1">425/hr</p>
                  <p className="text-xs text-green-600 mt-1">+8% from average</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Peak Rate</h3>
                  <p className="text-2xl font-bold mt-1">1,250/hr</p>
                  <p className="text-xs text-muted-foreground mt-1">12:30 - 13:30</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Wait Time</h3>
                  <p className="text-2xl font-bold mt-1">4.5 min</p>
                  <p className="text-xs text-green-600 mt-1">-2 min from average</p>
                </div>
              </div>

              <div className="bg-muted/30 h-[200px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Entry rate trend chart would appear here</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Entry Breakdown</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>General Admission</span>
                      <span>310/hr (73%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Family Section</span>
                      <span>85/hr (20%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VIP Access</span>
                      <span>30/hr (7%)</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Entry Methods</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mobile Tickets</span>
                      <span>340/hr (80%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Physical Tickets</span>
                      <span>55/hr (13%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Season Passes</span>
                      <span>30/hr (7%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gates" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Gate Performance</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter gates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Gates</SelectItem>
                    <SelectItem value="north">North Gates</SelectItem>
                    <SelectItem value="south">South Gates</SelectItem>
                    <SelectItem value="east">East Gates</SelectItem>
                    <SelectItem value="west">West Gates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">North Main Gate</h4>
                      <p className="text-xs text-muted-foreground">6 active lanes</p>
                    </div>
                    <Badge className="bg-green-500">120/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Efficiency: 95%</span>
                      <span>Wait time: 3 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">South Main Gate</h4>
                      <p className="text-xs text-muted-foreground">8 active lanes</p>
                    </div>
                    <Badge className="bg-green-500">160/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Efficiency: 90%</span>
                      <span>Wait time: 5 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">East Main Gate</h4>
                      <p className="text-xs text-muted-foreground">5 active lanes</p>
                    </div>
                    <Badge className="bg-yellow-500">85/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Efficiency: 75%</span>
                      <span>Wait time: 8 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">VIP Entrance</h4>
                      <p className="text-xs text-muted-foreground">2 active lanes</p>
                    </div>
                    <Badge className="bg-green-500">30/hr</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Efficiency: 98%</span>
                      <span>Wait time: 1 min</span>
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
                <h3 className="font-medium">Flow Management</h3>
                <p className="text-sm text-muted-foreground mt-1">Adjust entry flow and gate operations</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Active Lanes</Label>
                      <span className="text-sm font-medium">21/30</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={5} />
                    <p className="text-xs text-muted-foreground">70% of total capacity</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Staff Allocation</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue placeholder="Select allocation strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced (Default)</SelectItem>
                        <SelectItem value="north">North Priority</SelectItem>
                        <SelectItem value="south">South Priority</SelectItem>
                        <SelectItem value="dynamic">Dynamic AI Allocation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">AI Flow Optimization</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Dynamic Lane Opening</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">Update Flow Controls</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Wait Time Management</h3>
                <p className="text-sm text-muted-foreground mt-1">Set thresholds and alerts for wait times</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Wait Time Alert Threshold</Label>
                      <span className="text-sm font-medium">10 minutes</span>
                    </div>
                    <Slider defaultValue={[10]} max={30} step={1} />
                    <p className="text-xs text-muted-foreground">Alert when wait time exceeds threshold</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">SMS Wait Time Alerts</Label>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">App Notifications</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button variant="outline" className="w-full">
                    Test Alert System
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
              Active Alerts Management
            </DialogTitle>
            <DialogDescription>Monitor and respond to security and operational alerts</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="active" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="active">Active Alerts (3)</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Current Alerts</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    Filter
                  </Button>
                  <Button variant="destructive" size="sm" className="h-8">
                    <Bell className="h-3.5 w-3.5 mr-1" />
                    Test Alert
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
                        <h4 className="font-medium">Unauthorized access detected at Gate 12</h4>
                        <Badge className="bg-red-500">High Priority</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Security personnel dispatched. Investigating potential breach.
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Reported 5 minutes ago</span>
                        <span className="text-red-500">• Requires immediate attention</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          View Cameras
                        </Button>
                        <Button size="sm" className="h-8">
                          Respond
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          Escalate
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
                        <h4 className="font-medium">Medical assistance requested</h4>
                        <Badge className="bg-yellow-500">Medium Priority</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Section B, Row 23. Medical team en route.</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Reported 12 minutes ago</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          View Location
                        </Button>
                        <Button size="sm" className="h-8">
                          Check Status
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
                        <h4 className="font-medium">Capacity warning in East Stand</h4>
                        <Badge className="bg-blue-500">Low Priority</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Section approaching 95% capacity. Consider redirecting flow.
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Reported 3 minutes ago</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8">
                          View Section
                        </Button>
                        <Button size="sm" className="h-8">
                          Adjust Flow
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Recently Resolved</h3>
                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
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
                        <h4 className="font-medium">Suspicious package</h4>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">False alarm. Package inspected and cleared.</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Resolved 15 minutes ago</span>
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
                        <h4 className="font-medium">Gate malfunction</h4>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">South Gate 3 technical issue fixed.</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Resolved 45 minutes ago</span>
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
                        <h4 className="font-medium">Crowd congestion</h4>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Concession area congestion resolved by opening additional lanes.
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Resolved 1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Alert Preferences</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure alert thresholds and notifications</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Security Alerts</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Medical Alerts</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Capacity Alerts</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Weather Alerts</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">System Alerts</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Alert Priority</Label>
                    <Select defaultValue="low">
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (All Alerts)</SelectItem>
                        <SelectItem value="medium">Medium & High Only</SelectItem>
                        <SelectItem value="high">High Priority Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Save Preferences</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Notification Methods</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose how you want to receive alerts</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Dashboard Notifications</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Email Notifications</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">SMS Notifications</Label>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Mobile App Push Notifications</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <Input defaultValue="operations@stadium.com, security@stadium.com" />
                    <p className="text-xs text-muted-foreground">Comma-separated list of email addresses</p>
                  </div>

                  <Button className="w-full">Update Notification Settings</Button>
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
              Match Information
            </DialogTitle>
            <DialogDescription>Al Hilal vs Al Nassr - Saudi Pro League</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Match Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
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
                    <div className="text-sm text-muted-foreground">65:12 (Second Half)</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-full mb-2"></div>
                    <h3 className="font-bold">Al Nassr</h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Kickoff Time</h3>
                  <p className="text-xl font-bold mt-1">14:00</p>
                  <p className="text-xs text-muted-foreground mt-1">Local Time (AST)</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Time</h3>
                  <p className="text-xl font-bold mt-1">65:12</p>
                  <p className="text-xs text-muted-foreground mt-1">Second Half</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Expected End</h3>
                  <p className="text-xl font-bold mt-1">15:45</p>
                  <p className="text-xs text-muted-foreground mt-1">Approx. (no extra time)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Match Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Competition</span>
                      <span className="font-medium">Saudi Pro League</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Matchday</span>
                      <span className="font-medium">Round 24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Referee</span>
                      <span className="font-medium">Mohammed Al-Hoaish</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Weather</span>
                      <span className="font-medium">38°C, Clear</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Stadium Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Venue</span>
                      <span className="font-medium">King Fahd Stadium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacity</span>
                      <span className="font-medium">40,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Attendance</span>
                      <span className="font-medium">32,458 (81%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pitch Condition</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Match Timeline</h3>
                <Button variant="outline" size="sm" className="h-8">
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  Match Stats
                </Button>
              </div>

              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">62'</Badge>
                    <h4 className="font-medium">GOAL! Al Hilal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Salem Al-Dawsari scores from a penalty kick! Al Hilal leads 2-1.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-yellow-500 mr-2">58'</Badge>
                    <h4 className="font-medium">Yellow Card</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Saud Abdulhamid (Al Hilal) receives a yellow card for a tactical foul.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">46'</Badge>
                    <h4 className="font-medium">Second Half Begins</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    The second half is underway with the score at 1-1.
                  </p>
                </div>

                <div className="border-l-4 border-muted pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-muted-foreground mr-2">45'</Badge>
                    <h4 className="font-medium">Half Time</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    The referee blows for half time with the score level at 1-1.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">32'</Badge>
                    <h4 className="font-medium">GOAL! Al Nassr</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cristiano Ronaldo equalizes with a powerful header! Score is 1-1.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2">14'</Badge>
                    <h4 className="font-medium">GOAL! Al Hilal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aleksandar Mitrović scores with a close-range finish! Al Hilal leads 1-0.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <div className="flex items-center">
                    <Badge className="bg-blue-500 mr-2">1'</Badge>
                    <h4 className="font-medium">Kick Off</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">The match begins at King Fahd Stadium.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Operational Timeline</h3>
                <p className="text-sm text-muted-foreground mt-1">Key operational events and upcoming activities</p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Pre-match Operations</h4>
                      <p className="text-xs text-muted-foreground">Gates opened at 11:00. Security checks completed.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">First Half Operations</h4>
                      <p className="text-xs text-muted-foreground">Concessions and facilities operating normally.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Second Half Operations</h4>
                      <p className="text-xs text-muted-foreground">
                        In progress. Monitoring crowd flow and facilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Post-match Operations</h4>
                      <p className="text-xs text-muted-foreground">Scheduled to begin at approximately 15:45.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Operational Controls</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage match-related operations</p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Post-match Exit Strategy</Label>
                    <Select defaultValue="phased">
                      <SelectTrigger>
                        <SelectValue placeholder="Select exit strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phased">Phased Exit (Default)</SelectItem>
                        <SelectItem value="all">All Gates Open</SelectItem>
                        <SelectItem value="sectional">Sectional Exit</SelectItem>
                        <SelectItem value="vip-first">VIP Priority Exit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Extra Time Preparations</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Post-match Traffic Management</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer">Prayer Break Accommodations</Label>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">Update Match Operations</Button>
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
                  More Insights
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
