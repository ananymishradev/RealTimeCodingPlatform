"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProblemExplorer } from "@/components/problem-explorer"
import { CodeEditor } from "@/components/code-editor"
import { ContestDashboard } from "@/components/contest-dashboard"
import { UserDashboard } from "@/components/user-dashboard"
import { AuthModal } from "@/components/auth-modal"

export default function CodingPlatform() {
  const [activeTab, setActiveTab] = useState("problems")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "problems":
        return <ProblemExplorer />
      case "contests":
        return <ContestDashboard />
      case "editor":
        return <CodeEditor />
      case "dashboard":
        return <UserDashboard />
      // "community" tab removed
      default:
        return <ProblemExplorer />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setShowAuthModal(true)}
      />

      <main className="pt-16">{renderContent()}</main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={() => {
            setIsAuthenticated(true)
            setShowAuthModal(false)
          }}
        />
      )}
    </div>
  )
}
