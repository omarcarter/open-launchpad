import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");
db.pragma("cache_size = -64000");

function ensureSchema(d: Database) {
  d.exec(`CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    image TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS Template (
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
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS Launch (
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
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS Integration (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    config TEXT NOT NULL DEFAULT '{}',
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS AnalyticsEvent (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    properties TEXT,
    userId TEXT,
    launchId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (launchId) REFERENCES Launch(id) ON DELETE CASCADE
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS Session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    userAgent TEXT,
    ip TEXT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`);
  d.exec(`CREATE TABLE IF NOT EXISTS AuthPassword (
    userId TEXT PRIMARY KEY,
    hash TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  )`);
  d.exec(`CREATE INDEX IF NOT EXISTS idx_template_user ON Template(userId)`);
  d.exec(`CREATE INDEX IF NOT EXISTS idx_launch_user ON Launch(userId)`);
}

ensureSchema(db);

const seeded = db.prepare("SELECT 1 FROM _seed_marker LIMIT 1").get();
if (!seeded) {
  db.exec("CREATE TABLE IF NOT EXISTS _seed_marker (id TEXT PRIMARY KEY)");
  db.prepare(
    "INSERT OR IGNORE INTO User(id,email,name,role) VALUES(?,?,?,?)"
  ).run("user-demo", "demo@openlaunchpad.dev", "Demo Builder", "user");

  db.prepare(
    "INSERT OR IGNORE INTO Template(id,name,description,category,stack,config,userId) VALUES(?,?,?,?,?,?,?)"
  ).run(
    "template-starter-saas",
    "Starter SaaS",
    "Landing, dashboard, billing, auth.",
    "SaaS",
    "next",
    JSON.stringify({ pages: ["/", "/dashboard", "/settings"], theme: "light" }),
    "user-demo"
  );
  db.prepare(
    "INSERT OR IGNORE INTO Template(id,name,description,category,stack,config,userId) VALUES(?,?,?,?,?,?,?)"
  ).run(
    "template-ai-agent-app",
    "AI Agent App",
    "Chat UI, tools, memory, logs.",
    "AI",
    "next",
    JSON.stringify({ runtime: "edge", model: "demo" }),
    "user-demo"
  );
  db.prepare(
    "INSERT OR IGNORE INTO Template(id,name,description,category,stack,config,userId) VALUES(?,?,?,?,?,?,?)"
  ).run(
    "template-open-source-portfolio",
    "Open Source Portfolio",
    "Blog, projects, docs, search.",
    "Content",
    "next",
    JSON.stringify({ sections: ["projects", "writing", "resume"] }),
    "user-demo"
  );
  db.prepare(
    "INSERT OR IGNORE INTO Launch(id,title,description,status,visibility,url,tags,userId,templateId) VALUES(?,?,?,?,?,?,?,?,?)"
  ).run(
    "launch-openlaunchpad-alpha",
    "OpenLaunchpad Alpha",
    "Public preview of reusable launch templates.",
    "public",
    "public",
    "https://openlaunchpad.dev",
    JSON.stringify(["alpha", "builder"]),
    "user-demo",
    null
  );
  db.prepare(
    "INSERT OR IGNORE INTO Launch(id,title,description,status,visibility,url,tags,userId,templateId) VALUES(?,?,?,?,?,?,?,?,?)"
  ).run(
    "launch-internal-nightly",
    "Internal Nightly",
    "Nightly build template test run.",
    "draft",
    "private",
    null,
    JSON.stringify(["internal"]),
    "user-demo",
    null
  );
  db.prepare(
    "INSERT OR IGNORE INTO Integration(id,name,provider,config,userId) VALUES(?,?,?,?,?)"
  ).run(
    "integration-vercel",
    "Vercel Preview",
    "vercel",
    JSON.stringify({ teamId: "demo" }),
    "user-demo"
  );

  db.prepare("INSERT OR IGNORE INTO _seed_marker(id) VALUES('1')").run();
}

export const initSql = db;

export function query(sql: string, params: unknown[] = []): Record<string, unknown>[] {
  const stmt = db.prepare(sql);
  return stmt.all(...params);
}

export function queryOne(sql: string, params: unknown[] = []): Record<string, unknown> | null {
  const stmt = db.prepare(sql);
  const row = stmt.get(...params);
  return row ?? null;
}

export function exec(sql: string, params: unknown[] = []) {
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}

export function selectUsers(): Record<string, unknown>[] {
  return query("SELECT * FROM User ORDER BY createdAt DESC");
}

export function selectTemplates(): Record<string, unknown>[] {
  return query("SELECT * FROM Template ORDER BY createdAt DESC");
}

export function selectTemplateById(id: string): Record<string, unknown> | null {
  return queryOne("SELECT * FROM Template WHERE id = ?", [id]);
}

export function selectLaunches(): Record<string, unknown>[] {
  return query("SELECT * FROM Launch ORDER BY createdAt DESC");
}

export function selectIntegrationByUser(userId: string): Record<string, unknown> | null {
  return queryOne(
    "SELECT * FROM Integration WHERE userId = ? ORDER BY createdAt DESC LIMIT 1",
    [userId]
  );
}
