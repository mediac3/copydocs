// Import from the stable generated path (see prisma/schema.prisma `output`).
// Importing the default "@prisma/client" redirects to a hashed module that
// Turbopack (Next 16) fails to resolve, breaking every DB-backed route.
import { PrismaClient } from '@/generated/prisma'
import { resolve } from 'node:path'
import { ensureDatabaseInitialised } from '@/lib/init-db'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Resolve a relative SQLite path against the project root so the connection
// works regardless of the process current working directory (dev server,
// standalone build, Docker, etc.). Absolute paths are left untouched.
function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL
  if (!raw) return undefined
  const match = raw.match(/^file:(.*)$/)
  if (!match) return raw
  const filePath = match[1]
  // Already absolute (Unix /xxx, Windows C:\, D:/...) → keep as-is.
  if (/^([A-Za-z]:[\\/]|\/)/.test(filePath)) return raw
  // Relative → resolve from the project root (process.cwd() when running
  // next dev/start is the project root). Normalise to forward slashes for
  // SQLite URL compatibility on Windows.
  const absolute = resolve(process.cwd(), filePath).replace(/\\/g, '/')
  return `file:${absolute}`
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
void ensureDatabaseInitialised(db).catch((e) => {
  console.error('[init-db] initialisation failed:', e instanceof Error ? e.message : e);
})