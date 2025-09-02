import { type NextRequest, NextResponse } from "next/server"
import { viralGrowthEngine } from "@/lib/viral-growth-engine"
import { validateRequest } from "@/lib/validation"
import { logActivity } from "@/lib/logging"

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 })
    }

    const { transformationData, reportType = "transformation" } = await request.json()

    if (!transformationData) {
      return NextResponse.json({ error: "Transformation data is required" }, { status: 400 })
    }

    // Generate shareable report
    const report = await viralGrowthEngine.generateShareableReport(validation.user.id, transformationData)

    // Log report generation
    await logActivity({
      userId: validation.user.id,
      action: "viral_report_generated",
      details: {
        reportId: report.id,
        type: report.type,
        viralPotential: report.viralPotential,
        engagementPrediction: report.engagementPrediction,
      },
    })

    // Award XP for creating shareable content
    const xpReward = report.viralPotential === "viral" ? 100 : report.viralPotential === "high" ? 75 : 50

    return NextResponse.json({
      success: true,
      report,
      xpReward,
      message: "Shareable report generated successfully",
    })
  } catch (error) {
    console.error("Viral report generation error:", error)
    return NextResponse.json({ error: "Failed to generate viral report" }, { status: 500 })
  }
}
