import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { NotificationManager } from "@/lib/notifications"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notificationManager = NotificationManager.getInstance()
    const notifications = await notificationManager.getUserNotifications(user.id)
    const unreadCount = await notificationManager.getUnreadCount(user.id)

    return NextResponse.json({
      notifications,
      unreadCount,
    })
  } catch (error) {
    console.error("[v0] Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, title, message, data } = await request.json()

    const notificationManager = NotificationManager.getInstance()
    const notification = await notificationManager.createNotification({
      userId: user.id,
      type,
      title,
      message,
      data,
    })

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("[v0] Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
