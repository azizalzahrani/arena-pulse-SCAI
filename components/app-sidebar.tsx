"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  DoorOpenIcon as GateOpen,
  Camera,
  Brain,
  Calendar,
  Car,
  HandIcon as PrayingHands,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArenaPulseLogo } from "./arena-pulse-logo"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Gate Overview",
      icon: GateOpen,
      href: "/gate-overview",
      active: pathname === "/gate-overview",
    },
    {
      label: "Cameras",
      icon: Camera,
      href: "/cameras",
      active: pathname === "/cameras",
    },
    {
      label: "AI Predictions",
      icon: Brain,
      href: "/ai-predictions",
      active: pathname === "/ai-predictions",
    },
    {
      label: "Event Schedule",
      icon: Calendar,
      href: "/event-schedule",
      active: pathname === "/event-schedule",
    },
    {
      label: "Parking Management",
      icon: Car,
      href: "/parking-management",
      active: pathname === "/parking-management",
    },
    {
      label: "Prayer Facilities",
      icon: PrayingHands,
      href: "/prayer-facilities",
      active: pathname === "/prayer-facilities",
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-6 w-80">
          <ScrollArea className="py-4">
            <div className="flex flex-col space-y-2">
              <div className="px-7 pb-3">
                <ArenaPulseLogo />
              </div>
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
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className={cn("fixed hidden md:flex flex-col w-[280px] border-r h-screen bg-gray-50/50", className)}>
        <ScrollArea className="py-4 flex-1">
          <div className="flex flex-col space-y-2">
            <div className="px-7 pb-3">
              <ArenaPulseLogo />
            </div>
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
      </aside>
    </>
  )
}
