"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Send,
  RotateCcw,
  Settings,
  Maximize2,
  Minimize2,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload,
} from "lucide-react"

const languageTemplates = {
  python: `def solution():
    # Write your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`,
  javascript: `function solution() {
    // Write your code here
    
}

// Test your solution
console.log(solution());`,
  java: `public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solution());
    }
    
    public int solution() {
        // Write your code here
        return 0;
    }
}`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int solution() {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.solution() << endl;
    return 0;
}`,
}

const mockProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  testCases: [
    { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
    { input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
    { input: "[3,3]\n6", expectedOutput: "[0,1]" },
  ],
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "")
const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`

export function CodeEditor() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(languageTemplates.python)
  const [customInput, setCustomInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState("14")
  const [theme, setTheme] = useState("dark")

  const submitJob = async ({
    language,
    source,
    stdin,
    timeLimitMs = 5000,
  }: {
    language: string
    source: string
    stdin?: string
    timeLimitMs?: number
  }) => {
    const response = await fetch(buildApiUrl("/api/submit"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, code: source, stdin: stdin ?? "", timeLimitMs }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(errText || "Failed to submit code for execution")
    }

    const data = await response.json()
    if (!data.jobId) {
      throw new Error("Runner did not return a job id")
    }
    return data.jobId as string
  }

  const pollJobResult = async (jobId: string) => {
    const maxAttempts = 40
    const delay = 500

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetch(buildApiUrl(`/api/job/${jobId}`))
      if (response.status === 404) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }
      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText || "Failed to fetch job status")
      }

      const data = await response.json()
      if (data?.status && data.status !== "PENDING") {
        return data
      }

      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    throw new Error("Timed out while waiting for the runner to finish")
  }

  const formatResultOutput = (result: any) => {
    const lines: string[] = []
    lines.push(`Status: ${result.status ?? "UNKNOWN"}`)
    if (typeof result.exitCode === "number") {
      lines.push(`Exit Code: ${result.exitCode}`)
    }
    if (result.runtimeMs) {
      lines.push(`Time Limit: ${result.runtimeMs} ms`)
    }
    if (result.stdout) {
      lines.push("\nstdout:\n" + result.stdout)
    }
    if (result.stderr) {
      lines.push("\nstderr:\n" + result.stderr)
    }
    return lines.join("\n")
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(languageTemplates[language as keyof typeof languageTemplates])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput("Running your code in the SyntaxSniper runner...")

    try {
      const jobId = await submitJob({ language: selectedLanguage, source: code, stdin: customInput })
      const result = await pollJobResult(jobId)
      setOutput(formatResultOutput(result))
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to run code"
      setOutput(`Error: ${message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitCode = async () => {
    setIsSubmitting(true)
    setTestResults([])
    setOutput("Submitting to judge...")

    try {
      const jobId = await submitJob({ language: selectedLanguage, source: code, stdin: customInput })
      const result = await pollJobResult(jobId)
      setOutput(formatResultOutput(result))

      setTestResults([
        {
          passed: result.exitCode === 0 && (!result.stderr || result.stderr.trim() === ""),
          input: customInput || "No custom input",
          expected: "Program should exit with code 0",
          actual: (result.stdout || result.stderr || "(no output)").trim(),
        },
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit code"
      setOutput(`Error: ${message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetCode = () => {
    setCode(languageTemplates[selectedLanguage as keyof typeof languageTemplates])
    setOutput("")
    setTestResults([])
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} flex flex-col h-screen`}>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Problem Description Panel */}
        <div className="flex flex-col">
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-xl">{mockProblem.title}</CardTitle>
                  <Badge className="bg-accent text-accent-foreground">{mockProblem.difficulty}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-foreground">{mockProblem.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example</h4>
                    {mockProblem.examples.map((example, index) => (
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
                    <h4 className="font-semibold mb-2">Test Cases</h4>
                    <div className="space-y-2">
                      {mockProblem.testCases.map((testCase, index) => (
                        <div key={index} className="bg-muted p-3 rounded-lg">
                          <div className="text-sm">
                            <strong>Input:</strong> <code className="bg-background px-1 rounded">{testCase.input}</code>
                          </div>
                          <div className="text-sm">
                            <strong>Expected:</strong>{" "}
                            <code className="bg-background px-1 rounded">{testCase.expectedOutput}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Code Editor Panel */}
        <div className="flex flex-col">
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
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

                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12px</SelectItem>
                      <SelectItem value="14">14px</SelectItem>
                      <SelectItem value="16">16px</SelectItem>
                      <SelectItem value="18">18px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleResetCode}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b border-border">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono resize-none border-0 focus-visible:ring-0"
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="Write your code here..."
                />
              </div>

              <Tabs defaultValue="input" className="w-full">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="input">Input</TabsTrigger>
                    <TabsTrigger value="output">Output</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2 bg-transparent"
                    >
                      {isRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      <span>{isRunning ? "Running..." : "Run"}</span>
                    </Button>

                    <Button
                      onClick={handleSubmitCode}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      {isSubmitting ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                    </Button>
                  </div>
                </div>

                <TabsContent value="input" className="p-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Input</label>
                    <Textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter your test input here..."
                      className="min-h-[100px] font-mono"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="output" className="p-4">
                  <ScrollArea className="h-32">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {output || "Run your code to see output here..."}
                    </pre>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="results" className="p-4">
                  <ScrollArea className="h-32">
                    {testResults.length > 0 ? (
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              result.passed ? "bg-accent/10 border-accent" : "bg-destructive/10 border-destructive"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              {result.passed ? (
                                <CheckCircle className="w-4 h-4 text-accent" />
                              ) : (
                                <XCircle className="w-4 h-4 text-destructive" />
                              )}
                              <span className="font-medium">
                                Test Case {index + 1}: {result.passed ? "Passed" : "Failed"}
                              </span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div>
                                Input: <code className="bg-background px-1 rounded">{result.input}</code>
                              </div>
                              <div>
                                Expected: <code className="bg-background px-1 rounded">{result.expected}</code>
                              </div>
                              <div>
                                Actual: <code className="bg-background px-1 rounded">{result.actual}</code>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Submit your code to see test results...</p>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
