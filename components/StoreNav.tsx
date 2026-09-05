import Link from "next/link";
import { Grid2X2, Headphones, Home, Search, ShoppingBag } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function StoreNav() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#E8EDF3] bg-[#FFFCF7]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center gap-3 px-4 sm:h-[70px] sm:px-6">
          <Link href="/" className="min-w-0 shrink" aria-label="eBookiee.store home">
            <BrandLogo />
          </Link>

          <nav className="ml-8 hidden items-center gap-6 text-sm font-semibold text-[#526174] md:flex">
            <Link href="/search" className="transition hover:text-[#0B2D5B]">All books</Link>
            <Link href="/#categories" className="transition hover:text-[#0B2D5B]">Categories</Link>
            <Link href="/#deals" className="transition hover:text-[#0B2D5B]">Offers</Link>
          </nav>

          <form action="/search" className="ml-auto hidden w-full max-w-sm md:block">
            <label className="flex h-11 items-center gap-2 rounded-xl border border-[#DDE4EC] bg-white px-3.5 shadow-[0_3px_14px_rgba(11,45,91,.04)] transition focus-within:border-[#9CB4D3] focus-within:ring-2 focus-within:ring-[#F59E0B]/15">
              <Search size={17} className="shrink-0 text-[#7C8CA1]" />
              <input name="q" className="w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-[#94A3B8]" placeholder="Search books or authors" aria-label="Search books" />
            </label>
          </form>

          <Link href="/search" className="ml-auto inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#DDE4EC] bg-white px-3 text-xs font-bold text-[#0B2D5B] shadow-sm md:hidden">
            <ShoppingBag size={15} /> Books
          </Link>
        </div>

        <div className="border-t border-[#EEF2F6] px-4 pb-3 pt-2.5 md:hidden">
          <form action="/search" className="mx-auto max-w-7xl">
            <label className="flex h-12 items-center gap-2.5 rounded-xl border border-[#DDE4EC] bg-white px-3.5 shadow-[0_4px_16px_rgba(11,45,91,.05)] focus-within:border-[#9CB4D3] focus-within:ring-2 focus-within:ring-[#F59E0B]/15">
              <Search size={18} className="shrink-0 text-[#7C8CA1]" />
              <input name="q" className="w-full bg-transparent text-base text-[#1F2937] outline-none placeholder:text-[#94A3B8]" placeholder="Search title, author or exam" aria-label="Search ebooks" />
            </label>
          </form>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#E5EAF0] bg-white/96 px-3 pb-2 pt-2 shadow-[0_-10px_30px_rgba(11,45,91,.08)] backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-md grid-cols-4">
          <Link href="/" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#0B2D5B]"><Home size={18} />Home</Link>
          <Link href="/#categories" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#66768A]"><Grid2X2 size={18} />Categories</Link>
          <Link href="/search" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#66768A]"><Search size={18} />Search</Link>
          <Link href="/contact" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#66768A]"><Headphones size={18} />Support</Link>
        </div>
      </nav>
    </>
  );
}
