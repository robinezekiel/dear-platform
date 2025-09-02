import { type NextRequest, NextResponse } from "next/server"
import { ProductionMonitoring } from "@/lib/monitoring"

export async function GET(req: NextRequest) {
  try {
    const monitor = ProductionMonitoring.getInstance()
    const health = monitor.getSystemHealth()

    return NextResponse.json({
      success: true,
      data: health,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Health Check] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
