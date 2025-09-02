import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const mealSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  mealName: z.string().optional(),
  foods: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unit: z.string(),
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
    }),
  ),
  mealDate: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { mealType, mealName, foods, mealDate } = mealSchema.parse(body)

    // Calculate totals
    const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0)
    const totalProtein = foods.reduce((sum, food) => sum + (food.protein || 0), 0)
    const totalCarbs = foods.reduce((sum, food) => sum + (food.carbs || 0), 0)
    const totalFat = foods.reduce((sum, food) => sum + (food.fat || 0), 0)

    const [meal] = await sql`
      INSERT INTO meals (user_id, meal_type, meal_name, foods, total_calories, total_protein, total_carbs, total_fat, meal_date)
      VALUES (${session.userId}, ${mealType}, ${mealName || null}, ${JSON.stringify(foods)}, ${totalCalories}, ${totalProtein}, ${totalCarbs}, ${totalFat}, ${mealDate})
      RETURNING *
    `

    return NextResponse.json({ success: true, meal })
  } catch (error) {
    console.error("Add meal error:", error)
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
    const date = searchParams.get("date")
    const limit = Number.parseInt(searchParams.get("limit") || "30")

    let meals
    if (date) {
      meals = await sql`
        SELECT * FROM meals 
        WHERE user_id = ${session.userId} AND meal_date = ${date}
        ORDER BY created_at ASC
      `
    } else {
      meals = await sql`
        SELECT * FROM meals 
        WHERE user_id = ${session.userId}
        ORDER BY meal_date DESC, created_at ASC
        LIMIT ${limit}
      `
    }

    return NextResponse.json({ success: true, meals })
  } catch (error) {
    console.error("Get meals error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
