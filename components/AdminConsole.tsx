"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book, Category, Subcategory } from "@/data/catalog";
import { BookPlus, FolderPlus, LogOut, Pencil, Trash2, UploadCloud } from "lucide-react";

type Catalog = { books: Book[]; categories: Category[]; subcategories: Subcategory[]; configured: boolean };

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminConsole({ initial }: { initial: Catalog }) {
  const router = useRouter();
  const [catalog, setCatalog] = useState(initial);
  const [tab, setTab] = useState<"books" | "categories" | "subcategories">("books");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const subcatsByCategory = useMemo(() => {
    const map = new Map<string, Subcategory[]>();
    for (const item of catalog.subcategories) map.set(item.category_id, [...(map.get(item.category_id) || []), item]);
    return map;
  }, [catalog.subcategories]);

  async function refresh() {
    const res = await fetch("/api/admin/catalog");
    if (res.ok) setCatalog(await res.json());
  }

  async function mutate(body: Record<string, unknown>) {
    setBusy(true); setNotice("");
    const res = await fetch("/api/admin/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json(); setBusy(false);
    if (!res.ok) return setNotice(data.error || "Action failed");
    setNotice("Saved"); await refresh(); router.refresh();
  }

  async function remove(table: string, id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await mutate({ action: "delete", table, id });
  }

  async function upload(file: File, kind: "cover" | "ebook") {
    const form = new FormData(); form.append("file", file); form.append("kind", kind);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json(); if (!res.ok) throw new Error(data.error || "Upload failed"); return data.value as string;
  }

  async function saveBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const fd = new FormData(event.currentTarget);
      let cover_url = String(fd.get("cover_url") || editingBook?.cover_url || "");
      let file_path = String(fd.get("file_path") || editingBook?.file_path || "");
      const cover = fd.get("cover_file"); const ebook = fd.get("ebook_file");
      if (cover instanceof File && cover.size) cover_url = await upload(cover, "cover");
      if (ebook instanceof File && ebook.size) file_path = await upload(ebook, "ebook");
      const value = {
        title: String(fd.get("title")), slug: slugify(String(fd.get("slug") || fd.get("title"))), author: String(fd.get("author")),
        subtitle: String(fd.get("subtitle") || ""), description: String(fd.get("description") || ""), price: Number(fd.get("price")),
        original_price: fd.get("original_price") ? Number(fd.get("original_price")) : null, cover_url, file_path: file_path || null,
        category_slug: String(fd.get("category_slug")), subcategory_slug: String(fd.get("subcategory_slug") || "") || null,
        badge: String(fd.get("badge") || ""), language: String(fd.get("language") || "English"), format: "PDF",
        featured: fd.get("featured") === "on", active: fd.get("active") === "on"
      };
      const res = await fetch("/api/admin/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: editingBook ? "update" : "create", table: "books", id: editingBook?.id, value }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "Could not save book");
      setEditingBook(null); setNotice("Book saved"); await refresh(); router.refresh();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save book"); }
    setBusy(false);
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }

  return <div className="min-h-screen bg-[#f6f3eb] text-stone-900">
    <header className="border-b border-stone-200 bg-[#171717] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><div><div className="text-2xl font-black">eBookies Command Center</div><div className="text-xs text-stone-400">Books · categories · files · publishing</div></div><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-bold"><LogOut size={16}/> Logout</button></div></header>
    <div className="mx-auto max-w-7xl px-6 py-8">
      {!catalog.configured ? <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">Supabase is not configured yet. The storefront is showing fallback sample data. Add the environment variables and run <code>supabase/schema.sql</code> to enable persistent admin changes.</div> : null}
      <div className="mb-6 flex flex-wrap gap-2">{(["books","categories","subcategories"] as const).map((item)=><button key={item} onClick={()=>setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-black capitalize ${tab===item?"bg-[#171717] text-white":"border border-stone-200 bg-white"}`}>{item}</button>)}</div>
      {notice ? <div className="mb-5 rounded-xl bg-white px-4 py-3 text-sm font-bold shadow-sm">{notice}</div> : null}

      {tab === "books" ? <div className="grid gap-7 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={saveBook} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2"><BookPlus size={20}/><h2 className="text-xl font-black">{editingBook ? "Edit book" : "Add book"}</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="title" label="Title" defaultValue={editingBook?.title} required/><Field name="slug" label="Slug (optional)" defaultValue={editingBook?.slug}/><Field name="author" label="Author" defaultValue={editingBook?.author} required/><Field name="subtitle" label="Subtitle" defaultValue={editingBook?.subtitle || ""}/>
            <Field name="price" label="Price ₹" type="number" defaultValue={editingBook?.price} required/><Field name="original_price" label="Original price ₹" type="number" defaultValue={editingBook?.original_price || ""}/>
            <label className="text-sm font-bold">Category<select name="category_slug" defaultValue={editingBook?.category_slug || catalog.categories[0]?.slug} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3">{catalog.categories.map(c=><option key={c.id} value={c.slug}>{c.name}</option>)}</select></label>
            <label className="text-sm font-bold">Subcategory<select name="subcategory_slug" defaultValue={editingBook?.subcategory_slug || ""} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3"><option value="">None</option>{catalog.subcategories.map(s=><option key={s.id} value={s.slug}>{s.name}</option>)}</select></label>
            <Field name="badge" label="Badge" defaultValue={editingBook?.badge || ""}/><Field name="language" label="Language" defaultValue={editingBook?.language || "English"}/>
            <Field name="cover_url" label="Cover URL (or upload below)" defaultValue={editingBook?.cover_url || ""}/><Field name="file_path" label="Existing private ebook path" defaultValue={editingBook?.file_path || ""}/>
          </div>
          <label className="mt-4 block text-sm font-bold">Description<textarea name="description" defaultValue={editingBook?.description} rows={4} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" required/></label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="rounded-xl border border-dashed border-stone-300 p-4 text-sm font-bold"><span className="flex items-center gap-2"><UploadCloud size={16}/> Upload cover</span><input name="cover_file" type="file" accept="image/*" className="mt-2 block w-full text-xs"/></label><label className="rounded-xl border border-dashed border-stone-300 p-4 text-sm font-bold"><span className="flex items-center gap-2"><UploadCloud size={16}/> Upload ebook</span><input name="ebook_file" type="file" accept="application/pdf,.epub" className="mt-2 block w-full text-xs"/></label></div>
          <div className="mt-4 flex gap-5 text-sm font-bold"><label><input name="featured" type="checkbox" defaultChecked={editingBook?.featured}/> Featured</label><label><input name="active" type="checkbox" defaultChecked={editingBook ? editingBook.active !== false : true}/> Published</label></div>
          <div className="mt-5 flex gap-2"><button disabled={busy || !catalog.configured} className="rounded-xl bg-[#171717] px-5 py-3 font-black text-white disabled:opacity-40">{busy ? "Saving..." : "Save book"}</button>{editingBook ? <button type="button" onClick={()=>setEditingBook(null)} className="rounded-xl border border-stone-300 px-5 py-3 font-black">Cancel</button> : null}</div>
        </form>
        <div className="space-y-3">{catalog.books.map(book=><div key={book.id} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4"><img src={book.cover_url} alt="" className="h-20 w-14 rounded object-cover bg-stone-100"/><div className="min-w-0 flex-1"><div className="truncate font-black">{book.title}</div><div className="text-sm text-stone-500">{book.author} · ₹{book.price} · {book.active===false?"Draft":"Published"}</div></div><button onClick={()=>setEditingBook(book)} className="rounded-lg border border-stone-200 p-2"><Pencil size={16}/></button><button onClick={()=>remove("books",book.id)} className="rounded-lg border border-red-200 p-2 text-red-600"><Trash2 size={16}/></button></div>)}</div>
      </div> : null}

      {tab === "categories" ? <SimpleManager title="Categories" icon={<FolderPlus size={20}/>} items={catalog.categories} configured={catalog.configured} busy={busy} onCreate={(name,description)=>mutate({action:"create",table:"categories",value:{name,slug:slugify(name),description}})} onDelete={(id)=>remove("categories",id)} /> : null}
      {tab === "subcategories" ? <section className="rounded-[28px] border border-stone-200 bg-white p-6"><h2 className="text-xl font-black">Subcategories</h2><form className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(e)=>{e.preventDefault();const fd=new FormData(e.currentTarget);const name=String(fd.get("name"));const category_id=String(fd.get("category_id"));mutate({action:"create",table:"subcategories",value:{name,slug:slugify(name),category_id}});e.currentTarget.reset();}}><input name="name" placeholder="Subcategory name" className="rounded-xl border border-stone-300 px-3 py-3" required/><select name="category_id" className="rounded-xl border border-stone-300 px-3 py-3">{catalog.categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><button disabled={!catalog.configured || busy} className="rounded-xl bg-[#171717] px-5 py-3 font-black text-white disabled:opacity-40">Add</button></form><div className="mt-5 grid gap-2">{catalog.subcategories.map(item=><div key={item.id} className="flex items-center justify-between rounded-xl border border-stone-200 p-3"><div><b>{item.name}</b><span className="ml-2 text-xs text-stone-400">{catalog.categories.find(c=>c.id===item.category_id)?.name}</span></div><button onClick={()=>remove("subcategories",item.id)} className="text-red-600"><Trash2 size={16}/></button></div>)}</div></section> : null}
    </div>
  </div>;
}

function Field(props: {name:string;label:string;type?:string;defaultValue?:string|number|null;required?:boolean}) { return <label className="text-sm font-bold">{props.label}<input {...props} defaultValue={props.defaultValue ?? ""} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3"/></label>; }

function SimpleManager({title,icon,items,configured,busy,onCreate,onDelete}:{title:string;icon:React.ReactNode;items:Category[];configured:boolean;busy:boolean;onCreate:(name:string,description:string)=>void;onDelete:(id:string)=>void}) { return <section className="rounded-[28px] border border-stone-200 bg-white p-6"><div className="flex items-center gap-2">{icon}<h2 className="text-xl font-black">{title}</h2></div><form className="mt-5 grid gap-3 sm:grid-cols-[1fr_1.5fr_auto]" onSubmit={(e)=>{e.preventDefault();const fd=new FormData(e.currentTarget);onCreate(String(fd.get("name")),String(fd.get("description")||""));e.currentTarget.reset();}}><input name="name" placeholder="Name" className="rounded-xl border border-stone-300 px-3 py-3" required/><input name="description" placeholder="Description" className="rounded-xl border border-stone-300 px-3 py-3"/><button disabled={!configured||busy} className="rounded-xl bg-[#171717] px-5 py-3 font-black text-white disabled:opacity-40">Add</button></form><div className="mt-5 grid gap-2">{items.map(item=><div key={item.id} className="flex items-center justify-between rounded-xl border border-stone-200 p-3"><div><b>{item.name}</b><div className="text-xs text-stone-400">/{item.slug}</div></div><button onClick={()=>onDelete(item.id)} className="text-red-600"><Trash2 size={16}/></button></div>)}</div></section>; }
