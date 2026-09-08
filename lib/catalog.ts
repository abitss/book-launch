import { Book, Category, Subcategory, books, categories, subcategories } from "@/data/catalog";
import { extraBooks, extraCategories, extraSubcategories } from "@/data/catalog-extra";
import { bookOverrides } from "@/data/catalog-overrides";

const AVAILABILITY_URL = "https://qsbljflookzgrdxzessb.supabase.co/functions/v1/ebookiee-availability";

const baseBooks: Book[] = [...books, ...extraBooks].map((book) => ({
  ...book,
  ...(bookOverrides[book.id] || {})
}));
const allCategories = [...categories, ...extraCategories];
const allSubcategories = [...subcategories, ...extraSubcategories];

async function deliveryMap(): Promise<Map<string, string>> {
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
    const mappedPath = files.get(book.id) || null;
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

export async function createOrderRecord(_value: Record<string, unknown>) {
  return null;
}

export async function markOrderPaid(_razorpayOrderId: string, _paymentId: string) {
  return null;
}

export async function createSignedBookUrl(_filePath: string) {
  return null;
}
