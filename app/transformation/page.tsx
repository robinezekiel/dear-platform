"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sparkles,
  Camera,
  Upload,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Calendar,
  Download,
  Share,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Brain,
  Activity,
} from "lucide-react"

const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/diverse-user-avatars.png",
}

const mockAnalysisData = {
  body: {
    bodyFat: 18.5,
    muscleMass: 42.3,
    posture: 8.2,
    symmetry: 9.1,
    overallScore: 8.7,
    changes: {
      bodyFat: -2.1,
      muscleMass: +3.2,
      posture: +1.5,
    },
  },
  face: {
    skinHealth: 8.4,
    hydration: 7.8,
    clarity: 8.9,
    youthfulness: 8.1,
    overallScore: 8.3,
    changes: {
      skinHealth: +0.8,
      hydration: +1.2,
      clarity: +0.5,
    },
  },
  hair: {
    thickness: 7.6,
    health: 8.2,
    growth: 7.9,
    shine: 8.5,
    overallScore: 8.1,
    changes: {
      thickness: +0.4,
      health: +0.9,
      growth: +0.3,
    },
  },
  skin: {
    texture: 8.7,
    tone: 8.3,
    elasticity: 8.9,
    hydration: 8.1,
    overallScore: 8.5,
    changes: {
      texture: +0.6,
      tone: +0.4,
      elasticity: +0.2,
    },
  },
}

const mockProgressPhotos = [
  {
    id: "1",
    date: "3 months ago",
    type: "body",
    url: "/transformation-photo-month-1.png",
    analysis: mockAnalysisData.body,
  },
  {
    id: "2",
    date: "2 months ago",
    type: "body",
    url: "/transformation-photo-month-2.png",
    analysis: mockAnalysisData.body,
  },
  {
    id: "3",
    date: "1 month ago",
    type: "body",
    url: "/transformation-photo-month-3.png",
    analysis: mockAnalysisData.body,
  },
  {
    id: "4",
    date: "Today",
    type: "body",
    url: "/transformation-photo-current.png",
    analysis: mockAnalysisData.body,
  },
]

