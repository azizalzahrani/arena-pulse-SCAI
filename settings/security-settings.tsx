"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Smartphone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

const securityFormSchema = z.object({
  twoFactorEnabled: z.boolean().default(false),
  passwordExpiryDays: z.string(),
  sessionTimeout: z.string(),
  ipRestriction: z.boolean().default(false),
  allowedIPs: z.string().optional(),
})

type SecurityFormValues = z.infer<typeof securityFormSchema>

const defaultValues: Partial<SecurityFormValues> = {
  twoFactorEnabled: false,
  passwordExpiryDays: "90",
  sessionTimeout: "30",
  ipRestriction: false,
  allowedIPs: "",
}

export default function SecuritySettings() {
  const { toast } = useToast()

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues,
  })

  function onSubmit(data: SecurityFormValues) {
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved successfully.",
    })
    console.log(data)
  }

  // Mock login sessions
  const activeSessions = [
    {
      id: "session_1",
      device: "Chrome on Windows",
      ip: "192.168.1.1",
      location: "Riyadh, Saudi Arabia",
      lastActive: "2024-03-22T08:45:12Z",
      current: true,
    },
    {
      id: "session_2",
      device: "Safari on iPhone",
      ip: "192.168.1.2",
      location: "Riyadh, Saudi Arabia",
      lastActive: "2024-03-21T14:22:45Z",
      current: false,
    },
    {
      id: "session_3",
      device: "Firefox on MacOS",
      ip: "192.168.1.3",
      location: "Jeddah, Saudi Arabia",
      lastActive: "2024-03-20T09:15:33Z",
      current: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication settings.</p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Change Password</h4>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-fit">Update Password</Button>
        </div>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Two-Factor Authentication</h4>

            <FormField
              control={form.control}
              name="twoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel>
                    <FormDescription>Add an extra layer of security to your account.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("twoFactorEnabled") && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Set Up Two-Factor Authentication</CardTitle>
                  <CardDescription>Scan the QR code with your authenticator app</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="h-48 w-48 bg-muted flex items-center justify-center">
                    <Smartphone className="h-12 w-12 text-muted-foreground" />
                    <span className="sr-only">QR Code Placeholder</span>
                  </div>
                  <div className="font-mono text-center text-sm">
                    ABCD EFGH IJKL MNOP
                    <br />
                    QRST UVWX YZ12 3456
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="grid w-full gap-2">
                    <Label htmlFor="verification-code">Enter Verification Code</Label>
                    <Input id="verification-code" placeholder="123456" />
                    <Button className="w-full">Verify and Enable</Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Password and Session Settings</h4>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="passwordExpiryDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Expiry (days)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select password expiry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How often you need to change your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sessionTimeout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Timeout (minutes)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session timeout" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How long until your session expires due to inactivity.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">IP Restrictions</h4>

            <FormField
              control={form.control}
              name="ipRestriction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable IP Restrictions</FormLabel>
                    <FormDescription>Limit access to specific IP addresses.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("ipRestriction") && (
              <FormField
                control={form.control}
                name="allowedIPs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed IP Addresses</FormLabel>
                    <FormControl>
                      <Input placeholder="192.168.1.1, 10.0.0.1" {...field} />
                    </FormControl>
                    <FormDescription>Enter comma-separated IP addresses or CIDR ranges.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <Button type="submit">Save Security Settings</Button>
        </form>
      </Form>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Active Sessions</h4>
          <Button variant="outline" size="sm">
            Revoke All Other Sessions
          </Button>
        </div>

        <div className="space-y-4">
          {activeSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{session.device}</CardTitle>
                  {session.current && <Badge>Current Session</Badge>}
                </div>
                <CardDescription>Last active: {new Date(session.lastActive).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">IP Address:</span> {session.ip}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span> {session.location}
                  </div>
                </div>
              </CardContent>
              {!session.current && (
                <CardFooter>
                  <Button variant="destructive" size="sm">
                    Revoke Session
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Danger Zone</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>These actions are destructive and cannot be undone.</p>
          <div className="flex gap-2">
            <Button variant="destructive">Delete Account</Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

