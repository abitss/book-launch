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
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#B76800] sm:text-sm">Discover</p>
          <h1 className="mt-2 break-words text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B] sm:text-5xl">{query ? `Results for “${q}”` : "Browse all ebooks"}</h1>
          <p className="mt-3 text-sm text-[#64748B] sm:text-base">{filtered.length} title{filtered.length === 1 ? "" : "s"} found</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12">
        <div className="grid gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>
        {!filtered.length ? <div className="mt-8 rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-8 text-center text-sm leading-6 text-[#7C8CA1] sm:mt-10 sm:p-12">No matching ebooks. Try another title, author or category.</div> : null}
      </section>
      <StoreFooter />
    </main>
  );
}
