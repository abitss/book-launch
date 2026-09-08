import { Book, Category, Subcategory, books, categories, subcategories } from "@/data/catalog";
import { extraBooks, extraCategories, extraSubcategories } from "@/data/catalog-extra";
import { bookOverrides } from "@/data/catalog-overrides";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DELIVERY_BUCKET = "ebookiee-ebooks";
const AVAILABILITY_URL = "https://iasxygnoezjtizjdltag.supabase.co/functions/v1/ebookiee-availability";

const baseBooks: Book[] = [...books, ...extraBooks].map((book) => ({
  ...book,
  ...(bookOverrides[book.id] || {})
}));
const allCategories = [...categories, ...extraCategories];
const allSubcategories = [...subcategories, ...extraSubcategories];

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

type BookFileRow = { book_id: string; storage_path: string };

async function deliveryMap(): Promise<Map<string, string>> {
  if (hasSupabase()) {
    try {
      const rows = await dbFetch<BookFileRow[]>("ebookiee_book_files?select=book_id,storage_path");
      return new Map((rows || []).map((row) => [row.book_id, row.storage_path]));
    } catch (error) {
      console.error("Unable to load ebook delivery map from configured Supabase", error);
    }
  }

  try {
    const response = await fetch(AVAILABILITY_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Availability service returned ${response.status}`);
    const data = await response.json();
    const ids: string[] = Array.isArray(data.readyBookIds) ? data.readyBookIds : [];
    return new Map(ids.map((id) => [id, `managed:${id}`]));
  } catch (error) {
    console.error("Unable to load ebook delivery availability", error);
    return new Map();
  }
}

async function hydratedBooks(): Promise<Book[]> {
  const files = await deliveryMap();
  return baseBooks.map((book) => {
    const mappedPath = files.get(book.id) || book.file_path || null;
    return {
      ...book,
      file_path: mappedPath,
      purchasable: Boolean(mappedPath)
    };
  });
}

export async function getBooks(): Promise<Book[]> {
  return (await hydratedBooks()).filter((book) => book.active !== false);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  return (await hydratedBooks()).find((book) => book.slug === slug && book.active !== false) || null;
}

export async function getBookById(id: string): Promise<Book | null> {
  return (await hydratedBooks()).find((book) => book.id === id && book.active !== false) || null;
}

export async function getCategories(): Promise<Category[]> {
  return allCategories;
}

export async function getSubcategories(): Promise<Subcategory[]> {
  return allSubcategories;
}

export async function getBooksByCategory(slug: string): Promise<Book[]> {
  return (await hydratedBooks()).filter((book) => book.active !== false && book.category_slug === slug);
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
  if (!supabaseUrl || !serviceKey || filePath.startsWith("managed:")) return null;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/sign/${DELIVERY_BUCKET}/${filePath}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ expiresIn: 900, download: true })
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  const signed = data.signedURL || data.signedUrl;
  return signed ? `${supabaseUrl}/storage/v1${signed}` : null;
}
