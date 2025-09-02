import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { NavigationHeader } from "@/components/dear/navigation-header"
import {
  PenTool,
  Brain,
  Heart,
  Lightbulb,
  Calendar,
  TrendingUp,
  Zap,
  BookOpen,
  Smile,
  Meh,
  Frown,
  Star,
  Lock,
  Save,
  Sparkles,
} from "lucide-react"

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">AI-Guided Journal</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover deeper insights about yourself through AI-powered reflection and guided journaling
          </p>
        </div>

        {/* Today's Journal Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <PenTool className="h-5 w-5 text-dear-primary" />
              Today's Reflection Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-primary mb-1">2</div>
                <div className="text-sm text-slate-600 mb-2">Entries Today</div>
                <Progress value={67} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">Goal: 3 entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-accent mb-1">12</div>
                <div className="text-sm text-slate-600 mb-2">Day Streak</div>
                <Progress value={80} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">Best: 18 days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-success mb-1">347</div>
                <div className="text-sm text-slate-600 mb-2">Words Written</div>
                <Progress value={85} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">Above average</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Smile className="h-8 w-8 text-dear-success" />
                </div>
                <div className="text-sm text-slate-600 mb-2">Current Mood</div>
                <div className="text-xs text-slate-500">Optimistic</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="write" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
            <TabsTrigger value="entries">My Entries</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Write Tab */}
          <TabsContent value="write" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Writing Area */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <PenTool className="h-5 w-5 text-dear-primary" />
                        Today's Entry
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-dear-success/10 text-dear-success">
                          <Lock className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                        <Button size="sm" className="bg-dear-primary hover:bg-dear-primary/90">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mood Selector */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">How are you feeling?</label>
                        <div className="flex gap-3">
                          {[
                            { icon: Smile, label: "Great", color: "dear-success" },
                            { icon: Meh, label: "Okay", color: "dear-warning" },
                            { icon: Frown, label: "Tough", color: "dear-error" },
                          ].map((mood, index) => (
                            <button
                              key={index}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                                index === 0
                                  ? `border-${mood.color} bg-${mood.color}/10`
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <mood.icon
                                className={`h-4 w-4 ${index === 0 ? `text-${mood.color}` : "text-slate-500"}`}
                              />
                              <span className="text-sm">{mood.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Writing Area */}
                      <div>
                        <Textarea
                          placeholder="What's on your mind today? Let your thoughts flow freely..."
                          className="min-h-[300px] resize-none border-0 bg-slate-50/50 focus:bg-white transition-colors"
                          defaultValue="Today I'm feeling grateful for the small moments of peace I found during my morning meditation. The breathing exercises really helped center me before the busy day ahead. I noticed that when I take time for mindfulness, my interactions with others feel more genuine and patient.

I've been thinking about my transformation goals and how they're not just about physical changes, but about becoming more aligned with who I want to be. The journey feels less overwhelming when I break it down into daily practices like this journaling.

One thing I want to work on tomorrow is..."
                        />
                      </div>

                      {/* Word Count & AI Suggestions */}
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>347 words</span>
                        <Button variant="ghost" size="sm" className="text-dear-primary">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Get AI Suggestions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-dear-warning" />
                      Today's Prompt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-accent/10 rounded-lg mb-4">
                      <p className="text-sm text-slate-700 mb-3">
                        "What small victory from this week are you most proud of, and how did it make you feel?"
                      </p>
                      <Button size="sm" className="w-full bg-dear-primary hover:bg-dear-primary/90">
                        Use This Prompt
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Get New Prompt
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Writing Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-dear-accent mb-1">12</div>
                      <div className="text-sm text-slate-600">Days in a row</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {Array.from({ length: 14 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded ${
                            i < 12 ? "bg-dear-accent" : "bg-slate-200"
                          } flex items-center justify-center`}
                        >
                          {i < 12 && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-slate-600">You're building a powerful habit!</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Entries</span>
                        <span className="text-sm font-medium">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Words This Month</span>
                        <span className="text-sm font-medium">12,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Favorite Time</span>
                        <span className="text-sm font-medium">Evening</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Most Common Mood</span>
                        <span className="text-sm font-medium">Optimistic</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Prompts Tab */}
          <TabsContent value="prompts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "Self-Reflection",
                  prompt: "What patterns in your thoughts or behaviors have you noticed this week?",
                  icon: Brain,
                  color: "dear-primary",
                },
                {
                  category: "Gratitude",
                  prompt: "Describe three things that brought you joy today, no matter how small.",
                  icon: Heart,
                  color: "dear-success",
                },
                {
                  category: "Growth",
                  prompt: "What challenge are you facing, and what might it be teaching you?",
                  icon: TrendingUp,
                  color: "dear-accent",
                },
                {
                  category: "Goals",
                  prompt: "How did you move closer to your transformation goals today?",
                  icon: Star,
                  color: "dear-warning",
                },
                {
                  category: "Relationships",
                  prompt: "How did your interactions with others make you feel today?",
                  icon: Heart,
                  color: "dear-success",
                },
                {
                  category: "Mindfulness",
                  prompt: "What moments today did you feel most present and aware?",
                  icon: Brain,
                  color: "dear-primary",
                },
              ].map((prompt, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-${prompt.color}/10 rounded-lg flex items-center justify-center`}>
                        <prompt.icon className={`h-5 w-5 text-${prompt.color}`} />
                      </div>
                      <Badge className={`bg-${prompt.color}/10 text-${prompt.color}`}>{prompt.category}</Badge>
                    </div>
                    <CardDescription className="text-slate-700 leading-relaxed">{prompt.prompt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-dear-primary hover:bg-dear-primary/90">
                      <PenTool className="h-4 w-4 mr-2" />
                      Start Writing
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Entries Tab */}
          <TabsContent value="entries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {[
                    {
                      date: "Today",
                      mood: "Optimistic",
                      wordCount: 347,
                      preview:
                        "Today I'm feeling grateful for the small moments of peace I found during my morning meditation...",
                      moodIcon: Smile,
                      moodColor: "dear-success",
                    },
                    {
                      date: "Yesterday",
                      mood: "Reflective",
                      wordCount: 289,
                      preview:
                        "Had an interesting conversation with a colleague about work-life balance. It made me think about...",
                      moodIcon: Meh,
                      moodColor: "dear-warning",
                    },
                    {
                      date: "2 days ago",
                      mood: "Energetic",
                      wordCount: 412,
                      preview:
                        "Completed my first full week of the new workout routine! The sense of accomplishment is incredible...",
                      moodIcon: Smile,
                      moodColor: "dear-success",
                    },
                  ].map((entry, index) => (
                    <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{entry.date}</CardTitle>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <entry.moodIcon className={`h-4 w-4 text-${entry.moodColor}`} />
                              <span className="text-sm text-slate-600">{entry.mood}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {entry.wordCount} words
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700 mb-4">{entry.preview}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <BookOpen className="h-3 w-3 mr-2" />
                            Read Full
                          </Button>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Filter Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Calendar className="h-3 w-3 mr-2" />
                        This Week
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Heart className="h-3 w-3 mr-2" />
                        Gratitude Entries
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Star className="h-3 w-3 mr-2" />
                        Goal Reflections
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Brain className="h-3 w-3 mr-2" />
                        Self-Discovery
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Entry Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">This Month</span>
                        <span className="text-sm font-medium">23 entries</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Length</span>
                        <span className="text-sm font-medium">324 words</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Most Active Day</span>
                        <span className="text-sm font-medium">Sunday</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Longest Entry</span>
                        <span className="text-sm font-medium">847 words</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-dear-warning" />
                    AI Journal Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                      <h3 className="font-semibold text-dear-primary mb-2">Emotional Patterns</h3>
                      <p className="text-sm text-slate-700">
                        Your entries show increasing optimism over the past two weeks. You frequently mention gratitude
                        and mindfulness practices as mood boosters.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                      <h3 className="font-semibold text-dear-accent mb-2">Growth Themes</h3>
                      <p className="text-sm text-slate-700">
                        Your writing reveals a strong focus on personal development and self-awareness. You often
                        reflect on lessons learned from challenges.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <h3 className="font-semibold text-dear-success mb-2">Transformation Progress</h3>
                      <p className="text-sm text-slate-700">
                        Your entries indicate strong alignment with your wellness goals. You consistently mention
                        positive lifestyle changes and their impact.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-dear-success" />
                    Mood Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Overall Mood</span>
                        <div className="text-dear-success">↑ 18%</div>
                      </div>
                      <Progress value={78} className="h-2 mb-2" />
                      <div className="text-sm text-slate-600">Significant improvement this month</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Stress Mentions</span>
                        <div className="flex items-center gap-2">
                          <Progress value={35} className="w-16 h-2" />
                          <span className="text-sm font-medium">↓ 35%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Gratitude Expressions</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="w-16 h-2" />
                          <span className="text-sm font-medium">↑ 42%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Goal-Related Content</span>
                        <div className="flex items-center gap-2">
                          <Progress value={72} className="w-16 h-2" />
                          <span className="text-sm font-medium">↑ 28%</span>
                        </div>
                      </div>
                    </div>
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
