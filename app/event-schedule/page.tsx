import { EventScheduleHeader } from "@/components/event-schedule/event-schedule-header"
import { UpcomingEvents } from "@/components/event-schedule/upcoming-events"
import { EventCalendar } from "@/components/event-schedule/event-calendar"
import { EventAIInsights } from "@/components/event-schedule/event-ai-insights"
import { EventDetailsPanel } from "@/components/event-schedule/event-details-panel"
import { EventCapacityPlanning } from "@/components/event-schedule/event-capacity-planning"

export default function EventSchedulePage() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="bg-gradient-to-r from-arena-purple/90 to-arena-blue/90 text-white">
        <div className="container mx-auto px-4 py-8">
          <EventScheduleHeader />
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingEvents />
          </div>
          <div className="lg:col-span-1">
            <EventAIInsights />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EventCalendar />
          </div>
          <div className="lg:col-span-1">
            <EventDetailsPanel />
          </div>
        </div>

        <EventCapacityPlanning />
      </div>
    </main>
  )
}
