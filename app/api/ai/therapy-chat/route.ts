import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { TherapyAI } from "@/lib/ai-services"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const chatSchema = z.object({
  message: z.string().min(1, "Message is required"),
  sessionId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { message, sessionId } = chatSchema.parse(body)

    // Get or create therapy session
    let therapySession
    if (sessionId) {
      const [existingSession] = await sql`
        SELECT * FROM therapy_sessions WHERE id = ${sessionId} AND user_id = ${session.userId}
      `
      therapySession = existingSession
    }

    if (!therapySession) {
      const [newSession] = await sql`
        INSERT INTO therapy_sessions (user_id, session_type)
        VALUES (${session.userId}, 'ai_therapy')
        RETURNING *
      `
      therapySession = newSession
    }

    // Get conversation history
    const conversationHistory = await sql`
      SELECT sender, message FROM therapy_messages 
      WHERE session_id = ${therapySession.id}
      ORDER BY created_at ASC
      LIMIT 20
    `

    // Get user context for better responses
    const [userProfile] = await sql`
      SELECT mental_health_goals FROM user_profiles WHERE user_id = ${session.userId}
    `

    const [recentMood] = await sql`
      SELECT mood_score, stress_level FROM mood_entries 
      WHERE user_id = ${session.userId}
      ORDER BY recorded_at DESC
      LIMIT 1
    `

    // Analyze sentiment of user message
    const sentimentAnalysis = await TherapyAI.analyzeSentiment(message)

    // Generate AI response
    const aiResponse = await TherapyAI.generateResponse(
      message,
      conversationHistory.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.message,
      })),
      {
        mentalHealthGoals: userProfile?.mental_health_goals || [],
        recentMood: recentMood?.mood_score,
        stressLevel: recentMood?.stress_level,
      },
    )

    // Save user message
    await sql`
      INSERT INTO therapy_messages (session_id, sender, message, sentiment_score)
      VALUES (${therapySession.id}, 'user', ${message}, ${sentimentAnalysis.score})
    `

    // Save AI response
    await sql`
      INSERT INTO therapy_messages (session_id, sender, message)
      VALUES (${therapySession.id}, 'ai', ${aiResponse})
    `

    // Update session
    await sql`
      UPDATE therapy_sessions 
      SET topics_discussed = array_append(COALESCE(topics_discussed, ARRAY[]::text[]), ${sentimentAnalysis.emotions[0] || "general"}),
          ai_insights = ${JSON.stringify(sentimentAnalysis)}
      WHERE id = ${therapySession.id}
    `

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: therapySession.id,
      sentimentAnalysis,
    })
  } catch (error) {
    console.error("AI therapy chat error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
