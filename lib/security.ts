import crypto from "crypto"
import type { NextRequest } from "next/server"

export class SecurityUtils {
  // Generate secure random tokens
  static generateSecureToken(length = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }

  // Hash sensitive data
  static hashData(data: string, salt?: string): string {
    const actualSalt = salt || crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, "sha512")
    return `${actualSalt}:${hash.toString("hex")}`
  }

  // Verify hashed data
  static verifyHash(data: string, hashedData: string): boolean {
    const [salt, hash] = hashedData.split(":")
    const verifyHash = crypto.pbkdf2Sync(data, salt, 10000, 64, "sha512")
    return hash === verifyHash.toString("hex")
  }

  // Encrypt sensitive data
  static encrypt(text: string, key: string): string {
    const algorithm = "aes-256-gcm"
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(algorithm, key)

    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")

    const authTag = cipher.getAuthTag()

    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`
  }

  // Decrypt sensitive data
  static decrypt(encryptedData: string, key: string): string {
    const algorithm = "aes-256-gcm"
    const [ivHex, authTagHex, encrypted] = encryptedData.split(":")

    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")

    const decipher = crypto.createDecipher(algorithm, key)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  }

  // Validate request origin
  static validateOrigin(req: NextRequest, allowedOrigins: string[]): boolean {
    const origin = req.headers.get("origin")
    if (!origin) return false

    return allowedOrigins.includes(origin)
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    return this.generateSecureToken(32)
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken
  }

  // Sanitize SQL inputs (additional layer)
  static sanitizeSQL(input: string): string {
    return input.replace(/['";\\]/g, "")
  }

  // Check for suspicious patterns
  static detectSuspiciousActivity(req: NextRequest): boolean {
    const userAgent = req.headers.get("user-agent") || ""
    const suspiciousPatterns = [/bot/i, /crawler/i, /spider/i, /scraper/i, /hack/i, /exploit/i]

    return suspiciousPatterns.some((pattern) => pattern.test(userAgent))
  }

  // Generate secure session ID
  static generateSessionId(): string {
    return this.generateSecureToken(64)
  }
}

// Security headers for production
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}
