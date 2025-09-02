"use client"

import { NavigationHeader } from "@/components/dear/navigation-header"
import { DailyPlanCard } from "@/components/dear/daily-plan-card"
import { ProgressCard } from "@/components/dear/progress-card"
import { TransformationPreview } from "@/components/dear/transformation-preview"
import { StatsGrid, createHealthStats } from "@/components/dear/stats-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Calendar, TrendingUp, Heart, Brain, Users, Sparkles, ArrowRight, Award, Flame } from "lucide-react"
import Link from "next/link"

// Mock user data - in real app this would come from API/database
const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/diverse-user-avatars.png",
}

const mockDailyPlan = [
  {
    id: "1",
    type: "workout" as const,
    title: "Morning Strength Training",
    description: "Upper body focus with compound movements",
    duration: "45 min",
    completed: true,
    priority: "high" as const,
  },
  {
    id: "2",
    type: "meal" as const,
    title: "Protein-Rich Breakfast",
    description: "Greek yogurt with berries and almonds",
    duration: "15 min",
    completed: true,
  },
  {
    id: "3",
    type: "meditation" as const,
    title: "Mindfulness Session",
    description: "Guided breathing and body scan meditation",
    duration: "20 min",
    completed: false,
    priority: "medium" as const,
  },
  {
    id: "4",
    type: "journal" as const,
    title: "Gratitude Journaling",
    description: "Write 3 things you're grateful for today",
    duration: "10 min",
    completed: false,
  },
  {
    id: "5",
    type: "recovery" as const,
    title: "Check-in Reflection",
    description: "Rate your mood and energy levels",
    duration: "5 min",
    completed: false,
  },
]

const mockHealthStats = createHealthStats({
  weight: { current: 72.5, change: -1.2 },
  bodyFat: { current: 18.5, change: -0.8 },
  energy: { current: 8, change: 1 },
  mood: { current: 7.5, change: 0.5 },
})

export default function DashboardPage() {
  const handlePlanItemToggle = (itemId: string) => {
    console.log("Toggle item:", itemId)
    // TODO: Implement plan item toggle functionality
  }

  const handleViewItemDetails = (itemId: string) => {
    console.log("View details for:", itemId)
    // TODO: Navigate to item details
  }

  const completedToday = mockDailyPlan.filter((item) => item.completed).length
  const totalToday = mockDailyPlan.length
  const streakDays = 12 // Mock streak data

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {mockUser.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground mt-2">
              Your journey to unbreakable flourishing continues. You've completed {completedToday} of {totalToday} tasks
              today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/20 border-accent/30"
            >
              <Flame className="h-4 w-4 text-accent" />
              {streakDays} day streak
            </Badge>
            <Button asChild className="gap-2">
              <Link href="/transformation">
                <Sparkles className="h-4 w-4" />
                View Progress
              </Link>
            </Button>
          </div>
        </div>

        {/* Health Stats Grid */}
        <StatsGrid stats={mockHealthStats} columns={4} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Plan - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <DailyPlanCard
              items={mockDailyPlan}
              onItemToggle={handlePlanItemToggle}
              onViewDetails={handleViewItemDetails}
            />
          </div>

          {/* Transformation Preview */}
          <div className="lg:col-span-1">
            <TransformationPreview
              beforeImage="/before-transformation.png"
              afterImage="/transformation-result.png"
              analysisData={{
                bodyFat: 18.5,
                muscleMass: 42.3,
                skinHealth: 8,
                confidence: 9,
              }}
              lastUpdated="2 days ago"
            />
          </div>
        </div>

        {/* Progress Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProgressCard
            title="Weight Goal"
            description="Target weight achievement"
            currentValue={72.5}
            targetValue={70}
            unit="kg"
            trend="down"
            trendValue="1.2kg this week"
            variant="primary"
          />
          <ProgressCard
            title="Workout Streak"
            description="Consecutive workout days"
            currentValue={12}
            targetValue={30}
            unit="days"
            trend="up"
            trendValue="Personal best!"
            variant="success"
          />
          <ProgressCard
            title="Mindfulness Minutes"
            description="Weekly meditation goal"
            currentValue={85}
            targetValue={140}
            unit="min"
            trend="up"
            trendValue="55min to go"
            variant="accent"
          />
        </div>

        {/* Quick Actions & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump into your transformation activities</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/workout">
                  <Target className="h-6 w-6" />
                  Start Workout
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/mindfulness">
                  <Brain className="h-6 w-6" />
                  Meditate
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/journal">
                  <Heart className="h-6 w-6" />
                  Journal
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/community">
                  <Users className="h-6 w-6" />
                  Community
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Insights
              </CardTitle>
              <CardDescription>Personalized recommendations for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Great Progress!</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your consistency this week is 85% above average. Keep up the excellent work!
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Optimization Tip</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider adding 10 minutes of stretching after your workouts for better recovery.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Insights
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled sessions and consultations</CardDescription>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-background/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Dr. Sarah Wilson - Therapy Session</h4>
                  <p className="text-sm text-muted-foreground">Tomorrow at 2:00 PM • Video Call</p>
                </div>
                <Button size="sm">Join</Button>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-background/50">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Nutritionist Consultation</h4>
                  <p className="text-sm text-muted-foreground">Friday at 10:00 AM • In-person</p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  Reschedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
