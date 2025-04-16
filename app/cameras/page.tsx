import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { CamerasHeader } from "@/components/cameras/cameras-header"
import { CameraGrid } from "@/components/cameras/camera-grid"

export const metadata: Metadata = {
  title: "Arena Pulse - Video Surveillance",
  description: "Advanced AI-powered video surveillance and crowd monitoring system",
}

export default function CamerasPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto bg-black">
          <CamerasHeader />
          <div className="container mx-auto p-4">
            <CameraGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
