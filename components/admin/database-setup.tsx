"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Copy, Database, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function DatabaseSetup() {
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
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      console.error("Error setting up database:", err)
      setError(`${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlSetupScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
        <CardDescription>Set up the required database tables for Arena Pulse</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="automatic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automatic">Automatic Setup</TabsTrigger>
            <TabsTrigger value="manual">Manual Setup</TabsTrigger>
          </TabsList>
          <TabsContent value="automatic" className="space-y-4">
            <div className="py-4">
              <p>Click the button below to automatically create and seed the required database tables. This will:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Create the arena_pulse_gates table</li>
                <li>Create the arena_pulse_cameras table</li>
                <li>Create the arena_pulse_events table</li>
                <li>Seed the tables with sample data</li>
              </ul>
            </div>

            <Button onClick={handleSetupDatabase} disabled={loading || success} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up database...
                </>
              ) : success ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Setup Complete!
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Set Up Database
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="success">
                <Check className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Database tables created and seeded successfully. Reloading page...</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="py-4">
              <p>
                If the automatic setup doesn't work, you can manually run the SQL script in the Supabase SQL Editor.
                Copy the script below and paste it into the SQL Editor in your Supabase dashboard.
              </p>
            </div>

            <div className="relative">
              <Textarea className="font-mono text-xs h-[300px] resize-none" readOnly value={sqlSetupScript} />
              <Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={handleCopySQL}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Instructions</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Go to your Supabase dashboard</li>
                  <li>Navigate to the SQL Editor</li>
                  <li>Create a new query</li>
                  <li>Paste the copied SQL</li>
                  <li>Run the query</li>
                </ol>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Having issues? Check the console for detailed error messages.</p>
      </CardFooter>
    </Card>
  )
}

// SQL setup script
const sqlSetupScript = `-- Enable UUID extension if not already enabled
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

-- Create cameras table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_cameras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  detection_count INTEGER DEFAULT 0,
  sentiment_score FLOAT DEFAULT 0,
  anomaly_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table with arena_pulse prefix
CREATE TABLE IF NOT EXISTS arena_pulse_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  event_type TEXT NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample gates data if table is empty
INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'North Gate', 'البوابة الشمالية', 'open', 'main', true, 200, 120, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'South Gate', 'البوابة الجنوبية', 'closed', 'vip', false, 200, 0, 'high'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'East Gate', 'البوابة الشرقية', 'open', 'staff', true, 200, 90, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'West Gate', 'البوابة الغربية', 'maintenance', 'emergency', false, 200, 0, 'normal'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);

INSERT INTO arena_pulse_gates (name, arabic_name, status, type, auto_mode, capacity, current_flow, security_level)
SELECT 'VIP Entrance', 'مدخل كبار الشخصيات', 'open', 'vip', true, 50, 15, 'high'
WHERE NOT EXISTS (SELECT 1 FROM arena_pulse_gates LIMIT 1);`
