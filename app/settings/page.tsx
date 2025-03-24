import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="automated-analysis">Automated Analysis</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Aziz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="aziz@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="automated-analysis">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Camera Configuration</CardTitle>
                <CardDescription>Configure camera settings for automated crowd analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="camera-refresh">Camera Refresh Rate (fps)</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="camera-refresh">
                      <SelectValue placeholder="Select refresh rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 fps (Low)</SelectItem>
                      <SelectItem value="15">15 fps (Medium)</SelectItem>
                      <SelectItem value="30">30 fps (High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="camera-resolution">Camera Resolution</Label>
                  <Select defaultValue="720p">
                    <SelectTrigger id="camera-resolution">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="night-mode">Night Vision Mode</Label>
                  <Switch id="night-mode" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Camera Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Settings</CardTitle>
                <CardDescription>Configure AI model and analysis parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select defaultValue="crowd-density-v2">
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crowd-density-v1">Crowd Density v1 (Fast)</SelectItem>
                      <SelectItem value="crowd-density-v2">Crowd Density v2 (Balanced)</SelectItem>
                      <SelectItem value="crowd-density-v3">Crowd Density v3 (Accurate)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analysis-frequency">Analysis Frequency</Label>
                    <span className="text-sm text-muted-foreground">Every 5 seconds</span>
                  </div>
                  <Slider id="analysis-frequency" defaultValue={[5]} max={30} min={1} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>More Frequent (1s)</span>
                    <span>Less Frequent (30s)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-tracking">Enable Person Tracking</Label>
                  <Switch id="enable-tracking" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-heatmap">Generate Heatmaps</Label>
                  <Switch id="enable-heatmap" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save AI Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Configure alert thresholds and notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="crowd-threshold">Crowd Density Threshold</Label>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Slider id="crowd-threshold" defaultValue={[75]} max={100} min={10} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (10%)</span>
                    <span>High (100%)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="movement-threshold">Rapid Movement Threshold</Label>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Slider id="movement-threshold" defaultValue={[60]} max={100} min={10} step={5} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-alerts">Enable Automated Alerts</Label>
                  <Switch id="enable-alerts" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alert-cooldown">Alert Cooldown Period</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="alert-cooldown">
                      <SelectValue placeholder="Select cooldown period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Alert Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Configure data retention and storage settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="store-video">Store Video Footage</Label>
                  <Switch id="store-video" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="store-heatmaps">Store Heatmap Data</Label>
                  <Switch id="store-heatmaps" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backup</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Data Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced system settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="developer-mode">Developer Mode</Label>
                <Switch id="developer-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="debug-logging">Debug Logging</Label>
                <Switch id="debug-logging" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" value="••••••••••••••••" readOnly />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

