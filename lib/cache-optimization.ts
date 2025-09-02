export class AdvancedCache {
  private static instance: AdvancedCache
  private cache = new Map<string, { data: any; timestamp: number; ttl: number; hits: number }>()

  static getInstance(): AdvancedCache {
    if (!AdvancedCache.instance) {
      AdvancedCache.instance = new AdvancedCache()
    }
    return AdvancedCache.instance
  }

  set(key: string, data: any, ttlMinutes = 60): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
      hits: 0,
    })

    // Auto-cleanup when cache gets too large
    if (this.cache.size > 10000) {
      this.evictLeastUsed()
    }
  }

  get(key: string): any | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return null
    }

    cached.hits++
    return cached.data
  }

  private evictLeastUsed(): void {
    const entries = Array.from(this.cache.entries())
    entries.sort((a, b) => a[1].hits - b[1].hits)

    // Remove bottom 20% of least used entries
    const toRemove = Math.floor(entries.length * 0.2)
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0])
    }
  }

  async warmCache(keys: string[], dataFetcher: (key: string) => Promise<any>): Promise<void> {
    const promises = keys.map(async (key) => {
      if (!this.get(key)) {
        const data = await dataFetcher(key)
        this.set(key, data, 120) // 2 hour cache for warmed data
      }
    })
    await Promise.all(promises)
  }
}
