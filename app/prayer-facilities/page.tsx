import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { PrayerFacilitiesHeader } from "@/components/prayer-facilities/prayer-facilities-header"
import { PrayerTimesCard } from "@/components/prayer-facilities/prayer-times-card"
import { PrayerLocationsMap } from "@/components/prayer-facilities/prayer-locations-map"
import { PrayerCapacityMonitor } from "@/components/prayer-facilities/prayer-capacity-monitor"
import { PrayerAnnouncements } from "@/components/prayer-facilities/prayer-announcements"
import { PrayerAIInsights } from "@/components/prayer-facilities/prayer-ai-insights"

export const metadata: Metadata = {
  title: "Arena Pulse - Prayer Facilities",
  description: "Prayer facilities management and monitoring for stadium operations",
}

export default function PrayerFacilitiesPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">
          <PrayerFacilitiesHeader />

          <div className="container mx-auto p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PrayerTimesCard />
              <PrayerCapacityMonitor />
              <PrayerAnnouncements />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PrayerLocationsMap />
              <PrayerAIInsights />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
