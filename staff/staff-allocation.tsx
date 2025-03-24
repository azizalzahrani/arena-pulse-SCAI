"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrainCircuit } from "lucide-react"

// Mock data for staff allocation
const staffAllocationData = {
  byRole: [
    { name: "Security", value: 450, color: "#8884d8" },
    { name: "Concessions", value: 320, color: "#82ca9d" },
    { name: "Ticketing", value: 180, color: "#ffc658" },
    { name: "Cleaning", value: 150, color: "#ff8042" },
    { name: "Medical", value: 80, color: "#0088fe" },
    { name: "Supervisors", value: 68, color: "#00C49F" },
  ],
  byVenue: [
    { name: "King Fahd Stadium", value: 520, color: "#8884d8" },
    { name: "King Abdullah Sports City", value: 380, color: "#82ca9d" },
    { name: "Prince Faisal Stadium", value: 220, color: "#ffc658" },
    { name: "Mrsool Park", value: 128, color: "#ff8042" },
  ],
  byShift: [
    { name: "Morning", value: 380, color: "#8884d8" },
    { name: "Afternoon", value: 420, color: "#82ca9d" },
    { name: "Evening", value: 320, color: "#ffc658" },
    { name: "Night", value: 128, color: "#ff8042" },
  ],
}

export default function StaffAllocation() {
  const [viewMode, setViewMode] = useState("byRole")

  // Select the data based on the view mode
  const data = staffAllocationData[viewMode]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Staff Allocation</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <Select defaultValue={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="byRole">By Role</SelectItem>
            <SelectItem value="byVenue">By Venue</SelectItem>
            <SelectItem value="byShift">By Shift</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{data.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {data.value} staff ({((data.value / 1248) * 100).toFixed(1)}%)
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-3">
          <h3 className="text-sm font-medium">AI Insights</h3>
          {viewMode === "byRole" && (
            <p className="text-sm text-muted-foreground">
              Security staff makes up 36% of your workforce. Consider cross-training 15% of security staff for
              concessions to improve flexibility during peak times.
            </p>
          )}
          {viewMode === "byVenue" && (
            <p className="text-sm text-muted-foreground">
              King Fahd Stadium has 42% of all staff. Based on upcoming events, consider temporarily reassigning 30
              staff members to King Abdullah Sports City for the next two weeks.
            </p>
          )}
          {viewMode === "byShift" && (
            <p className="text-sm text-muted-foreground">
              Afternoon shifts are overstaffed by approximately 8% compared to attendance patterns. Consider adjusting
              schedules to better match peak attendance times.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

