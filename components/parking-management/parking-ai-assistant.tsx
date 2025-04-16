"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIBadge } from "@/components/ui/ai-badge"

// Mock AI responses for parking-related queries
const mockResponses: Record<string, string> = {
  "parking availability":
    "Current parking availability is at 68%. North lots are filling up quickly due to the ongoing event.",
  "vip parking":
    "VIP parking sections A and B are currently at 45% capacity. All VIP spots are expected to be filled 30 minutes before the event starts.",
  "handicap parking":
    "Handicap parking is available in all sections. Section C has the most availability with 12 spots remaining.",
  "parking forecast":
    "Based on historical data and today's event, we expect parking to reach 85% capacity by 6:30 PM and full capacity by 7:15 PM.",
  "traffic conditions":
    "Current traffic conditions around the stadium are moderate. Expect delays of 10-15 minutes when approaching from the south entrance.",
  "best parking":
    "For the quickest entry at this time, we recommend using the East parking lot (Lot E) which currently has 120 available spots and minimal traffic.",
}

export function ParkingAIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Check for keyword matches in the mock responses
      const matchedResponse = Object.entries(mockResponses).find(([key]) => query.toLowerCase().includes(key))

      if (matchedResponse) {
        setResponse(matchedResponse[1])
      } else {
        setResponse(
          "I don't have specific information about that. Please try asking about parking availability, VIP parking, handicap parking, or traffic conditions.",
        )
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Parking Assistant</CardTitle>
          <AIBadge />
        </div>
        <CardDescription>Ask questions about parking status and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {response && <div className="bg-muted p-3 rounded-lg text-sm">{response}</div>}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask about parking..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !query.trim()}>
            {isLoading ? "..." : "Ask"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Powered by AI for real-time parking insights</CardFooter>
    </Card>
  )
}
