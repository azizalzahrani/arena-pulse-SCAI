import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function PrayerLocationsMap() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Prayer Locations</CardTitle>
            <CardDescription>Stadium prayer facilities map</CardDescription>
          </div>
          <Badge className="bg-arena-purple text-white">6 Locations</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[16/9] overflow-hidden rounded-md">
          <Image
            src="/community-prayer-tracking.png"
            alt="Stadium prayer facilities map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Location markers */}
          <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-[60%] left-[20%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-[70%] left-[50%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-[30%] left-[80%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute top-[50%] left-[40%] w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">Main Hall</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">Gate A</span>
            <span className="font-medium">42%</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">Gate C</span>
            <span className="font-medium">30%</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">VIP Area</span>
            <span className="font-medium">15%</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">Section 2</span>
            <span className="font-medium">60%</span>
          </div>
          <div className="flex flex-col items-center p-2 border rounded-md">
            <span className="text-xs text-muted-foreground">Section 5</span>
            <span className="font-medium">25%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
