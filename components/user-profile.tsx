"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Calendar, Code, Target, Award } from "lucide-react"

export function UserProfile() {
  const userStats = {
    name: "John Developer",
    username: "johndoe",
    email: "john@example.com",
    joinDate: "January 2024",
    totalSolved: 127,
    easyProblems: 45,
    mediumProblems: 62,
    hardProblems: 20,
    currentStreak: 15,
    maxStreak: 28,
    totalXP: 1247,
    rank: "Expert",
    contestsParticipated: 8,
    contestRating: 1456,
  }

  const achievements = [
    { name: "First Problem", description: "Solved your first problem", icon: Target, earned: true },
    { name: "Week Streak", description: "Maintained a 7-day streak", icon: Calendar, earned: true },
    { name: "Contest Participant", description: "Participated in your first contest", icon: Trophy, earned: true },
    { name: "Problem Solver", description: "Solved 100 problems", icon: Code, earned: true },
    { name: "Expert Coder", description: "Reached Expert rank", icon: Star, earned: false },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/developer-avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{userStats.name}</CardTitle>
            <p className="text-muted-foreground">@{userStats.username}</p>
            <Badge className="bg-primary text-primary-foreground mt-2">{userStats.rank}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.totalXP}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{userStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Member since {userStats.joinDate}</div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Problem Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Problem Solving</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{userStats.easyProblems}</div>
                      <div className="text-sm text-muted-foreground">Easy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">{userStats.mediumProblems}</div>
                      <div className="text-sm text-muted-foreground">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{userStats.hardProblems}</div>
                      <div className="text-sm text-muted-foreground">Hard</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Contest Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Contest Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userStats.contestsParticipated}</div>
                      <div className="text-sm text-muted-foreground">Contests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userStats.contestRating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon
                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            achievement.earned ? "bg-accent/10 border-accent" : "bg-muted/50 border-border opacity-60"
                          }`}
                        >
                          <Icon className={`w-8 h-8 ${achievement.earned ? "text-accent" : "text-muted-foreground"}`} />
                          <div className="flex-1">
                            <div className="font-semibold">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                          {achievement.earned && <Badge className="bg-accent text-accent-foreground">Earned</Badge>}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Privacy Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
