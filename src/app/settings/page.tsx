'use client';

import { useState } from 'react';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SettingsForm />
    </div>
  );
}

export function SettingsForm() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      className="mx-auto max-w-2xl space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus('Saved');
        setTimeout(() => setStatus(null), 1500);
      }}
    >
      <section className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your workspace preferences.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Visibility preference</label>
            <select name="visibility" className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none">
              <option value="private">Private by default</option>
              <option value="public">Public by default</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="beta" id="beta" className="size-4" />
            <label htmlFor="beta" className="text-sm">Join beta access</label>
          </div>
          <div>
            <label className="text-sm font-medium">Profile image URL</label>
            <input name="image" className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Save</button>
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
        </div>
      </section>
    </form>
  );
}
