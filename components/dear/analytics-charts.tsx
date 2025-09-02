"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ChartData {
  label: string
  value: number
  change?: number
  trend?: "up" | "down" | "stable"
}

interface AnalyticsChartProps {
  title: string
  description?: string
  data: ChartData[]
  type?: "line" | "bar" | "pie"
  height?: number
}

export function AnalyticsChart({ title, description, data, type = "line", height = 200 }: AnalyticsChartProps) {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex items-center gap-2">
            {data[0]?.trend && getTrendIcon(data[0].trend)}
            {data[0]?.change && (
              <span className={`text-sm font-medium ${getTrendColor(data[0].trend)}`}>
                {data[0].change > 0 ? "+" : ""}
                {data[0].change}%
              </span>
            )}
          </div>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center bg-muted/20 rounded-lg" style={{ height: `${height}px` }}>
          <div className="text-center">
            <p className="text-muted-foreground mb-2">{type.charAt(0).toUpperCase() + type.slice(1)} Chart</p>
            <div className="space-y-2">
              {data.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4 text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "stable"
  icon?: React.ReactNode
  description?: string
}

export function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</p>
            {change !== undefined && (
              <p className={`text-xs ${getTrendColor(trend)}`}>
                {change > 0 ? "+" : ""}
                {change}% {description || "from last period"}
              </p>
            )}
          </div>
          {icon && <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
