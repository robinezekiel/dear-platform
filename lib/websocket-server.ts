import { Server as SocketIOServer } from "socket.io"
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"

interface SocketServer extends HTTPServer {
  io?: SocketIOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends Response {
  socket: SocketWithIO
}

export interface WebSocketUser {
  id: string
  name: string
  avatar?: string
  status: "online" | "away" | "busy" | "offline"
  currentRoom?: string
  lastSeen: Date
}

export interface RealTimeEvent {
  type: "notification" | "chat_message" | "activity_update" | "progress_update" | "achievement" | "system"
  userId?: string
  roomId?: string
  data: any
  timestamp: Date
  priority: "low" | "medium" | "high" | "urgent"
}

export interface ChatMessage {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  roomId: string
  content: string
  type: "text" | "image" | "file" | "system"
  timestamp: Date
  edited?: boolean
  reactions?: { emoji: string; users: string[] }[]
}

export interface NotificationPayload {
  id: string
  userId: string
  type: "achievement" | "milestone" | "social" | "system" | "reminder"
  title: string
  message: string
  data?: any
  read: boolean
  timestamp: Date
  expiresAt?: Date
}

export class WebSocketManager {
  private static instance: WebSocketManager
  private io: SocketIOServer | null = null
  private connectedUsers = new Map<string, WebSocketUser>()
  private userSockets = new Map<string, string>() // userId -> socketId
  private socketUsers = new Map<string, string>() // socketId -> userId
  private rooms = new Map<string, Set<string>>() // roomId -> Set<userId>

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

  public initialize(server: HTTPServer): SocketIOServer {
    if (this.io) {
      return this.io
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
      transports: ["websocket", "polling"],
    })

    this.setupEventHandlers()
    console.log("[WebSocket] Server initialized")

    return this.io
  }

  private setupEventHandlers() {
    if (!this.io) return

    this.io.on("connection", (socket) => {
      console.log(`[WebSocket] Client connected: ${socket.id}`)

      // Handle user authentication
      socket.on("authenticate", async (data: { userId: string; token: string }) => {
        try {
          // Validate user token (implement your auth logic)
          const isValid = await this.validateUserToken(data.userId, data.token)

          if (isValid) {
            await this.handleUserConnection(socket, data.userId)
            socket.emit("authenticated", { success: true })
          } else {
            socket.emit("authentication_error", { error: "Invalid token" })
            socket.disconnect()
          }
        } catch (error) {
          console.error("[WebSocket] Authentication error:", error)
          socket.emit("authentication_error", { error: "Authentication failed" })
          socket.disconnect()
        }
      })

      // Handle chat messages
      socket.on("send_message", async (data: Omit<ChatMessage, "id" | "timestamp">) => {
        try {
          const message = await this.handleChatMessage(socket, data)
          if (message) {
            // Broadcast to room
            this.io?.to(data.roomId).emit("new_message", message)

            // Store message in database
            await this.storeChatMessage(message)
          }
        } catch (error) {
          console.error("[WebSocket] Chat message error:", error)
          socket.emit("message_error", { error: "Failed to send message" })
        }
      })

      // Handle room joining
      socket.on("join_room", async (data: { roomId: string; roomType: "chat" | "support_group" | "challenge" }) => {
        try {
          const userId = this.socketUsers.get(socket.id)
          if (userId) {
            await this.handleRoomJoin(socket, userId, data.roomId, data.roomType)
          }
        } catch (error) {
          console.error("[WebSocket] Room join error:", error)
        }
      })

      // Handle room leaving
      socket.on("leave_room", async (data: { roomId: string }) => {
        try {
          const userId = this.socketUsers.get(socket.id)
          if (userId) {
            await this.handleRoomLeave(socket, userId, data.roomId)
          }
        } catch (error) {
          console.error("[WebSocket] Room leave error:", error)
        }
      })

      // Handle typing indicators
      socket.on("typing_start", (data: { roomId: string }) => {
        const userId = this.socketUsers.get(socket.id)
        if (userId) {
          socket.to(data.roomId).emit("user_typing", { userId, isTyping: true })
        }
      })

      socket.on("typing_stop", (data: { roomId: string }) => {
        const userId = this.socketUsers.get(socket.id)
        if (userId) {
          socket.to(data.roomId).emit("user_typing", { userId, isTyping: false })
        }
      })

      // Handle status updates
      socket.on("update_status", async (data: { status: WebSocketUser["status"] }) => {
        try {
          const userId = this.socketUsers.get(socket.id)
          if (userId) {
            await this.updateUserStatus(userId, data.status)
          }
        } catch (error) {
          console.error("[WebSocket] Status update error:", error)
        }
      })

      // Handle progress updates
      socket.on("progress_update", async (data: any) => {
        try {
          const userId = this.socketUsers.get(socket.id)
          if (userId) {
            await this.handleProgressUpdate(userId, data)
          }
        } catch (error) {
          console.error("[WebSocket] Progress update error:", error)
        }
      })

      // Handle disconnection
      socket.on("disconnect", async (reason) => {
        console.log(`[WebSocket] Client disconnected: ${socket.id}, reason: ${reason}`)
        await this.handleUserDisconnection(socket)
      })
    })
  }

