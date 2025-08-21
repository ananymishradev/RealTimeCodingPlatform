"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Share, RotateCcw } from "lucide-react"

export function CodePlayground() {
  const [language, setLanguage] = useState("python")
  const [code, setCode] = useState("# Write your code here\nprint('Hello, World!')")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setOutput("Hello, World!\n\nExecution completed successfully.")
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode("# Write your code here\nprint('Hello, World!')")
    setInput("")
    setOutput("")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Code Playground</h1>
        <p className="text-muted-foreground">Experiment with code in a sandbox environment</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Code Editor</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono"
              placeholder="Write your code here..."
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button onClick={handleRun} disabled={isRunning} className="bg-primary hover:bg-primary/90">
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input & Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="input" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="input" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Standard Input</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </TabsContent>
              <TabsContent value="output" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Program Output</label>
                  <div className="min-h-[300px] p-3 bg-muted rounded-md">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {output || "Run your code to see output here..."}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
