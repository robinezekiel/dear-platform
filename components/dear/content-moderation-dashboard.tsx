"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle, CheckCircle, Clock, BarChart3, Users, Flag } from "lucide-react"

interface ModerationStats {
  totalContentModerated: number
  actionBreakdown: { approve: number; flag: number; block: number; escalate: number }
  categoryBreakdown: Record<string, number>
  falsePositiveRate: number
  appealStats: { totalAppeals: number; approved: number; denied: number; pending: number }
}

interface ModerationResult {
  id: string
  contentId: string
  action: "approve" | "flag" | "block" | "escalate"
  confidence: number
  reasons: string[]
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
}

export function ContentModerationDashboard() {
  const [stats, setStats] = useState<ModerationStats | null>(null)
  const [testContent, setTestContent] = useState("")
  const [testResult, setTestResult] = useState<ModerationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    loadModerationStats()
  }, [])

  const loadModerationStats = async () => {
    try {
      const response = await fetch("/api/moderation/analytics")
      const data = await response.json()
      setStats(data.analytics)
    } catch (error) {
      console.error("Failed to load moderation stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const testContentModeration = async () => {
    if (!testContent.trim()) return

    setTesting(true)
    try {
      const response = await fetch("/api/moderation/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: `test_${Date.now()}`,
          content: testContent,
          contentType: "text",
          context: { isTest: true },
        }),
      })

      const data = await response.json()
      if (data.success) {
        setTestResult(data.moderation)
      }
    } catch (error) {
      console.error("Failed to test content moderation:", error)
    } finally {
      setTesting(false)
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "approve":
        return "text-green-600 bg-green-100"
      case "flag":
        return "text-yellow-600 bg-yellow-100"
      case "block":
        return "text-red-600 bg-red-100"
      case "escalate":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-800 bg-red-100 border-red-200"
      case "high":
        return "text-orange-800 bg-orange-100 border-orange-200"
      case "medium":
        return "text-yellow-800 bg-yellow-100 border-yellow-200"
      case "low":
        return "text-green-800 bg-green-100 border-green-200"
      default:
        return "text-gray-800 bg-gray-100 border-gray-200"
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
      {/* Moderation Overview */}
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalContentModerated.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Content Moderated</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.actionBreakdown.approve}%</div>
              <p className="text-sm text-gray-600">Approved Content</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{(stats.falsePositiveRate * 100).toFixed(1)}%</div>
              <p className="text-sm text-gray-600">False Positive Rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flag className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.appealStats.pending}</div>
              <p className="text-sm text-gray-600">Pending Appeals</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Test Moderation
          </TabsTrigger>
          <TabsTrigger value="appeals" className="flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Appeals
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Action Breakdown</CardTitle>
                <CardDescription>Distribution of moderation actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats &&
                  Object.entries(stats.actionBreakdown).map(([action, percentage]) => (
                    <div key={action} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium">{action}</span>
                        <Badge className={getActionColor(action)}>{percentage}%</Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Violation Categories</CardTitle>
                <CardDescription>Most common content violations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats &&
                  Object.entries(stats.categoryBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="capitalize">{category.replace("_", " ")}</span>
                        <Badge variant="outline">{count}%</Badge>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appeal Statistics</CardTitle>
              <CardDescription>Content moderation appeal outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.appealStats.totalAppeals}</div>
                    <p className="text-sm text-gray-600">Total Appeals</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stats.appealStats.approved}</div>
                    <p className="text-sm text-gray-600">Approved</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{stats.appealStats.denied}</div>
                    <p className="text-sm text-gray-600">Denied</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.appealStats.pending}</div>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Moderation */}
        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Content Moderation</CardTitle>
              <CardDescription>Test the AI moderation system with sample content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Test Content</label>
                <Textarea
                  value={testContent}
                  onChange={(e) => setTestContent(e.target.value)}
                  placeholder="Enter content to test moderation..."
                  className="min-h-24"
                />
              </div>

              <Button onClick={testContentModeration} disabled={testing || !testContent.trim()}>
                {testing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Test Moderation
                  </>
                )}
              </Button>

              {testResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Moderation Result
                      <Badge className={getActionColor(testResult.action)}>{testResult.action.toUpperCase()}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Confidence</p>
                        <div className="flex items-center gap-2">
                          <Progress value={testResult.confidence * 100} className="flex-1" />
                          <span className="text-sm">{Math.round(testResult.confidence * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Severity</p>
                        <Badge className={getSeverityColor(testResult.severity)}>
                          {testResult.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {testResult.reasons.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Reasons</p>
                        <div className="flex flex-wrap gap-1">
                          {testResult.reasons.map((reason, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appeals */}
        <TabsContent value="appeals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Appeals</CardTitle>
              <CardDescription>Content moderation appeals requiring review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "appeal_1",
                    contentId: "post_123",
                    reason: "This was flagged incorrectly - it's my personal transformation story",
                    status: "pending",
                    timestamp: "2 hours ago",
                  },
                  {
                    id: "appeal_2",
                    contentId: "comment_456",
                    reason: "I was sharing my doctor's advice, not giving medical advice",
                    status: "approved",
                    timestamp: "1 day ago",
                  },
                  {
                    id: "appeal_3",
                    contentId: "post_789",
                    reason: "This is educational content about nutrition",
                    status: "denied",
                    timestamp: "2 days ago",
                  },
                ].map((appeal) => (
                  <div key={appeal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Appeal #{appeal.id.split("_")[1]}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            appeal.status === "pending"
                              ? "secondary"
                              : appeal.status === "approved"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {appeal.status}
                        </Badge>
                        <span className="text-sm text-gray-600">{appeal.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{appeal.reason}</p>
                    {appeal.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Deny
                        </Button>
                        <Button size="sm" variant="outline">
                          Escalate
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Settings</CardTitle>
              <CardDescription>Configure content moderation rules and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Toxicity Threshold</label>
                  <Progress value={70} className="mt-2" />
                  <p className="text-xs text-gray-600 mt-1">Current: 70%</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Auto-escalation Threshold</label>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-gray-600 mt-1">Current: 85%</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Active Moderation Rules</label>
                <div className="space-y-2">
                  {[
                    "Health Misinformation Detection",
                    "Self-Harm Content Detection",
                    "Harassment and Bullying",
                    "Privacy Information Sharing",
                    "Spam and Promotional Content",
                  ].map((rule) => (
                    <div key={rule} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{rule}</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
