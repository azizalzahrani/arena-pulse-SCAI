"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Copy, Eye, EyeOff, KeyRound, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const apiFormSchema = z.object({
  apiEnabled: z.boolean().default(true),
  rateLimit: z.string(),
  webhookUrl: z.string().url().optional().or(z.literal("")),
  webhookSecret: z.string().optional(),
})

type ApiFormValues = z.infer<typeof apiFormSchema>

const defaultValues: Partial<ApiFormValues> = {
  apiEnabled: true,
  rateLimit: "100",
  webhookUrl: "https://webhook.example.com/arena-pulse",
  webhookSecret: "whsec_1234567890abcdef",
}

export default function ApiSettings() {
  const { toast } = useToast()
  const [showApiKey, setShowApiKey] = useState(false)
  const [showWebhookSecret, setShowWebhookSecret] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Mock API keys
  const apiKeys = [
    {
      id: "key_live_1",
      name: "Production API Key",
      key: "ap_live_1234567890abcdefghijklmnopqrstuvwxyz",
      type: "live",
      created: "2023-10-15T14:30:00Z",
      lastUsed: "2024-03-21T08:45:12Z",
    },
    {
      id: "key_test_1",
      name: "Test API Key",
      key: "ap_test_1234567890abcdefghijklmnopqrstuvwxyz",
      type: "test",
      created: "2023-10-15T14:35:00Z",
      lastUsed: "2024-03-20T16:22:45Z",
    },
  ]

  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues,
  })

  function onSubmit(data: ApiFormValues) {
    toast({
      title: "API settings updated",
      description: "Your API settings have been saved successfully.",
    })
    console.log(data)
  }

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: description,
    })
  }

  const regenerateKey = (keyId: string) => {
    toast({
      title: "API key regenerated",
      description: "Your new API key has been generated. Make sure to update your applications.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your API keys, webhooks, and other API-related settings.</p>
      </div>
      <Separator />

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="apiEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">API Access</FormLabel>
                      <FormDescription>Enable or disable API access to your Arena Pulse platform.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rateLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate Limit (requests per minute)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Maximum number of API requests allowed per minute.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>API Documentation</AlertTitle>
                <AlertDescription>
                  View the{" "}
                  <a href="#" className="font-medium underline underline-offset-4">
                    API documentation
                  </a>{" "}
                  to learn how to integrate with Arena Pulse.
                </AlertDescription>
              </Alert>

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Your API Keys</h4>
            <Button size="sm">
              <KeyRound className="mr-2 h-4 w-4" />
              Create New Key
            </Button>
          </div>

          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{apiKey.name}</CardTitle>
                      <CardDescription>Created on {new Date(apiKey.created).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant={apiKey.type === "live" ? "default" : "secondary"}>
                      {apiKey.type === "live" ? "Production" : "Test"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input
                      readOnly
                      value={showApiKey ? apiKey.key : apiKey.key.replace(/./g, "•").substring(0, 32) + "..."}
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(apiKey.key, "API key copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last used: {new Date(apiKey.lastUsed).toLocaleString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => regenerateKey(apiKey.id)}>
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Regenerate
                  </Button>
                  <Button variant="destructive" size="sm">
                    Revoke
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="webhookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-domain.com/webhook" {...field} />
                    </FormControl>
                    <FormDescription>URL where webhook events will be sent.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="webhookSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook Secret</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input type={showWebhookSecret ? "text" : "password"} placeholder="whsec_..." {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                      >
                        {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(form.getValues().webhookSecret || "", "Webhook secret copied to clipboard")
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>Used to verify webhook signatures. Keep this secret secure.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Webhook Events</h4>
                <p className="text-sm text-muted-foreground">Select which events to send to your webhook endpoint.</p>

                <div className="grid gap-2 pt-2">
                  {[
                    "event.created",
                    "event.updated",
                    "event.cancelled",
                    "attendance.updated",
                    "staff.assigned",
                    "alert.triggered",
                  ].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch id={event} defaultChecked={event !== "alert.triggered"} />
                      <label
                        htmlFor={event}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {event}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit">Save Webhook Settings</Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">API Request Logs</h4>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium">
              <div>Timestamp</div>
              <div>Method</div>
              <div>Endpoint</div>
              <div>Status</div>
              <div>IP Address</div>
            </div>
            <Separator />
            {[
              {
                timestamp: "2024-03-22T08:45:12Z",
                method: "GET",
                endpoint: "/api/events",
                status: 200,
                ip: "192.168.1.1",
              },
              {
                timestamp: "2024-03-22T08:43:22Z",
                method: "POST",
                endpoint: "/api/staff/assign",
                status: 201,
                ip: "192.168.1.1",
              },
              {
                timestamp: "2024-03-22T08:40:05Z",
                method: "GET",
                endpoint: "/api/venues",
                status: 200,
                ip: "192.168.1.1",
              },
              {
                timestamp: "2024-03-22T08:38:17Z",
                method: "PUT",
                endpoint: "/api/events/123",
                status: 400,
                ip: "192.168.1.1",
              },
              {
                timestamp: "2024-03-22T08:35:44Z",
                method: "DELETE",
                endpoint: "/api/staff/123",
                status: 204,
                ip: "192.168.1.1",
              },
            ].map((log, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 p-4 text-sm">
                <div>{new Date(log.timestamp).toLocaleString()}</div>
                <div>
                  <Badge
                    variant={
                      log.method === "GET"
                        ? "outline"
                        : log.method === "POST"
                          ? "default"
                          : log.method === "PUT"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {log.method}
                  </Badge>
                </div>
                <div className="font-mono">{log.endpoint}</div>
                <div>
                  <Badge
                    variant={log.status >= 400 ? "destructive" : "outline"}
                    className={log.status < 400 ? "bg-green-500/10 text-green-500" : ""}
                  >
                    {log.status}
                  </Badge>
                </div>
                <div>{log.ip}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

