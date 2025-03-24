"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, LineChart, Calendar, Settings, Users, LogOut, Bell, Activity } from "lucide-react"
import Link from "next/link"
import { NotificationsProvider } from "@/components/notifications/notifications-provider"
import { useLanguage } from "@/lib/language-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="floating" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center">
                <img src="/images/logo.png" alt="Arena Pulse" className="h-8 w-8" />
              </div>
              <span className="text-lg font-bold">Arena Pulse</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip={t("Dashboard")}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>{t("Dashboard")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Crowd Analysis link is hidden */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/automated-analysis"}
                  tooltip={t("Automated Analysis")}
                >
                  <Link href="/automated-analysis">
                    <Activity />
                    <span>{t("Automated Analysis")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/predictions"} tooltip={t("Predictions")}>
                  <Link href="/predictions">
                    <LineChart />
                    <span>{t("Predictions")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/events"} tooltip={t("Events")}>
                  <Link href="/events">
                    <Calendar />
                    <span>{t("Events")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/staff"} tooltip={t("Staff")}>
                  <Link href="/staff">
                    <Users />
                    <span>{t("Staff")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip={t("Settings")}>
                  <Link href="/settings">
                    <Settings />
                    <span>{t("Settings")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AZ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Aziz</span>
                  <span className="text-xs text-muted-foreground">{t("Admin")}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {pathname === "/dashboard"
                  ? t("Dashboard")
                  : pathname === "/predictions"
                    ? t("AI Predictions")
                    : pathname === "/automated-analysis"
                      ? t("Automated Analysis")
                      : pathname === "/settings"
                        ? t("Settings")
                        : "Arena Pulse"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {/* Language switcher disabled for now */}
              {/* <LanguageSwitcher /> */}
              <Button variant="outline" size="icon" onClick={() => setNotificationOpen(!notificationOpen)}>
                <Bell className="h-4 w-4" />
              </Button>
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1">
            <NotificationsProvider>
              {children}
              <NotificationCenter open={notificationOpen} onOpenChange={setNotificationOpen} />
            </NotificationsProvider>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

