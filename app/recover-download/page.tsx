"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Download, Loader2, ShieldCheck } from "lucide-react";

const BOOKS = [
  ["indian-polity", "Indian Polity"], ["wings-of-fire", "Wings of Fire"], ["the-plague", "The Plague"],
  ["the-theory-of-everything", "The Theory of Everything"], ["think-and-grow-rich", "Think and Grow Rich"],
  ["tiger-eyes", "Tiger Eyes"], ["to-kill-a-mockingbird", "To Kill a Mockingbird"], ["the-fault-in-our-stars", "The Fault in Our Stars"],
  ["the-girl-with-the-dragon-tattoo", "The Girl with the Dragon Tattoo"], ["the-kite-runner", "The Kite Runner"],
  ["the-odyssey", "The Odyssey"], ["brief-history-modern-india", "A Brief History of Modern India"], ["the-book-thief", "The Book Thief"],
  ["the-diary-of-a-young-girl", "The Diary of a Young Girl"], ["history-of-medieval-india", "History of Medieval India"],
  ["sita-warrior-of-mithila", "Sita: Warrior of Mithila"], ["sapiens", "Sapiens"], ["rich-dad-poor-dad", "Rich Dad Poor Dad"],
  ["ancient-india-rs-sharma", "Ancient India"], ["pride-and-prejudice-illustrated", "Pride and Prejudice"],
  ["pinnacle-ssc-reasoning-8th-edition", "Pinnacle SSC Reasoning"], ["a-gentleman-in-moscow", "A Gentleman in Moscow"],
  ["a-thousand-splendid-suns", "A Thousand Splendid Suns"], ["srimad-bhagavad-gita-hindi", "Shrimad Bhagavad Gita"],
  ["modern-india-bipan-chandra", "Modern India by Bipan Chandra"], ["dharmayoddha-kalki-avatar-of-vishnu", "Dharmayoddha Kalki"],
  ["a-brief-history-of-time", "A Brief History of Time"], ["12th-fail-hindi", "12th Fail"]
] as const;

const RECOVER_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-recover";

async function startDelivery(payload: { downloadUrl?: string; downloadParts?: string[]; originalFilename?: string; filename?: string }, onProgress: (message: string) => void) {
  if (payload.downloadUrl) {
    window.location.assign(payload.downloadUrl);
    return;
  }

  if (Array.isArray(payload.downloadParts) && payload.downloadParts.length) {
    const chunks: BlobPart[] = [];
    for (let i = 0; i < payload.downloadParts.length; i += 1) {
      onProgress(`Payment verified. Preparing your ebook: part ${i + 1} of ${payload.downloadParts.length}...`);
      const response = await fetch(payload.downloadParts[i]);
      if (!response.ok) throw new Error("A secure ebook part could not be downloaded. Please try again.");
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
    onProgress("Payment verified. Your ebook download has started.");
    return;
  }

  throw new Error("Could not create the secure download.");
}

export default function RecoverDownloadPage() {
  const [paymentId, setPaymentId] = useState("");
  const [bookId, setBookId] = useState(BOOKS[0][0]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function recover(event: FormEvent) {
    event.preventDefault();
    try {
      setBusy(true);
      setMessage("Verifying your payment...");
      const response = await fetch(RECOVER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: paymentId.trim(), bookId })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not recover download");
      await startDelivery(data, setMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not recover download");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-10 text-[#1F2937]">
      <div className="mx-auto max-w-xl rounded-3xl border border-[#DDE5EE] bg-white p-6 shadow-[0_20px_60px_rgba(11,45,91,.08)] sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF3D7] text-[#A86106]"><Download size={22} /></div>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B]">Recover your ebook</h1>
        <p className="mt-2 text-sm leading-6 text-[#66768A]">Already paid but the download did not start? Enter the Razorpay payment ID and choose the book. We verify the payment on the server before releasing a private download.</p>

        <form onSubmit={recover} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Razorpay payment ID
            <input value={paymentId} onChange={(e) => setPaymentId(e.target.value)} placeholder="pay_..." required className="min-h-12 rounded-xl border border-[#CBD5E1] px-3 outline-none focus:border-[#F59E0B]" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Book
            <select value={bookId} onChange={(e) => setBookId(e.target.value as typeof bookId)} className="min-h-12 rounded-xl border border-[#CBD5E1] bg-white px-3 outline-none focus:border-[#F59E0B]">
              {BOOKS.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>
          <button disabled={busy} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-3.5 font-bold text-[#0B2D5B] disabled:opacity-60">
            {busy ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />} {busy ? "Preparing secure download..." : "Verify payment & download"}
          </button>
        </form>

        {message ? <div className="mt-5 rounded-xl border border-[#DDE5EE] bg-[#F8FAFC] p-4 text-sm font-medium text-[#44556A]">{message}</div> : null}
        <p className="mt-5 text-xs leading-5 text-[#8492A4]">The ebook remains in private storage. Large PDFs are reconstructed securely in your browser after payment verification.</p>
        <Link href="/" className="mt-5 inline-block text-sm font-bold text-[#0B2D5B]">← Back to store</Link>
      </div>
    </main>
  );
}
