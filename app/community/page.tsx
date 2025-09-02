import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Users, Heart, Trophy, MessageCircle, Calendar, Star, TrendingUp, Target } from "lucide-react"
import Link from "next/link"

const communityStats = [
  { label: "Active Members", value: "12,847", icon: Users, color: "text-blue-600" },
  { label: "Success Stories", value: "2,341", icon: Trophy, color: "text-green-600" },
  { label: "Support Groups", value: "156", icon: Heart, color: "text-purple-600" },
  { label: "Monthly Events", value: "48", icon: Calendar, color: "text-orange-600" },
]

const featuredStories = [
  {
    id: 1,
    author: "Sarah M.",
    title: "Lost 50 pounds and found my confidence",
    excerpt:
      "My journey with DEAR transformed not just my body, but my entire relationship with health and wellness...",
    image: "/transformation-result.png",
    likes: 234,
    comments: 45,
    category: "Weight Loss",
  },
  {
    id: 2,
    author: "Marcus J.",
    title: "90 days sober and stronger than ever",
    excerpt: "The recovery support community gave me the strength to overcome addiction and build a new life...",
    image: "/diverse-user-avatars.png",
    likes: 189,
    comments: 67,
    category: "Recovery",
  },
  {
    id: 3,
    author: "Emily R.",
    title: "From anxiety to inner peace",
    excerpt: "Through therapy and community support, I learned to manage my anxiety and find genuine happiness...",
    image: "/diverse-user-avatars.png",
    likes: 156,
    comments: 32,
    category: "Mental Health",
  },
]

const activeGroups = [
  {
    id: 1,
    name: "Weight Loss Warriors",
    members: 1247,
    category: "Fitness",
    description: "Supporting each other through healthy weight loss journeys",
    isActive: true,
  },
  {
    id: 2,
    name: "Recovery Champions",
    members: 892,
    category: "Recovery",
    description: "Peer support for addiction recovery and sobriety",
    isActive: true,
  },
  {
    id: 3,
    name: "Mindful Living",
    members: 2156,
    category: "Mental Health",
    description: "Practicing mindfulness and emotional wellness together",
    isActive: true,
  },
  {
    id: 4,
    name: "Nutrition Nerds",
    members: 743,
    category: "Nutrition",
    description: "Sharing healthy recipes and nutrition tips",
    isActive: false,
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">DEAR Community</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with thousands of people on similar transformation journeys. Share your story, find support, and
            celebrate victories together in our thriving wellness community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="border-slate-200 text-center">
                <CardContent className="p-6">
                  <IconComponent className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/community/support-groups">
            <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-purple-900">Support Groups</CardTitle>
                <CardDescription>Join peer support groups for your specific journey and goals</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/community/success-stories">
            <Card className="hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-300">
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-green-900">Success Stories</CardTitle>
                <CardDescription>Read inspiring transformations and share your own victories</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/community/challenges">
            <Card className="hover:shadow-lg transition-all duration-300 border-orange-200 hover:border-orange-300">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-orange-900">Community Challenges</CardTitle>
                <CardDescription>Participate in group challenges and achieve goals together</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Success Stories */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Star className="h-5 w-5" />
                  Featured Success Stories
                </CardTitle>
                <CardDescription>Inspiring transformations from our community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {featuredStories.map((story) => (
                  <div key={story.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-1">{story.title}</h3>
                            <p className="text-sm text-slate-600">by {story.author}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {story.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{story.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {story.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {story.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/community/success-stories">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Success Stories
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Active Support Groups */}
          <div>
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5" />
                  Active Support Groups
                </CardTitle>
                <CardDescription>Join conversations happening right now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeGroups.map((group) => (
                  <div key={group.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900 text-sm">{group.name}</h4>
                      {group.isActive && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{group.members.toLocaleString()} members</span>
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/community/support-groups">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Groups
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/community/mentorship">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900 mb-1">Peer Mentorship</h3>
                <p className="text-sm text-blue-700">Connect with mentors and mentees</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community/forums">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-teal-200">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <h3 className="font-semibold text-teal-900 mb-1">Discussion Forums</h3>
                <p className="text-sm text-teal-700">Join topic-based discussions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community/events">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900 mb-1">Community Events</h3>
                <p className="text-sm text-purple-700">Virtual and local meetups</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community/leaderboard">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900 mb-1">Leaderboard</h3>
                <p className="text-sm text-green-700">Community achievements</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Community Guidelines */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Community Guidelines</CardTitle>
            <CardDescription className="text-blue-700">
              Our community thrives on mutual respect, support, and positivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Be Supportive</h4>
                <p className="text-sm text-blue-700">
                  Encourage others, celebrate victories, and offer help during challenges
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Respect Privacy</h4>
                <p className="text-sm text-blue-700">
                  Share your own story, but respect others' boundaries and confidentiality
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Stay Positive</h4>
                <p className="text-sm text-blue-700">
                  Focus on constructive conversations and maintain a judgment-free environment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
