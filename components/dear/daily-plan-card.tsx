"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Dumbbell, Apple, Brain, Heart, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanItem {
  id: string
  type: "workout" | "meal" | "meditation" | "journal" | "recovery"
  title: string
  description: string
  duration?: string
  completed: boolean
  priority?: "high" | "medium" | "low"
}

interface DailyPlanCardProps {
  className?: string
  date?: string
  items: PlanItem[]
  onItemToggle?: (itemId: string) => void
  onViewDetails?: (itemId: string) => void
}

const getItemIcon = (type: PlanItem["type"]) => {
  switch (type) {
    case "workout":
      return <Dumbbell className="h-4 w-4" />
    case "meal":
      return <Apple className="h-4 w-4" />
    case "meditation":
      return <Brain className="h-4 w-4" />
    case "journal":
      return <Heart className="h-4 w-4" />
    case "recovery":
      return <Heart className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

const getItemColor = (type: PlanItem["type"]) => {
  switch (type) {
    case "workout":
      return "text-primary"
    case "meal":
      return "text-success"
    case "meditation":
      return "text-accent"
    case "journal":
      return "text-warning"
    case "recovery":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

const getPriorityColor = (priority: PlanItem["priority"]) => {
  switch (priority) {
    case "high":
      return "border-destructive/20 bg-destructive/5"
    case "medium":
      return "border-warning/20 bg-warning/5"
    case "low":
      return "border-muted/20 bg-muted/5"
    default:
      return ""
  }
}

export function DailyPlanCard({ className, date = "Today", items, onItemToggle, onViewDetails }: DailyPlanCardProps) {
  const completedItems = items.filter((item) => item.completed).length
  const totalItems = items.length
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Daily Plan - {date}
            </CardTitle>
            <CardDescription>Your personalized path to transformation</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            {completedItems}/{totalItems} Complete
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={completionPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-right">
            {completionPercentage.toFixed(0)}% of today's plan completed
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm",
              item.completed ? "bg-muted/30 opacity-75" : "bg-background",
              item.priority && getPriorityColor(item.priority),
            )}
          >
            <Checkbox checked={item.completed} onCheckedChange={() => onItemToggle?.(item.id)} className="shrink-0" />
            <div className={cn("shrink-0", getItemColor(item.type))}>{getItemIcon(item.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={cn("font-medium text-sm", item.completed && "line-through text-muted-foreground")}>
                  {item.title}
                </h4>
                {item.priority === "high" && (
                  <Badge variant="outline" className="text-xs px-1 py-0 h-5 border-destructive/20 text-destructive">
                    High
                  </Badge>
                )}
              </div>
              <p className={cn("text-xs text-muted-foreground", item.completed && "line-through")}>
                {item.description}
              </p>
              {item.duration && (
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.duration}</span>
                </div>
              )}
            </div>
            {onViewDetails && (
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(item.id)} className="shrink-0 h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No tasks for today. Great job staying on track!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
