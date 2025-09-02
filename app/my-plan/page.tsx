"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { DailyPlanCard } from "@/components/dear/daily-plan-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Target, Clock, Sparkles, ChevronLeft, ChevronRight, Settings } from "lucide-react"

const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/diverse-user-avatars.png",
}

const mockWeeklyPlan = {
  Monday: [
    {
      id: "m1",
      type: "workout" as const,
      title: "Full Body Strength",
      description: "Compound movements focus",
      duration: "45 min",
      completed: true,
    },
    {
      id: "m2",
      type: "meal" as const,
      title: "High Protein Breakfast",
      description: "Eggs, oats, and berries",
      duration: "20 min",
      completed: true,
    },
    {
      id: "m3",
      type: "meditation" as const,
      title: "Morning Mindfulness",
      description: "10-minute breathing exercise",
      duration: "10 min",
      completed: true,
    },
  ],
  Tuesday: [
    {
      id: "t1",
      type: "workout" as const,
      title: "Cardio Session",
      description: "HIIT training",
      duration: "30 min",
      completed: true,
    },
    {
      id: "t2",
      type: "meal" as const,
      title: "Balanced Lunch",
      description: "Quinoa bowl with vegetables",
      duration: "25 min",
      completed: true,
    },
    {
      id: "t3",
      type: "journal" as const,
      title: "Reflection Time",
      description: "Daily gratitude practice",
      duration: "15 min",
      completed: false,
    },
  ],
  Wednesday: [
    {
      id: "w1",
      type: "workout" as const,
      title: "Upper Body Focus",
      description: "Push/pull movements",
      duration: "40 min",
      completed: false,
      priority: "high" as const,
    },
    {
      id: "w2",
      type: "meal" as const,
      title: "Nutrient Dense Dinner",
      description: "Salmon with sweet potato",
      duration: "30 min",
      completed: false,
    },
    {
      id: "w3",
      type: "meditation" as const,
      title: "Stress Relief",
      description: "Body scan meditation",
      duration: "20 min",
      completed: false,
    },
    {
      id: "w4",
      type: "recovery" as const,
      title: "Mood Check-in",
      description: "Rate your emotional state",
      duration: "5 min",
      completed: false,
    },
  ],
  Thursday: [
    {
      id: "th1",
      type: "workout" as const,
      title: "Active Recovery",
      description: "Yoga and stretching",
      duration: "30 min",
      completed: false,
    },
    {
      id: "th2",
      type: "meal" as const,
      title: "Healthy Snack",
      description: "Greek yogurt with nuts",
      duration: "10 min",
      completed: false,
    },
  ],
  Friday: [
    {
      id: "f1",
      type: "workout" as const,
      title: "Lower Body Strength",
      description: "Squats and deadlifts",
      duration: "45 min",
      completed: false,
    },
    {
      id: "f2",
      type: "meditation" as const,
      title: "Weekend Prep",
      description: "Intention setting",
      duration: "15 min",
      completed: false,
    },
  ],
  Saturday: [
    {
      id: "s1",
      type: "workout" as const,
      title: "Outdoor Activity",
      description: "Hiking or cycling",
      duration: "60 min",
      completed: false,
    },
    {
      id: "s2",
      type: "journal" as const,
      title: "Weekly Review",
      description: "Reflect on progress",
      duration: "20 min",
      completed: false,
    },
  ],
  Sunday: [
    {
      id: "su1",
      type: "meditation" as const,
      title: "Deep Relaxation",
      description: "Extended mindfulness",
      duration: "30 min",
      completed: false,
    },
    {
      id: "su2",
      type: "meal" as const,
      title: "Meal Prep",
      description: "Prepare for the week",
      duration: "90 min",
      completed: false,
    },
  ],
}

export default function MyPlanPage() {
  const [selectedDay, setSelectedDay] = useState("Wednesday")
  const [currentWeek, setCurrentWeek] = useState(0)

  const days = Object.keys(mockWeeklyPlan)
  const currentDayIndex = days.indexOf(selectedDay)

  const handlePrevDay = () => {
    const prevIndex = currentDayIndex > 0 ? currentDayIndex - 1 : days.length - 1
    setSelectedDay(days[prevIndex])
  }

  const handleNextDay = () => {
    const nextIndex = currentDayIndex < days.length - 1 ? currentDayIndex + 1 : 0
    setSelectedDay(days[nextIndex])
  }

  const handlePlanItemToggle = (itemId: string) => {
    console.log("Toggle item:", itemId)
  }

  const handleViewItemDetails = (itemId: string) => {
    console.log("View details for:", itemId)
  }

  const getWeekDateRange = () => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + currentWeek * 7))
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              My Transformation Plan
            </h1>
            <p className="text-muted-foreground mt-2">Your AI-optimized daily roadmap to unbreakable flourishing</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4 text-accent" />
              AI Optimized
            </Badge>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              Customize Plan
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Week Overview
                </CardTitle>
                <CardDescription>{getWeekDateRange()}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-3">Week {Math.abs(currentWeek) + 1}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  className="bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const dayPlan = mockWeeklyPlan[day as keyof typeof mockWeeklyPlan]
                const completed = dayPlan.filter((item) => item.completed).length
                const total = dayPlan.length
                const isSelected = day === selectedDay
                const isToday = day === "Wednesday" // Mock today as Wednesday

                return (
                  <Button
                    key={day}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-20 flex-col gap-1 relative ${!isSelected ? "bg-transparent" : ""}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {isToday && <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>}
                    <span className="text-xs font-medium">{day.slice(0, 3)}</span>
                    <span className="text-xs text-muted-foreground">
                      {completed}/{total}
                    </span>
                    <div className="w-full bg-muted rounded-full h-1 mt-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all"
                        style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                      />
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Plan Tabs */}
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Day Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handlePrevDay} className="bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold">{selectedDay}</h2>
                <Button variant="outline" size="sm" onClick={handleNextDay} className="bg-transparent">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {selectedDay === "Wednesday" && <Badge className="bg-accent text-accent-foreground">Today</Badge>}
            </div>

            {/* Daily Plan Card */}
            <DailyPlanCard
              date={selectedDay}
              items={mockWeeklyPlan[selectedDay as keyof typeof mockWeeklyPlan]}
              onItemToggle={handlePlanItemToggle}
              onViewDetails={handleViewItemDetails}
            />
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {days.map((day) => {
                const dayPlan = mockWeeklyPlan[day as keyof typeof mockWeeklyPlan]
                const completed = dayPlan.filter((item) => item.completed).length
                const total = dayPlan.length

                return (
                  <Card key={day} className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{day}</CardTitle>
                        <Badge variant="outline">
                          {completed}/{total}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {dayPlan.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 rounded border bg-background/50">
                          <div className={`w-2 h-2 rounded-full ${item.completed ? "bg-success" : "bg-muted"}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.duration}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">73%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "73%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consistency Score</span>
                      <span className="font-medium">8.2/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Time Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <p className="font-medium mb-2">Best Performance Times:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Workouts: 7:00 AM - 8:00 AM</li>
                      <li>• Meditation: 6:30 PM - 7:00 PM</li>
                      <li>• Journaling: 9:00 PM - 9:30 PM</li>
                    </ul>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-2">Suggested Adjustments:</p>
                    <p className="text-muted-foreground">
                      Consider moving your meditation session earlier in the day for better stress management.
                    </p>
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
