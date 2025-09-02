import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/validation"
import { handleApiError } from "@/lib/error-handling"
import { rateLimit } from "@/lib/rate-limiting"
import { logActivity } from "@/lib/logging"

const uploadVideoSchema = {
  type: "object",
  properties: {
    sport_type: {
      type: "string",
      enum: ["football", "cricket", "mma", "golf", "tennis", "basketball"],
    },
    video_url: { type: "string", format: "uri" },
    skill_focus: { type: "string" },
    user_notes: { type: "string", maxLength: 500 },
  },
  required: ["sport_type", "video_url"],
  additionalProperties: false,
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, "sports-upload", 5, 3600) // 5 uploads per hour
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Validate request
    const validation = await validateRequest(request, uploadVideoSchema)
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request data", details: validation.errors }, { status: 400 })
    }

    const { sport_type, video_url, skill_focus, user_notes } = validation.data
    const userId = request.headers.get("x-user-id") // From auth middleware

    // Log activity
    await logActivity("sports_video_upload", {
      userId,
      sport_type,
      skill_focus,
      timestamp: new Date().toISOString(),
    })

    // Simulate AI analysis processing
    const analysisResult = {
      id: `analysis_${Date.now()}`,
      sport_type,
      overall_score: Math.floor(Math.random() * 30) + 70, // 70-100%
      metrics: {
        technique: Math.floor(Math.random() * 30) + 70,
        power: Math.floor(Math.random() * 30) + 70,
        accuracy: Math.floor(Math.random() * 30) + 70,
        consistency: Math.floor(Math.random() * 30) + 70,
      },
      insights: [
        {
          aspect: "Technique",
          score: Math.floor(Math.random() * 30) + 70,
          feedback: "Good form overall, focus on follow-through for better consistency",
        },
        {
          aspect: "Power Generation",
          score: Math.floor(Math.random() * 30) + 70,
          feedback: "Strong power generation, maintain hip rotation for optimal results",
        },
      ],
      recommended_drills: [
        {
          id: 1,
          name: "Technique Refinement Drill",
          difficulty: "Intermediate",
          duration: "15 minutes",
          focus: "Form correction",
        },
        {
          id: 2,
          name: "Power Enhancement Exercise",
          difficulty: "Advanced",
          duration: "20 minutes",
          focus: "Strength building",
        },
      ],
      processed_at: new Date().toISOString(),
    }

    // Award XP for sports video upload
    const xpAwarded = 50
    await logActivity("xp_awarded", {
      userId,
      amount: xpAwarded,
      reason: "sports_video_upload",
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      xp_awarded: xpAwarded,
      message: "Video uploaded and analyzed successfully",
    })
  } catch (error) {
    return handleApiError(error, "sports video upload")
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const url = new URL(request.url)
    const sport = url.searchParams.get("sport")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    // Simulate fetching user's sports videos
    const videos = [
      {
        id: 1,
        sport_type: "football",
        skill_focus: "Free Kick",
        overall_score: 87,
        uploaded_at: "2024-03-15T10:30:00Z",
        thumbnail_url: "/transformation-comparison-ai.png",
      },
      {
        id: 2,
        sport_type: "cricket",
        skill_focus: "Batting Stance",
        overall_score: 92,
        uploaded_at: "2024-03-14T15:45:00Z",
        thumbnail_url: "/transformation-comparison-ai.png",
      },
    ]

    const filteredVideos = sport ? videos.filter((v) => v.sport_type === sport) : videos

    return NextResponse.json({
      success: true,
      videos: filteredVideos.slice(0, limit),
      total: filteredVideos.length,
    })
  } catch (error) {
    return handleApiError(error, "fetch sports videos")
  }
}
