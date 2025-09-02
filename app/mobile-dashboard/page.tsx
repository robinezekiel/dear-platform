"use client"

import { MobileNavigation } from "@/components/dear/mobile-navigation"
import { MobileOptimizedCard } from "@/components/dear/mobile-optimized-card"
import { MobileStatsGrid } from "@/components/dear/mobile-stats-grid"
import { SwipeActions } from "@/components/dear/swipe-actions"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Target, Brain, Zap, TrendingUp, Calendar, Camera, Play, Check, X, MessageCircle } from "lucide-react"

const mockUser = {
  name: "Alex Johnson",
  avatar: "/diverse-user-avatars.png",
  streak: 12,
}

const mobileStats = [
  {
    label: "Weight",
    value: "72.5kg",
    change: -1.2,
    trend: "down" as const,
    icon: <Target className="h-5 w-5" />,
    color: "primary" as const,
  },
  {
    label: "Energy",
    value: "8/10",
    change: 12,
    trend: "up" as const,
    icon: <Zap className="h-5 w-5" />,
    color: "success" as const,
  },
  {
    label: "Mood",
    value: "7.5/10",
    change: 5,
    trend: "up" as const,
    icon: <Heart className="h-5 w-5" />,
    color: "accent" as const,
  },
  {
    label: "Progress",
    value: "85%",
    change: 8,
    trend: "up" as const,
    icon: <TrendingUp className="h-5 w-5" />,
    color: "warning" as const,
  },
]

const todayTasks = [
  {
    id: "1",
    title: "Morning Workout",
    description: "Upper body strength training",
    duration: "45 min",
    completed: true,
    type: "workout",
  },
  {
    id: "2",
    title: "Mindfulness Session",
    description: "Guided breathing meditation",
    duration: "20 min",
    completed: false,
    type: "meditation",
  },
  {
    id: "3",
    title: "Progress Photo",
    description: "Weekly transformation check-in",
    duration: "5 min",
    completed: false,
    type: "photo",
  },
  {
    id: "4",
    title: "Journal Entry",
    description: "Reflect on today's achievements",
    duration: "10 min",
    completed: false,
    type: "journal",
  },
]

export default function MobileDashboard() {
  const handleTaskComplete = (taskId: string) => {
    console.log("[v0] Completing task:", taskId)
  }

  const handleTaskSkip = (taskId: string) => {
    console.log("[v0] Skipping task:", taskId)
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "workout":
        return <Target className="h-5 w-5 text-primary" />
      case "meditation":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "photo":
        return <Camera className="h-5 w-5 text-blue-500" />
      case "journal":
        return <MessageCircle className="h-5 w-5 text-green-500" />
      default:
        return <Heart className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Good morning, Alex!</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {mockUser.streak} day streak 🔥
                </Badge>
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline" className="bg-transparent">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <MobileStatsGrid stats={mobileStats} columns={2} />

        {/* Today's Progress */}
        <MobileOptimizedCard
          title="Today's Progress"
          description="4 of 6 tasks completed"
          action={{ label: "View All", href: "/my-plan" }}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Goal</span>
              <span className="font-medium">67%</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </MobileOptimizedCard>

        {/* Today's Tasks */}
        <MobileOptimizedCard title="Today's Tasks" compact>
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <SwipeActions
                key={task.id}
                actions={[
                  {
                    icon: <Check className="h-4 w-4" />,
                    label: "Complete",
                    color: "success",
                    onAction: () => handleTaskComplete(task.id),
                  },
                  {
                    icon: <X className="h-4 w-4" />,
                    label: "Skip",
                    color: "destructive",
                    onAction: () => handleTaskSkip(task.id),
                  },
                ]}
              >
                <div className="flex items-center gap-3 p-3 bg-white">
                  <div className="flex-shrink-0">{getTaskIcon(task.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {task.title}
                      </h4>
                      {task.completed && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">{task.duration}</div>
                </div>
              </SwipeActions>
            ))}
          </div>
        </MobileOptimizedCard>

        {/* Quick Actions */}
        <MobileOptimizedCard title="Quick Actions" compact>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Play className="h-5 w-5" />
              <span className="text-xs">Start Workout</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Brain className="h-5 w-5" />
              <span className="text-xs">Meditate</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Camera className="h-5 w-5" />
              <span className="text-xs">Take Photo</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">Journal</span>
            </Button>
          </div>
        </MobileOptimizedCard>

        {/* Recent Achievement */}
        <MobileOptimizedCard title="Recent Achievement" compact>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-900">Weight Goal Milestone</h4>
              <p className="text-xs text-green-700">Lost 5kg - halfway to your target!</p>
            </div>
          </div>
        </MobileOptimizedCard>
      </div>

      <MobileNavigation unreadNotifications={3} />
    </div>
  )
}
