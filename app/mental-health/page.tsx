import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Heart, MessageCircle, TrendingUp, Shield, Headphones, Users, Phone, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Crisis Support Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Crisis Support Available 24/7</p>
              <p className="text-red-700 text-sm">If you're in crisis, please reach out immediately.</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-1" />
                988 Lifeline
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              >
                Crisis Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mental Health & Recovery Center</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your sanctuary for mental wellness, emotional healing, and recovery support. Professional-grade tools
            designed with compassion and understanding.
          </p>
          <div className="mt-4 text-sm text-slate-500">
            <p>These tools supplement but do not replace professional mental health care.</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/mental-health/ai-therapy">
            <Card className="hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-300">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-blue-900">AI Therapy Chat</CardTitle>
                <CardDescription>
                  24/7 supportive conversations with AI trained in therapeutic techniques
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/mental-health/mood-tracking">
            <Card className="hover:shadow-lg transition-all duration-300 border-teal-200 hover:border-teal-300">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-teal-900">Mood Tracking</CardTitle>
                <CardDescription>Track your emotional patterns and identify triggers and improvements</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/mental-health/recovery">
            <Card className="hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-300">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-green-900">Recovery Support</CardTitle>
                <CardDescription>Addiction recovery tools, progress tracking, and peer support</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Wellness Tools */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Headphones className="h-5 w-5" />
                Wellness Tools
              </CardTitle>
              <CardDescription>Guided exercises for mental wellness and emotional regulation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/mental-health/meditation">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Guided Meditations
                  </Button>
                </Link>
                <Link href="/mental-health/breathing">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Breathing Exercises
                  </Button>
                </Link>
                <Link href="/mental-health/journaling">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Therapeutic Journaling
                  </Button>
                </Link>
                <Link href="/mental-health/coping">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    Coping Strategies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Community Support */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Users className="h-5 w-5" />
                Community Support
              </CardTitle>
              <CardDescription>
                Connect with others on similar journeys in a safe, moderated environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/mental-health/support-groups">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    Support Groups
                  </Button>
                </Link>
                <Link href="/mental-health/peer-chat">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    Peer Chat Rooms
                  </Button>
                </Link>
                <Link href="/mental-health/success-stories">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    Success Stories
                  </Button>
                </Link>
                <Link href="/mental-health/mentorship">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    Peer Mentorship
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="border-slate-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Heart className="h-5 w-5" />
              Your Mental Wellness Journey
            </CardTitle>
            <CardDescription>Track your progress and celebrate your growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">7</div>
                <div className="text-sm text-slate-600">Days Active</div>
                <Badge variant="secondary" className="mt-1">
                  Consistent
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">12</div>
                <div className="text-sm text-slate-600">Therapy Sessions</div>
                <Badge variant="secondary" className="mt-1">
                  Engaged
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
                <div className="text-sm text-slate-600">Mood Improvement</div>
                <Badge variant="secondary" className="mt-1">
                  Excellent
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                <div className="text-sm text-slate-600">Coping Skills</div>
                <Badge variant="secondary" className="mt-1">
                  Growing
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Resources */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Professional Resources</CardTitle>
            <CardDescription>When you need additional support beyond our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Crisis Hotlines</h4>
                <div className="space-y-2 text-sm">
                  <div>• National Suicide Prevention Lifeline: 988</div>
                  <div>• Crisis Text Line: Text HOME to 741741</div>
                  <div>• SAMHSA National Helpline: 1-800-662-4357</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Find Professional Help</h4>
                <div className="space-y-2">
                  <Link href="/providers?category=mental-health">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      Find Therapists Near You
                    </Button>
                  </Link>
                  <Link href="/providers?category=psychiatry">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      Find Psychiatrists
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
