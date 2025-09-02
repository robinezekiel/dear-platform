import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/validation"
import { handleApiError } from "@/lib/error-handling"
import { EngagementEngine } from "@/lib/engagement-engine"
import { logActivity } from "@/lib/logging"

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest(request)
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    switch (type) {
      case "recommendations":
        const recommendations = await EngagementEngine.generatePersonalizedRecommendations(user.id)
        return NextResponse.json({
          success: true,
          data: recommendations,
        })

      case "engagement_data":
        const engagementData = await EngagementEngine.analyzeUserEngagement(user.id)
        return NextResponse.json({
          success: true,
          data: engagementData,
        })

      case "social_proof":
        // Mock social proof data
        const socialProof = {
          activeUsers: Math.floor(Math.random() * 5000) + 10000,
          todayTransformations: Math.floor(Math.random() * 100) + 200,
          communityGrowth: (Math.random() * 20 + 5).toFixed(1),
        }
        return NextResponse.json({
          success: true,
          data: socialProof,
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid type parameter",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest(request)
    const body = await request.json()

    const { action, eventType, metadata } = body

    switch (action) {
      case "track_engagement":
        await EngagementEngine.trackEngagementEvent(user.id, eventType, metadata)
        logActivity("engagement_tracked", { userId: user.id, eventType, metadata })

        return NextResponse.json({
          success: true,
          message: "Engagement event tracked",
        })

      case "schedule_notifications":
        await EngagementEngine.scheduleEngagementNotifications(user.id)
        logActivity("notifications_scheduled", { userId: user.id })

        return NextResponse.json({
          success: true,
          message: "Notifications scheduled",
        })

      case "check_churn_risk":
        const isAtRisk = await EngagementEngine.identifyChurnRisk(user.id)
        if (isAtRisk) {
          await EngagementEngine.triggerReEngagementCampaign(user.id)
        }

        return NextResponse.json({
          success: true,
          data: { isAtRisk },
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    return handleApiError(error)
  }
}
