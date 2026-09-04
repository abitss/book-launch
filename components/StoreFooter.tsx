import Link from "next/link";

export default function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-[#171717] text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><div className="text-2xl font-black text-white">eBookies.store</div><p className="mt-3 max-w-md text-sm leading-6 text-stone-400">A clean digital bookstore for legally licensed ebooks, study material and independent publications.</p></div>
        <div><h4 className="font-bold text-white">Store</h4><div className="mt-3 grid gap-2 text-sm"><Link href="/">Home</Link><Link href="/search">Browse books</Link><Link href="/admin">Admin</Link></div></div>
        <div><h4 className="font-bold text-white">Policies</h4><div className="mt-3 grid gap-2 text-sm"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link><Link href="/contact">Contact</Link></div></div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-stone-500">© {new Date().getFullYear()} eBookies.store. Sell only content you own or are licensed to distribute.</div>
    </footer>
  );
}
