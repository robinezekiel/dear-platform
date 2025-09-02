import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"
import { healthMetricsSchema, sanitizeInput } from "@/lib/validation"
import { AuthenticationError, asyncHandler } from "@/lib/error-handling"
import { rateLimiter, rateLimitConfigs } from "@/lib/rate-limiting"
import { logger } from "@/lib/logging"
import { securityHeaders } from "@/lib/security"

export async function POST(request: NextRequest) {
  return asyncHandler(async (req: NextRequest) => {
    const startTime = Date.now()

    await rateLimiter.checkLimit(req, rateLimitConfigs.api)

    const session = await getSession()
    if (!session) {
      logger.warn("Unauthenticated health metric submission attempt")
      throw new AuthenticationError("Not authenticated")
    }

    const body = await request.json()

    const validatedData = healthMetricsSchema.parse(body)

    const sanitizedData = {
      ...validatedData,
      // Ensure metric values are within reasonable ranges
      weight: validatedData.weight ? Math.max(30, Math.min(500, validatedData.weight)) : undefined,
      height: validatedData.height ? Math.max(100, Math.min(250, validatedData.height)) : undefined,
    }

    const metrics = []

    if (sanitizedData.weight) {
      const weightMetric = await DatabaseService.addHealthMetric({
        user_id: session.userId,
        metric_type: "weight",
        value: sanitizedData.weight,
        unit: "kg",
        source: "manual",
      })
      metrics.push(weightMetric)
    }

    if (sanitizedData.height) {
      const heightMetric = await DatabaseService.addHealthMetric({
        user_id: session.userId,
        metric_type: "height",
        value: sanitizedData.height,
        unit: "cm",
        source: "manual",
      })
      metrics.push(heightMetric)
    }

    if (sanitizedData.bloodPressure) {
      const bpMetric = await DatabaseService.addHealthMetric({
        user_id: session.userId,
        metric_type: "blood_pressure",
        value: sanitizedData.bloodPressure.systolic,
        unit: "mmHg",
        source: "manual",
        metadata: { diastolic: sanitizedData.bloodPressure.diastolic },
      })
      metrics.push(bpMetric)
    }

    if (sanitizedData.heartRate) {
      const hrMetric = await DatabaseService.addHealthMetric({
        user_id: session.userId,
        metric_type: "heart_rate",
        value: sanitizedData.heartRate,
        unit: "bpm",
        source: "manual",
      })
      metrics.push(hrMetric)
    }

    const duration = Date.now() - startTime
    logger.logRequest("POST", "/api/health-metrics", session.userId, duration)
    logger.info("Health metrics added", {
      userId: session.userId,
      metricsCount: metrics.length,
      types: metrics.map((m) => m.metric_type),
    })

    const response = NextResponse.json({ success: true, metrics })
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  })(request)
}

export async function GET(request: NextRequest) {
  return asyncHandler(async (req: NextRequest) => {
    const startTime = Date.now()

    await rateLimiter.checkLimit(req, rateLimitConfigs.api)

    const session = await getSession()
    if (!session) {
      throw new AuthenticationError("Not authenticated")
    }

    const { searchParams } = new URL(request.url)
    const metricType = searchParams.get("type")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "100"), 1000) // Added pagination limit
    const offset = Math.max(Number.parseInt(searchParams.get("offset") || "0"), 0)

    const sanitizedMetricType = metricType ? sanitizeInput(metricType) : undefined

    const metrics = await DatabaseService.getHealthMetrics(session.userId, sanitizedMetricType, limit, offset)

    const duration = Date.now() - startTime
    logger.logRequest("GET", "/api/health-metrics", session.userId, duration)

    const response = NextResponse.json({
      success: true,
      metrics,
      pagination: {
        limit,
        offset,
        total: metrics.length,
      },
    })

    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  })(request)
}
