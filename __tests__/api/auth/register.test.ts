import { POST } from "@/app/api/auth/register/route"
import { NextRequest } from "next/server"
import jest from "jest"

// Mock the auth module
jest.mock("@/lib/auth", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashed-password"),
  generateJWT: jest.fn().mockResolvedValue("jwt-token"),
}))

// Mock the database
jest.mock("@/lib/database", () => ({
  query: jest.fn(),
}))

describe("/api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should register a new user successfully", async () => {
    const { query } = require("@/lib/database")
    query.mockResolvedValueOnce({ rows: [] }) // No existing user
    query.mockResolvedValueOnce({
      rows: [
        {
          id: "user123",
          email: "test@example.com",
          name: "Test User",
          role: "member",
        },
      ],
    }) // Insert user

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.user.email).toBe("test@example.com")
    expect(data.token).toBe("jwt-token")
  })

  it("should reject registration with existing email", async () => {
    const { query } = require("@/lib/database")
    query.mockResolvedValueOnce({
      rows: [{ id: "existing-user", email: "test@example.com" }],
    })

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain("already exists")
  })

  it("should reject invalid input", async () => {
    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "T", // Too short
        email: "invalid-email",
        password: "123", // Too short
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("Invalid input")
    expect(data.details).toBeDefined()
  })
})
