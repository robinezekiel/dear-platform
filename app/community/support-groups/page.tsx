"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Search, Users, MessageCircle, Calendar, Plus, Heart, Shield, Clock } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Groups", count: 156 },
  { id: "weight-loss", name: "Weight Loss", count: 42 },
  { id: "mental-health", name: "Mental Health", count: 38 },
  { id: "recovery", name: "Recovery", count: 24 },
  { id: "fitness", name: "Fitness", count: 31 },
  { id: "nutrition", name: "Nutrition", count: 21 },
]

const supportGroups = [
  {
    id: 1,
    name: "Weight Loss Warriors",
    description: "Supporting each other through healthy weight loss journeys with sustainable lifestyle changes",
    category: "weight-loss",
    members: 1247,
    posts: 2341,
    isPrivate: false,
    lastActivity: "2 minutes ago",
    moderators: ["Sarah M.", "Mike R."],
    tags: ["Weight Loss", "Healthy Eating", "Exercise", "Motivation"],
    meetingTime: "Tuesdays 7 PM EST",
  },
  {
    id: 2,
    name: "Recovery Champions",
    description: "Peer support for addiction recovery and sobriety. A safe space for sharing experiences and strength",
    category: "recovery",
    members: 892,
    posts: 1876,
    isPrivate: true,
    lastActivity: "5 minutes ago",
    moderators: ["Dr. Johnson", "Lisa K."],
    tags: ["Addiction Recovery", "Sobriety", "12-Step", "Support"],
    meetingTime: "Daily 6 PM EST",
  },
  {
    id: 3,
    name: "Mindful Living",
    description: "Practicing mindfulness and emotional wellness together through meditation and self-reflection",
    category: "mental-health",
    members: 2156,
    posts: 3421,
    isPrivate: false,
    lastActivity: "1 hour ago",
    moderators: ["Emma T.", "David L."],
    tags: ["Mindfulness", "Meditation", "Anxiety", "Stress Relief"],
    meetingTime: "Sundays 10 AM EST",
  },
  {
    id: 4,
    name: "Nutrition Nerds",
    description: "Sharing healthy recipes, nutrition tips, and meal planning strategies for optimal wellness",
    category: "nutrition",
    members: 743,
    posts: 1234,
    isPrivate: false,
    lastActivity: "3 hours ago",
    moderators: ["Chef Maria", "Dr. Rodriguez"],
    tags: ["Nutrition", "Recipes", "Meal Planning", "Healthy Eating"],
    meetingTime: "Wednesdays 8 PM EST",
  },
  {
    id: 5,
    name: "Anxiety Support Circle",
    description:
      "A compassionate community for those dealing with anxiety, panic, and related mental health challenges",
    category: "mental-health",
    members: 1543,
    posts: 2876,
    isPrivate: true,
    lastActivity: "30 minutes ago",
    moderators: ["Dr. Chen", "Amanda F."],
    tags: ["Anxiety", "Panic Attacks", "Coping Skills", "Therapy"],
    meetingTime: "Thursdays 7 PM EST",
  },
  {
    id: 6,
    name: "Fitness Beginners",
    description:
      "Starting your fitness journey? Join others who are taking their first steps toward a healthier lifestyle",
    category: "fitness",
    members: 987,
    posts: 1654,
    isPrivate: false,
    lastActivity: "1 hour ago",
    moderators: ["Trainer Mike", "Coach Sarah"],
    tags: ["Beginner Fitness", "Exercise", "Motivation", "Workout Plans"],
    meetingTime: "Saturdays 9 AM EST",
  },
]

export default function SupportGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredGroups, setFilteredGroups] = useState(supportGroups)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterGroups(term, selectedCategory)
  }

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterGroups(searchTerm, categoryId)
  }

  const filterGroups = (term: string, category: string) => {
    let filtered = supportGroups

    if (category !== "all") {
      filtered = filtered.filter((group) => group.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(term.toLowerCase()) ||
          group.description.toLowerCase().includes(term.toLowerCase()) ||
          group.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredGroups(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Groups</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join peer support groups where you can share experiences, find encouragement, and build lasting connections
            with others on similar journeys.
          </p>
        </div>

        {/* Search and Create */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search support groups..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
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
              className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : "bg-transparent"}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-slate-900 mb-2">
                      {group.name}
                      {group.isPrivate && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">{group.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {group.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {group.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{group.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    {group.members.toLocaleString()} members
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MessageCircle className="h-4 w-4" />
                    {group.posts.toLocaleString()} posts
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    {group.lastActivity}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    {group.meetingTime}
                  </div>
                </div>

                {/* Moderators */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Moderated by:</p>
                  <div className="flex gap-1">
                    {group.moderators.map((mod) => (
                      <Badge key={mod} variant="secondary" className="text-xs">
                        {mod}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/community/support-groups/${group.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Group
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    {group.isPrivate ? "Request to Join" : "Join Group"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Guidelines */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Heart className="h-5 w-5" />
              Support Group Guidelines
            </CardTitle>
            <CardDescription className="text-blue-700">
              Creating a safe and supportive environment for everyone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Respect & Confidentiality</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• What's shared in the group stays in the group</li>
                  <li>• Respect different perspectives and experiences</li>
                  <li>• No judgment or criticism of others' journeys</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Supportive Communication</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use "I" statements when sharing experiences</li>
                  <li>• Offer encouragement and hope to others</li>
                  <li>• Ask before giving advice or suggestions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
