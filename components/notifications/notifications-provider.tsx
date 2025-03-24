"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { mockNotifications } from "@/lib/mock-data"
import { fetchNotifications } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"

export type NotificationType = "info" | "warning" | "error" | "success"

export interface Notification {
  id: string
  title: string
  description: string
  type: NotificationType
  timestamp: Date
  read?: boolean
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAllNotifications: () => void
  unreadCount: number
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()
  const unreadCount = notifications.filter((n) => !n.read).length

  // Initialize notifications
  useEffect(() => {
    let isMounted = true

    async function loadNotifications() {
      try {
        // Get mock notifications
        const notificationsData = await fetchNotifications()

        if (isMounted) {
          setNotifications(notificationsData)
        }
      } catch (error) {
        console.error("Failed to load notifications:", error)

        if (isMounted) {
          // Use mock data as fallback
          setNotifications(mockNotifications)
        }
      }
    }

    loadNotifications()

    // Simulate receiving new notifications
    const mockInterval = setInterval(() => {
      // 10% chance of receiving a new notification every minute
      if (Math.random() < 0.1) {
        const types: NotificationType[] = ["info", "warning", "error", "success"]
        const randomType = types[Math.floor(Math.random() * types.length)]

        const newNotification: Notification = {
          id: `local-${Date.now()}`,
          title: randomType === "warning" || randomType === "error" ? "Crowd Density Alert" : "System Update",
          description:
            randomType === "warning" || randomType === "error"
              ? "Unusual crowd density detected at King Fahd Stadium Gate 2. Please investigate."
              : "System has been updated with the latest data.",
          type: randomType,
          timestamp: new Date(),
        }

        addNotification(newNotification)
      }
    }, 60000) // Check every minute

    return () => {
      isMounted = false
      clearInterval(mockInterval)
    }
  }, [toast])

  const addNotification = (notification: Notification) => {
    // Update the UI
    setNotifications((prev) => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

