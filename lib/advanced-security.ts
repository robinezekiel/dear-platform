import type { NextRequest } from "next/server"
import { rateLimit } from "./rate-limit"

// Advanced security measures
export class SecurityManager {
  private static suspiciousIPs = new Set<string>()
  private static requestCounts = new Map<string, number>()

  // Advanced rate limiting with IP tracking
  static async checkRateLimit(req: NextRequest, endpoint: string): Promise<boolean> {
    const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown"

    // Check if IP is flagged as suspicious
    if (this.suspiciousIPs.has(ip)) {
      return false
    }

    // Apply different rate limits based on endpoint sensitivity
    const limits = {
      "/api/auth/login": { requests: 5, window: 15 * 60 * 1000 }, // 5 per 15 minutes
      "/api/ai/": { requests: 100, window: 60 * 60 * 1000 }, // 100 per hour
      "/api/payments/": { requests: 10, window: 60 * 60 * 1000 }, // 10 per hour
      default: { requests: 1000, window: 60 * 60 * 1000 }, // 1000 per hour
    }

    const limit = limits[endpoint as keyof typeof limits] || limits.default
    return await rateLimit(ip, limit.requests, limit.window)
  }

  // Detect and flag suspicious activity
  static flagSuspiciousActivity(ip: string, reason: string) {
    console.log(`[DEAR Security] Flagging IP ${ip} for: ${reason}`)
    this.suspiciousIPs.add(ip)

    // Auto-remove after 24 hours
    setTimeout(
      () => {
        this.suspiciousIPs.delete(ip)
      },
      24 * 60 * 60 * 1000,
    )
  }

  // Validate request integrity
  static validateRequest(req: NextRequest): boolean {
    // Check for common attack patterns
    const userAgent = req.headers.get("user-agent") || ""
    const referer = req.headers.get("referer") || ""

    // Block obvious bots and scrapers
    const suspiciousPatterns = [/bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i, /python/i]

    if (suspiciousPatterns.some((pattern) => pattern.test(userAgent))) {
      return false
    }

    return true
  }
}
