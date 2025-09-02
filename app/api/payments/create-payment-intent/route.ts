import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { StripeService } from "@/lib/stripe"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const paymentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("usd"),
  appointmentId: z.string().optional(),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, currency, appointmentId, description } = paymentSchema.parse(body)

    // Get user's Stripe customer ID
    const [subscription] = await sql`
      SELECT stripe_customer_id FROM subscriptions WHERE user_id = ${session.userId} LIMIT 1
    `

    const customerId = subscription?.stripe_customer_id

    // Create payment intent
    const paymentIntent = await StripeService.createPaymentIntent(amount, currency, customerId)

    // If this is for an appointment, update the appointment record
    if (appointmentId) {
      await sql`
        UPDATE appointments 
        SET cost = ${amount}, payment_status = 'pending'
        WHERE id = ${appointmentId} AND user_id = ${session.userId}
      `
    }

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Create payment intent error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
