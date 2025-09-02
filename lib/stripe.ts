import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
})

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  free: {
    name: "DEAR Free",
    price: 0,
    priceId: null,
    features: [
      "Basic health tracking",
      "Limited AI insights",
      "Community access",
      "Basic meal logging",
      "Simple workout tracking",
    ],
    limits: {
      aiChats: 10,
      photoAnalysis: 3,
      providerBookings: 0,
    },
  },
  premium: {
    name: "DEAR Premium",
    price: 29.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      "Everything in Free",
      "Unlimited AI therapy chat",
      "Advanced visual analysis",
      "Personalized meal plans",
      "Custom workout programs",
      "Provider marketplace access",
      "Priority support",
    ],
    limits: {
      aiChats: -1, // unlimited
      photoAnalysis: -1,
      providerBookings: 5,
    },
  },
  pro: {
    name: "DEAR Pro",
    price: 79.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "Everything in Premium",
      "Unlimited provider bookings",
      "Advanced AI insights",
      "Custom transformation plans",
      "1-on-1 coaching sessions",
      "Priority AI analysis",
      "White-glove onboarding",
    ],
    limits: {
      aiChats: -1,
      photoAnalysis: -1,
      providerBookings: -1,
    },
  },
} as const

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS

// Stripe Customer Management
export class StripeService {
  static async createCustomer(userId: string, email: string, name: string) {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    })

    return customer
  }

  static async getCustomer(customerId: string) {
    return await stripe.customers.retrieve(customerId)
  }

  static async createSubscription(customerId: string, priceId: string) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })

    return subscription
  }

  static async updateSubscription(subscriptionId: string, newPriceId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    return await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: "create_prorations",
    })
  }

  static async cancelSubscription(subscriptionId: string, immediately = false) {
    if (immediately) {
      return await stripe.subscriptions.cancel(subscriptionId)
    } else {
      return await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      })
    }
  }

  static async createPaymentIntent(amount: number, currency = "usd", customerId?: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  }

  static async createCustomerPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  }

  static async getPaymentMethods(customerId: string) {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    })

    return paymentMethods
  }

  static async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    return await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })
  }

  static async detachPaymentMethod(paymentMethodId: string) {
    return await stripe.paymentMethods.detach(paymentMethodId)
  }

  static async getInvoices(customerId: string, limit = 10) {
    return await stripe.invoices.list({
      customer: customerId,
      limit,
    })
  }

  static async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"],
    })
  }
}
