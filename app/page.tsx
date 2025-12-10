"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProblemExplorer } from "@/components/problem-explorer"
import { CodeEditor } from "@/components/code-editor"
import { ContestDashboard } from "@/components/contest-dashboard"
import { UserDashboard } from "@/components/user-dashboard"
import { AuthModal } from "@/components/auth-modal"

export default function SyntaxSniperPage() {
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

      <main className="relative isolate flex min-h-[calc(100vh-4rem)] flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="gradient-ring" />
        </div>

        <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-20 pt-24 sm:px-8 lg:pt-32">
          <div className="flex flex-col gap-3 text-left">
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">SyntaxSniper platform</p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              SyntaxSniper keeps every challenge locked in your sights.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Toggle between explorer, contests, editor, and insights without losing flow. One cockpit, zero drift.
            </p>
          </div>

          <article className="flex-1 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-xl shadow-black/60">
            {renderContent()}
          </article>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-card/60 px-6 py-6 text-center text-sm text-muted-foreground">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>SyntaxSniper is built for relentless iteration.</span>
          <span>Copyright Anany.</span>
          <button className="underline" onClick={() => setShowAuthModal(true)}>
            Sign in
          </button>
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
