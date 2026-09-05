"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, LockKeyhole, ShieldCheck, ShoppingBag } from "lucide-react";

declare global { interface Window { Razorpay: any; } }

export default function BuyButton({ bookId, title, price }: { bookId: string; title: string; price: number }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    try {
      setLoading(true);
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId })
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Could not start secure payment");
      if (!window.Razorpay) throw new Error("Secure payment checkout did not load. Refresh and try again.");

      const secureCheckout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "eBookiee.store",
        description: title,
        order_id: order.id,
        theme: { color: "#0B2D5B" },
        handler: async (payment: Record<string, string>) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payment, bookId })
          });
          const verified = await verifyResponse.json();
          if (!verifyResponse.ok || !verified.success) throw new Error(verified.message || "Payment verification failed");
          if (verified.downloadUrl) window.location.href = verified.downloadUrl;
          else alert("Payment verified. Your order has been recorded. If your download is not available yet, please contact eBookiee.store support with your payment ID.");
        }
      });
      secureCheckout.open();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-[18px] border border-[#DEE5ED] bg-white p-3.5 shadow-[0_14px_38px_rgba(11,45,91,.07)] sm:rounded-[22px] sm:p-4">
        <div className="flex items-center justify-between gap-4 border-b border-[#EEF2F6] pb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8A98A9]">Total</p>
            <p className="mt-0.5 text-2xl font-bold tracking-[-.03em] text-[#0B2D5B]">₹{price}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECF8F2] px-2.5 py-1.5 text-[10px] font-bold text-[#147454]"><ShieldCheck size={13} /> Secure payment</span>
        </div>

        <button onClick={buy} disabled={loading} className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-4 text-[15px] font-bold text-[#0B2D5B] shadow-[0_10px_26px_rgba(245,158,11,.22)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base">
          {loading ? <Loader2 className="animate-spin" size={19} /> : <ShoppingBag size={19} />} {loading ? "Opening secure payment..." : `Buy now · ₹${price}`}
        </button>

        <div className="mt-3 grid gap-1.5 text-[11px] font-medium text-[#708095] min-[430px]:grid-cols-2 sm:text-xs">
          <span className="flex items-center gap-1.5"><LockKeyhole size={13} className="shrink-0 text-[#16815A]" /> Encrypted checkout</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="shrink-0 text-[#16815A]" /> Price verified on server</span>
        </div>
        <p className="mt-2.5 text-[10px] leading-4 text-[#8A98A9]">The final amount is shown before payment. Digital access is released only after successful verification.</p>
      </div>

      <div className="fixed inset-x-0 bottom-[64px] z-[55] border-t border-[#E2E8F0] bg-white/96 px-3 py-2.5 shadow-[0_-10px_28px_rgba(11,45,91,.10)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-[#748396]">{title}</p>
            <div className="mt-0.5 flex items-center gap-1.5"><span className="text-lg font-bold text-[#0B2D5B]">₹{price}</span><span className="text-[10px] font-semibold text-[#16815A]">Secure payment</span></div>
          </div>
          <button onClick={buy} disabled={loading} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#F59E0B] px-4 text-sm font-bold text-[#0B2D5B] shadow-[0_7px_18px_rgba(245,158,11,.20)] disabled:opacity-60">
            {loading ? <Loader2 className="animate-spin" size={17} /> : <ShoppingBag size={17} />} Buy now
          </button>
        </div>
      </div>
    </>
  );
}
