"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileStatProps {
  label: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "stable"
  icon?: React.ReactNode
  color?: "primary" | "success" | "warning" | "accent"
}

export function MobileStat({ label, value, change, trend, icon, color = "primary" }: MobileStatProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    accent: "bg-accent/10 text-accent",
  }

  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-1">
                {trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                <span className={cn("text-xs font-medium", trendColor)}>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", colorClasses[color])}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface MobileStatsGridProps {
  stats: MobileStatProps[]
  columns?: 1 | 2
}

export function MobileStatsGrid({ stats, columns = 2 }: MobileStatsGridProps) {
  return (
    <div className={cn("grid gap-3", columns === 1 ? "grid-cols-1" : "grid-cols-2")}>
      {stats.map((stat, index) => (
        <MobileStat key={index} {...stat} />
      ))}
    </div>
  )
}
