import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
// import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"

// AI Models Configuration
export const AI_MODELS = {
  therapy: openai("gpt-4o"), // Best for empathetic conversations
  visual: openai("gpt-4o"), // Best for visual analysis
  insights: openai("gpt-4o-mini"), // Cost-effective for insights
  nutrition: openai("gpt-4o-mini"), // Good for meal planning
} as const

// Therapy AI Service
export class TherapyAI {
  static async generateResponse(
    userMessage: string,
    conversationHistory: Array<{ role: "user" | "assistant"; content: string }>,
    userContext?: {
      mentalHealthGoals?: string[]
      recentMood?: number
      stressLevel?: number
    },
  ) {
    const systemPrompt = `You are DEAR's AI therapy companion, a warm, empathetic, and professionally trained mental health support assistant. Your role is to provide compassionate, evidence-based therapeutic support while maintaining appropriate boundaries.

CORE PRINCIPLES:
- Be warm, empathetic, and non-judgmental
- Use cognitive behavioral therapy (CBT) and mindfulness techniques
- Encourage self-reflection and personal growth
- Always prioritize user safety and well-being
- Recognize when professional help is needed

IMPORTANT BOUNDARIES:
- You are a supportive companion, not a replacement for professional therapy
- In crisis situations, immediately provide crisis resources
- Never diagnose mental health conditions
- Encourage professional help for serious concerns

USER CONTEXT:
${userContext?.mentalHealthGoals ? `Mental Health Goals: ${userContext.mentalHealthGoals.join(", ")}` : ""}
${userContext?.recentMood ? `Recent Mood: ${userContext.recentMood}/10` : ""}
${userContext?.stressLevel ? `Stress Level: ${userContext.stressLevel}/10` : ""}

Respond with empathy, practical guidance, and therapeutic techniques when appropriate.`

    const { text } = await generateText({
      model: AI_MODELS.therapy,
      system: systemPrompt,
      messages: [
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: userMessage },
      ],
      maxTokens: 500,
      temperature: 0.7,
    })

    return text
  }

  static async analyzeSentiment(message: string): Promise<{
    sentiment: "positive" | "negative" | "neutral"
    score: number
    emotions: string[]
    riskLevel: "low" | "medium" | "high"
  }> {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        sentiment: z.enum(["positive", "negative", "neutral"]),
        score: z.number().min(-1).max(1),
        emotions: z.array(z.string()),
        riskLevel: z.enum(["low", "medium", "high"]),
        reasoning: z.string(),
      }),
      prompt: `Analyze the emotional content and mental health risk level of this message: "${message}"
      
      Consider:
      - Overall emotional tone
      - Signs of distress, depression, anxiety
      - Mentions of self-harm or crisis
      - Positive coping mechanisms
      - Support needs
      
      Provide a sentiment score from -1 (very negative) to 1 (very positive).`,
    })

    return object
  }
}

// Visual Analysis AI Service
export class VisualAnalysisAI {
  static async analyzeTransformationPhoto(
    imageUrl: string,
    photoType: "body" | "face" | "hair" | "skin",
    previousAnalysis?: any,
  ) {
    const systemPrompt = `You are DEAR's AI visual analysis expert, specializing in health and wellness transformation tracking. Analyze the provided ${photoType} photo with empathy and scientific accuracy.

ANALYSIS FOCUS:
- ${photoType === "body" ? "Body composition, posture, muscle definition, overall fitness indicators" : ""}
- ${photoType === "face" ? "Skin health, facial structure, signs of wellness or stress" : ""}
- ${photoType === "hair" ? "Hair health, thickness, shine, growth patterns" : ""}
- ${photoType === "skin" ? "Skin texture, clarity, hydration, signs of health" : ""}

IMPORTANT GUIDELINES:
- Be encouraging and supportive in tone
- Focus on health indicators, not appearance judgments
- Provide actionable insights for improvement
- Acknowledge progress when comparing to previous photos
- Maintain body positivity and self-acceptance

${previousAnalysis ? `Previous analysis for comparison: ${JSON.stringify(previousAnalysis)}` : ""}`

    const { object } = await generateObject({
      model: AI_MODELS.visual,
      schema: z.object({
        overallAssessment: z.string(),
        keyObservations: z.array(z.string()),
        healthIndicators: z.object({
          positive: z.array(z.string()),
          areasForImprovement: z.array(z.string()),
        }),
        progressNotes: z.string().optional(),
        recommendations: z.array(z.string()),
        confidenceScore: z.number().min(0).max(1),
        measurements: z
          .object({
            estimatedBodyFat: z.number().optional(),
            muscleMass: z.string().optional(),
            posture: z.string().optional(),
            skinHealth: z.string().optional(),
          })
          .optional(),
      }),
      prompt: `Analyze this ${photoType} transformation photo: ${imageUrl}
      
      Provide a comprehensive but encouraging analysis focusing on health and wellness indicators.`,
    })

    return object
  }

