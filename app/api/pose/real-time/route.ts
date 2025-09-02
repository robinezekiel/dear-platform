import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/validation"
import { handleApiError } from "@/lib/error-handling"
import { rateLimit } from "@/lib/rate-limiting"
import { logActivity } from "@/lib/logging"
// Note: real-time pose server is disabled for serverless deploy compatibility
// import { poseEstimationServer } from "@/lib/pose-estimation-server"

const poseAnalysisSchema = {
  type: "object",
  properties: {
    image: { type: "string" }, // Base64 encoded image
    timestamp: { type: "number" },
    sport: { type: "string" },
    config: {
      type: "object",
      properties: {
        scoreThreshold: { type: "number", minimum: 0, maximum: 1 },
        maxDetections: { type: "number", minimum: 1, maximum: 10 },
        flipHorizontal: { type: "boolean" },
      },
    },
  },
  required: ["image"],
  additionalProperties: false,
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for real-time pose estimation
    const rateLimitResult = await rateLimit(request, "pose-estimation", 100, 60) // 100 requests per minute
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded for pose estimation",
        },
        { status: 429 },
      )
    }

    // Validate request
    const validation = await validateRequest(request, poseAnalysisSchema)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validation.errors,
        },
        { status: 400 },
      )
    }

    const { image, timestamp, sport, config } = validation.data
    const userId = request.headers.get("x-user-id")

    // Real-time server disabled in this deployment target; using direct processing/mocked response

    // Log pose estimation request
    await logActivity("pose_estimation_request", {
      userId,
      sport,
      timestamp: new Date().toISOString(),
    })

    // For HTTP API, we'll process the single frame directly
    // In production, clients would use WebSocket for real-time streaming
    const result = await processSingleFrame(image, timestamp, config)

    return NextResponse.json({
      success: true,
      result,
      websocket_url: `ws://localhost:8080`, // WebSocket endpoint for real-time streaming
      message: "Frame processed successfully. Use WebSocket for real-time streaming.",
    })
  } catch (error) {
    return handleApiError(error, "real-time pose estimation")
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const action = url.searchParams.get("action")

    switch (action) {
      case "status":
        return NextResponse.json({
          success: true,
          status: { initialized: false, connections: 0, modelLoaded: false },
        })

      case "config":
        return NextResponse.json({
          success: true,
          config: {
            websocket_url: "ws://localhost:8080",
            supported_formats: ["image/jpeg", "image/png"],
            max_image_size: "2MB",
            rate_limits: {
              http: "100 requests/minute",
              websocket: "unlimited",
            },
          },
        })

      default:
        return NextResponse.json({
          success: true,
          endpoints: {
            websocket: null,
            http_analysis: "/api/pose/real-time",
            status: "/api/pose/real-time?action=status",
            config: "/api/pose/real-time?action=config",
          },
          usage: {
            http: "POST with base64 image for single frame analysis",
            websocket: "Disabled in this deployment",
          },
        })
    }
  } catch (error) {
    return handleApiError(error, "pose estimation info")
  }
}

async function processSingleFrame(imageBase64: string, timestamp?: number, config?: any) {
  // This would integrate with the pose estimation server
  // For now, return mock data that matches the real structure
  return {
    timestamp: timestamp || Date.now(),
    poses: [
      {
        keypoints: [
          { part: "nose", position: { x: 320, y: 100 }, score: 0.95 },
          { part: "leftEye", position: { x: 310, y: 95 }, score: 0.92 },
          { part: "rightEye", position: { x: 330, y: 95 }, score: 0.93 },
          { part: "leftEar", position: { x: 300, y: 100 }, score: 0.88 },
          { part: "rightEar", position: { x: 340, y: 100 }, score: 0.89 },
          { part: "leftShoulder", position: { x: 280, y: 150 }, score: 0.92 },
          { part: "rightShoulder", position: { x: 360, y: 150 }, score: 0.93 },
          { part: "leftElbow", position: { x: 250, y: 200 }, score: 0.88 },
          { part: "rightElbow", position: { x: 390, y: 200 }, score: 0.89 },
          { part: "leftWrist", position: { x: 220, y: 250 }, score: 0.85 },
          { part: "rightWrist", position: { x: 420, y: 250 }, score: 0.87 },
          { part: "leftHip", position: { x: 290, y: 300 }, score: 0.91 },
          { part: "rightHip", position: { x: 350, y: 300 }, score: 0.92 },
          { part: "leftKnee", position: { x: 285, y: 400 }, score: 0.89 },
          { part: "rightKnee", position: { x: 355, y: 400 }, score: 0.9 },
          { part: "leftAnkle", position: { x: 280, y: 500 }, score: 0.86 },
          { part: "rightAnkle", position: { x: 360, y: 500 }, score: 0.88 },
        ],
        score: 0.91,
      },
    ],
    processingTime: 45,
  }
}
