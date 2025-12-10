"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Code, Trophy, User, MessageSquare, BookOpen } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isAuthenticated: boolean
  onAuthClick: () => void
}

export function Navigation({ activeTab, setActiveTab, isAuthenticated, onAuthClick }: NavigationProps) {
  const navItems = [
    { id: "problems", label: "Problems", icon: Code },
    { id: "contests", label: "Contests", icon: Trophy },
  { id: "editor", label: "Editor", icon: BookOpen },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SyntaxSniper</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("dashboard")}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  1247 XP
                </Badge>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/developer-avatar.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
