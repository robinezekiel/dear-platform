import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { JournalAI } from "@/lib/ai-services"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user context
    const [userProfile] = await sql`
      SELECT transformation_goals, mental_health_goals FROM user_profiles WHERE user_id = ${session.userId}
    `

    const [recentMood] = await sql`
      SELECT mood_score, stress_level FROM mood_entries 
      WHERE user_id = ${session.userId}
      ORDER BY recorded_at DESC
      LIMIT 1
    `

    const recentEntries = await sql`
      SELECT content FROM journal_entries 
      WHERE user_id = ${session.userId}
      ORDER BY created_at DESC
      LIMIT 3
    `

    const userContext = {
      recentMood: recentMood?.mood_score,
      goals: [...(userProfile?.transformation_goals || []), ...(userProfile?.mental_health_goals || [])],
      stressLevel: recentMood?.stress_level,
      recentEntries: recentEntries.map((entry: any) => entry.content),
    }

    // Generate personalized prompts
    const prompts = await JournalAI.generatePrompts(userContext)

    return NextResponse.json({
      success: true,
      prompts,
    })
  } catch (error) {
    console.error("AI journal prompts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
