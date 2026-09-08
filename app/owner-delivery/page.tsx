"use client";

import { DragEvent, FormEvent, useEffect, useMemo, useState } from "react";

const BOOKS = [
  { id: "indian-polity", title: "Indian Polity", aliases: ["indian polity", "laxmikanth polity"] },
  { id: "wings-of-fire", title: "Wings of Fire", aliases: ["wings of fire", "apj abdul kalam", "abdul kalam wings"] },
  { id: "the-plague", title: "The Plague", aliases: ["the plague", "plague albert camus"] },
  { id: "the-theory-of-everything", title: "The Theory of Everything", aliases: ["the theory of everything", "theory of everything hawking"] },
  { id: "think-and-grow-rich", title: "Think and Grow Rich", aliases: ["think and grow rich", "napoleon hill"] },
  { id: "tiger-eyes", title: "Tiger Eyes", aliases: ["tiger eyes", "judy blume tiger"] },
  { id: "to-kill-a-mockingbird", title: "To Kill a Mockingbird", aliases: ["to kill a mockingbird", "harper lee mockingbird"] },
  { id: "the-fault-in-our-stars", title: "The Fault in Our Stars", aliases: ["the fault in our stars", "john green fault"] },
  { id: "the-girl-with-the-dragon-tattoo", title: "The Girl with the Dragon Tattoo", aliases: ["girl with the dragon tattoo", "stieg larsson dragon tattoo"] },
  { id: "the-kite-runner", title: "The Kite Runner", aliases: ["the kite runner", "khaled hosseini kite"] },
  { id: "the-odyssey", title: "The Odyssey", aliases: ["the odyssey", "homer odyssey"] },
  { id: "brief-history-modern-india", title: "A Brief History of Modern India", aliases: ["a brief history of modern india", "brief history modern india", "spectrum modern india", "spectrum book"] },
  { id: "the-book-thief", title: "The Book Thief", aliases: ["the book thief", "markus zusak book thief"] },
  { id: "the-diary-of-a-young-girl", title: "The Diary of a Young Girl", aliases: ["diary of a young girl", "anne frank diary"] },
  { id: "history-of-medieval-india", title: "History of Medieval India", aliases: ["history of medieval india", "satish chandra medieval"] },
  { id: "sita-warrior-of-mithila", title: "Sita: Warrior of Mithila", aliases: ["sita warrior of mithila", "amish sita"] },
  { id: "sapiens", title: "Sapiens", aliases: ["sapiens", "sapiens a brief history of humankind", "yuval noah harari sapiens"] },
  { id: "rich-dad-poor-dad", title: "Rich Dad Poor Dad", aliases: ["rich dad poor dad", "kiyosaki rich dad"] },
  { id: "ancient-india-rs-sharma", title: "Ancient India", aliases: ["ancient india", "rs sharma ancient india", "r s sharma ancient india", "rs sharma ancient history", "rs sharma ancient history old ncert", "old ncert rs sharma"] },
  { id: "pride-and-prejudice-illustrated", title: "Pride and Prejudice", aliases: ["pride and prejudice", "jane austen pride"] },
  { id: "pinnacle-ssc-reasoning-8th-edition", title: "Pinnacle SSC Reasoning", aliases: ["pinnacle ssc reasoning", "pinnacle ssc reasoning 8th edition", "ssc reasoning pinnacle"] },
  { id: "a-gentleman-in-moscow", title: "A Gentleman in Moscow", aliases: ["a gentleman in moscow", "amor towles gentleman"] },
  { id: "a-thousand-splendid-suns", title: "A Thousand Splendid Suns", aliases: ["a thousand splendid suns", "khaled hosseini thousand splendid"] },
  { id: "srimad-bhagavad-gita-hindi", title: "Shrimad Bhagavad Gita", aliases: ["srimad bhagavad gita", "shrimad bhagavad gita", "bhagavad gita hindi", "भगवद गीता", "श्रीमद्भगवद्गीता"] },
  { id: "modern-india-bipan-chandra", title: "Modern India by Bipan Chandra", aliases: ["modern india bipan chandra", "bipan chandra modern india", "bipin chandra modern india", "bipin chandra modern history", "bipan chandra modern history", "modern india old ncert"] },
  { id: "dharmayoddha-kalki-avatar-of-vishnu", title: "Dharmayoddha Kalki", aliases: ["dharmayoddha kalki", "kalki avatar of vishnu", "kevin missal kalki"] },
  { id: "a-brief-history-of-time", title: "A Brief History of Time", aliases: ["a brief history of time", "brief history of time hawking"] },
  { id: "12th-fail-hindi", title: "12th Fail", aliases: ["12th fail", "twelfth fail", "12 fail", "ट्वेल्थ फेल"] },
] as const;

const UPLOAD_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-upload";
const AVAILABILITY_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-availability";
const CHUNK_SIZE = 6 * 1024 * 1024;
const SAFE_MATCH = 0.72;

