import fs from 'fs/promises'
import path from 'path'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const base = process.cwd()
  const resultPath = path.join(base, 'data', 'results', `${id}.json`)
  const jobPath = path.join(base, 'data', 'jobs', `${id}.json`)

  try {
    const result = await fs.readFile(resultPath, 'utf8')
    return new Response(result, { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    // If result not yet present, try to return job status
    try {
      const jobRaw = await fs.readFile(jobPath, 'utf8')
      return new Response(jobRaw, { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (err2) {
      return new Response(JSON.stringify({ error: 'job not found' }), { status: 404 })
    }
  }
}
