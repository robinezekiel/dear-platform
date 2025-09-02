import { type NextRequest, NextResponse } from "next/server"
import { sportsBiomechanicsAI } from "@/lib/sports-biomechanics-ai"
import { validateRequest } from "@/lib/validation"
import { logActivity } from "@/lib/logging"

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const validation = await validateRequest(request)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 })
    }

    const formData = await request.formData()
    const videoFile = formData.get("video") as File
    const sport = formData.get("sport") as string
    const skill = formData.get("skill") as string

    if (!videoFile || !sport || !skill) {
      return NextResponse.json({ error: "Video file, sport, and skill are required" }, { status: 400 })
    }

    // Convert file to buffer
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer())

    // Perform biomechanical analysis
    const analysis = await sportsBiomechanicsAI.analyzePerformance(videoBuffer, sport, skill)

    // Log the analysis
    await logActivity({
      userId: validation.user.id,
      action: "sports_analysis",
      details: {
        sport,
        skill,
        score: analysis.overallScore,
        videoSize: videoBuffer.length,
      },
    })

    // Award XP for analysis
    const xpGained = Math.floor(analysis.overallScore / 10) * 5 // 5-50 XP based on performance

    return NextResponse.json({
      success: true,
      analysis,
      xpGained,
      message: "Performance analysis completed successfully",
    })
  } catch (error) {
    console.error("Sports analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze sports performance" }, { status: 500 })
  }
}
