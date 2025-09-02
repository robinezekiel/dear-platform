"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Target, Zap, Star, TrendingUp } from "lucide-react"

interface IdentityTransformationProps {
  userId: string
}

export function IdentityTransformationWidget({ userId }: IdentityTransformationProps) {
  const [identity, setIdentity] = useState({
    current: "Wellness Seeker",
    target: "Wellness Warrior",
    progress: 73,
    traits: [
      { name: "Consistent", achieved: true, description: "Maintains daily routines" },
      { name: "Athletic", achieved: true, description: "Excels in sports performance" },
      { name: "Resilient", achieved: false, description: "Overcomes challenges with grace" },
      { name: "Leader", achieved: false, description: "Inspires others in their journey" },
    ],
    nextMilestone: "Complete 30-day challenge streak",
    affirmation: "I am becoming stronger, more disciplined, and more confident every day.",
  })

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Crown className="h-5 w-5" />
          Your Transformation Identity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Identity Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              {identity.current}
            </Badge>
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <Badge className="bg-purple-600">{identity.target}</Badge>
          </div>
          <Progress value={identity.progress} className="mb-2" />
          <p className="text-sm text-purple-600">{identity.progress}% transformed</p>
        </div>

        {/* Identity Traits */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Identity Traits</h4>
          <div className="grid grid-cols-2 gap-2">
            {identity.traits.map((trait, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-center ${
                  trait.achieved ? "bg-emerald-100 border border-emerald-200" : "bg-gray-100 border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {trait.achieved ? (
                    <Star className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <Target className="h-3 w-3 text-gray-400" />
                  )}
                  <span className={`text-xs font-medium ${trait.achieved ? "text-emerald-700" : "text-gray-600"}`}>
                    {trait.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Affirmation */}
        <div className="bg-white/50 p-3 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-purple-700">Today's Affirmation</h4>
          <p className="text-sm text-purple-600 italic">"{identity.affirmation}"</p>
        </div>

        {/* Next Milestone */}
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2">Next milestone:</p>
          <p className="text-sm font-medium text-purple-700">{identity.nextMilestone}</p>
          <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
            <Zap className="h-3 w-3 mr-1" />
            Take Action
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
