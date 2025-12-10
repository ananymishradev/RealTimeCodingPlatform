import { NextRequest } from 'next/server'
import { getJob } from '@/lib/job-runner'

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const job = getJob(id)

  if (!job) {
    return new Response(JSON.stringify({ error: 'job not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  return new Response(JSON.stringify(job), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}
