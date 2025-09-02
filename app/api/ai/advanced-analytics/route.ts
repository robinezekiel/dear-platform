import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { handleApiError, ApiError } from "@/lib/error-handling"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { sql } from "@/lib/database"

const analyticsRequestSchema = z.object({
  timeframe: z.enum(["week", "month", "quarter", "year"]).default("month"),
  includePredicitions: z.boolean().default(true),
  includeBehaviorAnalysis: z.boolean().default(true),
  includeRiskAssessment: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const body = await request.json()
    const { timeframe, includePredicitions, includeBehaviorAnalysis, includeRiskAssessment } = validateRequest(
      analyticsRequestSchema,
      body,
    )

    // Get user's health data from database
    const healthData = await sql`
      SELECT 
        hm.*,
        tp.analysis_results,
        me.mood_score,
        me.energy_level,
        we.exercise_type,
        we.duration,
        we.intensity
      FROM health_metrics hm
      LEFT JOIN transformation_photos tp ON tp.user_id = hm.user_id
      LEFT JOIN mood_entries me ON me.user_id = hm.user_id
      LEFT JOIN workout_entries we ON we.user_id = hm.user_id
      WHERE hm.user_id = ${user.id}
        AND hm.recorded_at >= NOW() - INTERVAL '${timeframe === "week" ? "1 week" : timeframe === "month" ? "1 month" : timeframe === "quarter" ? "3 months" : "1 year"}'
      ORDER BY hm.recorded_at DESC
    `

    // Generate advanced AI analytics
    const { object: analytics } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        healthScore: z.number().min(0).max(100),
        progressTrend: z.number(),
        keyInsights: z.array(z.string()),
        predictions: z.object({
          weightGoal: z.object({
            current: z.number(),
            predicted: z.number(),
            confidence: z.number(),
            timeframe: z.string(),
          }),
          fitnessLevel: z.object({
            current: z.number(),
            predicted: z.number(),
            confidence: z.number(),
            timeframe: z.string(),
          }),
          mentalWellness: z.object({
            current: z.number(),
            predicted: z.number(),
            confidence: z.number(),
            timeframe: z.string(),
          }),
        }),
        behaviorPatterns: z.object({
          workoutConsistency: z.number(),
          nutritionAdherence: z.number(),
          sleepQuality: z.number(),
          stressManagement: z.number(),
          peakPerformanceTimes: z.array(z.string()),
          challengingPeriods: z.array(z.string()),
        }),
        riskFactors: z.array(
          z.object({
            factor: z.string(),
            riskLevel: z.enum(["low", "medium", "high"]),
            description: z.string(),
            recommendations: z.array(z.string()),
          }),
        ),
        personalizedRecommendations: z.object({
          immediate: z.array(
            z.object({
              action: z.string(),
              reason: z.string(),
              expectedImpact: z.string(),
            }),
          ),
          longTerm: z.array(
            z.object({
              goal: z.string(),
              strategy: z.string(),
              timeline: z.string(),
            }),
          ),
        }),
      }),
      prompt: `
        Analyze the following health data and provide comprehensive AI-powered insights:
        
        Health Data: ${JSON.stringify(healthData)}
        Timeframe: ${timeframe}
        
        Provide:
        1. Overall health score (0-100) based on all metrics
        2. Progress trend percentage (positive/negative)
        3. Key insights about patterns and improvements
        4. Predictions for weight, fitness, and mental wellness goals
        5. Behavior pattern analysis with consistency scores
        6. Risk factor assessment with recommendations
        7. Personalized immediate and long-term recommendations
        
        Focus on actionable insights that will help the user improve their health outcomes.
        Be encouraging but realistic in assessments.
      `,
    })

    // Store analytics results for future reference
    await sql`
      INSERT INTO ai_analytics (user_id, timeframe, analytics_data, generated_at)
      VALUES (${user.id}, ${timeframe}, ${JSON.stringify(analytics)}, NOW())
    `

    return NextResponse.json({
      success: true,
      analytics,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "month"

    // Get latest analytics for user
    const analytics = await sql`
      SELECT analytics_data, generated_at
      FROM ai_analytics
      WHERE user_id = ${user.id} AND timeframe = ${timeframe}
      ORDER BY generated_at DESC
      LIMIT 1
    `

    if (analytics.length === 0) {
      throw new ApiError("No analytics data found", 404)
    }

    return NextResponse.json({
      success: true,
      analytics: analytics[0].analytics_data,
      generatedAt: analytics[0].generated_at,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