  static async generateProgressPrediction(
    currentAnalysis: any,
    userGoals: string[],
    timeframe: "1_month" | "3_months" | "6_months" | "1_year",
  ) {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        predictedChanges: z.array(z.string()),
        timeline: z.string(),
        keyMilestones: z.array(
          z.object({
            timepoint: z.string(),
            expectedChanges: z.string(),
          }),
        ),
        recommendedActions: z.array(z.string()),
        motivationalMessage: z.string(),
      }),
      prompt: `Based on current analysis: ${JSON.stringify(currentAnalysis)}
      User goals: ${userGoals.join(", ")}
      Timeframe: ${timeframe}
      
      Generate realistic progress predictions and actionable recommendations.`,
    })

    return object
  }
}

// Health Insights AI Service
export class HealthInsightsAI {
  static async generatePersonalizedInsights(userData: {
    healthMetrics: any[]
    moodEntries: any[]
    workouts: any[]
    meals: any[]
    goals: string[]
  }) {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        overallHealthScore: z.number().min(0).max(100),
        keyInsights: z.array(z.string()),
        patterns: z.object({
          positive: z.array(z.string()),
          concerning: z.array(z.string()),
        }),
        recommendations: z.array(
          z.object({
            category: z.string(),
            action: z.string(),
            priority: z.enum(["high", "medium", "low"]),
          }),
        ),
        motivationalMessage: z.string(),
        nextSteps: z.array(z.string()),
      }),
      prompt: `Analyze this user's comprehensive health data and provide personalized insights:
      
      Health Metrics: ${JSON.stringify(userData.healthMetrics.slice(-10))}
      Recent Mood Entries: ${JSON.stringify(userData.moodEntries.slice(-7))}
      Recent Workouts: ${JSON.stringify(userData.workouts.slice(-5))}
      Recent Meals: ${JSON.stringify(userData.meals.slice(-7))}
      Goals: ${userData.goals.join(", ")}
      
      Provide actionable, encouraging insights that help the user progress toward their goals.`,
    })

    return object
  }

  static async generateDailyPlan(userData: {
    profile: any
    recentActivity: any
    goals: string[]
    preferences: any
  }) {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        workoutPlan: z.object({
          type: z.string(),
          duration: z.number(),
          exercises: z.array(z.string()),
          intensity: z.enum(["low", "medium", "high"]),
        }),
        nutritionPlan: z.object({
          calorieTarget: z.number(),
          macros: z.object({
            protein: z.number(),
            carbs: z.number(),
            fat: z.number(),
          }),
          mealSuggestions: z.array(z.string()),
        }),
        mindfulnessPlan: z.object({
          meditationType: z.string(),
          duration: z.number(),
          focus: z.string(),
        }),
        dailyTips: z.array(z.string()),
        motivationalQuote: z.string(),
      }),
      prompt: `Create a personalized daily plan for this user:
      
      Profile: ${JSON.stringify(userData.profile)}
      Recent Activity: ${JSON.stringify(userData.recentActivity)}
      Goals: ${userData.goals.join(", ")}
      Preferences: ${JSON.stringify(userData.preferences)}
      
      Generate a balanced, achievable daily plan that aligns with their goals and current fitness level.`,
    })

    return object
  }
}

