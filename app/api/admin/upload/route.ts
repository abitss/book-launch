import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { uploadToBucket } from "@/lib/catalog";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    const kind = form.get("kind");
    if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "File is required" }, { status: 400 });
    if (kind !== "cover" && kind !== "ebook") return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    if (kind === "cover" && !file.type.startsWith("image/")) return NextResponse.json({ error: "Cover must be an image" }, { status: 400 });
    if (kind === "ebook" && file.size > 100 * 1024 * 1024) return NextResponse.json({ error: "Ebook exceeds 100 MB" }, { status: 400 });
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
    const path = `${Date.now()}-${safeName}`;
    const value = await uploadToBucket(path, file, kind === "cover" ? "covers" : "ebooks");
    return NextResponse.json({ success: true, value });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
