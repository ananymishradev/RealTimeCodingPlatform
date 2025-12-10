import fs from "fs/promises"
import os from "os"
import path from "path"
import { spawn } from "child_process"
import { randomUUID } from "crypto"

export type JobStatus = "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | "TIMEOUT"

export interface JobRecord {
  id: string
  language: string
  code: string
  stdin: string
  timeLimitMs: number
  createdAt: number
  finishedAt?: number
  exitCode?: number | null
  stdout?: string
  stderr?: string
  status: JobStatus
  errorMessage?: string
}

type JobStore = Map<string, JobRecord>

declare global {
  // eslint-disable-next-line no-var
  var __syntaxSniperJobStore: JobStore | undefined
}

const jobStore: JobStore = globalThis.__syntaxSniperJobStore ?? new Map<string, JobRecord>()
globalThis.__syntaxSniperJobStore = jobStore

export type SubmitJobPayload = {
  language: string
  code: string
  stdin?: string
  timeLimitMs?: number
}

export async function submitJob(payload: SubmitJobPayload) {
  const language = (payload.language || "").toLowerCase()
  if (!payload.code || !language) {
    throw new Error("language and code are required")
  }

  if (language !== "javascript" && language !== "js" && language !== "node") {
    throw new Error("Only JavaScript execution is supported in this deployment")
  }

  const id = randomUUID()
  const job: JobRecord = {
    id,
    language: "javascript",
    code: payload.code,
    stdin: payload.stdin ?? "",
    timeLimitMs: Math.min(Math.max(payload.timeLimitMs ?? 5000, 100), 15000),
    createdAt: Date.now(),
    status: "PENDING",
  }

  jobStore.set(id, job)
  runJavascriptJob(job).catch((error) => {
    updateJob(id, {
      status: "ERROR",
      stderr: String(error?.stack ?? error?.message ?? error),
      exitCode: 1,
      finishedAt: Date.now(),
      errorMessage: String(error?.message ?? error),
    })
  })

  return id
}

export function getJob(id: string) {
  return jobStore.get(id) ?? null
}

function updateJob(id: string, patch: Partial<JobRecord>) {
  const current = jobStore.get(id)
  if (!current) return
  const next = { ...current, ...patch }
  jobStore.set(id, next)
}

async function runJavascriptJob(job: JobRecord) {
  updateJob(job.id, { status: "RUNNING" })
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "syntaxsniper-"))
  const filePath = path.join(tempDir, "main.js")

  try {
    await fs.writeFile(filePath, job.code, "utf8")
    const result = await executeNodeFile(filePath, job.stdin, job.timeLimitMs)
    updateJob(job.id, {
      status: result.timedOut ? "TIMEOUT" : result.exitCode === 0 ? "FINISHED" : "ERROR",
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      finishedAt: Date.now(),
    })
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => undefined)
  }
}

function executeNodeFile(filePath: string, stdin: string, timeoutMs: number) {
  return new Promise<{
    stdout: string
    stderr: string
    exitCode: number | null
    timedOut: boolean
  }>((resolve) => {
    const child = spawn("node", [filePath], { cwd: path.dirname(filePath) })
    let stdout = ""
    let stderr = ""
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      child.kill("SIGTERM")
    }, timeoutMs)

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString()
    })

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString()
    })

    child.on("error", (error) => {
      clearTimeout(timer)
      resolve({ stdout, stderr: stderr + String(error), exitCode: 1, timedOut })
    })

    child.on("close", (code) => {
      clearTimeout(timer)
      resolve({ stdout, stderr, exitCode: code, timedOut })
    })

    if (stdin) {
      child.stdin.write(stdin)
    }
    child.stdin.end()
  })
}
