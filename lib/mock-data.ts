// Add a comment at the top of the file
// Custom mock data for Arena Pulse platform
// This data simulates real-time crowd management information
// for Saudi Arabian sports venues
export const mockDashboardData = {
  overview: {
    currentAttendance: {
      value: 15234,
      change: 2.1,
    },
    ticketSales: {
      value: 8765,
      change: -1.5,
    },
    crowdDensity: {
      value: 2.8,
      change: 0.7,
    },
    bottleneckAlerts: {
      value: 3,
      change: 1,
    },
  },
  crowdDensity: [
    { time: "2024-01-01T10:00:00.000Z", value: 2.5 },
    { time: "2024-01-01T10:15:00.000Z", value: 2.7 },
    { time: "2024-01-01T10:30:00.000Z", value: 2.9 },
    { time: "2024-01-01T10:45:00.000Z", value: 3.1 },
    { time: "2024-01-01T11:00:00.000Z", value: 3.3 },
    { time: "2024-01-01T11:15:00.000Z", value: 3.5 },
    { time: "2024-01-01T11:30:00.000Z", value: 3.7 },
  ],
  ticketSales: [
    { date: "2024-01-01", value: 1200 },
    { date: "2024-01-02", value: 1350 },
    { date: "2024-01-03", value: 1100 },
    { date: "2024-01-04", value: 1400 },
    { date: "2024-01-05", value: 1500 },
    { date: "2024-01-06", value: 1600 },
    { date: "2024-01-07", value: 1450 },
  ],
  recentEvents: [
    {
      id: "1",
      name: "Al-Hilal vs Al-Nassr",
      date: "2024-01-05T20:00:00.000Z",
      attendance: 63258,
      capacity: 68752,
      status: "Completed",
    },
    {
      id: "2",
      name: "Al-Ahli vs Al-Ittihad",
      date: "2024-01-06T20:00:00.000Z",
      attendance: 58923,
      capacity: 62345,
      status: "Completed",
    },
  ],
  upcomingEvents: [
    {
      id: "3",
      name: "Al-Shabab vs Al-Fateh",
      date: "2024-01-12T18:00:00.000Z",
      capacity: 15000,
      ticketsSold: 12000,
    },
    {
      id: "4",
      name: "Al-Taawoun vs Al-Raed",
      date: "2024-01-13T18:00:00.000Z",
      capacity: 10000,
      ticketsSold: 9500,
    },
  ],
}

export const mockPredictionData = {
  crowdDensity: [
    { time: "2024-01-08T18:00:00.000Z", actual: 2.5, predicted: 2.6 },
    { time: "2024-01-08T18:15:00.000Z", actual: 2.7, predicted: 2.8 },
    { time: "2024-01-08T18:30:00.000Z", actual: 2.9, predicted: 3.0 },
    { time: "2024-01-08T18:45:00.000Z", actual: 3.1, predicted: 3.2 },
    { time: "2024-01-08T19:00:00.000Z", actual: 3.3, predicted: 3.4 },
  ],
  bottlenecks: [
    { location: "Gate 3 Entrance", time: "18:00", riskLevel: "High", congestionPercent: 85 },
    { location: "East Concourse", time: "18:15", riskLevel: "Medium", congestionPercent: 60 },
  ],
  staffing: [
    { area: "Gate 3 Entrance", current: 5, recommended: 7 },
    { area: "East Concourse", current: 3, recommended: 4 },
    { area: "South Concourse", current: 4, recommended: 3 },
  ],
}

export const mockNotifications = [
  {
    id: "1",
    title: "System Update",
    description: "System has been updated with the latest data.",
    type: "info",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "Crowd Density Alert",
    description: "Unusual crowd density detected at King Fahd Stadium Gate 2. Please investigate.",
    type: "warning",
    timestamp: new Date(),
  },
]

