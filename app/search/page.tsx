import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/catalog";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const books = await getBooks();
  const filtered = query ? books.filter((book) => [book.title, book.author, book.category_slug, book.subcategory_slug || ""].join(" ").toLowerCase().includes(query)) : books;

  return (
    <main className="min-h-screen bg-[#FFFCF7] text-[#1F2937]">
      <StoreNav />
      <section className="border-b border-[#E4E9F0] bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFCF7_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-[.14em] text-[#B76800]">Discover</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-.03em] text-[#0B2D5B] sm:text-5xl">{query ? `Results for “${q}”` : "Browse all ebooks"}</h1>
          <p className="mt-3 text-[#64748B]">{filtered.length} title{filtered.length === 1 ? "" : "s"} found</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>
        {!filtered.length ? <div className="mt-10 rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center text-[#7C8CA1]">No matching ebooks. Try another title, author or category.</div> : null}
      </section>
      <StoreFooter />
    </main>
  );
}
