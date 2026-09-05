"use client";

import { useState } from "react";
import { BookOpenCheck, CheckCircle2, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";

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
      if (!response.ok) throw new Error(order.error || "Could not create order");
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
    <div className="rounded-[22px] border border-[#E3E8EF] bg-white p-3 shadow-[0_14px_40px_rgba(11,45,91,.08)] sm:rounded-[24px] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] px-3.5 py-3 text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B2D5B]"><ShieldCheck size={15} className="text-[#16815A]" /> Protected payment</span>
        <span className="font-bold text-[#0B2D5B]">₹{price}</span>
      </div>
      <button onClick={buy} disabled={loading} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-5 py-4 text-[15px] font-bold text-[#0B2D5B] shadow-[0_12px_30px_rgba(245,158,11,.24)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base">
        {loading ? <Loader2 className="animate-spin" size={19} /> : <BookOpenCheck size={19} />} Buy now · ₹{price}
      </button>
      <div className="mt-3 grid gap-1.5 text-[11px] font-medium text-[#708095] min-[430px]:grid-cols-2 sm:text-xs">
        <span className="flex items-center gap-1.5"><LockKeyhole size={13} className="shrink-0 text-[#16815A]" /> Secure encrypted checkout</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="shrink-0 text-[#16815A]" /> Server-verified payment</span>
      </div>
    </div>
  );
}
