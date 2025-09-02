import { validateInput, sanitizeInput } from "@/lib/validation"

describe("Validation Utils", () => {
  describe("Input Validation", () => {
    const userSchema = {
      type: "object",
      properties: {
        name: { type: "string", minLength: 2, maxLength: 50 },
        email: { type: "string", format: "email" },
        age: { type: "number", minimum: 13, maximum: 120 },
      },
      required: ["name", "email"],
      additionalProperties: false,
    }

    it("should validate correct input", () => {
      const validInput = {
        name: "John Doe",
        email: "john@example.com",
        age: 25,
      }

      const result = validateInput(validInput, userSchema)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it("should reject invalid input", () => {
      const invalidInput = {
        name: "J", // Too short
        email: "invalid-email", // Invalid format
        age: 150, // Too high
        extra: "not allowed", // Additional property
      }

      const result = validateInput(invalidInput, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it("should reject missing required fields", () => {
      const incompleteInput = {
        age: 25,
      }

      const result = validateInput(incompleteInput, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.some((error) => error.includes("name"))).toBe(true)
      expect(result.errors.some((error) => error.includes("email"))).toBe(true)
    })
  })

  describe("Input Sanitization", () => {
    it("should sanitize HTML content", () => {
      const maliciousInput = '<script>alert("xss")</script><p>Safe content</p>'
      const sanitized = sanitizeInput(maliciousInput)

      expect(sanitized).not.toContain("<script>")
      expect(sanitized).not.toContain("alert")
      expect(sanitized).toContain("Safe content")
    })

    it("should preserve safe HTML tags", () => {
      const safeInput = "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>"
      const sanitized = sanitizeInput(safeInput)

      expect(sanitized).toContain("<p>")
      expect(sanitized).toContain("<strong>")
      expect(sanitized).toContain("<em>")
    })

    it("should handle non-string input", () => {
      expect(sanitizeInput(null)).toBe("")
      expect(sanitizeInput(undefined)).toBe("")
      expect(sanitizeInput(123)).toBe("123")
      expect(sanitizeInput({})).toBe("[object Object]")
    })
  })
})
