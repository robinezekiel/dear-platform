"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Shield, Calendar, Users, Trophy, Heart, Target, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RecoveryPage() {
  const [sobrietyDays] = useState(127)
  const [milestones] = useState([
    { days: 1, achieved: true, title: "First Day" },
    { days: 7, achieved: true, title: "One Week" },
    { days: 30, achieved: true, title: "One Month" },
    { days: 90, achieved: true, title: "Three Months" },
    { days: 180, achieved: false, title: "Six Months" },
    { days: 365, achieved: false, title: "One Year" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Recovery Support Center</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your journey to recovery is unique and courageous. We're here to support you every step of the way with
            tools, community, and resources designed for lasting transformation.
          </p>
        </div>

        {/* Sobriety Counter */}
        <Card className="border-green-200 mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-900 mb-2">{sobrietyDays} Days Strong</CardTitle>
            <CardDescription className="text-lg">
              You've been on your recovery journey for {Math.floor(sobrietyDays / 30)} months and {sobrietyDays % 30}{" "}
              days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  Milestone Achiever
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Recovery Warrior
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Heart className="h-3 w-3 mr-1" />
                  Self-Care Champion
                </Badge>
              </div>
              <p className="text-green-700 font-medium">
                "Every day you choose recovery, you choose yourself. You're doing amazing."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="border-slate-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Target className="h-5 w-5" />
              Recovery Milestones
            </CardTitle>
            <CardDescription>Celebrate your progress and look ahead to upcoming goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    milestone.achieved
                      ? "border-green-200 bg-green-50"
                      : sobrietyDays >= milestone.days * 0.8
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {milestone.achieved ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-slate-300 rounded-full" />
                    )}
                    <span className={`font-semibold ${milestone.achieved ? "text-green-900" : "text-slate-700"}`}>
                      {milestone.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{milestone.days} days</p>
                  {!milestone.achieved && sobrietyDays < milestone.days && (
                    <div className="mt-2">
                      <Progress value={(sobrietyDays / milestone.days) * 100} className="h-2" />
                      <p className="text-xs text-slate-500 mt-1">{milestone.days - sobrietyDays} days to go</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Check-in */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="h-5 w-5" />
                Daily Recovery Check-in
              </CardTitle>
              <CardDescription>Track your daily progress and reflect on your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-900">How are you feeling today?</span>
                  <Button size="sm" variant="outline" className="border-blue-300 bg-transparent">
                    Check In
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-900">Cravings intensity (1-10)</span>
                  <Button size="sm" variant="outline" className="border-blue-300 bg-transparent">
                    Log
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-900">Gratitude reflection</span>
                  <Button size="sm" variant="outline" className="border-blue-300 bg-transparent">
                    Write
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Network */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Users className="h-5 w-5" />
                Support Network
              </CardTitle>
              <CardDescription>Connect with peers and mentors who understand your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/mental-health/support-groups">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Recovery Support Groups
                  </Button>
                </Link>
                <Link href="/mental-health/peer-chat">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Peer Chat Rooms
                  </Button>
                </Link>
                <Link href="/mental-health/mentorship">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Find a Sponsor/Mentor
                  </Button>
                </Link>
                <Link href="/mental-health/success-stories">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Recovery Success Stories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recovery Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-teal-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-teal-900">Progress Analytics</CardTitle>
              <CardDescription>Visualize your recovery journey with detailed insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mental-health/recovery-analytics">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">View Analytics</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-orange-900">Relapse Prevention</CardTitle>
              <CardDescription>Tools and strategies to maintain your recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mental-health/relapse-prevention">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Access Tools</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-900">Wellness Activities</CardTitle>
              <CardDescription>Healthy activities to support your recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mental-health/wellness-activities">
                <Button className="w-full bg-green-600 hover:bg-green-700">Explore Activities</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Support */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Crisis & Emergency Support</CardTitle>
            <CardDescription className="text-red-700">
              If you're experiencing a crisis or having thoughts of using, reach out immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Crisis Hotlines</h4>
                <div className="space-y-2 text-sm text-red-800">
                  <div>• SAMHSA National Helpline: 1-800-662-4357</div>
                  <div>• Crisis Text Line: Text HOME to 741741</div>
                  <div>• National Suicide Prevention Lifeline: 988</div>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  Emergency Chat Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  Find Local Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
