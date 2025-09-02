"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, Medal, Crown, Heart, Share2 } from "lucide-react"

interface HallOfFameEntry {
  id: string
  userId: string
  userName: string
  userAvatar: string
  achievement: string
  category: "transformation" | "sports" | "mental_health" | "community"
  milestone: string
  beforeImage?: string
  afterImage?: string
  story: string
  likes: number
  shares: number
  dateAchieved: string
  tier: "bronze" | "silver" | "gold" | "platinum"
}

export default function HallOfFame() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHallOfFameEntries()
  }, [selectedCategory])

  const fetchHallOfFameEntries = async () => {
    try {
      const response = await fetch(`/api/social/hall-of-fame?category=${selectedCategory}`)
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (error) {
      console.error("Failed to fetch hall of fame entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (entryId: string) => {
    try {
      await fetch(`/api/social/hall-of-fame/${entryId}/like`, { method: "POST" })
      // Update local state
      setEntries((prev) => prev.map((entry) => (entry.id === entryId ? { ...entry, likes: entry.likes + 1 } : entry)))
    } catch (error) {
      console.error("Failed to like entry:", error)
    }
  }

  const handleShare = async (entry: HallOfFameEntry) => {
    try {
      await navigator.share({
        title: `${entry.userName}'s Amazing Transformation`,
        text: entry.story,
        url: `${window.location.origin}/hall-of-fame/${entry.id}`,
      })
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `Check out ${entry.userName}'s transformation: ${window.location.origin}/hall-of-fame/${entry.id}`,
      )
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "platinum":
        return <Crown className="w-5 h-5 text-purple-500" />
      case "gold":
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case "silver":
        return <Medal className="w-5 h-5 text-gray-400" />
      default:
        return <Star className="w-5 h-5 text-orange-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transformation":
        return "bg-emerald-100 text-emerald-800"
      case "sports":
        return "bg-blue-100 text-blue-800"
      case "mental_health":
        return "bg-purple-100 text-purple-800"
      case "community":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Hall of Fame</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Celebrating extraordinary transformations and inspiring achievements from our DEAR community
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {["all", "transformation", "sports", "mental_health", "community"].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category.replace("_", " ")}
          </Button>
        ))}
      </div>

      {/* Hall of Fame Entries */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={entry.userAvatar || "/placeholder.svg"} alt={entry.userName} />
                    <AvatarFallback>{entry.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{entry.userName}</p>
                    <p className="text-xs text-gray-500">{entry.dateAchieved}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTierIcon(entry.tier)}
                  <Badge className={getCategoryColor(entry.category)}>{entry.category.replace("_", " ")}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Achievement */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{entry.achievement}</h3>
                <p className="text-sm text-emerald-600 font-medium">{entry.milestone}</p>
              </div>

              {/* Before/After Images */}
              {entry.beforeImage && entry.afterImage && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <img
                      src={entry.beforeImage || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">Before</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={entry.afterImage || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">After</p>
                  </div>
                </div>
              )}

              {/* Story */}
              <p className="text-sm text-gray-700 line-clamp-3">{entry.story}</p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(entry.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{entry.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(entry)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">{entry.shares}</span>
                  </Button>
                </div>
                <Button size="sm" variant="outline">
                  View Full Story
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-600">Be the first to achieve something amazing and get featured!</p>
        </div>
      )}
    </div>
  )
}
