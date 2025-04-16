"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Unlock, Clock, Settings } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GateData {
  id: string
  name: string
  arabicName: string
  status: "open" | "closed" | "partial" | "maintenance"
  type: "main" | "vip" | "service" | "emergency" | "family"
  autoMode: boolean
}

const gates: GateData[] = [
  {
    id: "north-main",
    name: "North Main Gate",
    arabicName: "البوابة الرئيسية الشمالية",
    status: "open",
    type: "main",
    autoMode: true,
  },
  {
    id: "north-vip",
    name: "North VIP Gate",
    arabicName: "بوابة كبار الشخصيات الشمالية",
    status: "partial",
    type: "vip",
    autoMode: true,
  },
  {
    id: "east-main",
    name: "East Main Gate",
    arabicName: "البوابة الرئيسية الشرقية",
    status: "open",
    type: "main",
    autoMode: true,
  },
  {
    id: "east-service",
    name: "East Service Gate",
    arabicName: "بوابة الخدمة الشرقية",
    status: "closed",
    type: "service",
    autoMode: false,
  },
  {
    id: "south-main",
    name: "South Main Gate",
    arabicName: "البوابة الرئيسية الجنوبية",
    status: "open",
    type: "main",
    autoMode: true,
  },
  {
    id: "south-family",
    name: "South Family Gate",
    arabicName: "بوابة العائلة الجنوبية",
    status: "open",
    type: "family",
    autoMode: true,
  },
  {
    id: "west-main",
    name: "West Main Gate",
    arabicName: "البوابة الرئيسية الغربية",
    status: "open",
    type: "main",
    autoMode: true,
  },
  {
    id: "west-emergency",
    name: "West Emergency Exit",
    arabicName: "مخرج الطوارئ الغربي",
    status: "closed",
    type: "emergency",
    autoMode: false,
  },
  {
    id: "northwest-service",
    name: "Northwest Service Gate",
    arabicName: "بوابة الخدمة الشمالية الغربية",
    status: "maintenance",
    type: "service",
    autoMode: false,
  },
  {
    id: "northeast-emergency",
    name: "Northeast Emergency Exit",
    arabicName: "مخرج الطوارئ الشمالي الشرقي",
    status: "closed",
    type: "emergency",
    autoMode: false,
  },
]

export function GateControlPanel() {
  const [activeTab, setActiveTab] = useState("all")
  const [gateList, setGateList] = useState<GateData[]>(gates)

  const handleToggleGate = (gateId: string) => {
    setGateList((prev) =>
      prev.map((gate) => {
        if (gate.id === gateId) {
          return {
            ...gate,
            status: gate.status === "open" ? "closed" : "open",
          }
        }
        return gate
      }),
    )
  }

  const handleToggleAutoMode = (gateId: string, checked: boolean) => {
    setGateList((prev) =>
      prev.map((gate) => {
        if (gate.id === gateId) {
          return {
            ...gate,
            autoMode: checked,
          }
        }
        return gate
      }),
    )
  }

  const handleOpenAllGates = () => {
    if (confirm("Are you sure you want to open ALL gates?")) {
      setGateList((prev) =>
        prev.map((gate) => ({
          ...gate,
          status: "open",
        })),
      )
    }
  }

  const handleCloseAllGates = () => {
    if (confirm("Are you sure you want to close ALL gates?")) {
      setGateList((prev) =>
        prev.map((gate) => ({
          ...gate,
          status: "closed",
        })),
      )
    }
  }

  const filteredGates = activeTab === "all" ? gateList : gateList.filter((gate) => gate.type === activeTab)

  const getStatusBadge = (status: GateData["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Open</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>
      case "maintenance":
        return <Badge className="bg-blue-500">Maintenance</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gate Control Panel</CardTitle>
            <p className="text-sm text-muted-foreground">Manage and monitor all stadium gates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs flex items-center gap-1"
              onClick={handleOpenAllGates}
            >
              <Unlock className="h-3.5 w-3.5" />
              Open All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs flex items-center gap-1"
              onClick={handleCloseAllGates}
            >
              <Lock className="h-3.5 w-3.5" />
              Close All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="main">Main</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 pb-4 space-y-2">
            {filteredGates.map((gate) => (
              <div key={gate.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{gate.name}</h3>
                      {getStatusBadge(gate.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{gate.arabicName}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => handleToggleGate(gate.id)}
                    disabled={gate.status === "maintenance"}
                  >
                    {gate.status === "open" ? (
                      <>
                        <Lock className="h-3.5 w-3.5 mr-1" />
                        Close
                      </>
                    ) : gate.status === "closed" ? (
                      <>
                        <Unlock className="h-3.5 w-3.5 mr-1" />
                        Open
                      </>
                    ) : gate.status === "partial" ? (
                      <>
                        <Lock className="h-3.5 w-3.5 mr-1" />
                        Close
                      </>
                    ) : (
                      <>
                        <Settings className="h-3.5 w-3.5 mr-1" />
                        In Maintenance
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Label htmlFor={`auto-${gate.id}`} className="text-xs">
                        Auto Mode
                      </Label>
                      <Switch
                        id={`auto-${gate.id}`}
                        size="sm"
                        checked={gate.autoMode}
                        onCheckedChange={(checked) => handleToggleAutoMode(gate.id, checked)}
                        disabled={gate.status === "maintenance"}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {gate.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">Status Summary:</span>{" "}
              <span className="text-muted-foreground">
                {gateList.filter((g) => g.status === "open").length} Open,{" "}
                {gateList.filter((g) => g.status === "closed").length} Closed,{" "}
                {gateList.filter((g) => g.status === "partial").length} Partial,{" "}
                {gateList.filter((g) => g.status === "maintenance").length} Maintenance
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Last updated: 2 minutes ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
