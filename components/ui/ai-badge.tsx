import { Badge } from "@/components/ui/badge"
import { SparklesIcon } from "lucide-react"

export function AIBadge() {
  return (
    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
      <SparklesIcon className="h-3 w-3 mr-1" />
      AI Powered
    </Badge>
  )
}
