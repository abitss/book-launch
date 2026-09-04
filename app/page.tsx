import Link from "next/link";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks, getCategories } from "@/lib/catalog";
import { ArrowRight, BookMarked, Download, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default async function Home() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  const featured = books.filter((book) => book.featured).slice(0, 8);
  const shelf = featured.length ? featured : books.slice(0, 8);
  const deals = books.filter((book) => book.original_price && book.original_price > book.price).slice(0, 8);
  const newest = books.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#fffdf7] text-stone-950">
      <StoreNav />

      <section className="border-b border-stone-200 bg-[radial-gradient(circle_at_top_left,_#fef3c7,_transparent_32%),linear-gradient(180deg,#fffdf7_0%,#f8f3e9_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[.16em] text-amber-800"><Sparkles size={14} /> Digital bookstore, built for India</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-7xl">Find your next <span className="text-amber-600">obsession.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">Study smarter, grow faster, escape deeper. Browse ebooks across exam prep, business, fiction and self-growth, then start reading right after secure payment.</p>

            <form action="/search" className="mt-7 flex max-w-2xl items-center gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_12px_40px_rgba(38,31,20,.08)]">
              <Search size={20} className="ml-2 text-stone-400" />
              <input name="q" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none sm:text-base" placeholder="Search by title, author or category" aria-label="Search bookstore" />
              <button className="rounded-xl bg-stone-950 px-4 py-2.5 text-sm font-black text-white sm:px-5">Search</button>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 font-black text-stone-950 transition hover:bg-amber-300">Explore bookstore <ArrowRight size={17} /></Link>
              <Link href="#categories" className="rounded-2xl border border-stone-300 bg-white px-5 py-3 font-black transition hover:bg-stone-50">Browse categories</Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 text-sm font-semibold text-stone-600 sm:grid-cols-3">
              <span className="flex items-center gap-2"><Zap size={16} className="text-amber-600" /> Instant access</span>
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-amber-600" /> Secure checkout</span>
              <span className="flex items-center gap-2"><Download size={16} className="text-amber-600" /> Digital delivery</span>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-[36px] bg-stone-950 p-7 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_18%_15%,#fbbf24_0,transparent_28%),radial-gradient(circle_at_80%_85%,#92400e_0,transparent_26%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div><p className="text-xs font-black uppercase tracking-[.18em] text-amber-300">eBookies shelves</p><h2 className="mt-4 max-w-md text-4xl font-black tracking-tight">One store. Many rabbit holes.</h2><p className="mt-3 max-w-md text-sm leading-6 text-stone-400">Jump straight into the shelf that matches your mood, exam or ambition.</p></div>
              <div className="grid grid-cols-2 gap-3">{categories.slice(0, 4).map((category, index) => <Link href={`/category/${category.slug}`} key={category.id} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15"><div className="text-xs text-white/40">0{index + 1}</div><div className="mt-4 font-black">{category.name}</div><div className="mt-2 text-xs text-white/50">Open shelf →</div></Link>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Browse your way</p><h2 className="mt-2 text-3xl font-black tracking-tight">Shop by category</h2></div><Link href="/search" className="hidden text-sm font-black sm:inline">View all books →</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[24px] border border-stone-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><div className="text-lg font-black">{category.name}</div><ArrowRight size={17} className="text-stone-300 transition group-hover:translate-x-1 group-hover:text-stone-950" /></div><p className="mt-2 text-sm leading-6 text-stone-500">{category.description || "Explore this shelf"}</p><div className="mt-5 text-xs font-black uppercase tracking-[.12em] text-amber-700">Browse shelf</div></Link>)}</div>
      </section>

      <section id="featured" className="border-y border-stone-200 bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Editor shelf</p><h2 className="mt-2 text-3xl font-black tracking-tight">Featured picks</h2></div><Link href="/search" className="hidden text-sm font-black sm:inline">Browse everything →</Link></div>
          {shelf.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center text-stone-500">New titles are being prepared for this shelf.</div>}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-[32px] bg-amber-300 p-7 sm:p-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.18em] text-amber-950/60">Smart buys</p><h2 className="mt-2 text-3xl font-black tracking-tight">Deals worth bookmarking</h2><p className="mt-2 max-w-xl text-sm leading-6 text-amber-950/70">Discounted digital editions currently available in the catalog.</p></div><Link href="/search" className="inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-950 px-5 py-3 text-sm font-black text-white">See all titles <ArrowRight size={16} /></Link></div>
          <div className="mt-8">{deals.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{deals.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-2xl bg-white/50 p-6 text-sm font-semibold text-amber-950/70">Fresh deals will appear here automatically whenever a title has a discounted price.</div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-7"><p className="text-sm font-black uppercase tracking-[.14em] text-amber-700">Keep browsing</p><h2 className="mt-2 text-3xl font-black tracking-tight">More from the catalog</h2></div>
        {newest.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{newest.map((book) => <BookCard key={book.id} book={book} />)}</div> : null}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 rounded-[32px] border border-stone-200 bg-white p-7 sm:grid-cols-3 sm:p-9">
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800"><BookMarked size={18} /></span><div><h3 className="font-black">Curated shelves</h3><p className="mt-1 text-sm leading-6 text-stone-500">Organized by category so discovery stays simple.</p></div></div>
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800"><ShieldCheck size={18} /></span><div><h3 className="font-black">Protected checkout</h3><p className="mt-1 text-sm leading-6 text-stone-500">Payments are verified server-side before fulfillment.</p></div></div>
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800"><Download size={18} /></span><div><h3 className="font-black">Digital-first delivery</h3><p className="mt-1 text-sm leading-6 text-stone-500">Get access quickly after a successful verified payment.</p></div></div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
