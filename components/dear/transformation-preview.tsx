"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Sparkles, TrendingUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransformationPreviewProps {
  className?: string
  beforeImage?: string
  afterImage?: string
  analysisData?: {
    bodyFat?: number
    muscleMass?: number
    skinHealth?: number
    confidence?: number
  }
  lastUpdated?: string
}

export function TransformationPreview({
  className,
  beforeImage,
  afterImage,
  analysisData,
  lastUpdated,
}: TransformationPreviewProps) {
  const [activeView, setActiveView] = useState<"before" | "after" | "comparison">("comparison")

  const handleImageUpload = () => {
    // TODO: Implement image upload functionality
    console.log("Upload image")
  }

  return (
    <Card className={cn("border-0 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Visual Transformation
            </CardTitle>
            <CardDescription>AI-powered analysis of your transformation journey</CardDescription>
          </div>
          {lastUpdated && (
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              {lastUpdated}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Display Area */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted/30">
          {beforeImage || afterImage ? (
            <div className="relative w-full h-full">
              {activeView === "comparison" && beforeImage && afterImage ? (
                <div className="flex w-full h-full">
                  <div className="w-1/2 relative">
                    <img
                      src={beforeImage || "/placeholder.svg"}
                      alt="Before transformation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-background/80 text-foreground">Before</Badge>
                    </div>
                  </div>
                  <div className="w-1/2 relative">
                    <img
                      src={afterImage || "/placeholder.svg"}
                      alt="After transformation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">After</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={activeView === "before" ? beforeImage : afterImage}
                  alt={`${activeView} transformation`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Start Your Visual Journey</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your first photo to begin AI-powered transformation tracking
              </p>
              <Button onClick={handleImageUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>
          )}
        </div>

        {/* View Toggle */}
        {beforeImage && afterImage && (
          <div className="flex gap-2">
            <Button
              variant={activeView === "before" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("before")}
              className="flex-1"
            >
              Before
            </Button>
            <Button
              variant={activeView === "comparison" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("comparison")}
              className="flex-1"
            >
              Compare
            </Button>
            <Button
              variant={activeView === "after" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("after")}
              className="flex-1"
            >
              After
            </Button>
          </div>
        )}

        {/* Analysis Data */}
        {analysisData && (
          <div className="grid grid-cols-2 gap-4">
            {analysisData.bodyFat && (
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-primary">{analysisData.bodyFat}%</div>
                <div className="text-xs text-muted-foreground">Body Fat</div>
              </div>
            )}
            {analysisData.muscleMass && (
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-accent">{analysisData.muscleMass}%</div>
                <div className="text-xs text-muted-foreground">Muscle Mass</div>
              </div>
            )}
            {analysisData.skinHealth && (
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-success">{analysisData.skinHealth}/10</div>
                <div className="text-xs text-muted-foreground">Skin Health</div>
              </div>
            )}
            {analysisData.confidence && (
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-warning">{analysisData.confidence}/10</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleImageUpload} className="flex-1 gap-2">
            <Upload className="h-4 w-4" />
            Upload New Photo
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <TrendingUp className="h-4 w-4" />
            View Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
