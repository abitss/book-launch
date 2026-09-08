"use client";

import { FormEvent, useMemo, useState } from "react";

const BOOKS = [
  ["indian-polity", "Indian Polity"],
  ["wings-of-fire", "Wings of Fire"],
  ["the-plague", "The Plague"],
  ["the-theory-of-everything", "The Theory of Everything"],
  ["think-and-grow-rich", "Think and Grow Rich"],
  ["tiger-eyes", "Tiger Eyes"],
  ["to-kill-a-mockingbird", "To Kill a Mockingbird"],
  ["the-fault-in-our-stars", "The Fault in Our Stars"],
  ["the-girl-with-the-dragon-tattoo", "The Girl with the Dragon Tattoo"],
  ["the-kite-runner", "The Kite Runner"],
  ["the-odyssey", "The Odyssey"],
  ["brief-history-modern-india", "A Brief History of Modern India"],
  ["the-book-thief", "The Book Thief"],
  ["the-diary-of-a-young-girl", "The Diary of a Young Girl"],
  ["history-of-medieval-india", "History of Medieval India"],
  ["sita-warrior-of-mithila", "Sita: Warrior of Mithila"],
  ["sapiens", "Sapiens"],
  ["rich-dad-poor-dad", "Rich Dad Poor Dad"],
  ["ancient-india-rs-sharma", "Ancient India"],
  ["pride-and-prejudice-illustrated", "Pride and Prejudice"],
  ["pinnacle-ssc-reasoning-8th-edition", "Pinnacle SSC Reasoning"],
  ["a-gentleman-in-moscow", "A Gentleman in Moscow"],
  ["a-thousand-splendid-suns", "A Thousand Splendid Suns"],
  ["srimad-bhagavad-gita-hindi", "Shrimad Bhagavad Gita"],
  ["modern-india-bipan-chandra", "Modern India by Bipan Chandra"],
  ["dharmayoddha-kalki-avatar-of-vishnu", "Dharmayoddha Kalki"],
  ["a-brief-history-of-time", "A Brief History of Time"],
  ["12th-fail-hindi", "12th Fail"],
] as const;

const UPLOAD_ENDPOINT = "https://iasxygnoezjtizjdltag.supabase.co/functions/v1/ebookiee-upload";

export default function OwnerDeliveryPage() {
  const [bookId, setBookId] = useState(BOOKS[0][0]);
  const [setupCode, setSetupCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const title = useMemo(() => BOOKS.find(([id]) => id === bookId)?.[1] || bookId, [bookId]);

  async function upload(event: FormEvent) {
    event.preventDefault();
    if (!file) return setStatus("Choose the PDF first.");
    if (!setupCode) return setStatus("Enter the owner setup code.");
    try {
      setBusy(true);
      setStatus(`Uploading ${title}...`);
      const body = new FormData();
      body.append("setupCode", setupCode);
      body.append("bookId", bookId);
      body.append("file", file);
      const response = await fetch(UPLOAD_ENDPOINT, { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Upload failed");
      setStatus(`Ready for sale: ${title}. Its secure PDF is now attached.`);
      setFile(null);
      const input = document.getElementById("ebook-file") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-10 text-[#1F2937]">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#DDE5EE] bg-white p-6 shadow-[0_20px_60px_rgba(11,45,91,.08)] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#A86106]">Owner only</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B]">Attach secure ebook files</h1>
        <p className="mt-3 text-sm leading-6 text-[#66768A]">Upload the permitted PDF for each catalog title. A book only becomes payable after its PDF is attached, preventing paid orders without delivery.</p>

        <form onSubmit={upload} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Book
            <select value={bookId} onChange={(e) => setBookId(e.target.value as typeof bookId)} className="min-h-12 rounded-xl border border-[#CBD5E1] bg-white px-3 text-sm outline-none focus:border-[#F59E0B]">
              {BOOKS.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Owner setup code
            <input type="password" value={setupCode} onChange={(e) => setSetupCode(e.target.value)} autoComplete="off" className="min-h-12 rounded-xl border border-[#CBD5E1] px-3 outline-none focus:border-[#F59E0B]" />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">PDF file
            <input id="ebook-file" type="file" accept="application/pdf,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="rounded-xl border border-dashed border-[#B8C5D4] bg-[#F8FAFC] p-4 text-sm" />
          </label>

          <button disabled={busy} className="min-h-13 rounded-xl bg-[#F59E0B] px-5 py-3.5 font-bold text-[#0B2D5B] disabled:opacity-60">{busy ? "Uploading securely..." : "Attach PDF & enable sale"}</button>
        </form>

        {status ? <div className="mt-5 rounded-xl border border-[#DDE5EE] bg-[#F8FAFC] p-4 text-sm font-medium text-[#44556A]">{status}</div> : null}
      </div>
    </main>
  );
}
