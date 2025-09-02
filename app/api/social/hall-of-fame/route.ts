import { type NextRequest, NextResponse } from "next/server"
import { validateRequest } from "@/lib/auth"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"

    let query = `
      SELECT 
        hof.id,
        hof.user_id,
        u.name as user_name,
        u.avatar_url as user_avatar,
        hof.achievement,
        hof.category,
        hof.milestone,
        hof.before_image,
        hof.after_image,
        hof.story,
        hof.likes,
        hof.shares,
        hof.date_achieved,
        hof.tier,
        hof.created_at
      FROM hall_of_fame hof
      JOIN users u ON hof.user_id = u.id
      WHERE hof.is_approved = true
    `

    const params: any[] = []

    if (category !== "all") {
      query += ` AND hof.category = $${params.length + 1}`
      params.push(category)
    }

    query += ` ORDER BY hof.created_at DESC LIMIT 50`

    const result = await sql(query, params)

    const entries = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      userName: row.user_name,
      userAvatar: row.user_avatar,
      achievement: row.achievement,
      category: row.category,
      milestone: row.milestone,
      beforeImage: row.before_image,
      afterImage: row.after_image,
      story: row.story,
      likes: row.likes,
      shares: row.shares,
      dateAchieved: row.date_achieved,
      tier: row.tier,
    }))

    return NextResponse.json({ entries })
  } catch (error) {
    console.error("Hall of Fame fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch hall of fame entries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { achievement, category, milestone, beforeImage, afterImage, story, tier = "bronze" } = body

    // Insert new hall of fame entry (pending approval)
    const result = await sql(
      `
      INSERT INTO hall_of_fame (
        user_id, achievement, category, milestone, 
        before_image, after_image, story, tier,
        likes, shares, date_achieved, is_approved
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, CURRENT_DATE, false)
      RETURNING id
    `,
      [user.id, achievement, category, milestone, beforeImage, afterImage, story, tier],
    )

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
      message: "Entry submitted for review",
    })
  } catch (error) {
    console.error("Hall of Fame submission error:", error)
    return NextResponse.json({ error: "Failed to submit entry" }, { status: 500 })
  }
}
