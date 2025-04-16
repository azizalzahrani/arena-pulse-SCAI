"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"

interface AdminHeaderProps {
  title: string
  description?: string
  onRefresh?: () => void
  onAdd?: () => void
  showAddButton?: boolean
  isRefreshing?: boolean
}

export function AdminHeader({
  title,
  description,
  onRefresh,
  onAdd,
  showAddButton = false,
  isRefreshing = false,
}: AdminHeaderProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
          {showAddButton && onAdd && (
            <Button size="sm" onClick={onAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
