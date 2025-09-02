"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Target, Users, Calendar, Trophy, Plus, Clock, Star } from "lucide-react"

const activeChallenges = [
  {
    id: 1,
    title: "30-Day Mindfulness Journey",
    description: "Practice mindfulness daily for 30 days and track your mental wellness progress",
    category: "Mental Health",
    participants: 2847,
    duration: "30 days",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    progress: 67,
    difficulty: "Beginner",
    rewards: ["Mindfulness Badge", "Progress Certificate", "Community Recognition"],
    dailyGoal: "10 minutes of mindfulness practice",
    isJoined: true,
    color: "purple",
  },
  {
    id: 2,
    title: "10K Steps Challenge",
    description: "Walk 10,000 steps daily for 21 days to build a sustainable fitness habit",
    category: "Fitness",
    participants: 1923,
    duration: "21 days",
    startDate: "2024-01-15",
    endDate: "2024-02-05",
    progress: 43,
    difficulty: "Intermediate",
    rewards: ["Fitness Warrior Badge", "Step Counter Trophy", "Health Milestone"],
    dailyGoal: "10,000 steps",
    isJoined: false,
    color: "green",
  },
  {
    id: 3,
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 14 days to improve overall health and energy",
    category: "Wellness",
    participants: 3421,
    duration: "14 days",
    startDate: "2024-01-20",
    endDate: "2024-02-03",
    progress: 85,
    difficulty: "Beginner",
    rewards: ["Hydration Badge", "Wellness Champion", "Energy Boost Certificate"],
    dailyGoal: "8 glasses of water",
    isJoined: true,
    color: "blue",
  },
  {
    id: 4,
    title: "Gratitude Practice",
    description: "Write down 3 things you're grateful for each day to boost mental wellness",
    category: "Mental Health",
    participants: 1654,
    duration: "21 days",
    startDate: "2024-01-10",
    endDate: "2024-01-31",
    progress: 90,
    difficulty: "Beginner",
    rewards: ["Gratitude Badge", "Positivity Award", "Mindset Transformation"],
    dailyGoal: "3 gratitude entries",
    isJoined: true,
    color: "orange",
  },
]

const upcomingChallenges = [
  {
    id: 5,
    title: "February Fitness Bootcamp",
    description: "Intensive 28-day fitness challenge with daily workouts and nutrition tracking",
    category: "Fitness",
    startDate: "2024-02-01",
    participants: 0,
    difficulty: "Advanced",
    duration: "28 days",
    color: "red",
  },
  {
    id: 6,
    title: "Digital Detox Weekend",
    description: "Disconnect from devices and reconnect with yourself and nature",
    category: "Mental Health",
    startDate: "2024-02-10",
    participants: 0,
    difficulty: "Intermediate",
    duration: "3 days",
    color: "teal",
  },
]

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("active")

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
      green: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
      red: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
      teal: { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200" },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Challenges</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join group challenges to stay motivated, build healthy habits, and achieve your goals alongside thousands of
            community members. Every small step counts!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200 text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">12</div>
              <div className="text-sm text-slate-600">Active Challenges</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">9,845</div>
              <div className="text-sm text-slate-600">Total Participants</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">3</div>
              <div className="text-sm text-slate-600">Challenges Completed</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">847</div>
              <div className="text-sm text-slate-600">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            onClick={() => setActiveTab("active")}
            className={activeTab === "active" ? "bg-orange-600 hover:bg-orange-700" : "bg-transparent"}
          >
            Active Challenges
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            onClick={() => setActiveTab("upcoming")}
            className={activeTab === "upcoming" ? "bg-orange-600 hover:bg-orange-700" : "bg-transparent"}
          >
            Upcoming Challenges
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
            className={activeTab === "completed" ? "bg-orange-600 hover:bg-orange-700" : "bg-transparent"}
          >
            My Completed
          </Button>
        </div>

        {/* Active Challenges */}
        {activeTab === "active" && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {activeChallenges.map((challenge) => {
              const colors = getColorClasses(challenge.color)
              return (
                <Card key={challenge.id} className={`${colors.border} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-slate-900 mb-2 flex items-center gap-2">
                          {challenge.title}
                          {challenge.isJoined && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Joined
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">{challenge.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className={`${colors.bg} ${colors.text} text-xs`}>
                            {challenge.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress (if joined) */}
                    {challenge.isJoined && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600">Your Progress</span>
                          <span className="font-semibold text-slate-900">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    )}

                    {/* Challenge Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="h-4 w-4" />
                        {challenge.participants.toLocaleString()} joined
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {challenge.duration}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Target className="h-4 w-4" />
                        {challenge.dailyGoal}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        Ends {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Rewards */}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">Rewards:</p>
                      <div className="flex flex-wrap gap-1">
                        {challenge.rewards.map((reward) => (
                          <Badge key={reward} variant="secondary" className="text-xs">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {challenge.isJoined ? (
                        <>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            View Progress
                          </Button>
                          <Button className={`flex-1 bg-${challenge.color}-600 hover:bg-${challenge.color}-700`}>
                            Log Today's Activity
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Learn More
                          </Button>
                          <Button className={`flex-1 bg-${challenge.color}-600 hover:bg-${challenge.color}-700`}>
                            Join Challenge
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Upcoming Challenges */}
        {activeTab === "upcoming" && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {upcomingChallenges.map((challenge) => {
              const colors = getColorClasses(challenge.color)
              return (
                <Card key={challenge.id} className={`${colors.border} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="text-slate-900 mb-2">{challenge.title}</CardTitle>
                    <CardDescription className="text-sm mb-3">{challenge.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className={`${colors.bg} ${colors.text} text-xs`}>
                        {challenge.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        Starts {new Date(challenge.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        {challenge.duration}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Get Notified
                      </Button>
                      <Button className={`flex-1 bg-${challenge.color}-600 hover:bg-${challenge.color}-700`}>
                        Pre-Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Create Challenge CTA */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="text-center">
            <CardTitle className="text-orange-900">Have an Idea for a Challenge?</CardTitle>
            <CardDescription className="text-orange-700">
              Help create engaging challenges that motivate and inspire the community
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-orange-700">
                Community-driven challenges are the most successful. Share your ideas and help others achieve their
                wellness goals.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  Challenge Guidelines
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Propose Challenge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
