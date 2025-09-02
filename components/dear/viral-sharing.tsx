"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Share2, Heart, MessageCircle, Repeat2, Download, Camera } from "lucide-react"

interface ViralSharingProps {
  userId: string
  transformationData?: any
}

export function TransformationShareCard({ userId, transformationData }: ViralSharingProps) {
  const [shareText, setShareText] = useState(
    "Just completed my 30-day transformation with @DEARHealth! The results speak for themselves 💪 #TransformationTuesday #DEARHealth",
  )

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Share Your Transformation
        </CardTitle>
        <CardDescription>Create viral content from your progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Before/After Preview */}
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Before</span>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">After</span>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-emerald-50 rounded">
            <p className="text-lg font-bold text-emerald-600">-15lbs</p>
            <p className="text-xs text-gray-600">Weight Lost</p>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <p className="text-lg font-bold text-blue-600">30</p>
            <p className="text-xs text-gray-600">Days</p>
          </div>
          <div className="p-2 bg-purple-50 rounded">
            <p className="text-lg font-bold text-purple-600">95%</p>
            <p className="text-xs text-gray-600">Goal Achieved</p>
          </div>
        </div>

        {/* Share Text */}
        <Textarea
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
          placeholder="Add your transformation story..."
          className="min-h-20"
        />

        {/* Engagement Prediction */}
        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
          <span className="text-sm text-yellow-700">Predicted engagement:</span>
          <Badge variant="secondary">High 🔥</Badge>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function SocialFeedPost({ post }: { post: any }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes || 0)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{post.content}</p>

        {/* Transformation Images */}
        {post.images && (
          <div className="grid grid-cols-2 gap-2">
            {post.images.map((image: string, index: number) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg" />
            ))}
          </div>
        )}

        {/* Engagement Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : "text-gray-600"}>
            <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageCircle className="h-4 w-4 mr-2" />
            {post.comments || 0}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Repeat2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ViralChallengeCard({ challenge }: { challenge: any }) {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{challenge.emoji}</span>
          {challenge.name}
        </CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Participants:</span>
          <Badge variant="secondary">{challenge.participants.toLocaleString()}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Trending:</span>
          <Badge className="bg-red-500">#1 Trending</Badge>
        </div>
        <Button className="w-full">Join Challenge</Button>
      </CardContent>
    </Card>
  )
}
