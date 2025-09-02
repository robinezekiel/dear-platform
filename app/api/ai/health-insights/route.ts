import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { HealthInsightsAI } from "@/lib/ai-services"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Gather user data for analysis
    const [healthMetrics, moodEntries, workouts, meals, userProfile] = await Promise.all([
      DatabaseService.getHealthMetrics(session.userId),
      // Get recent mood entries (last 30 days)
      DatabaseService.getHealthMetrics(session.userId, "mood"), // This would need to be implemented
      // Get recent workouts
      DatabaseService.getHealthMetrics(session.userId, "workout"), // This would need to be implemented
      // Get recent meals
      DatabaseService.getHealthMetrics(session.userId, "nutrition"), // This would need to be implemented
      DatabaseService.getUserProfile(session.userId),
    ])

    const userData = {
      healthMetrics: healthMetrics || [],
      moodEntries: [], // Would be populated from mood_entries table
      workouts: [], // Would be populated from workouts table
      meals: [], // Would be populated from meals table
      goals: userProfile?.transformation_goals || [],
    }

    // Generate personalized insights
    const insights = await HealthInsightsAI.generatePersonalizedInsights(userData)

    return NextResponse.json({
      success: true,
      insights,
    })
  } catch (error) {
    console.error("AI health insights error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
