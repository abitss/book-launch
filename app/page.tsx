import Link from "next/link";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks, getCategories } from "@/lib/catalog";
import { ArrowRight, BookMarked, Sparkles, Zap } from "lucide-react";

export default async function Home() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  const featured = books.filter((book) => book.featured).slice(0, 8);
  const shelf = featured.length ? featured : books.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#fffdf7] text-stone-900">
      <StoreNav />
      <section className="overflow-hidden border-b border-stone-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-black uppercase tracking-[.16em] text-amber-800"><Sparkles size={14} /> Your next read lives here</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl lg:text-7xl">A bookstore built for the <span className="text-amber-600">download age.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Discover ebooks across exam prep, business, fiction and self-growth. Secure payments, instant digital delivery and a catalog that keeps growing.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="#featured" className="inline-flex items-center gap-2 rounded-2xl bg-[#171717] px-5 py-3 font-black text-white">Browse books <ArrowRight size={17} /></Link><Link href="#categories" className="rounded-2xl border border-stone-300 bg-white px-5 py-3 font-black">Explore categories</Link></div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-stone-500"><span className="flex items-center gap-2"><Zap size={16} /> Instant delivery</span><span className="flex items-center gap-2"><BookMarked size={16} /> Curated digital catalog</span></div>
          </div>
          <div className="relative min-h-[420px] rounded-[36px] bg-[#171717] p-7 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#fbbf24_0,transparent_28%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_20%)]" />
            <div className="relative flex h-full flex-col justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-amber-300">eBookies shelves</p><h2 className="mt-4 max-w-md text-4xl font-black tracking-tight">One store. Many rabbit holes.</h2></div><div className="grid grid-cols-2 gap-3">{categories.slice(0,4).map((category, index) => <Link href={`/category/${category.slug}`} key={category.id} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><div className="text-xs text-white/50">0{index+1}</div><div className="mt-4 font-black">{category.name}</div></Link>)}</div></div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Browse your way</p><h2 className="mt-2 text-3xl font-black tracking-tight">Categories</h2></div></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="rounded-[24px] border border-stone-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><div className="text-lg font-black">{category.name}</div><p className="mt-2 text-sm leading-6 text-stone-500">{category.description || "Explore this shelf"}</p><div className="mt-5 text-sm font-black">Open shelf →</div></Link>)}</div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-7"><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Fresh on the shelf</p><h2 className="mt-2 text-3xl font-black tracking-tight">Featured ebooks</h2></div>
        {shelf.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-3xl border border-dashed border-stone-300 p-12 text-center text-stone-500">No books published yet. Add your first title from Admin.</div>}
      </section>
      <StoreFooter />
    </main>
  );
}
