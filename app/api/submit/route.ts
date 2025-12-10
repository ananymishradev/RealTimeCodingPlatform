import { NextRequest } from 'next/server'
import { submitJob } from '@/lib/job-runner'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { language, code, stdin, timeLimitMs } = body

  try {
    const jobId = await submitJob({ language, code, stdin, timeLimitMs })
    return new Response(JSON.stringify({ jobId }), { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit code for execution'
    return new Response(JSON.stringify({ error: message }), { status: 400 })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'POST a job to submit code' }))
}
