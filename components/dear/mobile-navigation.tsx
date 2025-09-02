"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Target, Brain, Users, BarChart3, Plus, Bell, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/transformation", label: "Transform", icon: Target },
  { href: "/mindfulness", label: "Mind", icon: Brain },
  { href: "/community", label: "Community", icon: Users },
  { href: "/progress", label: "Progress", icon: BarChart3 },
]

interface MobileNavigationProps {
  className?: string
  unreadNotifications?: number
}

export function MobileNavigation({ className, unreadNotifications = 0 }: MobileNavigationProps) {
  const pathname = usePathname()
  const [showQuickActions, setShowQuickActions] = useState(false)

  const quickActions = [
    { href: "/workout", label: "Start Workout", icon: Target },
    { href: "/journal", label: "Journal", icon: MessageCircle },
    { href: "/mindfulness", label: "Meditate", icon: Brain },
    { href: "/transformation", label: "Take Photo", icon: Plus },
  ]

  return (
    <>
      {/* Quick Action Overlay */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowQuickActions(false)}>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowQuickActions(false)}
                >
                  <action.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden",
          "safe-area-inset-bottom",
          className,
        )}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1",
                  isActive ? "text-primary bg-primary/10" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            )
          })}

          {/* Center Action Button */}
          <Button
            size="sm"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg"
            onClick={() => setShowQuickActions(!showQuickActions)}
          >
            <Plus className={cn("h-5 w-5 transition-transform", showQuickActions && "rotate-45")} />
          </Button>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0 flex-1 relative"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="text-xs font-medium text-gray-500">Alerts</span>
            {unreadNotifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadNotifications > 99 ? "99+" : unreadNotifications}
              </Badge>
            )}
          </Link>
        </div>
      </nav>
    </>
  )
}
