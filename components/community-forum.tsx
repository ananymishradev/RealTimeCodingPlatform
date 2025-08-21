"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Search, Plus, Eye, Clock, Star } from "lucide-react"

const forumPosts = [
  {
    id: 1,
    title: "How to approach Dynamic Programming problems?",
    author: "Alice Johnson",
    authorInitials: "AJ",
    category: "Algorithms",
    tags: ["Dynamic Programming", "Beginner"],
    content: "I'm struggling with DP problems. Can someone explain the basic approach?",
    upvotes: 23,
    downvotes: 2,
    replies: 8,
    views: 156,
    timeAgo: "2 hours ago",
    solved: false,
  },
  {
    id: 2,
    title: "Optimal solution for Two Sum problem",
    author: "Bob Smith",
    authorInitials: "BS",
    category: "Problem Discussion",
    tags: ["Arrays", "Hash Table"],
    content: "Found an O(n) solution using hash map. Thoughts?",
    upvotes: 45,
    downvotes: 1,
    replies: 12,
    views: 289,
    timeAgo: "4 hours ago",
    solved: true,
  },
  {
    id: 3,
    title: "Contest Strategy: Time Management Tips",
    author: "Carol Davis",
    authorInitials: "CD",
    category: "Contest",
    tags: ["Strategy", "Tips"],
    content: "Sharing my approach to manage time effectively during contests...",
    upvotes: 67,
    downvotes: 3,
    replies: 15,
    views: 423,
    timeAgo: "1 day ago",
    solved: false,
  },
]

const categories = [
  { name: "All", count: 156 },
  { name: "Algorithms", count: 45 },
  { name: "Data Structures", count: 32 },
  { name: "Problem Discussion", count: 28 },
  { name: "Contest", count: 21 },
  { name: "Career", count: 18 },
  { name: "General", count: 12 },
]

export function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span>Community Forum</span>
          </h1>
          <p className="text-muted-foreground">Discuss problems, share solutions, and learn together</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 rounded text-left hover:bg-accent transition-colors ${
                      selectedCategory === category.name ? "bg-accent" : ""
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {["Alice Johnson", "Bob Smith", "Carol Davis"].map((name, index) => (
                  <div key={name} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">#{index + 1}</span>
                      <Star className="h-3 w-3 text-yellow-500" />
                    </div>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tabs */}
          <Tabs defaultValue="recent">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="solved">Solved</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold hover:text-primary">{post.title}</h3>
                            {post.solved && (
                              <Badge variant="default" className="bg-green-500">
                                Solved
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">{post.authorInitials}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Popular Posts</h3>
                  <p className="text-muted-foreground">Most upvoted posts this week</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unanswered Questions</h3>
                  <p className="text-muted-foreground">Help others by answering their questions</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solved" className="space-y-4">
              <Card>
                <CardContent className="p-8 text-center">
                  <Badge className="h-12 w-12 mx-auto text-muted-foreground mb-4 bg-green-500" />
                  <h3 className="text-lg font-semibold mb-2">Solved Problems</h3>
                  <p className="text-muted-foreground">Browse solved discussions and solutions</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
