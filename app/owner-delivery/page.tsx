"use client";

import { DragEvent, FormEvent, useEffect, useMemo, useState } from "react";

const KNOWN_BOOKS = [
  ["indian-polity","Indian Polity",["indian polity","laxmikanth polity"],false],
  ["wings-of-fire","Wings of Fire",["wings of fire","apj abdul kalam"],false],
  ["the-plague","The Plague",["the plague"],false],
  ["the-theory-of-everything","The Theory of Everything",["the theory of everything"],false],
  ["think-and-grow-rich","Think and Grow Rich",["think and grow rich"],false],
  ["tiger-eyes","Tiger Eyes",["tiger eyes"],false],
  ["to-kill-a-mockingbird","To Kill a Mockingbird",["to kill a mockingbird"],false],
  ["the-fault-in-our-stars","The Fault in Our Stars",["the fault in our stars"],false],
  ["the-girl-with-the-dragon-tattoo","The Girl with the Dragon Tattoo",["girl with the dragon tattoo"],false],
  ["the-kite-runner","The Kite Runner",["the kite runner"],false],
  ["the-odyssey","The Odyssey",["the odyssey"],false],
  ["brief-history-modern-india","A Brief History of Modern India",["brief history modern india","spectrum book","spectrum modern india"],false],
  ["the-book-thief","The Book Thief",["the book thief"],false],
  ["the-diary-of-a-young-girl","The Diary of a Young Girl",["diary of a young girl","anne frank diary"],false],
  ["history-of-medieval-india","History of Medieval India",["history of medieval india","satish chandra medieval"],false],
  ["sita-warrior-of-mithila","Sita: Warrior of Mithila",["sita warrior of mithila"],false],
  ["sapiens","Sapiens",["sapiens","sapiens a brief history of humankind"],false],
  ["rich-dad-poor-dad","Rich Dad Poor Dad",["rich dad poor dad"],false],
  ["ancient-india-rs-sharma","Ancient India",["rs sharma ancient history","rs sharma ancient history old ncert","ancient india"],false],
  ["pride-and-prejudice-illustrated","Pride and Prejudice",["pride and prejudice"],false],
  ["pinnacle-ssc-reasoning-8th-edition","Pinnacle SSC Reasoning",["pinnacle ssc reasoning 8th edition","pinnacle ssc reasoning"],false],
  ["a-gentleman-in-moscow","A Gentleman in Moscow",["a gentleman in moscow"],false],
  ["a-thousand-splendid-suns","A Thousand Splendid Suns",["a thousand splendid suns"],false],
  ["srimad-bhagavad-gita-hindi","Shrimad Bhagavad Gita",["bhagavad gita hindi","bhagavad gita"],false],
  ["modern-india-bipan-chandra","Modern India by Bipan Chandra",["bipan chandra modern history","bipin chandra modern history","bipan chandra modern india","bipin chandra modern india"],false],
  ["dharmayoddha-kalki-avatar-of-vishnu","Dharmayoddha Kalki",["dharmayoddha kalki","kalki avatar of vishnu"],false],
  ["a-brief-history-of-time","A Brief History of Time",["a brief history of time"],false],
  ["12th-fail-hindi","12th Fail",["12th fail","12th fail hindi"],false],
  ["pinnacle-ssc-general-studies-8th-edition","Pinnacle SSC General Studies",["pinnacle ssc general studies gs 8th edition","pinnacle ssc general studies"],true],
  ["pinnacle-ssc-maths-8th-edition","Pinnacle SSC Maths",["pinnacle ssc maths 8th edition","pinnacle ssc maths"],true],
  ["dream-with-your-eyes-open","Dream With Your Eyes Open",["dream with your eyes open"],true],
  ["ikigai","Ikigai",["ikigai the japanese secret to a long and happy life","ikigai"],true],
  ["india-that-is-bharat","India, That Is Bharat",["india that is bharat by j sai deepak","india that is bharat"],true],
  ["midnights-children","Midnight's Children",["midnight's children","midnights children"],true],
  ["pinnacle-ssc-english-8th-edition","Pinnacle SSC English",["pinnacle ssc english 8th edition","pinnacle ssc english"],true],
] as const;

const UPLOAD_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-upload";
const AVAILABILITY_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-availability";
const ADMIN_ENDPOINT = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-catalog-admin";
const CHUNK_SIZE = 6 * 1024 * 1024;
const SAFE_MATCH = 0.72;

