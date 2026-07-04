import { SelectTemplates } from "@/components/templates";
import { SiteHeader } from "@/components/site-header";
import { getSession } from "@/lib/auth";

export default async function TemplatesPage() {
  const session = await getSession();
  const raw = SelectTemplates();
  const templates = (raw as Array<Record<string, unknown>>).map((t) => ({
    id: String(t.id),
    name: String(t.name),
    description: (t.description as string) ?? "",
    category: String(t.category),
    stack: String(t.stack),
  }));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
          <p className="mt-1 text-sm text-muted-foreground">Production-ready starting points for every stack.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <a
              key={t.id}
              href={`/templates/${t.id}`}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-muted-foreground/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.category}</div>
                  <div className="mt-1 font-medium">{t.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">{t.stack}</div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{t.description || ""}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
