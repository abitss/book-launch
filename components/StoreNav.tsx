import Link from "next/link";
import { Grid2X2, Headphones, Home, Search, ShoppingBag, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function StoreNav() {
  return (
    <>
      <div className="border-b border-[#E9E2D6] bg-[#08254D] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-semibold tracking-[.02em] text-white/85 sm:text-xs">
          <Sparkles size={13} className="text-[#F7B733]" /> Curated ebooks · Secure checkout · Instant digital access
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#E8E2D9] bg-[#FBF8F1]/88 backdrop-blur-2xl">
        <div className="mx-auto flex h-[66px] max-w-7xl items-center gap-4 px-4 sm:h-[76px] sm:px-6">
          <Link href="/" className="min-w-0 shrink" aria-label="eBookiee.store home">
            <BrandLogo />
          </Link>

          <nav className="ml-6 hidden items-center gap-7 text-sm font-semibold text-[#5D6878] md:flex">
            <Link href="/search" className="transition hover:text-[#08254D]">Discover</Link>
            <Link href="/#categories" className="transition hover:text-[#08254D]">Categories</Link>
            <Link href="/#featured" className="transition hover:text-[#08254D]">Popular</Link>
          </nav>

          <form action="/search" className="ml-auto hidden w-full max-w-md md:block">
            <label className="flex h-12 items-center gap-2 rounded-full border border-[#DED7CC] bg-white/90 px-4 shadow-[0_5px_18px_rgba(8,37,77,.05)] transition focus-within:border-[#C7A75B] focus-within:ring-4 focus-within:ring-[#F7B733]/10">
              <Search size={17} className="shrink-0 text-[#8792A2]" />
              <input name="q" className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#99A2AF]" placeholder="Search by title, author or subject" aria-label="Search books" />
            </label>
          </form>

          <Link href="/search" className="ml-auto inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#DED7CC] bg-white px-3.5 text-xs font-bold text-[#08254D] shadow-sm md:hidden">
            <ShoppingBag size={15} /> Books
          </Link>
        </div>

        <div className="border-t border-[#EEE8DF] px-4 pb-3 pt-2.5 md:hidden">
          <form action="/search" className="mx-auto max-w-7xl">
            <label className="flex h-12 items-center gap-2.5 rounded-full border border-[#DED7CC] bg-white px-4 shadow-[0_4px_16px_rgba(8,37,77,.05)] focus-within:border-[#C7A75B] focus-within:ring-4 focus-within:ring-[#F7B733]/10">
              <Search size={18} className="shrink-0 text-[#8792A2]" />
              <input name="q" className="w-full bg-transparent text-base text-[#172033] outline-none placeholder:text-[#99A2AF]" placeholder="Search books, authors, exams..." aria-label="Search ebooks" />
            </label>
          </form>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#E5DED3] bg-[#FFFDF9]/96 px-3 pb-2 pt-2 shadow-[0_-10px_30px_rgba(8,37,77,.08)] backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-md grid-cols-4">
          <Link href="/" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#08254D]"><Home size={18} />Home</Link>
          <Link href="/#categories" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#6E7A8B]"><Grid2X2 size={18} />Categories</Link>
          <Link href="/search" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#6E7A8B]"><Search size={18} />Search</Link>
          <Link href="/contact" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#6E7A8B]"><Headphones size={18} />Support</Link>
        </div>
      </nav>
    </>
  );
}
