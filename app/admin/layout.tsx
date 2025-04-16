import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata: Metadata = {
  title: "Arena Pulse - Admin Dashboard",
  description: "Admin interface for managing stadium data",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 md:ml-[280px]">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
