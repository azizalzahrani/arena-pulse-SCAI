"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Copy, Database, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function SetupDatabase() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSetupDatabase = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const response = await fetch("/api/setup-db-direct", {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to set up database")
      }

      setSuccess(true)
    } catch (err) {
      console.error("Error setting up database:", err)
      setError(`${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopySQL = () => {
    navigator.clipboard.writeText(setupSQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const setupSQL = `-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create gates table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  arabic_name TEXT,
  status TEXT NOT NULL,
  type TEXT NOT NULL,
  auto_mode BOOLEAN DEFAULT false,
  capacity INTEGER NOT NULL,
  current_flow INTEGER NOT NULL DEFAULT 0,
  security_level TEXT NOT NULL DEFAULT 'normal',
  last_activity TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample gates data if table is empty
INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'North Gate', 'البوابة الشمالية', 'open', 'main', true, 200, 120, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'South Gate', 'البوابة الجنوبية', 'closed', 'vip', false, 200, 0, 'high'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
        <CardDescription>Set up the database tables for Arena Pulse</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="automatic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automatic">Automatic Setup</TabsTrigger>
            <TabsTrigger value="manual">Manual Setup</TabsTrigger>
          </TabsList>
          <TabsContent value="automatic" className="space-y-4">
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Click the button below to automatically set up the database tables. This will create the necessary
                tables and seed them with sample data.
              </p>
            </div>
            <Button onClick={handleSetupDatabase} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Setup Database
                </>
              )}
            </Button>
            {success && (
              <Alert variant="success" className="mt-4">
                <Check className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Database tables have been set up successfully.</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
          <TabsContent value="manual" className="space-y-4">
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                If the automatic setup doesn't work, you can manually set up the database by running the following SQL
                in the Supabase SQL Editor.
              </p>
            </div>
            <div className="relative">
              <Textarea value={setupSQL} readOnly className="font-mono text-xs h-64 resize-none" />
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={handleCopySQL}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to your Supabase project dashboard</li>
                <li>Click on "SQL Editor" in the left sidebar</li>
                <li>Create a new query</li>
                <li>Paste the SQL above</li>
                <li>Click "Run" to execute the query</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Note: This will create tables with the prefix "arena_pulse_" in the public schema.
        </p>
      </CardFooter>
    </Card>
  )
}
