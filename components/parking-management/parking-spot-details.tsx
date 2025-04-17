"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ParkingSpotDetails() {
  const parkingZones = [
    { id: "A1", area: "North", total: 150, available: 12, status: "Critical" },
    { id: "A2", area: "North", total: 150, available: 23, status: "Low" },
    { id: "B1", area: "South", total: 120, available: 45, status: "Good" },
    { id: "B2", area: "South", total: 120, available: 32, status: "Good" },
    { id: "C1", area: "VIP", total: 80, available: 15, status: "Low" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Parking Zone Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone</TableHead>
              <TableHead>Area</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parkingZones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.id}</TableCell>
                <TableCell>{zone.area}</TableCell>
                <TableCell className="text-right">
                  {zone.available}/{zone.total}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      zone.status === "Critical"
                        ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        : zone.status === "Low"
                          ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    }
                  >
                    {zone.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
