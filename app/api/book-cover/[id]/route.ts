import { NextResponse } from "next/server";
import { getBookById } from "@/lib/catalog";

const idPattern = /^[a-z0-9-]+$/;

function fallback(request: Request) {
  return NextResponse.redirect(new URL("/cover.png", request.url), 307);
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!idPattern.test(id)) return fallback(request);

  const book = await getBookById(id);
  if (!book?.cover_url) return fallback(request);

  if (book.cover_url.startsWith("/")) {
    return NextResponse.redirect(new URL(book.cover_url, request.url), 307);
  }

  try {
    const source = new URL(book.cover_url);
    if (!['http:', 'https:'].includes(source.protocol)) return fallback(request);

    const response = await fetch(source, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; eBookieeCoverBot/1.0)"
      },
      cache: "force-cache"
    });

    if (!response.ok) return fallback(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) return fallback(request);

    const bytes = await response.arrayBuffer();
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
      }
    });
  } catch {
    return fallback(request);
  }
}
