"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Mock integrations data
const integrations = [
  {
    id: "weather",
    name: "Weather API",
    description: "Integrate with weather data to predict attendance and plan for weather-related issues.",
    icon: "🌦️",
    connected: true,
    apiKey: "wth_1234567890abcdef",
  },
  {
    id: "maps",
    name: "Maps Integration",
    description: "Connect with mapping services for venue layouts and navigation.",
    icon: "🗺️",
    connected: true,
    apiKey: "map_1234567890abcdef",
  },
  {
    id: "ticketing",
    name: "Ticketing System",
    description: "Connect with your ticketing system to track sales and attendance.",
    icon: "🎟️",
    connected: false,
    apiKey: "",
  },
  {
    id: "analytics",
    name: "Analytics Platform",
    description: "Integrate with external analytics platforms for advanced data analysis.",
    icon: "📊",
    connected: false,
    apiKey: "",
  },
  {
    id: "sms",
    name: "SMS Gateway",
    description: "Connect with SMS providers for emergency notifications.",
    icon: "📱",
    connected: true,
    apiKey: "sms_1234567890abcdef",
  },
]

export default function IntegrationSettings() {
  const { toast } = useToast()
  const [activeIntegrations, setActiveIntegrations] = useState(integrations.filter((i) => i.connected).map((i) => i.id))

  const toggleIntegration = (id: string) => {
    if (activeIntegrations.includes(id)) {
      setActiveIntegrations(activeIntegrations.filter((i) => i !== id))
      toast({
        title: "Integration disconnected",
        description: `The ${integrations.find((i) => i.id === id)?.name} integration has been disconnected.`,
      })
    } else {
      setActiveIntegrations([...activeIntegrations, id])
      toast({
        title: "Integration connected",
        description: `The ${integrations.find((i) => i.id === id)?.name} integration has been connected.`,
      })
    }
  }

  const saveApiKey = (id: string) => {
    toast({
      title: "API key saved",
      description: `The API key for ${integrations.find((i) => i.id === id)?.name} has been saved.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integration Settings</h3>
        <p className="text-sm text-muted-foreground">Connect Arena Pulse with external services and APIs.</p>
      </div>
      <Separator />

      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{integration.icon}</span>
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                </div>
                <Badge variant={activeIntegrations.includes(integration.id) ? "default" : "outline"}>
                  {activeIntegrations.includes(integration.id) ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor={`${integration.id}-toggle`}>Enable Integration</Label>
                <Switch
                  id={`${integration.id}-toggle`}
                  checked={activeIntegrations.includes(integration.id)}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>

              {activeIntegrations.includes(integration.id) && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor={`${integration.id}-api-key`}>API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`${integration.id}-api-key`}
                      defaultValue={integration.apiKey}
                      type="password"
                      placeholder="Enter API key"
                    />
                    <Button onClick={() => saveApiKey(integration.id)}>Save</Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button>Add New Integration</Button>
      </div>
    </div>
  )
}

