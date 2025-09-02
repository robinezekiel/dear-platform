import type { NextRequest } from "next/server"
import { webSocketManager } from "@/lib/websocket-server"

export async function GET(request: NextRequest) {
  // This endpoint is used to initialize WebSocket connection
  // In a real implementation, you'd set up the WebSocket server here

  return new Response(
    JSON.stringify({
      message: "WebSocket server endpoint",
      status: "ready",
      timestamp: new Date().toISOString(),
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case "send_notification":
        await webSocketManager.sendNotification(data.userId, data.notification)
        break

      case "broadcast_achievement":
        await webSocketManager.broadcastAchievement(data.userId, data.achievement)
        break

      case "broadcast_to_room":
        await webSocketManager.broadcastToRoom(data.roomId, data.event, data.data)
        break

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400 })
    }

    return new Response(JSON.stringify({ success: true }))
  } catch (error) {
    console.error("WebSocket API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}