  private async handleUserConnection(socket: any, userId: string): Promise<void> {
    // Store socket mapping
    this.userSockets.set(userId, socket.id)
    this.socketUsers.set(socket.id, userId)

    // Get user data
    const userData = await this.getUserData(userId)

    // Create user session
    const user: WebSocketUser = {
      id: userId,
      name: userData.name || "Unknown User",
      avatar: userData.avatar,
      status: "online",
      lastSeen: new Date(),
    }

    this.connectedUsers.set(userId, user)

    // Join user to their personal room
    socket.join(`user_${userId}`)

    // Notify user's friends about online status
    await this.broadcastUserStatusChange(userId, "online")

    // Send pending notifications
    await this.sendPendingNotifications(userId)

    console.log(`[WebSocket] User ${userId} connected and authenticated`)
  }

  private async handleUserDisconnection(socket: any): Promise<void> {
    const userId = this.socketUsers.get(socket.id)

    if (userId) {
      // Update user status
      const user = this.connectedUsers.get(userId)
      if (user) {
        user.status = "offline"
        user.lastSeen = new Date()
      }

      // Clean up mappings
      this.userSockets.delete(userId)
      this.socketUsers.delete(socket.id)

      // Remove from rooms
      const userRooms = Array.from(socket.rooms)
      for (const roomId of userRooms) {
        if (roomId !== socket.id) {
          const roomUsers = this.rooms.get(roomId)
          if (roomUsers) {
            roomUsers.delete(userId)
            if (roomUsers.size === 0) {
              this.rooms.delete(roomId)
            }
          }
        }
      }

      // Notify friends about offline status
      await this.broadcastUserStatusChange(userId, "offline")

      console.log(`[WebSocket] User ${userId} disconnected`)
    }
  }

  private async handleChatMessage(
    socket: any,
    messageData: Omit<ChatMessage, "id" | "timestamp">,
  ): Promise<ChatMessage | null> {
    const userId = this.socketUsers.get(socket.id)
    if (!userId) return null

    // Validate message
    if (!messageData.content.trim() || messageData.content.length > 1000) {
      return null
    }

    // Check if user is in the room
    const roomUsers = this.rooms.get(messageData.roomId)
    if (!roomUsers || !roomUsers.has(userId)) {
      return null
    }

    // Create message
    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...messageData,
      timestamp: new Date(),
    }

