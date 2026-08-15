/**
 * Auto-initialise the SQLite database on first boot.
 *
 * Some deployment pipelines ship a database file without applying the schema,
 * which breaks every DB-backed route with a 500 ("The table `main.X` does not
 * exist"). This guard runs once at startup: if the schema is missing it creates
 * the tables directly with `CREATE TABLE IF NOT EXISTS` (no Prisma CLI needed),
 * and if there are no users it seeds a default admin + demo account so login
 * works immediately.
 *
 * Both steps are idempotent and only run when needed, so this is safe on a
 * populated production database (it becomes a no-op). Using raw SQL avoids any
 * dependency on the `prisma` CLI being available at runtime.
 */

type MinimalPrisma = {
  user: {
    count: () => Promise<number>;
    upsert: (args: {
      where: { username: string };
      update: Record<string, never>;
      create: Record<string, unknown>;
    }) => Promise<unknown>;
  };
  $executeRawUnsafe: (query: string, ...params: unknown[]) => Promise<number>;
};

const g = globalThis as unknown as { __dbInitialised?: boolean };

// Precomputed bcrypt hashes for the default accounts (see README). Embedding
// them avoids importing bcryptjs at boot time. The login route verifies these
// with bcryptjs.compare() normally.
const DEFAULT_ADMIN_HASH =
  '$2b$10$SD3j68yr8HECB8SQoKGuyeibu.i6DF5WRNJk2VzIO1FSHeuivB1W6'; // 1038796568
const DEFAULT_DEMO_HASH =
  '$2b$10$sSsjthGlSaoEpIp0BtZiNOMqg7Movdv5YCf6zN9rfBlmkCNSfPlEK'; // demo

// SQLite DDL mirroring prisma/schema.prisma. All statements use
// CREATE TABLE IF NOT EXISTS so re-running is safe. Generated with:
//   prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'client',
    "status" TEXT NOT NULL DEFAULT 'active',
    "credits" INTEGER NOT NULL DEFAULT 10,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "DocumentTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "legalArea" TEXT NOT NULL,
    "audience" TEXT NOT NULL DEFAULT 'particulares',
    "status" TEXT NOT NULL DEFAULT 'published',
    "price" REAL NOT NULL DEFAULT 0,
    "estimatedQuestions" INTEGER NOT NULL DEFAULT 10,
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 5,
    "rating" REAL NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "thumbnail" TEXT,
    "baseContent" TEXT NOT NULL,
    "headerContent" TEXT,
    "footerContent" TEXT,
    "wizardConfig" TEXT NOT NULL,
    "blurPreview" BOOLEAN NOT NULL DEFAULT false,
    "blurParagraphs" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Clause" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "legalArea" TEXT,
    "category" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "TemplateClause" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "templateId" TEXT NOT NULL,
    "clauseId" TEXT NOT NULL,
    "sectionName" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TemplateClause_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TemplateClause_clauseId_fkey" FOREIGN KEY ("clauseId") REFERENCES "Clause" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "TemplateNormativity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "templateId" TEXT NOT NULL,
    "lawName" TEXT NOT NULL,
    "lawReference" TEXT NOT NULL,
    "articleNumber" TEXT,
    "description" TEXT,
    CONSTRAINT "TemplateNormativity_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "UserDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "templateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "answers" TEXT NOT NULL,
    "generatedContent" TEXT,
    "visitorPhone" TEXT,
    "visitorName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserDocument_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DocumentTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactType" TEXT NOT NULL,
    "documentType" TEXT,
    "documentNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "companyName" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "DocumentRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'COP',
    "paymentMethod" TEXT,
    "paymentGateway" TEXT,
    "transactionRef" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "planName" TEXT,
    "documentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "CreditTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "adminId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CreditTransaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "KnowledgeBase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Publication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "SiteSetting_key_key" ON "SiteSetting"("key");
`;

/**
 * Idempotent column additions for databases created before a schema field
 * existed (SQLite has no "ADD COLUMN IF NOT EXISTS", so duplicate-column
 * errors are simply swallowed).
 */
const COLUMN_MIGRATIONS: string[] = [
  `ALTER TABLE "DocumentTemplate" ADD COLUMN "blurPreview" BOOLEAN NOT NULL DEFAULT false`,
  `ALTER TABLE "DocumentTemplate" ADD COLUMN "blurParagraphs" TEXT NOT NULL DEFAULT '[]'`,
];

export async function ensureDatabaseInitialised(prisma: MinimalPrisma): Promise<void> {
  if (g.__dbInitialised) return;
  g.__dbInitialised = true;

  let needsSchema = false;
  try {
    await prisma.user.count();
  } catch {
    needsSchema = true;
  }

  if (needsSchema) {
    console.log('[init-db] Schema missing — creating tables ...');
    try {
      // SQLite's executeRawUnsafe only runs one statement at a time, so split
      // the DDL into individual statements and run them sequentially.
      const statements = SCHEMA_SQL.split(';').map((s) => s.trim()).filter(Boolean);
      for (const stmt of statements) {
        await prisma.$executeRawUnsafe(stmt);
      }
      console.log(`[init-db] Schema created (${statements.length} statements).`);
    } catch (e) {
      console.error('[init-db] schema creation failed:', e instanceof Error ? e.message : e);
      return;
    }
  }

  // Apply pending column migrations on existing databases (no-op when the
  // column is already present).
  for (const sql of COLUMN_MIGRATIONS) {
    try {
      await prisma.$executeRawUnsafe(sql);
      console.log('[init-db] migration applied:', sql.slice(0, 60), '...');
    } catch {
      // column already exists — expected on every boot after the first
    }
  }

  let userCount = 0;
  try {
    userCount = await prisma.user.count();
  } catch {
    return;
  }

  if (userCount === 0) {
    console.log('[init-db] No users found — seeding default accounts ...');
    await seedDefaultUsers(prisma).catch((e) => {
      console.error('[init-db] seed failed:', e instanceof Error ? e.message : e);
    });
  } else {
    console.log(`[init-db] OK (${userCount} users present).`);
  }
}

/** Create the default admin + demo users documented in the README. */
async function seedDefaultUsers(prisma: MinimalPrisma): Promise<void> {
  await prisma.user.upsert({
    where: { username: '1038796568' },
    update: {},
    create: {
      username: '1038796568',
      passwordHash: DEFAULT_ADMIN_HASH,
      name: 'Administrador',
      email: 'admin@lexdoc.co',
      phone: '3001234567',
      role: 'admin',
      status: 'active',
      credits: 999,
    },
  });

  await prisma.user.upsert({
    where: { username: 'demo' },
    update: {},
    create: {
      username: 'demo',
      passwordHash: DEFAULT_DEMO_HASH,
      name: 'Cliente Demo',
      email: 'demo@lexdoc.co',
      phone: '3109876543',
      role: 'client',
      status: 'active',
      credits: 10,
    },
  });

  console.log('[init-db] Default users seeded (admin + demo).');
}
