"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { io, type Socket } from "socket.io-client"

interface Message {
  id: number
  userId: string
  message: string
  type: "text" | "therapy" | "system"
  timestamp: string
  userName?: string
  userAvatar?: string
}

interface RealTimeChatProps {
  roomId: string
  roomType: "therapy" | "community"
  currentUserId: string
  currentUserName: string
}

export function RealTimeChat({ roomId, roomType, currentUserId, currentUserName }: RealTimeChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000", {
      auth: {
        token: localStorage.getItem("auth_token"), // Get from your auth system
      },
    })

    newSocket.on("connect", () => {
      console.log("[v0] Connected to chat server")
      setIsConnected(true)

      // Join the appropriate room
      if (roomType === "therapy") {
        newSocket.emit("join-therapy-session", roomId)
      } else {
        newSocket.emit("join-community-room", roomId)
      }
    })

    newSocket.on("disconnect", () => {
      console.log("[v0] Disconnected from chat server")
      setIsConnected(false)
    })

    newSocket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    newSocket.on("user-typing", ({ userId, isTyping }) => {
      if (userId !== currentUserId) {
        setTypingUsers((prev) => {
          if (isTyping) {
            return [...prev.filter((id) => id !== userId), userId]
          } else {
            return prev.filter((id) => id !== userId)
          }
        })
      }
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [roomId, roomType, currentUserId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return

    const messageData = {
      roomId,
      message: newMessage,
      type: "text",
    }

    socket.emit("send-message", messageData)

    // Add message to local state immediately
    const localMessage: Message = {
      id: Date.now(),
      userId: currentUserId,
      message: newMessage,
      type: "text",
      timestamp: new Date().toISOString(),
      userName: currentUserName,
    }

    setMessages((prev) => [...prev, localMessage])
    setNewMessage("")

    // Stop typing indicator
    handleTyping(false)
  }

  const handleTyping = (typing: boolean) => {
    if (!socket) return

    setIsTyping(typing)
    socket.emit("typing", { roomId, isTyping: typing })

    if (typing) {
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        handleTyping(false)
      }, 3000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="flex flex-col h-96 bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {roomType === "therapy" ? "Therapy Session" : "Community Chat"}
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.userId === currentUserId ? "justify-end" : "justify-start"}`}
          >
            {message.userId !== currentUserId && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.userAvatar || "/placeholder.svg"} />
                <AvatarFallback>{message.userName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            )}

            <div className={`max-w-xs lg:max-w-md ${message.userId === currentUserId ? "order-1" : "order-2"}`}>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.userId === currentUserId
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</p>
            </div>

            {message.userId === currentUserId && (
              <Avatar className="w-8 h-8 order-2">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <span>Someone is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value)
              if (e.target.value && !isTyping) {
                handleTyping(true)
              } else if (!e.target.value && isTyping) {
                handleTyping(false)
              }
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={!isConnected}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
