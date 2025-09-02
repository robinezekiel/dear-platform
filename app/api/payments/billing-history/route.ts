import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { StripeService } from "@/lib/stripe"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
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
      return NextResponse.json({ success: true, invoices: [] })
    }

    const invoices = await StripeService.getInvoices(subscription.stripe_customer_id, 20)

    // Also get payment records from database
    const payments = await sql`
      SELECT * FROM payments WHERE user_id = ${session.userId}
      ORDER BY created_at DESC
      LIMIT 20
    `

    return NextResponse.json({
      success: true,
      invoices: invoices.data,
      payments,
    })
  } catch (error) {
    console.error("Get billing history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
