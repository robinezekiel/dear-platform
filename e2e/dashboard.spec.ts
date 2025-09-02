import { test, expect } from "@playwright/test"

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto("/login")
    await page.fill('[data-testid="email-input"]', "test@example.com")
    await page.fill('[data-testid="password-input"]', "password123")
    await page.click('[data-testid="login-button"]')
    await expect(page).toHaveURL("/dashboard")
  })

  test("should display user dashboard", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Welcome back")
    await expect(page.locator('[data-testid="daily-plan"]')).toBeVisible()
    await expect(page.locator('[data-testid="health-stats"]')).toBeVisible()
    await expect(page.locator('[data-testid="transformation-preview"]')).toBeVisible()
  })

  test("should allow toggling daily plan items", async ({ page }) => {
    const firstPlanItem = page.locator('[data-testid="plan-item"]').first()
    const checkbox = firstPlanItem.locator('input[type="checkbox"]')

    // Toggle the checkbox
    await checkbox.click()

    // Verify the item is marked as completed
    await expect(checkbox).toBeChecked()
  })

  test("should navigate to different sections", async ({ page }) => {
    // Test navigation to transformation page
    await page.click('[data-testid="view-progress-button"]')
    await expect(page).toHaveURL("/transformation")

    // Go back to dashboard
    await page.goto("/dashboard")

    // Test navigation to community
    await page.click("text=Community")
    await expect(page).toHaveURL("/community")
  })

  test("should display AI insights", async ({ page }) => {
    await expect(page.locator('[data-testid="ai-insights"]')).toBeVisible()
    await expect(page.locator('[data-testid="ai-insights"]')).toContainText("AI Insights")
  })

  test("should show upcoming appointments", async ({ page }) => {
    await expect(page.locator('[data-testid="upcoming-appointments"]')).toBeVisible()

    // Check if appointment details are displayed
    const appointmentCard = page.locator('[data-testid="appointment-card"]').first()
    await expect(appointmentCard).toContainText("Dr.")
    await expect(appointmentCard).toContainText("PM")
  })
})
