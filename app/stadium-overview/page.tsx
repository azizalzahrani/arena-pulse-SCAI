import { StadiumOverview } from "@/components/dashboard/stadium-overview"

export default function StadiumOverviewPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Stadium Overview</h1>
      </div>

      <StadiumOverview />
    </div>
  )
}
