import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooksByCategory, getCategories } from "@/lib/catalog";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const books = await getBooksByCategory(slug);

  return (
    <main className="min-h-screen bg-[#FFFCF7] text-[#1F2937]">
      <StoreNav />
      <section className="border-b border-[#E4E9F0] bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFCF7_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#B76800] sm:text-sm">Category</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B] sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12">
        <div className="mb-5 flex items-center justify-between sm:mb-6"><p className="text-sm font-medium text-[#7C8CA1]">{books.length} title{books.length === 1 ? "" : "s"}</p></div>
        <div className="grid gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>
        {!books.length ? <div className="mt-8 rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-8 text-center text-sm leading-6 text-[#7C8CA1] sm:mt-10 sm:p-12">No published books in this category yet.</div> : null}
      </section>
      <StoreFooter />
    </main>
  );
}
