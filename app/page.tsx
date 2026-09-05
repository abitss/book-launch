import Link from "next/link";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks, getCategories } from "@/lib/catalog";
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

export default async function Home() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  const featured = books.filter((book) => book.featured).slice(0, 8);
  const shelf = featured.length ? featured : books.slice(0, 8);
  const deals = books.filter((book) => book.original_price && book.original_price > book.price).slice(0, 8);
  const categoryBooks = categories.map((category) => ({
    category,
    books: books.filter((book) => book.category_slug === category.slug).slice(0, 6),
  })).filter((group) => group.books.length > 0);

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-20 text-[#1F2937] md:pb-0">
      <StoreNav />

      <section className="border-b border-[#E6EBF1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 sm:py-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-12 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F1D28F] bg-[#FFF9EA] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-[#9A5C05] sm:text-xs"><Sparkles size={13} /> Curated digital books</div>
            <h1 className="mt-4 max-w-3xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-.045em] text-[#0B2D5B] min-[390px]:text-[2.45rem] sm:text-6xl">Books worth reading. <span className="text-[#F59E0B]">Prices worth checking.</span></h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#607085] sm:text-lg sm:leading-8">Browse useful digital books across exam preparation, business, fiction and self-growth. Clear pricing, secure payment and fast digital access.</p>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.slice(0, 6).map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="shrink-0 rounded-full border border-[#DCE3EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B2D5B] shadow-sm transition hover:border-[#F59E0B] hover:bg-[#FFF9EA] sm:text-sm">{category.name}</Link>
              ))}
              <Link href="/search" className="shrink-0 rounded-full bg-[#0B2D5B] px-3.5 py-2 text-xs font-semibold text-white sm:text-sm">All books →</Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link href="/search" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-[#0B2D5B] shadow-[0_10px_28px_rgba(245,158,11,.20)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A] sm:text-base">Browse books <ArrowRight size={17} /></Link>
              <Link href="#featured" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D6DEE8] bg-white px-5 py-3 text-sm font-bold text-[#0B2D5B] transition hover:border-[#9CB4D3] sm:text-base">See bestsellers</Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#173E6D] bg-[#0B2D5B] p-5 text-white shadow-[0_24px_60px_rgba(11,45,91,.16)] sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#FDBA4A] sm:text-xs">Simple buying</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] sm:text-4xl">Choose. Pay securely. Start reading.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/72">Everything important is shown before you buy, so there are no surprises at checkout.</p>
            <div className="mt-5 grid gap-2.5">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/7 p-3.5"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-[#FDBA4A]">1</span><div><p className="text-sm font-semibold">Pick the right title</p><p className="mt-0.5 text-xs leading-5 text-white/58">Author, format, language and price are visible upfront.</p></div></div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/7 p-3.5"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-[#FDBA4A]">2</span><div><p className="text-sm font-semibold">Complete secure payment</p><p className="mt-0.5 text-xs leading-5 text-white/58">Payment is verified before digital fulfillment.</p></div></div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/7 p-3.5"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-[#FDBA4A]">3</span><div><p className="text-sm font-semibold">Get digital access</p><p className="mt-0.5 text-xs leading-5 text-white/58">Access is provided after successful payment.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E6EBF1] bg-[#FCFDFE]">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:px-6 sm:py-4">
          <div className="flex min-w-[190px] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm sm:min-w-0 sm:bg-transparent sm:shadow-none"><ShieldCheck size={17} className="shrink-0 text-[#16815A]" /><div><p className="text-xs font-bold text-[#0B2D5B] sm:text-sm">Secure payment</p><p className="text-[10px] text-[#7B8899] sm:text-xs">Verified before access</p></div></div>
          <div className="flex min-w-[190px] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm sm:min-w-0 sm:bg-transparent sm:shadow-none"><Download size={17} className="shrink-0 text-[#F59E0B]" /><div><p className="text-xs font-bold text-[#0B2D5B] sm:text-sm">Digital access</p><p className="text-[10px] text-[#7B8899] sm:text-xs">After successful payment</p></div></div>
          <div className="flex min-w-[190px] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm sm:min-w-0 sm:bg-transparent sm:shadow-none"><Smartphone size={17} className="shrink-0 text-[#F59E0B]" /><div><p className="text-xs font-bold text-[#0B2D5B] sm:text-sm">Read across devices</p><p className="text-[10px] text-[#7B8899] sm:text-xs">Phone, tablet or laptop</p></div></div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-7">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#A86106] sm:text-xs">Popular picks</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:text-3xl">Featured books</h2></div>
          <Link href="/search" className="text-xs font-bold text-[#0B2D5B] sm:text-sm">View all →</Link>
        </div>
        {shelf.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-8 text-center text-sm text-[#7C8CA1]">New titles are being prepared for this shelf.</div>
        )}
      </section>

      <section id="categories" className="border-y border-[#E6EBF1] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-4 flex items-end justify-between gap-3 sm:mb-7"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#A86106] sm:text-xs">Browse faster</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:text-3xl">Shop by category</h2></div><Link href="/search" className="text-xs font-bold text-[#0B2D5B] sm:text-sm">All books →</Link></div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="rounded-2xl border border-[#E0E6ED] bg-[#FCFDFE] p-3.5 transition hover:-translate-y-0.5 hover:border-[#F59E0B] hover:bg-[#FFF9EA] sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-sm font-bold leading-snug text-[#0B2D5B] sm:text-base">{category.name}</span><ArrowRight size={15} className="shrink-0 text-[#A5B1C1]" /></div><p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-[#7B8899] sm:text-xs">{category.description || "Explore this shelf"}</p></Link>)}</div>
        </div>
      </section>

      {deals.length ? (
        <section id="deals" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-4 flex items-end justify-between gap-3 sm:mb-7"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#A86106] sm:text-xs">Good value</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:text-3xl">Current offers</h2><p className="mt-1 text-xs leading-5 text-[#7B8899] sm:text-sm">Real discounts on available digital editions.</p></div><Link href="/search" className="text-xs font-bold text-[#0B2D5B] sm:text-sm">See all →</Link></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{deals.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />)}</div>
        </section>
      ) : null}

      {categoryBooks.map(({ category, books: groupBooks }) => (
        <section key={category.id} className="border-t border-[#E9EDF2] bg-[#FCFDFE]">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="mb-4 flex items-end justify-between gap-3 sm:mb-7"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#A86106] sm:text-xs">Explore shelf</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.025em] text-[#0B2D5B] sm:text-3xl">{category.name}</h2></div><Link href={`/category/${category.slug}`} className="text-xs font-bold text-[#0B2D5B] sm:text-sm">View category →</Link></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{groupBooks.map((book) => <BookCard key={book.id} book={book} />)}</div>
          </div>
        </section>
      ))}

      <section className="border-t border-[#E6EBF1] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E1E7EE] bg-[#FCFDFE] p-4"><ShieldCheck size={20} className="text-[#16815A]" /><h3 className="mt-3 text-sm font-bold text-[#0B2D5B]">Clear, secure buying</h3><p className="mt-1.5 text-xs leading-5 text-[#718095]">Pricing and product details are shown before payment so you know exactly what you are purchasing.</p></div>
            <div className="rounded-2xl border border-[#E1E7EE] bg-[#FCFDFE] p-4"><CheckCircle2 size={20} className="text-[#F59E0B]" /><h3 className="mt-3 text-sm font-bold text-[#0B2D5B]">Verified fulfillment</h3><p className="mt-1.5 text-xs leading-5 text-[#718095]">Digital access is released after successful payment verification.</p></div>
            <div className="rounded-2xl border border-[#E1E7EE] bg-[#FCFDFE] p-4"><Smartphone size={20} className="text-[#F59E0B]" /><h3 className="mt-3 text-sm font-bold text-[#0B2D5B]">Built for mobile reading</h3><p className="mt-1.5 text-xs leading-5 text-[#718095]">Browse and purchase comfortably from your phone, tablet or laptop.</p></div>
          </div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
