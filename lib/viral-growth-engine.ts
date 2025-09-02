import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ViralCoefficient {
  userId: string
  invitesSent: number
  signupsGenerated: number
  coefficient: number
  timeframe: "daily" | "weekly" | "monthly"
  lastCalculated: Date
}

export interface ShareableReport {
  id: string
  userId: string
  type: "transformation" | "achievement" | "milestone" | "challenge"
  title: string
  visualData: {
    beforeImage?: string
    afterImage?: string
    progressChart: any
    statsOverlay: { metric: string; value: string; change: string }[]
  }
  shareText: string
  hashtags: string[]
  platforms: string[]
  engagementPrediction: number
  viralPotential: "low" | "medium" | "high" | "viral"
}

export interface ViralCampaign {
  id: string
  name: string
  type: "referral_boost" | "challenge" | "ugc" | "milestone_celebration"
  targetAudience: string[]
  triggers: string[]
  rewards: { type: string; value: any }[]
  duration: number
  expectedReach: number
  actualReach: number
  conversionRate: number
  isActive: boolean
}

export class ViralGrowthEngine {
  private static instance: ViralGrowthEngine
  private viralCoefficients = new Map<string, ViralCoefficient>()
  private activeCampaigns = new Map<string, ViralCampaign>()

  private constructor() {
    this.initializeDefaultCampaigns()
  }

  public static getInstance(): ViralGrowthEngine {
    if (!ViralGrowthEngine.instance) {
      ViralGrowthEngine.instance = new ViralGrowthEngine()
    }
    return ViralGrowthEngine.instance
  }

  private initializeDefaultCampaigns() {
    const defaultCampaigns: ViralCampaign[] = [
      {
        id: "transformation-share-boost",
        name: "Transformation Share Boost",
        type: "ugc",
        targetAudience: ["active_users", "recent_transformers"],
        triggers: ["significant_progress", "milestone_reached", "before_after_uploaded"],
        rewards: [
          { type: "xp", value: 200 },
          { type: "premium_feature", value: "advanced_analytics" },
          { type: "social_boost", value: "featured_post" },
        ],
        duration: 30,
        expectedReach: 10000,
        actualReach: 0,
        conversionRate: 0.15,
        isActive: true,
      },
      {
        id: "referral-multiplier",
        name: "Referral Multiplier Campaign",
        type: "referral_boost",
        targetAudience: ["high_engagers", "social_connectors"],
        triggers: ["friend_joins", "achievement_unlock", "level_up"],
        rewards: [
          { type: "xp_multiplier", value: 2.0 },
          { type: "exclusive_badge", value: "viral_champion" },
          { type: "revenue_share", value: 0.1 },
        ],
        duration: 60,
        expectedReach: 50000,
        actualReach: 0,
        conversionRate: 0.08,
        isActive: true,
      },
    ]

    defaultCampaigns.forEach((campaign) => {
      this.activeCampaigns.set(campaign.id, campaign)
    })
  }

  // Generate shareable transformation reports
  async generateShareableReport(userId: string, transformationData: any): Promise<ShareableReport> {
    try {
      const reportId = `report_${userId}_${Date.now()}`

      // AI-powered content generation for maximum shareability
      const shareText = await this.generateViralShareText(transformationData)
      const hashtags = await this.generateOptimalHashtags(transformationData)

      // Calculate engagement prediction
      const engagementPrediction = await this.predictEngagement(shareText, transformationData, hashtags)

      // Create visual data overlay
      const visualData = {
        beforeImage: transformationData.beforeImage,
        afterImage: transformationData.afterImage,
        progressChart: this.generateProgressChart(transformationData.metrics),
        statsOverlay: [
          {
            metric: "Days",
            value: transformationData.duration.toString(),
            change: "Transformation Period",
          },
          {
            metric: "Progress",
            value: `${transformationData.progressPercentage}%`,
            change: `+${transformationData.progressPercentage}%`,
          },
          {
            metric: "Goals Achieved",
            value: transformationData.goalsAchieved.toString(),
            change: `${transformationData.goalsAchieved}/${transformationData.totalGoals}`,
          },
        ],
      }

      const report: ShareableReport = {
        id: reportId,
        userId,
        type: "transformation",
        title: `${transformationData.duration}-Day Transformation Results`,
        visualData,
        shareText,
        hashtags,
        platforms: ["facebook", "instagram", "twitter", "linkedin"],
        engagementPrediction,
        viralPotential: this.calculateViralPotential(engagementPrediction, transformationData),
      }

      // Store report for tracking
      await this.storeShareableReport(report)

      return report
    } catch (error) {
      console.error("Error generating shareable report:", error)
      throw error
    }
  }

