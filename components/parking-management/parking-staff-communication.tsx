"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Phone } from "lucide-react"

export function ParkingStaffCommunication() {
  const [message, setMessage] = useState("")

  const staffMembers = [
    {
      id: 1,
      name: "Ahmed Al-Farsi",
      role: "North Parking Lead",
      status: "online",
      avatar: "/letter-a-abstract.png",
      lastMessage: "Opening additional lanes at North entrance",
      time: "2 min ago",
    },
    {
      id: 2,
      name: "Fatima Khalid",
      role: "South Parking Lead",
      status: "online",
      avatar: "/abstract-letter-f.png",
      lastMessage: "South parking at 65% capacity",
      time: "5 min ago",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the staff
      setMessage("")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Staff Communication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="flex items-start gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                  <AvatarFallback>{staff.name[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                    staff.status === "online" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{staff.name}</h4>
                    <p className="text-xs text-muted-foreground">{staff.role}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-2 rounded-lg bg-muted p-2">
                  <p className="text-sm">{staff.lastMessage}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{staff.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2">
          <h4 className="mb-2 text-sm font-medium">Quick Messages</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">
              Open reserve section
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Redirect to South
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Status update?
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Need assistance
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
