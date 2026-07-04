'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then(({ session }) => setAuthed(Boolean(session)));
  }, []);
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-tight">OpenLaunchpad</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/templates" className="hover:underline">Templates</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/settings" className="hover:underline">Settings</Link>
          {authed ? (
            <form action="/api/auth/logout" method="post">
              <button className="rounded-md border px-3 py-1.5">Logout</button>
            </form>
          ) : (
            <Link href="/login" className="rounded-md border px-3 py-1.5">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
