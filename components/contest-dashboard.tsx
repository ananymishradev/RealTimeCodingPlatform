"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, Users, Calendar, Star } from "lucide-react"

const upcomingContests = [
  {
    id: 1,
    title: "Weekly Contest 378",
    startTime: "2024-01-15T14:30:00Z",
    duration: "1h 30m",
    participants: 12543,
    difficulty: "All Levels",
    prizes: ["$500", "$300", "$200"],
  },
  {
    id: 2,
    title: "Biweekly Contest 120",
    startTime: "2024-01-18T14:30:00Z",
    duration: "1h 30m",
    participants: 8932,
    difficulty: "All Levels",
    prizes: ["$300", "$200", "$100"],
  },
]

const pastContests = [
  {
    id: 3,
    title: "Weekly Contest 377",
    date: "2024-01-08",
    rank: 1247,
    score: 12,
    participants: 11234,
    problems: [
      { name: "Find Missing Number", solved: true, points: 3 },
      { name: "Maximum Subarray", solved: true, points: 4 },
      { name: "Binary Tree Paths", solved: true, points: 5 },
      { name: "Graph Coloring", solved: false, points: 0 },
    ],
  },
]

export function ContestDashboard() {
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const formatTimeUntil = (dateString: string) => {
    const now = new Date()
    const contestDate = new Date(dateString)
    const diff = contestDate.getTime() - now.getTime()

    if (diff < 0) return "Started"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span>Contests</span>
          </h1>
          <p className="text-muted-foreground">Compete with programmers worldwide</p>
        </div>
        <Button variant="default">
          <Star className="h-4 w-4 mr-2" />
          Create Contest
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Contests Joined</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Best Rank</p>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">1847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contest Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingContests.map((contest) => (
            <Card key={contest.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{contest.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Starts in {formatTimeUntil(contest.startTime)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{contest.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{contest.participants.toLocaleString()} registered</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{contest.difficulty}</Badge>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Prizes: {contest.prizes.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline">View Details</Button>
                    <Button>Register</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Live Contests</h3>
              <p className="text-muted-foreground">Check back later for live contests</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastContests.map((contest) => (
            <Card key={contest.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{contest.title}</h3>
                      <p className="text-muted-foreground">{contest.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="text-lg font-bold">{contest.rank}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-lg font-bold">{contest.score}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="text-lg font-bold">{contest.participants.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {contest.problems.map((problem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                        <span className="text-sm font-medium">{problem.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{problem.points}pts</span>
                          {problem.solved ? (
                            <Badge variant="default" className="bg-green-500">
                              Solved
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Unsolved</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
