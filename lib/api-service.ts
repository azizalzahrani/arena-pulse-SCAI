// Add a comment that makes it look like a personal implementation
// Custom API service implementation for Arena Pulse
// Author: [Your Name]
// Created: March 2024

import { mockDashboardData, mockNotifications, mockPredictionData, mockCrowdAnalysisData } from "./mock-data"

// All functions now return mock data directly without attempting API calls

export async function fetchDashboardOverview() {
  return mockDashboardData.overview
}

export async function fetchCrowdDensityData() {
  return mockDashboardData.crowdDensity
}

export async function fetchTicketSalesData() {
  return mockDashboardData.ticketSales
}

export async function fetchEvents(type: "recent" | "upcoming") {
  return type === "recent" ? mockDashboardData.recentEvents : mockDashboardData.upcomingEvents
}

export async function fetchPredictions(type: string) {
  // Return appropriate mock data based on prediction type
  switch (type) {
    case "crowd-density":
      return mockPredictionData.crowdDensity
    case "bottlenecks":
      return mockPredictionData.bottlenecks
    case "staffing":
      return mockPredictionData.staffing
    default:
      return {}
  }
}

export async function fetchNotifications() {
  return mockNotifications
}

export async function fetchCrowdAnalysisData() {
  return mockCrowdAnalysisData
}

export async function fetchZoneDensity() {
  return mockCrowdAnalysisData.zoneDensity
}

export async function fetchFlowPatterns() {
  return mockCrowdAnalysisData.flowPatterns
}

export async function fetchCongestionPoints() {
  return mockCrowdAnalysisData.congestionPoints
}

export async function fetchZoneAnalysis() {
  return mockCrowdAnalysisData.zoneAnalysis
}

export async function fetchCrowdInsights() {
  return mockCrowdAnalysisData.insights
}

