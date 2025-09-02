"use client"

import "@testing-library/jest-dom"
import { jest } from "@jest/globals"
import { beforeEach } from "@jest/globals"

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return "/"
  },
}))

// Mock environment variables
process.env.JWT_SECRET = "test-secret"
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test"
process.env.EMAIL_API_KEY = "test-email-key"
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"

// Mock fetch globally
global.fetch = jest.fn()

// Setup and teardown
beforeEach(() => {
  jest.clearAllMocks()
})
