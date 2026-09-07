import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const slugPattern = /^[a-z0-9-]+$/;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugPattern.test(slug)) return new NextResponse("Invalid cover", { status: 400 });

  try {
    const filePath = path.join(process.cwd(), "public", "covers", `${slug}.webp.txt`);
    const base64 = (await readFile(filePath, "utf8")).trim();
    const bytes = Buffer.from(base64, "base64");
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new NextResponse("Cover not found", { status: 404 });
  }
}
