import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const dir = path.join(process.cwd(), "prisma");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");
db.pragma("cache_size = -64000");

const stmts = [
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
  `CREATE INDEX IF NOT EXISTS idx_template_user ON Template(userId)`,
  `CREATE INDEX IF NOT EXISTS idx_launch_user ON Launch(userId)`,
];

for (const sql of stmts) {
  try { db.exec(sql); } catch {}
}

const insertUser = db.prepare(
  "INSERT OR IGNORE INTO User(id,email,name,role) VALUES(?,?,?,?)"
);
const insertTemplate = db.prepare(
  "INSERT OR IGNORE INTO Template(id,name,description,category,stack,config,userId) VALUES(?,?,?,?,?,?,?)"
);
const insertLaunch = db.prepare(
  "INSERT OR IGNORE INTO Launch(id,title,description,status,visibility,url,tags,userId,templateId) VALUES(?,?,?,?,?,?,?,?,?)"
);
const insertIntegration = db.prepare(
  "INSERT OR IGNORE INTO Integration(id,name,provider,config,userId) VALUES(?,?,?,?,?)"
);
insertUser.run("user-demo", "demo@openlaunchpad.dev", "Demo Builder", "user");

insertTemplate.run(
  "template-starter-saas",
  "Starter SaaS",
  "Landing, dashboard, billing, auth.",
  "SaaS",
  "next",
  JSON.stringify({ pages: ["/","/dashboard","/settings"], theme: "light" }),
  "user-demo"
);
insertTemplate.run(
  "template-ai-agent-app",
  "AI Agent App",
  "Chat UI, tools, memory, logs.",
  "AI",
  "next",
  JSON.stringify({ runtime: "edge", model: "demo" }),
  "user-demo"
);
insertTemplate.run(
  "template-open-source-portfolio",
  "Open Source Portfolio",
  "Blog, projects, docs, search.",
  "Content",
  "next",
  JSON.stringify({ sections: ["projects", "writing", "resume"] }),
  "user-demo"
);

insertLaunch.run(
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
insertLaunch.run(
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

insertIntegration.run(
  "integration-vercel",
  "Vercel Preview",
  "vercel",
  JSON.stringify({ teamId: "demo" }),
  "user-demo"
);
console.log("Users:", db.prepare("SELECT count(*) FROM User").get());
console.log("Templates:", db.prepare("SELECT count(*) FROM Template").get());
console.log("Launches:", db.prepare("SELECT count(*) FROM Launch").get());
console.log("Integrations:", db.prepare("SELECT count(*) FROM Integration").get());
db.close();
