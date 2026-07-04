# OpenLaunchpad

Ship your next project faster with reusable launch templates, tracked launches, and integrations.

---

## Overview

OpenLaunchpad is a developer-focused web app for moving projects from idea to deployed state faster. It provides reusable starter templates, a dashboard for draft and public launches, and integrations surfaced as shareable configurations. This repo is designed as a complete Next.js application you can run locally, explore, and extend.

## Features

- Landing page with product overview
- Dashboard for launch tracking
- Templates catalog with detail pages
- Settings page with profile behavior
- Auth API routes
- Launch and integrations API routes

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite

## Architecture

- `src/app` App Router pages and API routes
- `src/components` shared UI
- `prisma` schema, config, and seed
- `public` static assets

## Installation

```bash
npm install
```

## Environment Variables

Required:
- `DATABASE_URL` if using a database URL-based workflow; local SQLite uses the bundled `prisma/dev.db`.

## Usage

```bash
npm run dev
```

## License

MIT
