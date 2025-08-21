"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, CheckCircle, Circle, Users, Star } from "lucide-react"

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    solved: true,
    acceptance: "49.2%",
    likes: 1247,
    dislikes: 89,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹"],
    companies: ["Amazon", "Google", "Microsoft"],
    frequency: "Very High",
  },
  {
    id: 2,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    tags: ["Tree", "Stack", "Hash Table"],
    solved: false,
    acceptance: "74.1%",
    likes: 892,
    dislikes: 45,
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder traversal visits nodes in left-root-right order.",
      },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100]", "-100 ≤ Node.val ≤ 100"],
    companies: ["Facebook", "Apple", "Netflix"],
    frequency: "High",
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    tags: ["Linked List", "Divide and Conquer", "Heap"],
    solved: false,
    acceptance: "47.8%",
    likes: 2156,
    dislikes: 156,
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are merged into one sorted list.",
      },
    ],
    constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    frequency: "High",
  },
]

export function ProblemExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [selectedProblem, setSelectedProblem] = useState<(typeof mockProblems)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "detail">("list")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-accent text-accent-foreground"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Hard":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Very High":
        return "text-destructive"
      case "High":
        return "text-yellow-500"
      case "Medium":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  const handleProblemClick = (problem: (typeof mockProblems)[0]) => {
    setSelectedProblem(problem)
    setViewMode("detail")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedProblem(null)
  }

  if (viewMode === "detail" && selectedProblem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBackToList} className="mb-4">
            ← Back to Problems
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{selectedProblem.title}</h1>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(selectedProblem.difficulty)}>{selectedProblem.difficulty}</Badge>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{selectedProblem.acceptance} acceptance</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm">{selectedProblem.likes}</span>
                </div>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              {selectedProblem.solved ? "Review Solution" : "Start Coding"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{selectedProblem.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Example:</h4>
                        {selectedProblem.examples.map((example, index) => (
                          <div key={index} className="bg-muted p-4 rounded-lg space-y-2">
                            <div>
                              <strong>Input:</strong>{" "}
                              <code className="bg-background px-2 py-1 rounded">{example.input}</code>
                            </div>
                            <div>
                              <strong>Output:</strong>{" "}
                              <code className="bg-background px-2 py-1 rounded">{example.output}</code>
                            </div>
                            <div>
                              <strong>Explanation:</strong> {example.explanation}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Constraints:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {selectedProblem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="editorial">
                <Card>
                  <CardHeader>
                    <CardTitle>Solution Editorial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Editorial content would be available here with detailed explanations, multiple approaches, and
                      complexity analysis.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Community discussions and solutions would be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedProblem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Companies</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedProblem.companies.map((company) => (
                      <Badge key={company} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Frequency</div>
                  <div className={`font-medium ${getFrequencyColor(selectedProblem.frequency)}`}>
                    {selectedProblem.frequency}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 rounded border border-border hover:bg-muted/50 cursor-pointer">
                    <div className="font-medium text-sm">Three Sum</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="p-2 rounded border border-border hover:bg-muted/50 cursor-pointer">
                    <div className="font-medium text-sm">Four Sum</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Problem Set</h1>
        <p className="text-muted-foreground">Practice coding problems to improve your skills</p>
      </div>

      {/* Enhanced Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search problems by title, tags, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
            <SelectItem value="unsolved">Unsolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
            <SelectItem value="acceptance">Acceptance</SelectItem>
            <SelectItem value="frequency">Frequency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Problem Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProblems.map((problem) => (
          <Card
            key={problem.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProblemClick(problem)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {problem.solved ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                </div>
                <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{problem.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {problem.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {problem.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{problem.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{problem.acceptance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{problem.likes}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {problem.solved ? "Review" : "Solve"}
                </Button>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {problem.companies.slice(0, 2).map((company) => (
                      <Badge key={company} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                    {problem.companies.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{problem.companies.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className={`text-xs font-medium ${getFrequencyColor(problem.frequency)}`}>
                    {problem.frequency}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
