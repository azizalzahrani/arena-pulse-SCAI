"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, Briefcase } from "lucide-react"

// Mock data for staff overview
const staffOverviewData = {
  totalStaff: 1248,
  totalStaffChange: 5.2,
  activeStaff: 876,
  activeStaffChange: 3.8,
  averageHours: 24.5,
  averageHoursChange: -2.1,
  staffUtilization: 82,
  staffUtilizationChange: 4.3,
}

export default function StaffOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffOverviewData.totalStaff.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {staffOverviewData.totalStaffChange > 0 ? "+" : ""}
            {staffOverviewData.totalStaffChange}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffOverviewData.activeStaff.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {staffOverviewData.activeStaffChange > 0 ? "+" : ""}
            {staffOverviewData.activeStaffChange}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffOverviewData.averageHours} hrs/week</div>
          <p className="text-xs text-muted-foreground">
            {staffOverviewData.averageHoursChange > 0 ? "+" : ""}
            {staffOverviewData.averageHoursChange}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Staff Utilization</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffOverviewData.staffUtilization}%</div>
          <p className="text-xs text-muted-foreground">
            {staffOverviewData.staffUtilizationChange > 0 ? "+" : ""}
            {staffOverviewData.staffUtilizationChange}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

