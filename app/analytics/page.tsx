"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ResponsiveContainer } from "@/components/dear/responsive-container"
import {
  TrendingUp,
  Brain,
  Activity,
  Target,
  Zap,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react"

interface AnalyticsData {
  healthScore: number
  progressTrend: number
  aiInsights: string[]
  predictions: {
    weightLoss: { current: number; predicted: number; timeframe: string }
    muscleGain: { current: number; predicted: number; timeframe: string }
    mentalHealth: { current: number; predicted: number; timeframe: string }
  }
  behaviorPatterns: {
    workoutConsistency: number
    nutritionAdherence: number
    sleepQuality: number
    stressLevels: number
  }
  riskFactors: Array<{ factor: string; risk: "low" | "medium" | "high"; description: string }>
}

export default function AdvancedAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call for analytics data
    setTimeout(() => {
      setAnalyticsData({
        healthScore: 78,
        progressTrend: 12,
        aiInsights: [
          "Your workout consistency has improved 23% this month",
          "Sleep quality correlation with mood shows 89% positive impact",
          "Nutrition timing optimization could boost energy by 15%",
          "Stress management techniques showing measurable cortisol reduction",
        ],
        predictions: {
          weightLoss: { current: 165, predicted: 155, timeframe: "3 months" },
          muscleGain: { current: 125, predicted: 135, timeframe: "4 months" },
          mentalHealth: { current: 7.2, predicted: 8.5, timeframe: "2 months" },
        },
        behaviorPatterns: {
          workoutConsistency: 85,
          nutritionAdherence: 72,
          sleepQuality: 68,
          stressLevels: 45,
        },
        riskFactors: [
          {
            factor: "Cardiovascular Health",
            risk: "low",
            description: "Excellent heart rate variability and blood pressure trends",
          },
          {
            factor: "Metabolic Syndrome",
            risk: "medium",
            description: "Monitor glucose levels and insulin sensitivity",
          },
          { factor: "Mental Health", risk: "low", description: "Strong support network and coping mechanisms" },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <ResponsiveContainer>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Analyzing your health data...</p>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 pb-20 md:pb-6">
      <ResponsiveContainer>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Advanced Analytics</h1>
              <p className="text-muted-foreground">AI-powered insights into your health journey</p>
            </div>
            <Badge variant="secondary" className="w-fit">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>

          {/* Health Score Overview */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Overall Health Score
                </CardTitle>
                <CardDescription>Comprehensive AI analysis of your health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{analyticsData?.healthScore}/100</span>
                    <div className="flex items-center gap-1 text-success">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+{analyticsData?.progressTrend}% this month</span>
                    </div>
                  </div>
                  <Progress value={analyticsData?.healthScore} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Your health score has improved significantly. Keep up the excellent work!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData?.aiInsights.slice(0, 2).map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">{insight}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    View All Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                AI Predictions
              </CardTitle>
              <CardDescription>Machine learning forecasts based on your current progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Weight Goal</span>
                    <Badge variant="outline">3 months</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{analyticsData?.predictions.weightLoss.current} lbs</span>
                    <ArrowDown className="h-4 w-4 text-success" />
                    <span className="text-lg text-success font-medium">
                      {analyticsData?.predictions.weightLoss.predicted} lbs
                    </span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Muscle Mass</span>
                    <Badge variant="outline">4 months</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{analyticsData?.predictions.muscleGain.current} lbs</span>
                    <ArrowUp className="h-4 w-4 text-primary" />
                    <span className="text-lg text-primary font-medium">
                      {analyticsData?.predictions.muscleGain.predicted} lbs
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mental Wellness</span>
                    <Badge variant="outline">2 months</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{analyticsData?.predictions.mentalHealth.current}/10</span>
                    <ArrowUp className="h-4 w-4 text-accent" />
                    <span className="text-lg text-accent font-medium">
                      {analyticsData?.predictions.mentalHealth.predicted}/10
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Behavior Patterns */}
          <Tabs defaultValue="patterns" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patterns">Behavior Patterns</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="patterns" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consistency Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Workout Consistency</span>
                        <span className="font-medium">{analyticsData?.behaviorPatterns.workoutConsistency}%</span>
                      </div>
                      <Progress value={analyticsData?.behaviorPatterns.workoutConsistency} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Nutrition Adherence</span>
                        <span className="font-medium">{analyticsData?.behaviorPatterns.nutritionAdherence}%</span>
                      </div>
                      <Progress value={analyticsData?.behaviorPatterns.nutritionAdherence} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sleep Quality</span>
                        <span className="font-medium">{analyticsData?.behaviorPatterns.sleepQuality}%</span>
                      </div>
                      <Progress value={analyticsData?.behaviorPatterns.sleepQuality} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stress Management</span>
                        <span className="font-medium">{100 - analyticsData?.behaviorPatterns.stressLevels}%</span>
                      </div>
                      <Progress value={100 - analyticsData?.behaviorPatterns.stressLevels} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm">Most Active Day</span>
                        </div>
                        <span className="font-medium">Tuesday</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span className="text-sm">Peak Energy Time</span>
                        </div>
                        <span className="font-medium">10:00 AM</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-success" />
                          <span className="text-sm">Best Recovery Day</span>
                        </div>
                        <span className="font-medium">Sunday</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <div className="grid gap-4">
                {analyticsData?.riskFactors.map((risk, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{risk.factor}</h4>
                            <Badge
                              variant={
                                risk.risk === "low" ? "default" : risk.risk === "medium" ? "secondary" : "destructive"
                              }
                              className="text-xs"
                            >
                              {risk.risk} risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{risk.description}</p>
                        </div>
                        {risk.risk === "low" ? (
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Immediate Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Optimize Sleep Schedule</p>
                        <p className="text-xs text-muted-foreground">Aim for 7-8 hours, consistent bedtime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Increase Protein Intake</p>
                        <p className="text-xs text-muted-foreground">Add 20g protein to support muscle growth</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Stress Management</p>
                        <p className="text-xs text-muted-foreground">Try 10-minute daily meditation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent" />
                      Long-term Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Strength Training Focus</p>
                        <p className="text-xs text-muted-foreground">3x/week compound movements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Metabolic Health</p>
                        <p className="text-xs text-muted-foreground">Monitor glucose response to meals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Mental Resilience</p>
                        <p className="text-xs text-muted-foreground">Build coping strategies toolkit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
