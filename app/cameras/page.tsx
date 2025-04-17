import { CamerasHeader } from "@/components/cameras/cameras-header"
import { EnhancedCameraGrid } from "@/components/cameras/enhanced-camera-grid"
import { CameraInsights } from "@/components/cameras/camera-insights"
import { CameraAIRecommendations } from "@/components/cameras/camera-ai-recommendations"

export default function CamerasPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <CamerasHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EnhancedCameraGrid />
        </div>
        <div className="space-y-4">
          <CameraInsights />
          <CameraAIRecommendations />
        </div>
      </div>
    </div>
  )
}
