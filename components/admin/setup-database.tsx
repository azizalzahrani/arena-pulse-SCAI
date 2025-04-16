"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Database, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SetupDatabase() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSetupDatabase = async () => {
    try {
      setIsLoading(true)
      setResult(null)

      const response = await fetch("/api/setup-db")
      const data = await response.json()

      setResult({
        success: data.success,
        message: data.message || (data.success ? "Database setup completed successfully!" : "Database setup failed."),
      })
    } catch (error) {
      console.error("Error setting up database:", error)
      setResult({
        success: false,
        message: "An unexpected error occurred while setting up the database.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
        <CardDescription>Initialize the database tables and seed with sample data if needed</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will create the necessary tables in your Supabase database if they don't already exist, and populate them
          with sample data if they're empty.
        </p>

        {result && (
          <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSetupDatabase} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Up Database...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Setup Database
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
