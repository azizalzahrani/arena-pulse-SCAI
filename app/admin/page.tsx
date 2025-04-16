import { AdminHeader } from "@/components/admin/admin-header"
import { SetupDatabase } from "@/components/admin/setup-database"

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader
        title="Admin Dashboard"
        description="Manage and configure the Arena Pulse system"
        showAddButton={false}
      />

      <div className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SetupDatabase />
          {/* Other admin cards can go here */}
        </div>
      </div>
    </div>
  )
}
