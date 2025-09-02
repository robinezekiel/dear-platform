import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test("should allow user to sign up", async ({ page }) => {
    await page.goto("/signup")

    // Fill out signup form
    await page.fill('[data-testid="name-input"]', "Test User")
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await page.fill('[data-testid="confirm-password-input"]', "password123")

    // Submit form
    await page.click('[data-testid="signup-button"]')

    // Should redirect to onboarding
    await expect(page).toHaveURL("/onboarding")
    await expect(page.locator("h1")).toContainText("Welcome to DEAR")
  })

  test("should allow user to log in", async ({ page }) => {
    await page.goto("/login")

    // Fill out login form
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")

    // Submit form
    await page.click('[data-testid="login-button"]')

    // Should redirect to dashboard
    await expect(page).toHaveURL("/dashboard")
    await expect(page.locator("h1")).toContainText("Welcome back")
  })

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login")

    // Fill out login form with invalid credentials
    await page.fill('[data-testid="email-input"]', "invalid@example.com")
    await page.fill('[data-testid="password-input"]', "wrongpassword")

    // Submit form
    await page.click('[data-testid="login-button"]')

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText("Invalid credentials")
  })

  test("should protect authenticated routes", async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto("/dashboard")

    // Should redirect to login
    await expect(page).toHaveURL("/login")
  })
})
