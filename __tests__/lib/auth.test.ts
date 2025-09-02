import { hashPassword, verifyPassword, generateJWT, verifyJWT } from "@/lib/auth"

describe("Auth Utils", () => {
  describe("Password Hashing", () => {
    it("should hash password correctly", async () => {
      const password = "testpassword123"
      const hashedPassword = await hashPassword(password)

      expect(hashedPassword).toBeDefined()
      expect(hashedPassword).not.toBe(password)
      expect(hashedPassword.length).toBeGreaterThan(50)
    })

    it("should verify password correctly", async () => {
      const password = "testpassword123"
      const hashedPassword = await hashPassword(password)

      const isValid = await verifyPassword(password, hashedPassword)
      expect(isValid).toBe(true)

      const isInvalid = await verifyPassword("wrongpassword", hashedPassword)
      expect(isInvalid).toBe(false)
    })
  })

  describe("JWT Operations", () => {
    const testPayload = {
      id: "user123",
      email: "test@example.com",
      role: "member" as const,
    }

    it("should generate and verify JWT correctly", async () => {
      const token = await generateJWT(testPayload)
      expect(token).toBeDefined()
      expect(typeof token).toBe("string")

      const decoded = await verifyJWT(token)
      expect(decoded).toMatchObject(testPayload)
    })

    it("should reject invalid JWT", async () => {
      const invalidToken = "invalid.jwt.token"

      await expect(verifyJWT(invalidToken)).rejects.toThrow()
    })

    it("should reject expired JWT", async () => {
      // Create token with very short expiry
      const shortLivedToken = await generateJWT(testPayload, "1ms")

      // Wait for token to expire
      await new Promise((resolve) => setTimeout(resolve, 10))

      await expect(verifyJWT(shortLivedToken)).rejects.toThrow()
    })
  })
})
