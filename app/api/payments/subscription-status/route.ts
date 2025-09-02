import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { StripeService, SUBSCRIPTION_PLANS } from "@/lib/stripe"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user's subscription from database
    const [subscription] = await sql`
      SELECT * FROM subscriptions WHERE user_id = ${session.userId} LIMIT 1
    `

    if (!subscription) {
      return NextResponse.json({
        success: true,
        subscription: {
          planType: "free",
          status: "active",
          features: SUBSCRIPTION_PLANS.free.features,
          limits: SUBSCRIPTION_PLANS.free.limits,
        },
      })
    }

    // Get latest subscription data from Stripe
    let stripeSubscription = null
    if (subscription.stripe_subscription_id) {
      try {
        stripeSubscription = await StripeService.getSubscription(subscription.stripe_subscription_id)
      } catch (error) {
        console.error("Error fetching Stripe subscription:", error)
      }
    }

    const plan = SUBSCRIPTION_PLANS[subscription.plan_type as keyof typeof SUBSCRIPTION_PLANS]

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        planType: subscription.plan_type,
        status: stripeSubscription?.status || subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: stripeSubscription?.cancel_at_period_end || false,
        features: plan.features,
        limits: plan.limits,
        price: plan.price,
      },
    })
  } catch (error) {
    console.error("Get subscription status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
