import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowRight, BadgeCheck, Download } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  const savings = book.original_price && book.original_price > book.price ? book.original_price - book.price : null;

  return (
    <article className="group h-full overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_8px_28px_rgba(11,45,91,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C9D5E4] hover:shadow-[0_18px_44px_rgba(11,45,91,.11)] sm:rounded-[24px]">
      <Link href={`/books/${book.slug}`} className="flex h-full min-h-[176px] min-[560px]:block">
        <div className="relative w-[39%] shrink-0 overflow-hidden bg-[linear-gradient(145deg,#F2F6FA_0%,#FFFBF2_55%,#FFF0CE_100%)] p-3 min-[560px]:aspect-[4/5] min-[560px]:w-full min-[560px]:p-5">
          <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-16px)] flex-wrap gap-1 min-[560px]:left-3 min-[560px]:top-3 min-[560px]:gap-1.5">
            {book.badge ? <span className="rounded-full bg-[#0B2D5B] px-2 py-1 text-[8px] font-bold uppercase tracking-[.08em] text-white min-[560px]:text-[9px]">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#FDBA4A] px-2 py-1 text-[8px] font-bold text-[#0B2D5B] min-[560px]:text-[9px]">-{discount}%</span> : null}
          </div>
          <img src={book.cover_url} alt={book.title} className="h-full w-full rounded-lg object-contain drop-shadow-[0_14px_16px_rgba(11,45,91,.18)] transition duration-500 group-hover:scale-[1.03] min-[560px]:rounded-xl" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-3.5 min-[560px]:p-5">
          <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#A86106] min-[560px]:text-[10px] min-[560px]:tracking-[.14em]">{book.category_slug.replaceAll("-", " ")}</p>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-[1.35] text-[#0B2D5B] min-[560px]:mt-2 min-[560px]:text-lg">{book.title}</h3>
          <p className="mt-1 truncate text-xs text-[#78879A] min-[560px]:text-sm">{book.author}</p>

          <div className="mt-2.5 flex flex-wrap items-end gap-x-2 gap-y-1 min-[560px]:mt-4">
            <span className="text-xl font-bold tracking-[-.03em] text-[#0B2D5B] min-[560px]:text-2xl">₹{book.price}</span>
            {book.original_price ? <span className="pb-0.5 text-[11px] text-[#94A3B8] line-through min-[560px]:text-sm">₹{book.original_price}</span> : null}
            {savings ? <span className="pb-0.5 text-[10px] font-semibold text-[#16815A] min-[560px]:text-xs">Save ₹{savings}</span> : null}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-[#6B7C90] min-[560px]:mt-3 min-[560px]:text-[11px]"><Download size={12} className="shrink-0 text-[#F59E0B]" /> Digital edition</div>

          <div className="mt-auto pt-3 min-[560px]:pt-4">
            <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#748396] min-[560px]:text-[10px]"><BadgeCheck size={12} className="shrink-0 text-[#16815A]" /> Secure verified purchase</div>
            <div className="mt-2.5 flex min-h-9 items-center justify-between gap-2 rounded-xl bg-[#F8FAFC] px-3 text-[11px] font-semibold text-[#0B2D5B] transition group-hover:bg-[#0B2D5B] group-hover:text-white min-[560px]:mt-3 min-[560px]:min-h-10 min-[560px]:text-xs"><span>View & buy</span><ArrowRight size={14} className="shrink-0 transition group-hover:translate-x-0.5" /></div>
          </div>
        </div>
      </Link>
    </article>
  );
}
