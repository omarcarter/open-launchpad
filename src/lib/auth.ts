export type Session = { user?: { id?: string; email?: string; name?: string } };

export async function getSession(): Promise<Session | null> {
  return null;
}

export async function requireUser(): Promise<null> {
  return null;
}

export async function createSession(userId: string) {
  return { session: null, user: null };
}

export async function clearSession(): Promise<null> {
  return null;
}
