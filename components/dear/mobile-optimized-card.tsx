"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileOptimizedCardProps {
  title: string
  description?: string
  children: React.ReactNode
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  menu?: boolean
  className?: string
  compact?: boolean
}

export function MobileOptimizedCard({
  title,
  description,
  children,
  action,
  menu = false,
  className,
  compact = false,
}: MobileOptimizedCardProps) {
  return (
    <Card className={cn("border-0 shadow-sm bg-white", className)}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className={cn("text-base font-semibold", compact && "text-sm")}>{title}</CardTitle>
            {description && (
              <CardDescription className={cn("text-sm mt-1", compact && "text-xs")}>{description}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            {action && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 p-1"
                onClick={action.onClick}
              >
                {action.label}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            {menu && (
              <Button variant="ghost" size="sm" className="p-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("pt-0", compact && "py-2")}>{children}</CardContent>
    </Card>
  )
}
