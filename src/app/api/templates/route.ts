import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const rows = query("SELECT * FROM Template ORDER BY createdAt DESC") as Array<Record<string, unknown>>;
  const templates = rows.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    stack: item.stack,
  }));
  return NextResponse.json({ templates });
}
