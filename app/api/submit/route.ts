import { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

type Job = {
  id: string
  language: string
  code: string
  stdin?: string
  timeLimitMs?: number
  createdAt: number
  status: string
}

const ensureDirs = async () => {
  const base = process.cwd()
  await fs.mkdir(path.join(base, 'data', 'jobs'), { recursive: true })
  await fs.mkdir(path.join(base, 'data', 'results'), { recursive: true })
  await fs.mkdir(path.join(base, 'data', 'work'), { recursive: true })
}

export async function POST(req: NextRequest) {
  await ensureDirs()

  const body = await req.json()
  const { language, code, stdin, timeLimitMs } = body

  if (!language || !code) {
    return new Response(JSON.stringify({ error: 'language and code are required' }), { status: 400 })
  }

  const id = crypto.randomUUID()
  const job: Job = {
    id,
    language,
    code,
    stdin: stdin || '',
    timeLimitMs: typeof timeLimitMs === 'number' ? timeLimitMs : 5000,
    createdAt: Date.now(),
    status: 'PENDING',
  }

  const jobsPath = path.join(process.cwd(), 'data', 'jobs', `${id}.json`)
  await fs.writeFile(jobsPath, JSON.stringify(job, null, 2), 'utf8')

  return new Response(JSON.stringify({ jobId: id }), { status: 200 })
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'POST a job to submit code' }))
}
