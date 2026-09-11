"use client";

import { useState } from "react";
import { CheckCircle2, Download, Loader2, LockKeyhole, ShieldCheck, ShoppingBag } from "lucide-react";

declare global { interface Window { Razorpay: any; } }

const DELIVERY_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-deliver";

async function startDelivery(payload: { downloadUrl?: string; downloadParts?: string[]; originalFilename?: string; filename?: string }) {
  if (payload.downloadUrl) {
    window.location.assign(payload.downloadUrl);
    return;
  }

  if (Array.isArray(payload.downloadParts) && payload.downloadParts.length) {
    const chunks: BlobPart[] = [];
    for (const url of payload.downloadParts) {
      const response = await fetch(url);
      if (!response.ok) throw new Error("A secure ebook part could not be downloaded. Please try recovery with your payment ID.");
      chunks.push(await response.arrayBuffer());
    }
    const blob = new Blob(chunks, { type: "application/pdf" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = payload.originalFilename || payload.filename || "ebook.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    return;
  }

  throw new Error("Secure download could not be created. Please use Recover Download with your payment ID.");
}

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
        theme: { color: "#08254D" },
        handler: async (payment: Record<string, string>) => {
          try {
            setLoading(true);

            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payment, bookId })
            });
            const verified = await verifyResponse.json();
            if (!verifyResponse.ok || !verified.success) throw new Error(verified.message || "Payment verification failed");

            if (verified.downloadUrl) {
              await startDelivery(verified);
              return;
            }

            const deliveryResponse = await fetch(DELIVERY_ENDPOINT, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payment, bookId })
            });
            const delivery = await deliveryResponse.json();
            if (!deliveryResponse.ok || !delivery.ok) {
              throw new Error(delivery.error || "Payment succeeded, but secure delivery could not be created. Keep your payment ID and use Recover Download.");
            }

            await startDelivery(delivery);
          } catch (error) {
            alert(error instanceof Error ? error.message : "Payment completed, but delivery failed. Please use Recover Download with your payment ID.");
          } finally {
            setLoading(false);
          }
        }
      });
      secureCheckout.open();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-[26px] border border-[#DDD4C5] bg-[#FFFDF9] shadow-[0_22px_62px_rgba(8,37,77,.10)]">
        <div className="border-b border-[#ECE4D8] bg-[linear-gradient(135deg,#FFF9EB_0%,#FFFDF9_58%,#F5F8FC_100%)] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-[#9A6A1B]">Your digital copy</p>
              <div className="mt-1.5 flex items-end gap-2"><span className="text-3xl font-black tracking-[-.045em] text-[#08254D]">₹{price}</span><span className="pb-1 text-[11px] font-semibold text-[#8995A4]">one-time</span></div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CFE9DC] bg-[#ECF8F2] px-2.5 py-1.5 text-[10px] font-extrabold text-[#147454]"><ShieldCheck size={13} /> Verified checkout</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <button onClick={buy} disabled={loading} className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F7B733] px-5 py-4 text-[15px] font-extrabold text-[#08254D] shadow-[0_13px_30px_rgba(247,183,51,.26)] transition hover:-translate-y-0.5 hover:bg-[#FFC44F] hover:shadow-[0_16px_34px_rgba(247,183,51,.32)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:text-base">
            {loading ? <Loader2 className="animate-spin" size={19} /> : <ShoppingBag size={19} />} {loading ? "Processing securely..." : `Buy ebook for ₹${price}`}
          </button>

          <div className="mt-4 grid gap-2.5 text-[11px] font-semibold text-[#66768A] min-[430px]:grid-cols-2 sm:text-xs">
            <span className="flex items-center gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#EEF7F3] text-[#16815A]"><LockKeyhole size={13} /></span> Encrypted payment</span>
            <span className="flex items-center gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#FFF4DD] text-[#B36D00]"><Download size={13} /></span> Private PDF delivery</span>
            <span className="flex items-center gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#EEF3FA] text-[#08254D]"><CheckCircle2 size={13} /></span> Server verification</span>
            <span className="flex items-center gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#EEF3FA] text-[#08254D]"><ShieldCheck size={13} /></span> Recovery supported</span>
          </div>
          <p className="mt-4 border-t border-[#EEE7DC] pt-3 text-[10px] leading-4 text-[#8B96A3]">Your ebook is released only after successful server-side payment verification.</p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[64px] z-[55] border-t border-[#E4DDD2] bg-[#FFFDF9]/96 px-3 py-2.5 shadow-[0_-12px_34px_rgba(8,37,77,.10)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-[#748396]">{title}</p>
            <div className="mt-0.5 flex items-center gap-1.5"><span className="text-xl font-black tracking-[-.035em] text-[#08254D]">₹{price}</span><span className="text-[10px] font-bold text-[#16815A]">Secure delivery</span></div>
          </div>
          <button onClick={buy} disabled={loading} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#F7B733] px-4 text-sm font-extrabold text-[#08254D] shadow-[0_8px_20px_rgba(247,183,51,.26)] disabled:opacity-60">
            {loading ? <Loader2 className="animate-spin" size={17} /> : <ShoppingBag size={17} />} {loading ? "Please wait" : "Buy now"}
          </button>
        </div>
      </div>
    </>
  );
}
