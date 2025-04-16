import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Download, Settings } from "lucide-react"

export function PrayerFacilitiesHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-lg font-semibold">Prayer Facilities</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor prayer facilities across the stadium</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Facilities</TabsTrigger>
                <TabsTrigger value="main">Main Prayer Hall</TabsTrigger>
                <TabsTrigger value="sections">Section Rooms</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
