"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Target, Zap, Brain, Activity, Award, ChevronRight } from "lucide-react"

interface AnalysisResult {
  overallScore: number
  keyPoints: Array<{
    name: string
    coordinates: { x: number; y: number }
    confidence: number
  }>
  movements: Array<{
    phase: string
    duration: number
    quality: number
    feedback: string
  }>
  recommendations: Array<{
    category: string
    priority: "high" | "medium" | "low"
    description: string
    drillSuggestions: string[]
  }>
  comparisons: {
    professional: string
    similarity: number
    differences: string[]
  }
}

interface AdvancedSportsAnalysisProps {
  analysisResult: AnalysisResult
  videoUrl: string
  sport: string
  skill: string
}

export function AdvancedSportsAnalysis({ analysisResult, videoUrl, sport, skill }: AdvancedSportsAnalysisProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [selectedKeyPoint, setSelectedKeyPoint] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Biomechanical Analysis</h2>
          <p className="text-gray-600">
            {sport} - {skill} • Advanced Motion Analysis
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-600">{analysisResult.overallScore}%</div>
          <p className="text-sm text-gray-500">Overall Performance</p>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="biomechanics" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Biomechanics
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pro Comparison
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  Motion Analysis Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <video src={videoUrl} className="w-full h-full object-cover" controls={false} />

                  {/* Overlay key points */}
                  <div className="absolute inset-0">
                    {analysisResult.keyPoints.map((point, i) => (
                      <div
                        key={point.name}
                        className={`absolute w-3 h-3 rounded-full border-2 cursor-pointer transition-all ${
                          selectedKeyPoint === point.name
                            ? "bg-emerald-400 border-emerald-600 scale-150"
                            : "bg-emerald-300 border-emerald-500"
                        }`}
                        style={{
                          left: `${(point.coordinates.x / 640) * 100}%`,
                          top: `${(point.coordinates.y / 480) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => setSelectedKeyPoint(selectedKeyPoint === point.name ? null : point.name)}
                        title={`${point.name} (${Math.round(point.confidence * 100)}% confidence)`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <Progress value={(currentFrame / 100) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement Phases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.movements.map((movement, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{movement.phase}</span>
                      <Badge variant="outline">{movement.duration}s</Badge>
                    </div>
                    <Progress value={movement.quality} className="mb-2" />
                    <p className="text-sm text-gray-600">{movement.feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Biomechanics Tab */}
        <TabsContent value="biomechanics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Point Analysis</CardTitle>
                <CardDescription>
                  {selectedKeyPoint ? `Analyzing: ${selectedKeyPoint}` : "Select a key point from the video"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedKeyPoint ? (
                  <div className="space-y-4">
                    {analysisResult.keyPoints
                      .filter((point) => point.name === selectedKeyPoint)
                      .map((point, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between">
                            <span>Confidence</span>
                            <span>{Math.round(point.confidence * 100)}%</span>
                          </div>
                          <Progress value={point.confidence * 100} />

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">X Position</span>
                              <p className="font-medium">{point.coordinates.x}px</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Y Position</span>
                              <p className="font-medium">{point.coordinates.y}px</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Click on a key point in the video to see detailed analysis
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biomechanical Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Joint Angles", value: 87, optimal: "85-95°" },
                  { name: "Velocity Profile", value: 92, optimal: "90-100%" },
                  { name: "Force Distribution", value: 78, optimal: "80-90%" },
                  { name: "Balance Index", value: 85, optimal: "85-95%" },
                ].map((metric, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-500">Optimal: {metric.optimal}</span>
                    </div>
                    <Progress value={metric.value} />
                    <div className="text-right text-sm font-medium">{metric.value}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Professional Comparison
              </CardTitle>
              <CardDescription>Comparing your technique with {analysisResult.comparisons.professional}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{analysisResult.comparisons.similarity}%</div>
                <p className="text-gray-600">Similarity Score</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Key Differences</h4>
                {analysisResult.comparisons.differences.map((difference, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <ChevronRight className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{difference}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            {analysisResult.recommendations.map((rec, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      {rec.category} Improvement
                    </CardTitle>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h5 className="font-medium">Recommended Drills:</h5>
                    <div className="grid gap-2">
                      {rec.drillSuggestions.map((drill, j) => (
                        <div key={j} className="flex items-center gap-2 p-2 bg-emerald-50 rounded">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                          <span className="text-sm">{drill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
