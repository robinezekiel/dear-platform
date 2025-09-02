import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
  showHeader?: boolean
  showContent?: boolean
  lines?: number
}

export function LoadingCard({ className, showHeader = true, showContent = true, lines = 3 }: LoadingCardProps) {
  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </CardHeader>
      )}
      {showContent && (
        <CardContent className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      )}
    </Card>
  )
}

interface LoadingDashboardProps {
  className?: string
}

export function LoadingDashboard({ className }: LoadingDashboardProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingCard key={i} showHeader={false} lines={2} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LoadingCard lines={6} />
        <LoadingCard lines={4} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <LoadingCard key={i} lines={3} />
        ))}
      </div>
    </div>
  )
}

interface LoadingPageProps {
  className?: string
  message?: string
}

export function LoadingPage({ className, message = "Loading your transformation journey..." }: LoadingPageProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5",
        className,
      )}
    >
      <div className="text-center space-y-6">
        <div className="relative">
          <Heart className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <div className="absolute inset-0 h-16 w-16 mx-auto">
            <Loader2 className="h-16 w-16 animate-spin text-primary/30" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">DEAR</h2>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
