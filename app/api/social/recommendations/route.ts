import { type NextRequest, NextResponse } from "next/server"
import { graphDB } from "@/lib/graph-database"
import { validateRequest } from "@/lib/validation"
import { logActivity } from "@/lib/logging"

export async function GET(request: NextRequest) {
  try {
    const validation = await validateRequest(request)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "users"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let recommendations = []

    switch (type) {
      case "users":
        recommendations = await graphDB.findSimilarUsers(validation.user.id, limit)
        break
      case "content":
        recommendations = await graphDB.findRecommendedContent(validation.user.id, limit)
        break
      case "groups":
        recommendations = await graphDB.findOptimalGroups(validation.user.id, limit)
        break
      default:
        return NextResponse.json({ error: "Invalid recommendation type" }, { status: 400 })
    }

    // Log recommendation request
    await logActivity({
      userId: validation.user.id,
      action: "social_recommendations",
      details: { type, count: recommendations.length },
    })

    return NextResponse.json({
      success: true,
      recommendations,
      type,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Social recommendations error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 })
    }

    const { activity_type, target_id } = await request.json()

    if (!activity_type) {
      return NextResponse.json({ error: "Activity type is required" }, { status: 400 })
    }

    // Update graph with user activity
    await graphDB.updateUserActivity(validation.user.id, activity_type, target_id)

    return NextResponse.json({
      success: true,
      message: "Social graph updated successfully",
    })
  } catch (error) {
    console.error("Social graph update error:", error)
    return NextResponse.json({ error: "Failed to update social graph" }, { status: 500 })
  }
}
