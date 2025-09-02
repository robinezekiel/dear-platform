"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Bot, User, CheckCheck, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    type: "user" | "ai" | "provider" | "member"
  }
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
  type: "text" | "image" | "file" | "system"
  reactions?: Array<{ emoji: string; count: number; users: string[] }>
}

interface ChatInterfaceProps {
  chatId: string
  chatType: "ai-therapy" | "provider" | "support-group" | "direct"
  title: string
  subtitle?: string
  participants?: Array<{ id: string; name: string; avatar?: string; status: "online" | "offline" | "away" }>
  onSendMessage?: (message: string) => void
  className?: string
}

export function ChatInterface({
  chatId,
  chatType,
  title,
  subtitle,
  participants = [],
  onSendMessage,
  className,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock messages for demo
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        content: "Hello! I'm here to support you on your wellness journey. How are you feeling today?",
        sender: {
          id: "ai",
          name: chatType === "ai-therapy" ? "DEAR AI Companion" : "Dr. Sarah Johnson",
          avatar: "/ai-avatar.png",
          type: chatType === "ai-therapy" ? "ai" : "provider",
        },
        timestamp: new Date(Date.now() - 300000),
        status: "read",
        type: "text",
      },
      {
        id: "2",
        content:
          "I've been feeling a bit overwhelmed lately with my health goals. Sometimes I don't know where to start.",
        sender: {
          id: "user",
          name: "You",
          type: "user",
        },
        timestamp: new Date(Date.now() - 240000),
        status: "read",
        type: "text",
      },
      {
        id: "3",
        content:
          "That's completely understandable, and you're not alone in feeling this way. Let's break this down together. What specific area would you like to focus on first - nutrition, exercise, or mental wellness?",
        sender: {
          id: "ai",
          name: chatType === "ai-therapy" ? "DEAR AI Companion" : "Dr. Sarah Johnson",
          avatar: "/ai-avatar.png",
          type: chatType === "ai-therapy" ? "ai" : "provider",
        },
        timestamp: new Date(Date.now() - 180000),
        status: "read",
        type: "text",
        reactions: [{ emoji: "❤️", count: 1, users: ["user"] }],
      },
    ]
    setMessages(mockMessages)
  }, [chatType])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: "user",
        name: "You",
        type: "user",
      },
      timestamp: new Date(),
      status: "sending",
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    onSendMessage?.(newMessage)

    // Simulate AI response for AI therapy chat
    if (chatType === "ai-therapy") {
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Thank you for sharing that with me. Based on what you've told me, I think we can create a manageable plan that focuses on small, achievable steps. Would you like me to suggest some specific actions you can take this week?",
          sender: {
            id: "ai",
            name: "DEAR AI Companion",
            avatar: "/ai-avatar.png",
            type: "ai",
          },
          timestamp: new Date(),
          status: "sent",
          type: "text",
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMessageIcon = (sender: Message["sender"]) => {
    switch (sender.type) {
      case "ai":
        return <Bot className="h-4 w-4" />
      case "provider":
        return <User className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-primary" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />
      default:
        return null
    }
  }

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      {/* Chat Header */}
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={chatType === "ai-therapy" ? "/ai-avatar.png" : "/provider-avatar.png"} />
              <AvatarFallback>
                {chatType === "ai-therapy" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              {chatType === "support-group" && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <span className="text-xs text-muted-foreground">{participants.length} members online</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chatType === "provider" && (
              <>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.sender.type === "user" ? "justify-end" : "justify-start")}
              >
                {message.sender.type !== "user" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{getMessageIcon(message.sender)}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn("max-w-[70%] space-y-1", message.sender.type === "user" ? "items-end" : "items-start")}
                >
                  {message.sender.type !== "user" && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{message.sender.name}</span>
                      {message.sender.type === "ai" && (
                        <Badge variant="secondary" className="text-xs">
                          AI
                        </Badge>
                      )}
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm",
                      message.sender.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    {message.sender.type === "user" && getStatusIcon(message.status)}
                  </div>

                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex items-center gap-1">
                      {message.reactions.map((reaction, index) => (
                        <Button key={index} variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.sender.type === "user" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-10"
            />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
