import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function ParkingHistoricalData() {
  // Simulated historical data
  const historicalEvents = [
    {
      id: "event1",
      name: "Football Match: Al-Hilal vs Al-Nassr",
      date: "2025-04-10",
      attendance: 62500,
      parkingUtilization: 94,
      peakTime: "18:45",
      avgParkingDuration: 4.2,
      trend: "up",
    },
    {
      id: "event2",
      name: "Concert: Umm Kulthum Tribute",
      date: "2025-04-05",
      attendance: 58200,
      parkingUtilization: 88,
      peakTime: "19:30",
      avgParkingDuration: 5.1,
      trend: "up",
    },
    {
      id: "event3",
      name: "Football Match: Al-Ahli vs Al-Ittihad",
      date: "2025-03-28",
      attendance: 60100,
      parkingUtilization: 91,
      peakTime: "18:30",
      avgParkingDuration: 4.5,
      trend: "same",
    },
    {
      id: "event4",
      name: "Cultural Festival",
      date: "2025-03-20",
      attendance: 45800,
      parkingUtilization: 76,
      peakTime: "16:15",
      avgParkingDuration: 6.2,
      trend: "down",
    },
    {
      id: "event5",
      name: "Football Match: Saudi Pro League Final",
      date: "2025-03-15",
      attendance: 65000,
      parkingUtilization: 98,
      peakTime: "19:00",
      avgParkingDuration: 4.8,
      trend: "up",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 90) return "bg-red-500/20 text-red-500 border-red-500/50"
    if (utilization > 70) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
    return "bg-green-500/20 text-green-500 border-green-500/50"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historical Event Parking Data</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Parking Utilization</TableHead>
              <TableHead>Peak Time</TableHead>
              <TableHead>Avg. Duration (hrs)</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.attendance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getUtilizationColor(event.parkingUtilization)}>
                    {event.parkingUtilization}%
                  </Badge>
                </TableCell>
                <TableCell>{event.peakTime}</TableCell>
                <TableCell>{event.avgParkingDuration} hrs</TableCell>
                <TableCell>{getTrendIcon(event.trend)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 rounded-md bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            <strong>AI Analysis:</strong> Football matches consistently show higher parking utilization (94% average)
            compared to cultural events (76% average). Peak parking times for evening events (18:00-19:30) suggest
            implementing staggered entry times for future high-attendance events.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
