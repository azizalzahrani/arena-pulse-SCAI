import { AppSidebar } from "@/components/app-sidebar"
import AIPredictionsClient from "./client"

export default function AIPredictionsPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">
          <AIPredictionsClient />
        </main>
      </div>
    </div>
  )
}
