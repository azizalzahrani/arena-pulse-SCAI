import type { Metadata } from "next"
import { SetupDatabase } from "@/components/admin/setup-database"

export const metadata: Metadata = {
  title: "Admin Dashboard | Arena Pulse",
  description: "Arena Pulse Admin Dashboard",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6">
        <SetupDatabase />
      </div>
    </div>
  )
}
