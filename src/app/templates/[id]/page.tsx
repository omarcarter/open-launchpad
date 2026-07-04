import { getTemplateById } from "@/components/templates";
import { SiteHeader } from "@/components/site-header";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function TemplateDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const raw = getTemplateById(decodeURIComponent(params.id));
  const tmpl = raw
    ? {
        id: String(raw.id),
        name: String(raw.name),
        description: (raw.description as string) || null,
        category: String(raw.category),
        stack: String(raw.stack),
        config: typeof raw.config === "string" ? raw.config : JSON.stringify(raw.config ?? {}),
      }
    : null;

  if (!tmpl) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader session={null} />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-semibold tracking-tight">Template not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">The template you requested doesn&apos;t exist or was removed.</p>
          <Link href="/templates" className="mt-4 inline-flex text-sm underline">Back to templates</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{tmpl.category}</div>
          <h1 className="text-2xl font-semibold tracking-tight">{tmpl.name}</h1>
          <p className="text-sm text-muted-foreground">{tmpl.description || ""}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <section className="md:col-span-2 rounded-xl border border-border bg-card p-5" aria-label="Configuration preview">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Config</h2>
            <pre className="mt-3 overflow-x-auto rounded-md bg-muted/50 p-4 text-xs leading-relaxed">
              {JSON.stringify(JSON.parse(tmpl.config || "{}"), null, 2)}
            </pre>
          </section>
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Actions</h2>
              <form action="/api/launches" method="post" className="mt-3 flex flex-col gap-2">
                <input type="hidden" name="templateId" value={tmpl.id} />
                <input
                  name="title"
                  required
                  placeholder="Launch title"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none"
                />
                <textarea
                  name="description"
                  placeholder="What are you shipping?"
                  className="min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
                />
                <button type="submit" className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">
                  Create launch
                </button>
              </form>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Stack</h2>
              <div className="mt-2 text-sm">{tmpl.stack}</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
