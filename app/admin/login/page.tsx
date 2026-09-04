"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const body = await res.json(); setLoading(false);
    if (!res.ok) return setError(body.error || "Login failed");
    router.push("/admin"); router.refresh();
  }
  return <main className="grid min-h-screen place-items-center bg-[#171717] px-6"><div className="w-full max-w-md rounded-[32px] bg-[#fffdf7] p-8 shadow-2xl"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300"><BookOpen size={20} /></span><div><h1 className="text-2xl font-black">eBookies Admin</h1><p className="text-sm text-stone-500">Owner command center</p></div></div><form onSubmit={submit} className="mt-8"><label className="text-sm font-bold">Admin password</label><div className="mt-2 flex items-center gap-2 rounded-2xl border border-stone-300 bg-white px-4"><LockKeyhole size={17} className="text-stone-400"/><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full py-3 outline-none" autoFocus /></div>{error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}<button disabled={loading} className="mt-5 w-full rounded-2xl bg-[#171717] px-5 py-3 font-black text-white disabled:opacity-50">{loading ? "Checking..." : "Enter command center"}</button></form></div></main>;
}
