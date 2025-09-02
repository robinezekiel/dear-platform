import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Flame, Target, Star, Gift, Zap, Crown } from "lucide-react"

export default function GamificationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Journey</h1>
        <p className="text-gray-600">Track your progress, earn rewards, and compete with others</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Level & XP */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Level 12 - Wellness Warrior
                  </CardTitle>
                  <CardDescription>2,340 XP until next level</CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  8,660 XP
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={78} className="h-3" />
            </CardContent>
          </Card>

          {/* Current Streaks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Daily Login</p>
                    <p className="text-2xl font-bold text-orange-600">47 days</p>
                  </div>
                  <Flame className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Workout Streak</p>
                    <p className="text-2xl font-bold text-emerald-600">12 days</p>
                  </div>
                  <Zap className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mindfulness</p>
                    <p className="text-2xl font-bold text-blue-600">8 days</p>
                  </div>
                  <Star className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold">30-Day Warrior</p>
                    <p className="text-sm text-gray-600">Maintained daily login for 30 days</p>
                  </div>
                  <Badge>+500 XP</Badge>
                </div>
                <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                  <Target className="h-8 w-8 text-emerald-500" />
                  <div>
                    <p className="font-semibold">Fitness Enthusiast</p>
                    <p className="text-sm text-gray-600">Completed 10 workouts this month</p>
                  </div>
                  <Badge>+300 XP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Daily Login Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-orange-600">47</p>
                  <p className="text-gray-600">consecutive days</p>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className={`h-8 rounded ${i < 6 ? "bg-orange-500" : "bg-orange-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">Keep it up! 3 more days for a new milestone</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-500" />
                  Workout Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-emerald-600">12</p>
                  <p className="text-gray-600">consecutive days</p>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className={`h-8 rounded ${i < 5 ? "bg-emerald-500" : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">Don't break the chain! Workout today</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">30-Day Transformation</h3>
                    <Badge variant="secondary">18/30 days</Badge>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <p className="text-sm text-gray-600">Complete daily workouts for 30 days</p>
                  <p className="text-sm font-semibold text-emerald-600">Reward: 1,000 XP + Badge</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Mindful March</h3>
                    <Badge variant="secondary">8/31 days</Badge>
                  </div>
                  <Progress value={26} className="mb-2" />
                  <p className="text-sm text-gray-600">Practice mindfulness daily this month</p>
                  <p className="text-sm font-semibold text-blue-600">Reward: 800 XP + Meditation Badge</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Weekend Warrior</h3>
                  <p className="text-sm text-gray-600 mb-2">Complete 2 intense workouts this weekend</p>
                  <p className="text-sm font-semibold text-purple-600 mb-3">Reward: 500 XP</p>
                  <Button size="sm" className="w-full">
                    Join Challenge
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Social Butterfly</h3>
                  <p className="text-sm text-gray-600 mb-2">Share 3 progress updates with the community</p>
                  <p className="text-sm font-semibold text-pink-600 mb-3">Reward: 300 XP + Social Badge</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Join Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Weekly Leaderboard
              </CardTitle>
              <CardDescription>Top performers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Sarah M.", xp: 2840, badge: "🥇" },
                  { rank: 2, name: "Mike R.", xp: 2650, badge: "🥈" },
                  { rank: 3, name: "Emma L.", xp: 2420, badge: "🥉" },
                  { rank: 4, name: "You", xp: 2180, badge: "" },
                  { rank: 5, name: "David K.", xp: 1950, badge: "" },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === "You" ? "bg-emerald-50 border-2 border-emerald-200" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold w-8">{user.badge || `#${user.rank}`}</span>
                      <span className={user.name === "You" ? "font-bold" : ""}>{user.name}</span>
                    </div>
                    <Badge variant="secondary">{user.xp} XP</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Premium Feature Access</h3>
                    <Badge>1,000 XP</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Unlock advanced AI analysis for 1 week</p>
                  <Button size="sm" className="w-full">
                    Redeem
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Personal Trainer Session</h3>
                    <Badge>2,500 XP</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Free 30-minute session with certified trainer</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Early Bird", icon: "🌅", earned: true },
                    { name: "Streak Master", icon: "🔥", earned: true },
                    { name: "Social Star", icon: "⭐", earned: true },
                    { name: "Fitness Guru", icon: "💪", earned: false },
                    { name: "Zen Master", icon: "🧘", earned: false },
                    { name: "Champion", icon: "🏆", earned: false },
                  ].map((badge) => (
                    <div
                      key={badge.name}
                      className={`text-center p-3 rounded-lg ${
                        badge.earned ? "bg-yellow-50 border-2 border-yellow-200" : "bg-gray-100"
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${!badge.earned && "grayscale opacity-50"}`}>{badge.icon}</div>
                      <p className={`text-xs ${badge.earned ? "font-semibold" : "text-gray-500"}`}>{badge.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
