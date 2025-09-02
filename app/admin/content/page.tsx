"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  MessageSquare,
  Users,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Trash2,
} from "lucide-react"

const mockUser = {
  name: "Admin User",
  email: "admin@dear.com",
  avatar: "/admin-avatar.png",
  role: "admin",
}

interface ContentItem {
  id: string
  type: "post" | "comment" | "story" | "provider_profile"
  title: string
  author: string
  content: string
  status: "pending" | "approved" | "rejected" | "flagged"
  createdAt: string
  reports: number
  category: string
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "post",
    title: "My 30-day transformation journey",
    author: "Alex Johnson",
    content: "I wanted to share my incredible journey over the past 30 days...",
    status: "approved",
    createdAt: "2024-01-20",
    reports: 0,
    category: "Success Story",
  },
  {
    id: "2",
    type: "comment",
    title: "Comment on workout routine",
    author: "Mike Chen",
    content: "This workout routine is amazing! I've seen great results...",
    status: "flagged",
    createdAt: "2024-01-19",
    reports: 3,
    category: "Fitness",
  },
  {
    id: "3",
    type: "story",
    title: "Overcoming addiction with DEAR",
    author: "Sarah Wilson",
    content: "My recovery journey has been challenging but rewarding...",
    status: "pending",
    createdAt: "2024-01-18",
    reports: 0,
    category: "Recovery",
  },
]

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "flagged":
        return <Badge className="bg-orange-100 text-orange-800">Flagged</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <FileText className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "story":
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredContent = content.filter((item) => {
    if (activeTab === "all") return true
    return item.status === activeTab
  })

  const handleApprove = (id: string) => {
    setContent((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item)))
  }

  const handleReject = (id: string) => {
    setContent((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" as const } : item)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Content Moderation
            </h1>
            <p className="text-muted-foreground mt-2">Review and moderate user-generated content</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-yellow-600">Needs attention</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged Content</p>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-red-600">High priority</p>
                </div>
                <Flag className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-green-600">+12% from yesterday</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-orange-600">This week</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Content Review Queue</CardTitle>
            <CardDescription>Review and moderate user-generated content</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Content</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContent.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="max-w-xs">
                              <div className="font-medium truncate">{item.title}</div>
                              <div className="text-sm text-muted-foreground truncate">{item.content}</div>
                            </div>
                          </TableCell>
                          <TableCell>{item.author}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <span className="capitalize">{item.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            {item.reports > 0 ? (
                              <Badge variant="destructive">{item.reports}</Badge>
                            ) : (
                              <span className="text-muted-foreground">0</span>
                            )}
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {item.status === "pending" || item.status === "flagged" ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleApprove(item.id)}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleReject(item.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
