const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const jobsDir = path.join(process.cwd(), 'data', 'jobs')
fs.mkdirSync(jobsDir, { recursive: true })

const job = {
  id: crypto.randomUUID(),
  language: 'javascript',
  code: 'console.log("hello from manual job");',
  stdin: '',
  timeLimitMs: 4000,
  createdAt: Date.now(),
  status: 'PENDING',
}

const fileName = job.id + '.json'
fs.writeFileSync(path.join(jobsDir, fileName), JSON.stringify(job, null, 2))
console.log('created job', job.id)