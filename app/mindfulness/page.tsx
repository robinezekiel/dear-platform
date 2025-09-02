import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/dear/navigation-header"
import {
  Clock,
  Brain,
  Heart,
  Wind,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Calendar,
  Flame,
  Moon,
  Sun,
  Leaf,
  Waves,
  Mountain,
} from "lucide-react"

export default function MindfulnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">Mindfulness & Meditation</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find inner peace and mental clarity through guided meditation and mindfulness practices
          </p>
        </div>

        {/* Today's Mindfulness Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Brain className="h-5 w-5 text-dear-primary" />
              Today's Mindfulness Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-primary mb-1">15</div>
                <div className="text-sm text-slate-600 mb-2">Minutes</div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">Goal: 20 min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-accent mb-1">7</div>
                <div className="text-sm text-slate-600 mb-2">Day Streak</div>
                <Progress value={70} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">Best: 14 days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-success mb-1">3/4</div>
                <div className="text-sm text-slate-600 mb-2">Sessions</div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">1 remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-warning mb-1">Calm</div>
                <div className="text-sm text-slate-600 mb-2">Mood</div>
                <div className="flex justify-center mt-2">
                  <div className="w-4 h-4 bg-dear-success rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500 mt-1">Improved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meditate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="meditate">Meditate</TabsTrigger>
            <TabsTrigger value="breathe">Breathe</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">AI Guide</TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Featured Session */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-dear-primary/10 to-dear-accent/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Mountain className="h-5 w-5 text-dear-primary" />
                        Featured: Morning Clarity
                      </span>
                      <Badge className="bg-dear-success/20 text-dear-success">Recommended</Badge>
                    </CardTitle>
                    <CardDescription>Start your day with focused intention and mental clarity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-dear-primary to-dear-accent rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">12 minutes</div>
                        <div className="text-sm text-slate-600">Beginner friendly</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Sun className="h-3 w-3 text-dear-warning" />
                          <span className="text-xs text-slate-500">Best for morning</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-dear-primary hover:bg-dear-primary/90 mb-4">
                      <Play className="h-4 w-4 mr-2" />
                      Start Session
                    </Button>
                    <div className="text-sm text-slate-600">
                      "A gentle introduction to mindfulness that helps you set positive intentions for the day ahead."
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Sessions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {[
                    {
                      title: "5-Minute Reset",
                      duration: "5 min",
                      type: "Quick",
                      icon: RotateCcw,
                      color: "dear-accent",
                    },
                    {
                      title: "Stress Relief",
                      duration: "10 min",
                      type: "Healing",
                      icon: Heart,
                      color: "dear-success",
                    },
                    {
                      title: "Sleep Preparation",
                      duration: "15 min",
                      type: "Evening",
                      icon: Moon,
                      color: "dear-primary",
                    },
                    {
                      title: "Focus Boost",
                      duration: "8 min",
                      type: "Productivity",
                      icon: Zap,
                      color: "dear-warning",
                    },
                  ].map((session, index) => (
                    <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 bg-${session.color}/10 rounded-lg flex items-center justify-center`}
                          >
                            <session.icon className={`h-5 w-5 text-${session.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">{session.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="h-3 w-3" />
                              {session.duration}
                              <Badge variant="outline" className="text-xs">
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700">
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Categories & Progress */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Stress & Anxiety", count: 12, icon: Heart, color: "dear-success" },
                        { name: "Sleep & Rest", count: 8, icon: Moon, color: "dear-primary" },
                        { name: "Focus & Clarity", count: 15, icon: Brain, color: "dear-accent" },
                        { name: "Self-Compassion", count: 10, icon: Leaf, color: "dear-warning" },
                        { name: "Body Scan", count: 6, icon: Waves, color: "dear-success" },
                      ].map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 bg-${category.color}/10 rounded-lg flex items-center justify-center`}
                            >
                              <category.icon className={`h-4 w-4 text-${category.color}`} />
                            </div>
                            <span className="font-medium text-slate-800">{category.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Flame className="h-5 w-5 text-dear-warning" />
                      Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-dear-warning mb-1">7</div>
                      <div className="text-sm text-slate-600">Days in a row</div>
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`w-6 h-6 rounded-full ${
                            day <= 7 ? "bg-dear-warning" : "bg-slate-200"
                          } flex items-center justify-center`}
                        >
                          {day <= 7 && <Flame className="h-3 w-3 text-white" />}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-slate-600">
                      Keep going! You're building a powerful habit.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Breathing Tab */}
          <TabsContent value="breathe" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Breathing Exercise */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-dear-accent/10 to-dear-success/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-dear-accent" />
                    4-7-8 Breathing
                  </CardTitle>
                  <CardDescription>A powerful technique for relaxation and stress relief</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-dear-accent to-dear-success rounded-full flex items-center justify-center mb-4">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <Wind className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-2">Ready to begin</div>
                    <div className="text-sm text-slate-600">Inhale for 4, hold for 7, exhale for 8</div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-dear-accent hover:bg-dear-accent/90">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Breathing Techniques */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Breathing Techniques</CardTitle>
                  <CardDescription>Choose from various breathing exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Box Breathing",
                        description: "4-4-4-4 pattern for focus",
                        duration: "5 min",
                        difficulty: "Beginner",
                      },
                      {
                        name: "Triangle Breathing",
                        description: "3-3-3 pattern for quick calm",
                        duration: "3 min",
                        difficulty: "Beginner",
                      },
                      {
                        name: "Wim Hof Method",
                        description: "Energizing breath work",
                        duration: "10 min",
                        difficulty: "Advanced",
                      },
                      {
                        name: "Coherent Breathing",
                        description: "5-5 pattern for balance",
                        duration: "8 min",
                        difficulty: "Intermediate",
                      },
                    ].map((technique, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{technique.name}</h4>
                          <p className="text-sm text-slate-600">{technique.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {technique.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {technique.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-dear-primary" />
                    Mindfulness Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">This Month</span>
                        <Brain className="h-4 w-4 text-dear-primary" />
                      </div>
                      <div className="text-2xl font-bold text-dear-primary">127 minutes</div>
                      <div className="text-sm text-slate-600">+23% from last month</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Session</span>
                        <span className="text-sm font-medium">8.5 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Longest Streak</span>
                        <span className="text-sm font-medium">14 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sessions Completed</span>
                        <span className="text-sm font-medium">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Favorite Time</span>
                        <span className="text-sm font-medium">Morning</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mood Tracking</CardTitle>
                  <CardDescription>How mindfulness affects your wellbeing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Stress Levels</span>
                        <div className="text-dear-success">↓ 32%</div>
                      </div>
                      <Progress value={68} className="h-2 mb-2" />
                      <div className="text-sm text-slate-600">Significant improvement this month</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sleep Quality</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="w-16 h-2" />
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Focus Level</span>
                        <div className="flex items-center gap-2">
                          <Progress value={78} className="w-16 h-2" />
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Mood</span>
                        <div className="flex items-center gap-2">
                          <Progress value={82} className="w-16 h-2" />
                          <span className="text-sm font-medium">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Guide Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-dear-warning" />
                    AI Mindfulness Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                      <h3 className="font-semibold text-dear-primary mb-2">Today's Insight</h3>
                      <p className="text-sm text-slate-700">
                        Your stress levels seem elevated today. A 10-minute breathing session could help you find your
                        center before the afternoon.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                      <h3 className="font-semibold text-dear-accent mb-2">Pattern Recognition</h3>
                      <p className="text-sm text-slate-700">
                        You meditate most consistently on weekdays. Consider setting a weekend reminder to maintain your
                        practice.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <h3 className="font-semibold text-dear-success mb-2">Progress Celebration</h3>
                      <p className="text-sm text-slate-700">
                        Your 7-day streak shows real commitment! Your reported stress levels have decreased by 15% this
                        week.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-dear-success" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Morning Routine",
                        description: "Start with 5 minutes of gratitude meditation",
                        priority: "High",
                      },
                      {
                        title: "Midday Reset",
                        description: "Try box breathing during lunch break",
                        priority: "Medium",
                      },
                      {
                        title: "Evening Wind-down",
                        description: "Body scan meditation before bed",
                        priority: "Medium",
                      },
                      {
                        title: "Weekend Practice",
                        description: "Longer 20-minute sessions on Saturday",
                        priority: "Low",
                      },
                    ].map((recommendation, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{recommendation.title}</h4>
                          <p className="text-sm text-slate-600">{recommendation.description}</p>
                        </div>
                        <Badge
                          variant={recommendation.priority === "High" ? "default" : "outline"}
                          className={recommendation.priority === "High" ? "bg-dear-warning text-white" : ""}
                        >
                          {recommendation.priority}
                        </Badge>
                      </div>
                    ))}
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
