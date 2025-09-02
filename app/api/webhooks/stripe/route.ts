import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { neon } from "@neondatabase/serverless"
import type Stripe from "stripe"

const sql = neon(process.env.DATABASE_URL!)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(subscription)
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handleOneTimePaymentSucceeded(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  // Find user by customer ID
  const [existingSubscription] = await sql`
    SELECT user_id FROM subscriptions WHERE stripe_customer_id = ${customerId} LIMIT 1
  `

  if (!existingSubscription) {
    console.error("No user found for customer:", customerId)
    return
  }

  // Determine plan type from price ID
  let planType = "free"
  if (subscription.items.data[0]?.price.id === process.env.STRIPE_PREMIUM_PRICE_ID) {
    planType = "premium"
  } else if (subscription.items.data[0]?.price.id === process.env.STRIPE_PRO_PRICE_ID) {
    planType = "pro"
  }

  // Update subscription in database
  await sql`
    UPDATE subscriptions 
    SET plan_type = ${planType},
        status = ${subscription.status},
        current_period_start = to_timestamp(${subscription.current_period_start}),
        current_period_end = to_timestamp(${subscription.current_period_end}),
        updated_at = CURRENT_TIMESTAMP
    WHERE stripe_customer_id = ${customerId}
  `
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  await sql`
    UPDATE subscriptions 
    SET status = 'cancelled',
        plan_type = 'free',
        updated_at = CURRENT_TIMESTAMP
    WHERE stripe_customer_id = ${customerId}
  `
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const subscriptionId = invoice.subscription as string

  // Find user
  const [subscription] = await sql`
    SELECT user_id FROM subscriptions WHERE stripe_customer_id = ${customerId} LIMIT 1
  `

  if (!subscription) return

  // Record payment
  await sql`
    INSERT INTO payments (user_id, subscription_id, amount, currency, status, stripe_payment_intent_id)
    VALUES (${subscription.user_id}, 
            (SELECT id FROM subscriptions WHERE stripe_customer_id = ${customerId}),
            ${(invoice.amount_paid || 0) / 100}, 
            ${invoice.currency}, 
            'succeeded', 
            ${invoice.payment_intent as string})
  `
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  // Find user
  const [subscription] = await sql`
    SELECT user_id FROM subscriptions WHERE stripe_customer_id = ${customerId} LIMIT 1
  `

  if (!subscription) return

  // Record failed payment
  await sql`
    INSERT INTO payments (user_id, subscription_id, amount, currency, status, stripe_payment_intent_id)
    VALUES (${subscription.user_id}, 
            (SELECT id FROM subscriptions WHERE stripe_customer_id = ${customerId}),
            ${(invoice.amount_due || 0) / 100}, 
            ${invoice.currency}, 
            'failed', 
            ${invoice.payment_intent as string})
  `

  // Update subscription status
  await sql`
    UPDATE subscriptions 
    SET status = 'past_due',
        updated_at = CURRENT_TIMESTAMP
    WHERE stripe_customer_id = ${customerId}
  `
}

async function handleOneTimePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const customerId = paymentIntent.customer as string
  if (!customerId) return

  // Find user
  const [subscription] = await sql`
    SELECT user_id FROM subscriptions WHERE stripe_customer_id = ${customerId} LIMIT 1
  `

  if (!subscription) return

  // Record one-time payment
  await sql`
    INSERT INTO payments (user_id, amount, currency, status, stripe_payment_intent_id, payment_method)
    VALUES (${subscription.user_id}, 
            ${paymentIntent.amount / 100}, 
            ${paymentIntent.currency}, 
            'succeeded', 
            ${paymentIntent.id},
            'one_time')
  `

  // Update any related appointments
  await sql`
    UPDATE appointments 
    SET payment_status = 'paid'
    WHERE user_id = ${subscription.user_id} 
      AND payment_status = 'pending'
      AND cost = ${paymentIntent.amount / 100}
  `
}
