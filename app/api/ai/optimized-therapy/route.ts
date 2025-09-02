import { type NextRequest, NextResponse } from "next/server"
import { AIModelRouter, AICache, PerformanceMonitor } from "@/lib/ai-optimization"
import { ErrorRecovery } from "@/lib/performance-optimization"

export async function POST(request: NextRequest) {
  return ErrorRecovery.withRetry(async () => {
    const { message, userId, sessionId } = await request.json()

    // Generate cache key for similar conversations
    const cacheKey = AICache.generateKey(message, { userId, sessionId })
    const cached = AICache.get(cacheKey)

    if (cached) {
      return NextResponse.json({
        response: cached.response,
        cached: true,
        responseTime: 0,
      })
    }

    const startTime = Date.now()
    const router = AIModelRouter.getInstance()
    const modelConfig = router.getOptimalModel("therapy")

    // Get user context for personalization
    const userContext = await getUserTherapyContext(userId)

    // Optimize prompt for maximum effectiveness
    const optimizedPrompt = router.optimizePrompt(message, { ...userContext, sessionId }, "therapy")

    // Execute with fallback and monitoring
    const result = await router.executeWithFallback(modelConfig.primary, optimizedPrompt)

    const responseTime = Date.now() - startTime

    // Cache successful responses
    AICache.set(cacheKey, { response: result.text }, 30)

    // Log performance metrics
    PerformanceMonitor.logAIRequest(
      modelConfig.primary.modelId,
      responseTime,
      result.usage?.totalTokens || 0,
      (result.usage?.totalTokens || 0) * modelConfig.costPerToken,
    )

    return NextResponse.json({
      response: result.text,
      cached: false,
      responseTime,
      model: modelConfig.primary.modelId,
    })
  })
}

async function getUserTherapyContext(userId: string) {
  // Get user's therapy history, mood patterns, goals
  return {
    recentMoods: ["anxious", "hopeful"],
    goals: ["reduce anxiety", "improve sleep"],
    therapyHistory: "ongoing_support",
    preferredStyle: "gentle_guidance",
  }
}
