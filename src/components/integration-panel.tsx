"use client";

import { useState } from "react";

export function IntegrationPanel({ initialUserId }: { initialUserId: string | null }) {
  const [provider, setProvider] = useState("vercel");
  const [teamId, setTeamId] = useState("demo");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Integration</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {initialUserId ? `User id: ${initialUserId}` : "Not connected"}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <input value={provider} onChange={(e) => setProvider(e.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none" />
        <input value={teamId} onChange={(e) => setTeamId(e.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none" />
        <button
          type="button"
          onClick={() => {
            setStatus("Saved");
            setTimeout(() => setStatus(null), 1500);
          }}
          className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground"
        >
          Save
        </button>
      </div>
      {status && <p className="mt-2 text-xs text-muted-foreground">{status}</p>}
    </div>
  );
}
