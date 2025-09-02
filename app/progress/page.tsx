"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { ProgressCard } from "@/components/dear/progress-card"
import { StatsGrid, createHealthStats } from "@/components/dear/stats-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Calendar, Target, Award, Camera, Download, Share } from "lucide-react"

const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/diverse-user-avatars.png",
}

const mockHealthStats = createHealthStats({
  weight: { current: 72.5, change: -1.2 },
  bodyFat: { current: 18.5, change: -0.8 },
  energy: { current: 8, change: 1 },
  mood: { current: 7.5, change: 0.5 },
})

const mockMilestones = [
  {
    id: "1",
    title: "First 5kg Lost",
    description: "Reached your initial weight loss milestone",
    date: "2 weeks ago",
    type: "weight",
    achieved: true,
  },
  {
    id: "2",
    title: "30-Day Workout Streak",
    description: "Completed workouts for 30 consecutive days",
    date: "1 week ago",
    type: "fitness",
    achieved: true,
  },
  {
    id: "3",
    title: "Body Fat Under 20%",
    description: "Achieved target body fat percentage",
    date: "3 days ago",
    type: "body",
    achieved: true,
  },
  {
    id: "4",
    title: "Meditation Master",
    description: "Complete 100 hours of meditation",
    date: "In progress",
    type: "mental",
    achieved: false,
    progress: 75,
  },
]

const mockProgressPhotos = [
  {
    id: "1",
    date: "3 months ago",
    url: "/transformation-photo-month-1.png",
    label: "Starting Point",
  },
  {
    id: "2",
    date: "2 months ago",
    url: "/transformation-photo-month-2.png",
    label: "Month 1",
  },
  {
    id: "3",
    date: "1 month ago",
    url: "/transformation-photo-month-3.png",
    label: "Month 2",
  },
  {
    id: "4",
    date: "Today",
    url: "/transformation-photo-current.png",
    label: "Current",
  },
]

export default function ProgressAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("3months")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              Progress Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your transformation journey with detailed insights and visual progress
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Current Stats */}
        <StatsGrid stats={mockHealthStats} columns={4} />

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProgressCard
            title="Weight Goal"
            description="Target: 70kg"
            currentValue={72.5}
            targetValue={70}
            unit="kg"
            trend="down"
            trendValue="1.2kg this week"
            variant="primary"
          />
          <ProgressCard
            title="Body Fat Reduction"
            description="Target: 15%"
            currentValue={18.5}
            targetValue={15}
            unit="%"
            trend="down"
            trendValue="0.8% this month"
            variant="success"
          />
          <ProgressCard
            title="Muscle Mass Gain"
            description="Target: 45%"
            currentValue={42.3}
            targetValue={45}
            unit="%"
            trend="up"
            trendValue="1.2% this month"
            variant="accent"
          />
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="photos">Visual Progress</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weight Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Weight Progress
                    </CardTitle>
                    <Badge variant="outline" className="text-success border-success/20 bg-success/5">
                      -5.2kg total
                    </Badge>
                  </div>
                  <CardDescription>Your weight journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Weight Chart Visualization</p>
                  </div>
                </CardContent>
              </Card>

              {/* Body Composition */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Body Composition
                  </CardTitle>
                  <CardDescription>Fat vs muscle mass changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Body Composition Chart</p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Consistency */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-warning" />
                    Activity Consistency
                  </CardTitle>
                  <CardDescription>Daily activity completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Activity Heatmap</p>
                  </div>
                </CardContent>
              </Card>

              {/* Mood & Energy Trends */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-success" />
                    Wellness Trends
                  </CardTitle>
                  <CardDescription>Mood and energy level patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Wellness Trends Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Visual Transformation</h3>
                <p className="text-muted-foreground">Your journey captured in photos</p>
              </div>
              <Button className="gap-2">
                <Camera className="h-4 w-4" />
                Add New Photo
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProgressPhotos.map((photo) => (
                <Card key={photo.id} className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white font-medium text-sm">{photo.label}</p>
                      <p className="text-white/80 text-xs">{photo.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle>AI Photo Analysis</CardTitle>
                <CardDescription>Automated insights from your progress photos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-primary">-12%</div>
                    <div className="text-xs text-muted-foreground">Body Fat</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-accent">+8%</div>
                    <div className="text-xs text-muted-foreground">Muscle Definition</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-success">+15%</div>
                    <div className="text-xs text-muted-foreground">Posture Score</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-warning">9.2/10</div>
                    <div className="text-xs text-muted-foreground">Overall Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="space-y-4">
              {mockMilestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  className={`border-0 shadow-sm ${milestone.achieved ? "bg-gradient-to-r from-success/10 to-success/5" : "bg-gradient-to-r from-muted/20 to-muted/10"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${milestone.achieved ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        <Award className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          {milestone.achieved && <Badge className="bg-success text-success-foreground">Achieved</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        {!milestone.achieved && milestone.progress && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-accent/20">
                    <h4 className="font-medium text-sm mb-2">Strongest Performance Days</h4>
                    <p className="text-xs text-muted-foreground">
                      You consistently perform best on Mondays and Wednesdays. Consider scheduling your most challenging
                      workouts on these days.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                    <h4 className="font-medium text-sm mb-2">Recovery Patterns</h4>
                    <p className="text-xs text-muted-foreground">
                      Your body shows optimal recovery after 48-hour rest periods. This aligns perfectly with your
                      current workout schedule.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Goal Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                    <h4 className="font-medium text-sm mb-2">Weight Goal Timeline</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Based on your current progress, you'll reach your target weight in approximately 3-4 weeks.
                    </p>
                    <div className="text-2xl font-bold text-primary">March 15th</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-success/20">
                    <h4 className="font-medium text-sm mb-2">Body Fat Target</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Your body fat reduction is ahead of schedule. Target achievement expected by:
                    </p>
                    <div className="text-2xl font-bold text-success">April 2nd</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
