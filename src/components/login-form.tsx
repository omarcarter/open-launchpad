"use client";

import { useFormStatus } from "react-dom";

export function LoginForm({ onLogin }: { onLogin: () => void }) {
  const { pending } = useFormStatus();
  async function action(formData: FormData) {
    "use server";
  }
  return (
    <form action="/api/auth/login" method="post" className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          defaultValue="demo@openlaunchpad.dev"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          defaultValue="Demo Builder"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
        />
      </div>
      <button disabled={pending} type="submit" className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">
        {pending ? "Signing in..." : "Continue"}
      </button>
    </form>
  );
}
