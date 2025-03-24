"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAnalysisContext } from "@/contexts/analysis-context"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PredictionEngine() {
  const { analysisData } = useAnalysisContext()
  const [predictions, setPredictions] = useState<any[]>([])
  const [selectedModel, setSelectedModel] = useState("standard")
  const [isGenerating, setIsGenerating] = useState(false)
  const [predictionData, setPredictionData] = useState<any[]>([])

  // Convert timestamp string to Date object
  const timestampDate = new Date(analysisData.timestamp)

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        generatePredictions()
        setIsGenerating(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isGenerating])

  const generatePredictions = () => {
    // Generate some sample prediction data based on current analysis
    const baseOccupancy = analysisData.occupancy
    const baseDensity = analysisData.crowdDensity

    const newPredictions = [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        model: selectedModel,
        predictions: {
          "15min": {
            occupancy: Math.min(100, baseOccupancy + Math.random() * 10),
            density: Math.min(5, baseDensity + Math.random() * 0.5),
            bottlenecks: Math.min(5, analysisData.bottleneckCount + (Math.random() > 0.7 ? 1 : 0)),
          },
          "30min": {
            occupancy: Math.min(100, baseOccupancy + Math.random() * 15),
            density: Math.min(5, baseDensity + Math.random() * 0.8),
            bottlenecks: Math.min(5, analysisData.bottleneckCount + (Math.random() > 0.5 ? 1 : 0)),
          },
          "60min": {
            occupancy: Math.min(100, baseOccupancy + Math.random() * 20 - 5),
            density: Math.min(5, baseDensity + Math.random() * 1 - 0.3),
            bottlenecks: Math.min(5, analysisData.bottleneckCount + (Math.random() > 0.3 ? 1 : -1)),
          },
        },
      },
      ...predictions,
    ].slice(0, 5) // Keep only the 5 most recent predictions

    setPredictions(newPredictions)

    // Generate chart data
    const chartData = [
      {
        time: "Now",
        occupancy: baseOccupancy,
        density: baseDensity * 20, // Scale for visibility
      },
      {
        time: "+15m",
        occupancy: newPredictions[0].predictions["15min"].occupancy,
        density: newPredictions[0].predictions["15min"].density * 20,
      },
      {
        time: "+30m",
        occupancy: newPredictions[0].predictions["30min"].occupancy,
        density: newPredictions[0].predictions["30min"].density * 20,
      },
      {
        time: "+60m",
        occupancy: newPredictions[0].predictions["60min"].occupancy,
        density: newPredictions[0].predictions["60min"].density * 20,
      },
    ]

    setPredictionData(chartData)
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Predictions</CardTitle>
            <CardDescription>Forecast crowd conditions based on current data</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isGenerating ? "secondary" : "outline"}>{isGenerating ? "Generating..." : "Ready"}</Badge>
            <Button size="sm" onClick={() => setIsGenerating(true)} disabled={isGenerating}>
              Generate Prediction
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Current data as of {timestampDate.toLocaleTimeString()} - Occupancy: {analysisData.occupancy}%, Density:{" "}
            {analysisData.crowdDensity.toFixed(1)}, Bottlenecks: {analysisData.bottleneckCount}
          </p>
        </div>

        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Prediction Chart</TabsTrigger>
            <TabsTrigger value="models">Model Selection</TabsTrigger>
            <TabsTrigger value="history">Prediction History</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            {predictionData.length > 0 ? (
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    occupancy: {
                      label: "Occupancy %",
                      color: "hsl(var(--chart-1))",
                    },
                    density: {
                      label: "Density (scaled)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="occupancy"
                        stroke="var(--color-occupancy)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="density"
                        stroke="var(--color-density)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Generate a prediction to see forecast data</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="models">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card
                  className={`cursor-pointer ${selectedModel === "standard" ? "border-primary" : ""}`}
                  onClick={() => setSelectedModel("standard")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Standard Model</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Basic prediction model using historical patterns</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer ${selectedModel === "advanced" ? "border-primary" : ""}`}
                  onClick={() => setSelectedModel("advanced")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Advanced Model</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Enhanced predictions with weather and event data</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer ${selectedModel === "experimental" ? "border-primary" : ""}`}
                  onClick={() => setSelectedModel("experimental")}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Experimental</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Cutting-edge AI with real-time adaptation</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            {predictions.length > 0 ? (
              <div className="space-y-4">
                {predictions.map((prediction) => {
                  // Convert prediction timestamp string to Date object
                  const predictionDate = new Date(prediction.timestamp)

                  return (
                    <Card key={prediction.id}>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">
                            Prediction from {predictionDate.toLocaleTimeString()}
                          </CardTitle>
                          <Badge>{prediction.model}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid gap-2 md:grid-cols-3">
                          <div>
                            <p className="text-sm font-medium">15 Minutes</p>
                            <p className="text-sm text-muted-foreground">
                              Occupancy: {prediction.predictions["15min"].occupancy.toFixed(1)}%
                              <br />
                              Density: {prediction.predictions["15min"].density.toFixed(2)}
                              <br />
                              Bottlenecks: {prediction.predictions["15min"].bottlenecks}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">30 Minutes</p>
                            <p className="text-sm text-muted-foreground">
                              Occupancy: {prediction.predictions["30min"].occupancy.toFixed(1)}%
                              <br />
                              Density: {prediction.predictions["30min"].density.toFixed(2)}
                              <br />
                              Bottlenecks: {prediction.predictions["30min"].bottlenecks}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">60 Minutes</p>
                            <p className="text-sm text-muted-foreground">
                              Occupancy: {prediction.predictions["60min"].occupancy.toFixed(1)}%
                              <br />
                              Density: {prediction.predictions["60min"].density.toFixed(2)}
                              <br />
                              Bottlenecks: {prediction.predictions["60min"].bottlenecks}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center border rounded-md">
                <p className="text-muted-foreground">No prediction history available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

