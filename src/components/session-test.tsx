'use client';
import { useEffect, useState } from 'react';

export default function SessionTest() {
  const [session, setSession] = useState<{ authenticated: boolean; user?: { name?: string; email?: string } }>({ authenticated: false });
  useEffect(() => {
    fetch('/api/auth/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then(({ session: s }) => setSession({ authenticated: Boolean(s && s.id), user: s }));
  }, []);
  return (
    <div className="rounded-lg border p-4 text-sm">
      <div className="font-medium">Auth state</div>
      <div className="mt-2">{session.authenticated ? `Signed in as ${session.user?.email}` : 'Not signed in'}</div>
    </div>
  );
}
