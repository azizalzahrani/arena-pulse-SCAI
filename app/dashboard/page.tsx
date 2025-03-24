"use client"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import OverviewCards from "@/components/dashboard/overview-cards"
import CrowdDensityChart from "@/components/dashboard/crowd-density-chart"
import TicketSalesChart from "@/components/dashboard/ticket-sales-chart"
import RecentEvents from "@/components/dashboard/recent-events"
import UpcomingEvents from "@/components/dashboard/upcoming-events"
import AISolutionsColumn from "@/components/dashboard/ai-solutions-column"
import { useLanguage } from "@/lib/language-context"

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <DashboardHeader />
      <OverviewCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CrowdDensityChart />
            <TicketSalesChart />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <RecentEvents />
            <UpcomingEvents />
          </div>
        </div>
        <AISolutionsColumn />
      </div>
    </div>
  )
}

