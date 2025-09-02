import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { StripeService, SUBSCRIPTION_PLANS } from "@/lib/stripe"
import { DatabaseService } from "@/lib/database"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"

const sql = neon(process.env.DATABASE_URL!)

const subscriptionSchema = z.object({
  planType: z.enum(["premium", "pro"]),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { planType } = subscriptionSchema.parse(body)

    const user = await DatabaseService.getUserById(session.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const plan = SUBSCRIPTION_PLANS[planType]
    if (!plan.priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Check if user already has a Stripe customer
    let stripeCustomerId: string
    const [existingSubscription] = await sql`
      SELECT stripe_customer_id FROM subscriptions WHERE user_id = ${session.userId} LIMIT 1
    `

    if (existingSubscription?.stripe_customer_id) {
      stripeCustomerId = existingSubscription.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await StripeService.createCustomer(
        session.userId,
        user.email,
        `${user.first_name} ${user.last_name}`,
      )
      stripeCustomerId = customer.id
    }

    // Create subscription
    const subscription = await StripeService.createSubscription(stripeCustomerId, plan.priceId)

    // Save subscription to database
    await sql`
      INSERT INTO subscriptions (user_id, plan_type, status, current_period_start, current_period_end, stripe_subscription_id, stripe_customer_id)
      VALUES (${session.userId}, ${planType}, ${subscription.status}, 
              to_timestamp(${subscription.current_period_start}), 
              to_timestamp(${subscription.current_period_end}), 
              ${subscription.id}, ${stripeCustomerId})
      ON CONFLICT (user_id) DO UPDATE SET
        plan_type = EXCLUDED.plan_type,
        status = EXCLUDED.status,
        current_period_start = EXCLUDED.current_period_start,
        current_period_end = EXCLUDED.current_period_end,
        stripe_subscription_id = EXCLUDED.stripe_subscription_id,
        stripe_customer_id = EXCLUDED.stripe_customer_id,
        updated_at = CURRENT_TIMESTAMP
    `

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        status: subscription.status,
      },
    })
  } catch (error) {
    console.error("Create subscription error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
