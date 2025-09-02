import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const photoSchema = z.object({
  photoUrl: z.string().url("Invalid photo URL"),
  photoType: z.enum(["body", "face", "hair", "skin"]),
  bodyPart: z.string().optional(),
  aiAnalysis: z.object({}).optional(),
  measurements: z.object({}).optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { photoUrl, photoType, bodyPart, aiAnalysis, measurements, confidenceScore } = photoSchema.parse(body)

    const [photo] = await sql`
      INSERT INTO transformation_photos (user_id, photo_url, photo_type, body_part, ai_analysis, measurements, confidence_score)
      VALUES (${session.userId}, ${photoUrl}, ${photoType}, ${bodyPart || null}, ${JSON.stringify(aiAnalysis || {})}, ${JSON.stringify(measurements || {})}, ${confidenceScore || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, photo })
  } catch (error) {
    console.error("Add transformation photo error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const photoType = searchParams.get("type")

    let photos
    if (photoType) {
      photos = await sql`
        SELECT * FROM transformation_photos 
        WHERE user_id = ${session.userId} AND photo_type = ${photoType}
        ORDER BY taken_at DESC
      `
    } else {
      photos = await sql`
        SELECT * FROM transformation_photos 
        WHERE user_id = ${session.userId}
        ORDER BY taken_at DESC
      `
    }

    return NextResponse.json({ success: true, photos })
  } catch (error) {
    console.error("Get transformation photos error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
