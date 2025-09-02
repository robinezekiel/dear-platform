"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, Zap, RefreshCw } from "lucide-react"

interface AdvancedInsight {
  type: "prediction" | "pattern" | "optimization" | "risk"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  actionable: boolean
  recommendations: string[]
}

interface AdvancedAIInsightsProps {
  userId: string
  className?: string
}

export function AdvancedAIInsights({ userId, className }: AdvancedAIInsightsProps) {
  const [insights, setInsights] = useState<AdvancedInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("predictions")

  useEffect(() => {
    fetchAdvancedInsights()
  }, [userId])

  const fetchAdvancedInsights = async () => {
    try {
      setLoading(true)
      // This would fetch real advanced AI insights
      const mockInsights: AdvancedInsight[] = [
        {
          type: "prediction",
          title: "Weight Goal Achievement",
          description: "Based on current patterns, you'll reach your target weight 2 weeks ahead of schedule",
          confidence: 0.87,
          impact: "high",
          actionable: true,
          recommendations: [
            "Maintain current workout intensity",
            "Consider adding 10% more protein to meals",
            "Schedule progress photos weekly",
          ],
        },
        {
          type: "pattern",
          title: "Sleep-Mood Correlation",
          description: "Strong correlation detected between sleep quality and next-day mood scores",
          confidence: 0.92,
          impact: "high",
          actionable: true,
          recommendations: [
            "Prioritize 7-8 hours of sleep nightly",
            "Establish consistent bedtime routine",
            "Limit screen time 1 hour before bed",
          ],
        },
        {
          type: "optimization",
          title: "Workout Timing Optimization",
          description: "Your performance is 23% higher during morning workouts vs evening",
          confidence: 0.78,
          impact: "medium",
          actionable: true,
          recommendations: [
            "Schedule high-intensity workouts for mornings",
            "Use evenings for recovery activities",
            "Adjust meal timing to support morning energy",
          ],
        },
        {
          type: "risk",
          title: "Burnout Risk Detection",
          description: "Elevated stress patterns suggest potential burnout risk in 3-4 weeks",
          confidence: 0.65,
          impact: "high",
          actionable: true,
          recommendations: [
            "Incorporate more rest days",
            "Practice stress management techniques",
            "Consider reducing workout intensity temporarily",
          ],
        },
      ]
      setInsights(mockInsights)
    } catch (error) {
      console.error("[v0] Failed to fetch advanced insights:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "pattern":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "optimization":
        return <Zap className="h-5 w-5 text-yellow-500" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterInsightsByType = (type: string) => {
    switch (type) {
      case "predictions":
        return insights.filter((i) => i.type === "prediction")
      case "patterns":
        return insights.filter((i) => i.type === "pattern")
      case "optimizations":
        return insights.filter((i) => i.type === "optimization")
      case "risks":
        return insights.filter((i) => i.type === "risk")
      default:
        return insights
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Advanced AI Insights
            </CardTitle>
            <CardDescription>Predictive analytics and pattern recognition for your health journey</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAdvancedInsights} className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="optimizations">Optimize</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filterInsightsByType(activeTab).map((insight, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm">{insight.title}</h4>
                          <Badge className={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                          {insight.actionable && <Badge variant="outline">Actionable</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>

                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Confidence</span>
                            <span>{Math.round(insight.confidence * 100)}%</span>
                          </div>
                          <Progress value={insight.confidence * 100} className="h-2" />
                        </div>

                        {insight.recommendations.length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground mb-2">Recommendations:</h5>
                            <ul className="space-y-1">
                              {insight.recommendations.map((rec, recIndex) => (
                                <li key={recIndex} className="flex items-start gap-2 text-xs">
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filterInsightsByType(activeTab).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeTab} insights available yet.</p>
                  <p className="text-sm">Keep using DEAR to generate more personalized insights!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
