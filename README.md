# Simple Blog CRUD — Next.js + Prisma 7 + SQLite

This is a modified version of the original blog-app project for the CRUD + Vercel assignment.

## CRUD features
- **Create:** add a post with title/content
- **Read:** list, search by title, and review a post
- **Update:** edit an existing post
- **Delete:** delete a post after confirmation

## Local setup
1. Install Node.js (LTS) and open this folder in VS Code.
2. Copy `.env.example` to `.env` (the default local SQLite URL is already set).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma Client and create/apply the local database migration:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Start:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000

## Database
Prisma ORM 7 with the SQLite provider and `@prisma/adapter-libsql` is used. Local development uses `file:./prisma/dev.db`.

## Vercel deployment (recommended persistent SQLite-compatible DB)
Vercel serverless functions should not rely on a writable local SQLite file for persistent data. To keep SQLite as the assignment asks, use a hosted SQLite-compatible database such as Turso/libSQL.

1. Create a Turso database and obtain its database URL and auth token.
2. In the Turso database, apply the table schema. One simple route is to use Prisma's migration SQL locally and apply it through the Turso SQL shell; alternatively create the `Post` table with:
   ```sql
   CREATE TABLE "Post" (
     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
     "title" TEXT NOT NULL,
     "content" TEXT NOT NULL,
     "createdAt" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" TEXT NOT NULL
   );
   ```
   Prisma's migration may use slightly different date-time representation; if using the generated migration, prefer applying that exact SQL to Turso.
3. Push this project to GitHub (do **not** commit `.env`).
4. Import the GitHub repository in Vercel.
5. In Vercel Project → Settings → Environment Variables, set:
   - `DATABASE_URL` = Turso `libsql://...` database URL
   - `TURSO_AUTH_TOKEN` = Turso token
6. Deploy. If you added environment variables after a deployment, redeploy.

## Environment variables
- `DATABASE_URL`: local `file:./prisma/dev.db` or remote `libsql://...`
- `TURSO_AUTH_TOKEN`: only required for the hosted Turso database

Never upload `.env` or secrets to GitHub.
