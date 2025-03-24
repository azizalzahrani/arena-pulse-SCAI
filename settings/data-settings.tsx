"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Download, Trash2, Upload, Database, HardDrive } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

const dataFormSchema = z.object({
  dataRetentionPeriod: z.string(),
  autoBackup: z.boolean().default(true),
  backupFrequency: z.string(),
  backupLocation: z.string(),
  compressionEnabled: z.boolean().default(true),
  encryptionEnabled: z.boolean().default(true),
})

type DataFormValues = z.infer<typeof dataFormSchema>

const defaultValues: Partial<DataFormValues> = {
  dataRetentionPeriod: "365",
  autoBackup: true,
  backupFrequency: "daily",
  backupLocation: "cloud",
  compressionEnabled: true,
  encryptionEnabled: true,
}

export default function DataSettings() {
  const { toast } = useToast()

  const form = useForm<DataFormValues>({
    resolver: zodResolver(dataFormSchema),
    defaultValues,
  })

  function onSubmit(data: DataFormValues) {
    toast({
      title: "Data settings updated",
      description: "Your data management settings have been saved successfully.",
    })
    console.log(data)
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export is being prepared. You will be notified when it's ready to download.",
    })
  }

  const handleImportData = () => {
    toast({
      title: "Data import started",
      description: "Your data import is being processed. You will be notified when it's complete.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data Management Settings</h3>
        <p className="text-sm text-muted-foreground">Configure data retention, backup, and export settings.</p>
      </div>
      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              <span>Storage Usage</span>
            </CardTitle>
            <CardDescription>Current storage usage and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Used: 1.2 GB</span>
                <span>Total: 5 GB</span>
              </div>
              <Progress value={24} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Event Data</p>
                <p className="text-muted-foreground">450 MB</p>
              </div>
              <div>
                <p className="font-medium">Crowd Analysis</p>
                <p className="text-muted-foreground">320 MB</p>
              </div>
              <div>
                <p className="font-medium">Staff Records</p>
                <p className="text-muted-foreground">180 MB</p>
              </div>
              <div>
                <p className="font-medium">System Logs</p>
                <p className="text-muted-foreground">250 MB</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Upgrade Storage
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span>Database Status</span>
            </CardTitle>
            <CardDescription>Current database performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-green-500">Healthy</p>
              </div>
              <div>
                <p className="font-medium">Last Backup</p>
                <p className="text-muted-foreground">Today, 03:15 AM</p>
              </div>
              <div>
                <p className="font-medium">Avg. Query Time</p>
                <p className="text-muted-foreground">45ms</p>
              </div>
              <div>
                <p className="font-medium">Total Records</p>
                <p className="text-muted-foreground">1.2M</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>CPU Usage</span>
                <span>32%</span>
              </div>
              <Progress value={32} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Memory Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Metrics
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dataRetentionPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Retention Period (days)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>How long to keep historical data before automatic deletion.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="autoBackup"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Automatic Backups</FormLabel>
                    <FormDescription>Automatically backup your data on a schedule.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("autoBackup") && (
              <div className="grid gap-6 md:grid-cols-2 pl-4">
                <FormField
                  control={form.control}
                  name="backupFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backup Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select backup frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How often to create backups.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backup Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select backup location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="both">Both Local and Cloud</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Where to store your backups.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="compressionEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Compression</FormLabel>
                      <FormDescription>Compress data to save storage space.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="encryptionEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Encryption</FormLabel>
                      <FormDescription>Encrypt backups for added security.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Save Data Settings</Button>
        </form>
      </Form>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Data Import/Export</h4>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Export Data</CardTitle>
              <CardDescription>Download your data in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="export-format">Format</Label>
                  <Select defaultValue="json">
                    <SelectTrigger id="export-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="export-data">Data to Export</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="export-data">
                      <SelectValue placeholder="Select data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Data</SelectItem>
                      <SelectItem value="events">Events Only</SelectItem>
                      <SelectItem value="staff">Staff Only</SelectItem>
                      <SelectItem value="analytics">Analytics Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import Data</CardTitle>
              <CardDescription>Upload data from external sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="import-format">Format</Label>
                  <Select defaultValue="json">
                    <SelectTrigger id="import-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="import-behavior">Import Behavior</Label>
                  <Select defaultValue="merge">
                    <SelectTrigger id="import-behavior">
                      <SelectValue placeholder="Select behavior" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merge">Merge with existing data</SelectItem>
                      <SelectItem value="replace">Replace existing data</SelectItem>
                      <SelectItem value="append">Append to existing data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <Input type="file" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleImportData}>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Danger Zone</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>These actions are destructive and cannot be undone.</p>
          <div className="flex gap-2">
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Data
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset to Factory Settings
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

