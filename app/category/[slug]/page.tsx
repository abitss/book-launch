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
  return <main className="min-h-screen bg-[#fffdf7]"><StoreNav /><section className="mx-auto max-w-7xl px-6 py-14"><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Category</p><h1 className="mt-2 text-4xl font-black tracking-tight">{category.name}</h1><p className="mt-3 max-w-2xl text-stone-500">{category.description}</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>{!books.length ? <div className="mt-10 rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-500">No published books in this category yet.</div> : null}</section><StoreFooter /></main>;
}
