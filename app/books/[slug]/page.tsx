import Link from "next/link";
import { notFound } from "next/navigation";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BuyButton from "@/components/BuyButton";
import BookCard from "@/components/BookCard";
import { getBookBySlug, getBooks } from "@/lib/catalog";
import { ArrowLeft, CheckCircle2, Download, FileText, Languages, ShieldCheck, Smartphone } from "lucide-react";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const allBooks = await getBooks();
  const related = allBooks.filter((item) => item.category_slug === book.category_slug && item.id !== book.id).slice(0, 4);
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  const savings = book.original_price && book.original_price > book.price ? book.original_price - book.price : null;

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-36 text-[#1F2937] md:pb-0">
      <StoreNav />

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-7">
        <Link href={`/category/${book.category_slug}`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#7C8CA1] transition hover:text-[#0B2D5B]"><ArrowLeft size={14} /> Back to {book.category_slug.replaceAll("-", " ")}</Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-4 sm:px-6 sm:py-8 lg:grid-cols-[.84fr_1.16fr] lg:gap-10 lg:py-12">
        <div className="self-start rounded-[20px] border border-[#E1E7EE] bg-white p-3.5 shadow-[0_14px_36px_rgba(11,45,91,.055)] sm:rounded-[28px] sm:p-7 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-[linear-gradient(145deg,#F3F6FA_0%,#FBFAF7_55%,#FFF1D3_100%)] p-3 sm:p-5">
            <img src={book.cover_url} alt={book.title} className="mx-auto max-h-[390px] w-full rounded-xl object-contain drop-shadow-[0_20px_24px_rgba(11,45,91,.16)] sm:max-h-[610px]" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FFF3D7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A86106]">{book.category_slug.replaceAll("-", " ")}</span>
            {book.badge ? <span className="rounded-full bg-[#0B2D5B] px-3 py-1 text-[10px] font-bold text-white">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#FDBA4A] px-3 py-1 text-[10px] font-bold text-[#0B2D5B]">SAVE {discount}%</span> : null}
          </div>

          <h1 className="break-words text-[2rem] font-semibold leading-[1.08] tracking-[-.04em] text-[#0B2D5B] sm:text-5xl lg:text-6xl">{book.title}</h1>
          {book.subtitle ? <p className="mt-2.5 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-lg sm:leading-8">{book.subtitle}</p> : null}
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.08em] text-[#7C8CA1]">by <span className="text-[#0B2D5B]">{book.author}</span></p>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="text-3xl font-bold tracking-[-.035em] text-[#0B2D5B] sm:text-4xl">₹{book.price}</span>
            {book.original_price ? <span className="pb-1 text-sm text-[#94A3B8] line-through sm:text-lg">₹{book.original_price}</span> : null}
            {savings ? <span className="pb-1 text-xs font-bold text-[#16815A] sm:text-sm">Save ₹{savings}</span> : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-[#5F7084] sm:text-xs">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#16815A]" /> Secure payment</span>
            <span className="inline-flex items-center gap-1.5"><Download size={14} className="text-[#F59E0B]" /> Digital access after verification</span>
            <span className="inline-flex items-center gap-1.5"><Smartphone size={14} className="text-[#F59E0B]" /> Works across devices</span>
          </div>

          <div className="mt-5 w-full sm:max-w-md"><BuyButton bookId={book.id} title={book.title} price={book.price} /></div>

          <div className="mt-6 border-t border-[#E4E9F0] pt-6 sm:mt-8 sm:pt-8">
            <h2 className="text-xl font-semibold text-[#0B2D5B] sm:text-2xl">About this ebook</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F6F82] sm:text-base sm:leading-8">{book.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2.5 rounded-2xl border border-[#E4E9F0] bg-white p-3.5 shadow-[0_10px_28px_rgba(11,45,91,.04)] sm:mt-8 sm:gap-3 sm:rounded-3xl sm:p-5">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><FileText size={16} /></span><div><p className="text-[9px] font-bold uppercase tracking-wide text-[#94A3B8] sm:text-xs">Format</p><p className="text-xs font-semibold text-[#0B2D5B] sm:text-base">{book.format || "eBook"}</p></div></div>
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><Languages size={16} /></span><div><p className="text-[9px] font-bold uppercase tracking-wide text-[#94A3B8] sm:text-xs">Language</p><p className="text-xs font-semibold text-[#0B2D5B] sm:text-base">{book.language || "Digital"}</p></div></div>
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><FileText size={16} /></span><div><p className="text-[9px] font-bold uppercase tracking-wide text-[#94A3B8] sm:text-xs">Length</p><p className="text-xs font-semibold text-[#0B2D5B] sm:text-base">{book.pages ? `${book.pages} pages` : "See edition"}</p></div></div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#0B2D5B] p-5 text-white shadow-[0_16px_44px_rgba(11,45,91,.14)] sm:mt-8 sm:rounded-3xl sm:p-6">
            <h3 className="text-lg font-semibold">How your purchase works</h3>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-white/72">
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> Review the book details and final amount before paying.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> Complete secure payment. The transaction is verified before fulfillment.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> When the digital file is attached, access is provided through a private download link.</span>
            </div>
          </div>
        </div>
      </section>

      {related.length ? <section className="border-t border-[#E4E9F0] bg-[#F8FAFC]"><div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-14"><div className="mb-5 flex items-end justify-between gap-4 sm:mb-7"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B76800] sm:text-xs">Keep exploring</p><h2 className="mt-1.5 text-2xl font-semibold text-[#0B2D5B] sm:mt-2 sm:text-3xl">More from this shelf</h2></div><Link href={`/category/${book.category_slug}`} className="hidden text-sm font-semibold text-[#0B2D5B] sm:block">View category →</Link></div><div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></div></section> : null}

      <StoreFooter />
    </main>
  );
}
