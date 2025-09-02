import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"
import { z } from "zod"

const onboardingSchema = z.object({
  // Step 1: Basic Info
  heightCm: z.number().min(100).max(250).optional(),
  weightKg: z.number().min(30).max(300).optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]).optional(),

  // Step 2: Goals
  transformationGoals: z.array(z.string()).optional(),

  // Step 3: Health Profile
  healthConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),

  // Step 4: Mental Health
  mentalHealthGoals: z.array(z.string()).optional(),
  addictionRecoveryStatus: z.string().optional(),
  sobrietyDate: z.string().optional(),

  // Step 5: Lifestyle
  dietaryRestrictions: z.array(z.string()).optional(),
  fitnessExperience: z.enum(["beginner", "intermediate", "advanced"]).optional(),

  // Step 6: Emergency Contact
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = onboardingSchema.parse(body)

    // Check if profile already exists
    const existingProfile = await DatabaseService.getUserProfile(session.userId)

    let profile
    if (existingProfile) {
      // Update existing profile
      profile = await DatabaseService.updateUserProfile(session.userId, {
        height_cm: validatedData.heightCm,
        weight_kg: validatedData.weightKg,
        activity_level: validatedData.activityLevel,
        transformation_goals: validatedData.transformationGoals,
        health_conditions: validatedData.healthConditions,
        medications: validatedData.medications,
        mental_health_goals: validatedData.mentalHealthGoals,
        addiction_recovery_status: validatedData.addictionRecoveryStatus,
        sobriety_date: validatedData.sobrietyDate,
        dietary_restrictions: validatedData.dietaryRestrictions,
        fitness_experience: validatedData.fitnessExperience,
        emergency_contact_name: validatedData.emergencyContactName,
        emergency_contact_phone: validatedData.emergencyContactPhone,
      })
    } else {
      // Create new profile
      profile = await DatabaseService.createUserProfile({
        user_id: session.userId,
        height_cm: validatedData.heightCm,
        weight_kg: validatedData.weightKg,
        activity_level: validatedData.activityLevel,
        transformation_goals: validatedData.transformationGoals,
        health_conditions: validatedData.healthConditions,
        medications: validatedData.medications,
        mental_health_goals: validatedData.mentalHealthGoals,
        addiction_recovery_status: validatedData.addictionRecoveryStatus,
        sobriety_date: validatedData.sobrietyDate,
        dietary_restrictions: validatedData.dietaryRestrictions,
        fitness_experience: validatedData.fitnessExperience,
        emergency_contact_name: validatedData.emergencyContactName,
        emergency_contact_phone: validatedData.emergencyContactPhone,
      })
    }

    // Add initial health metrics if provided
    if (validatedData.weightKg) {
      await DatabaseService.addHealthMetric({
        user_id: session.userId,
        metric_type: "weight",
        value: validatedData.weightKg,
        unit: "kg",
        source: "onboarding",
      })
    }

    return NextResponse.json({
      success: true,
      profile,
      message: "Onboarding completed successfully",
    })
  } catch (error) {
    console.error("Onboarding error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
