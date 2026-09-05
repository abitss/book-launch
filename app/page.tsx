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

      <section className="overflow-hidden border-b border-[#E4E9F0] bg-[radial-gradient(circle_at_15%_15%,rgba(253,186,74,.24),transparent_29%),radial-gradient(circle_at_88%_20%,rgba(11,45,91,.08),transparent_28%),linear-gradient(180deg,#FFFCF7_0%,#F8FAFC_100%)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 pt-7 sm:px-6 sm:py-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-11 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#F6D799] bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-[.03em] text-[#9A5C05] shadow-sm sm:mb-5 sm:text-xs"><Sparkles size={13} /> Curated digital bookstore</div>
            <h1 className="max-w-3xl text-[2.35rem] font-semibold leading-[1.03] tracking-[-.045em] text-[#0B2D5B] min-[400px]:text-[2.65rem] sm:text-6xl lg:text-7xl">Find your next <span className="text-[#F59E0B]">great read.</span></h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#5F6F82] sm:mt-6 sm:text-lg sm:leading-8">Explore useful ebooks across exam preparation, business, fiction and self-growth. Clear pricing, secure payment and verified digital delivery.</p>

            <form action="/search" className="mt-5 flex max-w-2xl items-center gap-1.5 rounded-2xl border border-[#DDE3EC] bg-white p-1.5 shadow-[0_14px_38px_rgba(11,45,91,.08)] sm:mt-8 sm:gap-2 sm:p-2">
              <Search size={18} className="ml-2 shrink-0 text-[#7C8CA1] sm:size-5" />
              <input name="q" className="min-w-0 flex-1 bg-transparent px-1.5 py-2.5 text-base text-[#1F2937] outline-none placeholder:text-[#94A3B8] sm:px-2" placeholder="Search title or author" aria-label="Search bookstore" />
              <button className="shrink-0 rounded-xl bg-[#0B2D5B] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#123E73] min-[380px]:px-4 min-[380px]:text-sm sm:px-5">Search</button>
            </form>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/search" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-4 py-3 text-sm font-bold text-[#0B2D5B] shadow-[0_8px_24px_rgba(245,158,11,.20)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A] sm:px-5 sm:text-base">Browse books <ArrowRight size={16} /></Link>
              <Link href="#categories" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#CCD6E2] bg-white px-4 py-3 text-sm font-bold text-[#0B2D5B] transition hover:border-[#9CB4D3] hover:bg-[#F8FAFC] sm:px-5 sm:text-base">Categories</Link>
            </div>

            <div className="mt-5 grid max-w-2xl grid-cols-3 gap-2 text-center text-[10px] font-semibold text-[#64748B] sm:mt-8 sm:gap-3 sm:text-left sm:text-sm">
              <span className="flex flex-col items-center gap-1.5 rounded-xl bg-white/70 px-2 py-2.5 sm:flex-row sm:bg-transparent sm:p-0"><ShieldCheck size={15} className="shrink-0 text-[#16815A]" /> Secure payment</span>
              <span className="flex flex-col items-center gap-1.5 rounded-xl bg-white/70 px-2 py-2.5 sm:flex-row sm:bg-transparent sm:p-0"><Zap size={15} className="shrink-0 text-[#F59E0B]" /> Fast access</span>
              <span className="flex flex-col items-center gap-1.5 rounded-xl bg-white/70 px-2 py-2.5 sm:flex-row sm:bg-transparent sm:p-0"><Smartphone size={15} className="shrink-0 text-[#F59E0B]" /> Any device</span>
            </div>
          </div>

          <div className="relative min-h-[265px] overflow-hidden rounded-[24px] bg-[#0B2D5B] p-4 text-white shadow-[0_24px_60px_rgba(11,45,91,.20)] sm:min-h-[400px] sm:rounded-[36px] sm:p-7 lg:min-h-[440px]">
            <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_16%_14%,rgba(253,186,74,.45)_0,transparent_28%),radial-gradient(circle_at_82%_88%,rgba(245,158,11,.25)_0,transparent_29%)]" />
            <div className="relative flex h-full flex-col justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#FDBA4A] sm:text-xs">Find your shelf</p>
                <h2 className="mt-2 max-w-md text-2xl font-semibold tracking-[-.035em] sm:mt-4 sm:text-4xl">Less scrolling. Better discovery.</h2>
                <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:mt-3 sm:text-sm sm:leading-6">Jump straight into the kind of book you want, compare clearly, then buy with confidence.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">{categories.slice(0, 4).map((category, index) => <Link href={`/category/${category.slug}`} key={category.id} className="group rounded-2xl border border-white/12 bg-white/8 p-3 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/13 sm:p-4"><div className="text-[10px] text-[#FDBA4A]/75 sm:text-xs">0{index + 1}</div><div className="mt-2 text-sm font-semibold text-white sm:mt-4 sm:text-base">{category.name}</div><div className="mt-1 text-[10px] text-white/55 transition group-hover:text-white/75 sm:mt-2 sm:text-xs">Browse →</div></Link>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E4E9F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4 min-[520px]:grid-cols-3 sm:px-6 sm:py-5 sm:gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#FAFBFC] p-3 min-[520px]:bg-transparent min-[520px]:p-0"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EAF7F1] text-[#16815A]"><ShieldCheck size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">Secure payment</p><p className="text-xs leading-5 text-[#7C8CA1]">Server-verified before delivery</p></div></div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#FAFBFC] p-3 min-[520px]:bg-transparent min-[520px]:p-0"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><Download size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">Digital-first delivery</p><p className="text-xs leading-5 text-[#7C8CA1]">Access after verified payment</p></div></div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#FAFBFC] p-3 min-[520px]:bg-transparent min-[520px]:p-0"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><CheckCircle2 size={17} /></span><div><p className="text-sm font-semibold text-[#0B2D5B]">No surprise pricing</p><p className="text-xs leading-5 text-[#7C8CA1]">Purchase details shown upfront</p></div></div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-14">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-8"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#B76800] sm:text-sm">Browse your way</p><h2 className="mt-1.5 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:mt-2 sm:text-3xl">Shop by category</h2><p className="mt-1.5 text-sm leading-6 text-[#7C8CA1]">Get to relevant books without digging through a crowded catalog.</p></div><Link href="/search" className="hidden text-sm font-semibold text-[#0B2D5B] sm:inline">View all books →</Link></div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[18px] border border-[#E4E9F0] bg-white p-3.5 shadow-[0_7px_24px_rgba(11,45,91,.04)] transition hover:-translate-y-1 hover:border-[#CBD7E5] hover:shadow-[0_18px_44px_rgba(11,45,91,.09)] sm:rounded-[24px] sm:p-5"><div className="flex items-center justify-between gap-2"><div className="text-sm font-semibold leading-snug text-[#0B2D5B] sm:text-lg">{category.name}</div><ArrowRight size={15} className="shrink-0 text-[#A7B4C5] transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" /></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#7C8CA1] sm:text-sm sm:leading-6">{category.description || "Explore this shelf"}</p></Link>)}</div>
      </section>

      <section id="featured" className="border-y border-[#E4E9F0] bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-14">
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-8"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#B76800] sm:text-sm">Worth exploring</p><h2 className="mt-1.5 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:mt-2 sm:text-3xl">Featured books</h2><p className="mt-1.5 text-sm leading-6 text-[#7C8CA1]">A focused shelf to make choosing easier.</p></div><Link href="/search" className="hidden text-sm font-semibold text-[#0B2D5B] sm:inline">Browse everything →</Link></div>
          {shelf.length ? <div className="grid gap-3.5 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-3xl border border-dashed border-[#CBD5E1] bg-white p-8 text-center text-[#7C8CA1] sm:p-12">New titles are being prepared for this shelf.</div>}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-14">
        <div className="rounded-[24px] border border-[#F5DCA7] bg-[linear-gradient(135deg,#FFF4D8_0%,#FFF9EC_100%)] p-4 sm:rounded-[32px] sm:p-9">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#A86106] sm:text-xs">Good value</p><h2 className="mt-1.5 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:mt-2 sm:text-3xl">Current offers</h2><p className="mt-1.5 max-w-xl text-sm leading-6 text-[#7C6646]">Real discounted editions. No fake countdowns, just the price shown.</p></div><Link href="/search" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#0B2D5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123E73] min-[420px]:w-fit">See all titles <ArrowRight size={16} /></Link></div>
          <div className="mt-5 sm:mt-8">{deals.length ? <div className="grid gap-3.5 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">{deals.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-2xl bg-white/70 p-5 text-sm font-medium leading-6 text-[#7C6646] sm:p-6">Fresh offers will appear here automatically whenever a title has a discounted price.</div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="mb-5 sm:mb-8"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#B76800] sm:text-sm">Keep browsing</p><h2 className="mt-1.5 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:mt-2 sm:text-3xl">More from the catalog</h2></div>
        {newest.length ? <div className="grid gap-3.5 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">{newest.map((book) => <BookCard key={book.id} book={book} />)}</div> : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-3 rounded-[24px] border border-[#E4E9F0] bg-white p-4 shadow-[0_18px_55px_rgba(11,45,91,.06)] sm:grid-cols-3 sm:rounded-[32px] sm:p-9 sm:gap-5">
          <div className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-3 sm:bg-transparent sm:p-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><BookMarked size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Easy discovery</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Categories and related titles keep browsing simple.</p></div></div>
          <div className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-3 sm:bg-transparent sm:p-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF7F1] text-[#16815A]"><ShieldCheck size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Protected checkout</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Payments are verified server-side before fulfillment.</p></div></div>
          <div className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-3 sm:bg-transparent sm:p-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#B76800]"><Download size={18} /></span><div><h3 className="font-semibold text-[#0B2D5B]">Transparent delivery</h3><p className="mt-1 text-sm leading-6 text-[#7C8CA1]">Digital access is tied to successful verified payment.</p></div></div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
