"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Shield, Coffee, Ticket, Utensils, Plus, Minus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StaffCategory {
  id: string
  name: string
  count: number
  recommended: number
  status: "optimal" | "understaffed" | "overstaffed"
  icon: React.ReactNode
}

export function EventStaffing() {
  const [activeTab, setActiveTab] = useState("overview")
  const [staffCategories, setStaffCategories] = useState<StaffCategory[]>([
    {
      id: "security",
      name: "Security",
      count: 150,
      recommended: 160,
      status: "understaffed",
      icon: <Shield className="h-4 w-4 text-arena-blue" />,
    },
    {
      id: "concessions",
      name: "Concessions",
      count: 120,
      recommended: 110,
      status: "overstaffed",
      icon: <Utensils className="h-4 w-4 text-arena-orange" />,
    },
    {
      id: "ticketing",
      name: "Ticketing",
      count: 80,
      recommended: 80,
      status: "optimal",
      icon: <Ticket className="h-4 w-4 text-arena-purple" />,
    },
    {
      id: "hospitality",
      name: "Hospitality",
      count: 60,
      recommended: 55,
      status: "overstaffed",
      icon: <Coffee className="h-4 w-4 text-arena-teal" />,
    },
    {
      id: "other",
      name: "Other Staff",
      count: 40,
      recommended: 40,
      status: "optimal",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ])

  const totalStaff = staffCategories.reduce((sum, category) => sum + category.count, 0)
  const totalRecommended = staffCategories.reduce((sum, category) => sum + category.recommended, 0)

  const handleIncrement = (id: string) => {
    setStaffCategories((prev) =>
      prev.map((category) => {
        if (category.id === id) {
          const newCount = category.count + 5
          return {
            ...category,
            count: newCount,
            status:
              newCount < category.recommended
                ? "understaffed"
                : newCount > category.recommended
                  ? "overstaffed"
                  : "optimal",
          }
        }
        return category
      }),
    )
  }

  const handleDecrement = (id: string) => {
    setStaffCategories((prev) =>
      prev.map((category) => {
        if (category.id === id) {
          const newCount = Math.max(0, category.count - 5)
          return {
            ...category,
            count: newCount,
            status:
              newCount < category.recommended
                ? "understaffed"
                : newCount > category.recommended
                  ? "overstaffed"
                  : "optimal",
          }
        }
        return category
      }),
    )
  }

  const getStatusBadge = (status: StaffCategory["status"]) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-green-500">Optimal</Badge>
      case "understaffed":
        return <Badge className="bg-red-500">Understaffed</Badge>
      case "overstaffed":
        return <Badge className="bg-yellow-500">Overstaffed</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Staffing</CardTitle>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTab === "overview" ? (
          <>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-arena-purple" />
                  <h3 className="font-medium">Total Staff</h3>
                </div>
                <Badge
                  className={`${
                    totalStaff === totalRecommended
                      ? "bg-green-500"
                      : totalStaff < totalRecommended
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {totalStaff} / {totalRecommended}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Current</span>
                  <span>Recommended</span>
                </div>
                <Progress
                  value={(totalStaff / totalRecommended) * 100}
                  className="h-2"
                  indicatorClassName={`${
                    totalStaff === totalRecommended
                      ? "bg-green-500"
                      : totalStaff < totalRecommended
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Last updated: 30 minutes ago</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {staffCategories.map((category) => (
                <div key={category.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h4 className="font-medium">{category.name}</h4>
                    </div>
                    {getStatusBadge(category.status)}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Current: {category.count}</span>
                      <span>Recommended: {category.recommended}</span>
                    </div>
                    <Progress
                      value={(category.count / category.recommended) * 100}
                      className="h-2"
                      indicatorClassName={`${
                        category.status === "optimal"
                          ? "bg-green-500"
                          : category.status === "understaffed"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleDecrement(category.id)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleIncrement(category.id)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">Staff Distribution</h4>
              <div className="mt-2 h-40 bg-muted/50 rounded-md flex items-end justify-between p-2">
                {staffCategories.map((category) => (
                  <div key={category.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 rounded-t-sm ${
                        category.status === "optimal"
                          ? "bg-green-500"
                          : category.status === "understaffed"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ height: `${(category.count / 160) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{category.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-3">
              <h4 className="font-medium">Location Allocation</h4>
              <div className="mt-2 space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>North Stand</span>
                    <span>120 staff</span>
                  </div>
                  <Progress value={120 / 4.5} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>South Stand</span>
                    <span>110 staff</span>
                  </div>
                  <Progress value={110 / 4.5} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>East Stand</span>
                    <span>100 staff</span>
                  </div>
                  <Progress value={100 / 4.5} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>West Stand</span>
                    <span>90 staff</span>
                  </div>
                  <Progress value={90 / 4.5} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>VIP Areas</span>
                    <span>30 staff</span>
                  </div>
                  <Progress value={30 / 4.5} className="h-1.5" />
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Optimize Allocation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