export default function TransformationHubPage() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("body")
  const [selectedTimeRange, setSelectedTimeRange] = useState("3months")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)

  const handlePhotoUpload = (type: string) => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      console.log(`Analyzing ${type} photo...`)
    }, 3000)
  }

  const getCurrentAnalysis = () => {
    switch (selectedAnalysisType) {
      case "face":
        return mockAnalysisData.face
      case "hair":
        return mockAnalysisData.hair
      case "skin":
        return mockAnalysisData.skin
      default:
        return mockAnalysisData.body
    }
  }

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case "face":
        return <Eye className="h-5 w-5" />
      case "hair":
        return <Sparkles className="h-5 w-5" />
      case "skin":
        return <Activity className="h-5 w-5" />
      default:
        return <Target className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              AI Visual Analysis Hub
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced AI-powered transformation tracking with predictive insights and visual simulations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share className="h-4 w-4" />
              Share Progress
            </Button>
          </div>
        </div>

        {/* Analysis Type Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: "body", label: "Body Analysis", icon: Target, color: "primary" },
            { key: "face", label: "Facial Analysis", icon: Eye, color: "accent" },
            { key: "hair", label: "Hair Analysis", icon: Sparkles, color: "success" },
            { key: "skin", label: "Skin Analysis", icon: Activity, color: "warning" },
          ].map((type) => (
            <Button
              key={type.key}
              variant={selectedAnalysisType === type.key ? "default" : "outline"}
              className={`h-20 flex-col gap-2 ${selectedAnalysisType !== type.key ? "bg-transparent" : ""}`}
              onClick={() => setSelectedAnalysisType(type.key)}
            >
              <type.icon className="h-6 w-6" />
              {type.label}
            </Button>
          ))}
        </div>

        {/* Main Analysis Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Upload & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Analysis */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getAnalysisIcon(selectedAnalysisType)}
                      {selectedAnalysisType.charAt(0).toUpperCase() + selectedAnalysisType.slice(1)} Analysis
                    </CardTitle>
                    <CardDescription>AI-powered insights and measurements</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-2 bg-background/50">
                    <Brain className="h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Display */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted/30">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                      <p className="text-sm text-muted-foreground">Analyzing your photo...</p>
                      <Progress value={65} className="w-48 mt-4" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src="/transformation-photo-current.png"
                        alt="Current analysis"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="font-medium">Latest Analysis</p>
                            <p className="text-sm opacity-90">Today • AI Confidence: 94%</p>
                          </div>
                          <Badge className="bg-success text-success-foreground">
                            Score: {getCurrentAnalysis().overallScore}/10
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Actions */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => handlePhotoUpload(selectedAnalysisType)}
                    className="flex-1 gap-2"
                    disabled={isAnalyzing}
                  >
                    <Upload className="h-4 w-4" />
                    Upload New Photo
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Predictive Simulation */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Future Prediction
                    </CardTitle>
                    <CardDescription>AI simulation of your progress in 3 months</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPrediction(!showPrediction)}
                    className="gap-2 bg-transparent"
                  >
                    {showPrediction ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {showPrediction ? "Hide" : "Show"} Prediction
                  </Button>
                </div>
              </CardHeader>
              {showPrediction && (
                <CardContent>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-accent/10">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Sparkles className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
                        <h3 className="text-lg font-semibold mb-2">Predicted Transformation</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Based on your current progress and consistency
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-3 rounded-lg bg-background/50">
                            <div className="font-semibold text-success">-3.2%</div>
                            <div className="text-muted-foreground">Body Fat</div>
                          </div>
                          <div className="p-3 rounded-lg bg-background/50">
                            <div className="font-semibold text-primary">+5.1%</div>
                            <div className="text-muted-foreground">Muscle Mass</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Analysis Metrics */}
          <div className="space-y-6">
            {/* Current Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Current Metrics
                </CardTitle>
                <CardDescription>Detailed analysis breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(getCurrentAnalysis())
                  .filter(([key]) => !["overallScore", "changes"].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium">{value}/10</span>
                      </div>
                      <Progress value={(value as number) * 10} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Progress Changes */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-success/10 to-success/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Recent Changes
                </CardTitle>
                <CardDescription>Improvements since last analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(getCurrentAnalysis().changes).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <Badge
                      variant="outline"
                      className={`${
                        value > 0
                          ? "text-success border-success/20 bg-success/5"
                          : "text-destructive border-destructive/20 bg-destructive/5"
                      }`}
                    >
                      {value > 0 ? "+" : ""}
                      {value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50 border border-accent/20">
                  <h4 className="font-medium text-sm mb-1">Excellent Progress!</h4>
                  <p className="text-xs text-muted-foreground">
                    Your {selectedAnalysisType} transformation is 23% ahead of predicted timeline.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
                  <h4 className="font-medium text-sm mb-1">Optimization Tip</h4>
                  <p className="text-xs text-muted-foreground">
                    Focus on consistency in your current routine for optimal results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Visual Progress Timeline
                </CardTitle>
                <CardDescription>Your transformation journey over time</CardDescription>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Compare All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProgressPhotos.map((photo, index) => (
                <div key={photo.id} className="space-y-3">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted/30">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.date}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-background/80 text-foreground text-xs">{photo.date}</Badge>
                    </div>
                    {index === mockProgressPhotos.length - 1 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground text-xs">Latest</Badge>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{photo.date}</p>
                    <p className="text-xs text-muted-foreground">Score: {photo.analysis.overallScore}/10</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis History */}
        <Tabs defaultValue="measurements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="measurements" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Measurement History</CardTitle>
                <CardDescription>Track your metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">Measurement Chart Visualization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparisons" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Side-by-Side Comparisons</CardTitle>
                <CardDescription>Compare photos from different time periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">3 Months Ago</h4>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted/30">
                      <img
                        src="/transformation-photo-month-1.png"
                        alt="3 months ago"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">Today</h4>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted/30">
                      <img
                        src="/transformation-photo-current.png"
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Analysis Reports</CardTitle>
                <CardDescription>Detailed AI-generated reports and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-background/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Monthly Progress Report</h4>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive analysis of your transformation progress with personalized recommendations.
                  </p>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    View Report
                  </Button>
                </div>
                <div className="p-4 rounded-lg border bg-background/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Body Composition Analysis</h4>
                    <Badge variant="outline">2 days ago</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed breakdown of muscle mass, body fat, and posture improvements.
                  </p>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
