import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Settings, Search, Filter } from "lucide-react"

export function CamerasHeader() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Camera Monitoring</h1>
        <p className="text-muted-foreground">
          AI-powered surveillance system with real-time analytics and anomaly detection
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Cameras</TabsTrigger>
              <TabsTrigger value="active">Active Alerts</TabsTrigger>
              <TabsTrigger value="gates">Gates</TabsTrigger>
              <TabsTrigger value="vip">VIP Areas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search cameras..." className="w-[200px] pl-8 bg-background" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button>
            <Camera className="mr-2 h-4 w-4" />
            Add Camera
          </Button>
        </div>
      </div>
    </div>
  )
}
