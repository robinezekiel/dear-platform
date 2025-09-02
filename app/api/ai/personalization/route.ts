import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { PersonalizationEngineAI } from "@/lib/advanced-ai-services"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userProfile, optimizationType } = await request.json()

    let result

    switch (optimizationType) {
      case "content":
        result = await PersonalizationEngineAI.generateHyperPersonalizedContent(userProfile)
        break

      case "experience":
        result = await PersonalizationEngineAI.optimizeUserExperience(
          userProfile.interactions,
          userProfile.metrics,
          userProfile.goals,
        )
        break

      default:
        return NextResponse.json({ error: "Invalid optimization type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      personalization: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Personalization error:", error)
    return NextResponse.json({ error: "Personalization failed" }, { status: 500 })
  }
}
