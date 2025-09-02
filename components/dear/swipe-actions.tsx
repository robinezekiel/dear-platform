"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SwipeAction {
  icon: React.ReactNode
  label: string
  color: "success" | "destructive" | "primary"
  onAction: () => void
}

interface SwipeActionsProps {
  children: React.ReactNode
  actions: SwipeAction[]
  className?: string
}

export function SwipeActions({ children, actions, className }: SwipeActionsProps) {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const maxSwipe = 120
  const threshold = 60

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const diff = startX - currentX
    const newOffset = Math.max(0, Math.min(maxSwipe, diff))
    setSwipeOffset(newOffset)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (swipeOffset < threshold) {
      setSwipeOffset(0)
    } else {
      setSwipeOffset(maxSwipe)
    }
  }

  const handleAction = (action: SwipeAction) => {
    action.onAction()
    setSwipeOffset(0)
  }

  const getActionColor = (color: string) => {
    switch (color) {
      case "success":
        return "bg-green-500 text-white"
      case "destructive":
        return "bg-red-500 text-white"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-white rounded-lg", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Actions Background */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        {actions.map((action, index) => (
          <Button
            key={index}
            size="sm"
            className={cn("h-full rounded-none px-4", getActionColor(action.color))}
            onClick={() => handleAction(action)}
          >
            {action.icon}
            <span className="sr-only">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative bg-white transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(-${swipeOffset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