type Match = { file: File; bookId: string | null; title: string; confidence: number; state: "queued" | "uploading" | "ready" | "failed" | "unmatched"; progress: number; error?: string };

function prettyBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\.pdf$/i, "").replace(/[_–—-]+/g, " ").replace(/[()\[\]{}.,:;!'\"|]/g, " ").replace(/\b(ebook|pdf|book|final|copy|edition|ed|download|complete|latest|new)\b/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(value: string) {
  return new Set(normalize(value).split(" ").filter((token) => token.length > 2));
}

function similarity(a: string, b: string) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return 0;
  if (na.includes(nb) || nb.includes(na)) return Math.min(1, 0.82 + Math.min(na.length, nb.length) / Math.max(na.length, nb.length) * 0.18);
  const ta = tokens(na);
  const tb = tokens(nb);
  let intersection = 0;
  ta.forEach((token) => { if (tb.has(token)) intersection += 1; });
  const union = new Set([...ta, ...tb]).size;
  return union ? intersection / union : 0;
}

function matchBook(file: File) {
  let best = { bookId: null as string | null, title: "Unmatched", confidence: 0 };
  for (const book of BOOKS) {
    const score = Math.max(...[book.title, ...book.aliases].map((candidate) => similarity(file.name, candidate)));
    if (score > best.confidence) best = { bookId: book.id, title: book.title, confidence: score };
  }
  return best.confidence >= SAFE_MATCH ? best : { bookId: null, title: "Unmatched", confidence: best.confidence };
}

function buildMatches(files: File[]): Match[] {
  const raw: Match[] = files.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")).map((file) => {
    const match = matchBook(file);
    return { file, ...match, state: match.bookId ? "queued" : "unmatched", progress: 0 };
  });

  const winners = new Map<string, number>();
  raw.forEach((item, index) => {
    if (!item.bookId) return;
    const previous = winners.get(item.bookId);
    if (previous === undefined || raw[previous].confidence < item.confidence) winners.set(item.bookId, index);
  });

  return raw.map((item, index) => {
    if (!item.bookId) return item;
    if (winners.get(item.bookId) === index) return item;
    return { ...item, bookId: null, state: "unmatched", error: `Duplicate catalog match. Another PDF matched ${item.title} more confidently, so this file was blocked.` };
  });
}

