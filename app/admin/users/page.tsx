"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, MoreHorizontal, UserCheck, UserX, Mail, TrendingUp, AlertTriangle, Shield } from "lucide-react"

const mockUser = {
  name: "Admin User",
  email: "admin@dear.com",
  avatar: "/admin-avatar.png",
  role: "admin",
}

interface User {
  id: string
  name: string
  email: string
  role: "member" | "moderator" | "admin"
  status: "active" | "suspended" | "pending"
  joinDate: string
  lastActive: string
  transformationGoals: string[]
  subscriptionTier: "free" | "premium" | "pro"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "member",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    transformationGoals: ["Weight Loss", "Mental Health"],
    subscriptionTier: "premium",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2023-12-01",
    lastActive: "2024-01-19",
    transformationGoals: ["Fitness", "Nutrition"],
    subscriptionTier: "pro",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "member",
    status: "suspended",
    joinDate: "2024-01-10",
    lastActive: "2024-01-18",
    transformationGoals: ["Recovery", "Mindfulness"],
    subscriptionTier: "free",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case "moderator":
        return <Badge className="bg-blue-100 text-blue-800">Moderator</Badge>
      case "member":
        return <Badge variant="outline">Member</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "pro":
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Pro</Badge>
      case "premium":
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">Premium</Badge>
      case "free":
        return <Badge variant="outline">Free</Badge>
      default:
        return <Badge variant="outline">{tier}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <NavigationHeader user={mockUser} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              User Management
            </h1>
            <p className="text-muted-foreground mt-2">Manage user accounts, roles, and platform access</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="gap-2">
              <UserCheck className="h-4 w-4" />
              Invite User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">12,847</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">8,234</p>
                  <p className="text-xs text-green-600">+8% this week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium Users</p>
                  <p className="text-2xl font-bold">3,456</p>
                  <p className="text-xs text-blue-600">27% of total</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Search and filter platform users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{getTierBadge(user.subscriptionTier)}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>User Details: {user.name}</DialogTitle>
                              <DialogDescription>Manage user account and permissions</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Role</label>
                                  <p className="text-sm">{getRoleBadge(user.role)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <p className="text-sm">{getStatusBadge(user.status)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Subscription</label>
                                  <p className="text-sm">{getTierBadge(user.subscriptionTier)}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Transformation Goals</label>
                                <div className="flex gap-2 mt-1">
                                  {user.transformationGoals.map((goal, index) => (
                                    <Badge key={index} variant="outline">
                                      {goal}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="gap-2">
                                  <Mail className="h-4 w-4" />
                                  Send Message
                                </Button>
                                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                  <UserX className="h-4 w-4" />
                                  Suspend User
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
