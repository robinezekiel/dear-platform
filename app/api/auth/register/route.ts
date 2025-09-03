import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { hashPassword, createSession } from "@/lib/auth"
import { userRegistrationSchema, sanitizeInput } from "@/lib/validation"
import { ValidationError, asyncHandler } from "@/lib/error-handling"
import { rateLimiter, rateLimitConfigs } from "@/lib/rate-limiting"
import { logger } from "@/lib/logging"
import { SecurityUtils, securityHeaders } from "@/lib/security"

export async function POST(request: NextRequest) {
  return asyncHandler(async (req: NextRequest) => {
    const startTime = Date.now()

    await rateLimiter.checkLimit(req, rateLimitConfigs.auth)

    if (SecurityUtils.detectSuspiciousActivity(req)) {
      logger.warn("Suspicious registration attempt detected", {
        ip: req.headers.get("x-forwarded-for"),
        userAgent: req.headers.get("user-agent"),
      })
      throw new ValidationError("Request blocked for security reasons")
    }

    const body = await request.json()

    const validatedData = userRegistrationSchema.parse({
      ...body,
      email: sanitizeInput(body.email),
      firstName: sanitizeInput(body.firstName),
      lastName: sanitizeInput(body.lastName),
    })

    // Check if user already exists
    const existingUser = await DatabaseService.getUserByEmail(validatedData.email)
    if (existingUser) {
      logger.warn("Registration attempt with existing email", { email: validatedData.email })
      throw new ValidationError("User with this email already exists")
    }

    // Hash password
    const passwordHash = await hashPassword(validatedData.password)

    // Create user
    const user = await DatabaseService.createUser({
      email: validatedData.email,
      password_hash: passwordHash,
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      date_of_birth: validatedData.dateOfBirth,
      gender: body.gender,
      phone: body.phone,
    })

    // Create session
    await createSession(user.id, user.email)

    const duration = Date.now() - startTime
    logger.logAuth("user_registration", user.id, true)
    logger.logRequest("POST", "/api/auth/register", user.id, duration)

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Account created successfully",
    })

    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  })(request)
}


export const runtime = "nodejs";