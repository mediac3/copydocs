// Import from the stable generated path (see prisma/schema.prisma `output`).
// Importing the default "@prisma/client" redirects to a hashed module that
// Turbopack (Next 16) fails to resolve, breaking every DB-backed route.
import { PrismaClient } from '@/generated/prisma'
import { resolve, dirname } from 'node:path'
import { mkdirSync, openSync, closeSync, unlinkSync, existsSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { ensureDatabaseInitialised } from '@/lib/init-db'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/** Try writing (and removing) a probe file to check that a directory is writable. */
function isDirWritable(dir: string): boolean {
  const probe = resolve(dir, `.db-probe-${process.pid}-${Date.now()}`)
  try {
    const fd = openSync(probe, 'w')
    closeSync(fd)
    unlinkSync(probe)
    return true
  } catch {
    return false
  }
}

/** Check that an existing file can be opened for writing (SQLite opens read-write). */
function isFileWritable(file: string): boolean {
  try {
    const fd = openSync(file, 'r+')
    closeSync(fd)
    return true
  } catch {
    return false
  }
}

// Resolve the SQLite path so the connection works in every environment:
//  - relative paths are resolved against the process working directory;
//  - the parent directory is created if missing (SQLite fails with
//    "Unable to open the database file" (code 14) when it doesn't exist);
//  - if the target location is NOT writable (read-only filesystems such as
//    FunctionCompute-style runtimes, or stale paths like /home/z/...), the
//    database falls back to a writable temp location, copying any existing
//    database file so data is preserved when possible.
function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL
  if (!raw) return undefined
  const match = raw.match(/^file:(.*)$/)
  if (!match) return raw

  let filePath = match[1].replace(/\\/g, '/')
  // Relative → resolve from the CWD (project root when running next dev/start).
  if (!/^([A-Za-z]:\/|\/)/.test(filePath)) {
    filePath = resolve(process.cwd(), filePath).replace(/\\/g, '/')
  }

  // Ensure the parent directory exists — SQLite never creates it.
  const dir = dirname(filePath)
  try {
    mkdirSync(dir, { recursive: true })
  } catch {
    // Read-only filesystem or missing permissions — handled by the fallback below.
  }

  const fileOk = !existsSync(filePath) || isFileWritable(filePath)
  const dirOk = isDirWritable(dir)
  if (fileOk && dirOk) {
    console.log('[db] using', filePath)
    return `file:${filePath}`
  }

  // Target not writable → fall back to a writable temp location.
  const fallbackDir = resolve(tmpdir(), 'copydocs-db')
  try {
    mkdirSync(fallbackDir, { recursive: true })
  } catch {
    console.error('[db] fallback directory not writable either:', fallbackDir)
  }
  const fallbackFile = resolve(fallbackDir, 'custom.db')
  if (existsSync(filePath)) {
    try {
      copyFileSync(filePath, fallbackFile)
    } catch {
      // Best effort — the auto-init will rebuild the schema + default users.
    }
  }
  console.warn(`[db] ${filePath} is not writable — falling back to ${fallbackFile}`)
  return `file:${fallbackFile}`
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasourceUrl: resolveDatabaseUrl(),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Auto-initialise the schema + seed data on first boot (idempotent, no-op when
// the DB is already populated). See src/lib/init-db.ts for details.
// Routes can `await dbReady` to avoid racing the initialisation right after a
// cold start.
export const dbReady: Promise<void> = ensureDatabaseInitialised(db).catch((e) => {
  console.error('[init-db] initialisation failed:', e instanceof Error ? e.message : e);
});
