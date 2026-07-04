import { NextResponse } from "next/server";
import { exec, query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    const existing = query("SELECT * FROM User WHERE email = ?", [email]) as Array<Record<string, unknown>>;
    if (existing.length) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    const id = `user-${Date.now()}`;
    exec("INSERT INTO User(id,email,name,role) VALUES(?,?,?,?)", [id, email, name ?? null, "user"]);
    return NextResponse.json({ id, email, name }, { status: 201 });
  } catch (e) {
    console.error("/api/auth/signup failed", e);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
