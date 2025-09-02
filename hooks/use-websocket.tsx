"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { io, type Socket } from "socket.io-client"

interface WebSocketContextType {
  socket: Socket | null
  isConnected: boolean
  connectionError: string | null
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  connectionError: null,
})

interface WebSocketProviderProps {
  children: ReactNode
  userId?: string
  token?: string
}

export function WebSocketProvider({ children, userId, token }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId || !token) return

    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000", {
      transports: ["websocket", "polling"],
      autoConnect: false,
    })

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("[WebSocket] Connected to server")
      setIsConnected(true)
      setConnectionError(null)

      // Authenticate user
      socketInstance.emit("authenticate", { userId, token })
    })

    socketInstance.on("disconnect", (reason) => {
      console.log("[WebSocket] Disconnected from server:", reason)
      setIsConnected(false)
    })

    socketInstance.on("connect_error", (error) => {
      console.error("[WebSocket] Connection error:", error)
      setConnectionError(error.message)
      setIsConnected(false)
    })

    socketInstance.on("authenticated", (data) => {
      console.log("[WebSocket] Authentication successful")
    })

    socketInstance.on("authentication_error", (data) => {
      console.error("[WebSocket] Authentication failed:", data.error)
      setConnectionError(data.error)
    })

    // Connect to server
    socketInstance.connect()
    setSocket(socketInstance)

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect()
      setSocket(null)
      setIsConnected(false)
    }
  }, [userId, token])

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, connectionError }}>{children}</WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}

// Custom hooks for specific WebSocket functionality
export function useRealTimeNotifications() {
  const { socket } = useWebSocket()
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (!socket) return

    const handleNotification = (notification: any) => {
      setNotifications((prev) => [notification, ...prev])
    }

    socket.on("notification", handleNotification)

    return () => {
      socket.off("notification", handleNotification)
    }
  }, [socket])

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  return { notifications, markAsRead }
}

export function useRealTimeActivity() {
  const { socket } = useWebSocket()
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    if (!socket) return

    const handleActivityUpdate = (activity: any) => {
      setActivities((prev) => [activity, ...prev.slice(0, 49)]) // Keep last 50 activities
    }

    const handleProgressUpdate = (progress: any) => {
      setActivities((prev) => [{ type: "progress", ...progress }, ...prev.slice(0, 49)])
    }

    const handleAchievement = (achievement: any) => {
      setActivities((prev) => [{ type: "achievement", ...achievement }, ...prev.slice(0, 49)])
    }

    socket.on("activity_update", handleActivityUpdate)
    socket.on("progress_update", handleProgressUpdate)
    socket.on("global_achievement", handleAchievement)

    return () => {
      socket.off("activity_update", handleActivityUpdate)
      socket.off("progress_update", handleProgressUpdate)
      socket.off("global_achievement", handleAchievement)
    }
  }, [socket])

  return { activities }
}
