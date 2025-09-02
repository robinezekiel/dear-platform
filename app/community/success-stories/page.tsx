"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Search, Heart, MessageCircle, Share2, Trophy, Plus, Filter } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Stories", count: 2341 },
  { id: "weight-loss", name: "Weight Loss", count: 892 },
  { id: "mental-health", name: "Mental Health", count: 654 },
  { id: "recovery", name: "Recovery", count: 423 },
  { id: "fitness", name: "Fitness", count: 372 },
]

const successStories = [
  {
    id: 1,
    author: "Sarah M.",
    title: "Lost 50 pounds and found my confidence",
    excerpt:
      "My journey with DEAR transformed not just my body, but my entire relationship with health and wellness. Through the AI-powered visual analysis and supportive community, I learned to love myself at every stage of my transformation.",
    fullStory:
      "When I first joined DEAR, I was at my lowest point. I had tried countless diets and exercise programs, but nothing seemed to stick. The AI visual analysis feature was a game-changer - seeing my progress visualized and predicted gave me the motivation to keep going even when the scale didn't move. The community support was incredible, especially during the tough weeks. Now, 8 months later, I'm not just 50 pounds lighter - I'm stronger, more confident, and have tools for life.",
    image: "/transformation-result.png",
    beforeImage: "/before-transformation.png",
    afterImage: "/transformation-result.png",
    likes: 234,
    comments: 45,
    shares: 12,
    category: "weight-loss",
    tags: ["Weight Loss", "Confidence", "AI Analysis", "Community Support"],
    timeframe: "8 months",
    datePosted: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    author: "Marcus J.",
    title: "90 days sober and stronger than ever",
    excerpt:
      "The recovery support community gave me the strength to overcome addiction and build a new life. Every day is a victory, and I'm grateful for the tools and people who helped me get here.",
    fullStory:
      "Addiction nearly cost me everything - my family, my job, my health. Finding DEAR's recovery community was a turning point. The daily check-ins, peer support, and professional resources gave me structure when I needed it most. The milestone tracking helped me celebrate small victories, and the crisis support was there when I needed it. Today marks 90 days sober, and I'm building a life I'm proud of.",
    image: "/diverse-user-avatars.png",
    likes: 189,
    comments: 67,
    shares: 23,
    category: "recovery",
    tags: ["Addiction Recovery", "Sobriety", "Peer Support", "Milestone"],
    timeframe: "90 days",
    datePosted: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    author: "Emily R.",
    title: "From anxiety to inner peace",
    excerpt:
      "Through therapy and community support, I learned to manage my anxiety and find genuine happiness. The AI therapy companion was like having support available 24/7.",
    fullStory:
      "Anxiety controlled my life for years. I couldn't leave the house without panic attacks, couldn't sleep, couldn't function. The AI therapy companion on DEAR was my first step - having someone to talk to at 3 AM when anxiety hit was life-changing. Combined with professional therapy and the mindfulness community, I slowly rebuilt my confidence. Six months later, I'm traveling, socializing, and living fully again.",
    image: "/diverse-user-avatars.png",
    likes: 156,
    comments: 32,
    shares: 8,
    category: "mental-health",
    tags: ["Anxiety", "AI Therapy", "Mindfulness", "Recovery"],
    timeframe: "6 months",
    datePosted: "3 days ago",
    verified: true,
  },
  {
    id: 4,
    author: "David L.",
    title: "From couch potato to marathon runner",
    excerpt:
      "Never thought I'd run a marathon, but with the right plan and community support, I crossed the finish line last month. The transformation tracking kept me motivated every step of the way.",
    fullStory:
      "A year ago, I couldn't run to the end of my street. I was overweight, out of shape, and had given up on fitness. DEAR's personalized fitness plans started me with just 5-minute walks. The visual progress tracking and community challenges kept me engaged. Slowly, walks became jogs, jogs became runs. The community cheered me on through every milestone. Last month, I completed my first marathon in 4:32. The person who started this journey wouldn't recognize me now.",
    image: "/diverse-user-avatars.png",
    likes: 298,
    comments: 78,
    shares: 34,
    category: "fitness",
    tags: ["Marathon", "Fitness Journey", "Community Support", "Transformation"],
    timeframe: "12 months",
    datePosted: "5 days ago",
    verified: true,
  },
]

export default function SuccessStoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredStories, setFilteredStories] = useState(successStories)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterStories(term, selectedCategory)
  }

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterStories(searchTerm, categoryId)
  }

  const filterStories = (term: string, category: string) => {
    let filtered = successStories

    if (category !== "all") {
      filtered = filtered.filter((story) => story.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(term.toLowerCase()) ||
          story.excerpt.toLowerCase().includes(term.toLowerCase()) ||
          story.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredStories(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Success Stories</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Be inspired by real transformation stories from our community. Every journey is unique, every victory
            matters, and every story has the power to inspire others.
          </p>
        </div>

        {/* Search and Share */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search success stories..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Story
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category.id)}
              size="sm"
              className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="space-y-8 mb-8">
          {filteredStories.map((story) => (
            <Card key={story.id} className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Story Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-slate-200 rounded-lg overflow-hidden">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                          {story.title}
                          {story.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </h2>
                        <p className="text-slate-600 mb-2">
                          by {story.author} • {story.datePosted} • {story.timeframe} journey
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {story.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-6">{story.excerpt}</p>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {story.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {story.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          {story.shares}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Link href={`/community/success-stories/${story.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Read Full Story
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CardTitle className="text-green-900">Ready to Share Your Success?</CardTitle>
            <CardDescription className="text-green-700">
              Your story could be the inspiration someone else needs to start their transformation journey
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-green-700">
                Whether you've reached a major milestone or achieved a small victory, your experience matters. Share
                your story to inspire and encourage others in the DEAR community.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
                  Story Guidelines
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Story
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
