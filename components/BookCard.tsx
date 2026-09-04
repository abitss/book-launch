import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowUpRight, Download } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  return (
    <article className="group overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-[0_8px_30px_rgba(38,31,20,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(38,31,20,.11)]">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#eee7da] to-[#faf7f0] p-6">
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
            {book.badge ? <span className="rounded-full bg-stone-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-stone-950">SAVE {discount}%</span> : null}
          </div>
          <img src={book.cover_url} alt={book.title} className="h-full w-full rounded-xl object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,.20)] transition duration-500 group-hover:scale-[1.04]" />
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-black uppercase tracking-[.14em] text-amber-700">{book.category_slug.replaceAll("-", " ")}</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="line-clamp-2 text-base font-black leading-snug text-stone-950 sm:text-lg">{book.title}</h3><p className="mt-1 truncate text-sm text-stone-500">{book.author}</p></div>
            <ArrowUpRight size={17} className="mt-1 shrink-0 text-stone-300 transition group-hover:text-stone-900" />
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div className="flex items-end gap-2"><span className="text-xl font-black sm:text-2xl">₹{book.price}</span>{book.original_price ? <span className="pb-0.5 text-xs text-stone-400 line-through sm:text-sm">₹{book.original_price}</span> : null}</div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500"><Download size={13} /> Digital</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
