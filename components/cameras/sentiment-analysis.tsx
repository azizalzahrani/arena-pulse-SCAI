"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Smile, Frown, Meh, Volume2, AlertTriangle, MessageCircle, Sparkles } from "lucide-react"

interface SentimentAnalysisProps {
  camera: {
    id: string
    name: string
    sentimentScore: number
  }
}

interface SentimentData {
  positive: number
  neutral: number
  negative: number
  recentPhrases: {
    text: string
    sentiment: "positive" | "neutral" | "negative"
    time: string
  }[]
  emotionBreakdown: {
    joy: number
    calm: number
    excitement: number
    confusion: number
    anger: number
    frustration: number
  }
  audioLevel: number
  crowdDensity: number
}

export function SentimentAnalysis({ camera }: SentimentAnalysisProps) {
  const [sentimentData, setSentimentData] = useState<SentimentData>({
    positive: 0,
    neutral: 0,
    negative: 0,
    recentPhrases: [],
    emotionBreakdown: {
      joy: 0,
      calm: 0,
      excitement: 0,
      confusion: 0,
      anger: 0,
      frustration: 0,
    },
    audioLevel: 0,
    crowdDensity: 0,
  })

  // Generate sentiment data based on camera sentiment score
  useEffect(() => {
    const positive = Math.round(camera.sentimentScore * 100)
    const negative = Math.round((1 - camera.sentimentScore) * 50)
    const neutral = 100 - positive - negative

    // Generate random phrases based on sentiment
    const phrases = [
      {
        text: "هذه المباراة رائعة",
        translation: "This match is amazing",
        sentiment: "positive" as const,
        time: "2s ago",
      },
      {
        text: "الفريق يلعب بشكل جيد",
        translation: "The team is playing well",
        sentiment: "positive" as const,
        time: "5s ago",
      },
      {
        text: "متى ستبدأ الاستراحة؟",
        translation: "When will the break start?",
        sentiment: "neutral" as const,
        time: "10s ago",
      },
      {
        text: "أين المخرج؟",
        translation: "Where is the exit?",
        sentiment: "neutral" as const,
        time: "15s ago",
      },
    ]

    // Add negative phrases if sentiment score is low
    if (camera.sentimentScore < 0.7) {
      phrases.push(
        {
          text: "هذا الحكم سيئ",
          translation: "This referee is bad",
          sentiment: "negative" as const,
          time: "8s ago",
        },
        {
          text: "لماذا لا يعمل التكييف؟",
          translation: "Why isn't the AC working?",
          sentiment: "negative" as const,
          time: "12s ago",
        },
      )
    }

    // Emotion breakdown based on sentiment score
    const emotionBreakdown = {
      joy: Math.round(camera.sentimentScore * 80),
      calm: Math.round(camera.sentimentScore * 60),
      excitement: Math.round(camera.sentimentScore * 70),
      confusion: Math.round((1 - camera.sentimentScore) * 40),
      anger: Math.round((1 - camera.sentimentScore) * 30),
      frustration: Math.round((1 - camera.sentimentScore) * 50),
    }

    setSentimentData({
      positive,
      neutral,
      negative,
      recentPhrases: phrases,
      emotionBreakdown,
      audioLevel: Math.round(30 + Math.random() * 50), // 30-80%
      crowdDensity: Math.round(40 + Math.random() * 50), // 40-90%
    })
  }, [camera.sentimentScore])

  // Update audio level periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentData((prev) => ({
        ...prev,
        audioLevel: Math.round(30 + Math.random() * 50), // 30-80%
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Crowd Sentiment Analysis</CardTitle>
            <Badge className="bg-purple-600 text-white">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Overall Sentiment</h3>
            {camera.sentimentScore > 0.7 ? (
              <Badge className="bg-green-500 text-white">Positive</Badge>
            ) : camera.sentimentScore > 0.4 ? (
              <Badge className="bg-yellow-500 text-white">Neutral</Badge>
            ) : (
              <Badge className="bg-red-500 text-white">Negative</Badge>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Smile className="h-3.5 w-3.5 text-green-500 mr-1" />
                <span className="text-green-400">Positive</span>
              </div>
              <span>{sentimentData.positive}%</span>
            </div>
            <Progress value={sentimentData.positive} className="h-1.5 bg-gray-700">
              <div className="h-full bg-green-500 rounded-full" />
            </Progress>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Meh className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                <span className="text-yellow-400">Neutral</span>
              </div>
              <span>{sentimentData.neutral}%</span>
            </div>
            <Progress value={sentimentData.neutral} className="h-1.5 bg-gray-700">
              <div className="h-full bg-yellow-500 rounded-full" />
            </Progress>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Frown className="h-3.5 w-3.5 text-red-500 mr-1" />
                <span className="text-red-400">Negative</span>
              </div>
              <span>{sentimentData.negative}%</span>
            </div>
            <Progress value={sentimentData.negative} className="h-1.5 bg-gray-700">
              <div className="h-full bg-red-500 rounded-full" />
            </Progress>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Audio Analysis</h3>
              <div className="flex items-center">
                <Volume2 className="h-4 w-4 text-blue-400 mr-1" />
                <span className="text-xs">{sentimentData.audioLevel}dB</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Audio Level</span>
                <span>{sentimentData.audioLevel}%</span>
              </div>
              <Progress value={sentimentData.audioLevel} className="h-1.5 bg-gray-700">
                <div
                  className={`h-full rounded-full ${
                    sentimentData.audioLevel > 70
                      ? "bg-red-500"
                      : sentimentData.audioLevel > 50
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
              </Progress>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Crowd Density</span>
                <span>{sentimentData.crowdDensity}%</span>
              </div>
              <Progress value={sentimentData.crowdDensity} className="h-1.5 bg-gray-700">
                <div
                  className={`h-full rounded-full ${
                    sentimentData.crowdDensity > 80
                      ? "bg-red-500"
                      : sentimentData.crowdDensity > 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
              </Progress>

              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-400 mb-2">Audio Alerts</h4>
                <div className="space-y-2">
                  {sentimentData.audioLevel > 70 && (
                    <div className="flex items-start gap-2 bg-red-500/20 p-2 rounded-md text-xs">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-red-400">High Noise Level</p>
                        <p className="text-gray-400 mt-0.5">Crowd noise exceeding threshold</p>
                      </div>
                    </div>
                  )}
                  {sentimentData.negative > 30 && (
                    <div className="flex items-start gap-2 bg-yellow-500/20 p-2 rounded-md text-xs">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-yellow-400">Negative Chanting Detected</p>
                        <p className="text-gray-400 mt-0.5">Potential crowd agitation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white">Emotion Breakdown</h3>
            <div className="mt-4 space-y-2">
              {Object.entries(sentimentData.emotionBreakdown).map(([emotion, value]) => (
                <div key={emotion} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 capitalize">{emotion}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} className="h-1.5 bg-gray-700">
                    <div
                      className={`h-full rounded-full ${
                        emotion === "joy" || emotion === "calm"
                          ? "bg-green-500"
                          : emotion === "excitement"
                            ? "bg-blue-500"
                            : emotion === "confusion"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Speech Recognition</h3>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              <MessageCircle className="h-3.5 w-3.5 mr-1" />
              Real-time
            </Badge>
          </div>

          <Tabs defaultValue="detected" className="mt-4">
            <TabsList className="bg-gray-700 border-gray-600">
              <TabsTrigger value="detected" className="data-[state=active]:bg-gray-600">
                Detected Phrases
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-gray-600">
                Keyword Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detected" className="mt-4">
              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {sentimentData.recentPhrases.map((phrase, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md text-xs ${
                      phrase.sentiment === "positive"
                        ? "bg-green-500/20 border border-green-500/30"
                        : phrase.sentiment === "negative"
                          ? "bg-red-500/20 border border-red-500/30"
                          : "bg-gray-700 border border-gray-600"
                    }`}
                  >
                    <div className="flex justify-between">
                      <p
                        className={
                          phrase.sentiment === "positive"
                            ? "text-green-400 font-medium"
                            : phrase.sentiment === "negative"
                              ? "text-red-400 font-medium"
                              : "text-gray-300 font-medium"
                        }
                      >
                        {phrase.text}
                      </p>
                      <span className="text-gray-500">{phrase.time}</span>
                    </div>
                    <p className="text-gray-400 mt-1">{phrase.translation}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-gray-300">Positive Keywords</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">رائع (amazing)</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">ممتاز (excellent)</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">جميل (beautiful)</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">شكرا (thank you)</Badge>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-gray-300">Negative Keywords</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">سيئ (bad)</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">مشكلة (problem)</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">حار (hot)</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/50">متأخر (late)</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
