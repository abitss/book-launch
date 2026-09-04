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
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-[.14em] text-[#B76800]">Category</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-.03em] text-[#0B2D5B] sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#64748B]">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between"><p className="text-sm font-medium text-[#7C8CA1]">{books.length} title{books.length === 1 ? "" : "s"}</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>
        {!books.length ? <div className="mt-10 rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center text-[#7C8CA1]">No published books in this category yet.</div> : null}
      </section>
      <StoreFooter />
    </main>
  );
}
