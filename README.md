# Recreational MixMaster Website

Recreational website for MixMaster PvP game server.

## Stack

The frontend is a Next.js 15 App Router app in React 19 and TypeScript, styled with Tailwind CSS 4 plus shared CSS under `src/style/`, using Axios (and a few Next route handlers) to talk to the API. Pages cover home (fullbanner, news, ranking), mix, shop, ranking, download, siege affair, changelog, and account (sign-in, sign-up, characters, hench, items). The backend is a Fastify TypeScript API with `@fastify/jwt`, CORS, multipart uploads, and Zod, organized as one route module per domain (`auth`, `users`, `menus`, `changelogs`, `hench`, `items`, `mix`, `hero`, `mall`). Prisma talks to PostgreSQL for site content (changelogs, menus) and to the MySQL MixMaster databases (`web`, `game`, `member`, `server`).

## Structure

The repo is an npm workspace split into `frontend/` and `backend/`. Inside `frontend/src/`, `app/` holds App Router pages and colocated UI, `app/api/` holds the Axios clients (plus a few Next auth proxy routes), `components/` is the chrome (header, menus, footer), and `types/`, `hooks/`, and `utils/` are shared. Environments point at `http://localhost:3333` via `NEXT_PUBLIC_BACKEND_API_URL`. The `backend/` app starts from `src/server.ts` (default port 3333), with Prisma schemas under `prisma/postgresql/` and `prisma/mysql/{web,game,member,server}/`. Root `npm run dev` starts both workspaces through `scripts/dev.mjs`.
