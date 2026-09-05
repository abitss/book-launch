import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowUpRight, Download } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#E4E9F0] bg-white shadow-[0_8px_30px_rgba(11,45,91,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#CBD7E5] hover:shadow-[0_18px_44px_rgba(11,45,91,.11)] sm:rounded-[24px]">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#F2F5F9] via-[#FBFAF7] to-[#FFF2D6] p-4 sm:p-6">
          <div className="absolute left-2.5 top-2.5 z-10 flex max-w-[calc(100%-20px)] flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
            {book.badge ? <span className="rounded-full bg-[#0B2D5B] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:px-2.5 sm:text-[10px]">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#FDBA4A] px-2 py-1 text-[9px] font-semibold text-[#0B2D5B] sm:px-2.5 sm:text-[10px]">SAVE {discount}%</span> : null}
          </div>
          <img src={book.cover_url} alt={book.title} className="h-full w-full rounded-xl object-contain drop-shadow-[0_18px_18px_rgba(11,45,91,.16)] transition duration-500 group-hover:scale-[1.035]" />
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#B76800] sm:text-[10px] sm:tracking-[.14em]">{book.category_slug.replaceAll("-", " ")}</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#0B2D5B] sm:text-lg">{book.title}</h3><p className="mt-1 truncate text-sm text-[#7C8CA1]">{book.author}</p></div>
            <ArrowUpRight size={17} className="mt-1 shrink-0 text-[#A7B4C5] transition group-hover:text-[#F59E0B]" />
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
            <div className="flex min-w-0 items-end gap-2"><span className="text-xl font-semibold text-[#0B2D5B] sm:text-2xl">₹{book.price}</span>{book.original_price ? <span className="pb-0.5 text-xs text-[#94A3B8] line-through sm:text-sm">₹{book.original_price}</span> : null}</div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#7C8CA1]"><Download size={13} /> Digital</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#EEF1F5] pt-3 text-xs"><span className="font-medium text-[#64748B]">View details</span><span className="shrink-0 font-semibold text-[#F59E0B]">Open book →</span></div>
        </div>
      </Link>
    </article>
  );
}
