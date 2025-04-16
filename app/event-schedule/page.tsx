import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { EventScheduleHeader } from "@/components/event-schedule/event-schedule-header"
import { EventCalendar } from "@/components/event-schedule/event-calendar"
import { UpcomingEvents } from "@/components/event-schedule/upcoming-events"
import { EventDetails } from "@/components/event-schedule/event-details"
import { EventAIRecommendations } from "@/components/event-schedule/event-ai-recommendations"
import { EventStaffing } from "@/components/event-schedule/event-staffing"

export const metadata: Metadata = {
  title: "Arena Pulse - Event Schedule",
  description: "Event scheduling and management for stadium operations",
}

export default function EventSchedulePage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">
          <EventScheduleHeader />

          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <EventCalendar />
              </div>
              <div>
                <UpcomingEvents />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <EventDetails />
              </div>
              <div>
                <EventAIRecommendations />
                <div className="mt-6">
                  <EventStaffing />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
