"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Share2, Users, Zap, Target, Award, BarChart3, Rocket } from "lucide-react"

interface ViralMetrics {
  totalShares: number
  viralCoefficient: number
  userGrowthFromViral: number
  revenueFromReferrals: number
  topPerformingContent: any[]
  campaignPerformance: any[]
}

interface ShareableReport {
  id: string
  type: string
  title: string
  shareText: string
  hashtags: string[]
  engagementPrediction: number
  viralPotential: "low" | "medium" | "high" | "viral"
  visualData: any
}

export function ViralGrowthDashboard() {
  const [metrics, setMetrics] = useState<ViralMetrics | null>(null)
  const [shareableReports, setShareableReports] = useState<ShareableReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadViralMetrics()
    loadShareableReports()
  }, [])

  const loadViralMetrics = async () => {
    try {
      const response = await fetch("/api/viral/analytics")
      const data = await response.json()
      setMetrics(data.analytics)
    } catch (error) {
      console.error("Failed to load viral metrics:", error)
    }
  }

  const loadShareableReports = async () => {
    try {
      const response = await fetch("/api/viral/reports")
      const data = await response.json()
      setShareableReports(data.reports || [])
    } catch (error) {
      console.error("Failed to load shareable reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateNewReport = async () => {
    try {
      const transformationData = {
        duration: 30,
        progressPercentage: 85,
        achievements: ["Weight Loss", "Strength Gain", "Better Sleep"],
        type: "fitness",
        beforeImage: "/placeholder.svg",
        afterImage: "/placeholder.svg",
        metrics: {
          dailyProgress: [70, 75, 80, 85],
        },
      }

      const response = await fetch("/api/viral/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transformationData }),
      })

      const data = await response.json()
      if (data.success) {
        setShareableReports((prev) => [data.report, ...prev])
      }
    } catch (error) {
      console.error("Failed to generate report:", error)
    }
  }

  const getViralPotentialColor = (potential: string) => {
    switch (potential) {
      case "viral":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Viral Growth Overview */}
      {metrics && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.totalShares.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total Shares</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.viralCoefficient.toFixed(2)}</div>
              <p className="text-sm text-gray-600">Viral Coefficient</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.userGrowthFromViral.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Viral User Growth</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">${metrics.revenueFromReferrals.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Referral Revenue</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Shareable Reports
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Viral Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Growth Analytics
          </TabsTrigger>
        </TabsList>

        {/* Shareable Reports */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Your Viral Content</h3>
              <p className="text-gray-600">Create and manage shareable transformation reports</p>
            </div>
            <Button onClick={generateNewReport} className="bg-emerald-600 hover:bg-emerald-700">
              <Zap className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>

          <div className="grid gap-6">
            {shareableReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-emerald-600" />
                      {report.title}
                    </CardTitle>
                    <Badge className={getViralPotentialColor(report.viralPotential)}>
                      {report.viralPotential.toUpperCase()} POTENTIAL
                    </Badge>
                  </div>
                  <CardDescription>Engagement Prediction: {report.engagementPrediction}%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Share Text:</p>
                    <p className="text-sm text-gray-700">{report.shareText}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Hashtags:</p>
                    <div className="flex flex-wrap gap-1">
                      {report.hashtags.map((hashtag) => (
                        <Badge key={hashtag} variant="outline" className="text-xs">
                          #{hashtag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Viral Potential:</p>
                    <Progress value={report.engagementPrediction} className="mb-2" />
                    <p className="text-xs text-gray-600">Based on content quality, timing, and audience analysis</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Now
                    </Button>
                    <Button variant="outline">Preview</Button>
                    <Button variant="outline">A/B Test</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Viral Campaigns */}
        <TabsContent value="campaigns" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Active Viral Campaigns</h3>
            <p className="text-gray-600">Automated campaigns driving user growth and engagement</p>
          </div>

          <div className="grid gap-4">
            {metrics?.campaignPerformance.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">Reach: {campaign.reach.toLocaleString()} users</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-emerald-600">{campaign.conversionRate.toFixed(1)}%</div>
                      <p className="text-xs text-gray-600">Conversion Rate</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{campaign.roi.toFixed(0)}%</div>
                      <p className="text-xs text-gray-600">ROI</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{campaign.reach.toLocaleString()}</div>
                      <p className="text-xs text-gray-600">Total Reach</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Growth Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Viral Growth Analytics</h3>
            <p className="text-gray-600">Deep insights into your viral growth performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics?.topPerformingContent.map((content, index) => (
                    <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          #{index + 1} {content.title}
                        </p>
                        <p className="text-sm text-gray-600">{content.shares} shares</p>
                      </div>
                      <Badge variant="outline">{content.engagement}% engagement</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Viral Coefficient Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-emerald-600">{metrics?.viralCoefficient.toFixed(2)}</div>
                  <p className="text-sm text-gray-600">Current Viral Coefficient</p>
                </div>
                <Progress value={metrics ? metrics.viralCoefficient * 100 : 0} className="mb-2" />
                <p className="text-xs text-gray-600">
                  Target: 1.0+ for exponential growth. Current performance:{" "}
                  {metrics && metrics.viralCoefficient > 0.5 ? "Excellent" : "Good"}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
