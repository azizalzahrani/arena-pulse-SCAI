import type { Metadata } from "next"
import EventsHeader from "@/components/events/events-header"
import EventCalendar from "@/components/events/event-calendar"
import UpcomingEventsList from "@/components/events/upcoming-events-list"
import EventAttendanceForecast from "@/components/events/event-attendance-forecast"
import EventStaffingOptimizer from "@/components/events/event-staffing-optimizer"
import EventPerformanceMetrics from "@/components/events/event-performance-metrics"
import EventConflictAnalyzer from "@/components/events/event-conflict-analyzer"
import AISolutionsColumn from "@/components/dashboard/ai-solutions-column"

export const metadata: Metadata = {
  title: "Events | Arena Pulse",
  description: "Event management and AI-powered optimization for sports venues",
}

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <EventsHeader />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <EventCalendar />
          <UpcomingEventsList />
          <EventConflictAnalyzer />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EventAttendanceForecast />
            <EventStaffingOptimizer />
          </div>
          <EventPerformanceMetrics />
        </div>
        <AISolutionsColumn />
      </div>
    </div>
  )
}

