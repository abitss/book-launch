import Link from "next/link";
import { Download, Mail, ShieldCheck, Smartphone } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function StoreFooter() {
  return (
    <footer className="mt-14 border-t border-[#163E6D] bg-[#0B2D5B] text-white/72 sm:mt-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <BrandLogo showTagline inverse />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/60 sm:mt-5">A calm, trustworthy digital bookstore built around simple discovery, secure checkout and fast access to your next read.</p>
          <div className="mt-5 grid max-w-md gap-3 text-xs font-medium min-[460px]:grid-cols-2 sm:mt-6">
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="shrink-0 text-[#FDBA4A]" /> Secure Razorpay checkout</span>
            <span className="flex items-center gap-2"><Download size={15} className="shrink-0 text-[#FDBA4A]" /> Digital delivery</span>
            <span className="flex items-center gap-2"><Smartphone size={15} className="shrink-0 text-[#FDBA4A]" /> Read across devices</span>
            <span className="flex items-center gap-2"><Mail size={15} className="shrink-0 text-[#FDBA4A]" /> Support when needed</span>
          </div>
        </div>

        <div><h4 className="font-semibold text-white">Discover</h4><div className="mt-3 grid gap-2.5 text-sm sm:mt-4"><Link href="/search" className="transition hover:text-[#FDBA4A]">All books</Link><Link href="/#categories" className="transition hover:text-[#FDBA4A]">Categories</Link><Link href="/#featured" className="transition hover:text-[#FDBA4A]">Featured picks</Link><Link href="/#deals" className="transition hover:text-[#FDBA4A]">Offers</Link></div></div>

        <div><h4 className="font-semibold text-white">Support</h4><div className="mt-3 grid gap-2.5 text-sm sm:mt-4"><Link href="/contact" className="transition hover:text-[#FDBA4A]">Contact us</Link><Link href="/refund-policy" className="transition hover:text-[#FDBA4A]">Refund policy</Link><Link href="/privacy-policy" className="transition hover:text-[#FDBA4A]">Privacy policy</Link><Link href="/terms-and-conditions" className="transition hover:text-[#FDBA4A]">Terms & conditions</Link></div></div>

        <div><h4 className="font-semibold text-white">Shop with confidence</h4><div className="mt-3 grid gap-2.5 text-sm leading-6 text-white/58 sm:mt-4"><span>Verified payment flow</span><span>Clear digital format details</span><span>Transparent pricing</span><span>Private delivery architecture</span></div></div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-[11px] leading-5 text-white/42 sm:px-6 sm:text-xs">© {new Date().getFullYear()} eBookiee.store. All rights reserved.</div>
    </footer>
  );
}
