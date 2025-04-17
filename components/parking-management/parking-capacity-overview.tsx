import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ParkingCapacityOverview() {
  // Simulated data
  const totalCapacity = 1520
  const totalOccupied = 1022
  const occupancyPercentage = Math.round((totalOccupied / totalCapacity) * 100)

  const parkingTypes = [
    { name: "Regular Parking", capacity: 1200, occupied: 834, color: "bg-arena-blue" },
    { name: "VIP Parking", capacity: 120, occupied: 98, color: "bg-arena-purple" },
    { name: "Disabled Parking", capacity: 80, occupied: 42, color: "bg-arena-teal" },
    { name: "Staff Parking", capacity: 120, occupied: 48, color: "bg-arena-orange" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Parking Capacity Overview</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Occupancy</span>
            <span className="text-sm font-medium">
              {totalOccupied}/{totalCapacity}
            </span>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span>Available: {totalCapacity - totalOccupied} spots</span>
            <span
              className={
                occupancyPercentage > 80
                  ? "text-red-500"
                  : occupancyPercentage > 50
                    ? "text-yellow-500"
                    : "text-green-500"
              }
            >
              {occupancyPercentage}% Full
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {parkingTypes.map((type, index) => {
            const typePercentage = Math.round((type.occupied / type.capacity) * 100)
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>{type.name}</span>
                  <span>
                    {type.occupied}/{type.capacity} ({typePercentage}%)
                  </span>
                </div>
                <Progress value={typePercentage} className={`h-1.5 ${type.color}`} />
              </div>
            )
          })}
        </div>

        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Current Status</span>
            <span
              className={`text-xs font-medium ${occupancyPercentage > 80 ? "text-red-500" : occupancyPercentage > 50 ? "text-yellow-500" : "text-green-500"}`}
            >
              {occupancyPercentage > 80
                ? "High Occupancy"
                : occupancyPercentage > 50
                  ? "Medium Occupancy"
                  : "Low Occupancy"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on current trends, parking is expected to reach {Math.min(occupancyPercentage + 10, 100)}% capacity in
            the next hour.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
