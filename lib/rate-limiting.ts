import type { NextRequest } from "next/server"
import { RateLimitError } from "./error-handling"

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyGenerator?: (req: NextRequest) => string
}

class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()

  async checkLimit(req: NextRequest, config: RateLimitConfig): Promise<void> {
    const key = config.keyGenerator ? config.keyGenerator(req) : this.getClientIP(req)
    const now = Date.now()

    const clientData = this.requests.get(key)

    if (!clientData || now > clientData.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return
    }

    if (clientData.count >= config.maxRequests) {
      throw new RateLimitError(
        `Rate limit exceeded. Try again in ${Math.ceil((clientData.resetTime - now) / 1000)} seconds`,
      )
    }

    clientData.count++
  }

  private getClientIP(req: NextRequest): string {
    const forwarded = req.headers.get("x-forwarded-for")
    const realIP = req.headers.get("x-real-ip")

    if (forwarded) {
      return forwarded.split(",")[0].trim()
    }

    if (realIP) {
      return realIP
    }

    return "unknown"
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, data] of this.requests.entries()) {
      if (now > data.resetTime) {
        this.requests.delete(key)
      }
    }
  }
}

export const rateLimiter = new RateLimiter()

// Predefined rate limit configurations
export const rateLimitConfigs = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  api: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  ai: { windowMs: 60 * 1000, maxRequests: 20 }, // 20 AI requests per minute
  upload: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 uploads per minute
  payment: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 payment requests per minute
}

export async function rateLimit(req: NextRequest, configName: keyof typeof rateLimitConfigs): Promise<void> {
  const config = rateLimitConfigs[configName]
  await rateLimiter.checkLimit(req, config)
}

// Clean up old entries every 5 minutes
setInterval(
  () => {
    rateLimiter.cleanup()
  },
  5 * 60 * 1000,
)
