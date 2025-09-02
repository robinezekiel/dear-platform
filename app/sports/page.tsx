import { NavigationHeader } from "@/components/dear/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Play, Trophy, Target, TrendingUp, Camera, Zap } from "lucide-react"

export default function SportsMasteryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            AI Sports Mastery Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Any Sport with <span className="text-emerald-600">AI Coaching</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your performance videos and get instant biomechanical analysis, personalized drills, and expert
            coaching across football, cricket, MMA, golf, and more.
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="drills" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Drills
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-dashed border-emerald-200 hover:border-emerald-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle>Upload Performance Video</CardTitle>
                  <CardDescription>Record or upload your sports performance for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {["Football", "Cricket", "MMA", "Golf", "Tennis", "Basketball"].map((sport) => (
                      <Button key={sport} variant="outline" className="h-12 bg-transparent">
                        {sport}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Video File
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    Recent Uploads
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { sport: "Football", skill: "Free Kick", score: 87, date: "2 hours ago" },
                    { sport: "Cricket", skill: "Batting Stance", score: 92, date: "1 day ago" },
                    { sport: "MMA", skill: "Jab Technique", score: 78, date: "3 days ago" },
                  ].map((upload, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {upload.sport} - {upload.skill}
                        </p>
                        <p className="text-sm text-gray-500">{upload.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={upload.score >= 85 ? "default" : "secondary"}>{upload.score}%</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>AI Biomechanical Analysis</CardTitle>
                  <CardDescription>Football Free Kick - Uploaded 2 hours ago</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Video Analysis Playback</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Insights</h4>
                    <div className="grid gap-3">
                      {[
                        {
                          aspect: "Approach Angle",
                          score: 92,
                          feedback: "Excellent approach angle, maintain consistency",
                        },
                        { aspect: "Plant Foot Position", score: 78, feedback: "Plant foot slightly too close to ball" },
                        { aspect: "Follow Through", score: 85, feedback: "Good follow through, extend more for power" },
                      ].map((insight, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{insight.aspect}</span>
                            <Badge variant={insight.score >= 85 ? "default" : "secondary"}>{insight.score}%</Badge>
                          </div>
                          <Progress value={insight.score} className="mb-2" />
                          <p className="text-sm text-gray-600">{insight.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">87%</div>
                    <p className="text-sm text-gray-500">Overall Score</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { metric: "Technique", value: 87 },
                      { metric: "Power", value: 82 },
                      { metric: "Accuracy", value: 91 },
                      { metric: "Consistency", value: 85 },
                    ].map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{metric.metric}</span>
                          <span>{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4">
                    <Target className="w-4 h-4 mr-2" />
                    Get Personalized Drills
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Drills Tab */}
          <TabsContent value="drills" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Plant Foot Positioning",
                  difficulty: "Beginner",
                  duration: "15 min",
                  description: "Improve your plant foot placement for better accuracy and power",
                  focus: "Technique",
                },
                {
                  title: "Power Generation Drills",
                  difficulty: "Intermediate",
                  duration: "20 min",
                  description: "Enhance your follow-through and power generation",
                  focus: "Power",
                },
                {
                  title: "Accuracy Training",
                  difficulty: "Advanced",
                  duration: "25 min",
                  description: "Target-specific drills to improve shooting accuracy",
                  focus: "Precision",
                },
              ].map((drill, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{drill.difficulty}</Badge>
                      <span className="text-sm text-gray-500">{drill.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{drill.title}</CardTitle>
                    <CardDescription>{drill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-emerald-100 text-emerald-800">{drill.focus}</Badge>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progression</CardTitle>
                  <CardDescription>Your improvement over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: "Free Kick Accuracy", current: 87, previous: 72, trend: "+15%" },
                      { skill: "Power Generation", current: 82, previous: 78, trend: "+4%" },
                      { skill: "Technique Score", current: 91, previous: 85, trend: "+6%" },
                    ].map((skill, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.skill}</span>
                          <span className="text-emerald-600 font-medium">{skill.trend}</span>
                        </div>
                        <Progress value={skill.current} />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Previous: {skill.previous}%</span>
                          <span>Current: {skill.current}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "First Upload", desc: "Uploaded your first performance video", earned: true },
                    { title: "Consistency King", desc: "Uploaded videos for 7 consecutive days", earned: true },
                    { title: "Improvement Master", desc: "Improved technique score by 15%", earned: true },
                    { title: "Multi-Sport Athlete", desc: "Analyzed performance in 3 different sports", earned: false },
                  ].map((achievement, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${achievement.earned ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? "bg-emerald-600" : "bg-gray-400"}`}
                        >
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