// Journal AI Service
export class JournalAI {
  static async generatePrompts(userContext: {
    recentMood?: number
    goals?: string[]
    stressLevel?: number
    recentEntries?: string[]
  }) {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        prompts: z.array(
          z.object({
            category: z.string(),
            prompt: z.string(),
            description: z.string(),
          }),
        ),
      }),
      prompt: `Generate 6 personalized journaling prompts based on this user context:
      
      Recent Mood: ${userContext.recentMood || "Unknown"}/10
      Goals: ${userContext.goals?.join(", ") || "Not specified"}
      Stress Level: ${userContext.stressLevel || "Unknown"}/10
      
      Create prompts that encourage self-reflection, growth, and emotional processing.
      Categories should include: Self-Reflection, Gratitude, Goals, Emotions, Growth, Relationships`,
    })

    return object.prompts
  }

  static async analyzeJournalEntry(content: string) {
    const { object } = await generateObject({
      model: AI_MODELS.insights,
      schema: z.object({
        emotionalTone: z.enum(["very_positive", "positive", "neutral", "negative", "very_negative"]),
        keyThemes: z.array(z.string()),
        insights: z.array(z.string()),
        growthAreas: z.array(z.string()),
        encouragement: z.string(),
        suggestedActions: z.array(z.string()),
      }),
      prompt: `Analyze this journal entry with empathy and provide supportive insights:
      
      "${content}"
      
      Focus on emotional patterns, growth opportunities, and encouraging observations.`,
    })

    return object
  }
}

// Nutrition AI Service
export class NutritionAI {
  static async generateMealPlan(userProfile: {
    goals: string[]
    dietaryRestrictions: string[]
    activityLevel: string
    currentWeight: number
    targetWeight?: number
    preferences?: string[]
  }) {
    const { object } = await generateObject({
      model: AI_MODELS.nutrition,
      schema: z.object({
        dailyCalories: z.number(),
        macroTargets: z.object({
          protein: z.number(),
          carbs: z.number(),
          fat: z.number(),
        }),
        meals: z.array(
          z.object({
            type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
            name: z.string(),
            ingredients: z.array(z.string()),
            calories: z.number(),
            prepTime: z.number(),
            instructions: z.string(),
          }),
        ),
        tips: z.array(z.string()),
        shoppingList: z.array(z.string()),
      }),
      prompt: `Create a personalized daily meal plan for:
      
      Goals: ${userProfile.goals.join(", ")}
      Dietary Restrictions: ${userProfile.dietaryRestrictions.join(", ") || "None"}
      Activity Level: ${userProfile.activityLevel}
      Current Weight: ${userProfile.currentWeight}kg
      Target Weight: ${userProfile.targetWeight || "Not specified"}kg
      
      Generate healthy, balanced meals that align with their goals and restrictions.`,
    })

    return object
  }

  static async analyzeMealPhoto(imageUrl: string) {
    const { object } = await generateObject({
      model: AI_MODELS.visual,
      schema: z.object({
        identifiedFoods: z.array(
          z.object({
            name: z.string(),
            estimatedQuantity: z.string(),
            confidence: z.number(),
          }),
        ),
        estimatedNutrition: z.object({
          calories: z.number(),
          protein: z.number(),
          carbs: z.number(),
          fat: z.number(),
        }),
        healthAssessment: z.string(),
        suggestions: z.array(z.string()),
      }),
      prompt: `Analyze this meal photo and identify the foods and estimated nutrition: ${imageUrl}
      
      Provide constructive feedback and suggestions for improvement.`,
    })

    return object
  }
}
