import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressCardProps {
  title: string
  description?: string
  currentValue: number
  targetValue: number
  unit: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
  variant?: "default" | "success" | "warning" | "accent"
}

export function ProgressCard({
  title,
  description,
  currentValue,
  targetValue,
  unit,
  trend,
  trendValue,
  className,
  variant = "default",
}: ProgressCardProps) {
  const progressPercentage = Math.min((currentValue / targetValue) * 100, 100)

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success"
      case "down":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getCardVariant = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10"
      case "accent":
        return "border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10"
      default:
        return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
    }
  }

  return (
    <Card className={cn("border-0 shadow-sm", getCardVariant(), className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {trend && trendValue && (
            <Badge variant="outline" className={cn("gap-1", getTrendColor())}>
              {getTrendIcon()}
              {trendValue}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">
            {currentValue}
            <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            Goal: {targetValue} {unit}
          </span>
        </div>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercentage.toFixed(0)}% complete</span>
            <span>
              {Math.max(targetValue - currentValue, 0)} {unit} to go
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
