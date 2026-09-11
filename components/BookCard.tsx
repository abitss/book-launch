import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowUpRight, BadgeCheck, Download } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  const coverSrc = `/api/book-cover/${book.id}`;

  return (
    <article className="group h-full overflow-hidden rounded-[24px] border border-[#E6DFD4] bg-[#FFFDF9] shadow-[0_12px_36px_rgba(8,37,77,.055)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D6C9B3] hover:shadow-[0_24px_56px_rgba(8,37,77,.11)]">
      <Link href={`/books/${book.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[2/2.62] overflow-hidden bg-[radial-gradient(circle_at_50%_8%,#FFF9E9_0%,#F6F1E8_56%,#EEE8DE_100%)] p-4 sm:p-5">
          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-24px)] flex-wrap gap-1.5">
            {book.badge ? <span className="rounded-full border border-white/80 bg-[#08254D]/92 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[.09em] text-white shadow-sm sm:text-[9px]">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#F7B733] px-2.5 py-1 text-[8px] font-black text-[#08254D] shadow-sm sm:text-[9px]">-{discount}%</span> : null}
          </div>

          <div className="mx-auto flex h-full max-w-[88%] items-center justify-center transition duration-500 group-hover:scale-[1.025]">
            <img src={coverSrc} alt={`${book.title} cover`} className="max-h-full max-w-full rounded-[8px] object-contain shadow-[0_18px_30px_rgba(8,37,77,.20)]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#A26A08] sm:text-[10px]">{book.category_slug.replaceAll("-", " ")}</p>
            <ArrowUpRight size={14} className="text-[#9AA4B2] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#08254D]" />
          </div>

          <h3 className="mt-2 line-clamp-2 text-[16px] font-semibold leading-[1.28] tracking-[-.02em] text-[#08254D] sm:text-[17px]">{book.title}</h3>
          <p className="mt-1.5 truncate text-[11px] text-[#7C8796] sm:text-xs">{book.author}</p>

          <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1 border-t border-[#EEE8DF] pt-3">
            <span className="text-[21px] font-bold tracking-[-.04em] text-[#08254D] sm:text-2xl">₹{book.price}</span>
            {book.original_price ? <span className="pb-0.5 text-[10px] text-[#9CA6B3] line-through sm:text-xs">₹{book.original_price}</span> : null}
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-[#6F7D90]"><Download size={12} className="shrink-0 text-[#F59E0B]" /> {book.format || "Digital edition"}{book.language ? ` · ${book.language}` : ""}</div>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#7A8797]"><BadgeCheck size={12} className="shrink-0 text-[#16815A]" /> Secure verified purchase</div>
            <div className="mt-2.5 flex min-h-10 items-center justify-center rounded-full bg-[#08254D] px-4 text-[11px] font-bold text-white transition group-hover:bg-[#103A6D] sm:text-xs">View book</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