// Enhanced crowd analysis data
export const mockCrowdAnalysisData = {
  // Current venue being analyzed
  currentVenue: "King Fahd International Stadium",
  currentEvent: "Al-Hilal vs Al-Nassr (Riyadh Derby)",

  // Crowd density by zone (for heatmap)
  zoneDensity: [
    { id: "gate1", name: "Gate 1 Entrance", density: 1.8, status: "Low", x: 10, y: 30, radius: 15 },
    { id: "gate2", name: "Gate 2 Entrance", density: 2.5, status: "Medium", x: 10, y: 70, radius: 20 },
    { id: "gate3", name: "Gate 3 Entrance", density: 4.2, status: "Critical", x: 30, y: 90, radius: 25 },
    { id: "gate4", name: "Gate 4 Entrance", density: 3.7, status: "High", x: 70, y: 90, radius: 20 },
    { id: "gate5", name: "Gate 5 Entrance", density: 2.2, status: "Medium", x: 90, y: 70, radius: 15 },
    { id: "gate6", name: "Gate 6 Entrance", density: 1.5, status: "Low", x: 90, y: 30, radius: 15 },
    { id: "northStand", name: "North Stand", density: 3.1, status: "High", x: 50, y: 10, radius: 30 },
    { id: "eastStand", name: "East Stand", density: 2.8, status: "Medium", x: 80, y: 50, radius: 25 },
    { id: "southStand", name: "South Stand", density: 3.5, status: "High", x: 50, y: 90, radius: 30 },
    { id: "westStand", name: "West Stand", density: 2.9, status: "Medium", x: 20, y: 50, radius: 25 },
    { id: "concourse1", name: "North Concourse", density: 3.8, status: "High", x: 40, y: 25, radius: 20 },
    { id: "concourse2", name: "East Concourse", density: 4.0, status: "Critical", x: 75, y: 40, radius: 20 },
    { id: "concourse3", name: "South Concourse", density: 3.2, status: "High", x: 60, y: 75, radius: 20 },
    { id: "concourse4", name: "West Concourse", density: 2.7, status: "Medium", x: 25, y: 60, radius: 20 },
    { id: "vipArea", name: "VIP Area", density: 1.2, status: "Low", x: 50, y: 50, radius: 15 },
  ],

  // Flow patterns between zones (for flow diagram)
  flowPatterns: [
    { from: "gate1", to: "northStand", volume: 850, status: "Medium" },
    { from: "gate2", to: "westStand", volume: 1200, status: "High" },
    { from: "gate3", to: "southStand", volume: 1500, status: "Critical" },
    { from: "gate4", to: "southStand", volume: 1300, status: "High" },
    { from: "gate5", to: "eastStand", volume: 950, status: "Medium" },
    { from: "gate6", to: "northStand", volume: 750, status: "Low" },
    { from: "northStand", to: "concourse1", volume: 600, status: "Medium" },
    { from: "eastStand", to: "concourse2", volume: 850, status: "High" },
    { from: "southStand", to: "concourse3", volume: 950, status: "High" },
    { from: "westStand", to: "concourse4", volume: 700, status: "Medium" },
    { from: "concourse1", to: "vipArea", volume: 250, status: "Low" },
    { from: "concourse2", to: "vipArea", volume: 300, status: "Medium" },
    { from: "concourse3", to: "vipArea", volume: 200, status: "Low" },
    { from: "concourse4", to: "vipArea", volume: 350, status: "Medium" },
  ],

  // Congestion points (current bottlenecks)
  congestionPoints: [
    {
      id: "cp1",
      location: "Gate 3 Entrance",
      density: 4.2,
      status: "Critical",
      trend: "Increasing",
      startTime: "17:45",
      duration: "35 minutes",
      affectedCount: 1850,
      recommendedAction: "Open additional entry lanes and redirect fans to Gates 2 and 4",
    },
    {
      id: "cp2",
      location: "East Concourse",
      density: 4.0,
      status: "Critical",
      trend: "Stable",
      startTime: "18:10",
      duration: "25 minutes",
      affectedCount: 1200,
      recommendedAction: "Deploy 5 additional staff members to manage flow",
    },
    {
      id: "cp3",
      location: "South Stand Lower Tier",
      density: 3.8,
      status: "High",
      trend: "Decreasing",
      startTime: "18:05",
      duration: "15 minutes",
      affectedCount: 950,
      recommendedAction: "Monitor situation, no immediate action required",
    },
    {
      id: "cp4",
      location: "North Concourse Food Area",
      density: 3.7,
      status: "High",
      trend: "Increasing",
      startTime: "18:20",
      duration: "10 minutes",
      affectedCount: 750,
      recommendedAction: "Open additional concession stands",
    },
    {
      id: "cp5",
      location: "Gate 4 Security Checkpoint",
      density: 3.6,
      status: "High",
      trend: "Stable",
      startTime: "17:50",
      duration: "30 minutes",
      affectedCount: 1100,
      recommendedAction: "Open additional security lanes",
    },
  ],

  // Zone-specific analysis
  zoneAnalysis: {
    timeSeriesData: [
      {
        time: "17:00",
        "Gate 3 Entrance": 2.1,
        "East Concourse": 1.8,
        "South Stand": 2.0,
        "North Concourse": 1.5,
        "Gate 4 Security": 1.9,
      },
      {
        time: "17:15",
        "Gate 3 Entrance": 2.5,
        "East Concourse": 2.2,
        "South Stand": 2.3,
        "North Concourse": 1.9,
        "Gate 4 Security": 2.3,
      },
      {
        time: "17:30",
        "Gate 3 Entrance": 3.2,
        "East Concourse": 2.7,
        "South Stand": 2.8,
        "North Concourse": 2.4,
        "Gate 4 Security": 2.8,
      },
      {
        time: "17:45",
        "Gate 3 Entrance": 3.8,
        "East Concourse": 3.2,
        "South Stand": 3.3,
        "North Concourse": 2.9,
        "Gate 4 Security": 3.4,
      },
      {
        time: "18:00",
        "Gate 3 Entrance": 4.1,
        "East Concourse": 3.7,
        "South Stand": 3.6,
        "North Concourse": 3.4,
        "Gate 4 Security": 3.5,
      },
      {
        time: "18:15",
        "Gate 3 Entrance": 4.2,
        "East Concourse": 4.0,
        "South Stand": 3.8,
        "North Concourse": 3.7,
        "Gate 4 Security": 3.6,
      },
      {
        time: "18:30",
        "Gate 3 Entrance": 4.0,
        "East Concourse": 3.9,
        "South Stand": 3.7,
        "North Concourse": 3.8,
        "Gate 4 Security": 3.5,
      },
      {
        time: "18:45",
        "Gate 3 Entrance": 3.7,
        "East Concourse": 3.8,
        "South Stand": 3.5,
        "North Concourse": 3.6,
        "Gate 4 Security": 3.3,
      },
      {
        time: "19:00",
        "Gate 3 Entrance": 3.4,
        "East Concourse": 3.5,
        "South Stand": 3.2,
        "North Concourse": 3.4,
        "Gate 4 Security": 3.0,
      },
    ],

    // Capacity and current occupancy by zone
    zoneCapacity: [
      { zone: "Gate 3 Entrance", capacity: 2000, current: 1850, percentFull: 92.5 },
      { zone: "East Concourse", capacity: 1500, current: 1200, percentFull: 80.0 },
      { zone: "South Stand", capacity: 15000, current: 13200, percentFull: 88.0 },
      { zone: "North Concourse", capacity: 1200, current: 950, percentFull: 79.2 },
      { zone: "Gate 4 Security", capacity: 1800, current: 1450, percentFull: 80.6 },
    ],
  },

  // Crowd insights and recommendations
  insights: [
    {
      title: "Critical Congestion at Gate 3",
      description:
        "Gate 3 has reached critical density levels of 4.2 people/m². This exceeds safety thresholds and requires immediate action.",
      severity: "Critical",
      recommendations: [
        "Open all available entry lanes at Gate 3",
        "Redirect fans to Gates 2 and 4 via mobile app notifications",
        "Deploy 8 additional security staff to expedite entry",
        "Temporarily suspend ticket scanning and perform visual verification only",
      ],
    },
    {
      title: "East Concourse Approaching Critical Levels",
      description:
        "The East Concourse area is approaching critical density at 4.0 people/m². Concession areas are particularly congested.",
      severity: "High",
      recommendations: [
        "Open additional concession stands in the East Stand upper tier",
        "Deploy staff to direct fans to less congested concession areas",
        "Implement queue management system with staff directing traffic flow",
        "Consider temporarily reducing menu options to speed up service",
      ],
    },
    {
      title: "Improved Flow Needed Between South Stand and Concourses",
      description:
        "Analysis shows bottlenecks forming between the South Stand and South Concourse during peak periods.",
      severity: "Medium",
      recommendations: [
        "Designate separate entry and exit paths with temporary barriers",
        "Position staff at key junction points to direct traffic",
        "Delay concession promotions until after peak entry period",
        "Consider staggered entry times for South Stand ticket holders in future events",
      ],
    },
    {
      title: "VIP Area Underutilized",
      description:
        "The VIP area is currently at only 60% of optimal capacity, creating an opportunity to redirect some premium ticket holders.",
      severity: "Low",
      recommendations: [
        "Offer complimentary VIP area access to select premium ticket holders",
        "Promote VIP area amenities via mobile app notifications",
        "Consider expanding VIP area access for future high-demand events",
      ],
    },
  ],

  // Historical comparison data
  historicalComparison: {
    eventType: "Riyadh Derby",
    averagePeakDensity: 3.8,
    currentPeakDensity: 4.2,
    percentChange: 10.5,
    averageCongestionPoints: 3,
    currentCongestionPoints: 5,
    averageEntryTime: 22, // minutes
    currentEntryTime: 28, // minutes
    previousRecommendations: [
      "Implement digital queue management system",
      "Increase staff at Gates 3 and 4",
      "Improve signage for alternative entry points",
    ],
    implementationStatus: [
      { recommendation: "Digital queue management", status: "Partially Implemented", effectiveness: "Medium" },
      { recommendation: "Increased staffing", status: "Fully Implemented", effectiveness: "High" },
      { recommendation: "Improved signage", status: "Fully Implemented", effectiveness: "Low" },
    ],
  },
}

