import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await DatabaseService.getUserById(session.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user profile
    const profile = await DatabaseService.getUserProfile(user.id)

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      profile,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const runtime = "nodejs";