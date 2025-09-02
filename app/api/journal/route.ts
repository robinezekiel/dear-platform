import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const journalSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  moodBefore: z.number().min(1).max(10).optional(),
  moodAfter: z.number().min(1).max(10).optional(),
  aiPromptUsed: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPrivate: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, moodBefore, moodAfter, aiPromptUsed, tags, isPrivate } = journalSchema.parse(body)

    const [entry] = await sql`
      INSERT INTO journal_entries (user_id, title, content, mood_before, mood_after, ai_prompt_used, tags, is_private)
      VALUES (${session.userId}, ${title || null}, ${content}, ${moodBefore || null}, ${moodAfter || null}, ${aiPromptUsed || null}, ${tags || null}, ${isPrivate})
      RETURNING *
    `

    return NextResponse.json({ success: true, entry })
  } catch (error) {
    console.error("Add journal entry error:", error)
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
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const tag = searchParams.get("tag")

    let entries
    if (tag) {
      entries = await sql`
        SELECT * FROM journal_entries 
        WHERE user_id = ${session.userId} AND ${tag} = ANY(tags)
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    } else {
      entries = await sql`
        SELECT * FROM journal_entries 
        WHERE user_id = ${session.userId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    }

    return NextResponse.json({ success: true, entries })
  } catch (error) {
    console.error("Get journal entries error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
