# OpenLaunchpad

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ship your next project faster with reusable launch templates, tracked launches, and integrations.

Repository: [https://github.com/omarcarter/open-launchpad](https://github.com/omarcarter/open-launchpad)

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
git clone https://github.com/omarcarter/open-launchpad.git
cd open-launchpad
npm install
```

## Environment Variables

Local SQLite uses the bundled `prisma/dev.db` automatically. If you switch to a database URL-based workflow, set `DATABASE_URL` to your database connection string.

## Usage

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## License

MIT
