import { notFound } from "next/navigation";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BuyButton from "@/components/BuyButton";
import BookCard from "@/components/BookCard";
import { getBookBySlug, getBooks } from "@/lib/catalog";
import { CheckCircle2, Download, ShieldCheck, Smartphone } from "lucide-react";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();
  const related = (await getBooks()).filter((item) => item.category_slug === book.category_slug && item.id !== book.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fffdf7] text-stone-900">
      <StoreNav />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[.8fr_1.2fr] lg:py-16">
        <div className="rounded-[36px] bg-[#f0eadf] p-10"><img src={book.cover_url} alt={book.title} className="mx-auto max-h-[620px] w-full object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.20)]" /></div>
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-800">{book.category_slug.replaceAll("-", " ")}</span>{book.badge ? <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-black text-white">{book.badge}</span> : null}</div>
          <h1 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{book.title}</h1>
          {book.subtitle ? <p className="mt-3 text-xl text-stone-500">{book.subtitle}</p> : null}
          <p className="mt-4 font-semibold">by {book.author}</p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600">{book.description}</p>
          <div className="mt-7 flex items-end gap-3"><span className="text-4xl font-black">₹{book.price}</span>{book.original_price ? <span className="pb-1 text-lg text-stone-400 line-through">₹{book.original_price}</span> : null}</div>
          <div className="mt-7 max-w-md"><BuyButton bookId={book.id} title={book.title} price={book.price} /></div>
          <div className="mt-7 grid gap-3 text-sm sm:grid-cols-3"><div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><Download size={17} /> Instant access</div><div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><ShieldCheck size={17} /> Secure payment</div><div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3"><Smartphone size={17} /> Mobile friendly</div></div>
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-5"><h3 className="font-black">What you get</h3><div className="mt-3 grid gap-2 text-sm text-stone-600"><span className="flex items-center gap-2"><CheckCircle2 size={16} /> Digital edition delivered after verified payment</span><span className="flex items-center gap-2"><CheckCircle2 size={16} /> Short-lived private download link when a file is attached</span><span className="flex items-center gap-2"><CheckCircle2 size={16} /> {book.language || "Digital"} · {book.format || "eBook"}{book.pages ? ` · ${book.pages} pages` : ""}</span></div></div>
        </div>
      </section>
      {related.length ? <section className="mx-auto max-w-7xl px-6 py-10"><h2 className="mb-6 text-2xl font-black">More from this shelf</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></section> : null}
      <StoreFooter />
    </main>
  );
}
