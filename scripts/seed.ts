import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function count(label: string, fn: () => Promise<unknown>) {
  const num = (await fn()) as number;
  console.log(`${label}: ${num}`);
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@openlaunchpad.dev" },
    update: {},
    create: { email: "demo@openlaunchpad.dev", name: "Demo Builder", role: "user" },
  });

  const templates = [
    { name: "Starter SaaS", description: "Landing, dashboard, billing, auth.", category: "SaaS", stack: "next", config: JSON.stringify({ pages: ["/", "/dashboard", "/settings"], theme: "light" }), userId: user.id },
    { name: "AI Agent App", description: "Chat UI, tools, memory, logs.", category: "AI", stack: "next", config: JSON.stringify({ runtime: "edge", model: "demo" }), userId: user.id },
    { name: "Open Source Portfolio", description: "Blog, projects, docs, search.", category: "Content", stack: "next", config: JSON.stringify({ sections: ["projects", "writing", "resume"] }), userId: user.id },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: `template-seed-${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
      update: {},
      create: template,
    });
  }

  const launches = [
    { title: "OpenLaunchpad Alpha", description: "Public preview of reusable launch templates.", status: "public", visibility: "public", url: "https://openlaunchpad.dev", tags: JSON.stringify(["alpha", "builder"]), userId: user.id, templateId: null },
    { title: "Internal Nightly", description: "Nightly build template test run.", status: "draft", visibility: "private", tags: JSON.stringify(["internal"]), userId: user.id, templateId: null },
  ];

  for (const launch of launches) {
    await prisma.launch.create({ data: launch });
  }

  await prisma.integration.upsert({
    where: { id: `integration-seed-vercel` },
    update: {},
    create: { id: `integration-seed-vercel`, name: "Vercel Preview", provider: "vercel", config: JSON.stringify({ teamId: "demo" }), userId: user.id },
  });

  console.log("Seeded.");
  await count("Users", () => prisma.user.count());
  await count("Templates", () => prisma.template.count());
  await count("Launches", () => prisma.launch.count());
  await count("Integrations", () => prisma.integration.count());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
