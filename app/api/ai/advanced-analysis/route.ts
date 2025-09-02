import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { PredictiveAnalyticsAI, PatternRecognitionAI } from "@/lib/advanced-ai-services"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { analysisType, userData, timeframe } = await request.json()

    let result

    switch (analysisType) {
      case "predictive":
        result = await PredictiveAnalyticsAI.predictHealthOutcomes({
          ...userData,
          timeframe,
        })
        break

      case "patterns":
        result = await PatternRecognitionAI.identifyHealthPatterns({
          ...userData,
          timeRange: timeframe,
        })
        break

      case "behavior_prediction":
        result = await PatternRecognitionAI.predictBehaviorChanges(
          userData.currentPatterns,
          userData.proposedInterventions,
          userData.userPersonality,
        )
        break

      default:
        return NextResponse.json({ error: "Invalid analysis type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      analysis: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Advanced AI analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
