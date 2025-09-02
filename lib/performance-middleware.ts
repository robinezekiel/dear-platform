import { NextRequest } from "next/server"
import { ProductionMonitoring } from "./monitoring"
import { AdvancedCache } from "./cache-optimization"

export class PerformanceMiddleware {
  private static cache = AdvancedCache.getInstance()
  private static monitor = ProductionMonitoring.getInstance()

  static withPerformanceTracking(handler: Function) {
    return async (req: NextRequest, ...args: any[]) => {
      const startTime = Date.now()
      const endpoint = req.nextUrl.pathname

      try {
        if (req.method === "GET") {
          const cacheKey = `${endpoint}_${req.nextUrl.search}`
          const cached = this.cache.get(cacheKey)

          if (cached) {
            console.log(`[DEAR Cache] Cache hit for ${endpoint}`)
            return new Response(JSON.stringify(cached), {
              headers: {
                "Content-Type": "application/json",
                "X-Cache": "HIT",
              },
            })
          }
        }

        const result = await handler(req, ...args)
        const duration = Date.now() - startTime

        if (req.method === "GET" && result.status === 200) {
          const cacheKey = `${endpoint}_${req.nextUrl.search}`
          const responseData = await result.clone().json()
          this.cache.set(cacheKey, responseData, 5) // 5 minute cache
        }

        await this.monitor.trackAPIPerformance(endpoint, duration, result.status < 400)

        result.headers.set("X-Response-Time", `${duration}ms`)
        result.headers.set("X-Cache", "MISS")

        return result
      } catch (error) {
        const duration = Date.now() - startTime
        await this.monitor.trackAPIPerformance(endpoint, duration, false)
        throw error
      }
    }
  }

  static optimizeRequest(req: NextRequest): NextRequest {
    // Add request optimization logic
    const optimizedHeaders = new Headers(req.headers)

    // Add compression preference
    if (!optimizedHeaders.has("Accept-Encoding")) {
      optimizedHeaders.set("Accept-Encoding", "gzip, deflate, br")
    }

    // Additional optimization logic can be added here
    // For example, setting appropriate cache-control headers

    return new NextRequest(req.url, {
      method: req.method,
      headers: optimizedHeaders,
      body: req.body,
    })
  }
}
