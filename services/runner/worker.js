const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const { runInDocker } = require('./docker-runner')

const POLL_INTERVAL = 1000
const BASE = process.cwd()
const JOBS_DIR = path.join(BASE, 'data', 'jobs')
const RESULTS_DIR = path.join(BASE, 'data', 'results')
const WORK_DIR = path.join(BASE, 'data', 'work')

async function ensureDirs() {
  await fsp.mkdir(JOBS_DIR, { recursive: true })
  await fsp.mkdir(RESULTS_DIR, { recursive: true })
  await fsp.mkdir(WORK_DIR, { recursive: true })
}

function languageToImageAndCmd(language, filename) {
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'js':
    case 'node':
      return { image: 'node:20-bullseye', cmd: `node ${filename}` }
    case 'python':
    case 'py':
      return { image: 'python:3.11-slim', cmd: `python ${filename}` }
    case 'cpp':
    case 'c++':
    case 'c':
      // compile then run
      return { image: 'gcc:12', cmd: `g++ ${filename} -O2 -o a.out && ./a.out` }
    default:
      return null
  }
}

async function processJob(file) {
  const src = path.join(JOBS_DIR, file)
  const processingName = file.replace(/\.json$/, '.processing')
  const processingPath = path.join(JOBS_DIR, processingName)

  // claim the job by renaming
  try {
    await fsp.rename(src, processingPath)
  } catch (err) {
    // already claimed or removed
    return
  }

  let job
  try {
    const raw = await fsp.readFile(processingPath, 'utf8')
    job = JSON.parse(raw)
  } catch (err) {
    console.error('failed to read job', processingPath, err)
    return
  }

  const id = job.id
  const workdir = path.join(WORK_DIR, id)
  await fsp.mkdir(workdir, { recursive: true })

  // determine filename and extension
  const map = {
    js: 'main.js',
    javascript: 'main.js',
    node: 'main.js',
    python: 'main.py',
    py: 'main.py',
    cpp: 'main.cpp',
    'c++': 'main.cpp',
    c: 'main.c',
  }
  const fname = map[job.language.toLowerCase()] || 'main.txt'
  const filePath = path.join(workdir, fname)
  await fsp.writeFile(filePath, job.code, 'utf8')

  // if stdin present, write to input.txt and we'll redirect
  if (job.stdin) {
    await fsp.writeFile(path.join(workdir, 'input.txt'), job.stdin, 'utf8')
  }

  const mapping = languageToImageAndCmd(job.language, fname)
  if (!mapping) {
    const res = { id, status: 'ERROR', error: `unsupported language ${job.language}` }
    await fsp.writeFile(path.join(RESULTS_DIR, `${id}.json`), JSON.stringify(res, null, 2), 'utf8')
    await fsp.unlink(processingPath).catch(() => {})
    return
  }

  console.log(`Processing job ${id} language=${job.language}`)
  // Build the command: if stdin exists, redirect from input.txt
  let cmd = mapping.cmd
  if (job.stdin) {
    cmd = `${cmd} < input.txt`
  }

  const timeoutMs = job.timeLimitMs || 5000

  const result = await runInDocker(workdir, mapping.image, cmd, timeoutMs)

  const out = {
    id,
    status: result.timedOut ? 'TIMEOUT' : 'FINISHED',
    exitCode: result.exitCode,
    stdout: result.stdout,
    stderr: result.stderr,
    runtimeMs: timeoutMs,
    finishedAt: Date.now(),
  }

  await fsp.writeFile(path.join(RESULTS_DIR, `${id}.json`), JSON.stringify(out, null, 2), 'utf8')

  // remove processing file
  await fsp.unlink(processingPath).catch(() => {})

  // note: do not remove workdir immediately so artifacts can be inspected; user can clean
}

async function poll() {
  try {
    const files = await fsp.readdir(JOBS_DIR)
    for (const f of files) {
      if (!f.endsWith('.json')) continue
      // process each job file
      processJob(f).catch((e) => console.error('job error', e))
    }
  } catch (err) {
    // likely no jobs dir yet
  }
}

async function main() {
  console.log('Starting simple filesystem-backed Docker runner worker')
  await ensureDirs()
  setInterval(poll, POLL_INTERVAL)
  // run immediately once
  poll()
}

main().catch((e) => {
  console.error('worker failed', e)
  process.exit(1)
})
