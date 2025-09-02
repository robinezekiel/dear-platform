import type { NextRequest } from "next/server"

// Advanced monitoring and analytics system
export class ProductionMonitoring {
  private static instance: ProductionMonitoring
  private metrics: Map<string, any> = new Map()

  static getInstance(): ProductionMonitoring {
    if (!ProductionMonitoring.instance) {
      ProductionMonitoring.instance = new ProductionMonitoring()
    }
    return ProductionMonitoring.instance
  }

  // Track API performance
  async trackAPIPerformance(endpoint: string, duration: number, success: boolean) {
    const key = `api_${endpoint}`
    const existing = this.metrics.get(key) || { calls: 0, totalDuration: 0, errors: 0 }

    this.metrics.set(key, {
      calls: existing.calls + 1,
      totalDuration: existing.totalDuration + duration,
      errors: existing.errors + (success ? 0 : 1),
      avgDuration: (existing.totalDuration + duration) / (existing.calls + 1),
      successRate: ((existing.calls - existing.errors + (success ? 1 : 0)) / (existing.calls + 1)) * 100,
    })
  }

  // Track user engagement
  async trackUserEngagement(userId: string, action: string, metadata?: any) {
    const timestamp = new Date().toISOString()

    // Store in database for analytics
    try {
      // This would connect to your analytics database
      console.log(`[DEAR Analytics] User ${userId} performed ${action}`, { timestamp, metadata })
    } catch (error) {
      console.error("[DEAR Analytics] Failed to track engagement:", error)
    }
  }

  // Track AI model performance
  async trackAIPerformance(model: string, prompt: string, response: string, duration: number) {
    const key = `ai_${model}`
    const existing = this.metrics.get(key) || { calls: 0, totalDuration: 0, totalTokens: 0 }

    const estimatedTokens = (prompt.length + response.length) / 4 // Rough estimate

    this.metrics.set(key, {
      calls: existing.calls + 1,
      totalDuration: existing.totalDuration + duration,
      totalTokens: existing.totalTokens + estimatedTokens,
      avgDuration: (existing.totalDuration + duration) / (existing.calls + 1),
      avgTokensPerCall: (existing.totalTokens + estimatedTokens) / (existing.calls + 1),
    })
  }

  // Get system health metrics
  getSystemHealth() {
    const health = {
      timestamp: new Date().toISOString(),
      apis: {} as any,
      ai: {} as any,
      overall: "healthy",
    }

    // Analyze API health
    for (const [key, metrics] of this.metrics.entries()) {
      if (key.startsWith("api_")) {
        const apiName = key.replace("api_", "")
        health.apis[apiName] = {
          ...metrics,
          status: metrics.successRate > 95 ? "healthy" : metrics.successRate > 80 ? "warning" : "critical",
        }
      } else if (key.startsWith("ai_")) {
        const modelName = key.replace("ai_", "")
        health.ai[modelName] = {
          ...metrics,
          status: metrics.avgDuration < 5000 ? "healthy" : metrics.avgDuration < 10000 ? "warning" : "critical",
        }
      }
    }

    return health
  }
}

// Middleware for automatic performance tracking
export function withMonitoring(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    const start = Date.now()
    const monitor = ProductionMonitoring.getInstance()

    try {
      const result = await handler(req, ...args)
      const duration = Date.now() - start

      await monitor.trackAPIPerformance(req.nextUrl.pathname, duration, true)
      return result
    } catch (error) {
      const duration = Date.now() - start
      await monitor.trackAPIPerformance(req.nextUrl.pathname, duration, false)
      throw error
    }
  }
}
