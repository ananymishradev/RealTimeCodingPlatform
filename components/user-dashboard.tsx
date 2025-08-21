"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trophy, Target, TrendingUp, BookOpen } from "lucide-react"

export function UserDashboard() {
  const todayStats = {
    problemsSolved: 3,
    timeSpent: "2h 15m",
    streak: 15,
    xpGained: 45,
  }

  const recentActivity = [
    { type: "problem", title: "Two Sum", difficulty: "Easy", time: "2 hours ago", xp: 15 },
    { type: "contest", title: "Weekly Contest 123", difficulty: "Medium", time: "1 day ago", xp: 30 },
    { type: "problem", title: "Binary Tree Traversal", difficulty: "Medium", time: "2 days ago", xp: 25 },
  ]

  const upcomingContests = [
    { name: "Weekly Contest 124", date: "Tomorrow", time: "10:00 AM", participants: "12.5K" },
    { name: "Biweekly Contest 67", date: "Dec 15", time: "2:30 PM", participants: "8.2K" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track your coding progress and achievements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Today's Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{todayStats.problemsSolved}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.timeSpent}</div>
            <p className="text-xs text-muted-foreground">Coding today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.streak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Gained</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{todayStats.xpGained}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          activity.difficulty === "Easy"
                            ? "secondary"
                            : activity.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {activity.difficulty}
                      </Badge>
                      <span className="text-sm font-medium text-accent">+{activity.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Problems Solved</span>
                    <span>12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Study Time</span>
                    <span>8h 30m / 10h</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Contest Participation</span>
                    <span>2/2</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Contests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Contests</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingContests.map((contest, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border">
                    <div className="font-medium text-sm mb-1">{contest.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {contest.date} at {contest.time}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{contest.participants} participants</span>
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Daily Challenge
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Study Plan
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Trophy className="w-4 h-4 mr-2" />
                Mock Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
