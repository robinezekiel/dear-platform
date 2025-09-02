import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const workoutSchema = z.object({
  workoutName: z.string().optional(),
  workoutType: z.enum(["strength", "cardio", "flexibility", "sports"]),
  durationMinutes: z.number().min(1),
  caloriesBurned: z.number().optional(),
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.number().optional(),
      reps: z.number().optional(),
      weight: z.number().optional(),
      duration: z.number().optional(),
      distance: z.number().optional(),
      notes: z.string().optional(),
    }),
  ),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { workoutName, workoutType, durationMinutes, caloriesBurned, exercises, notes } = workoutSchema.parse(body)

    const [workout] = await sql`
      INSERT INTO workouts (user_id, workout_name, workout_type, duration_minutes, calories_burned, exercises, notes)
      VALUES (${session.userId}, ${workoutName || null}, ${workoutType}, ${durationMinutes}, ${caloriesBurned || null}, ${JSON.stringify(exercises)}, ${notes || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, workout })
  } catch (error) {
    console.error("Add workout error:", error)
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

    const workouts = await sql`
      SELECT * FROM workouts 
      WHERE user_id = ${session.userId}
      ORDER BY completed_at DESC
      LIMIT ${limit}
    `

    return NextResponse.json({ success: true, workouts })
  } catch (error) {
    console.error("Get workouts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
