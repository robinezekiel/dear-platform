"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, BookOpen, Video, Users, TrendingUp, Sparkles, ChevronDown } from "lucide-react"

interface ContentItem {
  id: string
  type: "article" | "video" | "success_story" | "tip" | "challenge" | "community_highlight"
  title: string
  description: string
  author: {
    name: string
    avatar: string
    role: string
  }
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  personalizedScore: number
  tags: string[]
  estimatedReadTime?: number
  thumbnail?: string
  isRecommended: boolean
}

export function AIContentFeed() {
  const [feedItems, setFeedItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  // Simulate AI-curated content feed
  useEffect(() => {
    const generatePersonalizedFeed = () => {
      const items: ContentItem[] = [
        {
          id: "1",
          type: "success_story",
          title: "From 220lbs to Marathon Runner: Sarah's 18-Month Transformation",
          description:
            "Discover how Sarah used DEAR's AI coaching to completely transform her relationship with fitness and achieve her dream of running a marathon.",
          author: {
            name: "Sarah Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "DEAR Community Member",
          },
          engagement: { likes: 234, comments: 45, shares: 67 },
          personalizedScore: 0.95,
          tags: ["weight-loss", "running", "transformation"],
          estimatedReadTime: 5,
          isRecommended: true,
        },
        {
          id: "2",
          type: "tip",
          title: "The 2-Minute Rule for Building Unbreakable Habits",
          description:
            "AI analysis of successful DEAR users reveals this simple technique that makes habit formation 3x more likely to stick.",
          author: {
            name: "Dr. Michael Torres",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Behavioral Psychologist",
          },
          engagement: { likes: 189, comments: 23, shares: 34 },
          personalizedScore: 0.88,
          tags: ["habits", "psychology", "productivity"],
          estimatedReadTime: 3,
          isRecommended: true,
        },
        {
          id: "3",
          type: "video",
          title: "10-Minute Morning Routine That Changed Everything",
          description:
            "Watch how this simple morning routine, optimized by DEAR's AI, helped 1000+ users start their day with unstoppable energy.",
          author: {
            name: "Emma Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Wellness Coach",
          },
          engagement: { likes: 456, comments: 78, shares: 123 },
          personalizedScore: 0.92,
          tags: ["morning-routine", "energy", "wellness"],
          thumbnail: "/placeholder.svg?height=200&width=300",
          isRecommended: false,
        },
        {
          id: "4",
          type: "community_highlight",
          title: "This Week's Transformation Champions",
          description:
            "Celebrating incredible progress from our community members who are crushing their goals this week.",
          author: {
            name: "DEAR Community",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Community Team",
          },
          engagement: { likes: 567, comments: 89, shares: 145 },
          personalizedScore: 0.85,
          tags: ["community", "celebration", "motivation"],
          isRecommended: false,
        },
      ]

      setFeedItems(items)
    }

    generatePersonalizedFeed()
  }, [])

  const getContentIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "success_story":
        return <TrendingUp className="h-4 w-4" />
      case "community_highlight":
        return <Users className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getContentColor = (type: string) => {
    switch (type) {
      case "article":
        return "text-blue-600"
      case "video":
        return "text-red-600"
      case "success_story":
        return "text-green-600"
      case "community_highlight":
        return "text-purple-600"
      default:
        return "text-emerald-600"
    }
  }

  const loadMoreContent = () => {
    setLoading(true)
    // Simulate loading more personalized content
    setTimeout(() => {
      setLoading(false)
      setPage((prev) => prev + 1)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          Your Personalized Feed
        </h2>
        <Badge className="bg-emerald-100 text-emerald-800">AI-Curated for You</Badge>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <Card
            key={item.id}
            className={`hover:shadow-lg transition-shadow ${item.isRecommended ? "ring-2 ring-emerald-200" : ""}`}
          >
            {item.isRecommended && (
              <div className="bg-emerald-50 px-4 py-2 border-b">
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Recommended based on your goals and progress
                </p>
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-gray-800">{item.author.name}</p>
                    <p className="text-sm text-gray-600">{item.author.role}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-1 ${getContentColor(item.type)}`}>
                  {getContentIcon(item.type)}
                  <span className="text-xs font-medium capitalize">{item.type.replace("_", " ")}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {item.thumbnail && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                {item.estimatedReadTime && <span>{item.estimatedReadTime} min read</span>}
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {item.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {item.engagement.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {item.engagement.shares}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={loadMoreContent} disabled={loading} className="w-full bg-transparent">
          {loading ? (
            "Loading more content..."
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Load More Personalized Content
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
