"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIBadge } from "@/components/ui/ai-badge"

export function ParkingAnalytics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Parking Analytics</CardTitle>
          <AIBadge />
        </div>
        <CardDescription>Historical and predictive parking data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="space-y-4">
            <div className="mt-4 h-[200px] w-full bg-muted rounded-md relative overflow-hidden">
              {/* Today's parking usage graph - simplified representation */}
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                <div className="w-[4.16%] h-[30%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[35%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[40%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[45%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[55%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[60%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[65%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[70%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[75%] bg-blue-500 mx-[  bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[75%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[80%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[85%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[80%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[75%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[70%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[65%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[60%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[55%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[50%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[45%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[40%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[35%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[30%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[25%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[20%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[15%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[10%] bg-blue-500 mx-[0.5px]"></div>
                <div className="w-[4.16%] h-[5%] bg-blue-500 mx-[0.5px]"></div>
              </div>

              {/* Time labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs text-muted-foreground">
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Peak Time</p>
                <p className="text-xl font-bold">2:30 PM</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Max Occupancy</p>
                <p className="text-xl font-bold">85%</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Avg. Stay</p>
                <p className="text-xl font-bold">2.5 hrs</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="week" className="space-y-4">
            <div className="mt-4 h-[200px] w-full bg-muted rounded-md relative overflow-hidden">
              {/* Weekly parking usage graph - simplified representation */}
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around px-4">
                <div className="w-[10%] h-[60%] bg-blue-500"></div>
                <div className="w-[10%] h-[45%] bg-blue-500"></div>
                <div className="w-[10%] h-[70%] bg-blue-500"></div>
                <div className="w-[10%] h-[85%] bg-blue-500"></div>
                <div className="w-[10%] h-[75%] bg-blue-500"></div>
                <div className="w-[10%] h-[90%] bg-blue-500"></div>
                <div className="w-[10%] h-[40%] bg-blue-500"></div>
              </div>

              {/* Day labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-around px-4 text-xs text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Busiest Day</p>
                <p className="text-xl font-bold">Saturday</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Weekly Avg.</p>
                <p className="text-xl font-bold">66%</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Trend</p>
                <p className="text-xl font-bold">+12%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <div className="mt-4 h-[200px] w-full bg-muted rounded-md relative overflow-hidden">
              {/* Monthly parking usage graph - simplified representation */}
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 mx-[0.5px]"
                    style={{
                      height: `${Math.floor(30 + Math.sin(i / 3) * 20 + Math.random() * 30)}%`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Week labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs text-muted-foreground">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Monthly Avg.</p>
                <p className="text-xl font-bold">58%</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Peak Day</p>
                <p className="text-xl font-bold">Nov 15</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Monthly Trend</p>
                <p className="text-xl font-bold">+8%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
