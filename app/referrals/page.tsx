import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Users, Gift, Trophy, Copy, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react"

export default function ReferralsPage() {
  const referralCode = "DEAR-SARAH-2024"
  const referralStats = {
    totalReferrals: 23,
    successfulSignups: 18,
    totalEarned: 1800, // XP
    currentTier: "Ambassador",
    nextTierAt: 25,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refer & Earn</h1>
        <p className="text-gray-600">Share DEAR with friends and earn amazing rewards together</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Referral Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Referrals</p>
                    <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Successful Signups</p>
                    <p className="text-2xl font-bold text-emerald-600">{referralStats.successfulSignups}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">XP Earned</p>
                    <p className="text-2xl font-bold text-purple-600">{referralStats.totalEarned}</p>
                  </div>
                  <Gift className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Tier</p>
                    <p className="text-lg font-bold text-yellow-600">{referralStats.currentTier}</p>
                  </div>
                  <Badge variant="secondary">{referralStats.nextTierAt - referralStats.totalReferrals} to next</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Your Referral Code */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription>Share this code with friends to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input value={referralCode} readOnly className="font-mono text-lg" />
                <Button size="sm" className="shrink-0">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                When someone signs up with your code, you both get 100 XP and they get a free premium trial!
              </p>
            </CardContent>
          </Card>

          {/* Recent Referrals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Emma L.", status: "Active", joinDate: "2 days ago", earned: 100 },
                  { name: "Mike R.", status: "Active", joinDate: "5 days ago", earned: 100 },
                  { name: "Lisa K.", status: "Pending", joinDate: "1 week ago", earned: 0 },
                ].map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{referral.name}</p>
                      <p className="text-sm text-gray-600">Joined {referral.joinDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={referral.status === "Active" ? "default" : "secondary"}>{referral.status}</Badge>
                      {referral.earned > 0 && <p className="text-sm text-emerald-600">+{referral.earned} XP</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          {/* Social Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Share on Social Media</CardTitle>
              <CardDescription>Spread the word about your transformation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex items-center gap-2 h-12 bg-transparent">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  Facebook
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-12 bg-transparent">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  Twitter
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-12 bg-transparent">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  Instagram
                </Button>
                <Button variant="outline" className="flex items-center gap-2 h-12 bg-transparent">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transformation Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Transformation</CardTitle>
              <CardDescription>Create viral before/after content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <p className="text-gray-600 mb-2">Before Photo</p>
                    <Button variant="outline">Upload Photo</Button>
                  </div>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <p className="text-gray-600 mb-2">After Photo</p>
                    <Button variant="outline">Upload Photo</Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Create Transformation Post
                  </Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pre-made Content */}
          <Card>
            <CardHeader>
              <CardTitle>Ready-to-Share Content</CardTitle>
              <CardDescription>Pre-made posts optimized for engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Achievement",
                    content:
                      "Just completed my 30-day transformation challenge with @DEARHealth! 💪 The AI-powered insights made all the difference. Use my code DEAR-SARAH-2024 for a free trial!",
                    engagement: "High",
                  },
                  {
                    type: "Progress",
                    content:
                      "12 days into my wellness journey and feeling amazing! 🌟 DEAR's personalized approach is exactly what I needed. Who wants to join me?",
                    engagement: "Medium",
                  },
                ].map((post, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.type}</Badge>
                      <Badge variant={post.engagement === "High" ? "default" : "secondary"}>
                        {post.engagement} Engagement
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          {/* Referral Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Tiers & Rewards</CardTitle>
              <CardDescription>Unlock better rewards as you refer more friends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { tier: "Starter", referrals: "1-4", reward: "100 XP per referral", current: false },
                  { tier: "Advocate", referrals: "5-14", reward: "150 XP + Badge", current: false },
                  { tier: "Ambassador", referrals: "15-24", reward: "200 XP + Premium Features", current: true },
                  { tier: "Champion", referrals: "25-49", reward: "300 XP + Exclusive Rewards", current: false },
                  { tier: "Legend", referrals: "50+", reward: "500 XP + Revenue Share", current: false },
                ].map((tier, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${tier.current ? "border-emerald-500 bg-emerald-50" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-semibold ${tier.current ? "text-emerald-700" : ""}`}>{tier.tier}</h3>
                        <p className="text-sm text-gray-600">{tier.referrals} referrals</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tier.reward}</p>
                        {tier.current && <Badge className="mt-1">Current Tier</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Challenges</CardTitle>
              <CardDescription>Limited-time bonus rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-700">March Madness Challenge</h3>
                    <Badge variant="secondary">7 days left</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Refer 5 friends this month and win a free premium subscription + exclusive merchandise!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress: 3/5 referrals</span>
                    <Button size="sm">Share Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers This Month</CardTitle>
              <CardDescription>See how you stack up against other ambassadors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Jessica M.", referrals: 47, badge: "🥇", tier: "Legend" },
                  { rank: 2, name: "David K.", referrals: 32, badge: "🥈", tier: "Champion" },
                  { rank: 3, name: "Maria L.", referrals: 28, badge: "🥉", tier: "Champion" },
                  { rank: 4, name: "You (Sarah)", referrals: 23, badge: "", tier: "Ambassador" },
                  { rank: 5, name: "Alex R.", referrals: 19, badge: "", tier: "Ambassador" },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name.includes("You") ? "bg-emerald-50 border-2 border-emerald-200" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold w-8">{user.badge || `#${user.rank}`}</span>
                      <div>
                        <span className={user.name.includes("You") ? "font-bold" : ""}>{user.name}</span>
                        <p className="text-sm text-gray-600">{user.tier}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{user.referrals} referrals</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
