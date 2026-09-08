import { NextResponse } from "next/server";
import { getBooks } from "@/lib/catalog";

export async function GET() {
  const books = await getBooks();
  const ready = books.filter((book) => book.purchasable && book.file_path);
  return NextResponse.json({
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    totalBooks: books.length,
    readyForSale: ready.length,
    readyBookIds: ready.map((book) => book.id)
  }, { headers: { "Cache-Control": "no-store" } });
}
