import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const row = queryOne("SELECT * FROM Template WHERE id = ?", [id]) as Record<string, unknown> | null;
  if (!row) return NextResponse.json({ template: null }, { status: 404 });
  return NextResponse.json({
    template: {
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      stack: row.stack,
      config: JSON.parse((row.config as string) || "{}"),
    },
  });
}
