"use client";

import { useState } from "react";
import { BookOpenCheck, Loader2, LockKeyhole } from "lucide-react";

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
      if (!window.Razorpay) throw new Error("Payment checkout did not load. Refresh and try again.");

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "eBookies.store",
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
          else alert("Payment verified. Your order has been recorded. The download will be enabled once the ebook file is attached in Admin.");
        }
      });
      razorpay.open();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={buy} disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-6 py-4 text-base font-semibold text-[#0B2D5B] shadow-[0_12px_30px_rgba(245,158,11,.24)] transition hover:-translate-y-0.5 hover:bg-[#FDBA4A] disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? <Loader2 className="animate-spin" size={19} /> : <BookOpenCheck size={19} />} Get instant access · ₹{price}
      </button>
      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-[#7C8CA1]"><LockKeyhole size={13} /> Secure checkout powered by Razorpay</div>
    </div>
  );
}
