import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowRight, BadgeCheck, Download } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;

  return (
    <article className="group h-full overflow-hidden rounded-[18px] border border-[#E1E7EE] bg-white shadow-[0_8px_24px_rgba(11,45,91,.055)] transition duration-300 hover:-translate-y-1 hover:border-[#C8D4E2] hover:shadow-[0_18px_42px_rgba(11,45,91,.10)]">
      <Link href={`/books/${book.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[2/2.55] overflow-hidden bg-[linear-gradient(145deg,#F4F7FA_0%,#FCFBF7_58%,#FFF2D8_100%)] p-2.5 sm:p-4">
          <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-16px)] flex-wrap gap-1.5">
            {book.badge ? <span className="rounded-full bg-[#0B2D5B] px-2 py-1 text-[8px] font-bold uppercase tracking-[.08em] text-white sm:text-[9px]">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#FDBA4A] px-2 py-1 text-[8px] font-bold text-[#0B2D5B] sm:text-[9px]">{discount}% OFF</span> : null}
          </div>
          <img src={book.cover_url} alt={book.title} className="h-full w-full rounded-lg object-contain drop-shadow-[0_12px_14px_rgba(11,45,91,.16)] transition duration-500 group-hover:scale-[1.025]" />
        </div>

        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#A86106] sm:text-[10px]">{book.category_slug.replaceAll("-", " ")}</p>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-[1.3] text-[#0B2D5B] sm:text-base">{book.title}</h3>
          <p className="mt-1 truncate text-[11px] text-[#7B8899] sm:text-xs">{book.author}</p>

          <div className="mt-2.5 flex flex-wrap items-end gap-x-2 gap-y-0.5">
            <span className="text-[19px] font-bold tracking-[-.03em] text-[#0B2D5B] sm:text-xl">₹{book.price}</span>
            {book.original_price ? <span className="pb-0.5 text-[10px] text-[#94A3B8] line-through sm:text-xs">₹{book.original_price}</span> : null}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-[#6B7C90]"><Download size={11} className="shrink-0 text-[#F59E0B]" /> {book.format || "Digital edition"}{book.language ? ` · ${book.language}` : ""}</div>

          <div className="mt-auto pt-3">
            <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#748396]"><BadgeCheck size={11} className="shrink-0 text-[#16815A]" /> Secure payment</div>
            <div className="mt-2 flex min-h-9 items-center justify-between gap-2 rounded-xl bg-[#0B2D5B] px-3 text-[11px] font-bold text-white transition group-hover:bg-[#123E73] sm:text-xs"><span>View & buy</span><ArrowRight size={13} className="shrink-0 transition group-hover:translate-x-0.5" /></div>
          </div>
        </div>
      </Link>
    </article>
  );
}
