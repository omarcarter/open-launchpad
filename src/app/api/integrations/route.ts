import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(_request: Request) {
  const rows = query("SELECT * FROM Integration ORDER BY updatedAt DESC") as Array<Record<string, unknown>>;
  const integrations = rows.map((item) => ({
    id: item.id,
    name: item.name,
    provider: item.provider,
    config: JSON.parse((item.config as string) || "{}"),
  }));
  return NextResponse.json({ integrations });
}
