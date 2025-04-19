"use client"

import type React from "react"

import { Camera, Cog, Home, LogOut, Moon, Search, Sun, Users, Calendar, Car, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { ArenaPulseLogo } from "./arena-pulse-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Import the language context at the top
import { useLanguage } from "@/contexts/language-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { t, language } = useLanguage()

  // Determine if we're in RTL mode
  const isRTL = language === "ar"

  return (
    <Sidebar className={isRTL ? "rtl-sidebar" : ""} {...props}>
      <SidebarHeader className="p-4">
        <ArenaPulseLogo />
        <div className="relative mt-4">
          <Search className={`absolute ${isRTL ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
          <Input
            type="search"
            placeholder={t("search")}
            className={`w-full bg-background ${isRTL ? "pr-8 text-right" : "pl-8 text-left"} text-sm`}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t("dashboard")} isActive={pathname === "/"} asChild>
                  <a href="/" className={isRTL ? "flex flex-row-reverse items-center" : ""}>
                    <Home className="h-4 w-4" />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{t("dashboard")}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t("gate-overview")} isActive={pathname === "/gate-overview"} asChild>
                  <a href="/gate-overview" className={isRTL ? "flex flex-row-reverse items-center" : ""}>
                    <Users className="h-4 w-4" />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{t("gate-overview")}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t("video-feed")} isActive={pathname === "/cameras"} asChild>
                  <a href="/cameras" className={isRTL ? "flex flex-row-reverse items-center" : ""}>
                    <Camera className="h-4 w-4" />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{t("video-feed")}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t("ai-predictions")} isActive={pathname === "/ai-predictions"} asChild>
                  <a href="/ai-predictions" className={isRTL ? "flex flex-row-reverse items-center" : ""}>
                    <Sparkles className="h-4 w-4" />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{t("ai-predictions")}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className={isRTL ? "text-right" : ""}>{t("stadium-services")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("event-schedule")}
                  className={isRTL ? "flex flex-row-reverse items-center" : ""}
                >
                  <Calendar className="h-4 w-4" />
                  <span className={isRTL ? "mr-2" : "ml-2"}>{t("event-schedule")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("parking-management")}
                  isActive={pathname === "/parking-management"}
                  asChild
                >
                  <a href="/parking-management" className={isRTL ? "flex flex-row-reverse items-center" : ""}>
                    <Car className="h-4 w-4" />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{t("parking-management")}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className={isRTL ? "text-right" : ""}>{t("settings")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("settings")}
                  className={isRTL ? "flex flex-row-reverse items-center" : ""}
                >
                  <Cog className="h-4 w-4" />
                  <span className={isRTL ? "mr-2" : "ml-2"}>{t("settings")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className={`flex items-center ${isRTL ? "justify-between flex-row-reverse" : "justify-between"}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
