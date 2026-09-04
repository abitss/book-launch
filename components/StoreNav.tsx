"use client";

import Link from "next/link";
import { BookOpen, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function StoreNav() {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#171717] text-white"><BookOpen size={20} /></span>
          <div><div className="text-xl font-black tracking-tight">eBookies.store</div><div className="text-[11px] font-semibold uppercase tracking-[.18em] text-stone-500">Read. Own. Repeat.</div></div>
        </Link>
        <form action="/search" className="mx-auto hidden w-full max-w-xl md:block">
          <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-amber-300">
            <Search size={18} className="text-stone-400" />
            <input name="q" value={q} onChange={(e) => setQ(e.target.value)} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Search title, author, category..." />
          </div>
        </form>
        <Link href="/admin" className="ml-auto inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-stone-50"><ShieldCheck size={16} /> <span className="hidden sm:inline">Admin</span></Link>
      </div>
    </header>
  );
}
