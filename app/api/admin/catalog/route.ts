import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { adminDelete, adminInsert, adminListCatalog, adminUpdate } from "@/lib/catalog";

const allowedTables = new Set(["books", "categories", "subcategories"]);

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await adminListCatalog());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { action, table, id, value } = body;
    if (!allowedTables.has(table)) return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    if (action === "create") return NextResponse.json(await adminInsert(table, value));
    if (action === "update" && id) return NextResponse.json(await adminUpdate(table, id, value));
    if (action === "delete" && id) return NextResponse.json(await adminDelete(table, id));
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Catalog action failed" }, { status: 500 });
  }
}
