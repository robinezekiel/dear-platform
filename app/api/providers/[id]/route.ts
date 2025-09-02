import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const providerId = params.id

    const [provider] = await sql`
      SELECT p.*, 
             COALESCE(AVG(pr.rating), 0) as avg_rating,
             COUNT(pr.id) as review_count
      FROM providers p
      LEFT JOIN provider_reviews pr ON p.id = pr.provider_id
      WHERE p.id = ${providerId} AND p.is_active = true
      GROUP BY p.id
    `

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 })
    }

    // Get recent reviews
    const reviews = await sql`
      SELECT pr.*, u.first_name, u.last_name
      FROM provider_reviews pr
      JOIN users u ON pr.user_id = u.id
      WHERE pr.provider_id = ${providerId}
      ORDER BY pr.created_at DESC
      LIMIT 10
    `

    return NextResponse.json({ success: true, provider, reviews })
  } catch (error) {
    console.error("Get provider error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
