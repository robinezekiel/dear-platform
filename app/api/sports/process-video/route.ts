import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/validation"
import { handleApiError } from "@/lib/error-handling"
import { rateLimit } from "@/lib/rate-limiting"
import { logActivity } from "@/lib/logging"
import { videoProcessor } from "@/lib/video-processing-pipeline"

const processVideoSchema = {
  type: "object",
  properties: {
    video_path: { type: "string" },
    sport_type: {
      type: "string",
      enum: ["football", "cricket", "mma", "golf", "tennis", "basketball"],
    },
    quality: {
      type: "string",
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    extract_frames: { type: "boolean", default: true },
    frame_rate: { type: "number", minimum: 1, maximum: 30, default: 5 },
  },
  required: ["video_path", "sport_type"],
  additionalProperties: false,
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 video processing requests per hour
    const rateLimitResult = await rateLimit(request, "video-processing", 3, 3600)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Video processing is resource intensive.",
        },
        { status: 429 },
      )
    }

    // Validate request
    const validation = await validateRequest(request, processVideoSchema)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validation.errors,
        },
        { status: 400 },
      )
    }

    const { video_path, sport_type, quality, extract_frames, frame_rate } = validation.data
    const userId = request.headers.get("x-user-id")

    // Log processing start
    await logActivity("video_processing_started", {
      userId,
      sport_type,
      quality,
      timestamp: new Date().toISOString(),
    })

    // Process video through pipeline
    const processingResult = await videoProcessor.processVideo({
      inputPath: video_path,
      outputPath: `/processed/${userId}/${Date.now()}.mp4`,
      sport: sport_type,
      quality: quality as "low" | "medium" | "high",
      extractFrames: extract_frames,
      frameRate: frame_rate,
    })

    if (!processingResult.success) {
      await logActivity("video_processing_failed", {
        userId,
        error: processingResult.error,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          error: "Video processing failed",
          details: processingResult.error,
        },
        { status: 500 },
      )
    }

    // Log successful processing
    await logActivity("video_processing_completed", {
      userId,
      sport_type,
      processing_time: Date.now(),
      frames_extracted: processingResult.frames?.length || 0,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      processed_video: {
        path: processingResult.outputPath,
        thumbnail: processingResult.thumbnailPath,
        metadata: processingResult.metadata,
        frames: processingResult.frames?.length || 0,
      },
      message: "Video processed successfully and ready for analysis",
    })
  } catch (error) {
    return handleApiError(error, "video processing")
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const url = new URL(request.url)
    const jobId = url.searchParams.get("job_id")

    if (jobId) {
      // Return processing status for specific job
      return NextResponse.json({
        success: true,
        status: "completed", // In real implementation, check actual job status
        progress: 100,
      })
    }

    // Return user's processing history
    return NextResponse.json({
      success: true,
      processing_history: [
        {
          id: "proc_001",
          sport_type: "football",
          status: "completed",
          processed_at: "2024-03-15T10:30:00Z",
          quality: "high",
        },
      ],
    })
  } catch (error) {
    return handleApiError(error, "fetch processing status")
  }
}
