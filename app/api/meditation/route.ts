import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const meditationSchema = z.object({
  sessionType: z.string().min(1, "Session type is required"),
  durationMinutes: z.number().min(1),
  meditationTitle: z.string().optional(),
  moodBefore: z.number().min(1).max(10).optional(),
  moodAfter: z.number().min(1).max(10).optional(),
  focusRating: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { sessionType, durationMinutes, meditationTitle, moodBefore, moodAfter, focusRating, notes } =
      meditationSchema.parse(body)

    const [meditationSession] = await sql`
      INSERT INTO meditation_sessions (user_id, session_type, duration_minutes, meditation_title, mood_before, mood_after, focus_rating, notes)
      VALUES (${session.userId}, ${sessionType}, ${durationMinutes}, ${meditationTitle || null}, ${moodBefore || null}, ${moodAfter || null}, ${focusRating || null}, ${notes || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, session: meditationSession })
  } catch (error) {
    console.error("Add meditation session error:", error)
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
    const limit = Number.parseInt(searchParams.get("limit") || "30")

    const sessions = await sql`
      SELECT * FROM meditation_sessions 
      WHERE user_id = ${session.userId}
      ORDER BY completed_at DESC
      LIMIT ${limit}
    `

    // Calculate stats
    const stats = await sql`
      SELECT 
        COUNT(*) as total_sessions,
        SUM(duration_minutes) as total_minutes,
        AVG(focus_rating) as avg_focus_rating,
        COUNT(CASE WHEN completed_at >= NOW() - INTERVAL '7 days' THEN 1 END) as sessions_this_week
      FROM meditation_sessions 
      WHERE user_id = ${session.userId}
    `

    return NextResponse.json({ success: true, sessions, stats: stats[0] })
  } catch (error) {
    console.error("Get meditation sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
