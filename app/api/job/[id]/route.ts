import { NextRequest } from 'next/server'
import { getJob } from '@/lib/job-runner'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const job = getJob(id)

  if (!job) {
    return new Response(JSON.stringify({ error: 'job not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(job), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
