import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
if (!fs.existsSync(path.join(process.cwd(), "prisma"))) {
  fs.mkdirSync(path.join(process.cwd(), "prisma"), { recursive: true });
}

const sqls = [
  "PRAGMA journal_mode = WAL",
  "PRAGMA foreign_keys = ON",
  "PRAGMA busy_timeout = 5000",
  "PRAGMA cache_size = -64000",
  `CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    image TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS Template (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    stack TEXT NOT NULL DEFAULT 'next',
    config TEXT NOT NULL DEFAULT '{}',
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Launch (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    visibility TEXT NOT NULL DEFAULT 'private',
    url TEXT,
    tags TEXT NOT NULL DEFAULT '[]',
    userId TEXT NOT NULL,
    templateId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (templateId) REFERENCES Template(id)
  )`,
  `CREATE TABLE IF NOT EXISTS Integration (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    config TEXT NOT NULL DEFAULT '{}',
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS AnalyticsEvent (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    properties TEXT,
    userId TEXT,
    launchId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (launchId) REFERENCES Launch(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    userAgent TEXT,
    ip TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS AuthPassword (
    userId TEXT PRIMARY KEY,
    hash TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`,
];

const db = new Database(dbPath);
for (const sql of sqls) {
  try { db.exec(sql); } catch {}
}
db.close();
console.log(`Initialized DB at ${dbPath}`);
