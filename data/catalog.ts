export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  author: string;
  description: string;
  price: number;
  original_price?: number | null;
  cover_url: string;
  file_path?: string | null;
  category_slug: string;
  subcategory_slug?: string | null;
  badge?: string | null;
  language?: string | null;
  pages?: number | null;
  format?: string | null;
  featured?: boolean;
  active?: boolean;
};

// OFFICIAL EBOOKIES CATALOG
// Send new book details to be added here. The storefront reads directly from these arrays.

export const categories: Category[] = [
  { id: "exam-prep", name: "Exam Prep", slug: "exam-prep", description: "Competitive exams, government exams and entrance preparation." },
  { id: "business", name: "Business & Money", slug: "business", description: "Business, finance, startups and career growth." },
  { id: "fiction", name: "Fiction", slug: "fiction", description: "Stories, novels and immersive reads." },
  { id: "self-growth", name: "Self Growth", slug: "self-growth", description: "Habits, psychology, productivity and personal development." }
];

export const subcategories: Subcategory[] = [
  { id: "upsc", category_id: "exam-prep", name: "UPSC", slug: "upsc" },
  { id: "ssc", category_id: "exam-prep", name: "SSC", slug: "ssc" },
  { id: "startup", category_id: "business", name: "Startups", slug: "startups" },
  { id: "finance", category_id: "business", name: "Finance", slug: "finance" },
  { id: "productivity", category_id: "self-growth", name: "Productivity", slug: "productivity" }
];

export const books: Book[] = [
  {
    id: "indian-polity",
    slug: "indian-polity",
    title: "Indian Polity",
    subtitle: "A focused digital edition for exam preparation",
    author: "M. Laxmikanth",
    description: "A structured Indian polity title covering core constitutional and governance topics for competitive-exam preparation. Only list and sell editions you have the legal right to distribute.",
    price: 49,
    original_price: 299,
    cover_url: "/cover.png",
    file_path: null,
    category_slug: "exam-prep",
    subcategory_slug: "upsc",
    badge: "Popular",
    language: "English",
    pages: null,
    format: "PDF",
    featured: true,
    active: true
  }
];
