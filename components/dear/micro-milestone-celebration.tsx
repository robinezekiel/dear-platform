"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Heart, Star, Flame, TrendingUp, Award, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MicroMilestone {
  id: string
  title: string
  description: string
  type: "streak" | "improvement" | "consistency" | "breakthrough" | "social"
  xpReward: number
  celebrationLevel: "small" | "medium" | "large"
  detectedAt: Date
  isNew: boolean
}

export function MicroMilestoneCelebration() {
  const [milestones, setMilestones] = useState<MicroMilestone[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentCelebration, setCurrentCelebration] = useState<MicroMilestone | null>(null)

  // Simulate AI detection of micro-milestones
  useEffect(() => {
    const detectMilestones = () => {
      const newMilestones: MicroMilestone[] = [
        {
          id: "1",
          title: "5th Consecutive Workout! 🔥",
          description: "AI detected consistent exercise pattern - you're building unstoppable momentum!",
          type: "streak",
          xpReward: 50,
          celebrationLevel: "medium",
          detectedAt: new Date(),
          isNew: true,
        },
        {
          id: "2",
          title: "Skin Texture Improved 2%",
          description: "Visual analysis shows measurable improvement in skin quality!",
          type: "improvement",
          xpReward: 25,
          celebrationLevel: "small",
          detectedAt: new Date(Date.now() - 1000 * 60 * 30),
          isNew: true,
        },
        {
          id: "3",
          title: "Craving Successfully Navigated",
          description: "You chose a healthy snack over junk food - mental resilience growing!",
          type: "breakthrough",
          xpReward: 75,
          celebrationLevel: "large",
          detectedAt: new Date(Date.now() - 1000 * 60 * 60),
          isNew: false,
        },
      ]

      setMilestones(newMilestones)

      // Show celebration for new milestones
      const newMilestone = newMilestones.find((m) => m.isNew)
      if (newMilestone) {
        setCurrentCelebration(newMilestone)
        setShowCelebration(true)

        // Auto-hide after celebration
        setTimeout(() => {
          setShowCelebration(false)
          setMilestones((prev) => prev.map((m) => ({ ...m, isNew: false })))
        }, 5000)
      }
    }

    detectMilestones()

    // Simulate periodic milestone detection
    const interval = setInterval(detectMilestones, 60000)
    return () => clearInterval(interval)
  }, [])

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case "streak":
        return <Flame className="h-6 w-6" />
      case "improvement":
        return <TrendingUp className="h-6 w-6" />
      case "consistency":
        return <Target className="h-6 w-6" />
      case "breakthrough":
        return <Zap className="h-6 w-6" />
      case "social":
        return <Heart className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case "streak":
        return "from-orange-400 to-red-500"
      case "improvement":
        return "from-green-400 to-emerald-500"
      case "consistency":
        return "from-blue-400 to-indigo-500"
      case "breakthrough":
        return "from-purple-400 to-pink-500"
      case "social":
        return "from-pink-400 to-rose-500"
      default:
        return "from-yellow-400 to-orange-500"
    }
  }

  return (
    <>
      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebration && currentCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <Card
              className={`bg-gradient-to-r ${getMilestoneColor(currentCelebration.type)} text-white shadow-2xl border-0`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">{getMilestoneIcon(currentCelebration.type)}</div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{currentCelebration.title}</h3>
                    <p className="text-white/90 text-sm mb-2">{currentCelebration.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 text-white border-white/30">
                        +{currentCelebration.xpReward} XP
                      </Badge>
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone History */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-600" />
          Recent Achievements
        </h3>

        {milestones.map((milestone) => (
          <Card key={milestone.id} className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${getMilestoneColor(milestone.type)} text-white`}>
                    {getMilestoneIcon(milestone.type)}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant="secondary">+{milestone.xpReward} XP</Badge>
                  <p className="text-xs text-gray-500 mt-1">{milestone.detectedAt.toLocaleTimeString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
