import { Clock } from "lucide-react"

interface LastUpdatedProps {
  timestamp: Date | null
  className?: string
}

export function LastUpdated({ timestamp, className = "" }: LastUpdatedProps) {
  if (!timestamp) return null

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className={`flex items-center text-xs text-muted-foreground ${className}`}>
      <Clock className="h-3 w-3 mr-1" />
      <span>Last updated: {formatTime(timestamp)}</span>
    </div>
  )
}
