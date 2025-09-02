import { Server as SocketIOServer } from "socket.io"
import type { Server as HTTPServer } from "http"
import { verifyToken } from "./auth"

export class WebSocketManager {
  private io: SocketIOServer
  private userSockets: Map<string, string> = new Map()

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    })

    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token
        const user = await verifyToken(token)
        if (user) {
          socket.userId = user.id
          next()
        } else {
          next(new Error("Authentication failed"))
        }
      } catch (error) {
        next(new Error("Authentication failed"))
      }
    })

    this.io.on("connection", (socket) => {
      console.log(`[v0] User ${socket.userId} connected`)
      this.userSockets.set(socket.userId, socket.id)

      // Join user-specific room
      socket.join(`user:${socket.userId}`)

      // Handle therapy chat
      socket.on("join-therapy-session", (sessionId) => {
        socket.join(`therapy:${sessionId}`)
      })

      // Handle community chat
      socket.on("join-community-room", (roomId) => {
        socket.join(`community:${roomId}`)
      })

      // Handle chat messages
      socket.on("send-message", async (data) => {
        const { roomId, message, type } = data

        // Broadcast to room
        socket.to(roomId).emit("new-message", {
          id: Date.now(),
          userId: socket.userId,
          message,
          type,
          timestamp: new Date().toISOString(),
        })

        // Store message in database
        await this.storeMessage(roomId, socket.userId, message, type)
      })

      // Handle typing indicators
      socket.on("typing", (data) => {
        socket.to(data.roomId).emit("user-typing", {
          userId: socket.userId,
          isTyping: data.isTyping,
        })
      })

      socket.on("disconnect", () => {
        console.log(`[v0] User ${socket.userId} disconnected`)
        this.userSockets.delete(socket.userId)
      })
    })
  }

  private async storeMessage(roomId: string, userId: string, message: string, type: string) {
    // Implementation would store message in database
    console.log(`[v0] Storing message: ${message} from user ${userId} in room ${roomId}`)
  }

  public sendNotification(userId: string, notification: any) {
    const socketId = this.userSockets.get(userId)
    if (socketId) {
      this.io.to(`user:${userId}`).emit("notification", notification)
    }
  }

  public broadcastToRoom(roomId: string, event: string, data: any) {
    this.io.to(roomId).emit(event, data)
  }
}
