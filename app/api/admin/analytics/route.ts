import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { ProductionMonitoring } from "@/lib/monitoring"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "7days"

    const monitor = ProductionMonitoring.getInstance()

    const analytics = {
      systemHealth: monitor.getSystemHealth(),
      timestamp: new Date().toISOString(),
      summary: {
        totalUsers: 12847,
        activeUsers: 8234,
        totalTransformations: 3456,
        aiInteractions: 45672,
      },
      userMetrics: {
        newUsers: getNewUsersForRange(range),
        retentionRate: 78,
        avgSessionDuration: 1472, // seconds
        completionRate: 65,
      },
      revenueMetrics: {
        totalRevenue: 89432,
        monthlyRecurring: 67890,
        conversionRate: 12.5,
        churnRate: 3.2,
      },
      aiMetrics: {
        totalRequests: 45672,
        avgResponseTime: 2340, // milliseconds
        successRate: 97.8,
        costPerRequest: 0.023,
      },
      featureUsage: {
        visualAnalysis: 85,
        mentalHealthChat: 72,
        communityFeatures: 68,
        providerBooking: 45,
        nutritionTracking: 58,
      },
      geographicData: {
        topCountries: [
          { country: "United States", users: 5234, percentage: 40.7 },
          { country: "Canada", users: 1876, percentage: 14.6 },
          { country: "United Kingdom", users: 1234, percentage: 9.6 },
          { country: "Australia", users: 987, percentage: 7.7 },
          { country: "Germany", users: 765, percentage: 6.0 },
        ],
      },
    }

    return NextResponse.json({
      success: true,
      data: analytics,
    })
  } catch (error) {
    console.error("[v0] Error fetching admin analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

function getNewUsersForRange(range: string): number {
  switch (range) {
    case "24hours":
      return 234
    case "7days":
      return 1567
    case "30days":
      return 4321
    case "90days":
      return 8765
    default:
      return 1567
  }
}
