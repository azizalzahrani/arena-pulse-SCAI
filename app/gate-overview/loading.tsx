import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gate Control Panel Skeleton */}
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>

        {/* Stadium Blueprint Skeleton */}
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gate Traffic Analytics Skeleton */}
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>

        {/* Gate Security Status Skeleton */}
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
