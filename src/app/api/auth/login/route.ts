import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    const users = query("SELECT * FROM User WHERE email = ?", [email]) as Array<Record<string, unknown>>;
    const user = users[0];
    if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (e) {
    console.error("/api/auth/login failed", e);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
