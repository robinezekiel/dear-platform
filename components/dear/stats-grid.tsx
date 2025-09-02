import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Target, Zap, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Stat {
  id: string
  title: string
  value: string | number
  unit?: string
  description?: string
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string
    label?: string
  }
  icon?: React.ComponentType<{ className?: string }>
  variant?: "default" | "primary" | "success" | "warning" | "accent"
}

interface StatsGridProps {
  stats: Stat[]
  className?: string
  columns?: 2 | 3 | 4
}

const getTrendIcon = (direction: "up" | "down" | "neutral") => {
  switch (direction) {
    case "up":
      return <TrendingUp className="h-3 w-3" />
    case "down":
      return <TrendingDown className="h-3 w-3" />
    default:
      return <Minus className="h-3 w-3" />
  }
}

const getTrendColor = (direction: "up" | "down" | "neutral") => {
  switch (direction) {
    case "up":
      return "text-success border-success/20 bg-success/5"
    case "down":
      return "text-destructive border-destructive/20 bg-destructive/5"
    default:
      return "text-muted-foreground border-muted/20 bg-muted/5"
  }
}

const getVariantStyles = (variant: Stat["variant"]) => {
  switch (variant) {
    case "primary":
      return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
    case "success":
      return "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
    case "warning":
      return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10"
    case "accent":
      return "border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10"
    default:
      return "border-border/50 bg-gradient-to-br from-muted/20 to-muted/30"
  }
}

const getIconColor = (variant: Stat["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary"
    case "success":
      return "text-success"
    case "warning":
      return "text-warning"
    case "accent":
      return "text-accent"
    default:
      return "text-muted-foreground"
  }
}

export function StatsGrid({ stats, className, columns = 3 }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {stats.map((stat) => {
        const IconComponent = stat.icon || Target

        return (
          <Card key={stat.id} className={cn("border-0 shadow-sm", getVariantStyles(stat.variant))}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className={cn("h-5 w-5", getIconColor(stat.variant))} />
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </div>
                {stat.trend && (
                  <Badge variant="outline" className={cn("gap-1 text-xs", getTrendColor(stat.trend.direction))}>
                    {getTrendIcon(stat.trend.direction)}
                    {stat.trend.value}
                  </Badge>
                )}
              </div>
              {stat.description && <CardDescription className="text-xs">{stat.description}</CardDescription>}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
              </div>
              {stat.trend?.label && <p className="text-xs text-muted-foreground mt-1">{stat.trend.label}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Example usage with predefined stat configurations
export const createHealthStats = (data: {
  weight?: { current: number; change: number }
  bodyFat?: { current: number; change: number }
  muscle?: { current: number; change: number }
  energy?: { current: number; change: number }
  mood?: { current: number; change: number }
  sleep?: { current: number; change: number }
}): Stat[] => {
  const stats: Stat[] = []

  if (data.weight) {
    stats.push({
      id: "weight",
      title: "Weight",
      value: data.weight.current,
      unit: "kg",
      trend: {
        direction: data.weight.change > 0 ? "up" : data.weight.change < 0 ? "down" : "neutral",
        value: `${data.weight.change > 0 ? "+" : ""}${data.weight.change}kg`,
        label: "vs last week",
      },
      icon: Target,
      variant: "primary",
    })
  }

  if (data.bodyFat) {
    stats.push({
      id: "bodyFat",
      title: "Body Fat",
      value: data.bodyFat.current,
      unit: "%",
      trend: {
        direction: data.bodyFat.change < 0 ? "up" : data.bodyFat.change > 0 ? "down" : "neutral",
        value: `${data.bodyFat.change > 0 ? "+" : ""}${data.bodyFat.change}%`,
        label: "vs last month",
      },
      icon: Zap,
      variant: "success",
    })
  }

  if (data.energy) {
    stats.push({
      id: "energy",
      title: "Energy Level",
      value: data.energy.current,
      unit: "/10",
      trend: {
        direction: data.energy.change > 0 ? "up" : data.energy.change < 0 ? "down" : "neutral",
        value: `${data.energy.change > 0 ? "+" : ""}${data.energy.change}`,
        label: "vs yesterday",
      },
      icon: Zap,
      variant: "accent",
    })
  }

  if (data.mood) {
    stats.push({
      id: "mood",
      title: "Mood Score",
      value: data.mood.current,
      unit: "/10",
      trend: {
        direction: data.mood.change > 0 ? "up" : data.mood.change < 0 ? "down" : "neutral",
        value: `${data.mood.change > 0 ? "+" : ""}${data.mood.change}`,
        label: "7-day average",
      },
      icon: Heart,
      variant: "warning",
    })
  }

  return stats
}
