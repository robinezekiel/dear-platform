import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ModerationResult {
  id: string
  contentId: string
  contentType: "text" | "image" | "video" | "audio"
  action: "approve" | "flag" | "block" | "escalate"
  confidence: number
  reasons: string[]
  severity: "low" | "medium" | "high" | "critical"
  categories: {
    harassment: number
    hate_speech: number
    self_harm: number
    sexual_content: number
    violence: number
    misinformation: number
    spam: number
    privacy_violation: number
  }
  contextualFactors: {
    isHealthRelated: boolean
    isSupportiveContent: boolean
    isPersonalExperience: boolean
    requiresExpertReview: boolean
  }
  suggestedActions: string[]
  timestamp: Date
}

export interface ContentAnalysis {
  sentiment: "positive" | "negative" | "neutral" | "mixed"
  toxicity: number
  topics: string[]
  medicalClaims: string[]
  personalInfo: string[]
  supportiveLanguage: boolean
  triggerWarnings: string[]
}

export interface ModerationRule {
  id: string
  name: string
  category: string
  severity: "low" | "medium" | "high" | "critical"
  conditions: any[]
  action: "approve" | "flag" | "block" | "escalate"
  contextExceptions: string[]
  isActive: boolean
}

export interface AppealRequest {
  id: string
  userId: string
  contentId: string
  moderationId: string
  reason: string
  status: "pending" | "approved" | "denied" | "escalated"
  reviewedBy?: string
  reviewNotes?: string
  timestamp: Date
}

export class ContentModerationAI {
  private static instance: ContentModerationAI
  private moderationRules: Map<string, ModerationRule> = new Map()
  private pendingAppeals: Map<string, AppealRequest> = new Map()

  private constructor() {
    this.initializeModerationRules()
  }

  public static getInstance(): ContentModerationAI {
    if (!ContentModerationAI.instance) {
      ContentModerationAI.instance = new ContentModerationAI()
    }
    return ContentModerationAI.instance
  }

  private initializeModerationRules() {
    const defaultRules: ModerationRule[] = [
      {
        id: "health_misinformation",
        name: "Health Misinformation Detection",
        category: "misinformation",
        severity: "high",
        conditions: [
          { type: "medical_claim", threshold: 0.8 },
          { type: "unverified_treatment", threshold: 0.7 },
        ],
        action: "escalate",
        contextExceptions: ["personal_experience", "question_asking"],
        isActive: true,
      },
      {
        id: "self_harm_content",
        name: "Self-Harm Content Detection",
        category: "self_harm",
        severity: "critical",
        conditions: [{ type: "self_harm_language", threshold: 0.6 }],
        action: "escalate",
        contextExceptions: ["recovery_story", "seeking_help"],
        isActive: true,
      },
      {
        id: "harassment_detection",
        name: "Harassment and Bullying",
        category: "harassment",
        severity: "high",
        conditions: [
          { type: "personal_attack", threshold: 0.7 },
          { type: "targeted_harassment", threshold: 0.8 },
        ],
        action: "block",
        contextExceptions: [],
        isActive: true,
      },
      {
        id: "privacy_violation",
        name: "Privacy Information Sharing",
        category: "privacy_violation",
        severity: "medium",
        conditions: [
          { type: "personal_info", threshold: 0.8 },
          { type: "contact_sharing", threshold: 0.9 },
        ],
        action: "flag",
        contextExceptions: ["consent_given"],
        isActive: true,
      },
      {
        id: "spam_detection",
        name: "Spam and Promotional Content",
        category: "spam",
        severity: "low",
        conditions: [
          { type: "promotional_language", threshold: 0.8 },
          { type: "external_links", threshold: 0.9 },
        ],
        action: "flag",
        contextExceptions: ["verified_expert", "educational_content"],
        isActive: true,
      },
    ]

    defaultRules.forEach((rule) => {
      this.moderationRules.set(rule.id, rule)
    })
  }

