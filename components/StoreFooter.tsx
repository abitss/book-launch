import Link from "next/link";
import { BookOpen, Mail, ShieldCheck } from "lucide-react";

export default function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-[#171717] text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-2xl font-black text-white"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-400 text-stone-950"><BookOpen size={20} /></span>eBookies.store</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-400">A digital-first bookstore for ebooks, study material and independent publications. Discover, pay securely and start reading in minutes.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[.12em] text-stone-500"><span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure payments</span><span className="flex items-center gap-2"><Mail size={14} /> Instant access</span></div>
        </div>
        <div><h4 className="font-bold text-white">Discover</h4><div className="mt-4 grid gap-2.5 text-sm"><Link href="/search">All books</Link><Link href="/#categories">Categories</Link><Link href="/#featured">Featured picks</Link><Link href="/#deals">Deals</Link></div></div>
        <div><h4 className="font-bold text-white">Support</h4><div className="mt-4 grid gap-2.5 text-sm"><Link href="/contact">Contact us</Link><Link href="/refund-policy">Refund policy</Link><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-and-conditions">Terms & conditions</Link></div></div>
        <div><h4 className="font-bold text-white">Why eBookies</h4><div className="mt-4 grid gap-2.5 text-sm text-stone-400"><span>Instant digital delivery</span><span>Mobile & laptop friendly</span><span>Curated catalog</span><span>Secure Razorpay checkout</span></div></div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-stone-500">© {new Date().getFullYear()} eBookies.store. All rights reserved.</div>
    </footer>
  );
}
