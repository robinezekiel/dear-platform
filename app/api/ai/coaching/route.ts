import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { AICoachService, GoalOptimizationAI } from "@/lib/advanced-ai-services"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { coachingType, userContext } = await request.json()

    let result

    switch (coachingType) {
      case "session":
        result = await AICoachService.generateCoachingSession(userContext)
        break

      case "guidance":
        result = await AICoachService.provideContinuousGuidance(
          userContext.userState,
          userContext.environmentalFactors,
          userContext.realTimeData,
        )
        break

      case "goal_optimization":
        result = await GoalOptimizationAI.optimizeGoalStructure(
          userContext.currentGoals,
          userContext.userCapabilities,
          userContext.constraints,
          userContext.timeline,
        )
        break

      case "goal_adjustment":
        result = await GoalOptimizationAI.generateAdaptiveGoalAdjustments(
          userContext.currentProgress,
          userContext.originalGoals,
          userContext.newConstraints,
        )
        break

      default:
        return NextResponse.json({ error: "Invalid coaching type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      coaching: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] AI coaching error:", error)
    return NextResponse.json({ error: "Coaching failed" }, { status: 500 })
  }
}
