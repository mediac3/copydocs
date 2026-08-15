/**
 * Load a project .env file at runtime for the standalone production server.
 *
 * Next.js' standalone server.js does NOT load .env files (unlike next dev /
 * next start) — it only reads process.env. On hosts where the process manager
 * does not inject every variable, values placed in .env silently never reach
 * the app. This loader fills that gap:
 *
 *  - idempotent (runs once per process);
 *  - NEVER overrides variables already present in the environment (process
 *    manager injection always wins);
 *  - searches cwd and walks up from the module location so it works both when
 *    run from the project root and from inside .next/standalone.
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const g = globalThis as unknown as { __envFileLoaded?: boolean };

export function ensureEnvLoaded(): void {
  if (g.__envFileLoaded) return;
  g.__envFileLoaded = true;

  const candidates: string[] = [resolve(process.cwd(), '.env')];

  // When bundled, __dirname may live under .next/standalone/.next/... — walk
  // up several levels so the project-root .env is reached too.
  try {
    let dir: string = __dirname;
    for (let i = 0; i < 6; i++) {
      candidates.push(resolve(dir, '.env'));
      dir = resolve(dir, '..');
    }
  } catch {
    // __dirname unavailable (ESM) — cwd candidates are enough
  }

  // Process innermost → outermost: outer files only fill keys that are still
  // missing/empty, so a stale nested .env can never shadow the real one.
  const ordered = [...candidates].reverse();

  for (const file of ordered) {
    if (!existsSync(file)) continue;
    try {
      const lines = readFileSync(file, 'utf8').split(/\r?\n/);
      let loaded = 0;
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        const current = process.env[key];
        if (current === undefined || current === '') {
          process.env[key] = value;
          loaded++;
        }
      }
      if (loaded > 0) {
        console.log(`[env] ${file} loaded (${loaded} variable${loaded === 1 ? '' : 's'})`);
      }
    } catch {
      // unreadable file — try the next candidate
    }
  }
}
