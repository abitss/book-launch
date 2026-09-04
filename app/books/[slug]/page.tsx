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

  return (
    <main className="min-h-screen bg-[#FFFCF7] text-[#1F2937]">
      <StoreNav />

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <Link href={`/category/${book.category_slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#7C8CA1] transition hover:text-[#0B2D5B]"><ArrowLeft size={15} /> Back to {book.category_slug.replaceAll("-", " ")}</Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[.82fr_1.18fr] lg:py-12">
        <div className="self-start rounded-[36px] border border-[#E4E9F0] bg-gradient-to-br from-[#F2F5F9] via-[#FBFAF7] to-[#FFF2D6] p-8 shadow-[0_18px_55px_rgba(11,45,91,.07)] sm:p-10 lg:sticky lg:top-28">
          <img src={book.cover_url} alt={book.title} className="mx-auto max-h-[620px] w-full rounded-xl object-contain drop-shadow-[0_26px_28px_rgba(11,45,91,.18)]" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FFF3D7] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#A86106]">{book.category_slug.replaceAll("-", " ")}</span>
            {book.badge ? <span className="rounded-full bg-[#0B2D5B] px-3 py-1 text-xs font-semibold text-white">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-[#FDBA4A] px-3 py-1 text-xs font-semibold text-[#0B2D5B]">SAVE {discount}%</span> : null}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-.04em] text-[#0B2D5B] sm:text-5xl lg:text-6xl">{book.title}</h1>
          {book.subtitle ? <p className="mt-3 max-w-2xl text-xl leading-8 text-[#64748B]">{book.subtitle}</p> : null}
          <p className="mt-4 text-sm font-medium uppercase tracking-[.08em] text-[#7C8CA1]">by <span className="font-semibold text-[#0B2D5B]">{book.author}</span></p>

          <div className="mt-7 flex items-end gap-3">
            <span className="text-4xl font-semibold text-[#0B2D5B]">₹{book.price}</span>
            {book.original_price ? <span className="pb-1 text-lg text-[#94A3B8] line-through">₹{book.original_price}</span> : null}
          </div>
          <p className="mt-2 text-sm font-medium text-[#64748B]">Digital edition · Access follows successful verified payment</p>

          <div className="mt-7 max-w-md"><BuyButton bookId={book.id} title={book.title} price={book.price} /></div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl border border-[#E4E9F0] bg-white p-3 text-[#475569]"><Download size={17} className="text-[#F59E0B]" /> Digital access</div>
            <div className="flex items-center gap-2 rounded-2xl border border-[#E4E9F0] bg-white p-3 text-[#475569]"><ShieldCheck size={17} className="text-[#F59E0B]" /> Secure payment</div>
            <div className="flex items-center gap-2 rounded-2xl border border-[#E4E9F0] bg-white p-3 text-[#475569]"><Smartphone size={17} className="text-[#F59E0B]" /> Device friendly</div>
          </div>

          <div className="mt-8 border-t border-[#E4E9F0] pt-8">
            <h2 className="text-2xl font-semibold text-[#0B2D5B]">About this ebook</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#5F6F82]">{book.description}</p>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl border border-[#E4E9F0] bg-white p-5 shadow-[0_12px_34px_rgba(11,45,91,.045)] sm:grid-cols-3">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><FileText size={17} /></span><div><p className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">Format</p><p className="font-semibold text-[#0B2D5B]">{book.format || "eBook"}</p></div></div>
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><Languages size={17} /></span><div><p className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">Language</p><p className="font-semibold text-[#0B2D5B]">{book.language || "Digital"}</p></div></div>
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><FileText size={17} /></span><div><p className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">Length</p><p className="font-semibold text-[#0B2D5B]">{book.pages ? `${book.pages} pages` : "See edition"}</p></div></div>
          </div>

          <div className="mt-8 rounded-3xl bg-[#0B2D5B] p-6 text-white shadow-[0_18px_50px_rgba(11,45,91,.18)]">
            <h3 className="text-lg font-semibold">What happens after purchase?</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/68">
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> Razorpay payment is verified on the server before fulfillment.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> When an ebook file is attached, access is provided through a short-lived private download link.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FDBA4A]" /> You can read the downloaded edition on compatible phones, tablets and laptops.</span>
            </div>
          </div>
        </div>
      </section>

      {related.length ? <section className="border-t border-[#E4E9F0] bg-[#F8FAFC]"><div className="mx-auto max-w-7xl px-6 py-14"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#B76800]">Keep exploring</p><h2 className="mt-2 text-3xl font-semibold text-[#0B2D5B]">More from this shelf</h2></div><Link href={`/category/${book.category_slug}`} className="hidden text-sm font-semibold text-[#0B2D5B] sm:block">View category →</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></div></section> : null}

      <StoreFooter />
    </main>
  );
}
