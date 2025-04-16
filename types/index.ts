// Common types
export type Direction = "up" | "down"
export type ImpactLevel = "low" | "medium" | "high"
export type TrendDirection = "increasing" | "decreasing" | "stable"

// Camera related types
export interface Camera {
  id: string
  name: string
  image: string
  detectionCount: number
  status?: "online" | "offline" | "maintenance"
  location?: string
  lastUpdated?: Date
}

export interface DetectionBox {
  id: number
  x: number
  y: number
  width: number
  height: number
  confidence: number
  type?: "person" | "vehicle" | "object"
  timestamp: Date
}

// Metrics related types
export interface MetricChange {
  value: string
  direction: Direction
}

export interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  description: string
  change?: MetricChange
  tooltip: string
  alertStyle?: boolean
  extraContent?: React.ReactNode
  onMoreClick?: () => void
}

// Weather related types
export interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  uvIndex: number
  location: string
  timestamp: Date
}

// Prayer times related types
export interface PrayerTime {
  name: string
  time: string
  remaining?: string
}

export interface PrayerTimes {
  dhuhr: PrayerTime
  asr: PrayerTime
  maghrib: PrayerTime
  isha: PrayerTime
  current: keyof PrayerTimes
}

// Sentiment analysis types
export interface SentimentData {
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

// Prediction types
export interface Prediction {
  id: string
  title: string
  description: string
  time: string
  timeRemaining: string
  impact: ImpactLevel
  trend: TrendDirection
  icon: React.ReactNode
  confidence: number
  timestamp: Date
} 