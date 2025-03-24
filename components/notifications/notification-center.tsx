"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Trash2 } from "lucide-react"
import { useNotifications, type Notification } from "./notifications-provider"
import { formatDistanceToNow } from "date-fns"

export function NotificationCenter({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { notifications, markAsRead, markAllAsRead, clearNotification, clearAllNotifications, unreadCount } =
    useNotifications()
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "warning":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "error":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
            <Bell className="h-4 w-4" />
          </div>
        )
      case "success":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
            <Bell className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllNotifications} disabled={notifications.length === 0}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="warning">Alerts</TabsTrigger>
            <TabsTrigger value="error">Critical</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            {filteredNotifications.length === 0 ? (
              <div className="flex h-[400px] flex-col items-center justify-center">
                <Bell className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-center text-muted-foreground">No notifications to display</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark as read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => clearNotification(notification.id)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

