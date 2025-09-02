import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/dear/navigation-header"
import {
  Clock,
  Dumbbell,
  Target,
  TrendingUp,
  Play,
  Zap,
  Calendar,
  Timer,
  Award,
  Activity,
  BarChart3,
  CheckCircle,
} from "lucide-react"

export default function WorkoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">Workout & Fitness Hub</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            AI-powered personalized fitness plans designed to accelerate your transformation
          </p>
        </div>

        {/* Today's Workout Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Target className="h-5 w-5 text-dear-primary" />
              Today's Workout Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-primary mb-1">45</div>
                <div className="text-sm text-slate-600 mb-2">Minutes</div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">27/45 min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-accent mb-1">320</div>
                <div className="text-sm text-slate-600 mb-2">Calories</div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">240/320 cal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-success mb-1">8/12</div>
                <div className="text-sm text-slate-600 mb-2">Exercises</div>
                <Progress value={67} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">4 remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-warning mb-1">3/4</div>
                <div className="text-sm text-slate-600 mb-2">Sets</div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">1 set left</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="today">Today's Plan</TabsTrigger>
            <TabsTrigger value="library">Exercise Library</TabsTrigger>
            <TabsTrigger value="tracking">Progress</TabsTrigger>
            <TabsTrigger value="insights">AI Coach</TabsTrigger>
          </TabsList>

          {/* Today's Plan Tab */}
          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Workout */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-dear-primary" />
                        Upper Body Strength
                      </span>
                      <Button size="sm" className="bg-dear-success hover:bg-dear-success/90">
                        <Play className="h-4 w-4 mr-1" />
                        Start Workout
                      </Button>
                    </CardTitle>
                    <CardDescription>45 minutes • Intermediate • 320 calories</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        exercise: "Push-ups",
                        sets: "3 sets",
                        reps: "12-15 reps",
                        rest: "60s",
                        completed: true,
                      },
                      {
                        exercise: "Dumbbell Bench Press",
                        sets: "4 sets",
                        reps: "8-10 reps",
                        rest: "90s",
                        completed: true,
                      },
                      {
                        exercise: "Pull-ups",
                        sets: "3 sets",
                        reps: "6-8 reps",
                        rest: "90s",
                        completed: false,
                        current: true,
                      },
                      {
                        exercise: "Dumbbell Rows",
                        sets: "3 sets",
                        reps: "10-12 reps",
                        rest: "60s",
                        completed: false,
                      },
                      {
                        exercise: "Shoulder Press",
                        sets: "3 sets",
                        reps: "8-10 reps",
                        rest: "60s",
                        completed: false,
                      },
                    ].map((exercise, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          exercise.current
                            ? "bg-dear-primary/10 border-2 border-dear-primary/30"
                            : exercise.completed
                              ? "bg-dear-success/10"
                              : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {exercise.completed ? (
                            <CheckCircle className="h-5 w-5 text-dear-success" />
                          ) : exercise.current ? (
                            <Timer className="h-5 w-5 text-dear-primary" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                          )}
                          <div>
                            <h3 className="font-semibold text-slate-800">{exercise.exercise}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>{exercise.sets}</span>
                              <span>{exercise.reps}</span>
                              <Badge variant="outline" className="text-xs">
                                Rest: {exercise.rest}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={exercise.current ? "default" : "ghost"}
                          size="sm"
                          className={exercise.current ? "bg-dear-primary hover:bg-dear-primary/90" : ""}
                        >
                          {exercise.completed ? "Done" : exercise.current ? "In Progress" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Schedule & Stats */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-dear-primary" />
                      This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { day: "Mon", workout: "Upper Body", completed: true },
                        { day: "Tue", workout: "Cardio", completed: true },
                        { day: "Wed", workout: "Lower Body", completed: false, current: true },
                        { day: "Thu", workout: "Core & Abs", completed: false },
                        { day: "Fri", workout: "Full Body", completed: false },
                        { day: "Sat", workout: "Active Recovery", completed: false },
                        { day: "Sun", workout: "Rest Day", completed: false },
                      ].map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                day.completed
                                  ? "bg-dear-success text-white"
                                  : day.current
                                    ? "bg-dear-primary text-white"
                                    : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {day.day}
                            </div>
                            <span className="text-sm font-medium">{day.workout}</span>
                          </div>
                          {day.completed && <CheckCircle className="h-4 w-4 text-dear-success" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-dear-warning" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-dear-success/10 rounded-lg">
                        <Award className="h-5 w-5 text-dear-success" />
                        <div>
                          <div className="font-medium text-sm">Week Warrior</div>
                          <div className="text-xs text-slate-600">5 workouts this week</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-dear-primary/10 rounded-lg">
                        <Target className="h-5 w-5 text-dear-primary" />
                        <div>
                          <div className="font-medium text-sm">Consistency King</div>
                          <div className="text-xs text-slate-600">14 day streak</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Exercise Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Push-ups",
                  category: "Chest",
                  difficulty: "Beginner",
                  duration: "30 sec",
                  equipment: "Bodyweight",
                },
                {
                  name: "Deadlifts",
                  category: "Back",
                  difficulty: "Intermediate",
                  duration: "45 sec",
                  equipment: "Barbell",
                },
                {
                  name: "Squats",
                  category: "Legs",
                  difficulty: "Beginner",
                  duration: "40 sec",
                  equipment: "Bodyweight",
                },
                {
                  name: "Plank",
                  category: "Core",
                  difficulty: "Beginner",
                  duration: "60 sec",
                  equipment: "Bodyweight",
                },
                {
                  name: "Pull-ups",
                  category: "Back",
                  difficulty: "Advanced",
                  duration: "30 sec",
                  equipment: "Pull-up Bar",
                },
                {
                  name: "Burpees",
                  category: "Full Body",
                  difficulty: "Intermediate",
                  duration: "45 sec",
                  equipment: "Bodyweight",
                },
              ].map((exercise, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="w-full h-32 bg-gradient-to-br from-dear-primary/20 to-dear-accent/20 rounded-lg mb-3 flex items-center justify-center">
                      <Activity className="h-8 w-8 text-dear-primary" />
                    </div>
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {exercise.duration}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge className="text-xs bg-dear-success/10 text-dear-success">{exercise.category}</Badge>
                      <Badge className="text-xs bg-dear-accent/10 text-dear-accent">{exercise.equipment}</Badge>
                    </div>
                    <Button className="w-full bg-dear-primary hover:bg-dear-primary/90">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Demo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-dear-primary" />
                    Workout Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">This Month</span>
                        <TrendingUp className="h-4 w-4 text-dear-success" />
                      </div>
                      <div className="text-2xl font-bold text-dear-success">18 workouts</div>
                      <div className="text-sm text-slate-600">+3 from last month</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Duration</span>
                        <span className="text-sm font-medium">42 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Calories Burned</span>
                        <span className="text-sm font-medium">5,760 cal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consistency</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Personal Records</span>
                        <span className="text-sm font-medium">7 new PRs</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Strength Progress</CardTitle>
                  <CardDescription>Track your personal records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { exercise: "Bench Press", current: "185 lbs", previous: "175 lbs", change: "+10" },
                      { exercise: "Squat", current: "225 lbs", previous: "215 lbs", change: "+10" },
                      { exercise: "Deadlift", current: "275 lbs", previous: "265 lbs", change: "+10" },
                      { exercise: "Pull-ups", current: "12 reps", previous: "10 reps", change: "+2" },
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-800">{record.exercise}</div>
                          <div className="text-sm text-slate-600">Current: {record.current}</div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-dear-success/10 text-dear-success">{record.change}</Badge>
                          <div className="text-xs text-slate-500 mt-1">vs last month</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Coach Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-dear-warning" />
                    AI Fitness Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                      <h3 className="font-semibold text-dear-primary mb-2">Form Analysis</h3>
                      <p className="text-sm text-slate-700">
                        Your squat depth has improved significantly! Focus on maintaining this form while gradually
                        increasing weight.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                      <h3 className="font-semibold text-dear-accent mb-2">Recovery Insight</h3>
                      <p className="text-sm text-slate-700">
                        Your heart rate variability suggests you're well-recovered. Perfect time for a challenging upper
                        body session.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <h3 className="font-semibold text-dear-success mb-2">Progress Milestone</h3>
                      <p className="text-sm text-slate-700">
                        Congratulations! You've increased your overall strength by 15% this month. Your consistency is
                        paying off!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-dear-success" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Add Mobility Work",
                        description: "Include 10 minutes of stretching after workouts",
                        priority: "High",
                      },
                      {
                        title: "Progressive Overload",
                        description: "Increase bench press weight by 5 lbs next week",
                        priority: "Medium",
                      },
                      {
                        title: "Cardio Balance",
                        description: "Add 2 HIIT sessions for better conditioning",
                        priority: "Medium",
                      },
                      {
                        title: "Rest Day Activity",
                        description: "Try yoga or light walking on rest days",
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
