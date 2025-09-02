"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, TrendingUp, Award, Target, Sparkles, Filter, Search } from "lucide-react"

interface FeedPost {
  id: string
  type: "transformation" | "achievement" | "challenge" | "tip" | "story"
  user: {
    id: string
    name: string
    avatar: string
    identity: string
    level: number
  }
  content: {
    title: string
    description: string
    image?: string
    metrics?: { name: string; value: string; change: string }[]
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    isLiked: boolean
  }
  timestamp: string
  tags: string[]
}

export default function SocialFeedPage() {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSocialFeed()
  }, [selectedFilter])

  const loadSocialFeed = async () => {
    setLoading(true)

    // Mock feed data - in production, this would be AI-curated based on user preferences
    const posts: FeedPost[] = [
      {
        id: "1",
        type: "transformation",
        user: {
          id: "1",
          name: "Sarah Chen",
          avatar: "/api/placeholder/40/40",
          identity: "Resilient Healer",
          level: 12,
        },
        content: {
          title: "90-Day Transformation Complete! 🎉",
          description:
            "I can't believe how far I've come! The AI visual analysis helped me track every small change, and the community support kept me motivated through the tough days.",
          image: "/api/placeholder/400/300",
          metrics: [
            { name: "Body Fat", value: "22%", change: "-8%" },
            { name: "Muscle Mass", value: "45kg", change: "+3kg" },
            { name: "Confidence", value: "95%", change: "+40%" },
          ],
        },
        engagement: {
          likes: 127,
          comments: 23,
          shares: 8,
          isLiked: false,
        },
        timestamp: "2 hours ago",
        tags: ["transformation", "fitness", "motivation"],
      },
      {
        id: "2",
        type: "achievement",
        user: {
          id: "2",
          name: "Marcus Johnson",
          avatar: "/api/placeholder/40/40",
          identity: "Zenith Athlete",
          level: 8,
        },
        content: {
          title: "First Marathon Complete! 🏃‍♂️",
          description:
            "Thanks to the AI-powered training plan and the sports analysis features, I just completed my first marathon in 3:45! The biomechanical feedback was game-changing.",
          image: "/api/placeholder/400/200",
          metrics: [
            { name: "Time", value: "3:45:23", change: "Personal Best" },
            { name: "Pace", value: "5:20/km", change: "Target Achieved" },
          ],
        },
        engagement: {
          likes: 89,
          comments: 15,
          shares: 12,
          isLiked: true,
        },
        timestamp: "5 hours ago",
        tags: ["running", "marathon", "achievement"],
      },
      {
        id: "3",
        type: "challenge",
        user: {
          id: "3",
          name: "DEAR Community",
          avatar: "/api/placeholder/40/40",
          identity: "Official",
          level: 0,
        },
        content: {
          title: "30-Day Mindfulness Challenge",
          description:
            "Join thousands of DEAR members in our monthly mindfulness challenge! AI-guided meditation sessions, progress tracking, and community support included.",
          image: "/api/placeholder/400/250",
        },
        engagement: {
          likes: 234,
          comments: 67,
          shares: 45,
          isLiked: false,
        },
        timestamp: "1 day ago",
        tags: ["challenge", "mindfulness", "community"],
      },
      {
        id: "4",
        type: "tip",
        user: {
          id: "4",
          name: "Dr. Emily Rodriguez",
          avatar: "/api/placeholder/40/40",
          identity: "Verified Expert",
          level: 0,
        },
        content: {
          title: "AI Insight: Optimize Your Recovery",
          description:
            "Based on analysis of 10,000+ user transformations, here are the top 3 recovery strategies that accelerate results: 1) Sleep 7-9 hours, 2) Hydrate within 30min post-workout, 3) Active recovery on rest days.",
          metrics: [{ name: "Users Improved", value: "87%", change: "Following This Advice" }],
        },
        engagement: {
          likes: 156,
          comments: 34,
          shares: 28,
          isLiked: false,
        },
        timestamp: "2 days ago",
        tags: ["tips", "recovery", "expert"],
      },
      {
        id: "5",
        type: "story",
        user: {
          id: "5",
          name: "Alex Thompson",
          avatar: "/api/placeholder/40/40",
          identity: "Metamorphosis Master",
          level: 15,
        },
        content: {
          title: "From Addiction to Athlete: My Journey",
          description:
            "One year ago, I was struggling with addiction and had lost hope. Today, I'm training for my first triathlon. The DEAR community and AI coaching saved my life. If I can do it, you can too.",
          image: "/api/placeholder/400/300",
        },
        engagement: {
          likes: 312,
          comments: 89,
          shares: 67,
          isLiked: true,
        },
        timestamp: "3 days ago",
        tags: ["recovery", "inspiration", "transformation"],
      },
    ]

    setFeedPosts(posts)
    setLoading(false)
  }

  const handleLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              engagement: {
                ...post.engagement,
                likes: post.engagement.isLiked ? post.engagement.likes - 1 : post.engagement.likes + 1,
                isLiked: !post.engagement.isLiked,
              },
            }
          : post,
      ),
    )
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "transformation":
        return <TrendingUp className="h-4 w-4" />
      case "achievement":
        return <Award className="h-4 w-4" />
      case "challenge":
        return <Target className="h-4 w-4" />
      case "tip":
        return <Sparkles className="h-4 w-4" />
      case "story":
        return <Heart className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "transformation":
        return "bg-green-100 text-green-700"
      case "achievement":
        return "bg-yellow-100 text-yellow-700"
      case "challenge":
        return "bg-blue-100 text-blue-700"
      case "tip":
        return "bg-purple-100 text-purple-700"
      case "story":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredPosts = feedPosts.filter((post) => {
    const matchesFilter = selectedFilter === "all" || post.type === selectedFilter
    const matchesSearch =
      searchQuery === "" ||
      post.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">DEAR Social Feed</h1>
        <p className="text-gray-600">
          Discover inspiring transformations, connect with your community, and fuel your journey
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter:</span>
              <div className="flex gap-2">
                {["all", "transformation", "achievement", "challenge", "tip", "story"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search posts, tags, or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Posts */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading your personalized feed...</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        {post.user.level > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Lv. {post.user.level}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{post.user.identity}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <Badge className={getPostTypeColor(post.type)}>
                    {getPostTypeIcon(post.type)}
                    <span className="ml-1 capitalize">{post.type}</span>
                  </Badge>
                </div>

                {/* Post Content */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{post.content.title}</h2>
                    <p className="text-gray-700">{post.content.description}</p>
                  </div>

                  {/* Post Image */}
                  {post.content.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.content.image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Metrics */}
                  {post.content.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      {post.content.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-emerald-600">{metric.value}</div>
                          <div className="text-sm text-gray-600">{metric.name}</div>
                          <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.engagement.isLiked ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.engagement.isLiked ? "fill-current" : ""}`} />
                      {post.engagement.likes}
                    </Button>

                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.engagement.comments}
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      {post.engagement.shares}
                    </Button>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
