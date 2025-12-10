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
      <header className="sticky top-0 z-30 border-b border-border/60 bg-card/70 backdrop-blur-xl">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAuthenticated={isAuthenticated}
          onAuthClick={() => setShowAuthModal(true)}
        />
      </header>

      <main className="relative isolate">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="gradient-ring" />
        </div>

        <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-24 sm:px-8">
          <div className="flex flex-col gap-3 text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Realtime coding suite</p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Build, test, and compete inside a matte-black cockpit.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Swap between the explorer, contests, editor, and dashboard without losing focus. Everything lives in one
              streamlined surface.
            </p>
          </div>

          <article className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-xl shadow-black/60">
            {renderContent()}
          </article>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-card/60 px-6 py-6 text-center text-sm text-muted-foreground">
        <p>
          Crafted for deep-focus problem solving. Need an update? <button className="underline" onClick={() => setShowAuthModal(true)}>Sign in</button>
        </p>
      </footer>

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
