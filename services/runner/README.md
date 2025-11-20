Docker-based runner (prototype)
================================

This folder contains a small filesystem-backed prototype runner that executes submitted code inside Docker containers.

What it does
- An HTTP POST to `/api/submit` (see app/api/submit/route.ts) writes a job JSON to `data/jobs/<id>.json`.
- Run the worker with `pnpm run runner:start` (or `npm run runner:start`). The worker polls `data/jobs` and will process jobs.
- Results are written to `data/results/<id>.json` and the worker workspace is created at `data/work/<id>/`.

Notes and requirements
- Docker must be installed and the user running the worker must be able to run `docker` without sudo (or run the worker with permissions).
- This is a local prototype. For production use, migrate to a proper queue (Redis + BullMQ), add authentication, harden images, and consider microVM isolation (Firecracker) for multi-tenant setups.

Security considerations
- The worker runs arbitrary code inside containers. Ensure images are hardened and do not contain host secrets.
- Disable network (--network none) and restrict CPU/memory as done in the prototype. Add seccomp and read-only overlays for additional hardening.

Next steps
- Add persistent queue (Redis/BullMQ).
- Add job cancellation endpoint.
- Add streaming via WebSockets for real-time output.
- Add CI/integration tests and health checks.
