import Link from "next/link";
import { Book } from "@/data/catalog";
import { ArrowUpRight } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_10px_40px_rgba(38,31,20,.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(38,31,20,.10)]">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f0eadf] p-7">
          {book.badge && <span className="absolute left-4 top-4 z-10 rounded-full bg-[#171717] px-3 py-1 text-xs font-bold text-white">{book.badge}</span>}
          {discount && <span className="absolute right-4 top-4 z-10 rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-stone-900">-{discount}%</span>}
          <img src={book.cover_url} alt={book.title} className="h-full w-full rounded-xl object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,.18)] transition duration-300 group-hover:scale-[1.03]" />
        </div>
        <div className="p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.15em] text-amber-700">{book.category_slug.replaceAll("-", " ")}</p>
          <div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-black leading-tight text-stone-900">{book.title}</h3><p className="mt-1 text-sm text-stone-500">{book.author}</p></div><ArrowUpRight size={18} className="mt-1 shrink-0 text-stone-400 transition group-hover:text-stone-900" /></div>
          <div className="mt-5 flex items-end gap-2"><span className="text-2xl font-black">₹{book.price}</span>{book.original_price ? <span className="pb-1 text-sm text-stone-400 line-through">₹{book.original_price}</span> : null}</div>
        </div>
      </Link>
    </article>
  );
}
