-- Ink Junction PostgreSQL Schema
-- NOTE: This file is for reference only.
-- The actual schema is managed by Prisma (prisma/schema.prisma).
-- Use `npm run prisma:push` or `npm run prisma:migrate` to apply schema changes.

CREATE TABLE IF NOT EXISTS "Portfolio" (
  "id"        SERIAL PRIMARY KEY,
  "type"      TEXT NOT NULL,
  "src"       TEXT NOT NULL,
  "beforeSrc" TEXT,
  "style"     TEXT NOT NULL,
  "caption"   TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Portfolio_style_idx" ON "Portfolio" ("style");

CREATE TABLE IF NOT EXISTS "Content" (
  "id"          SERIAL PRIMARY KEY,
  "key"         TEXT NOT NULL UNIQUE,
  "value"       JSONB NOT NULL,
  "category"    TEXT NOT NULL DEFAULT 'text',
  "description" TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Offer" (
  "id"          SERIAL PRIMARY KEY,
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "type"        TEXT NOT NULL,
  "src"         TEXT NOT NULL,
  "isActive"    BOOLEAN NOT NULL DEFAULT true,
  "expiresAt"   TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
