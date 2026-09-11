import Link from "next/link";
import { notFound } from "next/navigation";
import StoreNav from "@/components/StoreNav";
import StoreFooter from "@/components/StoreFooter";
import BuyButton from "@/components/BuyButton";
import BookCard from "@/components/BookCard";
import { getBookBySlug, getBooks } from "@/lib/catalog";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Languages,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const allBooks = await getBooks();
  const related = allBooks.filter((item) => item.category_slug === book.category_slug && item.id !== book.id).slice(0, 4);
  const discount = book.original_price && book.original_price > book.price ? Math.round((1 - book.price / book.original_price) * 100) : null;
  const savings = book.original_price && book.original_price > book.price ? book.original_price - book.price : null;
  const coverSrc = `/api/book-cover/${book.id}`;
  const categoryLabel = book.category_slug.replaceAll("-", " ");

  const details = [
    { label: "Format", value: book.format || "Digital ebook", icon: FileText },
    { label: "Language", value: book.language || "Digital", icon: Languages },
    { label: "Length", value: book.pages ? `${book.pages} pages` : "See edition", icon: BookOpen },
  ];

  const publishingDetails = [
    book.publisher ? ["Publisher", book.publisher] : null,
    book.edition ? ["Edition", book.edition] : null,
    book.isbn ? ["ISBN", book.isbn] : null,
  ].filter(Boolean) as [string, string][];

  return (
    <main className="min-h-screen bg-[#FBF8F1] pb-36 text-[#253044] md:pb-0">
      <StoreNav />

      <section className="border-b border-[#E9E2D6] bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 overflow-hidden text-[11px] font-semibold text-[#7B8798] sm:text-xs">
            <Link href="/" className="shrink-0 transition hover:text-[#08254D]">Home</Link>
            <span className="text-[#C8BCA8]">/</span>
            <Link href={`/category/${book.category_slug}`} className="shrink-0 capitalize transition hover:text-[#08254D]">{categoryLabel}</Link>
            <span className="text-[#C8BCA8]">/</span>
            <span className="truncate text-[#3E4A5E]">{book.title}</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#E7DED0] bg-[#FBF8F1]">
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-40" />
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-[#F59E0B]/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#08254D]/6 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-14 lg:py-16">
          <div className="self-start lg:sticky lg:top-28">
            <Link href={`/category/${book.category_slug}`} className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[#6E7A8C] transition hover:text-[#08254D] lg:hidden"><ArrowLeft size={14} /> Back to {categoryLabel}</Link>

            <div className="relative mx-auto max-w-[460px] rounded-[30px] border border-[#DDD3C3] bg-[#FFFDF9] p-4 shadow-[0_28px_80px_rgba(8,37,77,.11)] sm:p-7">
              <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9A5C05] shadow-sm backdrop-blur">
                <Sparkles size={12} /> Digital edition
              </div>
              <div className="overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_50%_15%,#FFF8E8_0%,#F7F2E8_48%,#EDE5D8_100%)] px-6 pb-6 pt-16 sm:px-9 sm:pb-9 sm:pt-20">
                <img src={coverSrc} alt={`${book.title} cover`} className="mx-auto max-h-[520px] w-full rounded-xl object-contain drop-shadow-[0_26px_24px_rgba(8,37,77,.22)] transition duration-500 hover:scale-[1.015]" />
              </div>
            </div>

            <div className="mx-auto mt-4 grid max-w-[460px] grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-[#E5DDD0] bg-white/75 p-3 text-center backdrop-blur"><ShieldCheck size={16} className="mx-auto text-[#16815A]" /><p className="mt-1.5 text-[10px] font-bold text-[#526174]">Secure pay</p></div>
              <div className="rounded-2xl border border-[#E5DDD0] bg-white/75 p-3 text-center backdrop-blur"><Download size={16} className="mx-auto text-[#D98900]" /><p className="mt-1.5 text-[10px] font-bold text-[#526174]">Private access</p></div>
              <div className="rounded-2xl border border-[#E5DDD0] bg-white/75 p-3 text-center backdrop-blur"><Smartphone size={16} className="mx-auto text-[#08254D]" /><p className="mt-1.5 text-[10px] font-bold text-[#526174]">Any device</p></div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center lg:py-2">
            <div className="mb-4 hidden lg:block">
              <Link href={`/category/${book.category_slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#6E7A8C] transition hover:text-[#08254D]"><ArrowLeft size={14} /> Back to {categoryLabel}</Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#E9D5A5] bg-[#FFF6DD] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.11em] text-[#955B00]">{categoryLabel}</span>
              {book.badge ? <span className="rounded-full bg-[#08254D] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.09em] text-white">{book.badge}</span> : null}
              {discount ? <span className="rounded-full bg-[#F7B733] px-3 py-1.5 text-[10px] font-extrabold text-[#08254D]">SAVE {discount}%</span> : null}
            </div>

            <h1 className="editorial-serif mt-5 max-w-4xl break-words text-[2.45rem] leading-[.98] text-[#08254D] sm:text-6xl lg:text-[4.8rem]">{book.title}</h1>
            {book.subtitle ? <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#697789] sm:text-lg sm:leading-8">{book.subtitle}</p> : null}
            <p className="mt-4 text-xs font-bold uppercase tracking-[.11em] text-[#8A96A6]">By <span className="text-[#253E63]">{book.author}</span></p>

            <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-[2.6rem] font-black tracking-[-.055em] text-[#08254D] sm:text-5xl">₹{book.price}</span>
              {book.original_price ? <span className="pb-1.5 text-base text-[#9AA5B3] line-through sm:text-lg">₹{book.original_price}</span> : null}
              {savings ? <span className="mb-1 rounded-full bg-[#EAF7F1] px-2.5 py-1 text-[11px] font-extrabold text-[#167051]">You save ₹{savings}</span> : null}
            </div>
            <p className="mt-1.5 text-[11px] font-medium text-[#8B97A5]">One-time payment · Digital PDF access</p>

            <div className="mt-6 grid grid-cols-3 gap-2.5 sm:max-w-2xl sm:gap-3">
              {details.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-[#E4DDD1] bg-white/80 p-3.5 shadow-[0_8px_24px_rgba(8,37,77,.035)] backdrop-blur sm:p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#FFF3D7] text-[#A86106]"><Icon size={15} /></span>
                  <p className="mt-3 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#98A1AD]">{label}</p>
                  <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-[#203858] sm:text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 max-w-xl">
              {book.purchasable ? (
                <BuyButton bookId={book.id} title={book.title} price={book.price} />
              ) : (
                <div className="rounded-[24px] border border-[#E5DDD0] bg-white p-5 shadow-[0_18px_48px_rgba(8,37,77,.07)]">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFF3D7] text-[#9A5C05]"><BookOpen size={20} /></span>
                    <div><p className="font-bold text-[#08254D]">Digital edition being prepared</p><p className="mt-1 text-sm leading-6 text-[#718095]">Checkout will appear when the private ebook file is ready for verified delivery.</p></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 max-w-3xl border-t border-[#DED7CB] pt-7">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.13em] text-[#A2680C]"><BookOpen size={14} /> About the book</div>
              <p className="mt-3 text-[15px] leading-7 text-[#556579] sm:text-base sm:leading-8">{book.description}</p>
            </div>

            {publishingDetails.length ? (
              <div className="mt-7 max-w-3xl rounded-[24px] border border-[#E3DCD0] bg-[#FFFDF9] p-5 sm:p-6">
                <h2 className="text-base font-extrabold text-[#08254D]">Edition details</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {publishingDetails.map(([label, value]) => <div key={label} className="border-b border-[#EEE7DC] pb-3 last:border-0 sm:last:border-b"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9AA4B0]">{label}</p><p className="mt-1 text-sm font-semibold leading-6 text-[#48586D]">{value}</p></div>)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#08254D] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#F7B733]">Built for confidence</p>
            <h2 className="editorial-serif mt-2 text-3xl leading-tight sm:text-4xl">A clean purchase flow from shelf to screen.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">Your ebook is released only after server-side payment verification, with recovery available if the browser closes at the wrong moment.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4"><LockKeyhole size={19} className="text-[#F7B733]" /><p className="mt-3 text-sm font-bold">1. Secure checkout</p><p className="mt-1.5 text-xs leading-5 text-white/52">Complete the payment through the verified checkout flow.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4"><BadgeCheck size={19} className="text-[#F7B733]" /><p className="mt-3 text-sm font-bold">2. Server verification</p><p className="mt-1.5 text-xs leading-5 text-white/52">The transaction is checked before the private file is released.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4"><Download size={19} className="text-[#F7B733]" /><p className="mt-3 text-sm font-bold">3. Private delivery</p><p className="mt-1.5 text-xs leading-5 text-white/52">Your download is prepared after verification, not exposed publicly.</p></div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-[#E8E0D4] bg-[#FFFDF9]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#A2680C]">From the same shelf</p><h2 className="editorial-serif mt-1.5 text-3xl text-[#08254D] sm:text-4xl">You may also like</h2></div>
              <Link href={`/category/${book.category_slug}`} className="hidden rounded-full border border-[#D9D0C2] bg-white px-4 py-2 text-xs font-bold text-[#08254D] transition hover:border-[#F59E0B] sm:inline-flex">View category</Link>
            </div>
            <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">{related.map((item) => <BookCard key={item.id} book={item} />)}</div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[#E8E0D4] bg-[#FBF8F1]">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex gap-3 rounded-2xl border border-[#E3DCD0] bg-white/70 p-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#16815A]" /><div><h3 className="text-sm font-bold text-[#08254D]">Clear product details</h3><p className="mt-1 text-xs leading-5 text-[#748295]">Format, language, edition and price are shown before payment.</p></div></div>
            <div className="flex gap-3 rounded-2xl border border-[#E3DCD0] bg-white/70 p-4"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#16815A]" /><div><h3 className="text-sm font-bold text-[#08254D]">Verified fulfillment</h3><p className="mt-1 text-xs leading-5 text-[#748295]">Digital delivery is tied to successful payment verification.</p></div></div>
            <div className="flex gap-3 rounded-2xl border border-[#E3DCD0] bg-white/70 p-4"><Smartphone size={18} className="mt-0.5 shrink-0 text-[#D98900]" /><div><h3 className="text-sm font-bold text-[#08254D]">Read where you like</h3><p className="mt-1 text-xs leading-5 text-[#748295]">Use your downloaded PDF on supported phones, tablets and computers.</p></div></div>
          </div>
        </div>
      </section>

      <StoreFooter />
    </main>
  );
}
