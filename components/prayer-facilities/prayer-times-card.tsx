import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function PrayerTimesCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Prayer Times</CardTitle>
        <CardDescription>Today's prayer schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Fajr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">5:12 AM</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                Completed
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Dhuhr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">12:30 PM</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                Current
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Asr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">3:45 PM</span>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                Upcoming
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Maghrib</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">6:58 PM</span>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                Upcoming
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Isha</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">8:30 PM</span>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                Upcoming
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
