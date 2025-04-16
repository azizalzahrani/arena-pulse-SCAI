"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  DoorOpenIcon as GateIcon,
  Camera,
  Calendar,
  Car,
  Brain,
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArenaPulseLogo } from "@/components/arena-pulse-logo"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Gates",
      icon: GateIcon,
      href: "/admin/gates",
      active: pathname === "/admin/gates",
    },
    {
      label: "Cameras",
      icon: Camera,
      href: "/admin/cameras",
      active: pathname === "/admin/cameras",
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/admin/events",
      active: pathname === "/admin/events",
    },
    {
      label: "Parking",
      icon: Car,
      href: "/admin/parking",
      active: pathname === "/admin/parking",
    },
    {
      label: "AI Predictions",
      icon: Brain,
      href: "/admin/predictions",
      active: pathname === "/admin/predictions",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <aside className="fixed hidden md:flex flex-col w-[280px] border-r h-screen bg-gray-50/50">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <ArenaPulseLogo />
          <span className="font-semibold text-lg">Admin</span>
        </div>
      </div>
      <ScrollArea className="py-4 flex-1">
        <div className="flex flex-col space-y-1 px-3">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal",
                  route.active ? "bg-secondary hover:bg-secondary/80" : "hover:bg-secondary/50",
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                <span>{route.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </aside>
  )
}
