import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")
    const consultationType = searchParams.get("consultationType")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    let query = `
      SELECT p.*, 
             COALESCE(AVG(pr.rating), 0) as avg_rating,
             COUNT(pr.id) as review_count
      FROM providers p
      LEFT JOIN provider_reviews pr ON p.id = pr.provider_id
      WHERE p.is_active = true AND p.is_verified = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (specialty) {
      query += ` AND $${paramIndex} = ANY(p.specialties)`
      params.push(specialty)
      paramIndex++
    }

    if (location) {
      query += ` AND (p.location_city ILIKE $${paramIndex} OR p.location_state ILIKE $${paramIndex})`
      params.push(`%${location}%`)
      paramIndex++
    }

    if (consultationType) {
      query += ` AND $${paramIndex} = ANY(p.consultation_types)`
      params.push(consultationType)
      paramIndex++
    }

    query += ` GROUP BY p.id ORDER BY avg_rating DESC, p.created_at DESC LIMIT $${paramIndex}`
    params.push(limit)

    const providers = await sql.unsafe(query, params)

    return NextResponse.json({ success: true, providers })
  } catch (error) {
    console.error("Get providers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
