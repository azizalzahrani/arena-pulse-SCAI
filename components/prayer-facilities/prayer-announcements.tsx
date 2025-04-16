import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Info } from "lucide-react"

export function PrayerAnnouncements() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Announcements</CardTitle>
        <CardDescription>Important prayer-related notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 border rounded-md bg-amber-50">
            <Info className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <div className="font-medium text-sm">Special Jumu'ah Prayer</div>
              <p className="text-xs text-muted-foreground mt-1">
                This Friday's Jumu'ah prayer will be held in the main stadium area to accommodate the large crowd
                expected for the championship game.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  Friday, 1:00 PM
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border rounded-md">
            <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-sm">Wudu Area Maintenance</div>
              <p className="text-xs text-muted-foreground mt-1">
                The wudu area near Gate C will be under maintenance from 2 PM to 3 PM today. Please use the facilities
                at Gate A or the Main Prayer Hall.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  Today, 2:00 PM - 3:00 PM
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 border rounded-md">
            <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-sm">Prayer Mats Available</div>
              <p className="text-xs text-muted-foreground mt-1">
                New prayer mats are now available at all prayer facilities. Please return them to the designated areas
                after use.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
