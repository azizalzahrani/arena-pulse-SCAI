"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileSettings from "./profile-settings"
import GeneralSettings from "./general-settings"
import ApiSettings from "./api-settings"
import NotificationSettings from "./notification-settings"
import SecuritySettings from "./security-settings"
import IntegrationSettings from "./integration-settings"
import DisplaySettings from "./display-settings"
import DataSettings from "./data-settings"

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="display">Display</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>

      <Card className="p-6">
        <TabsContent value="general" className="mt-0">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="profile" className="mt-0">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="api" className="mt-0">
          <ApiSettings />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="integrations" className="mt-0">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="display" className="mt-0">
          <DisplaySettings />
        </TabsContent>

        <TabsContent value="data" className="mt-0">
          <DataSettings />
        </TabsContent>
      </Card>
    </Tabs>
  )
}

