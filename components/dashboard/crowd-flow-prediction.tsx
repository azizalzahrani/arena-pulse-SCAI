"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Generate sample crowd flow data
const generateCrowdFlowData = () => {
  const data = []
  const now = new Date()

  // Past data (actual)
  for (let i = 12; i >= 1; i--) {
    const time = new Date(now.getTime() - i * 15 * 60000) // 15 minutes intervals
    const hour = time.getHours().toString().padStart(2, "0")
    const minute = time.getMinutes().toString().padStart(2, "0")

    data.push({
      time: `${hour}:${minute}`,
      crowd: Math.floor(600 + Math.random() * 200),
      isPrediction: false,
    })
  }

  // Current time
  const currentHour = now.getHours().toString().padStart(2, "0")
  const currentMinute = now.getMinutes().toString().padStart(2, "0")
  data.push({
    time: `${currentHour}:${currentMinute}`,
    crowd: 550,
    isPrediction: false,
  })

  // Future data (predictions)
  for (let i = 1; i <= 8; i++) {
    const time = new Date(now.getTime() + i * 15 * 60000) // 15 minutes intervals
    const hour = time.getHours().toString().padStart(2, "0")
    const minute = time.getMinutes().toString().padStart(2, "0")

    // Create a peak for Asr prayer time around 15:00
    let crowdValue = 400
    if (hour === "15" && Number.parseInt(minute) <= 30) {
      crowdValue = 750 + Math.random() * 50
    } else if (hour === "17" && Number.parseInt(minute) >= 30) {
      crowdValue = 700 + Math.random() * 50
    } else {
      crowdValue = 500 + Math.random() * 100
    }

    data.push({
      time: `${hour}:${minute}`,
      crowd: Math.floor(crowdValue),
      isPrediction: true,
    })
  }

  return data
}

const crowdFlowData = generateCrowdFlowData()

export function CrowdFlowPrediction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crowd Flow Prediction</CardTitle>
        <p className="text-sm text-muted-foreground">Historical and predicted crowd movement</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary"></div>
            <span>Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 border-t border-dashed border-primary"></div>
            <span>Predicted</span>
          </div>
        </div>

        <ChartContainer
          config={{
            crowd: {
              label: "Crowd Flow",
              color: "hsl(var(--primary))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={crowdFlowData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={2} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 1000]} tickCount={6} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* Historical line (solid) */}
              <Line
                type="monotone"
                dataKey="crowd"
                stroke="var(--color-crowd)"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="Crowd Flow"
                strokeDasharray={(d) => (d.isPrediction ? "5 5" : "0")}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex justify-between mt-2 text-xs">
          <div className="text-center">
            <div className="font-medium">Asr</div>
            <div className="text-muted-foreground">15:00</div>
          </div>
          <div className="text-center">
            <div className="font-medium">Match End</div>
            <div className="text-muted-foreground">17:45</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
