"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Star, Clock } from "lucide-react"

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    solved: true,
    acceptance: "49.2%",
    likes: 1247,
    frequency: "Very High",
  },
  {
    id: 2,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    tags: ["Tree", "Stack"],
    solved: false,
    acceptance: "74.1%",
    likes: 892,
    frequency: "High",
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    tags: ["Linked List", "Heap"],
    solved: false,
    acceptance: "47.8%",
    likes: 2156,
    frequency: "High",
  },
]

export function ProblemListView() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Problem List</h1>
        <p className="text-muted-foreground">Comprehensive list view of all coding problems</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Acceptance</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead className="w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProblems.map((problem) => (
              <TableRow key={problem.id} className="hover:bg-muted/50">
                <TableCell>
                  {problem.solved ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{problem.title}</TableCell>
                <TableCell>
                  <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {problem.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{problem.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{problem.acceptance}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span>{problem.likes}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{problem.frequency}</span>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    {problem.solved ? "Review" : "Solve"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
