import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/catalog";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const books = await getBooks();
  const filtered = query ? books.filter((book) => [book.title, book.author, book.category_slug, book.subcategory_slug || ""].join(" ").toLowerCase().includes(query)) : books;
  return <main className="min-h-screen bg-[#fffdf7]"><StoreNav /><section className="mx-auto max-w-7xl px-6 py-14"><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Search</p><h1 className="mt-2 text-4xl font-black tracking-tight">{query ? `Results for “${q}”` : "Browse all ebooks"}</h1><p className="mt-3 text-stone-500">{filtered.length} title{filtered.length === 1 ? "" : "s"} found</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>{!filtered.length ? <div className="mt-10 rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-500">No matching ebooks. Try another title, author or category.</div> : null}</section><StoreFooter /></main>;
}
