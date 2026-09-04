import Link from "next/link";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks, getCategories } from "@/lib/catalog";
import { ArrowRight, BookMarked, CheckCircle2, Download, Search, ShieldCheck, Smartphone, Sparkles, Zap } from "lucide-react";

export default async function Home() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  const featured = books.filter((book) => book.featured).slice(0, 8);
  const shelf = featured.length ? featured : books.slice(0, 8);
  const deals = books.filter((book) => book.original_price && book.original_price > book.price).slice(0, 8);
  const newest = books.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#FFFCF7] text-[#1F2937]">
      <StoreNav />

      <section className="overflow-hidden border-b border-[#E4E9F0] bg-[radial-gradient(circle_at_15%_15%,rgba(253,186,74,.28),transparent_29%),radial-gradient(circle_at_88%_20%,rgba(11,45,91,.10),transparent_28%),linear-gradient(180deg,#FFFCF7_0%,#F8FAFC_100%)]">
        <div className="mx-auto grid max-w-7xl gap-11 px-6 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#F6D799] bg-white/85 px-3 py-1.5 text-xs font-semibold tracking-[.04em] text-[#9A5C05] shadow-sm"><Sparkles size={14} /> Curated digital books, simple secure buying</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] text-[#0B2D5B] sm:text-6xl lg:text-7xl">Good books for a <span className="text-[#F59E0B]">brighter you.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5F6F82]">Explore ebooks across exam preparation, business, fiction and self-growth. Find the right title, pay securely through Razorpay, and get digital access after verified payment.</p>

            <form action="/search" className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-[#DDE3EC] bg-white p-2 shadow-[0_16px_48px_rgba(11,45,91,.09)]">
              <Search size={20} className="ml-2 text-[#7C8CA1]" />
              <input name="q" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-[#1F2937] outline-none placeholder:text-[#94A3B8] sm:text-base" placeholder="Search title, author or category" aria-label="Search bookstore" />
              <button className="rounded-xl bg-[#0B2D5B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123E73] sm:px-5">Search</button>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex items-center gap-2 rounded-2xl bg-[#F59E0B] px-5 py-3 font-semibold text-[#0B2D5B] shadow-[0_8px_24px_rgba(245,158,11,.20)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A]">Browse books <ArrowRight size={17} /></Link>
              <Link href="#categories" className="rounded-2xl border border-[#CCD6E2] bg-white px-5 py-3 font-semibold text-[#0B2D5B] transition hover:border-[#9CB4D3] hover:bg-[#F8FAFC]">Explore categories</Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 text-sm font-medium text-[#64748B] sm:grid-cols-3">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#F59E0B]" /> Secure checkout</span>
              <span className="flex items-center gap-2"><Zap size={16} className="text-[#F59E0B]" /> Fast digital access</span>
              <span className="flex items-center gap-2"><Smartphone size={16} className="text-[#F59E0B]" /> Read across devices</span>
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-[36px] bg-[#0B2D5B] p-7 text-white shadow-[0_28px_70px_rgba(11,45,91,.22)]">
            <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_16%_14%,rgba(253,186,74,.45)_0,transparent_28%),radial-gradient(circle_at_82%_88%,rgba(245,158,11,.25)_0,transparent_29%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#FDBA4A]">Find your shelf</p>
                <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-[-.035em]">Less scrolling. Better discovery.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/62">Start with what matters to you, then compare titles, pricing and details before buying.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">{categories.slice(0, 4).map((category, index) => <Link href={`/category/${category.slug}`} key={category.id} className="group rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/13"><div className="text-xs text-[#FDBA4A]/75">0{index + 1}</div><div className="mt-4 font-semibold text-white">{category.name}</div><div className="mt-2 text-xs text-white/48 transition group-hover:text-white/75">Browse category →</div></Link>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E4E9F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-5 sm:grid-cols-3">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><ShieldCheck size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">Secure payment flow</p><p className="text-xs text-[#7C8CA1]">Razorpay checkout with server verification</p></div></div>
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><Download size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">Digital-first delivery</p><p className="text-xs text-[#7C8CA1]">Access follows successful verified payment</p></div></div>
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><CheckCircle2 size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">Clear purchase details</p><p className="text-xs text-[#7C8CA1]">Format, language and pricing shown upfront</p></div></div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#B76800]">Browse your way</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em] text-[#0B2D5B]">Shop by category</h2><p className="mt-2 text-sm text-[#7C8CA1]">Get to relevant books without digging through a crowded catalog.</p></div><Link href="/search" className="hidden text-sm font-semibold text-[#0B2D5B] sm:inline">View all books →</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[24px] border border-[#E4E9F0] bg-white p-5 shadow-[0_7px_24px_rgba(11,45,91,.04)] transition hover:-translate-y-1 hover:border-[#CBD7E5] hover:shadow-[0_18px_44px_rgba(11,45,91,.09)]"><div className="flex items-center justify-between"><div className="text-lg font-semibold text-[#0B2D5B]">{category.name}</div><ArrowRight size={17} className="text-[#A7B4C5] transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" /></div><p className="mt-2 text-sm leading-6 text-[#7C8CA1]">{category.description || "Explore this shelf"}</p><div className="mt-5 text-xs font-semibold uppercase tracking-[.12em] text-[#B76800]">Browse shelf</div></Link>)}</div>
      </section>

      <section id="featured" className="border-y border-[#E4E9F0] bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#B76800]">Worth exploring</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em] text-[#0B2D5B]">Featured books</h2><p className="mt-2 text-sm text-[#7C8CA1]">A focused shelf to make choosing your next read easier.</p></div><Link href="/search" className="hidden text-sm font-semibold text-[#0B2D5B] sm:inline">Browse everything →</Link></div>
          {shelf.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center text-[#7C8CA1]">New titles are being prepared for this shelf.</div>}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-[32px] border border-[#F5DCA7] bg-[linear-gradient(135deg,#FFF4D8_0%,#FFF9EC_100%)] p-7 sm:p-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#A86106]">Good value</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em] text-[#0B2D5B]">Current offers</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#7C6646]">Discounted digital editions currently available in the catalog. No fake countdowns, just the price shown.</p></div><Link href="/search" className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#0B2D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123E73]">See all titles <ArrowRight size={16} /></Link></div>
          <div className="mt-8">{deals.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{deals.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-2xl bg-white/70 p-6 text-sm font-medium text-[#7C6646]">Fresh offers will appear here automatically whenever a title has a discounted price.</div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#B76800]">Keep browsing</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em] text-[#0B2D5B]">More from the catalog</h2></div>
        {newest.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{newest.map((book) => <BookCard key={book.id} book={book} />)}</div> : null}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 rounded-[32px] border border-[#E4E9F0] bg-white p-7 shadow-[0_18px_55px_rgba(11,45,91,.06)] sm:grid-cols-3 sm:p-9">
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><BookMarked size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Easy discovery</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Categories and related titles keep browsing simple.</p></div></div>
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><ShieldCheck size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Protected checkout</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Payments are verified server-side before fulfillment.</p></div></div>
          <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><Download size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Transparent delivery</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Digital access is tied to successful verified payment.</p></div></div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
