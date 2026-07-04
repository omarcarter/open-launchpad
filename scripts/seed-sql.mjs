import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const db = new Database(dbPath);

const run = db.transaction(() => {
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
    JSON.stringify({ pages: ["/", "/dashboard", "/settings"], theme: "light" }),
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
});
run();

const counts = {
  users: db.prepare("SELECT count(*) FROM User").get().count,
  templates: db.prepare("SELECT count(*) FROM Template").get().count,
  launches: db.prepare("SELECT count(*) FROM Launch").get().count,
  integrations: db.prepare("SELECT count(*) FROM Integration").get().count,
};

console.log("Seeded:", counts);
db.close();
