import Link from "next/link";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BookCard from "@/components/BookCard";
import { getBooks, getCategories } from "@/lib/catalog";
import { ArrowRight, BookOpen, CheckCircle2, Download, Search, ShieldCheck, Sparkles, Star } from "lucide-react";

export default async function Home() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()]);
  const featured = books.filter((book) => book.featured).slice(0, 8);
  const shelf = featured.length ? featured : books.slice(0, 8);
  const heroBooks = shelf.slice(0, 3);
  const categoryBooks = categories.map((category) => ({
    category,
    books: books.filter((book) => book.category_slug === category.slug).slice(0, 4),
  })).filter((group) => group.books.length > 0);

  return (
    <main className="min-h-screen bg-[#FBF8F1] pb-20 text-[#253044] md:pb-0">
      <StoreNav />

      <section className="relative overflow-hidden border-b border-[#E6DED2] bg-[#F7F2E9]">
        <div className="soft-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#F7B733]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#08254D]/8 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5A8] bg-[#FFF8E6] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#9A6209] sm:text-xs"><Sparkles size={13} /> A better way to discover your next read</div>

            <h1 className="editorial-serif mt-5 max-w-3xl text-[2.8rem] leading-[.98] text-[#08254D] min-[390px]:text-[3.2rem] sm:text-7xl lg:text-[5.4rem]">
              Your next good book is already waiting.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#667386] sm:text-lg sm:leading-8">Curated ebooks across learning, ideas, fiction and exam preparation. Clean discovery, honest pricing and secure digital delivery without the clutter.</p>

            <form action="/search" className="mt-7 max-w-xl">
              <label className="flex min-h-14 items-center gap-3 rounded-full border border-[#DAD1C4] bg-white px-4 shadow-[0_14px_34px_rgba(8,37,77,.08)] transition focus-within:border-[#C8A652] focus-within:ring-4 focus-within:ring-[#F7B733]/10">
                <Search size={19} className="shrink-0 text-[#8290A1]" />
                <input name="q" placeholder="Search title, author, exam or idea" className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#9AA4B1] sm:text-base" />
                <button className="hidden rounded-full bg-[#08254D] px-5 py-2.5 text-xs font-bold text-white sm:block">Search</button>
              </label>
            </form>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.slice(0, 5).map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="shrink-0 rounded-full border border-[#DDD5C8] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#4F5C6E] transition hover:border-[#C4A760] hover:text-[#08254D]">{category.name}</Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#08254D] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,37,77,.18)] transition hover:-translate-y-0.5 hover:bg-[#103A6D]">Explore the library <ArrowRight size={17} /></Link>
              <Link href="#featured" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D6CEC2] bg-white/75 px-6 py-3 text-sm font-bold text-[#08254D] transition hover:border-[#BEA76F] hover:bg-white"><Star size={16} /> Popular picks</Link>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 border-t border-[#DED6CA] pt-6">
              <div><p className="text-xl font-bold tracking-[-.04em] text-[#08254D] sm:text-2xl">{books.length}+</p><p className="mt-1 text-[10px] font-medium text-[#7A8797] sm:text-xs">Curated titles</p></div>
              <div><p className="text-xl font-bold tracking-[-.04em] text-[#08254D] sm:text-2xl">₹50</p><p className="mt-1 text-[10px] font-medium text-[#7A8797] sm:text-xs">Simple pricing</p></div>
              <div><p className="text-xl font-bold tracking-[-.04em] text-[#08254D] sm:text-2xl">24/7</p><p className="mt-1 text-[10px] font-medium text-[#7A8797] sm:text-xs">Digital access</p></div>
            </div>
          </div>

          <div className="relative mx-auto min-h-[410px] w-full max-w-xl sm:min-h-[520px]">
            <div className="absolute inset-x-8 bottom-8 top-12 rounded-[36px] border border-[#D8D0C4] bg-white/62 shadow-[0_32px_80px_rgba(8,37,77,.10)] backdrop-blur-xl" />
            <div className="absolute left-5 top-4 rounded-full bg-[#08254D] px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white shadow-lg sm:left-10 sm:top-8">Editor&apos;s shelf</div>
            {heroBooks.map((book, index) => {
              const positions = [
                "left-[6%] top-[28%] w-[38%] -rotate-6 sm:left-[8%] sm:top-[24%] sm:w-[35%]",
                "left-[31%] top-[17%] z-10 w-[40%] rotate-2 sm:left-[32%] sm:top-[14%] sm:w-[37%]",
                "right-[5%] top-[32%] w-[36%] rotate-6 sm:right-[7%] sm:top-[29%] sm:w-[33%]",
              ];
              return <Link key={book.id} href={`/books/${book.slug}`} className={`book-float absolute ${positions[index] || positions[0]}`} style={{ ["--book-rotation" as string]: index === 0 ? "-6deg" : index === 1 ? "2deg" : "6deg" }}>
                <div className="rounded-[14px] bg-white p-2 shadow-[0_28px_45px_rgba(8,37,77,.22)] transition duration-300 hover:scale-[1.03]">
                  <img src={`/api/book-cover/${book.id}`} alt={`${book.title} cover`} className="aspect-[2/2.7] w-full rounded-[8px] object-cover" />
                </div>
              </Link>;
            })}
            <div className="absolute bottom-1 left-1/2 w-[86%] -translate-x-1/2 rounded-[24px] border border-[#E4DDD2] bg-[#FFFDF9]/92 p-4 shadow-[0_18px_44px_rgba(8,37,77,.10)] backdrop-blur sm:bottom-2 sm:p-5">
              <div className="flex items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FFF2CE] text-[#9A6209]"><BookOpen size={18} /></div><div><p className="text-sm font-bold text-[#08254D]">Curated, not crowded</p><p className="mt-0.5 text-xs leading-5 text-[#748194]">Find useful books without digging through an endless marketplace.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E7E0D5] bg-[#FFFDF9]">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 py-4 sm:grid-cols-3 sm:px-6">
          <div className="flex items-center gap-3 border-b border-[#EEE8DF] py-3 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0"><ShieldCheck size={19} className="text-[#16815A]" /><div><p className="text-sm font-bold text-[#08254D]">Secure checkout</p><p className="text-xs text-[#7B8797]">Payment verified before access</p></div></div>
          <div className="flex items-center gap-3 border-b border-[#EEE8DF] py-3 sm:border-b-0 sm:border-r sm:px-6"><Download size={19} className="text-[#F59E0B]" /><div><p className="text-sm font-bold text-[#08254D]">Instant digital delivery</p><p className="text-xs text-[#7B8797]">Private access after payment</p></div></div>
          <div className="flex items-center gap-3 py-3 sm:px-6 sm:pr-0"><CheckCircle2 size={19} className="text-[#F59E0B]" /><div><p className="text-sm font-bold text-[#08254D]">Simple, clear buying</p><p className="text-xs text-[#7B8797]">No confusing plans or bundles</p></div></div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-9">
          <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#A26A08] sm:text-xs">Worth opening first</p><h2 className="editorial-serif mt-1.5 text-3xl text-[#08254D] sm:text-5xl">Popular on eBookiee</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#748194]">A handpicked starting shelf for readers who want something useful, memorable or simply hard to put down.</p></div>
          <Link href="/search" className="hidden items-center gap-1 text-sm font-bold text-[#08254D] sm:inline-flex">Browse all <ArrowRight size={15} /></Link>
        </div>
        {shelf.length ? <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">{shelf.map((book) => <BookCard key={book.id} book={book} />)}</div> : <div className="rounded-3xl border border-dashed border-[#D8D0C4] bg-white p-10 text-center text-sm text-[#7C8796]">New titles are being prepared for this shelf.</div>}
      </section>

      <section id="categories" className="border-y border-[#E5DED3] bg-[#08254D] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#F7B733] sm:text-xs">Browse your way</p><h2 className="editorial-serif mt-2 text-3xl text-white sm:text-5xl">Find the shelf that fits your mood.</h2><p className="mt-3 max-w-lg text-sm leading-7 text-white/60">From exam prep to fiction and big ideas, each section is designed to get you to the right book faster.</p></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="group rounded-[22px] border border-white/10 bg-white/[.06] p-4 transition hover:-translate-y-1 hover:border-[#F7B733]/55 hover:bg-white/[.10] sm:p-5"><div className="flex items-start justify-between gap-3"><span className="text-sm font-bold leading-snug text-white sm:text-base">{category.name}</span><ArrowRight size={15} className="shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#F7B733]" /></div><p className="mt-2 line-clamp-2 text-[11px] leading-5 text-white/48 sm:text-xs">{category.description || "Explore this shelf"}</p></Link>)}</div>
          </div>
        </div>
      </section>

      {categoryBooks.slice(0, 3).map(({ category, books: groupBooks }, index) => (
        <section key={category.id} className={index % 2 ? "bg-[#FFFDF9]" : "bg-[#FBF8F1]"}>
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
            <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#A26A08] sm:text-xs">Explore shelf</p><h2 className="editorial-serif mt-1.5 text-3xl text-[#08254D] sm:text-4xl">{category.name}</h2></div><Link href={`/category/${category.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#08254D] sm:text-sm">View all <ArrowRight size={14} /></Link></div>
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">{groupBooks.map((book) => <BookCard key={book.id} book={book} />)}</div>
          </div>
        </section>
      ))}

      <section className="border-t border-[#E6DED2] bg-[#F3EBDD]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="overflow-hidden rounded-[32px] bg-[#08254D] px-5 py-8 text-white shadow-[0_28px_70px_rgba(8,37,77,.16)] sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#F7B733] sm:text-xs">Ready when you are</p><h2 className="editorial-serif mt-2 max-w-2xl text-3xl text-white sm:text-5xl">Less scrolling. More reading.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-white/60">Browse the full collection and find something worth opening today.</p></div>
            <Link href="/search" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7B733] px-6 py-3 text-sm font-bold text-[#08254D] transition hover:bg-[#FFD36B] lg:mt-0">Browse all ebooks <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
