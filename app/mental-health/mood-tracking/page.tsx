"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { TrendingUp, Calendar, Smile, Frown, Meh, Heart, Brain } from "lucide-react"

const moodOptions = [
  { value: 5, label: "Excellent", icon: Smile, color: "text-green-600", bg: "bg-green-100" },
  { value: 4, label: "Good", icon: Smile, color: "text-blue-600", bg: "bg-blue-100" },
  { value: 3, label: "Okay", icon: Meh, color: "text-yellow-600", bg: "bg-yellow-100" },
  { value: 2, label: "Low", icon: Frown, color: "text-orange-600", bg: "bg-orange-100" },
  { value: 1, label: "Very Low", icon: Frown, color: "text-red-600", bg: "bg-red-100" },
]

const emotions = [
  "Happy",
  "Sad",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Grateful",
  "Lonely",
  "Confident",
  "Overwhelmed",
  "Peaceful",
  "Angry",
]

export default function MoodTrackingPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Mood Tracking</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Track your emotional patterns to better understand your mental wellness journey. Regular mood tracking helps
            identify triggers and celebrate progress.
          </p>
        </div>

        {/* Today's Mood Entry */}
        <Card className="border-purple-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Heart className="h-5 w-5" />
              How are you feeling today?
            </CardTitle>
            <CardDescription>Take a moment to check in with yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Scale */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Overall Mood</h3>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((mood) => {
                  const IconComponent = mood.icon
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood.value
                          ? `border-purple-400 ${mood.bg}`
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${mood.color}`} />
                      <p className="text-sm font-medium text-slate-900">{mood.label}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Emotions */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Specific Emotions</h3>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => toggleEmotion(emotion)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedEmotions.includes(emotion)
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {emotion}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Notes (Optional)</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to how you feel today? Any triggers, positive moments, or thoughts you'd like to remember?"
                className="w-full p-3 border border-slate-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Today's Mood</Button>
          </CardContent>
        </Card>

        {/* Mood Insights */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Overview */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="h-5 w-5" />
                This Week's Pattern
              </CardTitle>
              <CardDescription>Your mood trends over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                  const moodValue = Math.floor(Math.random() * 5) + 1
                  const mood = moodOptions.find((m) => m.value === moodValue)
                  const IconComponent = mood?.icon || Meh

                  return (
                    <div key={day} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="font-medium text-slate-900">{day}</span>
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-5 w-5 ${mood?.color}`} />
                        <span className="text-sm text-slate-600">{mood?.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-teal-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-900">
                <Brain className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>Patterns and suggestions based on your mood data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-1">Positive Pattern</h4>
                <p className="text-sm text-teal-700">
                  Your mood tends to improve on days when you exercise. Consider maintaining your workout routine.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-1">Watch For</h4>
                <p className="text-sm text-yellow-700">
                  Monday mornings show lower mood scores. Try planning something enjoyable for Monday evenings.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">Suggestion</h4>
                <p className="text-sm text-blue-700">
                  Your anxiety levels correlate with sleep quality. Focus on maintaining consistent sleep habits.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="h-5 w-5" />
              Mood Statistics
            </CardTitle>
            <CardDescription>Your emotional wellness metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">7.2</div>
                <div className="text-sm text-slate-600">Average Mood</div>
                <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                  Improving
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">23</div>
                <div className="text-sm text-slate-600">Days Tracked</div>
                <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                  Consistent
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
                <div className="text-sm text-slate-600">Good Days</div>
                <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800">
                  Excellent
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">12</div>
                <div className="text-sm text-slate-600">Insights Generated</div>
                <Badge variant="secondary" className="mt-1 bg-teal-100 text-teal-800">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
