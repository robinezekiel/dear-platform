"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Award, Activity, BarChart3, Sparkles } from "lucide-react"

interface SkillNode {
  id: string
  name: string
  category: "fitness" | "mental" | "nutrition" | "sports"
  level: number
  maxLevel: number
  xp: number
  xpToNext: number
  unlocked: boolean
  prerequisites: string[]
  description: string
}

interface ProgressMetric {
  id: string
  name: string
  current: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  change: number
  category: string
}

interface DynamicProgressVisualizerProps {
  userId: string
}

export function DynamicProgressVisualizer({ userId }: DynamicProgressVisualizerProps) {
  const [skillTree, setSkillTree] = useState<SkillNode[]>([])
  const [progressMetrics, setProgressMetrics] = useState<ProgressMetric[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [animationTrigger, setAnimationTrigger] = useState(0)

  useEffect(() => {
    loadSkillTree()
    loadProgressMetrics()
  }, [userId])

  const loadSkillTree = async () => {
    // Mock skill tree data - in production, this would be AI-generated based on user goals
    const skills: SkillNode[] = [
      {
        id: "1",
        name: "Strength Foundation",
        category: "fitness",
        level: 3,
        maxLevel: 10,
        xp: 750,
        xpToNext: 250,
        unlocked: true,
        prerequisites: [],
        description: "Build fundamental strength through compound movements",
      },
      {
        id: "2",
        name: "Cardio Endurance",
        category: "fitness",
        level: 2,
        maxLevel: 10,
        xp: 400,
        xpToNext: 600,
        unlocked: true,
        prerequisites: [],
        description: "Develop cardiovascular fitness and stamina",
      },
      {
        id: "3",
        name: "Advanced Lifting",
        category: "fitness",
        level: 0,
        maxLevel: 10,
        xp: 0,
        xpToNext: 1000,
        unlocked: false,
        prerequisites: ["1"],
        description: "Master advanced weightlifting techniques",
      },
      {
        id: "4",
        name: "Mindfulness Practice",
        category: "mental",
        level: 4,
        maxLevel: 10,
        xp: 1200,
        xpToNext: 800,
        unlocked: true,
        prerequisites: [],
        description: "Develop mental clarity and emotional regulation",
      },
      {
        id: "5",
        name: "Stress Management",
        category: "mental",
        level: 2,
        maxLevel: 10,
        xp: 600,
        xpToNext: 400,
        unlocked: true,
        prerequisites: ["4"],
        description: "Learn effective stress coping strategies",
      },
      {
        id: "6",
        name: "Nutrition Basics",
        category: "nutrition",
        level: 3,
        maxLevel: 10,
        xp: 900,
        xpToNext: 100,
        unlocked: true,
        prerequisites: [],
        description: "Understand macronutrients and meal planning",
      },
    ]

    setSkillTree(skills)
  }

  const loadProgressMetrics = async () => {
    // Mock progress metrics - in production, this would come from user data
    const metrics: ProgressMetric[] = [
      {
        id: "1",
        name: "Body Fat %",
        current: 18.5,
        target: 15.0,
        unit: "%",
        trend: "down",
        change: -2.1,
        category: "Body Composition",
      },
      {
        id: "2",
        name: "Muscle Mass",
        current: 68.2,
        target: 72.0,
        unit: "kg",
        trend: "up",
        change: 3.4,
        category: "Body Composition",
      },
      {
        id: "3",
        name: "VO2 Max",
        current: 42,
        target: 50,
        unit: "ml/kg/min",
        trend: "up",
        change: 5,
        category: "Cardiovascular",
      },
      {
        id: "4",
        name: "Bench Press",
        current: 85,
        target: 100,
        unit: "kg",
        trend: "up",
        change: 10,
        category: "Strength",
      },
      {
        id: "5",
        name: "Meditation Streak",
        current: 21,
        target: 30,
        unit: "days",
        trend: "up",
        change: 21,
        category: "Mental Health",
      },
    ]

    setProgressMetrics(metrics)
  }

  const levelUpSkill = (skillId: string) => {
    setSkillTree((prev) =>
      prev.map((skill) => {
        if (skill.id === skillId && skill.xp >= skill.xpToNext) {
          const newLevel = skill.level + 1
          return {
            ...skill,
            level: newLevel,
            xp: 0,
            xpToNext: newLevel * 1000, // Exponential XP requirement
          }
        }
        return skill
      }),
    )

    // Trigger celebration animation
    setAnimationTrigger((prev) => prev + 1)
  }

  const getSkillColor = (category: string) => {
    switch (category) {
      case "fitness":
        return "bg-red-100 text-red-700 border-red-200"
      case "mental":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "nutrition":
        return "bg-green-100 text-green-700 border-green-200"
      case "sports":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredSkills =
    selectedCategory === "all" ? skillTree : skillTree.filter((skill) => skill.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Dynamic Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressMetrics.map((metric) => (
              <div key={metric.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{metric.name}</h4>
                  {getTrendIcon(metric.trend)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {metric.current}
                      {metric.unit}
                    </span>
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}
                      {metric.unit}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>
                        Target: {metric.target}
                        {metric.unit}
                      </span>
                      <span>{metric.category}</span>
                    </div>
                    <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Tree */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Interactive Skill Tree
            </CardTitle>

            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "fitness" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("fitness")}
              >
                Fitness
              </Button>
              <Button
                variant={selectedCategory === "mental" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("mental")}
              >
                Mental
              </Button>
              <Button
                variant={selectedCategory === "nutrition" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("nutrition")}
              >
                Nutrition
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <Card
                key={skill.id}
                className={`transition-all duration-300 hover:shadow-lg ${
                  skill.unlocked ? "opacity-100" : "opacity-60"
                } ${getSkillColor(skill.category)}`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{skill.name}</h4>
                      <Badge variant="outline">
                        Lv. {skill.level}/{skill.maxLevel}
                      </Badge>
                    </div>

                    <p className="text-sm opacity-80">{skill.description}</p>

                    {skill.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>XP: {skill.xp}</span>
                          <span>Next: {skill.xpToNext}</span>
                        </div>
                        <Progress value={(skill.xp / (skill.xp + skill.xpToNext)) * 100} className="h-2" />

                        {skill.xp >= skill.xpToNext && (
                          <Button onClick={() => levelUpSkill(skill.id)} size="sm" className="w-full">
                            <Award className="h-4 w-4 mr-1" />
                            Level Up!
                          </Button>
                        )}
                      </div>
                    )}

                    {!skill.unlocked && (
                      <div className="text-xs opacity-60">
                        <p>Prerequisites: {skill.prerequisites.join(", ") || "None"}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3D Body Visualization Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            3D Body Transformation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Interactive 3D Model</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Your personalized 3D body model will show real-time transformations based on your progress data and AI
                analysis.
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
