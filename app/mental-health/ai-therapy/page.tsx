"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { MessageCircle, Send, Bot, User, Heart, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  mood?: "supportive" | "concerned" | "encouraging"
}

export default function AITherapyPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello, I'm DEAR's AI therapy companion. I'm here to provide a safe, judgment-free space for you to express your thoughts and feelings. How are you doing today?",
      timestamp: new Date(),
      mood: "supportive",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        mood: "supportive",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I hear you, and I want you to know that your feelings are completely valid. Can you tell me more about what's been weighing on your mind?",
      "Thank you for sharing that with me. It takes courage to open up about difficult feelings. What do you think might help you feel more supported right now?",
      "I can sense that you're going through something challenging. Remember that it's okay to not be okay sometimes. What has helped you cope with similar feelings in the past?",
      "Your awareness of your emotions shows real strength. Sometimes just acknowledging how we feel is the first step toward healing. What would you like to explore together?",
      "I appreciate you trusting me with your thoughts. Everyone deserves to feel heard and understood. What's one small thing that might bring you a moment of peace today?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Crisis Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">
                Crisis Support: If you're having thoughts of self-harm, please reach out immediately.
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
              988 Lifeline
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Therapy Companion</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A safe, confidential space for therapeutic conversations. Our AI is trained in evidence-based therapeutic
            techniques.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              Confidential
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Heart className="h-3 w-3 mr-1" />
              Judgment-Free
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              24/7 Available
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MessageCircle className="h-5 w-5" />
              Therapy Session
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "ai" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-slate-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Share what's on your mind..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                This AI companion provides support but is not a replacement for professional therapy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link href="/mental-health/mood-tracking">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-teal-200">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-teal-900 mb-1">Track Your Mood</h3>
                <p className="text-sm text-teal-700">Monitor emotional patterns</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/mental-health/coping">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-purple-900 mb-1">Coping Strategies</h3>
                <p className="text-sm text-purple-700">Learn healthy coping skills</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/providers?category=mental-health">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-blue-900 mb-1">Find a Therapist</h3>
                <p className="text-sm text-blue-700">Professional support</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
