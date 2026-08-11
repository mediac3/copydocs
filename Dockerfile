# ── Stage 1: Dependencies ─────────────────────────────────────────
FROM node:20-alpine AS deps

# build-essential + python3 needed for node-gyp (native modules like bcryptjs)
RUN apk add --no-cache build-essential python3

WORKDIR /app

# Copy dependency manifests
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies for the build stage)
RUN npm install

# ── Stage 2: Builder ──────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN apk add --no-cache build-essential python3

WORKDIR /app

# Copy dependency manifests from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock ./

# Copy Prisma schema and generate the client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build the Next.js app (standalone output) and copy static assets + public
RUN npx next build && \
    cp -r .next/static .next/standalone/.next/ && \
    cp -r public .next/standalone/

# ── Stage 3: Production ───────────────────────────────────────────
FROM node:20-alpine AS runner

# Fonts for PDF generation (DejaVu Serif)
RUN apk add --no-cache font-dejavu

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create directories for uploads and database
RUN mkdir -p /app/uploads /app/db && \
    chown nextjs:nodejs /app/uploads /app/db

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy Prisma schema (needed for db push / seed at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/

# Copy node_modules for prisma CLI + bcryptjs at runtime
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules/

# Copy package.json for script resolution
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

USER nextjs

# Entrypoint: init DB, then start the server
ENTRYPOINT ["sh", "-c", \
  "npx prisma db push --accept-data-loss 2>/dev/null; \
   npx tsx prisma/seed.ts 2>/dev/null; \
   node server.js"]
