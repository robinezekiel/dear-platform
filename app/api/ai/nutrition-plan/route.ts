import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { NutritionAI } from "@/lib/ai-services"
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

    // Get current weight from health metrics
    const weightMetrics = await DatabaseService.getHealthMetrics(session.userId, "weight")
    const currentWeight = weightMetrics[0]?.value || userProfile.weight_kg || 70

    const nutritionProfile = {
      goals: userProfile.transformation_goals || [],
      dietaryRestrictions: userProfile.dietary_restrictions || [],
      activityLevel: userProfile.activity_level || "moderate",
      currentWeight,
      preferences: [],
    }

    // Generate personalized meal plan
    const mealPlan = await NutritionAI.generateMealPlan(nutritionProfile)

    return NextResponse.json({
      success: true,
      mealPlan,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI nutrition plan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
