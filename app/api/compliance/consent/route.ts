import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { complianceEngine } from "@/lib/compliance-engine"
import { handleApiError, ApiError } from "@/lib/error-handling"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const consentSchema = z.object({
  consentType: z.enum(["data_processing", "marketing", "analytics", "third_party", "medical_data"]),
  granted: z.boolean(),
  version: z.string().default("1.0"),
})

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const body = await request.json()
    const { consentType, granted, version } = validateRequest(consentSchema, body)

    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    await complianceEngine.recordConsent({
      userId: user.id,
      consentType,
      granted,
      timestamp: new Date(),
      version,
      ipAddress: clientIP,
    })

    return NextResponse.json({
      success: true,
      message: `Consent ${granted ? "granted" : "withdrawn"} for ${consentType}`,
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

    const consentStatus = await complianceEngine.getConsentStatus(user.id)

    return NextResponse.json({
      success: true,
      data: consentStatus,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
