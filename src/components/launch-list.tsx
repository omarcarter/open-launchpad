import { selectLaunches } from "@/lib/db";

export function LaunchList() {
  const launches = selectLaunches()
    .slice(0, 10)
    .map((item) => ({
      id: String(item.id),
      title: String(item.title),
      description: (item.description as string) ?? "",
      status: String(item.status),
      visibility: String(item.visibility),
    }));

  if (!launches.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        No launches yet. Kick one off.
      </div>
    );
  }

  return (
    <div className="space-y-3" aria-label="Launches">
      {launches.map((launch) => (
        <div
          key={launch.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-foreground/20"
        >
          <div>
            <div className="font-medium">{launch.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{launch.description || "No description"}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex rounded-md bg-secondary px-2 py-1 font-medium">{launch.status}</span>
            <span>{launch.visibility}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