export default function OwnerDeliveryPage() {
  const [setupCode, setSetupCode] = useState("");
  const [items, setItems] = useState<Match[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [readyIds, setReadyIds] = useState<string[]>([]);
  const [status, setStatus] = useState("Drop all your ebook PDFs here. I will identify the books and connect them automatically.");

  const matched = useMemo(() => items.filter((item) => item.bookId), [items]);
  const unmatched = useMemo(() => items.filter((item) => !item.bookId), [items]);

  useEffect(() => {
    fetch(AVAILABILITY_ENDPOINT, { cache: "no-store" }).then((response) => response.json()).then((data) => setReadyIds(Array.isArray(data.readyBookIds) ? data.readyBookIds : [])).catch(() => undefined);
  }, []);

  function addFiles(files: File[]) {
    const next = buildMatches(files);
    setItems(next);
    const autoMatched = next.filter((item) => item.bookId).length;
    const notMatched = next.length - autoMatched;
    setStatus(notMatched ? `${autoMatched} PDFs matched safely. ${notMatched} were blocked from automatic publishing because the match was uncertain or duplicated.` : `${autoMatched} PDFs matched safely. Ready to sync.`);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  function patchItem(index: number, patch: Partial<Match>) {
    setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  async function uploadOne(item: Match, index: number) {
    if (!item.bookId) return;
    const uploadId = crypto.randomUUID();
    const totalParts = Math.ceil(item.file.size / CHUNK_SIZE);
    patchItem(index, { state: "uploading", progress: 0, error: undefined });
    for (let partIndex = 0; partIndex < totalParts; partIndex += 1) {
      const start = partIndex * CHUNK_SIZE;
      const end = Math.min(item.file.size, start + CHUNK_SIZE);
      const body = new FormData();
      body.append("setupCode", setupCode);
      body.append("bookId", item.bookId);
      body.append("uploadId", uploadId);
      body.append("partIndex", String(partIndex));
      body.append("totalParts", String(totalParts));
      body.append("originalFilename", item.file.name);
      body.append("totalSize", String(item.file.size));
      body.append("chunk", item.file.slice(start, end, "application/pdf"), `${item.bookId}-${partIndex}.part`);
      const response = await fetch(UPLOAD_ENDPOINT, { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || `Upload failed on part ${partIndex + 1}`);
      patchItem(index, { progress: Math.round(((partIndex + 1) / totalParts) * 100) });
    }
    patchItem(index, { state: "ready", progress: 100 });
    setReadyIds((current) => Array.from(new Set([...current, item.bookId!])));
  }

  async function syncLibrary(event: FormEvent) {
    event.preventDefault();
    if (!setupCode) return setStatus("Enter the owner setup code once, then sync the whole library.");
    if (!matched.length) return setStatus("Add PDFs first. No safe catalog matches are ready to upload.");
    setBusy(true);
    let succeeded = 0;
    let failed = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (!item.bookId) continue;
      setStatus(`Auto-syncing ${item.title} (${succeeded + failed + 1} of ${matched.length})...`);
      try { await uploadOne(item, index); succeeded += 1; }
      catch (error) { failed += 1; patchItem(index, { state: "failed", error: error instanceof Error ? error.message : "Upload failed" }); }
    }
    setBusy(false);
    setStatus(failed ? `${succeeded} books are ready for sale. ${failed} failed and can be retried.` : `Library sync complete. ${succeeded} books are securely attached and enabled for sale.`);
  }

  return <main className="min-h-screen bg-[#F7F9FC] px-4 py-10 text-[#1F2937]">
    <div className="mx-auto max-w-4xl rounded-3xl border border-[#DDE5EE] bg-white p-6 shadow-[0_20px_60px_rgba(11,45,91,.08)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#A86106]">Owner automation</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B]">Automatic ebook library sync</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#66768A]">Add all PDFs together. Only high-confidence, one-to-one catalog matches are auto-published. Uncertain or duplicate matches are blocked instead of risking the wrong ebook being delivered.</p>
      <form onSubmit={syncLibrary} className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Owner setup code<input type="password" value={setupCode} onChange={(e) => setSetupCode(e.target.value)} disabled={busy} autoComplete="off" placeholder="Enter once for this sync" className="min-h-12 rounded-xl border border-[#CBD5E1] px-3 outline-none focus:border-[#F59E0B] disabled:opacity-60" /></label>
        <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`rounded-2xl border-2 border-dashed p-7 text-center transition ${dragging ? "border-[#F59E0B] bg-[#FFF8E8]" : "border-[#B8C5D4] bg-[#F8FAFC]"}`}>
          <p className="text-base font-bold text-[#0B2D5B]">Drop all ebook PDFs here</p><p className="mt-1 text-xs leading-5 text-[#708095]">or choose many PDFs together. Large files are handled automatically.</p>
          <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#0B2D5B] px-5 py-3 text-sm font-bold text-white">Choose PDFs<input type="file" accept="application/pdf,.pdf" multiple disabled={busy} onChange={(e) => addFiles(Array.from(e.target.files || []))} className="hidden" /></label>
        </div>
        {items.length ? <div className="grid gap-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-bold text-[#0B2D5B]">{matched.length} safe matches · {unmatched.length} blocked/unmatched · {readyIds.length} currently ready</p><button type="button" onClick={() => setItems([])} disabled={busy} className="text-xs font-bold text-[#66768A] underline disabled:opacity-50">Clear batch</button></div><div className="max-h-[430px] overflow-auto rounded-2xl border border-[#E1E8F0]">{items.map((item, index) => <div key={`${item.file.name}-${index}`} className="grid gap-2 border-b border-[#EEF2F6] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"><div className="min-w-0"><p className="truncate text-sm font-semibold text-[#24364B]">{item.file.name}</p><p className="mt-1 text-xs text-[#708095]">{item.bookId ? `→ ${item.title} · ${Math.round(item.confidence * 100)}% match · ${prettyBytes(item.file.size)}` : item.error || "Could not match safely. Rename the PDF closer to the catalog title and add it again."}</p>{item.state === "uploading" ? <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EEF5]"><div className="h-full rounded-full bg-[#F59E0B] transition-all" style={{ width: `${item.progress}%` }} /></div> : null}</div><span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.state === "ready" ? "bg-[#E9F8F0] text-[#13704F]" : item.state === "failed" || item.state === "unmatched" ? "bg-[#FFF0F0] text-[#A33A3A]" : item.state === "uploading" ? "bg-[#FFF4D9] text-[#8A5B00]" : "bg-[#EEF3F8] text-[#53677C]"}`}>{item.state === "uploading" ? `${item.progress}%` : item.state}</span></div>)}</div></div> : null}
        <button disabled={busy || !matched.length} className="min-h-14 rounded-xl bg-[#F59E0B] px-5 py-4 text-base font-bold text-[#0B2D5B] shadow-[0_10px_26px_rgba(245,158,11,.20)] disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Auto-syncing library..." : matched.length ? `Sync ${matched.length} safe matches automatically` : "Add PDFs to start"}</button>
      </form>
      <div className="mt-5 rounded-xl border border-[#DDE5EE] bg-[#F8FAFC] p-4 text-sm font-medium leading-6 text-[#44556A]">{status}</div>
    </div>
  </main>;
}
