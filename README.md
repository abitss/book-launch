# eBookiee.store

A digital bookstore built with Next.js 16 and Razorpay, with optional Supabase support for private ebook delivery and order records.

## Catalog workflow

The bookstore catalog is intentionally maintained in code instead of through an admin dashboard.

The source of truth is:

```text
data/catalog.ts
```

Each book can define:

- title
- slug
- author
- subtitle
- description
- selling price
- original price
- cover URL/path
- private ebook file path
- category
- subcategory
- badge
- language
- page count
- format
- featured status
- active/published status

Categories and subcategories are maintained in the same file.

This keeps the public site smaller and removes the need for an exposed admin/login/upload system.

## Required Razorpay variables

Add these in `.env.local` for local development and in Vercel Project Settings → Environment Variables for production:

```env
NEXT_PUBLIC_SITE_URL=https://ebookiee.store

RAZORPAY_KEY_ID=rzp_live_or_test_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_or_test_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Never commit real secrets to GitHub.

## Optional Supabase variables

Supabase is no longer used as the public catalog database. It is optional and only needed if you want server-side order persistence and private ebook delivery through signed links.

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

If using Supabase, run:

```text
supabase/schema.sql
```

The minimal schema creates an `orders` table and a private `ebooks` storage bucket.

## Razorpay flow

The browser sends only the book ID.

`/api/create-order` resolves the book and price from `data/catalog.ts` on the server, then creates the Razorpay order.

`/api/verify-payment` verifies the Razorpay signature before fulfillment. If the book has a `file_path` and Supabase private storage is configured, a short-lived signed download link is returned after successful payment.

## Adding a new book

Add the title to `data/catalog.ts` and add its cover file under `public/` (or use a trusted hosted cover URL).

For protected paid files, upload the ebook to the private Supabase `ebooks` bucket and set the matching `file_path` in the book record.

Example:

```ts
{
  id: "example-book",
  slug: "example-book",
  title: "Example Book",
  subtitle: "A clear one-line value proposition",
  author: "Author Name",
  description: "Customer-facing description of the book.",
  price: 99,
  original_price: 299,
  cover_url: "/books/example-book.jpg",
  file_path: "example-book.pdf",
  category_slug: "self-growth",
  subcategory_slug: "productivity",
  badge: "Bestseller",
  language: "English",
  pages: 240,
  format: "PDF",
  featured: true,
  active: true
}
```

## Digital rights

Only list and sell ebooks, notes or publications that you own or have explicit permission/license to distribute.

Do not place protected paid ebook files inside `/public` because everything in that directory is directly accessible by URL.

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
