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
    <main className="min-h-screen bg-[#fffdf7] text-stone-950">
      <StoreNav />

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <Link href={`/category/${book.category_slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 transition hover:text-stone-950"><ArrowLeft size={15} /> Back to {book.category_slug.replaceAll("-", " ")}</Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[.82fr_1.18fr] lg:py-12">
        <div className="self-start rounded-[36px] border border-stone-200 bg-gradient-to-br from-[#eee7da] to-[#faf7f0] p-8 sm:p-10 lg:sticky lg:top-28">
          <img src={book.cover_url} alt={book.title} className="mx-auto max-h-[620px] w-full rounded-xl object-contain drop-shadow-[0_26px_28px_rgba(0,0,0,.22)]" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-800">{book.category_slug.replaceAll("-", " ")}</span>
            {book.badge ? <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-white">{book.badge}</span> : null}
            {discount ? <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-stone-950">SAVE {discount}%</span> : null}
          </div>

          <h1 className="text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-6xl">{book.title}</h1>
          {book.subtitle ? <p className="mt-3 max-w-2xl text-xl leading-8 text-stone-500">{book.subtitle}</p> : null}
          <p className="mt-4 text-sm font-bold uppercase tracking-[.08em] text-stone-500">by <span className="text-stone-950">{book.author}</span></p>

          <div className="mt-7 flex items-end gap-3">
            <span className="text-4xl font-black">₹{book.price}</span>
            {book.original_price ? <span className="pb-1 text-lg text-stone-400 line-through">₹{book.original_price}</span> : null}
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-500">Digital edition · Instant access after verified payment</p>

          <div className="mt-7 max-w-md"><BuyButton bookId={book.id} title={book.title} price={book.price} /></div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><Download size={17} className="text-amber-700" /> Instant access</div>
            <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><ShieldCheck size={17} className="text-amber-700" /> Secure payment</div>
            <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><Smartphone size={17} className="text-amber-700" /> Mobile friendly</div>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-black">About this ebook</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{book.description}</p>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl border border-stone-200 bg-white p-5 sm:grid-cols-3">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100"><FileText size={17} /></span><div><p className="text-xs font-bold uppercase tracking-wide text-stone-400">Format</p><p className="font-black">{book.format || "eBook"}</p></div></div>
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100"><Languages size={17} /></span><div><p className="text-xs font-bold uppercase tracking-wide text-stone-400">Language</p><p className="font-black">{book.language || "Digital"}</p></div></div>
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100"><FileText size={17} /></span><div><p className="text-xs font-bold uppercase tracking-wide text-stone-400">Length</p><p className="font-black">{book.pages ? `${book.pages} pages` : "See edition"}</p></div></div>
          </div>

          <div className="mt-8 rounded-3xl bg-stone-950 p-6 text-white">
            <h3 className="text-lg font-black">What happens after purchase?</h3>
            <div className="mt-4 grid gap-3 text-sm text-stone-300">
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-300" /> Razorpay payment is verified on the server before fulfillment.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-300" /> When an ebook file is attached, access is provided through a short-lived private download link.</span>
              <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-300" /> You can read the downloaded edition on compatible phones, tablets and laptops.</span>
            </div>
          </div>
        </div>
      </section>

      {related.length ? <section className="border-t border-stone-200 bg-white/60"><div className="mx-auto max-w-7xl px-6 py-14"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-amber-700">Keep exploring</p><h2 className="mt-2 text-3xl font-black">More from this shelf</h2></div><Link href={`/category/${book.category_slug}`} className="hidden text-sm font-black sm:block">View category →</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></div></section> : null}

      <StoreFooter />
    </main>
  );
}
