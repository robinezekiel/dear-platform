"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Heart, Trophy, Zap } from "lucide-react"

interface IdentityTrait {
  id: string
  name: string
  description: string
  progress: number
  level: "Bronze" | "Silver" | "Gold" | "Platinum"
  affirmations: string[]
  icon: any
}

interface TransformationIdentityEngineProps {
  userId: string
}

export function TransformationIdentityEngine({ userId }: TransformationIdentityEngineProps) {
  const [identityTraits, setIdentityTraits] = useState<IdentityTrait[]>([])
  const [dailyAffirmation, setDailyAffirmation] = useState("")
  const [identityScore, setIdentityScore] = useState(0)
  const [currentIdentity, setCurrentIdentity] = useState("")

  useEffect(() => {
    loadIdentityTraits()
    generateDailyAffirmation()
  }, [userId])

  const loadIdentityTraits = async () => {
    // Mock data - in production, this would come from AI analysis
    const traits: IdentityTrait[] = [
      {
        id: "1",
        name: "Resilient Healer",
        description: "You overcome challenges and heal from within",
        progress: 75,
        level: "Gold",
        affirmations: [
          "I am becoming stronger with every challenge I face",
          "My healing journey inspires others around me",
          "I have the power to transform pain into wisdom",
        ],
        icon: Heart,
      },
      {
        id: "2",
        name: "Zenith Athlete",
        description: "You push physical boundaries and excel in sports",
        progress: 60,
        level: "Silver",
        affirmations: [
          "My body is capable of incredible achievements",
          "Every workout makes me more powerful",
          "I am an athlete in mind, body, and spirit",
        ],
        icon: Trophy,
      },
      {
        id: "3",
        name: "Metamorphosis Master",
        description: "You embrace change and continuous transformation",
        progress: 85,
        level: "Platinum",
        affirmations: [
          "I am constantly evolving into my best self",
          "Change is my superpower",
          "I create my own transformation story",
        ],
        icon: Sparkles,
      },
    ]

    setIdentityTraits(traits)

    // Calculate overall identity score
    const avgProgress = traits.reduce((sum, trait) => sum + trait.progress, 0) / traits.length
    setIdentityScore(avgProgress)

    // Set current dominant identity
    const dominantTrait = traits.reduce((prev, current) => (prev.progress > current.progress ? prev : current))
    setCurrentIdentity(dominantTrait.name)
  }

  const generateDailyAffirmation = async () => {
    // In production, this would be AI-generated based on user's current state
    const affirmations = [
      "Today, I choose to see my potential rather than my limitations",
      "I am worthy of the transformation I'm creating",
      "My journey is unique, and my progress is meaningful",
      "I have everything within me to achieve my goals",
      "Every small step I take is building my new identity",
    ]

    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
    setDailyAffirmation(randomAffirmation)
  }

  const reinforceIdentity = (traitId: string) => {
    setIdentityTraits((prev) =>
      prev.map((trait) => (trait.id === traitId ? { ...trait, progress: Math.min(100, trait.progress + 2) } : trait)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Identity Overview */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            Your Transformation Identity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Identity Strength</span>
                <span className="text-sm text-gray-600">{identityScore.toFixed(0)}%</span>
              </div>
              <Progress value={identityScore} className="h-3" />
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <h3 className="font-semibold text-lg text-emerald-700">You are a {currentIdentity}</h3>
              <p className="text-sm text-gray-600 mt-1">Your dominant transformation identity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Affirmation */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center">Today's Affirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-lg font-medium text-blue-800 mb-4">"{dailyAffirmation}"</p>
            <Button onClick={generateDailyAffirmation} variant="outline" size="sm">
              New Affirmation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Identity Traits */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Identity Traits</h3>
        {identityTraits.map((trait) => {
          const IconComponent = trait.icon
          return (
            <Card key={trait.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{trait.name}</h4>
                        <Badge
                          variant={
                            trait.level === "Platinum"
                              ? "default"
                              : trait.level === "Gold"
                                ? "secondary"
                                : trait.level === "Silver"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {trait.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{trait.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">Progress</span>
                          <span className="text-xs text-gray-600">{trait.progress}%</span>
                        </div>
                        <Progress value={trait.progress} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => reinforceIdentity(trait.id)} size="sm" variant="ghost" className="ml-2">
                    Reinforce
                  </Button>
                </div>

                {/* Affirmations for this trait */}
                <div className="mt-4 pt-4 border-t">
                  <h5 className="text-sm font-medium mb-2">Personal Affirmations:</h5>
                  <div className="space-y-1">
                    {trait.affirmations.slice(0, 2).map((affirmation, index) => (
                      <p key={index} className="text-xs text-gray-600 italic">
                        "• {affirmation}"
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
