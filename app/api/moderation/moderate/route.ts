import { type NextRequest, NextResponse } from "next/server"
import { contentModerationAI } from "@/lib/content-moderation-ai"
import { validateRequest } from "@/lib/validation"
import { logActivity } from "@/lib/logging"

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 })
    }

    const { contentId, content, contentType = "text", context } = await request.json()

    if (!contentId || !content) {
      return NextResponse.json({ error: "Content ID and content are required" }, { status: 400 })
    }

    // Moderate content
    const moderationResult = await contentModerationAI.moderateContent(
      contentId,
      content,
      contentType,
      validation.user.id,
      context,
    )

    // Log moderation activity
    await logActivity({
      userId: validation.user.id,
      action: "content_moderated",
      details: {
        contentId,
        action: moderationResult.action,
        severity: moderationResult.severity,
        confidence: moderationResult.confidence,
      },
    })

    return NextResponse.json({
      success: true,
      moderation: moderationResult,
      message: `Content ${moderationResult.action}d successfully`,
    })
  } catch (error) {
    console.error("Content moderation error:", error)
    return NextResponse.json({ error: "Failed to moderate content" }, { status: 500 })
  }
}
