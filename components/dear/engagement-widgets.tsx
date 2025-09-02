"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, TrendingUp, Target, Zap, Star } from "lucide-react"

interface EngagementWidgetProps {
  userId: string
}

export function DailyMotivationWidget({ userId }: EngagementWidgetProps) {
  const [motivation, setMotivation] = useState({
    message: "You're doing amazing! Keep up the great work!",
    streak: 12,
    nextMilestone: 15,
    todayCompleted: false,
  })

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-emerald-700">
          <Zap className="h-5 w-5" />
          Daily Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-3">{motivation.message}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-semibold">{motivation.streak} day streak</span>
          </div>
          <Badge variant="secondary">{motivation.nextMilestone - motivation.streak} to milestone</Badge>
        </div>
        {!motivation.todayCompleted && (
          <Button size="sm" className="w-full">
            Complete Today's Goal
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function SocialProofWidget({ userId }: EngagementWidgetProps) {
  const [socialData, setSocialData] = useState({
    activeUsers: 12847,
    todayTransformations: 234,
    communityGrowth: 15.2,
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Community Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active users today</span>
            <span className="font-semibold text-blue-600">{socialData.activeUsers.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Transformations shared</span>
            <span className="font-semibold text-emerald-600">{socialData.todayTransformations}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Community growth</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-600">+{socialData.communityGrowth}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PersonalizedRecommendations({ userId }: EngagementWidgetProps) {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      type: "workout",
      title: "Try High-Intensity Interval Training",
      description: "Based on your progress, HIIT could boost your results by 30%",
      confidence: 92,
      icon: "💪",
    },
    {
      id: 2,
      type: "nutrition",
      title: "Add More Protein to Breakfast",
      description: "Users with similar goals see better results with 25g+ protein",
      confidence: 87,
      icon: "🥚",
    },
    {
      id: 3,
      type: "mindfulness",
      title: "Evening Meditation Session",
      description: "Your stress levels suggest evening meditation would help",
      confidence: 78,
      icon: "🧘",
    },
  ])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-500" />
          Personalized for You
        </CardTitle>
        <CardDescription>AI-powered recommendations based on your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-xl">{rec.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {rec.confidence}% match
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-xs h-6">
                      Try it
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProgressCelebration({ userId }: EngagementWidgetProps) {
  const [celebration, setCelebration] = useState({
    show: true,
    achievement: "7-Day Streak Complete!",
    message: "You've maintained your daily routine for a full week. That's incredible dedication!",
    reward: "50 XP + Consistency Badge",
    nextGoal: "14-day streak",
  })

  if (!celebration.show) return null

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Star className="h-5 w-5" />
          Celebration Time!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-bold text-lg mb-2">{celebration.achievement}</h3>
          <p className="text-sm text-gray-700 mb-3">{celebration.message}</p>
          <Badge className="mb-3">{celebration.reward}</Badge>
          <p className="text-xs text-gray-600 mb-3">Next goal: {celebration.nextGoal}</p>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              Share Achievement
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCelebration({ ...celebration, show: false })}>
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function UrgencyWidget({ userId }: EngagementWidgetProps) {
  const [urgency, setUrgency] = useState({
    type: "streak_risk",
    message: "Don't break your 12-day streak!",
    timeLeft: "4 hours left today",
    action: "Complete today's workout",
  })

  return (
    <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Clock className="h-5 w-5" />
          Don't Miss Out!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="font-semibold text-red-700 mb-2">{urgency.message}</p>
          <p className="text-sm text-gray-600 mb-3">{urgency.timeLeft}</p>
          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
            {urgency.action}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
