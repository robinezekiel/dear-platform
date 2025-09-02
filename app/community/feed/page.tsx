import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Heart, MessageCircle, Share2, Trophy, Target, Zap, TrendingUp, Users, Play } from "lucide-react"
import Link from "next/link"

const feedItems = [
  {
    id: 1,
    type: "sports_achievement",
    user: {
      name: "Marcus J.",
      avatar: "/confident-man-headshot.png",
      level: 15,
      badge: "Sports Master",
    },
    content: {
      title: "Improved Football Free Kick Accuracy by 23%!",
      description:
        "Just analyzed my latest free kick video and the AI coaching really works! My technique score went from 72% to 95% in just 2 weeks.",
      sport: "Football",
      improvement: "+23%",
      videoThumbnail: "/transformation-comparison-ai.png",
      metrics: { technique: 95, power: 88, accuracy: 91 },
    },
    engagement: { likes: 127, comments: 23, shares: 8 },
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "transformation_story",
    user: {
      name: "Sarah M.",
      avatar: "/happy-woman-headshot.png",
      level: 12,
      badge: "Wellness Warrior",
    },
    content: {
      title: "90 Days of Transformation - Mind, Body & Soul",
      description:
        "From struggling with anxiety and being 40lbs overweight to feeling confident, strong, and mentally clear. The DEAR community has been my anchor through this journey.",
      beforeAfter: "/transformation-result.png",
      achievements: ["Weight Loss Champion", "Mental Health Advocate", "Community Leader"],
      stats: { weightLost: "40 lbs", streakDays: 90, communityHelped: 15 },
    },
    engagement: { likes: 342, comments: 67, shares: 28 },
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    type: "community_challenge",
    user: {
      name: "DEAR Community",
      avatar: "/diverse-wellness-community.png",
      level: null,
      badge: "Official",
    },
    content: {
      title: "March Madness Sports Challenge 🏀",
      description:
        "Upload your basketball skills this month! Top 10 performers get free personal training sessions. Current leader: Emma R. with 94% shooting accuracy!",
      challenge: {
        name: "Basketball Skills Challenge",
        participants: 1247,
        timeLeft: "18 days",
        leaderboard: [
          { name: "Emma R.", score: 94, sport: "Basketball" },
          { name: "Jake M.", score: 91, sport: "Basketball" },
          { name: "Lisa K.", score: 89, sport: "Basketball" },
        ],
      },
    },
    engagement: { likes: 89, comments: 156, shares: 45 },
    timestamp: "6 hours ago",
  },
  {
    id: 4,
    type: "ai_insight",
    user: {
      name: "DEAR AI Coach",
      avatar: "/health-app-dashboard.png",
      level: null,
      badge: "AI Assistant",
    },
    content: {
      title: "Weekly Community Insights",
      description:
        "This week our community achieved incredible milestones! Sports mastery uploads increased 340%, with cricket and MMA showing the highest improvement rates.",
      insights: [
        { metric: "Sports Videos Analyzed", value: "2,847", change: "+340%" },
        { metric: "Average Skill Improvement", value: "18%", change: "+5%" },
        { metric: "Community Engagement", value: "94%", change: "+12%" },
      ],
    },
    engagement: { likes: 67, comments: 12, shares: 19 },
    timestamp: "1 day ago",
  },
]

export default function CommunityFeedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Feed</h1>
          <p className="text-slate-600">Stay connected with your transformation community</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/sports">
            <Button
              variant="outline"
              className="h-16 flex-col gap-1 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
            >
              <Trophy className="h-5 w-5 text-emerald-600" />
              <span className="text-xs">Upload Sports Video</span>
            </Button>
          </Link>
          <Link href="/community/success-stories">
            <Button variant="outline" className="h-16 flex-col gap-1 bg-blue-50 border-blue-200 hover:bg-blue-100">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-xs">Share Success</span>
            </Button>
          </Link>
          <Link href="/community/challenges">
            <Button
              variant="outline"
              className="h-16 flex-col gap-1 bg-purple-50 border-purple-200 hover:bg-purple-100"
            >
              <Zap className="h-5 w-5 text-purple-600" />
              <span className="text-xs">Join Challenge</span>
            </Button>
          </Link>
          <Link href="/gamification">
            <Button
              variant="outline"
              className="h-16 flex-col gap-1 bg-orange-50 border-orange-200 hover:bg-orange-100"
            >
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-xs">View Progress</span>
            </Button>
          </Link>
        </div>

        {/* Feed Items */}
        <div className="space-y-6">
          {feedItems.map((item) => (
            <Card key={item.id} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img
                      src={item.user.avatar || "/placeholder.svg"}
                      alt={item.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{item.user.name}</h3>
                      {item.user.level && (
                        <Badge variant="secondary" className="text-xs">
                          Level {item.user.level}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.user.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">{item.timestamp}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Sports Achievement */}
                {item.type === "sports_achievement" && (
                  <>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.content.title}</h4>
                      <p className="text-slate-600 mb-3">{item.content.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <img
                          src={item.content.videoThumbnail || "/placeholder.svg"}
                          alt="Performance analysis"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-2">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-emerald-600">{item.content.sport}</Badge>
                        <Badge className="absolute top-2 right-2 bg-green-600">{item.content.improvement}</Badge>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-semibold">Performance Metrics</h5>
                        {Object.entries(item.content.metrics).map(([metric, value]) => (
                          <div key={metric} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{metric}</span>
                            <Badge variant={value >= 90 ? "default" : "secondary"}>{value}%</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Transformation Story */}
                {item.type === "transformation_story" && (
                  <>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.content.title}</h4>
                      <p className="text-slate-600 mb-3">{item.content.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <img
                        src={item.content.beforeAfter || "/placeholder.svg"}
                        alt="Transformation"
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold mb-2">Achievements</h5>
                          <div className="flex flex-wrap gap-1">
                            {item.content.achievements.map((achievement, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Stats</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Weight Lost:</span>
                              <span className="font-semibold text-emerald-600">{item.content.stats.weightLost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Streak Days:</span>
                              <span className="font-semibold text-orange-600">{item.content.stats.streakDays}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>People Helped:</span>
                              <span className="font-semibold text-blue-600">{item.content.stats.communityHelped}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Community Challenge */}
                {item.type === "community_challenge" && (
                  <>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.content.title}</h4>
                      <p className="text-slate-600 mb-3">{item.content.description}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="h-5 w-5 text-purple-600" />
                            <span className="font-semibold">
                              {item.content.challenge.participants.toLocaleString()} participants
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            <strong>{item.content.challenge.timeLeft}</strong> remaining
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2">Current Leaders</h5>
                          <div className="space-y-1">
                            {item.content.challenge.leaderboard.map((leader, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span>
                                  {i + 1}. {leader.name}
                                </span>
                                <Badge variant="secondary">{leader.score}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4">Join Challenge</Button>
                    </div>
                  </>
                )}

                {/* AI Insight */}
                {item.type === "ai_insight" && (
                  <>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.content.title}</h4>
                      <p className="text-slate-600 mb-3">{item.content.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {item.content.insights.map((insight, i) => (
                        <div key={i} className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900 mb-1">{insight.value}</div>
                          <div className="text-xs text-slate-600 mb-1">{insight.metric}</div>
                          <Badge variant="secondary" className="text-xs">
                            {insight.change}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{item.engagement.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{item.engagement.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">{item.engagement.shares}</span>
                    </button>
                  </div>

                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="bg-transparent">
            Load More Posts
          </Button>
        </div>
      </main>
    </div>
  )
}
