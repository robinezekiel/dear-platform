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

    const userProfile = await DatabaseService.getUserProfile(session.userId)
    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    // Get recent activity data
    const recentActivity = {
      lastWorkout: null, // Would get from workouts table
      recentMeals: [], // Would get from meals table
      moodTrend: null, // Would get from mood_entries table
    }

    const userData = {
      profile: userProfile,
      recentActivity,
      goals: userProfile.transformation_goals || [],
      preferences: {
        activityLevel: userProfile.activity_level,
        dietaryRestrictions: userProfile.dietary_restrictions,
        fitnessExperience: userProfile.fitness_experience,
      },
    }

    // Generate personalized daily plan
    const dailyPlan = await HealthInsightsAI.generateDailyPlan(userData)

    return NextResponse.json({
      success: true,
      dailyPlan,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI daily plan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
