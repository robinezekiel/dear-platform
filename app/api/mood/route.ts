import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const moodSchema = z.object({
  moodScore: z.number().min(1).max(10),
  emotions: z.array(z.string()).optional(),
  energyLevel: z.number().min(1).max(10).optional(),
  stressLevel: z.number().min(1).max(10).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { moodScore, emotions, energyLevel, stressLevel, sleepHours, notes } = moodSchema.parse(body)

    const [moodEntry] = await sql`
      INSERT INTO mood_entries (user_id, mood_score, emotions, energy_level, stress_level, sleep_hours, notes)
      VALUES (${session.userId}, ${moodScore}, ${emotions || null}, ${energyLevel || null}, ${stressLevel || null}, ${sleepHours || null}, ${notes || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, moodEntry })
  } catch (error) {
    console.error("Add mood entry error:", error)
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
    const days = Number.parseInt(searchParams.get("days") || "30")

    const moodEntries = await sql`
      SELECT * FROM mood_entries 
      WHERE user_id = ${session.userId} 
        AND recorded_at >= NOW() - INTERVAL '${days} days'
      ORDER BY recorded_at DESC
    `

    return NextResponse.json({ success: true, moodEntries })
  } catch (error) {
    console.error("Get mood entries error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
