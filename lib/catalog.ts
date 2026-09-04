import { Book, Category, Subcategory, fallbackBooks, fallbackCategories, fallbackSubcategories } from "@/data/catalog";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasDatabase() {
  return Boolean(supabaseUrl && serviceKey);
}

async function dbFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseUrl || !serviceKey) throw new Error("Supabase is not configured");
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(await response.text());
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

export async function getBooks(): Promise<Book[]> {
  if (!hasDatabase()) return fallbackBooks;
  return dbFetch<Book[]>("books?select=*&active=eq.true&order=featured.desc,created_at.desc");
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!hasDatabase()) return fallbackBooks.find((book) => book.slug === slug) || null;
  const books = await dbFetch<Book[]>(`books?select=*&slug=eq.${encodeURIComponent(slug)}&active=eq.true&limit=1`);
  return books[0] || null;
}

export async function getBookById(id: string): Promise<Book | null> {
  if (!hasDatabase()) return fallbackBooks.find((book) => book.id === id) || null;
  const books = await dbFetch<Book[]>(`books?select=*&id=eq.${encodeURIComponent(id)}&active=eq.true&limit=1`);
  return books[0] || null;
}

export async function getCategories(): Promise<Category[]> {
  if (!hasDatabase()) return fallbackCategories;
  return dbFetch<Category[]>("categories?select=*&order=name.asc");
}

export async function getSubcategories(): Promise<Subcategory[]> {
  if (!hasDatabase()) return fallbackSubcategories;
  return dbFetch<Subcategory[]>("subcategories?select=*&order=name.asc");
}

export async function getBooksByCategory(slug: string): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.category_slug === slug);
}

export async function adminListCatalog() {
  if (!hasDatabase()) {
    return { books: fallbackBooks, categories: fallbackCategories, subcategories: fallbackSubcategories, configured: false };
  }
  const [books, categories, subcategories] = await Promise.all([
    dbFetch<Book[]>("books?select=*&order=created_at.desc"),
    dbFetch<Category[]>("categories?select=*&order=name.asc"),
    dbFetch<Subcategory[]>("subcategories?select=*&order=name.asc")
  ]);
  return { books, categories, subcategories, configured: true };
}

export async function adminInsert(table: "books" | "categories" | "subcategories", value: Record<string, unknown>) {
  return dbFetch(`${table}`, { method: "POST", body: JSON.stringify(value) });
}

export async function adminUpdate(table: "books" | "categories" | "subcategories", id: string, value: Record<string, unknown>) {
  return dbFetch(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(value) });
}

export async function adminDelete(table: "books" | "categories" | "subcategories", id: string) {
  return dbFetch(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function createOrderRecord(value: Record<string, unknown>) {
  if (!hasDatabase()) return null;
  return dbFetch("orders", { method: "POST", body: JSON.stringify(value) });
}

export async function markOrderPaid(razorpayOrderId: string, paymentId: string) {
  if (!hasDatabase()) return null;
  return dbFetch(`orders?razorpay_order_id=eq.${encodeURIComponent(razorpayOrderId)}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "paid", razorpay_payment_id: paymentId, paid_at: new Date().toISOString() })
  });
}

export async function createSignedBookUrl(filePath: string) {
  if (!supabaseUrl || !serviceKey) return null;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/sign/ebooks/${filePath}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ expiresIn: 300 })
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  const signed = data.signedURL || data.signedUrl;
  return signed ? `${supabaseUrl}/storage/v1${signed}` : null;
}

export async function uploadToBucket(path: string, file: File, bucket: "covers" | "ebooks") {
  if (!supabaseUrl || !serviceKey) throw new Error("Supabase storage is not configured");
  const bytes = Buffer.from(await file.arrayBuffer());
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true"
    },
    body: bytes
  });
  if (!response.ok) throw new Error(await response.text());
  if (bucket === "covers") return `${supabaseUrl}/storage/v1/object/public/covers/${path}`;
  return path;
}