  // Main moderation function
  async moderateContent(
    contentId: string,
    content: string,
    contentType: "text" | "image" | "video" | "audio",
    userId: string,
    context?: any,
  ): Promise<ModerationResult> {
    try {
      const moderationId = `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Analyze content
      const analysis = await this.analyzeContent(content, contentType, context)

      // Apply moderation rules
      const ruleResults = await this.applyModerationRules(analysis, context)

      // Calculate overall risk score
      const riskScore = this.calculateRiskScore(analysis, ruleResults)

      // Determine action based on risk score and rules
      const action = this.determineAction(riskScore, ruleResults, analysis)

      // Create moderation result
      const result: ModerationResult = {
        id: moderationId,
        contentId,
        contentType,
        action,
        confidence: riskScore.confidence,
        reasons: ruleResults.triggeredReasons,
        severity: this.determineSeverity(riskScore.score),
        categories: {
          harassment: analysis.toxicity * 0.8,
          hate_speech: riskScore.categories.hate_speech || 0,
          self_harm: riskScore.categories.self_harm || 0,
          sexual_content: riskScore.categories.sexual_content || 0,
          violence: riskScore.categories.violence || 0,
          misinformation: riskScore.categories.misinformation || 0,
          spam: riskScore.categories.spam || 0,
          privacy_violation: riskScore.categories.privacy_violation || 0,
        },
        contextualFactors: {
          isHealthRelated: analysis.topics.some((topic) =>
            ["health", "medical", "wellness", "fitness", "nutrition", "mental-health"].includes(topic),
          ),
          isSupportiveContent: analysis.supportiveLanguage,
          isPersonalExperience: this.detectPersonalExperience(content),
          requiresExpertReview: this.requiresExpertReview(analysis),
        },
        suggestedActions: this.generateSuggestedActions(action, analysis, riskScore),
        timestamp: new Date(),
      }

      // Store moderation result
      await this.storeModerationResult(result)

      // Handle escalation if needed
      if (action === "escalate") {
        await this.escalateToHumanModerator(result, userId)
      }

      // Send notifications if content is blocked
      if (action === "block") {
        await this.notifyUserOfModeration(userId, result)
      }

      return result
    } catch (error) {
      console.error("Content moderation error:", error)
      throw error
    }
  }

  // AI-powered content analysis
  private async analyzeContent(content: string, contentType: string, context?: any): Promise<ContentAnalysis> {
    try {
      // Use OpenAI for comprehensive content analysis
      const prompt = `Analyze the following ${contentType} content for moderation purposes in a health and wellness platform context:

Content: "${content}"

Please provide analysis for:
1. Sentiment (positive/negative/neutral/mixed)
2. Toxicity level (0-1 scale)
3. Main topics/themes
4. Any medical claims or health advice
5. Personal information that might need protection
6. Whether the language is supportive/encouraging
7. Any trigger warnings needed
8. Context: This is from a health transformation platform where users share personal journeys

Respond in JSON format with the analysis.`

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.1,
      })

      const analysisText = response.choices[0]?.message?.content || "{}"

      try {
        const parsedAnalysis = JSON.parse(analysisText)

        return {
          sentiment: parsedAnalysis.sentiment || "neutral",
          toxicity: Math.min(Math.max(parsedAnalysis.toxicity || 0, 0), 1),
          topics: parsedAnalysis.topics || [],
          medicalClaims: parsedAnalysis.medicalClaims || [],
          personalInfo: parsedAnalysis.personalInfo || [],
          supportiveLanguage: parsedAnalysis.supportiveLanguage || false,
          triggerWarnings: parsedAnalysis.triggerWarnings || [],
        }
      } catch (parseError) {
        // Fallback analysis if JSON parsing fails
        return this.fallbackAnalysis(content)
      }
    } catch (error) {
      console.error("Content analysis error:", error)
      return this.fallbackAnalysis(content)
    }
  }

  private fallbackAnalysis(content: string): ContentAnalysis {
    // Simple fallback analysis using keyword detection
    const toxicKeywords = ["hate", "stupid", "idiot", "kill", "die", "hurt"]
    const supportiveKeywords = ["support", "encourage", "proud", "amazing", "inspire", "help"]
    const medicalKeywords = ["cure", "treatment", "medicine", "doctor", "diagnosis"]

    const toxicity = toxicKeywords.some((keyword) => content.toLowerCase().includes(keyword)) ? 0.7 : 0.1

    const supportiveLanguage = supportiveKeywords.some((keyword) => content.toLowerCase().includes(keyword))

    const medicalClaims = medicalKeywords.filter((keyword) => content.toLowerCase().includes(keyword))

    return {
      sentiment: toxicity > 0.5 ? "negative" : supportiveLanguage ? "positive" : "neutral",
      toxicity,
      topics: ["general"],
      medicalClaims,
      personalInfo: [],
      supportiveLanguage,
      triggerWarnings: [],
    }
  }

  private async applyModerationRules(analysis: ContentAnalysis, context?: any): Promise<any> {
    const triggeredRules: string[] = []
    const triggeredReasons: string[] = []
    const categories: Record<string, number> = {}

    for (const rule of this.moderationRules.values()) {
      if (!rule.isActive) continue

      let ruleTriggered = false

      for (const condition of rule.conditions) {
        const score = this.evaluateCondition(condition, analysis, context)

        if (score >= condition.threshold) {
          // Check for context exceptions
          const hasException = rule.contextExceptions.some((exception) =>
            this.checkContextException(exception, analysis, context),
          )

          if (!hasException) {
            ruleTriggered = true
            categories[rule.category] = Math.max(categories[rule.category] || 0, score)
            break
          }
        }
      }

      if (ruleTriggered) {
        triggeredRules.push(rule.id)
        triggeredReasons.push(rule.name)
      }
    }

    return {
      triggeredRules,
      triggeredReasons,
      categories,
    }
  }

  private evaluateCondition(condition: any, analysis: ContentAnalysis, context?: any): number {
    switch (condition.type) {
      case "toxicity":
        return analysis.toxicity

      case "medical_claim":
        return analysis.medicalClaims.length > 0 ? 0.8 : 0.1

      case "self_harm_language":
        return analysis.triggerWarnings.some((warning) => warning.includes("self-harm")) ? 0.9 : 0.1

      case "personal_attack":
        return analysis.sentiment === "negative" && analysis.toxicity > 0.6 ? 0.8 : 0.2

      case "personal_info":
        return analysis.personalInfo.length > 0 ? 0.9 : 0.1

      case "promotional_language":
        // Simple heuristic for promotional content
        const promotionalWords = ["buy", "sale", "discount", "offer", "click here", "visit"]
        const content = context?.content || ""
        const promotionalScore = promotionalWords.filter((word) => content.toLowerCase().includes(word)).length / 10
        return Math.min(promotionalScore, 1)

      default:
        return 0
    }
  }

  private checkContextException(exception: string, analysis: ContentAnalysis, context?: any): boolean {
    switch (exception) {
      case "personal_experience":
        return this.detectPersonalExperience(context?.content || "")

      case "recovery_story":
        return analysis.topics.includes("recovery") || analysis.supportiveLanguage

      case "seeking_help":
        const helpKeywords = ["help", "support", "advice", "guidance"]
        return helpKeywords.some((keyword) => (context?.content || "").toLowerCase().includes(keyword))

      case "educational_content":
        return context?.isEducational || false

      case "verified_expert":
        return context?.userRole === "expert" || context?.isVerified || false

      default:
        return false
    }
  }

  private calculateRiskScore(analysis: ContentAnalysis, ruleResults: any): any {
    let baseScore = analysis.toxicity * 0.4

    // Add rule-based scores
    const ruleScore = Object.values(ruleResults.categories).reduce((sum: number, score: any) => sum + score, 0) / 10

    // Adjust for context
    if (analysis.supportiveLanguage) baseScore *= 0.5
    if (analysis.sentiment === "positive") baseScore *= 0.7

    const finalScore = Math.min(baseScore + ruleScore, 1)

    return {
      score: finalScore,
      confidence: finalScore > 0.7 ? 0.9 : finalScore > 0.4 ? 0.7 : 0.5,
      categories: ruleResults.categories,
    }
  }

  private determineAction(riskScore: any, ruleResults: any, analysis: ContentAnalysis): ModerationResult["action"] {
    // Critical issues always escalate
    if (
      ruleResults.triggeredRules.some((ruleId: string) => this.moderationRules.get(ruleId)?.severity === "critical")
    ) {
      return "escalate"
    }

    // High risk content
    if (riskScore.score > 0.8) {
      return "block"
    }

    // Medium risk content
    if (riskScore.score > 0.5) {
      return "flag"
    }

    // Health-related content with medical claims needs expert review
    if (analysis.medicalClaims.length > 0 && !analysis.supportiveLanguage) {
      return "escalate"
    }

    return "approve"
  }

  private determineSeverity(score: number): ModerationResult["severity"] {
    if (score > 0.8) return "critical"
    if (score > 0.6) return "high"
    if (score > 0.3) return "medium"
    return "low"
  }

  private detectPersonalExperience(content: string): boolean {
    const personalIndicators = ["my", "i", "me", "my experience", "i feel", "i think", "personally"]
    return personalIndicators.some((indicator) => content.toLowerCase().includes(indicator))
  }

  private requiresExpertReview(analysis: ContentAnalysis): boolean {
    return (
      analysis.medicalClaims.length > 2 ||
      analysis.topics.some((topic) => ["medical", "diagnosis", "treatment"].includes(topic)) ||
      analysis.triggerWarnings.length > 0
    )
  }

  private generateSuggestedActions(
    action: ModerationResult["action"],
    analysis: ContentAnalysis,
    riskScore: any,
  ): string[] {
    const suggestions: string[] = []

    switch (action) {
      case "block":
        suggestions.push("Content blocked due to policy violation")
        suggestions.push("Notify user with specific reasons")
        suggestions.push("Offer appeal process")
        break

      case "flag":
        suggestions.push("Flag for human review")
        suggestions.push("Allow content with warning label")
        suggestions.push("Monitor user for pattern behavior")
        break

      case "escalate":
        suggestions.push("Escalate to expert moderator")
        suggestions.push("Require medical professional review")
        suggestions.push("Temporarily hold content pending review")
        break

      case "approve":
        suggestions.push("Content approved for publication")
        if (analysis.supportiveLanguage) {
          suggestions.push("Consider featuring as positive content")
        }
        break
    }

    return suggestions
  }

  // Appeal system
  async submitAppeal(userId: string, contentId: string, moderationId: string, reason: string): Promise<AppealRequest> {
    const appealId = `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const appeal: AppealRequest = {
      id: appealId,
      userId,
      contentId,
      moderationId,
      reason,
      status: "pending",
      timestamp: new Date(),
    }

    this.pendingAppeals.set(appealId, appeal)
    await this.storeAppealRequest(appeal)

    // Notify moderation team
    await this.notifyModerationTeam("new_appeal", appeal)

    return appeal
  }

  async reviewAppeal(
    appealId: string,
    reviewerId: string,
    decision: "approved" | "denied",
    notes?: string,
  ): Promise<void> {
    const appeal = this.pendingAppeals.get(appealId)
    if (!appeal) throw new Error("Appeal not found")

    appeal.status = decision
    appeal.reviewedBy = reviewerId
    appeal.reviewNotes = notes

    await this.storeAppealRequest(appeal)

    // Notify user of decision
    await this.notifyUserOfAppealDecision(appeal.userId, appeal, decision)

    // If approved, restore content
    if (decision === "approved") {
      await this.restoreContent(appeal.contentId)
    }
  }

  // Batch moderation for efficiency
  async moderateContentBatch(contentItems: any[]): Promise<ModerationResult[]> {
    const results: ModerationResult[] = []

    // Process in parallel with rate limiting
    const batchSize = 5
    for (let i = 0; i < contentItems.length; i += batchSize) {
      const batch = contentItems.slice(i, i + batchSize)
      const batchPromises = batch.map((item) =>
        this.moderateContent(item.id, item.content, item.type, item.userId, item.context),
      )

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Small delay to avoid rate limiting
      if (i + batchSize < contentItems.length) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    return results
  }

  // Analytics and reporting
  async getModerationAnalytics(timeframe: "daily" | "weekly" | "monthly" = "weekly"): Promise<any> {
    return {
      totalContentModerated: await this.getTotalContentModerated(timeframe),
      actionBreakdown: await this.getActionBreakdown(timeframe),
      categoryBreakdown: await this.getCategoryBreakdown(timeframe),
      falsePositiveRate: await this.getFalsePositiveRate(timeframe),
      appealStats: await this.getAppealStats(timeframe),
      topViolationReasons: await this.getTopViolationReasons(timeframe),
      moderatorWorkload: await this.getModeratorWorkload(timeframe),
    }
  }

  // Helper methods for external integrations
  private async storeModerationResult(result: ModerationResult): Promise<void> {
    console.log(`[Moderation] Storing result: ${result.id} - ${result.action}`)
  }

  private async storeAppealRequest(appeal: AppealRequest): Promise<void> {
    console.log(`[Moderation] Storing appeal: ${appeal.id}`)
  }

  private async escalateToHumanModerator(result: ModerationResult, userId: string): Promise<void> {
    console.log(`[Moderation] Escalating to human moderator: ${result.id}`)
  }

  private async notifyUserOfModeration(userId: string, result: ModerationResult): Promise<void> {
    console.log(`[Moderation] Notifying user ${userId} of moderation action: ${result.action}`)
  }

  private async notifyModerationTeam(type: string, data: any): Promise<void> {
    console.log(`[Moderation] Notifying moderation team: ${type}`)
  }

  private async notifyUserOfAppealDecision(userId: string, appeal: AppealRequest, decision: string): Promise<void> {
    console.log(`[Moderation] Notifying user ${userId} of appeal decision: ${decision}`)
  }

  private async restoreContent(contentId: string): Promise<void> {
    console.log(`[Moderation] Restoring content: ${contentId}`)
  }

  // Analytics helper methods
  private async getTotalContentModerated(timeframe: string): Promise<number> {
    return Math.floor(Math.random() * 10000) + 5000
  }

  private async getActionBreakdown(timeframe: string): Promise<any> {
    return {
      approve: 85,
      flag: 10,
      block: 4,
      escalate: 1,
    }
  }

  private async getCategoryBreakdown(timeframe: string): Promise<any> {
    return {
      spam: 40,
      harassment: 25,
      misinformation: 20,
      privacy_violation: 10,
      self_harm: 3,
      hate_speech: 2,
    }
  }

  private async getFalsePositiveRate(timeframe: string): Promise<number> {
    return 0.05 // 5% false positive rate
  }

  private async getAppealStats(timeframe: string): Promise<any> {
    return {
      totalAppeals: 45,
      approved: 12,
      denied: 28,
      pending: 5,
    }
  }

  private async getTopViolationReasons(timeframe: string): Promise<string[]> {
    return ["Promotional content", "Off-topic discussion", "Unverified medical claims", "Personal information sharing"]
  }

  private async getModeratorWorkload(timeframe: string): Promise<any> {
    return {
      averageReviewTime: "3.2 minutes",
      totalReviews: 234,
      escalatedCases: 12,
    }
  }
}

export const contentModerationAI = ContentModerationAI.getInstance()
