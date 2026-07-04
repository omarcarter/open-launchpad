import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(_request: Request) {
  const rows = query("SELECT * FROM Launch ORDER BY updatedAt DESC") as Array<Record<string, unknown>>;
  const launches = rows.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status,
    tags: JSON.parse((item.tags as string) || "[]"),
  }));
  return NextResponse.json({ launches });
}
