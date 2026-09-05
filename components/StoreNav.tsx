import Link from "next/link";
import { Search, ShieldCheck, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function StoreNav() {
  return (
    <>
      <div className="bg-[#0B2D5B] px-3 py-2 text-center text-[10px] font-semibold leading-4 tracking-[.02em] text-white/92 sm:px-4 sm:text-xs sm:tracking-[.05em]">
        <span className="inline-flex items-center justify-center gap-1.5"><ShieldCheck size={12} className="shrink-0 text-[#FDBA4A] sm:size-[13px]" /> Secure payment · Verified digital delivery</span>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#E7EAF0] bg-[#FFFCF7]/96 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-3 py-2.5 min-[380px]:gap-3 sm:px-6 sm:py-3">
          <Link href="/" className="min-w-0 shrink" aria-label="eBookiee.store home">
            <BrandLogo showTagline />
          </Link>

          <nav className="ml-3 hidden items-center gap-5 text-sm font-medium text-[#475569] lg:flex">
            <Link href="/search" className="transition hover:text-[#0B2D5B]">All books</Link>
            <Link href="/#categories" className="transition hover:text-[#0B2D5B]">Categories</Link>
            <Link href="/#deals" className="transition hover:text-[#0B2D5B]">Offers</Link>
            <Link href="/#featured" className="inline-flex items-center gap-1.5 transition hover:text-[#0B2D5B]"><Sparkles size={14} className="text-[#F59E0B]" /> Featured</Link>
          </nav>

          <form action="/search" className="ml-auto hidden w-full max-w-md md:block">
            <label className="flex items-center gap-2 rounded-2xl border border-[#DDE3EC] bg-white px-4 shadow-[0_4px_20px_rgba(11,45,91,.05)] transition focus-within:border-[#9CB4D3] focus-within:ring-2 focus-within:ring-[#F59E0B]/20">
              <Search size={18} className="shrink-0 text-[#7C8CA1]" />
              <input name="q" className="w-full bg-transparent py-2.5 text-sm text-[#1F2937] outline-none placeholder:text-[#94A3B8]" placeholder="Search books, authors, categories..." aria-label="Search books" />
            </label>
          </form>

          <Link href="/search" className="ml-auto shrink-0 rounded-xl bg-[#F59E0B] px-3 py-2 text-xs font-bold text-[#0B2D5B] shadow-sm transition hover:bg-[#FDBA4A] min-[380px]:px-4 min-[380px]:py-2.5 min-[380px]:text-sm md:hidden">Browse</Link>
        </div>

        <div className="border-t border-[#EEF1F5] px-3 pb-2.5 pt-2 sm:px-4 md:hidden">
          <form action="/search" className="mx-auto max-w-7xl">
            <label className="flex items-center gap-2 rounded-2xl border border-[#DDE3EC] bg-white px-3.5 shadow-[0_5px_18px_rgba(11,45,91,.05)]">
              <Search size={16} className="shrink-0 text-[#7C8CA1]" />
              <input name="q" className="w-full bg-transparent py-2.5 text-base text-[#1F2937] outline-none placeholder:text-[#94A3B8]" placeholder="Search title or author" aria-label="Search ebooks" />
            </label>
          </form>
        </div>
      </header>
    </>
  );
}
