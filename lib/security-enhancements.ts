import crypto from "crypto"
import type { NextRequest } from "next/server"

export class EnhancedSecurity {
  private static requestSignatures = new Map<string, number>()

  static generateRequestSignature(payload: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(payload).digest("hex")
  }

  static verifyRequestSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = this.generateRequestSignature(payload, secret)
    return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))
  }

  static detectAdvancedBots(req: NextRequest): boolean {
    const userAgent = req.headers.get("user-agent") || ""
    const acceptHeader = req.headers.get("accept") || ""
    const acceptLanguage = req.headers.get("accept-language") || ""

    // Check for missing common browser headers
    if (!acceptHeader.includes("text/html") && !acceptHeader.includes("application/json")) {
      return true
    }

    // Check for suspicious user agent patterns
    const botPatterns = [/headless/i, /phantom/i, /selenium/i, /webdriver/i, /automation/i]

    return botPatterns.some((pattern) => pattern.test(userAgent))
  }

  static generateRequestFingerprint(req: NextRequest): string {
    const components = [
      req.headers.get("user-agent") || "",
      req.headers.get("accept") || "",
      req.headers.get("accept-language") || "",
      req.headers.get("accept-encoding") || "",
      req.ip || req.headers.get("x-forwarded-for") || "",
    ]

    return crypto.createHash("sha256").update(components.join("|")).digest("hex").substring(0, 16)
  }

  static detectAnomalies(fingerprint: string): boolean {
    const now = Date.now()
    const existing = this.requestSignatures.get(fingerprint) || 0

    // Flag if same fingerprint appears too frequently
    if (now - existing < 1000) {
      // Less than 1 second apart
      return true
    }

    this.requestSignatures.set(fingerprint, now)

    // Cleanup old entries
    if (this.requestSignatures.size > 10000) {
      const cutoff = now - 60000 // 1 minute ago
      for (const [key, timestamp] of this.requestSignatures.entries()) {
        if (timestamp < cutoff) {
          this.requestSignatures.delete(key)
        }
      }
    }

    return false
  }
}
