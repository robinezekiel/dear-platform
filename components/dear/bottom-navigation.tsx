"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Brain, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/transformation", label: "Transform", icon: Activity },
  { href: "/mental-health", label: "Wellness", icon: Brain },
  { href: "/community", label: "Community", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <nav className="flex items-center justify-around py-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className={cn(isActive && "text-primary")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
