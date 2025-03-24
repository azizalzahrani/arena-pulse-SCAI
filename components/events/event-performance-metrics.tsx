"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  Bar,
  BarChart,
} from "recharts"
import { BrainCircuit } from "lucide-react"

// Mock data for event performance metrics
const performanceData = {
  attendance: [
    { month: "Sep", league: 75, cup: 82, international: 90 },
    { month: "Oct", league: 78, cup: 85, international: 92 },
    { month: "Nov", league: 72, cup: 80, international: 88 },
    { month: "Dec", league: 68, cup: 78, international: 85 },
    { month: "Jan", league: 70, cup: 80, international: 87 },
    { month: "Feb", league: 75, cup: 83, international: 90 },
    { month: "Mar", league: 80, cup: 87, international: 94 },
  ],
  revenue: [
    { month: "Sep", tickets: 1200000, concessions: 450000, merchandise: 320000 },
    { month: "Oct", tickets: 1350000, concessions: 480000, merchandise: 350000 },
    { month: "Nov", tickets: 1150000, concessions: 420000, merchandise: 300000 },
    { month: "Dec", tickets: 1050000, concessions: 400000, merchandise: 380000 },
    { month: "Jan", tickets: 1100000, concessions: 410000, merchandise: 290000 },
    { month: "Feb", tickets: 1250000, concessions: 460000, merchandise: 330000 },
    { month: "Mar", tickets: 1400000, concessions: 500000, merchandise: 370000 },
  ],
  satisfaction: [
    { category: "Entry Experience", rating: 7.8, benchmark: 7.5 },
    { category: "Seating Comfort", rating: 8.2, benchmark: 7.8 },
    { category: "Food & Beverage", rating: 6.9, benchmark: 7.2 },
    { category: "Restroom Cleanliness", rating: 7.1, benchmark: 7.0 },
    { category: "Staff Helpfulness", rating: 8.5, benchmark: 8.0 },
    { category: "Security", rating: 8.3, benchmark: 8.1 },
    { category: "Overall Experience", rating: 8.0, benchmark: 7.8 },
  ],
}

export default function EventPerformanceMetrics() {
  const [activeTab, setActiveTab] = useState("attendance")
  const [timeframe, setTimeframe] = useState("7m")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Event Performance Metrics</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="7m">Last 7 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="attendance" className="h-[350px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.attendance} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} domain={[50, 100]} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="font-medium">{label}</div>
                            <div className="mt-2 space-y-1">
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-1 text-sm">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    {entry.name}:
                                  </span>
                                  <span className="font-medium">{entry.value}%</span>
                                </div>
                              ))}
                            </div>
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="league" name="League Matches" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="cup" name="Cup Matches" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="international" name="International" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="revenue" className="h-[350px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData.revenue} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="font-medium">{label}</div>
                            <div className="mt-2 space-y-1">
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-1 text-sm">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    {entry.name}:
                                  </span>
                                  <span className="font-medium">SAR {entry.value.toLocaleString()}</span>
                                </div>
                              ))}
                              {payload.length > 0 && (
                                <div className="mt-1 border-t pt-1 text-sm font-medium">
                                  Total: SAR {payload.reduce((sum, entry) => sum + entry.value, 0).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="tickets"
                    name="Ticket Sales"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="concessions"
                    name="Concessions"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="merchandise"
                    name="Merchandise"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="satisfaction" className="h-[350px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData.satisfaction}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="font-medium">{label}</div>
                            <div className="mt-2 space-y-1">
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-1 text-sm">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    {entry.name}:
                                  </span>
                                  <span className="font-medium">{entry.value}/10</span>
                                </div>
                              ))}
                            </div>
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey="rating" name="Your Venues" fill="hsl(var(--primary))" />
                  <Bar dataKey="benchmark" name="Industry Benchmark" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>

        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
          <h3 className="text-sm font-medium">AI Insights</h3>
          {activeTab === "attendance" && (
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  League match attendance has increased by 5% in March, likely due to end-of-season championship race.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>International matches consistently show 10-15% higher attendance rates than league matches.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Consider dynamic pricing for high-demand international fixtures to optimize revenue.</span>
              </li>
            </ul>
          )}

          {activeTab === "revenue" && (
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Merchandise sales peak during December, suggesting holiday shopping influence.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Concession revenue per attendee has increased by 8% since implementing mobile ordering.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Ticket revenue shows strong correlation with team performance. Consider promotional pricing for
                  lower-demand matches.
                </span>
              </li>
            </ul>
          )}

          {activeTab === "satisfaction" && (
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Food & Beverage satisfaction is below benchmark. Consider menu revisions and service improvements.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>Staff Helpfulness is your highest-rated category, 0.5 points above industry benchmark.</span>
              </li>
              <li className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Restroom Cleanliness shows improvement opportunity. Consider increasing cleaning frequency during
                  events.
                </span>
              </li>
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

