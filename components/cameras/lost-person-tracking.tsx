"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Upload, User, Clock, MapPin, Check, AlertTriangle, Camera, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LostPersonTrackingProps {
  camera: {
    id: string
    name: string
  }
}

interface MatchResult {
  id: string
  confidence: number
  location: string
  timestamp: string
  cameraId: string
  status: "pending" | "verified" | "rejected"
}

export function LostPersonTracking({ camera }: LostPersonTrackingProps) {
  const [searchActive, setSearchActive] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [searchDescription, setSearchDescription] = useState("")
  const [searchAge, setSearchAge] = useState("child")
  const [searchGender, setSearchGender] = useState("male")
  const [searchClothing, setSearchClothing] = useState("")

  const handleStartSearch = () => {
    if (!searchDescription) return

    setSearchActive(true)
    setSearchProgress(0)
    setMatchResults([])

    // Simulate search progress
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        const newProgress = prev + 5

        // Generate results at 60% completion
        if (prev < 60 && newProgress >= 60) {
          generateResults()
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 200)
  }

  const generateResults = () => {
    const results: MatchResult[] = [
      {
        id: "match-1",
        confidence: 87,
        location: "Near Gate A",
        timestamp: "2 minutes ago",
        cameraId: "gate-a",
        status: "pending",
      },
      {
        id: "match-2",
        confidence: 72,
        location: "Food Court",
        timestamp: "5 minutes ago",
        cameraId: "food-court",
        status: "pending",
      },
      {
        id: "match-3",
        confidence: 65,
        location: "Concourse",
        timestamp: "8 minutes ago",
        cameraId: "concourse",
        status: "pending",
      },
    ]

    setMatchResults(results)
  }

  const handleReset = () => {
    setSearchActive(false)
    setSearchProgress(0)
    setMatchResults([])
    setSearchDescription("")
    setSearchClothing("")
  }

  const handleVerifyMatch = (id: string) => {
    setMatchResults((prev) => prev.map((match) => (match.id === id ? { ...match, status: "verified" } : match)))
  }

  const handleRejectMatch = (id: string) => {
    setMatchResults((prev) => prev.map((match) => (match.id === id ? { ...match, status: "rejected" } : match)))
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Lost Person Tracking</CardTitle>
            <Badge className="bg-purple-600 text-white">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white">Lost Person Search</h3>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs text-gray-400">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Describe the person..."
                  className="bg-gray-700 border-gray-600 text-white"
                  value={searchDescription}
                  onChange={(e) => setSearchDescription(e.target.value)}
                  disabled={searchActive}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clothing" className="text-xs text-gray-400">
                  Clothing
                </Label>
                <Input
                  id="clothing"
                  placeholder="What are they wearing?"
                  className="bg-gray-700 border-gray-600 text-white"
                  value={searchClothing}
                  onChange={(e) => setSearchClothing(e.target.value)}
                  disabled={searchActive}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-xs text-gray-400">
                  Age Group
                </Label>
                <Select value={searchAge} onValueChange={setSearchAge} disabled={searchActive}>
                  <SelectTrigger id="age" className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="child">Child (0-12)</SelectItem>
                    <SelectItem value="teen">Teen (13-17)</SelectItem>
                    <SelectItem value="adult">Adult (18-64)</SelectItem>
                    <SelectItem value="senior">Senior (65+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-xs text-gray-400">
                  Gender
                </Label>
                <Select value={searchGender} onValueChange={setSearchGender} disabled={searchActive}>
                  <SelectTrigger id="gender" className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-white" disabled={searchActive}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>

              {searchActive ? (
                <Button variant="destructive" className="ml-auto" onClick={handleReset}>
                  Cancel Search
                </Button>
              ) : (
                <Button
                  className="ml-auto bg-purple-600 hover:bg-purple-700"
                  onClick={handleStartSearch}
                  disabled={!searchDescription}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Start Search
                </Button>
              )}
            </div>

            {searchActive && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Searching all cameras...</span>
                  <span>{searchProgress}%</span>
                </div>
                <Progress value={searchProgress} className="h-1.5 bg-gray-700">
                  <div className="h-full bg-purple-500 rounded-full" />
                </Progress>
                <p className="text-xs text-gray-500">
                  {searchProgress < 100
                    ? "Analyzing video feeds and matching against description..."
                    : "Search complete. Review potential matches below."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {matchResults.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Potential Matches</h3>
              <Badge className="bg-purple-500 text-white">
                {matchResults.filter((m) => m.status === "pending").length} Pending
              </Badge>
            </div>

            <Tabs defaultValue="matches" className="mt-4">
              <TabsList className="bg-gray-700 border-gray-600">
                <TabsTrigger value="matches" className="data-[state=active]:bg-gray-600">
                  Matches
                </TabsTrigger>
                <TabsTrigger value="verified" className="data-[state=active]:bg-gray-600">
                  Verified
                </TabsTrigger>
              </TabsList>

              <TabsContent value="matches" className="mt-4">
                <div className="space-y-3">
                  {matchResults
                    .filter((match) => match.status === "pending")
                    .map((match) => (
                      <div key={match.id} className="border border-gray-700 rounded-md p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-500" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-white">Match #{match.id.split("-")[1]}</h4>
                                <Badge className="bg-purple-500 text-white">{match.confidence}% Match</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                <div className="flex items-center">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  {match.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {match.timestamp}
                                </div>
                                <div className="flex items-center">
                                  <Camera className="h-3.5 w-3.5 mr-1" />
                                  Camera: {match.cameraId}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 bg-gray-700 border-gray-600 text-white"
                              onClick={() => handleRejectMatch(match.id)}
                            >
                              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleVerifyMatch(match.id)}
                            >
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {matchResults.filter((match) => match.status === "pending").length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                      <Search className="h-8 w-8 mb-2 opacity-50" />
                      <p>No pending matches to review</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="verified" className="mt-4">
                <div className="space-y-3">
                  {matchResults
                    .filter((match) => match.status === "verified")
                    .map((match) => (
                      <div key={match.id} className="border border-green-500/30 bg-green-500/10 rounded-md p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-500" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-white">Match #{match.id.split("-")[1]}</h4>
                                <Badge className="bg-green-500 text-white">Verified</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                <div className="flex items-center">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  {match.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {match.timestamp}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 bg-gray-700 border-gray-600 text-white">
                            <Camera className="h-3.5 w-3.5 mr-1" />
                            View Camera
                          </Button>
                        </div>
                      </div>
                    ))}

                  {matchResults.filter((match) => match.status === "verified").length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                      <Check className="h-8 w-8 mb-2 opacity-50" />
                      <p>No verified matches yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-white">Search Tips</h3>

          <div className="mt-4 space-y-3 text-xs text-gray-400">
            <div className="flex items-start gap-2">
              <div className="bg-purple-500/20 p-1 rounded-md">
                <Search className="h-4 w-4 text-purple-400" />
              </div>
              <p>Provide as much detail as possible about clothing, appearance, and last known location.</p>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-purple-500/20 p-1 rounded-md">
                <Upload className="h-4 w-4 text-purple-400" />
              </div>
              <p>Upload a recent photo if available for more accurate matching.</p>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-purple-500/20 p-1 rounded-md">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <p>The system searches both real-time and recorded footage from the last 2 hours.</p>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-purple-500/20 p-1 rounded-md">
                <AlertTriangle className="h-4 w-4 text-purple-400" />
              </div>
              <p>For emergency situations, please also contact security personnel directly.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
