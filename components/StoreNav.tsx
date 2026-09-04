import Link from "next/link";
import { BookOpen, Search, Sparkles } from "lucide-react";

export default function StoreNav() {
  return (
    <>
      <div className="bg-[#171717] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[.16em] text-white sm:text-xs">
        Instant digital delivery · Secure checkout · Read on phone, tablet & laptop
      </div>
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf7]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="eBookies.store home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#171717] text-white shadow-sm"><BookOpen size={20} /></span>
            <div>
              <div className="text-xl font-black tracking-[-.03em]">eBookies<span className="text-amber-600">.store</span></div>
              <div className="hidden text-[10px] font-bold uppercase tracking-[.18em] text-stone-500 sm:block">Read. Own. Repeat.</div>
            </div>
          </Link>

          <nav className="ml-4 hidden items-center gap-5 text-sm font-bold text-stone-600 lg:flex">
            <Link href="/search" className="transition hover:text-stone-950">All books</Link>
            <Link href="/#categories" className="transition hover:text-stone-950">Categories</Link>
            <Link href="/#deals" className="transition hover:text-stone-950">Deals</Link>
            <Link href="/#featured" className="inline-flex items-center gap-1.5 transition hover:text-stone-950"><Sparkles size={14} /> Picks</Link>
          </nav>

          <form action="/search" className="ml-auto hidden w-full max-w-md md:block">
            <label className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 shadow-sm transition focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-amber-200">
              <Search size={18} className="text-stone-400" />
              <input name="q" className="w-full bg-transparent py-2.5 text-sm outline-none" placeholder="Search books, authors, categories..." aria-label="Search books" />
            </label>
          </form>

          <Link href="/search" className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-black text-stone-950 transition hover:bg-amber-300 md:hidden">Browse</Link>
        </div>

        <div className="border-t border-stone-100 px-4 py-2.5 md:hidden">
          <form action="/search" className="mx-auto max-w-7xl">
            <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3">
              <Search size={16} className="text-stone-400" />
              <input name="q" className="w-full bg-transparent py-2 text-sm outline-none" placeholder="Search ebooks..." aria-label="Search ebooks" />
            </label>
          </form>
        </div>
      </header>
    </>
  );
}
