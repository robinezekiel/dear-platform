import { type NextRequest, NextResponse } from "next/server"
import { graphMigration } from "@/lib/graph-migration"
import { validateRequest } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await graphMigration.runFullMigration()

    return NextResponse.json({
      success: true,
      message: "Graph database migration completed successfully",
    })
  } catch (error) {
    console.error("[v0] Graph migration error:", error)
    return NextResponse.json({ error: "Migration failed", details: error.message }, { status: 500 })
  }
}
