import { SiteHeader } from "@/components/site-header";
import { LaunchList } from "@/components/launch-list";
import { IntegrationPanel } from "@/components/integration-panel";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader session={null} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Your launches, integrations, and recent activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <input name="title" required placeholder="New launch name" className="h-9 w-64 rounded-md border border-border bg-background px-3 text-sm outline-none" />
            <button type="button" className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Create</button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <section className="md:col-span-2" aria-label="Recent launches">
            <LaunchList />
          </section>
          <aside className="space-y-6">
            <IntegrationPanel initialUserId={null} />
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Account</h2>
              <div className="mt-3 text-sm">Not signed in</div>
              <form action="/api/auth/login" method="post" className="mt-3">
                <button type="submit" className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Login as demo</button>
              </form>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
