import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { StripeService } from "@/lib/stripe"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user's Stripe customer ID
    const [subscription] = await sql`
      SELECT stripe_customer_id FROM subscriptions WHERE user_id = ${session.userId} LIMIT 1
    `

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    const returnUrl = `${request.nextUrl.origin}/settings`
    const portalSession = await StripeService.createCustomerPortalSession(subscription.stripe_customer_id, returnUrl)

    return NextResponse.json({
      success: true,
      url: portalSession.url,
    })
  } catch (error) {
    console.error("Customer portal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
