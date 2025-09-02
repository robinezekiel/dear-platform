import { type NextRequest, NextResponse } from "next/server"
import { ProductionMonitoring } from "@/lib/monitoring"
import { verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Only allow admin users to access analytics
    const user = await verifyAuth(req)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const monitor = ProductionMonitoring.getInstance()
    const analytics = {
      systemHealth: monitor.getSystemHealth(),
      timestamp: new Date().toISOString(),
      summary: {
        totalUsers: 0, // Would come from database
        activeUsers: 0, // Would come from database
        totalTransformations: 0, // Would come from database
        aiInteractions: 0, // Would come from monitoring
      },
    }

    return NextResponse.json({
      success: true,
      data: analytics,
    })
  } catch (error) {
    console.error("[Analytics] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics",
      },
      { status: 500 },
    )
  }
}