  // AI-powered viral content generation
  private async generateViralShareText(transformationData: any): Promise<string> {
    const prompt = `Create a highly engaging, viral social media post for a health transformation. 

Transformation details:
- Duration: ${transformationData.duration} days
- Progress: ${transformationData.progressPercentage}% of goals achieved
- Key achievements: ${transformationData.achievements?.join(", ") || "Significant progress"}
- Transformation type: ${transformationData.type || "Health & Wellness"}

Requirements:
- 150-200 characters for maximum engagement
- Include emotional hooks and social proof
- Use power words and action verbs
- Include call-to-action for others to join
- Mention @DEARHealth naturally
- Use emojis strategically (2-3 max)
- Create FOMO and inspiration

Generate 3 variations and return the most viral one.`

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    })

    return response.choices[0]?.message?.content || this.getDefaultShareText(transformationData)
  }

  private async generateOptimalHashtags(transformationData: any): Promise<string[]> {
    const baseHashtags = ["DEARHealth", "Transformation", "HealthJourney"]
    const typeSpecificHashtags = {
      fitness: ["FitnessTransformation", "GetFit", "HealthyLifestyle"],
      weight_loss: ["WeightLossJourney", "HealthyWeightLoss", "TransformationTuesday"],
      mental_health: ["MentalHealthMatters", "SelfCare", "MindfulLiving"],
      nutrition: ["HealthyEating", "NutritionGoals", "WellnessJourney"],
    }

    const trendingHashtags = await this.getTrendingHashtags()
    const specificHashtags = typeSpecificHashtags[transformationData.type as keyof typeof typeSpecificHashtags] || []

    return [...baseHashtags, ...specificHashtags, ...trendingHashtags].slice(0, 8)
  }

  private async predictEngagement(shareText: string, transformationData: any, hashtags: string[]): Promise<number> {
    let score = 50 // Base score

    // Content quality factors
    if (shareText.includes("transformation") || shareText.includes("journey")) score += 15
    if (shareText.match(/[💪🔥✨🎉]/u)) score += 10
    if (shareText.length >= 150 && shareText.length <= 200) score += 12
    if (transformationData.beforeImage && transformationData.afterImage) score += 20

    // Hashtag optimization
    if (hashtags.length >= 5 && hashtags.length <= 8) score += 8
    if (hashtags.includes("DEARHealth")) score += 5

    // User factors
    if (transformationData.progressPercentage > 80) score += 15
    if (transformationData.duration >= 30) score += 10

    // Timing factors (would be enhanced with real-time data)
    const hour = new Date().getHours()
    if (hour >= 18 && hour <= 21) score += 8 // Peak engagement hours

    return Math.min(100, score)
  }

  private calculateViralPotential(
    engagementPrediction: number,
    transformationData: any,
  ): "low" | "medium" | "high" | "viral" {
    let viralScore = engagementPrediction

    // Boost for dramatic transformations
    if (transformationData.progressPercentage > 90) viralScore += 10
    if (transformationData.beforeImage && transformationData.afterImage) viralScore += 15
    if (transformationData.achievements?.length > 5) viralScore += 8

    if (viralScore >= 90) return "viral"
    if (viralScore >= 75) return "high"
    if (viralScore >= 60) return "medium"
    return "low"
  }

  // Viral coefficient calculation and tracking
  async calculateViralCoefficient(
    userId: string,
    timeframe: "daily" | "weekly" | "monthly" = "weekly",
  ): Promise<ViralCoefficient> {
    try {
      const existingCoefficient = this.viralCoefficients.get(`${userId}_${timeframe}`)
      const now = new Date()

      // Get user's referral data
      const referralData = await this.getUserReferralData(userId, timeframe)

      const coefficient: ViralCoefficient = {
        userId,
        invitesSent: referralData.invitesSent,
        signupsGenerated: referralData.signupsGenerated,
        coefficient: referralData.invitesSent > 0 ? referralData.signupsGenerated / referralData.invitesSent : 0,
        timeframe,
        lastCalculated: now,
      }

      // Cache the coefficient
      this.viralCoefficients.set(`${userId}_${timeframe}`, coefficient)

      // Store in database
      await this.storeViralCoefficient(coefficient)

      return coefficient
    } catch (error) {
      console.error("Error calculating viral coefficient:", error)
      throw error
    }
  }

  // A/B test viral content
  async runViralContentABTest(userId: string, contentVariations: any[]): Promise<any> {
    try {
      const testId = `ab_test_${userId}_${Date.now()}`

      // Create test variations with different elements
      const variations = contentVariations.map((variation, index) => ({
        id: `${testId}_variant_${index}`,
        content: variation,
        engagementPrediction: 0,
        actualEngagement: 0,
        conversionRate: 0,
        sampleSize: 0,
      }))

      // Predict engagement for each variation
      for (const variation of variations) {
        variation.engagementPrediction = await this.predictEngagement(
          variation.content.shareText,
          variation.content.transformationData,
          variation.content.hashtags,
        )
      }

      // Store A/B test
      await this.storeABTest({
        id: testId,
        userId,
        variations,
        status: "running",
        startDate: new Date(),
        duration: 7, // 7 days
      })

      return {
        testId,
        variations: variations.map((v) => ({
          id: v.id,
          engagementPrediction: v.engagementPrediction,
        })),
        recommendedVariation: variations.reduce((best, current) =>
          current.engagementPrediction > best.engagementPrediction ? current : best,
        ),
      }
    } catch (error) {
      console.error("Error running A/B test:", error)
      throw error
    }
  }

  // Automated viral campaign triggers
  async triggerViralCampaign(userId: string, trigger: string, context: any): Promise<void> {
    try {
      // Find matching campaigns
      const matchingCampaigns = Array.from(this.activeCampaigns.values()).filter(
        (campaign) => campaign.isActive && campaign.triggers.includes(trigger),
      )

      for (const campaign of matchingCampaigns) {
        await this.executeCampaignAction(campaign, userId, context)
      }
    } catch (error) {
      console.error("Error triggering viral campaign:", error)
    }
  }

  private async executeCampaignAction(campaign: ViralCampaign, userId: string, context: any): Promise<void> {
    switch (campaign.type) {
      case "ugc":
        await this.promptUserGeneratedContent(userId, campaign, context)
        break
      case "referral_boost":
        await this.activateReferralBoost(userId, campaign, context)
        break
      case "challenge":
        await this.inviteToChallenge(userId, campaign, context)
        break
      case "milestone_celebration":
        await this.celebrateMilestone(userId, campaign, context)
        break
    }

    // Track campaign performance
    await this.trackCampaignEngagement(campaign.id, userId, "triggered")
  }

  private async promptUserGeneratedContent(userId: string, campaign: ViralCampaign, context: any): Promise<void> {
    // Generate personalized UGC prompt
    const ugcPrompt = {
      type: "transformation_share",
      title: "Share Your Amazing Progress! 🎉",
      description: "Your transformation is inspiring! Share it with the community and earn exclusive rewards.",
      rewards: campaign.rewards,
      template: await this.generateShareableReport(userId, context.transformationData),
      urgency: "Limited time: Double XP for shares this week!",
    }

    // Send notification to user
    await this.sendViralPromptNotification(userId, ugcPrompt)
  }

  private async activateReferralBoost(userId: string, campaign: ViralCampaign, context: any): Promise<void> {
    // Activate temporary referral multiplier
    const boostData = {
      userId,
      multiplier: 2.0,
      duration: 7, // 7 days
      campaignId: campaign.id,
      context: context.achievement || context.milestone,
    }

    await this.activateReferralMultiplier(boostData)
  }

  // Growth analytics and insights
  async getViralGrowthAnalytics(timeframe: "daily" | "weekly" | "monthly" = "weekly"): Promise<any> {
    try {
      const analytics = {
        timeframe,
        totalShares: await this.getTotalShares(timeframe),
        viralCoefficient: await this.getAverageViralCoefficient(timeframe),
        topPerformingContent: await this.getTopViralContent(timeframe),
        campaignPerformance: await this.getCampaignPerformance(timeframe),
        userGrowthFromViral: await this.getViralUserGrowth(timeframe),
        revenueFromReferrals: await this.getReferralRevenue(timeframe),
        trends: await this.getViralTrends(timeframe),
      }

      return analytics
    } catch (error) {
      console.error("Error getting viral growth analytics:", error)
      return null
    }
  }

  // Helper methods for external integrations
  private getDefaultShareText(transformationData: any): string {
    return `Just completed my ${transformationData.duration}-day transformation with @DEARHealth! The results speak for themselves 💪 #Transformation #DEARHealth`
  }

  private generateProgressChart(metrics: any): any {
    // Generate chart data for progress visualization
    return {
      type: "line",
      data: metrics.dailyProgress || [],
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Transformation Progress" },
        },
      },
    }
  }

  private async getTrendingHashtags(): Promise<string[]> {
    // In production, this would fetch from social media APIs
    return ["MotivationMonday", "TransformationTuesday", "WellnessWednesday"].slice(0, 2)
  }

  private async getUserReferralData(userId: string, timeframe: string): Promise<any> {
    // Mock data - in production, fetch from database
    return {
      invitesSent: Math.floor(Math.random() * 20) + 5,
      signupsGenerated: Math.floor(Math.random() * 8) + 1,
    }
  }

  private async storeShareableReport(report: ShareableReport): Promise<void> {
    console.log(`[Viral] Storing shareable report: ${report.id}`)
  }

  private async storeViralCoefficient(coefficient: ViralCoefficient): Promise<void> {
    console.log(`[Viral] Storing viral coefficient for user ${coefficient.userId}: ${coefficient.coefficient}`)
  }

  private async storeABTest(testData: any): Promise<void> {
    console.log(`[Viral] Storing A/B test: ${testData.id}`)
  }

  private async sendViralPromptNotification(userId: string, prompt: any): Promise<void> {
    console.log(`[Viral] Sending viral prompt to user ${userId}: ${prompt.title}`)
  }

  private async activateReferralMultiplier(boostData: any): Promise<void> {
    console.log(`[Viral] Activating referral multiplier for user ${boostData.userId}`)
  }

  private async trackCampaignEngagement(campaignId: string, userId: string, action: string): Promise<void> {
    console.log(`[Viral] Tracking campaign engagement: ${campaignId} - ${action}`)
  }

  private async inviteToChallenge(userId: string, campaign: ViralCampaign, context: any): Promise<void> {
    console.log(`[Viral] Inviting user ${userId} to challenge from campaign ${campaign.id}`)
  }

  private async celebrateMilestone(userId: string, campaign: ViralCampaign, context: any): Promise<void> {
    console.log(`[Viral] Celebrating milestone for user ${userId} via campaign ${campaign.id}`)
  }

  // Analytics helper methods
  private async getTotalShares(timeframe: string): Promise<number> {
    return Math.floor(Math.random() * 10000) + 5000
  }

  private async getAverageViralCoefficient(timeframe: string): Promise<number> {
    return Math.random() * 0.5 + 0.1 // 0.1 to 0.6
  }

  private async getTopViralContent(timeframe: string): Promise<any[]> {
    return [
      { id: "1", title: "30-Day Transformation", shares: 1247, engagement: 95 },
      { id: "2", title: "Marathon Achievement", shares: 892, engagement: 88 },
    ]
  }

  private async getCampaignPerformance(timeframe: string): Promise<any[]> {
    return Array.from(this.activeCampaigns.values()).map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      reach: campaign.actualReach,
      conversionRate: campaign.conversionRate,
      roi: Math.random() * 300 + 150, // 150-450% ROI
    }))
  }

  private async getViralUserGrowth(timeframe: string): Promise<number> {
    return Math.floor(Math.random() * 5000) + 2000
  }

  private async getReferralRevenue(timeframe: string): Promise<number> {
    return Math.floor(Math.random() * 50000) + 25000
  }

  private async getViralTrends(timeframe: string): Promise<any> {
    return {
      topHashtags: ["#Transformation", "#DEARHealth", "#HealthJourney"],
      peakShareTimes: ["7:00 PM", "9:00 AM", "12:00 PM"],
      bestPerformingContentTypes: ["transformation", "achievement", "challenge"],
    }
  }
}

export const viralGrowthEngine = ViralGrowthEngine.getInstance()
