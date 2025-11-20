const { spawnSync, spawn } = require('child_process')
const fs = require('fs')

function runInDocker(workdir, image, cmd, timeoutMs = 5000) {
  return new Promise((resolve) => {
    try {
      // Create container
      const create = spawnSync('docker', [
        'create',
        '--network',
        'none',
        '--memory',
        '256m',
        '--cpus',
        '0.5',
        '--pids-limit',
        '64',
        '-v',
        `${workdir}:/work`,
        '-w',
        '/work',
        image,
        'sh',
        '-c',
        cmd,
      ])

      if (create.error) {
        return resolve({ stdout: '', stderr: String(create.error), exitCode: 1, timedOut: false })
      }

      const containerId = String(create.stdout || create.stderr || '').trim()
      if (!containerId) {
        return resolve({ stdout: '', stderr: 'failed to create container', exitCode: 1, timedOut: false })
      }

      const child = spawn('docker', ['start', '-a', containerId])

      let stdout = ''
      let stderr = ''
      let timedOut = false

      const killer = setTimeout(() => {
        try {
          spawnSync('docker', ['kill', containerId])
          timedOut = true
        } catch (e) {
          // ignore
        }
      }, timeoutMs)

      child.stdout.on('data', (d) => {
        stdout += d.toString()
      })
      child.stderr.on('data', (d) => {
        stderr += d.toString()
      })

      child.on('close', (code) => {
        clearTimeout(killer)
        // Ensure container removed
        try {
          spawnSync('docker', ['rm', '-f', containerId])
        } catch (e) {
          // ignore cleanup errors
        }

        resolve({ stdout, stderr, exitCode: code, timedOut })
      })
    } catch (err) {
      resolve({ stdout: '', stderr: String(err), exitCode: 1, timedOut: false })
    }
  })
}

module.exports = { runInDocker }
