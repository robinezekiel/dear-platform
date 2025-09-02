"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Target, Network, Zap, Heart, Star } from "lucide-react"

interface SocialRecommendation {
  type: "user" | "content" | "group" | "activity"
  target_id: string
  score: number
  reasoning: string[]
  confidence: number
}

interface NetworkAnalytics {
  directConnections: number
  networkReach: number
  influenceScore: number
  communityRank: number
  engagementLevel: number
}

export function SocialGraphInsights() {
  const [recommendations, setRecommendations] = useState<{
    users: SocialRecommendation[]
    content: SocialRecommendation[]
    groups: SocialRecommendation[]
  }>({ users: [], content: [], groups: [] })

  const [analytics, setAnalytics] = useState<NetworkAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSocialData()
  }, [])

  const loadSocialData = async () => {
    try {
      setLoading(true)

      // Load recommendations for all types
      const [usersRes, contentRes, groupsRes] = await Promise.all([
        fetch("/api/social/recommendations?type=users&limit=5"),
        fetch("/api/social/recommendations?type=content&limit=8"),
        fetch("/api/social/recommendations?type=groups&limit=3"),
      ])

      const [usersData, contentData, groupsData] = await Promise.all([
        usersRes.json(),
        contentRes.json(),
        groupsRes.json(),
      ])

      setRecommendations({
        users: usersData.recommendations || [],
        content: contentData.recommendations || [],
        groups: groupsData.recommendations || [],
      })

      // Load network analytics
      const analyticsRes = await fetch("/api/social/analytics")
      const analyticsData = await analyticsRes.json()
      setAnalytics(analyticsData.analytics)
    } catch (error) {
      console.error("Failed to load social data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (targetId: string, type: string) => {
    try {
      await fetch("/api/social/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_type: type === "user" ? "follows" : "interacts",
          target_id: targetId,
        }),
      })

      // Refresh recommendations
      loadSocialData()
    } catch (error) {
      console.error("Failed to connect:", error)
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
      {/* Network Analytics Overview */}
      {analytics && (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.directConnections}</div>
              <p className="text-sm text-gray-600">Direct Connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Network className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.networkReach}</div>
              <p className="text-sm text-gray-600">Network Reach</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(analytics.influenceScore * 100)}%</div>
              <p className="text-sm text-gray-600">Influence Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(analytics.communityRank * 100)}%</div>
              <p className="text-sm text-gray-600">Community Rank</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(analytics.engagementLevel * 100)}%</div>
              <p className="text-sm text-gray-600">Engagement Level</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            People ({recommendations.users.length})
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Content ({recommendations.content.length})
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            Groups ({recommendations.groups.length})
          </TabsTrigger>
        </TabsList>

        {/* People Recommendations */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.users.map((rec, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">User {rec.target_id}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{Math.round(rec.score * 100)}% match</Badge>
                          <Badge variant="secondary">{Math.round(rec.confidence * 100)}% confidence</Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConnect(rec.target_id, "user")}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Connect
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Progress value={rec.score * 100} className="mb-2" />
                    <div className="flex flex-wrap gap-1">
                      {rec.reasoning.map((reason, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Content Recommendations */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.content.map((rec, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Content {rec.target_id}</h4>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(rec.score * 100)}% relevance
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={rec.score * 100} />
                    <div className="flex flex-wrap gap-1">
                      {rec.reasoning.map((reason, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" className="w-full mt-3" onClick={() => handleConnect(rec.target_id, "content")}>
                    View Content
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Group Recommendations */}
        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.groups.map((rec, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Network className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Group {rec.target_id}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{Math.round(rec.score * 100)}% fit</Badge>
                          <Badge className="bg-purple-100 text-purple-800">Active Community</Badge>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleConnect(rec.target_id, "group")} variant="outline">
                      Join Group
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Progress value={rec.score * 100} className="mb-2" />
                    <div className="flex flex-wrap gap-1">
                      {rec.reasoning.map((reason, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
