import { Book, Category, Subcategory, books, categories, subcategories } from "@/data/catalog";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabase() {
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
  return books.filter((book) => book.active !== false);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  return books.find((book) => book.slug === slug && book.active !== false) || null;
}

export async function getBookById(id: string): Promise<Book | null> {
  return books.find((book) => book.id === id && book.active !== false) || null;
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getSubcategories(): Promise<Subcategory[]> {
  return subcategories;
}

export async function getBooksByCategory(slug: string): Promise<Book[]> {
  return books.filter((book) => book.active !== false && book.category_slug === slug);
}

export async function createOrderRecord(value: Record<string, unknown>) {
  if (!hasSupabase()) return null;
  return dbFetch("orders", { method: "POST", body: JSON.stringify(value) });
}

export async function markOrderPaid(razorpayOrderId: string, paymentId: string) {
  if (!hasSupabase()) return null;
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