    return message
  }

  private async handleRoomJoin(socket: any, userId: string, roomId: string, roomType: string): Promise<void> {
    // Validate room access
    const hasAccess = await this.validateRoomAccess(userId, roomId, roomType)
    if (!hasAccess) {
      socket.emit("room_error", { error: "Access denied to room" })
      return
    }

    // Join socket room
    socket.join(roomId)

    // Update room tracking
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set())
    }
    this.rooms.get(roomId)!.add(userId)

    // Update user's current room
    const user = this.connectedUsers.get(userId)
    if (user) {
      user.currentRoom = roomId
    }

    // Notify room about new user
    socket.to(roomId).emit("user_joined", {
      userId,
      userName: user?.name || "Unknown User",
      timestamp: new Date(),
    })

    // Send recent messages to user
    const recentMessages = await this.getRecentMessages(roomId, 50)
    socket.emit("room_messages", { roomId, messages: recentMessages })

    console.log(`[WebSocket] User ${userId} joined room ${roomId}`)
  }

  private async handleRoomLeave(socket: any, userId: string, roomId: string): Promise<void> {
    // Leave socket room
    socket.leave(roomId)

    // Update room tracking
    const roomUsers = this.rooms.get(roomId)
    if (roomUsers) {
      roomUsers.delete(userId)
      if (roomUsers.size === 0) {
        this.rooms.delete(roomId)
      }
    }

    // Update user's current room
    const user = this.connectedUsers.get(userId)
    if (user && user.currentRoom === roomId) {
      user.currentRoom = undefined
    }

    // Notify room about user leaving
    socket.to(roomId).emit("user_left", {
      userId,
      userName: user?.name || "Unknown User",
      timestamp: new Date(),
    })

    console.log(`[WebSocket] User ${userId} left room ${roomId}`)
  }

  private async handleProgressUpdate(userId: string, progressData: any): Promise<void> {
    // Broadcast progress update to user's friends and groups
    const userConnections = await this.getUserConnections(userId)

    const progressEvent: RealTimeEvent = {
      type: "progress_update",
      userId,
      data: progressData,
      timestamp: new Date(),
      priority: "medium",
    }

    // Send to friends
    for (const friendId of userConnections.friends) {
      await this.sendToUser(friendId, "progress_update", progressEvent)
    }

    // Send to support groups
    for (const groupId of userConnections.groups) {
      this.io?.to(`group_${groupId}`).emit("progress_update", progressEvent)
    }
  }

  // Public methods for external use
  public async sendNotification(userId: string, notification: NotificationPayload): Promise<void> {
    const socketId = this.userSockets.get(userId)

    if (socketId && this.io) {
      // User is online, send immediately
      this.io.to(`user_${userId}`).emit("notification", notification)
    } else {
      // User is offline, store for later
      await this.storeNotificationForLater(userId, notification)
    }
  }

  public async sendToUser(userId: string, event: string, data: any): Promise<void> {
    const socketId = this.userSockets.get(userId)

    if (socketId && this.io) {
      this.io.to(`user_${userId}`).emit(event, data)
    }
  }

  public async broadcastToRoom(roomId: string, event: string, data: any): Promise<void> {
    if (this.io) {
      this.io.to(roomId).emit(event, data)
    }
  }

  public async broadcastAchievement(userId: string, achievement: any): Promise<void> {
    const user = this.connectedUsers.get(userId)
    if (!user) return

    const achievementEvent: RealTimeEvent = {
      type: "achievement",
      userId,
      data: {
        ...achievement,
        userName: user.name,
        userAvatar: user.avatar,
      },
      timestamp: new Date(),
      priority: "high",
    }

    // Broadcast to all connected users (public celebration)
    if (this.io) {
      this.io.emit("global_achievement", achievementEvent)
    }

    // Send personal notification
    await this.sendNotification(userId, {
      id: `achievement_${Date.now()}`,
      userId,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: `Congratulations on earning "${achievement.name}"!`,
      data: achievement,
      read: false,
      timestamp: new Date(),
    })
  }

  public getConnectedUsers(): WebSocketUser[] {
    return Array.from(this.connectedUsers.values())
  }

  public getUserStatus(userId: string): WebSocketUser | null {
    return this.connectedUsers.get(userId) || null
  }

  public getRoomUsers(roomId: string): string[] {
    return Array.from(this.rooms.get(roomId) || [])
  }

  // Private helper methods
  private async validateUserToken(userId: string, token: string): Promise<boolean> {
    // Implement your token validation logic
    // This should verify the JWT token and ensure the user exists
    return true // Simplified for demo
  }

  private async validateRoomAccess(userId: string, roomId: string, roomType: string): Promise<boolean> {
    // Implement room access validation
    // Check if user has permission to join this room
    return true // Simplified for demo
  }

  private async getUserData(userId: string): Promise<any> {
    // Fetch user data from database
    return {
      name: `User ${userId}`,
      avatar: `/api/placeholder/40/40`,
    }
  }

  private async getUserConnections(userId: string): Promise<{ friends: string[]; groups: string[] }> {
    // Fetch user's social connections
    return {
      friends: [], // Array of friend user IDs
      groups: [], // Array of group IDs
    }
  }

  private async broadcastUserStatusChange(userId: string, status: string): Promise<void> {
    const connections = await this.getUserConnections(userId)

    for (const friendId of connections.friends) {
      await this.sendToUser(friendId, "friend_status_change", {
        userId,
        status,
        timestamp: new Date(),
      })
    }
  }

  private async updateUserStatus(userId: string, status: WebSocketUser["status"]): Promise<void> {
    const user = this.connectedUsers.get(userId)
    if (user) {
      user.status = status
      await this.broadcastUserStatusChange(userId, status)
    }
  }

  private async sendPendingNotifications(userId: string): Promise<void> {
    // Fetch and send any pending notifications for the user
    const pendingNotifications = await this.getPendingNotifications(userId)

    for (const notification of pendingNotifications) {
      await this.sendNotification(userId, notification)
    }
  }

  private async storeChatMessage(message: ChatMessage): Promise<void> {
    // Store message in database
    console.log(`[WebSocket] Storing message: ${message.id}`)
  }

  private async getRecentMessages(roomId: string, limit: number): Promise<ChatMessage[]> {
    // Fetch recent messages from database
    return []
  }

  private async storeNotificationForLater(userId: string, notification: NotificationPayload): Promise<void> {
    // Store notification in database for offline user
    console.log(`[WebSocket] Storing notification for offline user: ${userId}`)
  }

  private async getPendingNotifications(userId: string): Promise<NotificationPayload[]> {
    // Fetch pending notifications from database
    return []
  }
}

export const webSocketManager = WebSocketManager.getInstance()
