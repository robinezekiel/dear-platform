import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { VisualAnalysisAI } from "@/lib/ai-services"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const analysisSchema = z.object({
  photoUrl: z.string().url("Invalid photo URL"),
  photoType: z.enum(["body", "face", "hair", "skin"]),
  bodyPart: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { photoUrl, photoType, bodyPart } = analysisSchema.parse(body)

    // Get previous analysis for comparison
    const previousPhotos = await sql`
      SELECT ai_analysis FROM transformation_photos 
      WHERE user_id = ${session.userId} AND photo_type = ${photoType}
      ORDER BY taken_at DESC
      LIMIT 1
    `

    const previousAnalysis = previousPhotos[0]?.ai_analysis

    // Perform AI visual analysis
    const analysis = await VisualAnalysisAI.analyzeTransformationPhoto(photoUrl, photoType, previousAnalysis)

    // Get user goals for progress prediction
    const [userProfile] = await sql`
      SELECT transformation_goals FROM user_profiles WHERE user_id = ${session.userId}
    `

    // Generate progress prediction
    const progressPrediction = await VisualAnalysisAI.generateProgressPrediction(
      analysis,
      userProfile?.transformation_goals || [],
      "3_months",
    )

    // Save the photo with analysis
    const [savedPhoto] = await sql`
      INSERT INTO transformation_photos (user_id, photo_url, photo_type, body_part, ai_analysis, confidence_score)
      VALUES (${session.userId}, ${photoUrl}, ${photoType}, ${bodyPart || null}, ${JSON.stringify(analysis)}, ${analysis.confidenceScore})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      analysis,
      progressPrediction,
      photo: savedPhoto,
    })
  } catch (error) {
    console.error("AI visual analysis error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
