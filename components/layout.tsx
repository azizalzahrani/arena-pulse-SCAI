"use client"

import { ErrorBoundary } from "@/components/error-boundary"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white">
        {children}
      </div>
    </ErrorBoundary>
  )
} 