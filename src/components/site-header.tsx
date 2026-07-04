import Link from "next/link";

export function SiteHeader({ session }: { session: { user?: { email?: string } } | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold tracking-tight">
            OpenLaunchpad
          </Link>
          <span className="text-xs text-muted-foreground">α</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link href="/templates" className="hidden rounded-md px-3 py-2 text-sm hover:bg-neutral-100 sm:inline-flex">Templates</Link>
          <Link href="/dashboard" className="hidden rounded-md px-3 py-2 text-sm hover:bg-neutral-100 sm:inline-flex">Dashboard</Link>
          <Link href="/settings" className="hidden rounded-md px-3 py-2 text-sm hover:bg-neutral-100 sm:inline-flex">Settings</Link>
          {session?.user?.email ? (
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="rounded-md border px-3 py-2 text-sm">Logout</button>
            </form>
          ) : (
            <form action="/api/auth/login" method="post">
              <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm text-white">Demo login</button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
