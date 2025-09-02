import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { complianceEngine } from "@/lib/compliance-engine"
import { handleApiError, ApiError } from "@/lib/error-handling"
import { validateRequest } from "@/lib/validation"
import { z } from "zod"

const dataSubjectRequestSchema = z.object({
  requestType: z.enum(["access", "rectification", "erasure", "portability", "restriction", "objection"]),
  description: z.string().optional(),
  specificData: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      throw new ApiError("Unauthorized", 401)
    }

    const body = await request.json()
    const { requestType, description, specificData } = validateRequest(dataSubjectRequestSchema, body)

    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    const requestId = await complianceEngine.createDataSubjectRequest({
      userId: user.id,
      requestType,
      requestData: {
        description,
        specificData,
        ipAddress: clientIP,
        userAgent,
      },
    })

    return NextResponse.json({
      success: true,
      requestId,
      message: `Data subject request created. You will receive a response within 30 days.`,
      estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    return handleApiError(error)
  }
}