type ItemState = "queued" | "already" | "uploading" | "needs-cover" | "published" | "failed" | "new-draft";
type Item = { file: File; bookId: string | null; title: string; confidence: number; dynamic: boolean; state: ItemState; progress: number; error?: string; coverUrl?: string };

function prettyBytes(bytes: number) { return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }
function normalize(value: string) { return value.toLowerCase().replace(/\.pdf$/i, "").replace(/[_–—-]+/g," ").replace(/[()\[\]{}.,:;!'\"|]/g," ").replace(/\b(ebook|pdf|book|final|copy|edition|ed|download|complete|latest|new)\b/g," ").replace(/\s+/g," ").trim(); }
function titleFromFilename(name: string) { return name.replace(/\.pdf$/i, "").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/\b\w/g,(c)=>c.toUpperCase()); }
function tokens(v: string) { return new Set(normalize(v).split(" ").filter((t)=>t.length>2)); }
function similarity(a: string,b: string) {
  const na=normalize(a), nb=normalize(b); if(!na||!nb) return 0;
  if(na.includes(nb)||nb.includes(na)) return Math.min(1,0.82+Math.min(na.length,nb.length)/Math.max(na.length,nb.length)*0.18);
  const ta=tokens(na), tb=tokens(nb); let hit=0; ta.forEach((t)=>{ if(tb.has(t)) hit+=1; }); const union=new Set([...ta,...tb]).size; return union?hit/union:0;
}
function matchKnown(file: File) {
  let best:{bookId:string|null;title:string;confidence:number;dynamic:boolean}={bookId:null,title:titleFromFilename(file.name),confidence:0,dynamic:true};
  for(const [id,title,aliases,dynamic] of KNOWN_BOOKS){ const score=Math.max(...[title,...aliases].map((c)=>similarity(file.name,c))); if(score>best.confidence) best={bookId:id,title,confidence:score,dynamic}; }
  return best.confidence>=SAFE_MATCH?best:{bookId:null,title:titleFromFilename(file.name),confidence:best.confidence,dynamic:true};
}

export default function OwnerDeliveryPage(){
  const [setupCode,setSetupCode]=useState("");
  const [items,setItems]=useState<Item[]>([]);
  const [readyIds,setReadyIds]=useState<string[]>([]);
  const [busy,setBusy]=useState(false);
  const [dragging,setDragging]=useState(false);
  const [status,setStatus]=useState("Drop your ebook PDFs. Existing uploads are skipped automatically; new titles become draft listings and ask for a cover photo.");

  async function refreshReady(){
    try{ const r=await fetch(AVAILABILITY_ENDPOINT,{cache:"no-store"}); const d=await r.json(); setReadyIds(Array.isArray(d.readyBookIds)?d.readyBookIds:[]); }catch{}
  }
  useEffect(()=>{ refreshReady(); },[]);
  useEffect(()=>{ if(!readyIds.length||!items.length) return; setItems((current)=>current.map((item)=>item.bookId&&readyIds.includes(item.bookId)&&item.state==="queued"?{...item,state:item.dynamic?"needs-cover":"already",progress:100}:item)); },[readyIds]);

  function addFiles(files: File[]){
    const pdfs=files.filter((f)=>f.type==="application/pdf"||f.name.toLowerCase().endsWith(".pdf"));
    const raw=pdfs.map((file)=>{ const m=matchKnown(file); const exists=Boolean(m.bookId&&readyIds.includes(m.bookId)); return {file,...m,state:exists?(m.dynamic?"needs-cover":"already"):(m.bookId?"queued":"new-draft"),progress:exists?100:0} as Item; });
    const winners=new Map<string,number>(); raw.forEach((item,i)=>{ if(!item.bookId||item.state==="already"||item.state==="needs-cover") return; const p=winners.get(item.bookId); if(p===undefined||raw[p].confidence<item.confidence) winners.set(item.bookId,i); });
    const next=raw.map((item,i)=>item.bookId&&winners.has(item.bookId)&&winners.get(item.bookId)!==i?{...item,bookId:null,state:"new-draft" as ItemState,title:titleFromFilename(item.file.name),dynamic:true,error:"Duplicate candidate blocked from replacing another catalog title."}:item);
    setItems(next);
    const skipped=next.filter((x)=>x.state==="already").length; const fresh=next.filter((x)=>x.state==="new-draft").length; const queued=next.filter((x)=>x.state==="queued").length;
    setStatus(`${skipped} already uploaded and skipped. ${queued} listed books need files. ${fresh} new titles will become draft listings.`);
  }
  function onDrop(e:DragEvent<HTMLDivElement>){ e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }
  function patch(index:number,change:Partial<Item>){ setItems((cur)=>cur.map((x,i)=>i===index?{...x,...change}:x)); }

  async function ensureDraft(item:Item,index:number){
    if(item.bookId) return item.bookId;
    const r=await fetch(ADMIN_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({setupCode,action:"ensureDraft",filename:item.file.name,title:item.title,price:50})});
    const d=await r.json(); if(!r.ok||!d.ok) throw new Error(d.error||"Could not create draft listing");
    patch(index,{bookId:d.book.id,title:d.book.title,dynamic:true}); return d.book.id as string;
  }

  async function uploadPdf(item:Item,index:number,bookId:string){
    const uploadId=crypto.randomUUID(); const totalParts=Math.ceil(item.file.size/CHUNK_SIZE); patch(index,{state:"uploading",progress:0,error:undefined});
    for(let partIndex=0;partIndex<totalParts;partIndex+=1){
      const start=partIndex*CHUNK_SIZE,end=Math.min(item.file.size,start+CHUNK_SIZE); const body=new FormData();
      body.append("setupCode",setupCode); body.append("bookId",bookId); body.append("uploadId",uploadId); body.append("partIndex",String(partIndex)); body.append("totalParts",String(totalParts)); body.append("originalFilename",item.file.name); body.append("totalSize",String(item.file.size)); body.append("chunk",item.file.slice(start,end,"application/pdf"),`${bookId}-${partIndex}.part`);
      const r=await fetch(UPLOAD_ENDPOINT,{method:"POST",body}); const d=await r.json().catch(()=>({})); if(!r.ok||!d.ok) throw new Error(d.error||`Upload failed on part ${partIndex+1}`); patch(index,{progress:Math.round(((partIndex+1)/totalParts)*100)});
    }
    patch(index,{state:item.dynamic?"needs-cover":"published",progress:100}); setReadyIds((cur)=>Array.from(new Set([...cur,bookId])));
  }

  async function syncLibrary(e:FormEvent){
    e.preventDefault(); if(!setupCode) return setStatus("Enter the owner setup code first.");
    const todo=items.filter((x)=>x.state==="queued"||x.state==="new-draft"); if(!todo.length) return setStatus("Nothing to re-upload. Existing books were skipped. Add covers for new listings if needed.");
    setBusy(true); let uploaded=0,failed=0,skipped=items.filter((x)=>x.state==="already").length;
    for(let i=0;i<items.length;i+=1){ const item=items[i]; if(item.state!=="queued"&&item.state!=="new-draft") continue; try{ setStatus(`Processing ${item.title}...`); const id=await ensureDraft(item,i); await uploadPdf({...item,bookId:id,dynamic:item.dynamic||!item.bookId},i,id); uploaded+=1; }catch(err){ failed+=1; patch(i,{state:"failed",error:err instanceof Error?err.message:"Upload failed"}); } }
    setBusy(false); setStatus(`${skipped} existing uploads skipped. ${uploaded} PDFs attached. ${failed} failed. New listings now need cover photos before publishing.`); await refreshReady();
  }

  async function uploadCover(index:number,file:File){
    const item=items[index]; if(!item.bookId||!setupCode) return; try{ patch(index,{error:undefined}); const body=new FormData(); body.append("setupCode",setupCode); body.append("action","uploadCover"); body.append("bookId",item.bookId); body.append("file",file,file.name); const r=await fetch(ADMIN_ENDPOINT,{method:"POST",body}); const d=await r.json(); if(!r.ok||!d.ok) throw new Error(d.error||"Cover upload failed"); patch(index,{coverUrl:d.coverUrl}); setStatus(`Cover added for ${item.title}. Publish it when ready.`); }catch(err){ patch(index,{error:err instanceof Error?err.message:"Cover upload failed"}); }
  }
  async function publish(index:number){
    const item=items[index]; if(!item.bookId) return; try{ const r=await fetch(ADMIN_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({setupCode,action:"publish",bookId:item.bookId})}); const d=await r.json(); if(!r.ok||!d.ok) throw new Error(d.error||"Publish failed"); patch(index,{state:"published"}); setStatus(`${item.title} is now published on the store.`); }catch(err){ patch(index,{error:err instanceof Error?err.message:"Publish failed"}); }
  }

  const counts=useMemo(()=>({already:items.filter(x=>x.state==="already").length,new:items.filter(x=>x.state==="new-draft"||x.state==="needs-cover").length,todo:items.filter(x=>x.state==="queued"||x.state==="new-draft").length}),[items]);

  return <main className="min-h-screen bg-[#F7F9FC] px-4 py-10 text-[#1F2937]"><div className="mx-auto max-w-5xl rounded-3xl border border-[#DDE5EE] bg-white p-6 shadow-[0_20px_60px_rgba(11,45,91,.08)] sm:p-8">
    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#A86106]">Owner automation</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.03em] text-[#0B2D5B]">Smart ebook ingest</h1>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#66768A]">Drop the library once. Already-uploaded books are skipped. Listed books get their missing PDF. Unknown books become draft listings automatically, then ask you for a cover photo before they can go live.</p>
    <form onSubmit={syncLibrary} className="mt-7 grid gap-5">
      <label className="grid gap-2 text-sm font-semibold text-[#0B2D5B]">Owner setup code<input type="password" value={setupCode} onChange={(e)=>setSetupCode(e.target.value)} disabled={busy} className="min-h-12 rounded-xl border border-[#CBD5E1] px-3 outline-none focus:border-[#F59E0B]" /></label>
      <div onDragOver={(e)=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={onDrop} className={`rounded-2xl border-2 border-dashed p-7 text-center ${dragging?"border-[#F59E0B] bg-[#FFF8E8]":"border-[#B8C5D4] bg-[#F8FAFC]"}`}><p className="font-bold text-[#0B2D5B]">Drop all ebook PDFs here</p><p className="mt-1 text-xs text-[#708095]">Existing files will not be uploaded again.</p><label className="mt-4 inline-flex cursor-pointer rounded-xl bg-[#0B2D5B] px-5 py-3 text-sm font-bold text-white">Choose PDFs<input type="file" accept="application/pdf,.pdf" multiple disabled={busy} onChange={(e)=>addFiles(Array.from(e.target.files||[]))} className="hidden" /></label></div>
      {items.length?<div className="grid gap-3"><p className="text-sm font-bold text-[#0B2D5B]">{counts.already} skipped · {counts.todo} to process · {counts.new} new/cover pending · {readyIds.length} PDFs ready</p><div className="max-h-[560px] overflow-auto rounded-2xl border border-[#E1E8F0]">{items.map((item,index)=><div key={`${item.file.name}-${index}`} className="border-b border-[#EEF2F6] p-4 last:border-0"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#24364B]">{item.file.name}</p><p className="mt-1 text-xs text-[#708095]">{item.bookId?`→ ${item.title} · ${Math.round(item.confidence*100)}% · ${prettyBytes(item.file.size)}`:`New title → ${item.title} · ${prettyBytes(item.file.size)}`}</p>{item.state==="uploading"?<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EEF5]"><div className="h-full bg-[#F59E0B]" style={{width:`${item.progress}%`}} /></div>:null}{item.error?<p className="mt-2 text-xs font-semibold text-red-600">{item.error}</p>:null}</div><span className="rounded-full bg-[#EEF3F8] px-2.5 py-1 text-[10px] font-bold uppercase text-[#53677C]">{item.state}</span></div>
        {item.dynamic&&(item.state==="needs-cover"||item.state==="published")?<div className="mt-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3"><p className="text-xs font-bold text-[#0B2D5B]">{item.state==="published"?"Listing live":"New listing needs a cover photo"}</p>{item.coverUrl?<img src={item.coverUrl} alt="cover preview" className="mt-2 h-32 rounded-lg object-contain" />:null}{item.state!=="published"?<div className="mt-2 flex flex-wrap gap-2"><label className="cursor-pointer rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#0B2D5B]">Upload cover photo<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e)=>{const f=e.target.files?.[0];if(f)uploadCover(index,f)}} /></label><button type="button" onClick={()=>publish(index)} disabled={!item.coverUrl} className="rounded-lg bg-[#F59E0B] px-3 py-2 text-xs font-bold text-[#0B2D5B] disabled:opacity-40">Publish on store</button></div>:null}</div>:null}
      </div>)}</div></div>:null}
      <button disabled={busy||!counts.todo} className="min-h-14 rounded-xl bg-[#F59E0B] px-5 py-4 font-bold text-[#0B2D5B] disabled:opacity-50">{busy?"Processing library...":counts.todo?`Process ${counts.todo} PDFs automatically`:"Nothing new to upload"}</button>
    </form><div className="mt-5 rounded-xl border border-[#DDE5EE] bg-[#F8FAFC] p-4 text-sm font-medium text-[#44556A]">{status}</div>
  </div></main>;
}
