"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Target, Trophy, Zap } from "lucide-react"

interface Affirmation {
  id: string
  text: string
  category: "identity" | "progress" | "resilience" | "achievement"
  personalizedFor: string[]
  emotionalTone: "empowering" | "celebrating" | "motivating" | "reassuring"
}

export function AIAffirmationEngine() {
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null)
  const [userIdentity, setUserIdentity] = useState({
    primaryGoal: "transformation",
    currentStreak: 7,
    recentAchievements: ["workout_completed", "healthy_meal", "meditation"],
    emotionalState: "motivated",
  })

  const generatePersonalizedAffirmation = async () => {
    // AI-generated affirmations based on user data
    const affirmations: Affirmation[] = [
      {
        id: "1",
        text: "You are becoming the resilient, powerful version of yourself you've always envisioned. Every choice you make today strengthens this transformation.",
        category: "identity",
        personalizedFor: ["transformation", "resilience"],
        emotionalTone: "empowering",
      },
      {
        id: "2",
        text: "Your 7-day streak shows incredible dedication. You are proving to yourself that you are someone who follows through on commitments.",
        category: "progress",
        personalizedFor: ["consistency", "achievement"],
        emotionalTone: "celebrating",
      },
      {
        id: "3",
        text: "You are an athlete in training, a healer in progress, a warrior of wellness. Your body and mind are becoming stronger with each passing day.",
        category: "identity",
        personalizedFor: ["fitness", "wellness"],
        emotionalTone: "motivating",
      },
    ]

    // AI would select based on user's current state, goals, and emotional needs
    const selectedAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
    setCurrentAffirmation(selectedAffirmation)
  }

  useEffect(() => {
    generatePersonalizedAffirmation()
    // Refresh affirmations periodically
    const interval = setInterval(generatePersonalizedAffirmation, 30000)
    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "identity":
        return <Sparkles className="h-5 w-5" />
      case "progress":
        return <Target className="h-5 w-5" />
      case "achievement":
        return <Trophy className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "identity":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "achievement":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  }

  if (!currentAffirmation) return null

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${getCategoryColor(currentAffirmation.category)}`}>
            {getCategoryIcon(currentAffirmation.category)}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                AI-Personalized for You
              </Badge>
              <Badge className={getCategoryColor(currentAffirmation.category)}>{currentAffirmation.category}</Badge>
            </div>

            <p className="text-lg font-medium text-gray-800 leading-relaxed">{currentAffirmation.text}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>Tailored to your {userIdentity.primaryGoal} journey</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={generatePersonalizedAffirmation}
                className="text-emerald-600 hover:text-emerald-700"
              >
                New Affirmation
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
