import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { validateInput } from "@/lib/validation"

const preferencesSchema = {
  type: "object",
  properties: {
    notifications: { type: "boolean" },
    newsletters: { type: "boolean" },
    milestones: { type: "boolean" },
    appointments: { type: "boolean" },
    marketing: { type: "boolean" },
  },
  additionalProperties: false,
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Fetch from database
    const preferences = {
      notifications: true,
      newsletters: true,
      milestones: true,
      appointments: true,
      marketing: false,
    }

    return NextResponse.json({ success: true, preferences })
  } catch (error) {
    console.error("[v0] Error fetching email preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validation = validateInput(body, preferencesSchema)
    if (!validation.isValid) {
      return NextResponse.json({ error: "Invalid input", details: validation.errors }, { status: 400 })
    }

    // TODO: Save to database
    console.log("[v0] Updating email preferences for user:", user.id, body)

    return NextResponse.json({ success: true, message: "Email preferences updated" })
  } catch (error) {
    console.error("[v0] Error updating email preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
