import { NextRequest } from 'next/server'
import { submitJob } from '@/lib/job-runner'

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { language, code, stdin, timeLimitMs } = body

  try {
    const jobId = await submitJob({ language, code, stdin, timeLimitMs })
    return new Response(JSON.stringify({ jobId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit code for execution'
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'POST a job to submit code' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}
